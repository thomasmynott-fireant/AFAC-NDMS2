import { useState, useEffect, useCallback } from "react";

/* ─── AFAC Brand Tokens ─── */
const T = {
  blue: "#0E78C9", blueL: "#E8F4FC", blueH: "#0B6AB5",
  teal: "#1FB6C9", tealL: "#E6F8FA",
  coral: "#E65A46", coralL: "#FDEEEC",
  orange: "#F08A27", orangeL: "#FEF3E6",
  green: "#8CC43C", greenL: "#F0F9E6",
  navy: "#23344A", navyL: "#3A5068",
  g50: "#F8F9FA", g100: "#F1F3F5", g200: "#E5E8EB", g300: "#CED4DA",
  g400: "#ADB5BD", g500: "#868E96", g600: "#6C757D", g700: "#495057",
  white: "#FFFFFF",
};

/* ─── Icons (inline SVG components) ─── */
const Icon = ({ d, size = 18, stroke = "currentColor", sw = 1.8, fill = "none", children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    {d && <path d={d} />}
    {children}
  </svg>
);

const Icons = {
  home: <Icon><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>,
  people: <Icon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/></Icon>,
  doc: <Icon><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></Icon>,
  truck: <Icon><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4a2 2 0 012 2v9a2 2 0 01-2 2H6"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></Icon>,
  mapPin: <Icon><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z"/></Icon>,
  grid: <Icon><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></Icon>,
  flag: <Icon><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></Icon>,
  dollar: <Icon><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></Icon>,
  send: <Icon><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></Icon>,
  settings: <Icon><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9"/></Icon>,
  bell: <Icon><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></Icon>,
  search: <Icon size={15}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>,
  plus: <Icon size={14} sw={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Icon>,
  chevDown: <Icon size={12} sw={2}><polyline points="6 9 12 15 18 9"/></Icon>,
  check: <Icon size={14} sw={2.5}><polyline points="20 6 9 17 4 12"/></Icon>,
  x: <Icon size={14} sw={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>,
  alert: <Icon size={16} sw={2}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Icon>,
  user: <Icon size={14}><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0113 0"/></Icon>,
  download: <Icon size={14} sw={2}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></Icon>,
  clock: <Icon size={14}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>,
};

/* ─── Chip component ─── */
const Chip = ({ color, children, dot = true }) => {
  const colors = {
    blue: { bg: T.blueL, fg: T.blue },
    teal: { bg: T.tealL, fg: "#148895" },
    coral: { bg: T.coralL, fg: T.coral },
    orange: { bg: T.orangeL, fg: "#c06e15" },
    green: { bg: T.greenL, fg: "#5a8a1f" },
    gray: { bg: T.g100, fg: T.g600 },
  };
  const c = colors[color] || colors.gray;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 550, whiteSpace: "nowrap",
      background: c.bg, color: c.fg,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.fg }} />}
      {children}
    </span>
  );
};

/* ─── Avatar ─── */
const Avatar = ({ initials, color = T.blue, size = 32 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: color, color: T.white,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, flexShrink: 0,
  }}>{initials}</div>
);

/* ─── Button ─── */
const Btn = ({ children, variant = "secondary", style: s, ...props }) => {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    padding: "7px 16px", borderRadius: 6, fontSize: 13, fontWeight: 550,
    border: "none", cursor: "pointer", whiteSpace: "nowrap",
    fontFamily: "inherit", transition: "all .15s",
  };
  const v = {
    primary: { background: T.blue, color: T.white },
    secondary: { background: T.white, color: T.navy, border: `1px solid ${T.g300}` },
    ghost: { background: "transparent", color: T.g600 },
    light: { background: "rgba(255,255,255,.12)", color: T.white, border: "1px solid rgba(255,255,255,.2)" },
  };
  return <button style={{ ...base, ...v[variant], ...s }} {...props}>{children}</button>;
};

/* ─── Data ─── */
const ROLES = [
  { id: "nrsc", label: "NRSC Staff", name: "Jessica Walsh", agency: "NRSC", initials: "JW", color: T.teal },
  { id: "team", label: "Team Member", name: "Daniel Thornton", agency: "NSW RFS", initials: "DT", color: T.blue },
  { id: "agency", label: "Agency Staff", name: "Sarah Patel", agency: "NSW RFS", initials: "SP", color: T.coral },
];

const NAV_ITEMS = {
  nrsc: [
    { section: "Operations", items: [
      { icon: "home", label: "Home", id: "home", badge: null },
      { icon: "people", label: "People", id: "people" },
      { icon: "doc", label: "Requests", id: "requests", badge: "3" },
      { icon: "truck", label: "Contingents", id: "contingents" },
      { icon: "mapPin", label: "Live Deployment", id: "live", badge: "!" },
    ]},
    { section: "Intelligence", items: [
      { icon: "grid", label: "Dashboards", id: "dashboards" },
      { icon: "flag", label: "SitReps", id: "sitreps" },
    ]},
    { section: "Finance", items: [
      { icon: "dollar", label: "Financial Reconciliation", id: "finance" },
    ]},
    { section: "Specialist", items: [
      { icon: "send", label: "National Aviation", id: "aviation" },
    ]},
  ],
  team: [
    { section: "My NDMS", items: [
      { icon: "home", label: "My Readiness", id: "home" },
      { icon: "people", label: "My Profile", id: "profile" },
      { icon: "doc", label: "My Documents", id: "documents" },
    ]},
    { section: "Deployment", items: [
      { icon: "mapPin", label: "My Deployment", id: "deployment", badge: "1" },
      { icon: "dollar", label: "My Claims", id: "claims" },
    ]},
  ],
  agency: [
    { section: "Agency", items: [
      { icon: "home", label: "Agency Operations", id: "home" },
      { icon: "people", label: "Our People", id: "people", badge: "5" },
      { icon: "doc", label: "Requests", id: "requests" },
      { icon: "truck", label: "Contingents", id: "contingents" },
    ]},
    { section: "Review", items: [
      { icon: "check", label: "Approvals", id: "approvals", badge: "5" },
      { icon: "dollar", label: "Claims Review", id: "claims", badge: "8" },
      { icon: "grid", label: "Dashboard", id: "dashboard" },
    ]},
  ],
};

