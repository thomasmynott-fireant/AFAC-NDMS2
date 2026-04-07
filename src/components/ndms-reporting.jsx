import { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import L from "leaflet";

/* Fix default marker icons in bundled environments */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600},purple:{bg:"#F3F0FF",fg:"#6C5CE7"}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};

/* ═══════════════════════════════════════════════
   CUSTOM MARKER ICONS
   ═══════════════════════════════════════════════ */
function createIcon(color, size = 12, shape = "circle") {
  const svg = shape === "diamond"
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="${size*2}" height="${size*2}" viewBox="0 0 24 24"><polygon points="12,2 22,12 12,22 2,12" fill="${color}" stroke="white" stroke-width="2"/></svg>`
    : shape === "triangle"
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="${size*2}" height="${size*2}" viewBox="0 0 24 24"><polygon points="12,3 23,21 1,21" fill="${color}" stroke="white" stroke-width="2"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="${size*2}" height="${size*2}" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="white" opacity="0.8"/></svg>`;
  return L.divIcon({
    html: svg,
    iconSize: [size * 2, size * 2],
    iconAnchor: [size, size],
    popupAnchor: [0, -size],
    className: "",
  });
}

function createPersonIcon(color, initials) {
  const html = `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:700;font-family:system-ui;">${initials}</div>`;
  return L.divIcon({ html, iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -14], className: "" });
}

function createFlightIcon() {
  const html = `<div style="width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:20px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3));">✈️</div>`;
  return L.divIcon({ html, iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -15], className: "" });
}

function createIncidentIcon() {
  const html = `<div style="width:26px;height:26px;border-radius:4px;background:${T.coral};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;color:white;font-size:12px;font-weight:700;">!</div>`;
  return L.divIcon({ html, iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -13], className: "" });
}

/* ═══════════════════════════════════════════════
   MAP DATA — Deployment sites, personnel, flights, incidents
   ═══════════════════════════════════════════════ */

/* Deployment zones */
const DEPLOYMENT_ZONES = [
  { id: "DEP-NR", name: "Northern Rivers Flood Response", lat: -28.811, lng: 153.278, radius: 25000, color: T.blue, status: "Active", personnel: 68, assets: 12, commander: "J. Walsh" },
  { id: "DEP-CAN", name: "Canada 2025 Wildfire Season", lat: 50.6745, lng: -120.3273, radius: 40000, color: T.teal, status: "Active", personnel: 33, assets: 3, commander: "M. Sullivan" },
  { id: "DEP-GIP", name: "Gippsland Bushfire Support", lat: -37.8226, lng: 147.6127, radius: 20000, color: T.orange, status: "Mobilising", personnel: 0, assets: 0, commander: "R. Kimura" },
];

