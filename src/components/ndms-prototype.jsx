import { useState, useEffect, useCallback } from "react";
import PeopleWorkspace from "./ndms-people";
import RequestsWorkspace, { RequestWizard } from "./ndms-requests";
import DeploymentsWorkspace from "./ndms-deployments";
import MapWorkspace from "./ndms-reporting";
import FinanceWorkspace from "./ndms-c5-finance";
import NAAWorkspace from "./ndms-naa-core";
import { NAAForm, NAARegister, AssetBoard, ApprovalPanel, Performance, DemoRoute } from "./ndms-stage4-aviation";
import { TaskCentre, Deployment360, ApprovalTimeline } from "./ndms-task-centre";
import AdminWorkspace from "./ndms-admin";

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
  globe: <Icon><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></Icon>,
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
  { id: "nrsc", shell: "nrsc", label: "NRSC Operations", name: "Jessica Walsh", agency: "NRSC", initials: "JW", color: T.teal, sysRole: "NRSC Operations", deployRole: null },
  { id: "team", shell: "team", label: "Team Member", name: "Daniel Thornton", agency: "QLD QFES", initials: "DT", color: T.blue, sysRole: "Team Member", deployRole: "Crew Leader — Northern Rivers" },
  { id: "agency", shell: "agency", label: "Agency Staff", name: "Sarah Patel", agency: "QLD QFES", initials: "SP", color: T.coral, sysRole: "Agency Administrator", deployRole: null },
];

/* Unified nav — 3 core roles */
const getNavItems = (role) => {
  const shell = ROLES.find(r => r.id === role)?.shell || "nrsc";
  const homeLabel = { nrsc: "Home", team: "My Readiness", agency: "Agency Home" }[role] || "Home";

  const core = [
    { section: "Platform", items: [
      { icon: "home", label: homeLabel, id: "home" },
      { icon: "people", label: shell === "team" ? "My Record" : "People", id: "people", badge: shell === "agency" ? "5" : null },
      { icon: "doc", label: "Requests", id: "requests", badge: shell === "nrsc" ? "3" : null },
      { icon: "mapPin", label: "Deployments", id: "deployments", badge: shell === "nrsc" ? "!" : null },
      { icon: "globe", label: "Map", id: "map" },
    ]},
  ];

  // Finance — all 3 roles
  core.push({ section: "Finance", items: [
    { icon: "dollar", label: shell === "team" ? "My Claims" : shell === "agency" ? "Claims Review" : "Finance", id: "finance", badge: shell === "agency" ? "8" : null },
  ]});

  // Aviation — nrsc only
  if (role === "nrsc") {
    core.push({ section: "Specialist", items: [
      { icon: "send", label: "Aviation", id: "aviation" },
    ]});
  }

  return core;
};