/* ─── Main App ─── */
export default function NDMSPrototype() {
  const [role, setRole] = useState("nrsc");
  const [activeNav, setActiveNav] = useState("home");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setActiveNav("home"); }, [role]);

  const currentRole = ROLES.find(r => r.id === role);
  const navSections = NAV_ITEMS[role];
  const iconMap = Icons;

  return (
    <div style={{
      display: "flex", height: "100vh", fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: T.navy, fontSize: 14, lineHeight: 1.5,
      WebkitFontSmoothing: "antialiased",
      opacity: mounted ? 1 : 0, transition: "opacity .4s",
    }}>
      {/* ═══ LEFT NAV ═══ */}
      <nav style={{
        width: 248, background: T.navy, display: "flex", flexDirection: "column",
        flexShrink: 0, overflowY: "auto", overflowX: "hidden",
      }}>
        {/* Logo */}
        <div style={{
          padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,.08)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 38, height: 38, background: T.blue, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: T.white, fontWeight: 800, fontSize: 15,
          }}>N</div>
          <div>
            <div style={{ color: T.white, fontWeight: 700, fontSize: 16, letterSpacing: .3 }}>NDMS</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: 10.5, letterSpacing: .3 }}>National Deployment</div>
          </div>
        </div>

        {/* Nav sections */}
        <div style={{ flex: 1, padding: "8px 0" }}>
          {navSections.map((sec, si) => (
            <div key={si} style={{ padding: "8px 12px 4px" }}>
              <div style={{
                fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,.3)",
                textTransform: "uppercase", letterSpacing: 1.2, padding: "0 10px 8px",
              }}>{sec.section}</div>
              {sec.items.map(item => {
                const active = activeNav === item.id;
                return (
                  <div key={item.id} onClick={() => setActiveNav(item.id)} style={{
                    display: "flex", alignItems: "center", gap: 11,
                    padding: "8px 12px", borderRadius: 6, cursor: "pointer",
                    color: active ? T.white : "rgba(255,255,255,.6)",
                    background: active ? "rgba(14,120,201,.2)" : "transparent",
                    fontSize: 13.5, fontWeight: 500, position: "relative",
                    transition: "all .12s", marginBottom: 1,
                  }}>
                    {active && <div style={{
                      position: "absolute", left: -12, top: "50%", transform: "translateY(-50%)",
                      width: 3, height: 20, background: T.blue, borderRadius: "0 3px 3px 0",
                    }} />}
                    <span style={{ opacity: active ? 1 : .65, display: "flex" }}>{iconMap[item.icon]}</span>
                    {item.label}
                    {item.badge && (
                      <span style={{
                        marginLeft: "auto", background: item.badge === "!" ? T.orange : T.coral,
                        color: T.white, fontSize: 10, fontWeight: 700,
                        padding: "1px 7px", borderRadius: 10, minWidth: 18, textAlign: "center",
                      }}>{item.badge}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Settings */}
        <div style={{ padding: "0 12px 4px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 11,
            padding: "8px 12px", borderRadius: 6, cursor: "pointer",
            color: "rgba(255,255,255,.6)", fontSize: 13.5, fontWeight: 500,
          }}>
            <span style={{ opacity: .65, display: "flex" }}>{Icons.settings}</span>
            Admin & Settings
          </div>
        </div>

        {/* Role Switch + User */}
        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ position: "relative" }}>
            <button onClick={(e) => { e.stopPropagation(); setRoleMenuOpen(!roleMenuOpen); }} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              padding: "7px 12px", background: "rgba(255,255,255,.07)",
              border: "1px solid rgba(255,255,255,.1)", borderRadius: 6,
              color: "rgba(255,255,255,.7)", fontSize: 12, cursor: "pointer",
              fontFamily: "inherit", fontWeight: 500,
            }}>
              {Icons.user}
              <span>{currentRole.label}</span>
              <span style={{ marginLeft: "auto" }}>{Icons.chevDown}</span>
            </button>
            {roleMenuOpen && (
              <div style={{
                position: "absolute", bottom: "calc(100% + 6px)", left: 0, right: 0,
                background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6,
                boxShadow: "0 8px 24px rgba(35,52,74,.12)", zIndex: 200, overflow: "hidden",
              }}>
                <div style={{ padding: "8px 12px 4px", fontSize: 10, fontWeight: 600, color: T.g400, textTransform: "uppercase", letterSpacing: 1 }}>
                  Switch Role View
                </div>
                {ROLES.map(r => (
                  <div key={r.id} onClick={() => { setRole(r.id); setRoleMenuOpen(false); }}
                    style={{
                      padding: "8px 12px", fontSize: 12.5, cursor: "pointer",
                      color: role === r.id ? T.blue : T.navy,
                      background: role === r.id ? T.blueL : "transparent",
                      fontWeight: role === r.id ? 600 : 400,
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                    <Avatar initials={r.initials} color={r.color} size={22} />
                    <div>
                      <div>{r.label}</div>
                      <div style={{ fontSize: 10, color: T.g500 }}>{r.name} · {r.agency}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginTop: 10, padding: "6px 4px",
            borderRadius: 6, cursor: "pointer",
          }}>
            <Avatar initials={currentRole.initials} color={currentRole.color} size={34} />
            <div>
              <div style={{ color: "rgba(255,255,255,.85)", fontSize: 13, fontWeight: 550 }}>{currentRole.name}</div>
              <div style={{ color: "rgba(255,255,255,.38)", fontSize: 11 }}>{currentRole.agency}</div>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ MAIN AREA ═══ */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: T.g50 }}
        onClick={() => setRoleMenuOpen(false)}>
        {/* Top Bar */}
        <div style={{
          height: 54, background: T.white, borderBottom: `1px solid ${T.g200}`,
          display: "flex", alignItems: "center", padding: "0 24px", gap: 14, flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.navy }}>
            {role === "nrsc" ? "National Operations" : role === "team" ? "My Readiness" : "Agency Operations"}
          </span>
          <div style={{ flex: 1 }} />
          <span style={{
            padding: "3px 12px", background: T.orangeL, color: T.orange,
            fontSize: 10.5, fontWeight: 650, borderRadius: 4, letterSpacing: .5,
          }}>PROTOTYPE</span>
          <div style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "5px 12px", background: T.g100, borderRadius: 6,
            color: T.g500, fontSize: 13, cursor: "pointer", minWidth: 180,
          }}>
            {Icons.search}
            Search NDMS…
            <span style={{
              marginLeft: "auto", background: T.white, border: `1px solid ${T.g200}`,
              borderRadius: 3, padding: "1px 5px", fontSize: 10, fontFamily: "inherit",
            }}>⌘K</span>
          </div>
          <div style={{ position: "relative", cursor: "pointer", padding: 6 }}>
            {Icons.bell}
            <div style={{
              position: "absolute", top: 4, right: 4, width: 8, height: 8,
              background: T.coral, borderRadius: "50%", border: `2px solid ${T.white}`,
            }} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 40px" }}>
          {role === "nrsc" && <NRSCHome />}
          {role === "team" && <TeamMemberHome />}
          {role === "agency" && <AgencyHome />}
        </div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   NRSC STAFF — National Operations Home
   ═══════════════════════════════════════════════════ */
function NRSCHome() {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${T.navy} 0%, #2c4a6a 100%)`,
        padding: "22px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <h1 style={{ color: T.white, fontSize: 21, fontWeight: 700, margin: 0 }}>National Operations Overview</h1>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 13, margin: "4px 0 0" }}>Monday 30 Mar 2026 — Season 2025/26 — Week 22</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="light">{Icons.download} Export</Btn>
          <Btn variant="primary">{Icons.plus} New SitRep</Btn>
        </div>
      </div>

      <div style={{ padding: "20px 32px" }}>
        {/* Alert */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 16px", borderRadius: 6, marginBottom: 20,
          background: T.orangeL, borderLeft: `3px solid ${T.orange}`, fontSize: 13,
        }}>
          {Icons.alert}
          <div><strong>I/I/I Report filed</strong> — Welfare incident reported by AREP for contingent IMT1 (Canada 2025). Investigation commenced. <a style={{ color: "inherit", textDecoration: "underline" }}>View report →</a></div>
        </div>

        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 22 }}>
          {[
            { label: "Currently Deployed", value: "247", change: "↑ 18 from last week", changeColor: T.green },
            { label: "Active Requests", value: "12", change: "3 pending allocation", changeColor: T.g500 },
            { label: "Active Contingents", value: "8", change: "Across 3 deployments", changeColor: T.g500 },
            { label: "NAA Assets Active", value: "3", change: "1 pending approval", changeColor: T.coral },
            { label: "Inbound Rotations", value: "14", change: "Next 72h", changeColor: T.orange },
          ].map((m, i) => (
            <div key={i} style={{
              background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, padding: "18px 20px",
              transition: "box-shadow .15s", cursor: "pointer",
            }}>
              <div style={{ fontSize: 12, color: T.g500, marginBottom: 8 }}>{m.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 3 }}>{m.value}</div>
              <div style={{ fontSize: 11, fontWeight: 550, color: m.changeColor }}>{m.change}</div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: 20 }}>
          <div>
            {/* Map */}
            <Card title="Deployment Map" right={
              <div style={{ display: "flex", gap: 6 }}>
                <Chip color="green">In Field</Chip>
                <Chip color="orange">Mobilising</Chip>
                <Chip color="coral">Attention</Chip>
              </div>
            }>
              <div style={{
                height: 260, background: `linear-gradient(170deg, ${T.g100} 0%, #e0eef8 40%, #e8f0e4 70%, ${T.g100} 100%)`,
                borderRadius: 6, position: "relative", overflow: "hidden",
              }}>
                {/* Stylised Australia outline */}
                <svg viewBox="0 0 500 300" style={{ width: "100%", height: "100%", position: "absolute" }}>
                  <path d="M180,60 Q200,40 230,55 Q260,35 290,50 L310,65 Q330,60 345,80 L350,110 Q360,130 350,155 L340,180 Q330,200 310,210 L290,215 Q270,225 250,220 L230,225 Q210,230 195,215 L180,195 Q165,175 170,155 L165,130 Q160,100 170,80 Z" fill="rgba(14,120,201,.06)" stroke="rgba(14,120,201,.15)" strokeWidth="1.5"/>
                  {/* Deploy dots */}
                  <circle cx="280" cy="65" r="6" fill={T.green} stroke={T.white} strokeWidth="2"/>
                  <circle cx="280" cy="65" r="11" fill="none" stroke={T.green} strokeWidth="1" opacity=".3"/>
                  <circle cx="310" cy="110" r="5" fill={T.green} stroke={T.white} strokeWidth="2"/>
                  <circle cx="295" cy="155" r="5" fill={T.orange} stroke={T.white} strokeWidth="2"/>
                  <circle cx="270" cy="175" r="5" fill={T.green} stroke={T.white} strokeWidth="2"/>
                  <circle cx="210" cy="170" r="4" fill={T.green} stroke={T.white} strokeWidth="2"/>
                  {/* Canada marker */}
                  <circle cx="80" cy="35" r="6" fill={T.coral} stroke={T.white} strokeWidth="2"/>
                  <circle cx="80" cy="35" r="11" fill="none" stroke={T.coral} strokeWidth="1" opacity=".3"/>
                  {/* Labels */}
                  <text x="290" y="55" fontSize="9" fill={T.navy} fontWeight="600">Darwin</text>
                  <text x="62" y="27" fontSize="9" fill={T.coral} fontWeight="600">Canada 2025</text>
                  <text x="320" y="107" fontSize="8" fill={T.g500}>QLD</text>
                  <text x="302" y="150" fontSize="8" fill={T.g500}>NSW</text>
                  <text x="276" y="172" fontSize="8" fill={T.g500}>VIC</text>
                  <text x="218" y="167" fontSize="8" fill={T.g500}>SA</text>
                </svg>
              </div>
            </Card>

            {/* Personnel by Status */}
            <Card title="Personnel by Status" right={<Btn variant="ghost" style={{ fontSize: 12 }}>View all →</Btn>} style={{ marginTop: 16 }}>
              {[
                { label: "Working", val: 153, pct: 62, color: T.blue },
                { label: "Resting", val: 49, pct: 20, color: T.teal },
                { label: "Travel", val: 21, pct: 8, color: T.orange },
                { label: "Briefing", val: 10, pct: 4, color: T.green },
                { label: "Demob", val: 14, pct: 6, color: T.g400 },
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
                  <span style={{ width: 65, fontSize: 12, color: T.g500, textAlign: "right" }}>{b.label}</span>
                  <div style={{ flex: 1, height: 22, background: T.g100, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${b.pct}%`, height: "100%", background: b.color, borderRadius: 3, transition: "width .6s ease" }} />
                  </div>
                  <span style={{ width: 32, fontSize: 12, fontWeight: 650, textAlign: "right" }}>{b.val}</span>
                </div>
              ))}
            </Card>

            {/* Requests table */}
            <Card title="Recent Requests" right={<Btn variant="ghost" style={{ fontSize: 12 }}>All requests →</Btn>} style={{ marginTop: 16 }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      {["Request ID", "Route", "Type", "Roles", "Status", "Updated"].map(h => (
                        <th key={h} style={{
                          textAlign: "left", padding: "8px 10px", fontWeight: 550, color: T.g500,
                          fontSize: 11, textTransform: "uppercase", letterSpacing: .5,
                          borderBottom: `2px solid ${T.g200}`, whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "2025_26_007NT_NSW001", route: "NT → NSW", type: "Interstate", roles: "IMT, DM, Safety Officer", status: "Deployed", color: "green", date: "28 Mar" },
                      { id: "2025_26_012INT_CAN001", route: "NRSC → Canada", type: "International", roles: "INLO, IMT, CREW ×2", status: "Mobilising", color: "blue", date: "29 Mar" },
                      { id: "2025_26_015QLD_VIC002", route: "QLD → VIC", type: "Interstate", roles: "Crew Leader, Storm Ops ×6", status: "Pending Allocation", color: "orange", date: "30 Mar" },
                      { id: "2025_26_009SA_NSW003", route: "SA → NSW", type: "Interstate", roles: "Management Support Officer", status: "Demobilising", color: "gray", date: "27 Mar" },
                      { id: "2025_26_018WA_NT004", route: "WA → NT", type: "Interstate", roles: "JLO, Safety Advisor", status: "Under Review", color: "teal", date: "30 Mar" },
                    ].map((r, i) => (
                      <tr key={i} style={{ cursor: "pointer" }}>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}`, fontFamily: "'DM Mono', monospace", fontSize: 11.5 }}>{r.id}</td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}`, fontWeight: 550 }}>{r.route}</td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}` }}>{r.type}</td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}`, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.roles}</td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}` }}><Chip color={r.color}>{r.status}</Chip></td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}`, fontSize: 12, color: T.g500 }}>{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div>
            {/* Quick Actions */}
            <Card title="Quick Actions">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { icon: "📋", label: "New Request" },
                  { icon: "✈️", label: "NAA Request" },
                  { icon: "📊", label: "Run Report" },
                  { icon: "📝", label: "Draft SitRep" },
                ].map((a, i) => (
                  <div key={i} style={{
                    padding: 14, border: `1px solid ${T.g200}`, borderRadius: 6,
                    textAlign: "center", cursor: "pointer", transition: "all .12s",
                    background: T.white,
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{a.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 550 }}>{a.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Issues */}
            <Card title="Active Issues" right={<Chip color="coral">4</Chip>} style={{ marginTop: 16 }}>
              {[
                { icon: "⚠", bg: T.coralL, fg: T.coral, title: "I/I/I — Welfare", sub: "Canada 2025 · IMT1 · Investigation commenced", time: "2h ago" },
                { icon: "⏱", bg: T.orangeL, fg: T.orange, title: "Fatigue threshold", sub: "NT Support · 3 personnel at 12+ consecutive days", time: "4h ago" },
                { icon: "↻", bg: T.blueL, fg: T.blue, title: "Rotation gap", sub: "NT Support · 2 DM replacements needed by 4 Apr", time: "6h ago" },
                { icon: "$", bg: T.orangeL, fg: T.orange, title: "Claims overdue", sub: "7 claims past 14-day agency review window", time: "1d ago" },
              ].map((iss, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 0", borderBottom: i < 3 ? `1px solid ${T.g200}` : "none",
                  cursor: "pointer",
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: iss.bg, color: iss.fg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, flexShrink: 0,
                  }}>{iss.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{iss.title}</div>
                    <div style={{ fontSize: 11, color: T.g500 }}>{iss.sub}</div>
                  </div>
                  <span style={{ fontSize: 11, color: T.g400, whiteSpace: "nowrap" }}>{iss.time}</span>
                </div>
              ))}
            </Card>

            {/* SitReps */}
            <Card title="Recent SitReps" style={{ marginTop: 16 }}>
              {[
                { title: "NT Cyclone Response — SitRep #8", status: "Submitted", color: "green", meta: "29 Mar 2026, 16:00 AEST · J. Walsh" },
                { title: "Canada 2025 — Weekly #3", status: "Draft", color: "orange", meta: "30 Mar 2026, 09:12 AEST · P. Nguyễn" },
                { title: "QLD Storm Season — SitRep #14", status: "Submitted", color: "green", meta: "27 Mar 2026, 14:30 AEST · M. Cooper" },
              ].map((sr, i) => (
                <div key={i} style={{
                  padding: 12, border: `1px solid ${T.g200}`, borderRadius: 6,
                  marginBottom: 8, cursor: "pointer", transition: "box-shadow .12s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{sr.title}</span>
                    <Chip color={sr.color}>{sr.status}</Chip>
                  </div>
                  <div style={{ fontSize: 11, color: T.g500 }}>{sr.meta}</div>
                </div>
              ))}
            </Card>

            {/* Jurisdiction cards */}
            <Card title="By Jurisdiction" style={{ marginTop: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { code: "NT", deployed: 64, requests: 3, color: "green" },
                  { code: "NSW", deployed: 48, requests: 2, color: "blue" },
                  { code: "VIC", deployed: 42, requests: 2, color: "blue" },
                  { code: "QLD", deployed: 38, requests: 3, color: "orange" },
                  { code: "SA", deployed: 22, requests: 1, color: "gray" },
                  { code: "INT'L", deployed: 33, requests: 1, color: "coral" },
                ].map((j, i) => (
                  <div key={i} style={{
                    padding: 12, border: `1px solid ${T.g200}`, borderRadius: 6, cursor: "pointer",
                    transition: "box-shadow .12s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{j.code}</span>
                      <Chip color={j.color} dot={true}>{""}</Chip>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.g500, padding: "2px 0" }}>
                      <span>Deployed</span><span style={{ fontWeight: 650, color: T.navy }}>{j.deployed}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.g500, padding: "2px 0" }}>
                      <span>Requests</span><span style={{ fontWeight: 650, color: T.navy }}>{j.requests}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   TEAM MEMBER — My Readiness Home
   ═══════════════════════════════════════════════════ */
function TeamMemberHome() {
  return (
    <div style={{ padding: "24px 32px" }}>
      {/* Welcome banner */}
      <div style={{
        background: `linear-gradient(135deg, ${T.blue} 0%, #0a5f9e 100%)`,
        borderRadius: 10, padding: "22px 32px", color: T.white, marginBottom: 24,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <h2 style={{ color: T.white, fontSize: 20, fontWeight: 700, margin: 0 }}>Welcome back, Daniel</h2>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 13, margin: "4px 0 0" }}>You have 2 items requiring attention and 1 active deployment.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="light">View deployment</Btn>
          <Btn variant="light" style={{ background: "rgba(255,255,255,.25)" }}>Submit claim</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Col 1: Readiness */}
        <div>
          <Card title="Deployability Status" right={<Chip color="green">Interstate Ready</Chip>}>
            <div style={{ textAlign: "center", padding: "10px 0 6px" }}>
              <div style={{ width: 130, height: 130, margin: "0 auto 12px", position: "relative" }}>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                  <circle cx="50" cy="50" r="42" fill="none" stroke={T.g200} strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={T.green} strokeWidth="8"
                    strokeLinecap="round" strokeDasharray="264" strokeDashoffset="40"
                    style={{ transition: "stroke-dashoffset .8s ease" }} />
                </svg>
                <div style={{
                  position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 28, fontWeight: 700 }}>85%</span>
                  <span style={{ fontSize: 11, color: T.g500, fontWeight: 500 }}>Complete</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 18, color: T.green }}>✓</div>
                  <div style={{ fontSize: 11, color: T.g500 }}>Interstate</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 18, color: T.orange }}>○</div>
                  <div style={{ fontSize: 11, color: T.g500 }}>International</div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Readiness Checklist" style={{ marginTop: 16 }}>
            {[
              { done: true, text: "Profile complete", sub: "Personal details, emergency contacts" },
              { done: true, text: "Code of Conduct signed", sub: "Signed 12 Jan 2026" },
              { done: true, text: "MFA enabled", sub: "Authenticator app linked" },
              { done: true, text: "Roles approved", sub: "Crew Leader, Strike Team Leader" },
              { done: true, text: "Medical fitness", sub: "Approved · Expires 18 Nov 2026" },
              { done: false, text: "Passport uploaded", sub: "Required for international readiness", action: "Upload →" },
              { done: false, text: "WWCC", sub: "Expires 2 Apr 2026 — 3 days", action: "Update →" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 0", borderBottom: i < 6 ? `1px solid ${T.g100}` : "none",
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: item.done ? T.greenL : T.orangeL,
                  color: item.done ? T.green : T.orange,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, flexShrink: 0,
                }}>{item.done ? "✓" : "!"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{item.text}</div>
                  <div style={{ fontSize: 11, color: item.done ? T.g500 : T.orange }}>{item.sub}</div>
                </div>
                {item.action && <span style={{ fontSize: 11, color: T.blue, fontWeight: 600, cursor: "pointer" }}>{item.action}</span>}
              </div>
            ))}
          </Card>
        </div>

        {/* Col 2: Active Deployment */}
        <div>
          <Card title="Current Deployment" right={<Chip color="blue">In Field</Chip>}>
            <div style={{
              border: `1px solid ${T.g200}`, borderLeft: `3px solid ${T.blue}`,
              borderRadius: 6, padding: 16, marginBottom: 16,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 15, fontWeight: 650 }}>NT Cyclone Response</span>
                <Chip color="blue">Day 8</Chip>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", fontSize: 12 }}>
                {[
                  ["Request", "2025_26_007NT_NSW001"],
                  ["Role", "Crew Leader"],
                  ["Location", "Darwin, NT"],
                  ["Agency", "NSW RFS"],
                  ["Contingent", "CREW2"],
                  ["Status", "Working"],
                  ["Start", "22 Mar 2026"],
                  ["Est. end", "5 Apr 2026"],
                ].map(([k, v], i) => (
                  <div key={i}>
                    <span style={{ color: T.g400, fontSize: 11 }}>{k}</span>
                    <div style={{ fontWeight: 550, fontFamily: k === "Request" ? "'DM Mono', monospace" : "inherit", fontSize: k === "Request" ? 11 : 12.5 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fatigue tracker */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Fatigue Tracker</div>
              <div style={{ display: "flex", gap: 3 }}>
                {["W","W","R","W","W","R","W","✦"].map((d, i) => (
                  <div key={i} style={{
                    flex: 1, height: 26, borderRadius: 3,
                    background: d === "R" ? T.teal : d === "✦" ? T.green : T.blue,
                    color: T.white, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 700,
                    border: d === "✦" ? `2px solid ${T.navy}` : "none",
                  }}>{d}</div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.g400, marginTop: 4 }}>
                <span>22 Mar</span><span style={{ color: T.navy, fontWeight: 600 }}>Today</span>
              </div>
              <div style={{ fontSize: 10.5, color: T.g500, marginTop: 6 }}>W = Working · R = Rest · 5 consecutive work days</div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <Btn variant="secondary" style={{ flex: 1, justifyContent: "center", fontSize: 12 }}>{Icons.alert} Report Incident</Btn>
              <Btn variant="primary" style={{ flex: 1, justifyContent: "center", fontSize: 12 }}>{Icons.dollar} Submit Claim</Btn>
            </div>
          </Card>

          <Card title="My Documents" right={<Btn variant="ghost" style={{ fontSize: 11 }}>Upload →</Btn>} style={{ marginTop: 16 }}>
            {[
              { name: "Medical Fitness Certificate", meta: "Expires 18 Nov 2026", status: "Valid", color: "green" },
              { name: "Code of Conduct Declaration", meta: "Signed 12 Jan 2026", status: "Valid", color: "green" },
              { name: "Working With Children Check", meta: "Expires 2 Apr 2026", status: "Expiring", color: "orange" },
              { name: "Chainsaw Operator Certificate", meta: "Uploaded 8 Sep 2025", status: "Valid", color: "green" },
            ].map((doc, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 0", borderBottom: i < 3 ? `1px solid ${T.g100}` : "none",
              }}>
                <div style={{
                  width: 34, height: 34, background: T.g100, borderRadius: 4,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                }}>📄</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{doc.name}</div>
                  <div style={{ fontSize: 11, color: T.g500 }}>{doc.meta}</div>
                </div>
                <Chip color={doc.color}>{doc.status}</Chip>
              </div>
            ))}
          </Card>
        </div>

        {/* Col 3: Notifications */}
        <div>
          <Card title="Notifications" right={<Chip color="blue">2 new</Chip>}>
            {[
              { unread: true, title: "WWCC expiring", body: "Your WWCC expires on 2 Apr 2026. Upload a renewed document.", time: "Today, 08:00" },
              { unread: true, title: "Rotation update", body: "Deployment extended to 5 Apr 2026. Contact your DM if needed.", time: "Yesterday, 16:30" },
              { unread: false, title: "Claim approved", body: "Meal expense ($47.50 AUD) for 25 Mar approved by NSW RFS.", time: "27 Mar, 11:20" },
              { unread: false, title: "Deployment confirmed", body: "Assigned to CREW2 for request 2025_26_007NT_NSW001.", time: "21 Mar, 09:00" },
            ].map((n, i) => (
              <div key={i} style={{
                display: "flex", gap: 10, padding: "10px 0",
                borderBottom: i < 3 ? `1px solid ${T.g100}` : "none", cursor: "pointer",
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", marginTop: 5,
                  background: n.unread ? T.blue : "transparent", flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: T.g600, marginTop: 2 }}>{n.body}</div>
                  <div style={{ fontSize: 11, color: T.g400, marginTop: 3 }}>{n.time}</div>
                </div>
              </div>
            ))}
          </Card>

          <Card title="Key Contacts" style={{ marginTop: 16 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: T.g400, textTransform: "uppercase", letterSpacing: .8, fontWeight: 600, marginBottom: 8 }}>Deployment</div>
              {[
                { initials: "RK", name: "Rachel Kimura", role: "Deployment Manager", color: T.blue },
                { initials: "MS", name: "Mark Sullivan", role: "AREP — NT Operations", color: T.teal },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Avatar initials={c.initials} color={c.color} size={28} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 550 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: T.g500 }}>{c.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, color: T.g400, textTransform: "uppercase", letterSpacing: .8, fontWeight: 600, marginBottom: 8 }}>Agency</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar initials="LB" color={T.coral} size={28} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 550 }}>Linda Brooks</div>
                  <div style={{ fontSize: 11, color: T.g500 }}>NSW RFS Coordinator</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   AGENCY STAFF — Agency Operations Home
   ═══════════════════════════════════════════════════ */
function AgencyHome() {
  return (
    <div style={{ padding: "24px 32px" }}>
      {/* Agency header */}
      <div style={{
        background: T.white, border: `1px solid ${T.g200}`, borderRadius: 10,
        padding: "18px 24px", marginBottom: 22,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 46, height: 46, background: T.coral, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: T.white, fontWeight: 700, fontSize: 14,
          }}>RFS</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>NSW Rural Fire Service</div>
            <div style={{ fontSize: 13, color: T.g500 }}>New South Wales · Interstate & International Deployments</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary">{Icons.download} Export</Btn>
          <Btn variant="primary">{Icons.plus} Nominate Personnel</Btn>
        </div>
      </div>

      {/* Summary tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 22 }}>
        {[
          { val: "142", label: "Registered Personnel", color: T.navy },
          { val: "118", label: "Interstate Ready", color: T.green },
          { val: "34", label: "Currently Deployed", color: T.blue },
          { val: "5", label: "Pending Approvals", color: T.orange },
          { val: "8", label: "Claims to Review", color: T.coral },
        ].map((t, i) => (
          <div key={i} style={{
            background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8,
            padding: "16px 20px", textAlign: "center",
          }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: t.color }}>{t.val}</div>
            <div style={{ fontSize: 11.5, color: T.g500, marginTop: 3 }}>{t.label}</div>
          </div>
        ))}
      </div>

      {/* Alert */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "11px 16px", borderRadius: 6, marginBottom: 20,
        background: T.orangeL, borderLeft: `3px solid ${T.orange}`, fontSize: 13,
      }}>
        {Icons.clock}
        <div><strong>Expiring credentials:</strong> 7 personnel have qualifications expiring within 30 days. <a style={{ color: "inherit", textDecoration: "underline" }}>Review exceptions →</a></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
        <div>
          {/* Pending Approvals */}
          <Card title="Pending Approvals" right={<Chip color="orange">5 awaiting</Chip>}>
            {[
              { initials: "DT", color: T.blue, name: "Daniel Thornton", detail: "EOI submitted · Crew Leader · 3 documents pending" },
              { initials: "KW", color: T.teal, name: "Karen Wong", detail: "Role change · Storm Damage Operator → Crew Leader" },
              { initials: "JM", color: T.orange, name: "James McAllister", detail: "Medical fitness resubmission · Updated certificate" },
              { initials: "AN", color: T.green, name: "Alice Nguyễn", detail: "International readiness · Passport & eTA uploaded" },
              { initials: "BH", color: T.g500, name: "Ben Harper", detail: "New EOI · Management Support Officer · Initial review" },
            ].map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 0", borderBottom: i < 4 ? `1px solid ${T.g100}` : "none",
                cursor: "pointer",
              }}>
                <Avatar initials={a.initials} color={a.color} size={32} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.name}</div>
                  <div style={{ fontSize: 11.5, color: T.g500 }}>{a.detail}</div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button style={{
                    width: 28, height: 28, borderRadius: "50%", border: "none",
                    background: T.greenL, color: T.green, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, transition: "transform .1s",
                  }}>✓</button>
                  <button style={{
                    width: 28, height: 28, borderRadius: "50%", border: "none",
                    background: T.coralL, color: T.coral, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, transition: "transform .1s",
                  }}>✕</button>
                </div>
              </div>
            ))}
          </Card>

          {/* Deployed Personnel */}
          <Card title="Our Deployed Personnel" right={<Btn variant="ghost" style={{ fontSize: 11 }}>View all →</Btn>} style={{ marginTop: 16 }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Name", "Deployment", "Role", "Status", "Day"].map(h => (
                      <th key={h} style={{
                        textAlign: "left", padding: "8px 10px", fontWeight: 550,
                        color: T.g500, fontSize: 11, textTransform: "uppercase",
                        letterSpacing: .5, borderBottom: `2px solid ${T.g200}`,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Daniel Thornton", deploy: "NT Cyclone Response", role: "Crew Leader", status: "Working", color: "blue", day: 8 },
                    { name: "Rachel Kim", deploy: "NT Cyclone Response", role: "DM", status: "Working", color: "blue", day: 12 },
                    { name: "Tom Briggs", deploy: "NT Cyclone Response", role: "Storm Damage Ops", status: "Resting", color: "teal", day: 8 },
                    { name: "Alice Nguyễn", deploy: "Canada 2025", role: "INLO Admin", status: "In Field", color: "green", day: 18 },
                    { name: "Peter O'Brien", deploy: "NT Cyclone Response", role: "Safety Officer", status: "Demobilising", color: "gray", day: 14 },
                  ].map((p, i) => (
                    <tr key={i} style={{ cursor: "pointer" }}>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}`, fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}` }}>{p.deploy}</td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}` }}>{p.role}</td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}` }}><Chip color={p.color}>{p.status}</Chip></td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g200}`, fontWeight: 600 }}>{p.day}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div>
          {/* Claims to review */}
          <Card title="Claims Awaiting Review" right={<Chip color="coral">8</Chip>}>
            {[
              { initials: "DT", color: T.blue, name: "Daniel Thornton", detail: "Meal · 25 Mar · NT Cyclone", amount: "$47.50" },
              { initials: "RK", color: T.teal, name: "Rachel Kim", detail: "Transport · 23 Mar · NT Cyclone", amount: "$124.00" },
              { initials: "AN", color: T.green, name: "Alice Nguyễn", detail: "Meal · 20 Mar · Canada 2025", amount: "C$62.30" },
              { initials: "TB", color: T.orange, name: "Tom Briggs", detail: "Sundries · 26 Mar · NT Cyclone", amount: "$31.90" },
            ].map((c, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 0", borderBottom: i < 3 ? `1px solid ${T.g100}` : "none",
              }}>
                <Avatar initials={c.initials} color={c.color} size={28} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 550 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: T.g500 }}>{c.detail}</div>
                </div>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 600 }}>{c.amount}</span>
                <Chip color="orange">Pending</Chip>
              </div>
            ))}
            <div style={{ paddingTop: 12 }}>
              <Btn variant="secondary" style={{ width: "100%", justifyContent: "center", fontSize: 12 }}>Review all claims →</Btn>
            </div>
          </Card>

          {/* Active Requests */}
          <Card title="Our Active Requests" style={{ marginTop: 16 }}>
            {[
              { title: "NT Cyclone — NSW Support", id: "2025_26_007NT_NSW001", info: "18 personnel deployed · Day 8–14", status: "Active", color: "green" },
              { title: "Canada 2025 — INLO Support", id: "2025_26_012INT_CAN001", info: "2 personnel deployed · Day 18", status: "In Field", color: "blue" },
              { title: "QLD Storm — Crew Nomination", id: "2025_26_015QLD_VIC002", info: "Awaiting nomination · 6 roles", status: "Pending", color: "orange" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < 2 ? `1px solid ${T.g100}` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</span>
                  <Chip color={r.color}>{r.status}</Chip>
                </div>
                <div style={{ fontSize: 11, color: T.g500 }}>
                  <span style={{ fontFamily: "'DM Mono', monospace" }}>{r.id}</span> · {r.info}
                </div>
              </div>
            ))}
          </Card>

          {/* Readiness Exceptions */}
          <Card title="Readiness Exceptions" style={{ marginTop: 16 }}>
            {[
              { label: "Expired medical", val: 3, color: T.coral },
              { label: "WWCC expiring <30d", val: 4, color: T.orange },
              { label: "Incomplete EOI", val: 6, color: T.orange },
              { label: "Passport missing (int'l)", val: 12, color: T.g400 },
            ].map((e, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", padding: "8px 0",
                borderBottom: i < 3 ? `1px solid ${T.g100}` : "none", fontSize: 13,
              }}>
                <span style={{ color: T.g500 }}>{e.label}</span>
                <span style={{ fontWeight: 650, color: e.color }}>{e.val}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ─── Card wrapper ─── */
function Card({ title, right, children, style: s }) {
  return (
    <div style={{
      background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8,
      overflow: "hidden", ...s,
    }}>
      {title && (
        <div style={{
          padding: "14px 18px", borderBottom: `1px solid ${T.g200}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
        }}>
          <span style={{ fontSize: 14.5, fontWeight: 650 }}>{title}</span>
          {right}
        </div>
      )}
      <div style={{ padding: "16px 18px" }}>{children}</div>
    </div>
  );
}
