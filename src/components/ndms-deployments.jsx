import { useState } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600},purple:{bg:"#F3F0FF",fg:"#6C5CE7"}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};
const Avatar=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const TabBar=({tabs,active,onChange})=><div style={{display:"flex",gap:0,borderBottom:`2px solid ${T.g200}`,marginBottom:20}}>{tabs.map(t=><button key={t} onClick={()=>onChange(t)} style={{padding:"10px 20px",fontSize:13,fontWeight:active===t?650:500,color:active===t?T.blue:T.g500,borderBottom:active===t?`2px solid ${T.blue}`:"2px solid transparent",marginBottom:-2,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",transition:"all .12s"}}>{t}</button>)}</div>;
const TH=({children,w})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap",width:w}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;

/* ═══════════════════════════════════════════════
   DEPLOYMENT DATA
   ═══════════════════════════════════════════════ */
const DEPLOYMENTS = [
  {
    id: "DEP-NR-2026",
    name: "Northern Rivers Flood Response",
    type: "Interstate",
    incident: "Severe flooding — Northern Rivers, NSW",
    status: "Active",
    startDate: "22 Mar 2026",
    estEndDate: "12 Apr 2026",
    totalDays: 22,
    completedDays: 10,
    personnel: 68,
    contingents: 4,
    assets: 12,
    currentRotation: 1,
    totalRotations: 3,
    nextRotation: "1 Apr 2026",
    rotationDaysLeft: 4,
    costToDate: 485000,
    budget: 1200000,
    location: "Lismore, NSW",
    commander: "J. Walsh",
    commanderInit: "JW",
    requests: ["2025_26_007NSW_QLD001", "2025_26_008NSW_VIC001"],
    alerts: [
      { type: "warning", text: "Rotation 1 relief due in 4 days — 3 nominations pending" },
      { type: "info", text: "SitRep #4 submitted 2h ago" },
    ],
    color: T.blue,
  },
  {
    id: "DEP-CAN-2025",
    name: "Canada 2025 Wildfire Season",
    type: "International",
    incident: "Wildfire season support — British Columbia",
    status: "Active",
    startDate: "15 Feb 2026",
    estEndDate: "30 Apr 2026",
    totalDays: 74,
    completedDays: 44,
    personnel: 33,
    contingents: 4,
    assets: 3,
    currentRotation: 2,
    totalRotations: 4,
    nextRotation: "5 Apr 2026",
    rotationDaysLeft: 8,
    costToDate: 920000,
    budget: 2400000,
    location: "Kamloops, BC, Canada",
    commander: "M. Sullivan",
    commanderInit: "MS",
    requests: ["2025_26_INT_CAN_001"],
    alerts: [
      { type: "critical", text: "2 welfare flags raised — fatigue reviews overdue" },
    ],
    color: T.teal,
  },
  {
    id: "DEP-GIP-2026",
    name: "Gippsland Bushfire Support",
    type: "Interstate",
    incident: "Bushfire containment — East Gippsland, VIC",
    status: "Mobilising",
    startDate: "2 Apr 2026",
    estEndDate: "16 Apr 2026",
    totalDays: 14,
    completedDays: 0,
    personnel: 0,
    contingents: 0,
    assets: 0,
    currentRotation: 0,
    totalRotations: 1,
    nextRotation: "—",
    rotationDaysLeft: null,
    costToDate: 0,
    budget: 350000,
    location: "Bairnsdale, VIC",
    commander: "R. Kimura",
    commanderInit: "RK",
    requests: ["2025_26_015VIC_SA001"],
    alerts: [],
    color: T.orange,
  },
];

/* ─── Deployment Detail: Personnel ─── */
const DETAIL_PERSONNEL = [
  { name: "Daniel Thornton", role: "Crew Leader", agency: "QLD QFES", contingent: "CREW1", day: 8, fatigue: 72, status: "Active", init: "DT" },
  { name: "Tom Briggs", role: "Flood Ops", agency: "QLD QFES", contingent: "CREW2", day: 8, fatigue: 78, status: "Active", init: "TB" },
  { name: "Karen Wong", role: "Flood Ops", agency: "QLD QFES", contingent: "CREW2", day: 8, fatigue: 88, status: "Active", init: "KW" },
  { name: "Sarah Patel", role: "Operations Officer", agency: "QLD QFES", contingent: "IMT1", day: 10, fatigue: 65, status: "Active", init: "SP" },
  { name: "Ben Harper", role: "Mgmt Support", agency: "VIC CFA", contingent: "IMT1", day: 10, fatigue: 70, status: "Active", init: "BH" },
  { name: "Rachel Kimura", role: "Deployment Mgr", agency: "VIC CFA", contingent: "IMT1", day: 12, fatigue: 60, status: "Active", init: "RK" },
  { name: "Sam O'Connor", role: "Safety Officer", agency: "TAS TFS", contingent: "Overhead", day: 8, fatigue: 55, status: "Active", init: "SO" },
  { name: "Jake Williams", role: "Crew Member", agency: "VIC CFA", contingent: "CREW1", day: 8, fatigue: 82, status: "Flagged", init: "JW" },
  { name: "Linda Brooks", role: "Coordinator", agency: "NSW RFS", contingent: "Overhead", day: 6, fatigue: 45, status: "Active", init: "LB" },
  { name: "Chris Adams", role: "Crew Leader", agency: "SA SASES", contingent: "CREW2", day: 8, fatigue: 71, status: "Active", init: "CA" },
];

/* ─── Deployment Detail: Welfare ─── */
const DETAIL_WELFARE = [
  { id: "WF-001", person: "Jake Williams", type: "Fatigue", reported: "30 Mar 14:30", severity: "High", status: "Open", assignee: "S. Patel", notes: "Extended shift without adequate break — 14h continuous" },
  { id: "WF-002", person: "Tom Briggs", type: "Injury", reported: "29 Mar 09:15", severity: "Medium", status: "Under Review", assignee: "S. O'Connor", notes: "Minor laceration — first aid applied, monitoring" },
  { id: "WF-003", person: "Karen Wong", type: "Fatigue", reported: "28 Mar 16:00", severity: "Medium", status: "Resolved", assignee: "S. Patel", notes: "Approved for light duties — now returned to full roster" },
  { id: "WF-004", person: "Ben Harper", type: "Wellbeing", reported: "27 Mar 11:00", severity: "Low", status: "Resolved", assignee: "R. Kimura", notes: "Requested welfare check-in — all clear after follow-up" },
];

/* ─── Deployment Detail: SitReps ─── */
const DETAIL_SITREPS = [
  { id: "SR-004", date: "30 Mar 18:00", author: "J. Walsh", type: "Operational", headline: "Flood levels stable — crews holding containment lines", status: "Submitted" },
  { id: "SR-003", date: "29 Mar 18:00", author: "J. Walsh", type: "Operational", headline: "Minor levee breach at Wyrallah — additional pumps deployed", status: "Submitted" },
  { id: "SR-002", date: "28 Mar 18:00", author: "S. Patel", type: "Logistics", headline: "Accommodation relocation complete — all personnel at new site", status: "Submitted" },
  { id: "SR-001", date: "22 Mar 18:00", author: "J. Walsh", type: "Initial", headline: "Contingent arrived — base established at Lismore Gateway", status: "Submitted" },
];

/* ─── Deployment Detail: Rostering ─── */
const DETAIL_ROSTER = [
  { rotation: 1, startDate: "22 Mar", endDate: "1 Apr", personnel: 22, status: "Active", daysLeft: 4 },
  { rotation: 2, startDate: "1 Apr", endDate: "8 Apr", personnel: 22, status: "Planned", daysLeft: null },
  { rotation: 3, startDate: "8 Apr", endDate: "12 Apr", personnel: 16, status: "Unconfirmed", daysLeft: null },
];

/* ─── Live Ops Log ─── */
const OPS_LOG = [
  { time: "30 Mar 18:00", deployment: "Northern Rivers", category: "SitRep", event: "SitRep #4 submitted — flood levels stable", priority: "Info", icon: "📋" },
  { time: "30 Mar 14:30", deployment: "Northern Rivers", category: "Welfare", event: "Fatigue flag raised — Jake Williams (14h shift)", priority: "High", icon: "⚠️" },
  { time: "30 Mar 12:00", deployment: "Canada 2025", category: "SitRep", event: "SitRep #12 submitted — fire behaviour increasing NE sector", priority: "Info", icon: "📋" },
  { time: "30 Mar 09:00", deployment: "Northern Rivers", category: "Request", event: "VIC CFA nomination received for Rotation 2 (6 personnel)", priority: "Medium", icon: "📨" },
  { time: "29 Mar 16:45", deployment: "Canada 2025", category: "Welfare", event: "Welfare check completed — 2 fatigue flags unresolved", priority: "High", icon: "⚠️" },
  { time: "29 Mar 14:00", deployment: "Northern Rivers", category: "Logistics", event: "Ground transport reassigned — 2 utes moved to Wyrallah", priority: "Low", icon: "🚛" },
  { time: "29 Mar 09:15", deployment: "Northern Rivers", category: "Welfare", event: "Minor injury reported — Tom Briggs (laceration, first aid)", priority: "Medium", icon: "🏥" },
  { time: "29 Mar 08:00", deployment: "Gippsland", category: "Request", event: "Mobilisation orders generated — SA CFS 8 personnel", priority: "Medium", icon: "📨" },
  { time: "28 Mar 18:00", deployment: "Northern Rivers", category: "SitRep", event: "SitRep #3 — minor levee breach at Wyrallah", priority: "Info", icon: "📋" },
  { time: "28 Mar 16:00", deployment: "Northern Rivers", category: "Welfare", event: "Fatigue flag resolved — Karen Wong returned to full duties", priority: "Low", icon: "✅" },
  { time: "28 Mar 12:00", deployment: "Canada 2025", category: "Rotation", event: "Rotation 2 advance team departed SYD → YVR", priority: "Medium", icon: "✈️" },
  { time: "28 Mar 09:00", deployment: "Gippsland", category: "Request", event: "New request 2025_26_015VIC_SA001 created — Gippsland Bushfire", priority: "High", icon: "🆕" },
  { time: "27 Mar 18:00", deployment: "Canada 2025", category: "SitRep", event: "SitRep #11 — containment at 45%, crew morale good", priority: "Info", icon: "📋" },
  { time: "27 Mar 11:00", deployment: "Northern Rivers", category: "Welfare", event: "Wellbeing check-in requested — Ben Harper (resolved)", priority: "Low", icon: "✅" },
  { time: "26 Mar 14:00", deployment: "Northern Rivers", category: "Finance", event: "Week 1 cost reconciliation completed — $142k actual vs $150k forecast", priority: "Low", icon: "💰" },
];


/* ═══════════════════════════════════════════════
   DEPLOYMENTS WORKSPACE
   ═══════════════════════════════════════════════ */
export default function DeploymentsWorkspace() {
  const [activeDeployment, setActiveDeployment] = useState(null);

  if (activeDeployment) {
    return <DeploymentDetail deployment={activeDeployment} onBack={() => setActiveDeployment(null)} />;
  }

  return <div style={{ padding: "24px 32px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Deployments</h2>
        <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>Live operations — deployment tracking, personnel welfare, and operational reporting</p>
      </div>
      <Btn v="primary">+ New Deployment</Btn>
    </div>

    {/* Alerts Banner */}
    <AlertsBanner />

    {/* KPI row */}
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      {[
        { l: "Active Deployments", v: DEPLOYMENTS.filter(d => d.status === "Active").length, c: T.green },
        { l: "Mobilising", v: DEPLOYMENTS.filter(d => d.status === "Mobilising").length, c: T.orange },
        { l: "Total Personnel", v: DEPLOYMENTS.reduce((s, d) => s + d.personnel, 0), c: T.blue },
        { l: "Total Assets", v: DEPLOYMENTS.reduce((s, d) => s + d.assets, 0), c: T.teal },
        { l: "Open Welfare Flags", v: 3, c: T.coral },
      ].map((s, i) => (
        <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} />
          <span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span>
          <span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 18 }}>{s.v}</span>
        </div>
      ))}
    </div>

    {/* Deployment Tiles */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
      {DEPLOYMENTS.map(dep => (
        <DeploymentTile key={dep.id} dep={dep} onOpen={() => setActiveDeployment(dep)} />
      ))}
    </div>

    {/* Live Ops Log */}
    <LiveOpsLog />
  </div>;
}


/* ═══════════════════════════════════════════════
   ALERTS BANNER
   ═══════════════════════════════════════════════ */
function AlertsBanner() {
  const allAlerts = DEPLOYMENTS.flatMap(d => d.alerts.map(a => ({ ...a, deployment: d.name })));
  const critical = allAlerts.filter(a => a.type === "critical");
  const warning = allAlerts.filter(a => a.type === "warning");

  if (critical.length === 0 && warning.length === 0) return null;

  return <div style={{ marginBottom: 16 }}>
    {critical.map((a, i) => (
      <div key={`c-${i}`} style={{ padding: "10px 16px", background: T.coralL, border: `1px solid ${T.coral}30`, borderLeft: `3px solid ${T.coral}`, borderRadius: 6, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>🚨</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: T.coral }}>{a.deployment}:</span>
        <span style={{ fontSize: 12.5, color: T.navy }}>{a.text}</span>
      </div>
    ))}
    {warning.map((a, i) => (
      <div key={`w-${i}`} style={{ padding: "10px 16px", background: T.orangeL, border: `1px solid ${T.orange}30`, borderLeft: `3px solid ${T.orange}`, borderRadius: 6, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>⚠️</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#c06e15" }}>{a.deployment}:</span>
        <span style={{ fontSize: 12.5, color: T.navy }}>{a.text}</span>
      </div>
    ))}
  </div>;
}


/* ═══════════════════════════════════════════════
   DEPLOYMENT TILE
   ═══════════════════════════════════════════════ */
function DeploymentTile({ dep, onOpen }) {
  const statusColor = dep.status === "Active" ? "green" : dep.status === "Mobilising" ? "orange" : "gray";
  const progress = dep.totalDays > 0 ? (dep.completedDays / dep.totalDays * 100) : 0;
  const costPct = dep.budget > 0 ? (dep.costToDate / dep.budget * 100) : 0;

  return (
    <div style={{
      background: T.white, border: `1px solid ${T.g200}`, borderRadius: 10,
      overflow: "hidden", cursor: "pointer", transition: "box-shadow .15s, transform .15s",
      borderTop: `3px solid ${dep.color}`,
    }} onClick={onOpen}>
      {/* Header */}
      <div style={{ padding: "16px 18px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 2 }}>{dep.name}</div>
            <div style={{ fontSize: 11.5, color: T.g500 }}>{dep.location} · {dep.type}</div>
          </div>
          <Chip color={statusColor}>{dep.status}</Chip>
        </div>

        {/* Duration progress */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: T.g500, marginBottom: 3 }}>
            <span>Day {dep.completedDays} of {dep.totalDays}</span>
            <span>{dep.startDate} → {dep.estEndDate}</span>
          </div>
          <div style={{ height: 6, background: T.g200, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: dep.status === "Active" ? T.blue : T.g400, borderRadius: 3, transition: "width .5s" }} />
          </div>
        </div>

        {/* Key metrics grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[
            { l: "Personnel", v: dep.personnel, c: T.blue },
            { l: "Assets", v: dep.assets, c: T.teal },
            { l: "Contingents", v: dep.contingents, c: "#6C5CE7" },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: "center", padding: "8px 0", background: T.g50, borderRadius: 6 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: m.c }}>{m.v}</div>
              <div style={{ fontSize: 10, color: T.g500, fontWeight: 550 }}>{m.l}</div>
            </div>
          ))}
        </div>

        {/* Rotation countdown + Cost */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
          <div style={{ padding: "8px 10px", background: T.g50, borderRadius: 6 }}>
            <div style={{ fontSize: 10, color: T.g500, fontWeight: 550, marginBottom: 2 }}>Next Rotation</div>
            {dep.rotationDaysLeft !== null ? (
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: dep.rotationDaysLeft <= 3 ? T.coral : T.navy }}>{dep.rotationDaysLeft}</span>
                <span style={{ fontSize: 10.5, color: T.g500 }}>days · R{dep.currentRotation + 1} of {dep.totalRotations}</span>
              </div>
            ) : (
              <span style={{ fontSize: 12, color: T.g400 }}>—</span>
            )}
          </div>
          <div style={{ padding: "8px 10px", background: T.g50, borderRadius: 6 }}>
            <div style={{ fontSize: 10, color: T.g500, fontWeight: 550, marginBottom: 2 }}>Cost to Date</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>${(dep.costToDate / 1000).toFixed(0)}k</span>
              <span style={{ fontSize: 10.5, color: T.g500 }}>/ ${(dep.budget / 1000).toFixed(0)}k ({costPct.toFixed(0)}%)</span>
            </div>
          </div>
        </div>

        {/* Commander + open */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${T.g100}`, paddingTop: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Avatar i={dep.commanderInit} c={dep.color} s={22} />
            <span style={{ fontSize: 11.5, color: T.g600, fontWeight: 550 }}>{dep.commander}</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: T.blue }}>Open →</span>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   LIVE OPS LOG
   ═══════════════════════════════════════════════ */
function LiveOpsLog() {
  const [catFilter, setCatFilter] = useState("All");
  const [depFilter, setDepFilter] = useState("All");
  const categories = ["All", ...new Set(OPS_LOG.map(l => l.category))];
  const deployments = ["All", ...new Set(OPS_LOG.map(l => l.deployment))];

  const filtered = OPS_LOG.filter(l => {
    if (catFilter !== "All" && l.category !== catFilter) return false;
    if (depFilter !== "All" && l.deployment !== depFilter) return false;
    return true;
  });

  const prioColor = (p) => p === "High" ? "coral" : p === "Medium" ? "orange" : p === "Info" ? "blue" : "gray";

  return (
    <div style={{ background: T.white, border: `1px solid ${T.g200}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.g200}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 650 }}>Live Ops Log</span>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: T.green, animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 11, color: T.g500 }}>{filtered.length} events</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={depFilter} onChange={e => setDepFilter(e.target.value)} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${T.g300}`, fontSize: 12, fontFamily: "inherit", background: T.white }}>
            {deployments.map(d => <option key={d} value={d}>{d === "All" ? "All Deployments" : d}</option>)}
          </select>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${T.g300}`, fontSize: 12, fontFamily: "inherit", background: T.white }}>
            {categories.map(c => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
          </select>
        </div>
      </div>
      <div style={{ maxHeight: 380, overflowY: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr style={{ position: "sticky", top: 0, background: T.g50, zIndex: 1 }}>
            <TH w={120}>Time</TH>
            <TH w={140}>Deployment</TH>
            <TH w={110}>Category</TH>
            <TH>Event</TH>
            <TH w={80}>Priority</TH>
          </tr></thead>
          <tbody>
            {filtered.map((l, i) => (
              <tr key={i} style={{ background: l.priority === "High" ? "#FFF5F5" : "transparent" }}>
                <TD mono s={{ fontSize: 11, color: T.g500 }}>{l.time}</TD>
                <TD fw={550} s={{ fontSize: 12 }}>{l.deployment}</TD>
                <TD>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 12 }}>{l.icon}</span>
                    <span style={{ fontSize: 12, color: T.g600 }}>{l.category}</span>
                  </div>
                </TD>
                <TD s={{ fontSize: 12.5 }}>{l.event}</TD>
                <TD><Chip color={prioColor(l.priority)}>{l.priority}</Chip></TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════
   DEPLOYMENT DETAIL — Personnel, Welfare, SitReps, Rostering
   ═══════════════════════════════════════════════ */
function DeploymentDetail({ deployment, onBack }) {
  const tabs = ["Personnel", "Welfare", "SitReps", "Rostering"];
  const [tab, setTab] = useState(tabs[0]);
  const dep = deployment;
  const progress = dep.totalDays > 0 ? (dep.completedDays / dep.totalDays * 100) : 0;

  return <div style={{ padding: "24px 32px" }}>
    {/* Back button + title */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <button onClick={onBack} style={{ background: "none", border: `1px solid ${T.g300}`, borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", color: T.g600, fontWeight: 550 }}>← Back to Deployments</button>
    </div>

    {/* Deployment header card */}
    <div style={{ background: T.white, border: `1px solid ${T.g200}`, borderRadius: 10, borderTop: `3px solid ${dep.color}`, padding: "18px 22px", marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{dep.name}</h2>
          <p style={{ fontSize: 12.5, color: T.g500, margin: "3px 0 0" }}>{dep.incident} · {dep.location}</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Chip color={dep.status === "Active" ? "green" : dep.status === "Mobilising" ? "orange" : "gray"}>{dep.status}</Chip>
          <Chip color={dep.type === "Interstate" ? "blue" : "teal"}>{dep.type}</Chip>
        </div>
      </div>

      {/* Summary KPIs */}
      <div style={{ display: "flex", gap: 12 }}>
        {[
          { l: "Duration", v: `Day ${dep.completedDays} of ${dep.totalDays}` },
          { l: "Personnel", v: dep.personnel },
          { l: "Assets", v: dep.assets },
          { l: "Contingents", v: dep.contingents },
          { l: "Rotation", v: dep.currentRotation > 0 ? `R${dep.currentRotation} of ${dep.totalRotations}` : "—" },
          { l: "Next Rotation", v: dep.nextRotation },
          { l: "Commander", v: dep.commander },
          { l: "Cost", v: `$${(dep.costToDate / 1000).toFixed(0)}k / $${(dep.budget / 1000).toFixed(0)}k` },
        ].map((m, i) => (
          <div key={i} style={{ flex: 1, padding: "6px 0", borderRight: i < 7 ? `1px solid ${T.g200}` : "none", paddingRight: 12 }}>
            <div style={{ fontSize: 10, color: T.g500, fontWeight: 550, textTransform: "uppercase", letterSpacing: .3 }}>{m.l}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginTop: 2 }}>{m.v}</div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 12 }}>
        <div style={{ height: 5, background: T.g200, borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: T.blue, borderRadius: 3 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: T.g400, marginTop: 2 }}>
          <span>{dep.startDate}</span>
          <span>{Math.round(progress)}% complete</span>
          <span>{dep.estEndDate}</span>
        </div>
      </div>
    </div>

    {/* Tabs */}
    <TabBar tabs={tabs} active={tab} onChange={setTab} />

    {tab === "Personnel" && <PersonnelDetail />}
    {tab === "Welfare" && <WelfareDetail />}
    {tab === "SitReps" && <SitRepsDetail />}
    {tab === "Rostering" && <RosteringDetail dep={dep} />}
  </div>;
}


/* ─── Personnel Detail ─── */
function PersonnelDetail() {
  return <>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {[
        { l: "Total Deployed", v: DETAIL_PERSONNEL.length, c: T.blue },
        { l: "Active", v: DETAIL_PERSONNEL.filter(p => p.status === "Active").length, c: T.green },
        { l: "Flagged", v: DETAIL_PERSONNEL.filter(p => p.status === "Flagged").length, c: T.coral },
        { l: "Avg Fatigue", v: `${Math.round(DETAIL_PERSONNEL.reduce((s, p) => s + p.fatigue, 0) / DETAIL_PERSONNEL.length)}%`, c: T.orange },
      ].map((s, i) => (
        <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} />
          <span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span>
          <span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span>
        </div>
      ))}
    </div>
    <div style={{ background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>
          <TH>Name</TH><TH>Role</TH><TH>Agency</TH><TH>Contingent</TH><TH>Day</TH><TH>Fatigue</TH><TH>Status</TH>
        </tr></thead>
        <tbody>
          {DETAIL_PERSONNEL.map((p, i) => (
            <tr key={i} style={{ background: p.status === "Flagged" ? "#FFF5F5" : "transparent" }}>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar i={p.init} c={p.status === "Flagged" ? T.coral : T.blue} s={26} />
                  <span style={{ fontWeight: 600 }}>{p.name}</span>
                </div>
              </TD>
              <TD>{p.role}</TD>
              <TD>{p.agency}</TD>
              <TD><span style={{ padding: "2px 8px", background: T.g50, borderRadius: 4, fontSize: 11.5, fontWeight: 550, fontFamily: "'DM Mono', monospace" }}>{p.contingent}</span></TD>
              <TD fw={600}>{p.day}</TD>
              <TD>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 50, height: 5, background: T.g200, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${p.fatigue}%`, background: p.fatigue >= 80 ? T.coral : p.fatigue >= 65 ? T.orange : T.green, borderRadius: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: p.fatigue >= 80 ? T.coral : T.g600 }}>{p.fatigue}%</span>
                </div>
              </TD>
              <TD><Chip color={p.status === "Active" ? "green" : "coral"}>{p.status}</Chip></TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>;
}


/* ─── Welfare Detail ─── */
function WelfareDetail() {
  return <>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {[
        { l: "Total Reports", v: DETAIL_WELFARE.length, c: T.navy },
        { l: "Open", v: DETAIL_WELFARE.filter(w => w.status === "Open").length, c: T.coral },
        { l: "Under Review", v: DETAIL_WELFARE.filter(w => w.status === "Under Review").length, c: T.orange },
        { l: "Resolved", v: DETAIL_WELFARE.filter(w => w.status === "Resolved").length, c: T.green },
      ].map((s, i) => (
        <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} />
          <span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span>
          <span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {DETAIL_WELFARE.map((w, i) => (
        <div key={i} style={{
          background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, padding: "14px 18px",
          borderLeft: `3px solid ${w.severity === "High" ? T.coral : w.severity === "Medium" ? T.orange : T.g300}`,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, color: T.g500 }}>{w.id}</span>
              <span style={{ fontWeight: 650, fontSize: 14 }}>{w.person}</span>
              <Chip color={w.type === "Fatigue" ? "orange" : w.type === "Injury" ? "coral" : "blue"}>{w.type}</Chip>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Chip color={w.status === "Open" ? "coral" : w.status === "Under Review" ? "orange" : "green"}>{w.status}</Chip>
              <Chip color={w.severity === "High" ? "coral" : w.severity === "Medium" ? "orange" : "gray"}>{w.severity}</Chip>
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: T.g600, marginBottom: 6, fontStyle: "italic", padding: "6px 10px", background: T.g50, borderRadius: 4 }}>"{w.notes}"</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: T.g500 }}>
            <span>Reported: {w.reported}</span>
            <span>Assigned to: <strong style={{ color: T.navy }}>{w.assignee}</strong></span>
          </div>
        </div>
      ))}
    </div>
  </>;
}


/* ─── SitReps Detail ─── */
function SitRepsDetail() {
  return <>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <Chip color="blue">{DETAIL_SITREPS.length} SitReps</Chip>
      </div>
      <Btn v="primary" s={{ padding: "6px 14px", fontSize: 12 }}>+ New SitRep</Btn>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {DETAIL_SITREPS.map((sr, i) => (
        <div key={i} style={{ display: "flex", gap: 12, position: "relative" }}>
          {/* Timeline line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.blue, color: T.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, zIndex: 1 }}>{DETAIL_SITREPS.length - i}</div>
            {i < DETAIL_SITREPS.length - 1 && <div style={{ width: 2, flex: 1, background: T.g200, minHeight: 24 }} />}
          </div>
          {/* Card */}
          <div style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, padding: "12px 16px", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 600, color: T.g500 }}>{sr.id}</span>
                <Chip color={sr.type === "Initial" ? "teal" : sr.type === "Logistics" ? "orange" : "blue"}>{sr.type}</Chip>
              </div>
              <span style={{ fontSize: 11, color: T.g400 }}>{sr.date}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 4 }}>{sr.headline}</div>
            <div style={{ fontSize: 11.5, color: T.g500 }}>By {sr.author} · <Chip color="green">{sr.status}</Chip></div>
          </div>
        </div>
      ))}
    </div>
  </>;
}


/* ─── Rostering Detail ─── */
function RosteringDetail({ dep }) {
  return <>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {[
        { l: "Current Rotation", v: dep.currentRotation || "—", c: T.blue },
        { l: "Total Rotations", v: dep.totalRotations, c: T.navy },
        { l: "Next Changeover", v: dep.nextRotation, c: dep.rotationDaysLeft !== null && dep.rotationDaysLeft <= 3 ? T.coral : T.green },
      ].map((s, i) => (
        <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} />
          <span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span>
          <span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span>
        </div>
      ))}
    </div>
    <div style={{ background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>
          <TH>Rotation</TH><TH>Start</TH><TH>End</TH><TH>Personnel</TH><TH>Status</TH><TH>Days Left</TH>
        </tr></thead>
        <tbody>
          {DETAIL_ROSTER.map((r, i) => (
            <tr key={i} style={{ background: r.status === "Active" ? T.blueL : "transparent" }}>
              <TD fw={700} s={{ fontSize: 15 }}>R{r.rotation}</TD>
              <TD fw={550}>{r.startDate}</TD>
              <TD fw={550}>{r.endDate}</TD>
              <TD fw={600}>{r.personnel}</TD>
              <TD><Chip color={r.status === "Active" ? "blue" : r.status === "Planned" ? "green" : "orange"}>{r.status}</Chip></TD>
              <TD s={{ fontWeight: 600, color: r.daysLeft !== null && r.daysLeft <= 3 ? T.coral : T.navy }}>{r.daysLeft !== null ? `${r.daysLeft} days` : "—"}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Rotation timeline visual */}
    <div style={{ marginTop: 20, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, padding: "16px 18px" }}>
      <div style={{ fontSize: 13, fontWeight: 650, marginBottom: 12 }}>Rotation Timeline</div>
      <div style={{ display: "flex", gap: 4, height: 32 }}>
        {DETAIL_ROSTER.map((r, i) => {
          const w = (r.status === "Unconfirmed" ? 28 : 50);
          return (
            <div key={i} style={{
              flex: `0 0 ${w}%`, height: "100%",
              background: r.status === "Active" ? T.blue : r.status === "Planned" ? T.green : T.g300,
              borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
              color: r.status === "Active" || r.status === "Planned" ? T.white : T.g600,
              fontSize: 11, fontWeight: 650,
            }}>
              R{r.rotation} · {r.startDate} – {r.endDate}
            </div>
          );
        })}
      </div>
    </div>
  </>;
}