/* Personnel — GPS positions (simulated live tracking) */
const DEPLOYED_PERSONNEL = [
  // Northern Rivers crew
  { name: "Daniel Thornton", role: "Crew Leader", agency: "QLD QFES", lat: -28.795, lng: 153.275, deployment: "DEP-NR", init: "DT", status: "On Duty" },
  { name: "Tom Briggs", role: "Flood Ops", agency: "QLD QFES", lat: -28.820, lng: 153.290, deployment: "DEP-NR", init: "TB", status: "On Duty" },
  { name: "Karen Wong", role: "Flood Ops", agency: "QLD QFES", lat: -28.803, lng: 153.260, deployment: "DEP-NR", init: "KW", status: "On Duty" },
  { name: "Sarah Patel", role: "Ops Officer", agency: "QLD QFES", lat: -28.810, lng: 153.285, deployment: "DEP-NR", init: "SP", status: "On Duty" },
  { name: "Ben Harper", role: "Mgmt Support", agency: "VIC CFA", lat: -28.815, lng: 153.270, deployment: "DEP-NR", init: "BH", status: "Rest" },
  { name: "Rachel Kimura", role: "Deployment Mgr", agency: "VIC CFA", lat: -28.808, lng: 153.282, deployment: "DEP-NR", init: "RK", status: "On Duty" },
  { name: "Sam O'Connor", role: "Safety Officer", agency: "TAS TFS", lat: -28.818, lng: 153.265, deployment: "DEP-NR", init: "SO", status: "On Duty" },
  { name: "Jake Williams", role: "Crew Member", agency: "VIC CFA", lat: -28.825, lng: 153.295, deployment: "DEP-NR", init: "JW", status: "Flagged" },
  { name: "Linda Brooks", role: "Coordinator", agency: "NSW RFS", lat: -28.812, lng: 153.278, deployment: "DEP-NR", init: "LB", status: "HQ" },
  { name: "Chris Adams", role: "Crew Leader", agency: "SA SASES", lat: -28.801, lng: 153.250, deployment: "DEP-NR", init: "CA", status: "On Duty" },
  // Canada crew (sample)
  { name: "Mike Sullivan", role: "Team Leader", agency: "SA CFS", lat: 50.680, lng: -120.330, deployment: "DEP-CAN", init: "MS", status: "On Duty" },
  { name: "Lisa Morton", role: "Ops Specialist", agency: "NSW RFS", lat: 50.670, lng: -120.310, deployment: "DEP-CAN", init: "LM", status: "On Duty" },
  { name: "Fiona Grant", role: "Safety", agency: "NSW RFS", lat: 50.685, lng: -120.340, deployment: "DEP-CAN", init: "FG", status: "Rest" },
  { name: "Dave Kowalski", role: "Crew Member", agency: "TAS TFS", lat: 50.665, lng: -120.350, deployment: "DEP-CAN", init: "DK", status: "On Duty" },
];

/* In-transit flights */
const FLIGHTS = [
  {
    id: "QF2120",
    type: "Deployment",
    pax: 6,
    from: { name: "Melbourne (MEL)", lat: -37.6733, lng: 144.8433 },
    to: { name: "Lismore (LSY)", lat: -28.830, lng: 153.260 },
    currentLat: -33.2,
    currentLng: 149.5,
    alt: "FL350",
    eta: "14:30 AEST",
    status: "In Flight",
    passengers: ["R2 Crew — VIC CFA relief rotation"],
  },
  {
    id: "AC0087",
    type: "International",
    pax: 8,
    from: { name: "Sydney (SYD)", lat: -33.9461, lng: 151.1772 },
    to: { name: "Vancouver (YVR)", lat: 49.1947, lng: -123.1789 },
    currentLat: 15.0,
    currentLng: -170.0,
    alt: "FL390",
    eta: "06:00 PDT",
    status: "In Flight",
    passengers: ["R2 Advance — Canada wildfire rotation"],
  },
];

/* Incidents / OPS log markers */
const INCIDENTS = [
  { id: "INC-001", title: "Levee breach — Wyrallah Rd", lat: -28.835, lng: 153.300, severity: "High", deployment: "DEP-NR", time: "29 Mar 09:15", sitrep: "SR-003", description: "Minor levee breach requiring additional pump deployment" },
  { id: "INC-002", title: "Fatigue flag — Jake Williams", lat: -28.825, lng: 153.295, severity: "High", deployment: "DEP-NR", time: "30 Mar 14:30", sitrep: "OPS-LOG", description: "Extended shift without adequate break — 14h continuous" },
  { id: "INC-003", title: "Accommodation relocation", lat: -28.815, lng: 153.270, severity: "Low", deployment: "DEP-NR", time: "28 Mar 18:00", sitrep: "SR-002", description: "All personnel relocated to new site — capacity increase" },
  { id: "INC-004", title: "Fire behaviour change — NE sector", lat: 50.710, lng: -120.280, severity: "Medium", deployment: "DEP-CAN", time: "30 Mar 12:00", sitrep: "SR-012", description: "Fire behaviour increasing in NE sector — additional crews requested" },
  { id: "INC-005", title: "Road closure — Bruxner Hwy", lat: -28.800, lng: 153.240, severity: "Medium", deployment: "DEP-NR", time: "30 Mar 08:00", sitrep: "OPS-LOG", description: "Bruxner Highway closed between Lismore and Casino due to flooding" },
];