/* ─── Main App ─── */
export default function NDMSPrototype() {
  const [role, setRole] = useState("nrsc");
  const [activeNav, setActiveNav] = useState("home");
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [sitRepOpen, setSitRepOpen] = useState(false);
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setActiveNav("home"); }, [role]);

  const currentRole = ROLES.find(r => r.id === role);
  const navSections = getNavItems(role);
  const iconMap = Icons;

  /* Unified route resolver */
  const renderContent = () => {
    const shell = currentRole.shell;
    switch (activeNav) {
      case "home":
        if (role === "nrsc") return <NRSCHome onOpenWizard={() => setWizardOpen(true)} onOpenSitRep={() => setSitRepOpen(true)} />;
        if (role === "team") return <TeamMemberHome />;
        if (role === "agency") return <AgencyHome onOpenWizard={() => setWizardOpen(true)} />;
        return <NRSCHome />;
      case "people":
        if (shell === "team") return <PeopleWorkspace scope="personal" />;
        if (shell === "agency") return <PeopleWorkspace scope="agency" />;
        return <PeopleWorkspace scope="national" />;
      case "requests":
        return <RequestsWorkspace onOpenWizard={() => setWizardOpen(true)} />;
      case "deployments":
        return <DeploymentsWorkspace />;
      case "map":
        return <MapWorkspace />;
      case "finance":
        if (shell === "team") return <FinanceWorkspace scope="personal" />;
        if (shell === "agency") return <FinanceWorkspace scope="agency" />;
        return <FinanceWorkspace scope="national" />;
      case "aviation":
        return <NAAWorkspace />;
      case "admin":
        return <AdminWorkspace />;
      default:
        return <NRSCHome />;
    }
  };

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
        {/* Logo — AFAC Branded */}
        <div style={{
          padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,.08)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 38, height: 38, background: "linear-gradient(135deg, #D4380D 0%, #CF1322 100%)", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: T.white, fontWeight: 800, fontSize: 11, letterSpacing: .5,
          }}>AFAC</div>
          <div>
            <div style={{ color: T.white, fontWeight: 700, fontSize: 16, letterSpacing: .3 }}>NDMS</div>
            <div style={{ color: "rgba(255,255,255,.4)", fontSize: 9.5, letterSpacing: .3 }}>National Resource Sharing Centre</div>
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
          <div onClick={() => setActiveNav("admin")} style={{
            display: "flex", alignItems: "center", gap: 11,
            padding: "8px 12px", borderRadius: 6, cursor: "pointer",
            color: activeNav === "admin" ? T.white : "rgba(255,255,255,.6)",
            background: activeNav === "admin" ? "rgba(14,120,201,.2)" : "transparent",
            fontSize: 13.5, fontWeight: 500,
          }}>
            <span style={{ opacity: activeNav === "admin" ? 1 : .65, display: "flex" }}>{Icons.settings}</span>
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
              <div style={{ color: "rgba(255,255,255,.38)", fontSize: 10.5 }}>{currentRole.sysRole}</div>
              {currentRole.deployRole && <div style={{ color: T.teal, fontSize: 10, fontWeight: 550, marginTop: 1 }}>⬦ {currentRole.deployRole}</div>}
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
          <div style={{ flex: 1 }} />
          <span style={{
            padding: "3px 12px", background: "linear-gradient(135deg, #D4380D, #CF1322)", color: T.white,
            fontSize: 10, fontWeight: 700, borderRadius: 4, letterSpacing: .8,
          }}>AFAC | NRSC</span>
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
          {/* Task Centre icon — opens drawer */}
          <div onClick={() => setTaskDrawerOpen(!taskDrawerOpen)} style={{ position: "relative", cursor: "pointer", padding: 6, display: "flex", alignItems: "center", gap: 4 }}>
            {Icons.flag}
            <span style={{ background: T.coral, color: T.white, fontSize: 9, fontWeight: 700, padding: "0px 5px", borderRadius: 8, minWidth: 14, textAlign: "center" }}>10</span>
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
          {renderContent()}
        </div>
      </main>

      {/* ═══ TASK CENTRE DRAWER ═══ */}
      {taskDrawerOpen && <>
        <div onClick={() => setTaskDrawerOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(35,52,74,.2)", zIndex: 500 }} />
        <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 520, background: T.white, boxShadow: "-8px 0 30px rgba(0,0,0,.1)", zIndex: 501, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 16, fontWeight: 700 }}>Task Centre</div><div style={{ fontSize: 12, color: T.g500 }}>10 pending actions</div></div>
            <button onClick={() => setTaskDrawerOpen(false)} style={{ background: "none", border: "none", fontSize: 18, color: T.g400, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}><TaskCentre /></div>
        </div>
      </>}

      {/* ═══ REQUEST WIZARD MODAL ═══ */}
      {wizardOpen && <RequestWizard onClose={() => setWizardOpen(false)} />}

      {/* ═══ SITREP WIZARD MODAL ═══ */}
      {sitRepOpen && <SitRepWizard onClose={() => setSitRepOpen(false)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   NRSC STAFF — National Operations Home
   ═══════════════════════════════════════════════════ */
function NRSCHome({ onOpenWizard, onOpenSitRep }) {
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
          <Btn variant="primary" onClick={onOpenSitRep}>+ New SitRep</Btn>
        </div>
      </div>

      <div style={{ padding: "20px 32px" }}>
        {/* ── Deployment KPI cards grouped by deployment ── */}
        <div style={{ fontSize: 12, fontWeight: 600, color: T.g500, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Active Deployments</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {/* Northern Rivers deployment */}
          <div style={{ background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.g200}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.green }} />
                <span style={{ fontSize: 15, fontWeight: 700 }}>Northern Rivers Flood Response</span>
              </div>
              <Chip color="green">Active</Chip>
            </div>
            <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[{l:"Personnel",v:"68",c:T.blue},{l:"Contingents",v:"4",c:T.navy},{l:"Day",v:"8",c:T.green},{l:"Rotations Due",v:"2",c:T.orange}].map((m,i)=><div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 22, fontWeight: 700, color: m.c }}>{m.v}</div><div style={{ fontSize: 10.5, color: T.g500, marginTop: 2 }}>{m.l}</div></div>)}
            </div>
            <div style={{ padding: "8px 18px 14px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[{l:"IMT & Overhead",v:7},{l:"Flood Ops",v:12},{l:"Safety",v:2},{l:"Admin/DM",v:4},{l:"QLD QFES",v:22},{l:"VIC CFA",v:18},{l:"SA CFS",v:10},{l:"TAS TFS",v:8}].map((t,i)=><span key={i} style={{ padding: "3px 10px", background: i<4?T.blueL:T.g100, borderRadius: 4, fontSize: 11, fontWeight: 550, color: i<4?T.blue:T.g600 }}>{t.l}: {t.v}</span>)}
            </div>
          </div>

          {/* Canada deployment */}
          <div style={{ background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${T.g200}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.green }} />
                <span style={{ fontSize: 15, fontWeight: 700 }}>Canada 2025 Wildfire Season</span>
              </div>
              <Chip color="green">Active</Chip>
            </div>
            <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[{l:"Personnel",v:"33",c:T.blue},{l:"Contingents",v:"4",c:T.navy},{l:"Day",v:"58",c:T.green},{l:"Rotations Due",v:"0",c:T.g400}].map((m,i)=><div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 22, fontWeight: 700, color: m.c }}>{m.v}</div><div style={{ fontSize: 10.5, color: T.g500, marginTop: 2 }}>{m.l}</div></div>)}
            </div>
            <div style={{ padding: "8px 18px 14px", display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[{l:"IMT",v:3},{l:"INLO",v:2},{l:"Crew",v:24},{l:"Overhead",v:4}].map((t,i)=><span key={i} style={{ padding: "3px 10px", background: T.blueL, borderRadius: 4, fontSize: 11, fontWeight: 550, color: T.blue }}>{t.l}: {t.v}</span>)}
            </div>
          </div>
        </div>

        {/* ── Total KPI strip ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "Total Deployed", value: "101", sub: "Across 2 deployments", color: T.green },
            { label: "Active Contingents", value: "8", sub: "4 Northern Rivers + 4 Canada", color: T.blue },
            { label: "NAA Assets Active", value: "3", sub: "1 pending approval", color: T.navy },
            { label: "Inbound Rotations", value: "14", sub: "Next 72h", color: T.orange },
            { label: "Season Requests", value: "5", sub: "2 active, 1 pending", color: T.teal },
          ].map((m, i) => (
            <div key={i} style={{
              background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, padding: "16px 18px",
            }}>
              <div style={{ fontSize: 11.5, color: T.g500, marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: m.color }}>{m.value}</div>
              <div style={{ fontSize: 11, color: T.g500, marginTop: 2 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Two-column: Capability + Quick Actions ── */}
        <div style={{ display: "grid", gridTemplateColumns: "5fr 3fr", gap: 20 }}>
          <div>
            {/* Deployment Capability by Jurisdiction */}
            <Card title="Deployment Capability by Jurisdiction" right={<Btn variant="ghost" style={{ fontSize: 12 }}>View all →</Btn>}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Jurisdiction", "Registered", "Available", "Deployed", "Availability %", "Assets"].map(h => (
                      <th key={h} style={{
                        textAlign: "left", padding: "8px 10px", fontWeight: 550, color: T.g500,
                        fontSize: 10.5, textTransform: "uppercase", letterSpacing: .5,
                        borderBottom: `2px solid ${T.g200}`, whiteSpace: "nowrap",
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { jur: "NSW", reg: 186, avail: 42, dep: 0, assets: "—" },
                    { jur: "QLD", reg: 214, avail: 68, dep: 22, assets: "NHAWK (QLD)" },
                    { jur: "VIC", reg: 178, avail: 55, dep: 18, assets: "—" },
                    { jur: "SA", reg: 112, avail: 31, dep: 10, assets: "NHAWK (SA)" },
                    { jur: "TAS", reg: 64, avail: 18, dep: 8, assets: "—" },
                    { jur: "WA", reg: 98, avail: 28, dep: 0, assets: "—" },
                    { jur: "NT", reg: 42, avail: 12, dep: 0, assets: "—" },
                    { jur: "ACT", reg: 28, avail: 8, dep: 0, assets: "—" },
                    { jur: "INT'L", reg: "—", avail: "—", dep: 33, assets: "NLEAD" },
                  ].map((j, i) => (
                    <tr key={i} style={{ cursor: "pointer" }}>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}`, fontWeight: 700, fontSize: 14 }}>{j.jur}</td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}` }}>{j.reg}</td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}`, fontWeight: 600, color: T.green }}>{j.avail}</td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}`, fontWeight: 600, color: j.dep > 0 ? T.blue : T.g400 }}>{j.dep}</td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}` }}>
                        {typeof j.avail === "number" ? <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 50, height: 6, background: T.g200, borderRadius: 3, overflow: "hidden" }}>
                            <div style={{ width: `${Math.round(j.avail/j.reg*100)}%`, height: "100%", background: T.green, borderRadius: 3 }} />
                          </div>
                          <span style={{ fontSize: 11, color: T.g500 }}>{Math.round(j.avail/j.reg*100)}%</span>
                        </div> : <span style={{ color: T.g400 }}>—</span>}
                      </td>
                      <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}`, fontSize: 12, color: j.assets !== "—" ? T.navy : T.g400, fontWeight: j.assets !== "—" ? 600 : 400 }}>{j.assets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 10px 4px", borderTop: `2px solid ${T.g200}` }}>
                {[{l:"Total Registered",v:"922"},{l:"Total Available",v:"262"},{l:"Total Deployed",v:"91"},{l:"NAA Assets",v:"5 (3 active)"}].map((t,i)=><div key={i} style={{ textAlign: "center" }}><div style={{ fontSize: 11, color: T.g500 }}>{t.l}</div><div style={{ fontSize: 16, fontWeight: 700, color: T.navy, marginTop: 2 }}>{t.v}</div></div>)}
              </div>
            </Card>

            {/* Personnel by Status */}
            <Card title="Personnel by Status" right={<Btn variant="ghost" style={{ fontSize: 12 }}>View all →</Btn>} style={{ marginTop: 16 }}>
              {[
                { label: "Working", val: 64, pct: 63, color: T.blue },
                { label: "Resting", val: 18, pct: 18, color: T.teal },
                { label: "Travel", val: 8, pct: 8, color: T.orange },
                { label: "Briefing", val: 5, pct: 5, color: T.green },
                { label: "Demob", val: 6, pct: 6, color: T.g400 },
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

            {/* SitRep Log */}
            <Card title="SitRep Log" right={<Btn variant="ghost" style={{ fontSize: 12 }}>All SitReps →</Btn>} style={{ marginTop: 16 }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      {["Ref", "Deployment", "Period", "Author", "Status", "Submitted"].map(h => (
                        <th key={h} style={{
                          textAlign: "left", padding: "8px 10px", fontWeight: 550, color: T.g500,
                          fontSize: 10.5, textTransform: "uppercase", letterSpacing: .5,
                          borderBottom: `2px solid ${T.g200}`, whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { ref: "SITREP-NR-009", deploy: "Northern Rivers Flood", period: "30 Mar AM", author: "J. Walsh", status: "Draft", color: "orange", date: "30 Mar 10:30" },
                      { ref: "SITREP-NR-008", deploy: "Northern Rivers Flood", period: "29 Mar PM", author: "J. Walsh", status: "Submitted", color: "green", date: "29 Mar 16:00" },
                      { ref: "SITREP-NR-007", deploy: "Northern Rivers Flood", period: "29 Mar AM", author: "J. Walsh", status: "Submitted", color: "green", date: "29 Mar 08:15" },
                      { ref: "SITREP-CA-003", deploy: "Canada 2025", period: "Week 3", author: "P. Nguy\u1ec5n", status: "Draft", color: "orange", date: "30 Mar 09:12" },
                      { ref: "SITREP-CA-002", deploy: "Canada 2025", period: "Week 2", author: "P. Nguy\u1ec5n", status: "Submitted", color: "green", date: "23 Mar 16:00" },
                      { ref: "SITREP-NR-006", deploy: "Northern Rivers Flood", period: "28 Mar PM", author: "A. Ford", status: "Submitted", color: "green", date: "28 Mar 16:30" },
                    ].map((sr, i) => (
                      <tr key={i} style={{ cursor: "pointer" }}>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}`, fontFamily: "'DM Mono', monospace", fontSize: 11.5, fontWeight: 600 }}>{sr.ref}</td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}`, fontWeight: 550 }}>{sr.deploy}</td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}` }}>{sr.period}</td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}` }}>{sr.author}</td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}` }}><Chip color={sr.color}>{sr.status}</Chip></td>
                        <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.g100}`, fontSize: 12, color: T.g500 }}>{sr.date}</td>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { label: "New Request", desc: "Raise an interstate or international deployment request" },
                  { label: "NAA Request", desc: "Request a national aviation asset" },
                  { label: "New SitRep", desc: "Draft a situation report for an active deployment" },
                  { label: "Run Report", desc: "Generate an operational or financial report" },
                  { label: "Register Person", desc: "Add a new team member to the NDMS register" },
                  { label: "New Claim", desc: "Submit a financial claim against a deployment" },
                ].map((a, i) => (
                  <div key={i} onClick={a.label === "New SitRep" ? onOpenSitRep : a.label === "New Request" ? onOpenWizard : undefined} style={{
                    padding: "12px 16px", border: `1px solid ${T.g200}`, borderRadius: 6,
                    cursor: "pointer", transition: "all .12s", background: T.white,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{a.label}</div>
                      <div style={{ fontSize: 11, color: T.g500, marginTop: 1 }}>{a.desc}</div>
                    </div>
                    <span style={{ color: T.g400, fontSize: 16 }}>›</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Jurisdiction Summary */}
            <Card title="By Jurisdiction" style={{ marginTop: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { code: "NSW", deployed: 0, avail: 42, color: "blue" },
                  { code: "QLD", deployed: 22, avail: 68, color: "green" },
                  { code: "VIC", deployed: 18, avail: 55, color: "blue" },
                  { code: "SA", deployed: 10, avail: 31, color: "teal" },
                  { code: "TAS", deployed: 8, avail: 18, color: "teal" },
                  { code: "WA", deployed: 0, avail: 28, color: "gray" },
                  { code: "NT", deployed: 0, avail: 12, color: "gray" },
                  { code: "INT'L", deployed: 33, avail: "—", color: "coral" },
                ].map((j, i) => (
                  <div key={i} style={{
                    padding: 12, border: `1px solid ${T.g200}`, borderRadius: 6, cursor: "pointer",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{j.code}</span>
                      <Chip color={j.color} dot={true}>{""}</Chip>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.g500, padding: "2px 0" }}>
                      <span>Deployed</span><span style={{ fontWeight: 650, color: j.deployed > 0 ? T.blue : T.g400 }}>{j.deployed}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.g500, padding: "2px 0" }}>
                      <span>Available</span><span style={{ fontWeight: 650, color: T.green }}>{j.avail}</span>
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
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 13, margin: "4px 0 0" }}>You have 2 items requiring attention and 1 active deployment — Northern Rivers Flood Response.</p>
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
                <span style={{ fontSize: 15, fontWeight: 650 }}>Northern Rivers Flood Response</span>
                <Chip color="blue">Day 8</Chip>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", fontSize: 12 }}>
                {[
                  ["Request", "2025_26_007NSW_QLD001"],
                  ["Role", "Crew Leader"],
                  ["Location", "Lismore, NSW"],
                  ["Agency", "QLD QFES"],
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
                { initials: "MS", name: "Mark Sullivan", role: "AREP — Northern Rivers", color: T.teal },
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
                <Avatar initials="SP" color={T.coral} size={28} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 550 }}>Sarah Patel</div>
                  <div style={{ fontSize: 11, color: T.g500 }}>QLD QFES Coordinator</div>
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
            color: T.white, fontWeight: 700, fontSize: 13,
          }}>QFES</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Queensland Fire & Emergency Services</div>
            <div style={{ fontSize: 13, color: T.g500 }}>Queensland · Interstate & International Deployments</div>
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
                    { name: "Daniel Thornton", deploy: "Northern Rivers Flood", role: "Crew Leader", status: "Working", color: "blue", day: 8 },
                    { name: "Rachel Kimura", deploy: "Northern Rivers Flood", role: "DM", status: "Working", color: "blue", day: 12 },
                    { name: "Tom Briggs", deploy: "Northern Rivers Flood", role: "Flood Ops", status: "Resting", color: "teal", day: 8 },
                    { name: "Alice Nguyễn", deploy: "Canada 2025", role: "INLO Admin", status: "In Field", color: "green", day: 18 },
                    { name: "Peter O'Brien", deploy: "Northern Rivers Flood", role: "Safety Officer", status: "Demobilising", color: "gray", day: 14 },
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
              { initials: "DT", color: T.blue, name: "Daniel Thornton", detail: "Meal · 25 Mar · Northern Rivers", amount: "$47.50" },
              { initials: "RK", color: T.teal, name: "Rachel Kimura", detail: "Transport · 23 Mar · Northern Rivers", amount: "$124.00" },
              { initials: "AN", color: T.green, name: "Alice Nguyễn", detail: "Meal · 20 Mar · Canada 2025", amount: "C$62.30" },
              { initials: "TB", color: T.orange, name: "Tom Briggs", detail: "Sundries · 26 Mar · Northern Rivers", amount: "$31.90" },
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
              { title: "Northern Rivers Flood — QLD Support", id: "2025_26_007NSW_QLD001", info: "22 personnel deployed · Day 8–14", status: "Active", color: "green" },
              { title: "Canada 2025 — INLO Support", id: "2025_26_INT_CAN_001", info: "2 personnel deployed · Day 18", status: "In Field", color: "blue" },
              { title: "Northern Rivers — VIC Nomination", id: "2025_26_008NSW_VIC001", info: "Awaiting nomination · 12 roles", status: "Pending", color: "orange" },
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