/* ═══════════════════════════════════════════════
   FLYTO COMPONENT — animate map to location
   ═══════════════════════════════════════════════ */
function FlyTo({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}


/* ═══════════════════════════════════════════════
   MAP WORKSPACE — Common Operating Picture
   ═══════════════════════════════════════════════ */
export default function MapWorkspace() {
  const [layers, setLayers] = useState({
    deploymentZones: true,
    personnel: true,
    flights: true,
    incidents: true,
    flightPaths: true,
  });
  const [flyTarget, setFlyTarget] = useState(null);
  const [flyZoom, setFlyZoom] = useState(4);
  const [selectedDeployment, setSelectedDeployment] = useState("All");

  const toggleLayer = (key) => setLayers(prev => ({ ...prev, [key]: !prev[key] }));

  const filteredPersonnel = useMemo(() => {
    if (selectedDeployment === "All") return DEPLOYED_PERSONNEL;
    return DEPLOYED_PERSONNEL.filter(p => p.deployment === selectedDeployment);
  }, [selectedDeployment]);

  const filteredIncidents = useMemo(() => {
    if (selectedDeployment === "All") return INCIDENTS;
    return INCIDENTS.filter(inc => inc.deployment === selectedDeployment);
  }, [selectedDeployment]);

  const statusColor = (s) => s === "On Duty" ? T.green : s === "Rest" ? T.blue : s === "HQ" ? "#6C5CE7" : T.coral;

  return (
    <div style={{ display: "flex", height: "calc(100vh - 64px)", position: "relative" }}>
      {/* ═══ SIDEBAR: Layer Controls ═══ */}
      <div style={{
        width: 280, background: T.white, borderRight: `1px solid ${T.g200}`,
        display: "flex", flexDirection: "column", zIndex: 500, flexShrink: 0,
        boxShadow: "2px 0 12px rgba(0,0,0,.05)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 18px", borderBottom: `1px solid ${T.g200}` }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.navy }}>Common Operating Picture</div>
          <div style={{ fontSize: 11.5, color: T.g500, marginTop: 2 }}>Live deployment tracking & situational awareness</div>
        </div>

        {/* Quick zoom */}
        <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.g200}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: T.g500, textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 }}>Quick Zoom</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <button onClick={() => { setFlyTarget([-25, 135]); setFlyZoom(4); setSelectedDeployment("All"); }} style={qzStyle(selectedDeployment === "All")}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.navy }} />
              Global Overview
            </button>
            {DEPLOYMENT_ZONES.map(dz => (
              <button key={dz.id} onClick={() => { setFlyTarget([dz.lat, dz.lng]); setFlyZoom(dz.id === "DEP-CAN" ? 10 : 12); setSelectedDeployment(dz.id); }} style={qzStyle(selectedDeployment === dz.id)}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: dz.color }} />
                <span style={{ flex: 1, textAlign: "left" }}>{dz.name.split(" ").slice(0, 3).join(" ")}</span>
                <Chip color={dz.status === "Active" ? "green" : "orange"}>{dz.status}</Chip>
              </button>
            ))}
          </div>
        </div>

        {/* Data Layers */}
        <div style={{ padding: "12px 18px", borderBottom: `1px solid ${T.g200}`, flex: 1, overflowY: "auto" }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: T.g500, textTransform: "uppercase", letterSpacing: .5, marginBottom: 10 }}>Data Layers</div>
          {[
            { key: "deploymentZones", label: "Deployment Zones", desc: "Area of operations circles", color: T.blue, icon: "◉" },
            { key: "personnel", label: "Personnel GPS", desc: "Live member positions", color: T.green, icon: "👤" },
            { key: "flights", label: "Flight Tracking", desc: "In-transit aircraft", color: T.orange, icon: "✈️" },
            { key: "flightPaths", label: "Flight Paths", desc: "Origin → destination routes", color: T.g400, icon: "- -" },
            { key: "incidents", label: "Incidents & SitReps", desc: "Reported events on map", color: T.coral, icon: "⚠" },
          ].map(layer => (
            <label key={layer.key} style={{
              display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px",
              borderRadius: 6, cursor: "pointer", marginBottom: 2,
              background: layers[layer.key] ? `${layer.color}10` : "transparent",
              border: `1px solid ${layers[layer.key] ? `${layer.color}30` : "transparent"}`,
              transition: "all .12s",
            }}>
              <input type="checkbox" checked={layers[layer.key]} onChange={() => toggleLayer(layer.key)} style={{ accentColor: layer.color, marginTop: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: layers[layer.key] ? T.navy : T.g500 }}>
                  <span style={{ marginRight: 4 }}>{layer.icon}</span>{layer.label}
                </div>
                <div style={{ fontSize: 10.5, color: T.g400, marginTop: 1 }}>{layer.desc}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Legend */}
        <div style={{ padding: "12px 18px", borderTop: `1px solid ${T.g200}` }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: T.g500, textTransform: "uppercase", letterSpacing: .5, marginBottom: 8 }}>Personnel Status</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[
              { l: "On Duty", c: T.green },
              { l: "Rest", c: T.blue },
              { l: "HQ", c: "#6C5CE7" },
              { l: "Flagged", c: T.coral },
            ].map(s => (
              <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: T.g600 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} />{s.l}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: T.g500, textTransform: "uppercase", letterSpacing: .5, marginBottom: 6, marginTop: 10 }}>Incident Severity</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { l: "High", c: T.coral },
              { l: "Medium", c: T.orange },
              { l: "Low", c: T.g400 },
            ].map(s => (
              <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: T.g600 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />{s.l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MAP ═══ */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* Live status bar */}
        <div style={{
          position: "absolute", top: 12, left: 12, right: 12, zIndex: 1000,
          display: "flex", gap: 8, pointerEvents: "none",
        }}>
          {[
            { l: "Active Deployments", v: DEPLOYMENT_ZONES.filter(d => d.status === "Active").length, c: T.green },
            { l: "Personnel Tracked", v: filteredPersonnel.length, c: T.blue },
            { l: "Flights In Transit", v: FLIGHTS.length, c: T.orange },
            { l: "Active Incidents", v: filteredIncidents.filter(i => i.severity === "High").length, c: T.coral },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
              background: "rgba(255,255,255,.92)", backdropFilter: "blur(8px)",
              borderRadius: 6, border: `1px solid ${T.g200}`,
              boxShadow: "0 2px 8px rgba(0,0,0,.08)", pointerEvents: "auto",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.c }} />
              <span style={{ fontSize: 11, color: T.g600 }}>{s.l}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{s.v}</span>
            </div>
          ))}
        </div>

        <MapContainer
          center={[-25, 135]}
          zoom={4}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {flyTarget && <FlyTo center={flyTarget} zoom={flyZoom} />}

          {/* Deployment zones */}
          {layers.deploymentZones && DEPLOYMENT_ZONES.map(dz => (
            <Circle
              key={dz.id}
              center={[dz.lat, dz.lng]}
              radius={dz.radius}
              pathOptions={{
                color: dz.color,
                fillColor: dz.color,
                fillOpacity: 0.12,
                weight: 2,
                dashArray: dz.status === "Mobilising" ? "8 4" : undefined,
              }}
            >
              <Popup>
                <div style={{ minWidth: 200 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{dz.name}</div>
                  <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
                    <Chip color={dz.status === "Active" ? "green" : "orange"}>{dz.status}</Chip>
                  </div>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    <div><strong>{dz.personnel}</strong> personnel · <strong>{dz.assets}</strong> assets</div>
                    <div style={{ marginTop: 4 }}>Commander: {dz.commander}</div>
                  </div>
                </div>
              </Popup>
            </Circle>
          ))}

          {/* Deployment centre markers */}
          {layers.deploymentZones && DEPLOYMENT_ZONES.map(dz => (
            <Marker key={`m-${dz.id}`} position={[dz.lat, dz.lng]} icon={createIcon(dz.color, 10)}>
              <Popup>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{dz.name}</div>
                <div style={{ fontSize: 11, color: "#666" }}>Deployment HQ</div>
              </Popup>
            </Marker>
          ))}

          {/* Personnel markers */}
          {layers.personnel && filteredPersonnel.map((p, i) => (
            <Marker key={`p-${i}`} position={[p.lat, p.lng]} icon={createPersonIcon(statusColor(p.status), p.init)}>
              <Popup>
                <div style={{ minWidth: 180 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{p.role} · {p.agency}</div>
                  <div style={{ display: "flex", gap: 4 }}>
                    <Chip color={p.status === "On Duty" ? "green" : p.status === "Flagged" ? "coral" : p.status === "HQ" ? "purple" : "blue"}>{p.status}</Chip>
                  </div>
                  <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>
                    GPS: {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Flight paths */}
          {layers.flightPaths && FLIGHTS.map((f, i) => (
            <Polyline
              key={`fp-${i}`}
              positions={[[f.from.lat, f.from.lng], [f.currentLat, f.currentLng], [f.to.lat, f.to.lng]]}
              pathOptions={{ color: T.orange, weight: 2, dashArray: "6 4", opacity: 0.6 }}
            />
          ))}

          {/* Flight markers */}
          {layers.flights && FLIGHTS.map((f, i) => (
            <Marker key={`fl-${i}`} position={[f.currentLat, f.currentLng]} icon={createFlightIcon()}>
              <Popup>
                <div style={{ minWidth: 220 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>✈️ {f.id}</div>
                  <div style={{ fontSize: 11, color: "#666", marginBottom: 6 }}>{f.from.name} → {f.to.name}</div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                    <Chip color="orange">{f.status}</Chip>
                    <Chip color="blue">{f.type}</Chip>
                  </div>
                  <div style={{ fontSize: 12, lineHeight: 1.6 }}>
                    <div><strong>Pax:</strong> {f.pax} · <strong>Alt:</strong> {f.alt}</div>
                    <div><strong>ETA:</strong> {f.eta}</div>
                    <div style={{ fontSize: 11, fontStyle: "italic", color: "#888", marginTop: 2 }}>{f.passengers[0]}</div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Incident markers */}
          {layers.incidents && filteredIncidents.map((inc, i) => (
            <Marker key={`inc-${i}`} position={[inc.lat, inc.lng]} icon={createIncidentIcon()}>
              <Popup>
                <div style={{ minWidth: 220 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>{inc.title}</div>
                  <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                    <Chip color={inc.severity === "High" ? "coral" : inc.severity === "Medium" ? "orange" : "gray"}>{inc.severity}</Chip>
                    <span style={{ fontSize: 11, color: "#888" }}>{inc.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#555", marginBottom: 4 }}>{inc.description}</div>
                  <div style={{ fontSize: 10, color: "#999" }}>Ref: {inc.sitrep}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
const qzStyle = (active) => ({
  display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
  borderRadius: 6, fontSize: 12, fontWeight: active ? 600 : 500,
  cursor: "pointer", border: `1px solid ${active ? T.blue : T.g200}`,
  background: active ? T.blueL : "transparent",
  color: active ? T.blue : T.navy,
  fontFamily: "inherit", textAlign: "left", width: "100%",
});