/* ═══════════════════════════════════════════════════
   SITREP WIZARD MODAL
   ═══════════════════════════════════════════════════ */
function SitRepWizard({ onClose }) {
  const [step, setStep] = useState(1);
  const steps = ["Deployment", "Period & Summary", "Key Metrics", "Issues & Actions", "Review & Submit"];

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(35,52,74,.35)", zIndex: 600 }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 720, maxHeight: "85vh", background: T.white, borderRadius: 12,
        boxShadow: "0 20px 60px rgba(35,52,74,.2)", zIndex: 601,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          padding: "18px 24px", borderBottom: `1px solid ${T.g200}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>New Situation Report</div>
            <div style={{ fontSize: 12, color: T.g500, marginTop: 2 }}>Step {step} of {steps.length} — {steps[step-1]}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: T.g400, cursor: "pointer" }}>✕</button>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", padding: "12px 24px", gap: 4, borderBottom: `1px solid ${T.g100}` }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: i+1 < step ? T.green : i+1 === step ? T.blue : T.g200,
                color: i+1 <= step ? T.white : T.g500,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
              }}>{i+1 < step ? "✓" : i+1}</div>
              <span style={{ fontSize: 9.5, color: i+1 === step ? T.blue : T.g500, fontWeight: i+1 === step ? 600 : 400 }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {step === 1 && <>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Select Deployment</div>
            {[
              { name: "Northern Rivers Flood Response", status: "Active", day: "Day 8", selected: true },
              { name: "Canada 2025 Wildfire Season", status: "Active", day: "Day 58", selected: false },
            ].map((d, i) => (
              <div key={i} style={{
                padding: "14px 16px", border: `2px solid ${d.selected ? T.blue : T.g200}`,
                borderRadius: 8, marginBottom: 8, cursor: "pointer",
                background: d.selected ? T.blueL : T.white,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{d.name}</span>
                  <Chip color={d.selected ? "blue" : "green"}>{d.status}</Chip>
                </div>
                <div style={{ fontSize: 12, color: T.g500, marginTop: 4 }}>{d.day} · {d.name.includes("Northern") ? "68 personnel" : "33 personnel"}</div>
              </div>
            ))}
          </>}

          {step === 2 && <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
              {[["Reporting Period", "30 Mar 2026 AM"], ["SitRep Number", "SITREP-NR-009"], ["Author", "J. Walsh (NRSC)"], ["Classification", "Official"]].map(([l,v], i) => (
                <div key={i}>
                  <label style={{ fontSize: 11.5, fontWeight: 550, color: T.g600, display: "block", marginBottom: 4 }}>{l}</label>
                  <div style={{ padding: "9px 12px", background: T.g50, border: `1px solid ${T.g200}`, borderRadius: 6, fontSize: 13 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11.5, fontWeight: 550, color: T.g600, display: "block", marginBottom: 4 }}>Executive Summary</label>
              <div style={{ padding: "9px 12px", background: T.g50, border: `1px solid ${T.g200}`, borderRadius: 6, fontSize: 13, minHeight: 80, color: T.g400 }}>Flood response operations continue across the Northern Rivers region. Day 8 of deployment. All contingents active and in field…</div>
            </div>
            <div>
              <label style={{ fontSize: 11.5, fontWeight: 550, color: T.g600, display: "block", marginBottom: 4 }}>Weather & Conditions</label>
              <div style={{ padding: "9px 12px", background: T.g50, border: `1px solid ${T.g200}`, borderRadius: 6, fontSize: 13, minHeight: 50, color: T.g400 }}>Partly cloudy, 24°C. Floodwaters receding. Minor rainfall forecast overnight…</div>
            </div>
          </>}

          {step === 3 && <>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Key Metrics — auto-populated from deployment data</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
              {[{l:"Personnel On Shift",v:"48"},{l:"Personnel Resting",v:"14"},{l:"Personnel Travel",v:"6"},{l:"Contingents Active",v:"4"},{l:"Areas of Operation",v:"3"},{l:"Check-Ins Today",v:"62/68"}].map((m,i)=>(
                <div key={i} style={{ padding: 14, border: `1px solid ${T.g200}`, borderRadius: 6, textAlign: "center" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: T.blue }}>{m.v}</div>
                  <div style={{ fontSize: 11, color: T.g500, marginTop: 2 }}>{m.l}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "10px 14px", background: T.blueL, borderRadius: 6, fontSize: 12, color: T.blue }}>
              These metrics are auto-populated from live deployment data. You can override values before submission.
            </div>
          </>}

          {step === 4 && <>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Issues, Actions & Recommendations</div>
            {[
              { type: "Issue", text: "3 personnel approaching fatigue threshold (12+ consecutive days)", severity: "Medium" },
              { type: "Action", text: "DM rotation for 1 Apr confirmed — R. Kimura to be replaced by incoming VIC CFA DM", severity: "Resolved" },
              { type: "Issue", text: "Minor vehicle damage reported — ute VR-042 at Lismore depot", severity: "Low" },
            ].map((item, i) => (
              <div key={i} style={{ padding: "12px 14px", border: `1px solid ${T.g200}`, borderRadius: 6, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                <Chip color={item.type === "Issue" ? "orange" : "green"}>{item.type}</Chip>
                <span style={{ flex: 1, fontSize: 13 }}>{item.text}</span>
                <Chip color={item.severity === "Resolved" ? "green" : item.severity === "Medium" ? "orange" : "blue"}>{item.severity}</Chip>
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <label style={{ fontSize: 11.5, fontWeight: 550, color: T.g600, display: "block", marginBottom: 4 }}>Recommendations</label>
              <div style={{ padding: "9px 12px", background: T.g50, border: `1px solid ${T.g200}`, borderRadius: 6, fontSize: 13, minHeight: 50, color: T.g400 }}>Continue operations as planned. Monitor fatigue thresholds for next rotation window…</div>
            </div>
          </>}

          {step === 5 && <>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Review & Submit</div>
            <div style={{ padding: 16, border: `1px solid ${T.g200}`, borderRadius: 8 }}>
              {[["SitRep","SITREP-NR-009"],["Deployment","Northern Rivers Flood Response"],["Period","30 Mar 2026 AM"],["Author","J. Walsh (NRSC)"],["Personnel","68 (48 on shift)"],["Issues","2 open, 1 resolved"],["Classification","Official"]].map(([k,v],i)=>(
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13, borderBottom: `1px solid ${T.g100}` }}>
                  <span style={{ color: T.g500 }}>{k}</span><span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "10px 14px", background: T.greenL, borderRadius: 6, fontSize: 12, color: "#5a8a1f" }}>
              Ready. Submitting will notify all stakeholders and make this SitRep available in the reporting module.
            </div>
          </>}
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 24px", borderTop: `1px solid ${T.g200}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <Btn variant="ghost" onClick={step === 1 ? onClose : () => setStep(step-1)}>
            {step === 1 ? "Cancel" : "← Back"}
          </Btn>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="secondary">Save Draft</Btn>
            <Btn variant="primary" onClick={step < 5 ? () => setStep(step+1) : onClose}>
              {step < 5 ? "Continue →" : "Submit SitRep"}
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
}
