import { useState } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const Avatar=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const TH=({children,w})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap",width:w}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;
const TabBar=({tabs,active,onChange})=><div style={{display:"flex",gap:0,borderBottom:`2px solid ${T.g200}`,marginBottom:20}}>{tabs.map(t=><button key={t} onClick={()=>onChange(t)} style={{padding:"10px 20px",fontSize:13,fontWeight:active===t?650:500,color:active===t?T.blue:T.g500,borderBottom:active===t?`2px solid ${T.blue}`:"2px solid transparent",marginBottom:-2,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",transition:"all .12s"}}>{t}</button>)}</div>;
const Field=({label,children,span})=><div style={{gridColumn:span?`span ${span}`:undefined}}><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>{label}</label>{children}</div>;
const Input=({placeholder,type="text",...p})=><input type={type} placeholder={placeholder} style={{width:"100%",padding:"8px 12px",border:`1px solid ${T.g300}`,borderRadius:6,fontSize:13,fontFamily:"inherit",background:T.white,boxSizing:"border-box"}} {...p}/>;
const Select=({children,...p})=><select style={{width:"100%",padding:"8px 12px",border:`1px solid ${T.g300}`,borderRadius:6,fontSize:13,fontFamily:"inherit",background:T.white,boxSizing:"border-box"}} {...p}>{children}</select>;


/* ═══════════════════════════════════════════════
   REQUEST DATA
   ═══════════════════════════════════════════════ */
const REQUESTS = [
  {id:"2025_26_007NSW_QLD001",type:"Interstate",from:"NSW",to:"QLD,VIC,SA,TAS",incident:"Northern Rivers Flood Response",status:"Deployed",roles:22,filled:22,date:"14 Mar 2026",urgency:"Urgent",c:"green"},
  {id:"2025_26_INT_CAN_001",type:"International",from:"Canada",to:"Multi",incident:"Canada 2025 Wildfire Season",status:"Deployed",roles:33,filled:33,date:"1 Feb 2026",urgency:"Planned",c:"green"},
  {id:"2025_26_008NSW_VIC001",type:"Interstate",from:"NSW",to:"VIC",incident:"Northern Rivers Flood Response",status:"Pending Nomination",roles:12,filled:0,date:"28 Mar 2026",urgency:"Urgent",c:"orange"},
  {id:"2025_26_009NSW_SA001",type:"Interstate",from:"NSW",to:"SA",incident:"Northern Rivers Flood Response",status:"Draft",roles:6,filled:0,date:"30 Mar 2026",urgency:"Non-Urgent",c:"blue"},
  {id:"2025_26_010NSW_WA001",type:"Interstate",from:"NSW",to:"WA",incident:"Northern Rivers Flood Response",status:"Cancelled",roles:8,filled:0,date:"10 Jan 2026",urgency:"Urgent",c:"gray"},
  {id:"2024_25_003VIC_QLD001",type:"Interstate",from:"VIC",to:"QLD",incident:"Cyclone Alfred Recovery",status:"Complete",roles:15,filled:15,date:"20 Nov 2025",urgency:"Urgent",c:"gray"},
  {id:"2024_25_INT_NZ_001",type:"International",from:"NZ",to:"Multi",incident:"NZ Canterbury Earthquake Support",status:"Complete",roles:10,filled:10,date:"5 Sep 2025",urgency:"Planned",c:"gray"},
];

/* ═══════════════════════════════════════════════
   REQUEST PIPELINE — Kanban stages
   ═══════════════════════════════════════════════ */
const REQUEST_STEPS = [
  "Draft",
  "NRSC Validation",
  "RMG Endorsement",
  "Agency Canvass",
  "Nomination & Selection",
  "Deployment Approved",
  "Mobilisation",
  "In Field",
  "Demobilisation",
  "Complete",
];

const REQUEST_KANBAN = [
  { id: 1, requestId: "2025_26_009NSW_SA001", incident: "Northern Rivers Flood Response", type: "Interstate", route: "NSW → SA", step: "Draft", roles: 6, filled: 0, owner: "J. Walsh", ownerInit: "JW", dueDate: "1 Apr", priority: "Low", color: T.blue },
  { id: 2, requestId: "2025_26_008NSW_VIC001", incident: "Northern Rivers Flood Response", type: "Interstate", route: "NSW → VIC", step: "Nomination & Selection", roles: 12, filled: 4, owner: "J. Walsh", ownerInit: "JW", dueDate: "31 Mar", priority: "High", color: T.orange },
  { id: 3, requestId: "2025_26_007NSW_QLD001", incident: "Northern Rivers Flood Response", type: "Interstate", route: "NSW → QLD,VIC,SA,TAS", step: "In Field", roles: 22, filled: 22, owner: "J. Walsh", ownerInit: "JW", dueDate: "1 Apr", priority: "Medium", color: T.green },
  { id: 4, requestId: "2025_26_INT_CAN_001", incident: "Canada 2025 Wildfire Season", type: "International", route: "Canada → Multi", step: "In Field", roles: 33, filled: 33, owner: "M. Sullivan", ownerInit: "MS", dueDate: "15 Apr", priority: "Medium", color: T.teal },
  { id: 5, requestId: "2025_26_011NSW_TAS001", incident: "Northern Rivers Flood Response", type: "Interstate", route: "NSW → TAS", step: "NRSC Validation", roles: 4, filled: 0, owner: "J. Walsh", ownerInit: "JW", dueDate: "2 Apr", priority: "Medium", color: T.blue },
  { id: 6, requestId: "2025_26_012QLD_VIC001", incident: "Tropical Cyclone Recovery", type: "Interstate", route: "QLD → VIC", step: "Agency Canvass", roles: 10, filled: 0, owner: "S. Patel", ownerInit: "SP", dueDate: "3 Apr", priority: "High", color: T.coral },
  { id: 7, requestId: "2025_26_013SA_NSW001", incident: "Northern Rivers Flood Response", type: "Interstate", route: "NSW → SA,TAS", step: "RMG Endorsement", roles: 8, filled: 0, owner: "J. Walsh", ownerInit: "JW", dueDate: "2 Apr", priority: "Medium", color: T.blue },
  { id: 8, requestId: "2025_26_INT_USA_001", incident: "US Pacific NW Wildfire Season", type: "International", route: "USA → Multi", step: "Draft", roles: 20, filled: 0, owner: "M. Sullivan", ownerInit: "MS", dueDate: "10 Apr", priority: "Low", color: T.teal },
  { id: 9, requestId: "2025_26_014NSW_QLD002", incident: "Northern Rivers Flood Response", type: "Interstate", route: "NSW → QLD", step: "Agency Canvass", roles: 6, filled: 0, owner: "S. Patel", ownerInit: "SP", dueDate: "4 Apr", priority: "Medium", color: T.orange },
  { id: 10, requestId: "2025_26_015VIC_SA001", incident: "Gippsland Bushfire Support", type: "Interstate", route: "VIC → SA", step: "Nomination & Selection", roles: 8, filled: 3, owner: "R. Kimura", ownerInit: "RK", dueDate: "3 Apr", priority: "High", color: T.coral },
  { id: 11, requestId: "2024_25_003VIC_QLD001", incident: "Cyclone Alfred Recovery", type: "Interstate", route: "VIC → QLD", step: "Complete", roles: 15, filled: 15, owner: "J. Walsh", ownerInit: "JW", dueDate: "—", priority: "Low", color: T.g500 },
  { id: 12, requestId: "2025_26_016NSW_ACT001", incident: "Northern Rivers Flood Response", type: "Interstate", route: "NSW → ACT", step: "Deployment Approved", roles: 4, filled: 4, owner: "J. Walsh", ownerInit: "JW", dueDate: "1 Apr", priority: "Medium", color: T.green },
  { id: 13, requestId: "2025_26_INT_CAN_002", incident: "Canada 2025 Wildfire Season", type: "International", route: "Canada → Multi", step: "Mobilisation", roles: 12, filled: 12, owner: "M. Sullivan", ownerInit: "MS", dueDate: "2 Apr", priority: "High", color: T.teal },
  { id: 14, requestId: "2024_25_INT_NZ_001", incident: "NZ Canterbury Earthquake Support", type: "International", route: "NZ → Multi", step: "Complete", roles: 10, filled: 10, owner: "M. Sullivan", ownerInit: "MS", dueDate: "—", priority: "Low", color: T.g500 },
];

/* ═══════════════════════════════════════════════
   REQUEST TASKS
   ═══════════════════════════════════════════════ */
const REQUEST_TASKS = [
  { id: "RT-001", task: "Validate request — NSW → SA allocation", type: "Validation", assignee: "J. Walsh", agency: "NRSC", status: "Pending", priority: "Medium", due: "1 Apr 2026", request: "2025_26_009NSW_SA001" },
  { id: "RT-002", task: "Chase VIC CFA agency nominations", type: "Nomination", assignee: "J. Walsh", agency: "NRSC", status: "In Progress", priority: "High", due: "31 Mar 2026", request: "2025_26_008NSW_VIC001" },
  { id: "RT-003", task: "Rotation 1 planning — Northern Rivers", type: "Rotation", assignee: "R. Kimura", agency: "VIC CFA", status: "In Progress", priority: "High", due: "1 Apr 2026", request: "2025_26_007NSW_QLD001" },
  { id: "RT-004", task: "Demob manifest for outbound crew", type: "Logistics", assignee: "J. Walsh", agency: "NRSC", status: "Pending", priority: "Medium", due: "1 Apr 2026", request: "2025_26_007NSW_QLD001" },
  { id: "RT-005", task: "International clearance — Canada rotation 2", type: "International Docs", assignee: "M. Sullivan", agency: "SA CFS", status: "In Progress", priority: "High", due: "2 Apr 2026", request: "2025_26_INT_CAN_001" },
  { id: "RT-006", task: "Submit RMG endorsement form", type: "Governance", assignee: "J. Walsh", agency: "NRSC", status: "Overdue", priority: "High", due: "29 Mar 2026", request: "2025_26_013SA_NSW001" },
  { id: "RT-007", task: "Draft TAS request for NRSC validation", type: "Drafting", assignee: "J. Walsh", agency: "NRSC", status: "Pending", priority: "Medium", due: "2 Apr 2026", request: "2025_26_011NSW_TAS001" },
  { id: "RT-008", task: "Canvass QLD QFES for cyclone support", type: "Agency Canvass", assignee: "S. Patel", agency: "QLD QFES", status: "In Progress", priority: "High", due: "3 Apr 2026", request: "2025_26_012QLD_VIC001" },
  { id: "RT-009", task: "Prepare mobilisation orders", type: "Mobilisation", assignee: "M. Sullivan", agency: "SA CFS", status: "Pending", priority: "High", due: "2 Apr 2026", request: "2025_26_INT_CAN_002" },
  { id: "RT-010", task: "Nomination shortlist — VIC → SA", type: "Nomination", assignee: "R. Kimura", agency: "VIC CFA", status: "In Progress", priority: "High", due: "3 Apr 2026", request: "2025_26_015VIC_SA001" },
  { id: "RT-011", task: "Close-out report — Cyclone Alfred", type: "Close-out", assignee: "J. Walsh", agency: "NRSC", status: "Complete", priority: "Low", due: "15 Mar 2026", request: "2024_25_003VIC_QLD001" },
  { id: "RT-012", task: "Canvass NSW for additional crew", type: "Agency Canvass", assignee: "S. Patel", agency: "QLD QFES", status: "Pending", priority: "Medium", due: "4 Apr 2026", request: "2025_26_014NSW_QLD002" },
];


/* ═══════════════════════════════════════════════
   REQUESTS WORKSPACE — 3 tabs
   ═══════════════════════════════════════════════ */
export default function RequestsWorkspace({ onOpenWizard, scope = "national" }) {
  const tabs = ["Request Pipeline", "Tasks", "All Requests"];
  const [tab, setTab] = useState(tabs[0]);

  return <div style={{ padding: "24px 32px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Requests</h2>
        <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>Request pipeline — from demand through to mobilisation and close-out</p>
      </div>
      <Btn v="primary" onClick={onOpenWizard}>+ New Request</Btn>
    </div>
    <TabBar tabs={tabs} active={tab} onChange={setTab} />
    {tab === "Request Pipeline" && <RequestPipelineTab />}
    {tab === "Tasks" && <RequestTasksTab scope={scope} />}
    {tab === "All Requests" && <AllRequestsTab />}
  </div>;
}


/* ═══════════════════════════════════════════════
   REQUEST PIPELINE — Kanban Board
   ═══════════════════════════════════════════════ */
function RequestPipelineTab() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [incidentFilter, setIncidentFilter] = useState("All");
  const incidents = ["All", ...new Set(REQUEST_KANBAN.map(r => r.incident))];

  const items = REQUEST_KANBAN.filter(r => {
    if (typeFilter !== "All" && r.type !== typeFilter) return false;
    if (incidentFilter !== "All" && r.incident !== incidentFilter) return false;
    return true;
  });

  const stepColor = (step) => {
    if (step === "Draft") return T.g500;
    if (step === "NRSC Validation" || step === "RMG Endorsement") return T.orange;
    if (step === "Agency Canvass" || step === "Nomination & Selection") return T.blue;
    if (step === "Deployment Approved") return T.teal;
    if (step === "Mobilisation") return "#6C5CE7";
    if (step === "In Field") return T.green;
    if (step === "Demobilisation") return T.coral;
    if (step === "Complete") return "#00B894";
    return T.g500;
  };

  return <>
    {/* Filters bar */}
    <div style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "center" }}>
      <div style={{ display: "flex", gap: 6 }}>
        <span style={{ fontSize: 12, color: T.g500, fontWeight: 550, padding: "7px 0" }}>Type:</span>
        {["All", "Interstate", "International"].map(f => (
          <span key={f} onClick={() => setTypeFilter(f)} style={{
            padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 550, cursor: "pointer",
            border: `1px solid ${typeFilter === f ? T.blue : T.g300}`,
            background: typeFilter === f ? T.blue : T.white,
            color: typeFilter === f ? T.white : T.g600,
          }}>{f}</span>
        ))}
      </div>
      <div style={{ width: 1, height: 24, background: T.g200 }} />
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 12, color: T.g500, fontWeight: 550 }}>Incident:</span>
        <select value={incidentFilter} onChange={e => setIncidentFilter(e.target.value)} style={{
          padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer",
          border: `1px solid ${incidentFilter !== "All" ? T.blue : T.g300}`,
          background: incidentFilter !== "All" ? T.blueL : T.white,
          color: incidentFilter !== "All" ? T.blue : T.navy,
          fontFamily: "inherit", outline: "none", maxWidth: 260,
        }}>
          {incidents.map(r => <option key={r} value={r}>{r === "All" ? "All Incidents" : r}</option>)}
        </select>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { l: "Total", v: items.length, c: T.navy },
          { l: "Active", v: items.filter(r => !["Complete", "Draft"].includes(r.step)).length, c: T.blue },
          { l: "Complete", v: items.filter(r => r.step === "Complete").length, c: T.green },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 12px", background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, fontSize: 11 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.c }} />
            <span style={{ color: T.g500 }}>{s.l}</span>
            <span style={{ fontWeight: 700 }}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Kanban board */}
    <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, minHeight: 420 }}>
      {REQUEST_STEPS.map(step => {
        const stepItems = items.filter(r => r.step === step);
        const sc = stepColor(step);
        return (
          <div key={step} style={{
            minWidth: 210, maxWidth: 240, flex: "0 0 210px",
            background: T.g50, borderRadius: 8, display: "flex", flexDirection: "column",
            border: `1px solid ${T.g200}`,
          }}>
            {/* Column header */}
            <div style={{
              padding: "10px 12px", borderBottom: `2px solid ${sc}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 11, fontWeight: 650, color: T.navy }}>{step}</span>
              <span style={{
                width: 20, height: 20, borderRadius: "50%", background: sc,
                color: T.white, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
              }}>{stepItems.length}</span>
            </div>
            {/* Cards */}
            <div style={{ padding: 8, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {stepItems.map(req => (
                <div key={req.id} style={{
                  background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6,
                  padding: "10px 12px", cursor: "pointer", transition: "box-shadow .12s",
                  borderLeft: `3px solid ${req.priority === "High" ? T.coral : req.priority === "Medium" ? T.orange : T.g300}`,
                }}>
                  {/* Request ID */}
                  <div style={{ fontSize: 10.5, fontFamily: "'DM Mono', monospace", fontWeight: 600, color: T.navy, marginBottom: 4 }}>{req.requestId}</div>
                  {/* Incident */}
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.navy, marginBottom: 4 }}>{req.incident}</div>
                  {/* Type + route */}
                  <div style={{ fontSize: 10.5, color: T.g500, marginBottom: 6 }}>
                    <Chip color={req.type === "Interstate" ? "blue" : "teal"}>{req.type}</Chip>
                    <span style={{ marginLeft: 6 }}>{req.route}</span>
                  </div>
                  {/* Roles progress */}
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.g500, marginBottom: 2 }}>
                      <span>Roles</span>
                      <span style={{ fontWeight: 600 }}>{req.filled}/{req.roles}</span>
                    </div>
                    <div style={{ height: 4, background: T.g200, borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${(req.filled / req.roles) * 100}%`, background: req.filled === req.roles ? T.green : T.orange, borderRadius: 2 }} />
                    </div>
                  </div>
                  {/* Footer: owner + due */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${T.g100}`, paddingTop: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Avatar i={req.ownerInit} c={T.blue} s={18} />
                      <span style={{ fontSize: 10.5, color: T.g600, fontWeight: 550 }}>{req.owner}</span>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      color: req.dueDate === "—" ? T.g400 : req.priority === "High" ? T.coral : T.g500,
                    }}>
                      {req.dueDate === "—" ? "Closed" : `Due ${req.dueDate}`}
                    </span>
                  </div>
                </div>
              ))}
              {stepItems.length === 0 && (
                <div style={{ padding: 16, textAlign: "center", fontSize: 11, color: T.g400, fontStyle: "italic" }}>None</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </>;
}


/* ═══════════════════════════════════════════════
   TASKS TAB — filterable table with role visibility
   scope: national (super admin), agency, personal
   ═══════════════════════════════════════════════ */
function RequestTasksTab({ scope = "national" }) {
  const [filters, setFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);

  const visibleTasks = scope === "national"
    ? REQUEST_TASKS
    : scope === "agency"
    ? REQUEST_TASKS.filter(t => t.agency === "QLD QFES")
    : REQUEST_TASKS.filter(t => t.assignee === "J. Walsh");

  const toggleFilter = (col, val) => {
    setFilters(prev => {
      const cur = prev[col] || [];
      return { ...prev, [col]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] };
    });
  };
  const clearFilter = (col) => setFilters(prev => { const n = { ...prev }; delete n[col]; return n; });
  const activeFilterCount = Object.values(filters).filter(v => v && v.length > 0).length;

  const filterCols = [
    { key: "type", label: "Type" },
    { key: "assignee", label: "Assignee" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
    { key: "request", label: "Request" },
  ];

  const uniqueVals = (key) => [...new Set(visibleTasks.map(t => t[key]))].sort();

  const filtered = visibleTasks.filter(t => {
    for (const col of filterCols) {
      const vals = filters[col.key];
      if (vals && vals.length > 0 && !vals.includes(t[col.key])) return false;
    }
    return true;
  });

  const FilterTH = ({ col }) => {
    const active = filters[col.key] && filters[col.key].length > 0;
    const isOpen = openFilter === col.key;
    return (
      <th style={{
        textAlign: "left", padding: "8px 10px", fontWeight: 550, color: active ? T.blue : T.g500,
        fontSize: 10.5, textTransform: "uppercase", letterSpacing: .5,
        borderBottom: `2px solid ${T.g200}`, whiteSpace: "nowrap", position: "relative", cursor: "pointer",
        userSelect: "none",
      }} onClick={(e) => { e.stopPropagation(); setOpenFilter(isOpen ? null : col.key); }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          {col.label}
          <span style={{ fontSize: 8, opacity: isOpen ? 1 : .5, transition: "transform .15s", transform: isOpen ? "rotate(180deg)" : "none" }}>▼</span>
          {active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.blue, display: "inline-block" }} />}
        </span>
        {isOpen && (
          <div onClick={e => e.stopPropagation()} style={{
            position: "absolute", top: "100%", left: 0, zIndex: 100, minWidth: 200, maxHeight: 260, overflowY: "auto",
            background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8,
            boxShadow: "0 8px 24px rgba(35,52,74,.12)", padding: "6px 0", marginTop: 2,
          }}>
            {active && <div onClick={() => clearFilter(col.key)} style={{ padding: "6px 14px", fontSize: 11, color: T.coral, cursor: "pointer", fontWeight: 600, borderBottom: `1px solid ${T.g100}` }}>Clear filter</div>}
            {uniqueVals(col.key).map(val => {
              const checked = (filters[col.key] || []).includes(val);
              return (
                <label key={val} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", background: checked ? T.blueL : "transparent", fontWeight: checked ? 600 : 400, color: T.navy }}>
                  <input type="checkbox" checked={checked} onChange={() => toggleFilter(col.key, val)} style={{ accentColor: T.blue }} />
                  {val}
                </label>
              );
            })}
          </div>
        )}
      </th>
    );
  };

  const statusColor = (s) => s === "Complete" ? "green" : s === "In Progress" ? "blue" : s === "Overdue" ? "coral" : "orange";
  const prioColor = (p) => p === "High" ? "coral" : p === "Medium" ? "orange" : "gray";

  return <>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ padding: "8px 14px", background: scope === "national" ? T.blueL : scope === "agency" ? T.orangeL : T.greenL, borderRadius: 6, fontSize: 12, fontWeight: 550, color: scope === "national" ? T.blue : scope === "agency" ? "#c06e15" : "#5a8a1f" }}>
        {scope === "national" ? "Super Admin — viewing all request tasks across all teams" : scope === "agency" ? "Agency Admin — viewing request tasks for your managed team" : "Viewing your assigned request tasks"}
      </div>
      {activeFilterCount > 0 && <span onClick={() => setFilters({})} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 550, border: `1px solid ${T.coral}`, background: T.coralL, color: T.coral, cursor: "pointer" }}>Clear all filters ({activeFilterCount})</span>}
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { l: "Total", v: filtered.length, c: T.navy },
          { l: "Overdue", v: filtered.filter(t => t.status === "Overdue").length, c: T.coral },
          { l: "In Progress", v: filtered.filter(t => t.status === "In Progress").length, c: T.blue },
          { l: "Complete", v: filtered.filter(t => t.status === "Complete").length, c: T.green },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, fontSize: 11 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.c }} />
            <span style={{ color: T.g500 }}>{s.l}</span>
            <span style={{ fontWeight: 700 }}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>

    {activeFilterCount > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
      {Object.entries(filters).filter(([,v]) => v && v.length).map(([col, vals]) =>
        vals.map(val => <span key={`${col}-${val}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", background: T.blueL, borderRadius: 20, fontSize: 11, fontWeight: 550, color: T.blue }}>
          {filterCols.find(c => c.key === col)?.label}: {val}
          <span onClick={() => toggleFilter(col, val)} style={{ cursor: "pointer", fontSize: 13, lineHeight: 1 }}>✕</span>
        </span>)
      )}
    </div>}

    <Card>
      <div onClick={() => setOpenFilter(null)}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>
            <TH w={70}>ID</TH>
            <TH w={280}>Task</TH>
            {filterCols.map(col => <FilterTH key={col.key} col={col} />)}
            <TH>Due</TH>
          </tr></thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={i} style={{ cursor: "pointer", background: t.status === "Overdue" ? "#FFF5F5" : "transparent" }}>
                <TD mono fw={600}>{t.id}</TD>
                <TD fw={550}>{t.task}</TD>
                <TD>{t.type}</TD>
                <TD>{t.assignee}</TD>
                <TD><Chip color={statusColor(t.status)}>{t.status}</Chip></TD>
                <TD><Chip color={prioColor(t.priority)}>{t.priority}</Chip></TD>
                <TD mono s={{ fontSize: 11 }}>{t.request}</TD>
                <TD s={{ fontWeight: 550, color: t.status === "Overdue" ? T.coral : T.navy }}>{t.due}</TD>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </>;
}


/* ═══════════════════════════════════════════════
   ALL REQUESTS — full table with column filters
   ═══════════════════════════════════════════════ */
function AllRequestsTab() {
  const [filters, setFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);

  const toggleFilter = (col, val) => {
    setFilters(prev => {
      const cur = prev[col] || [];
      return { ...prev, [col]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] };
    });
  };
  const clearFilter = (col) => setFilters(prev => { const n = { ...prev }; delete n[col]; return n; });
  const activeFilterCount = Object.values(filters).filter(v => v && v.length > 0).length;

  const filterCols = [
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "urgency", label: "Urgency" },
    { key: "incident", label: "Incident" },
  ];

  const uniqueVals = (key) => [...new Set(REQUESTS.map(r => r[key]))].sort();

  const filtered = REQUESTS.filter(r => {
    for (const col of filterCols) {
      const vals = filters[col.key];
      if (vals && vals.length > 0 && !vals.includes(r[col.key])) return false;
    }
    return true;
  });

  const FilterTH = ({ col }) => {
    const active = filters[col.key] && filters[col.key].length > 0;
    const isOpen = openFilter === col.key;
    return (
      <th style={{
        textAlign: "left", padding: "8px 10px", fontWeight: 550, color: active ? T.blue : T.g500,
        fontSize: 10.5, textTransform: "uppercase", letterSpacing: .5,
        borderBottom: `2px solid ${T.g200}`, whiteSpace: "nowrap", position: "relative", cursor: "pointer",
        userSelect: "none",
      }} onClick={(e) => { e.stopPropagation(); setOpenFilter(isOpen ? null : col.key); }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          {col.label}
          <span style={{ fontSize: 8, opacity: isOpen ? 1 : .5, transition: "transform .15s", transform: isOpen ? "rotate(180deg)" : "none" }}>▼</span>
          {active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: T.blue, display: "inline-block" }} />}
        </span>
        {isOpen && (
          <div onClick={e => e.stopPropagation()} style={{
            position: "absolute", top: "100%", left: 0, zIndex: 100, minWidth: 200, maxHeight: 260, overflowY: "auto",
            background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8,
            boxShadow: "0 8px 24px rgba(35,52,74,.12)", padding: "6px 0", marginTop: 2,
          }}>
            {active && <div onClick={() => clearFilter(col.key)} style={{ padding: "6px 14px", fontSize: 11, color: T.coral, cursor: "pointer", fontWeight: 600, borderBottom: `1px solid ${T.g100}` }}>Clear filter</div>}
            {uniqueVals(col.key).map(val => {
              const checked = (filters[col.key] || []).includes(val);
              return (
                <label key={val} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", background: checked ? T.blueL : "transparent", fontWeight: checked ? 600 : 400, color: T.navy }}>
                  <input type="checkbox" checked={checked} onChange={() => toggleFilter(col.key, val)} style={{ accentColor: T.blue }} />
                  {val}
                </label>
              );
            })}
          </div>
        )}
      </th>
    );
  };

  return <>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {[{ l: "Active", v: REQUESTS.filter(r => ["Deployed", "Pending Nomination"].includes(r.status)).length, c: T.green }, { l: "Draft", v: REQUESTS.filter(r => r.status === "Draft").length, c: T.blue }, { l: "Complete", v: REQUESTS.filter(r => r.status === "Complete").length, c: T.g500 }, { l: "Season Total", v: REQUESTS.length, c: T.navy }].map((s, i) => <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} /><span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span><span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span>
      </div>)}
    </div>

    {activeFilterCount > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12, alignItems: "center" }}>
      {Object.entries(filters).filter(([,v]) => v && v.length).map(([col, vals]) =>
        vals.map(val => <span key={`${col}-${val}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", background: T.blueL, borderRadius: 20, fontSize: 11, fontWeight: 550, color: T.blue }}>
          {filterCols.find(c => c.key === col)?.label}: {val}
          <span onClick={() => toggleFilter(col, val)} style={{ cursor: "pointer", fontSize: 13, lineHeight: 1 }}>✕</span>
        </span>)
      )}
      <span onClick={() => setFilters({})} style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 550, border: `1px solid ${T.coral}`, background: T.coralL, color: T.coral, cursor: "pointer" }}>Clear all</span>
    </div>}

    <Card>
      <div onClick={() => setOpenFilter(null)}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>
            <TH>Request ID</TH>
            {filterCols.map(col => <FilterTH key={col.key} col={col} />)}
            <TH>Route</TH>
            <TH>Roles</TH>
            <TH>Created</TH>
            <TH w={50}></TH>
          </tr></thead>
          <tbody>{filtered.map((r, i) => <tr key={i} style={{ cursor: "pointer" }}>
            <TD mono fw={600}>{r.id}</TD>
            <TD><Chip color={r.type === "International" ? "teal" : "blue"}>{r.type}</Chip></TD>
            <TD><Chip color={r.c}>{r.status}</Chip></TD>
            <TD><Chip color={r.urgency === "Urgent" ? "orange" : r.urgency === "Planned" ? "blue" : "gray"}>{r.urgency}</Chip></TD>
            <TD fw={550}>{r.incident}</TD>
            <TD>{r.from} → {r.to}</TD>
            <TD fw={600}>{r.filled}/{r.roles}</TD>
            <TD>{r.date}</TD>
            <TD><span style={{ color: T.g400 }}>›</span></TD>
          </tr>)}</tbody>
        </table>
      </div>
    </Card>
  </>;
}


/* ═══════════════════════════════════════════════
   REQUEST WIZARD — 7-step branching flow
   ═══════════════════════════════════════════════ */
export function RequestWizard({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ type: "", jurisdiction: "", receiving: "", incident: "", urgency: "", justification: "", roles: [{ role: "", qty: 1 }] });
  const totalSteps = 7;
  const stepLabels = ["Request Type", "Incident Context", "Resource Need", "Governance", "Teaming", "Mobilisation", "Review & Create"];

  return <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(35,52,74,.45)", backdropFilter: "blur(4px)" }}>
    <div style={{ width: 720, maxHeight: "90vh", background: T.white, borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,.2)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "20px 28px", borderBottom: `1px solid ${T.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>New Request</h3><p style={{ margin: "2px 0 0", fontSize: 12.5, color: T.g500 }}>Step {step} of {totalSteps} — {stepLabels[step - 1]}</p></div>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: T.g400, cursor: "pointer", padding: 4 }}>✕</button>
      </div>

      <div style={{ padding: "0 28px", paddingTop: 16 }}>
        <div style={{ display: "flex", gap: 4 }}>{Array.from({ length: totalSteps }, (_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? T.blue : T.g200, transition: "background .2s" }} />)}</div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px" }}>
        {step === 1 && <div>
          <p style={{ fontSize: 13, color: T.g600, marginBottom: 16 }}>Select the type of resource sharing request:</p>
          {[{ val: "interstate", label: "Interstate", desc: "Request resources from another Australian jurisdiction" }, { val: "international", label: "International", desc: "Request resources for / from an international deployment" }, { val: "extension", label: "Extension / Backfill", desc: "Extend an existing deployment or request replacement personnel" }].map(opt => <div key={opt.val} onClick={() => setForm({ ...form, type: opt.val })} style={{ padding: "16px 20px", border: `2px solid ${form.type === opt.val ? T.blue : T.g200}`, borderRadius: 8, marginBottom: 10, cursor: "pointer", background: form.type === opt.val ? T.blueL : T.white, transition: "all .12s" }}>
            <div style={{ fontSize: 15, fontWeight: 650 }}>{opt.label}</div>
            <div style={{ fontSize: 12.5, color: T.g500, marginTop: 2 }}>{opt.desc}</div>
          </div>)}
        </div>}

        {step === 2 && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Requesting Jurisdiction"><Select value={form.jurisdiction} onChange={e => setForm({ ...form, jurisdiction: e.target.value })}><option value="">Select…</option>{["NSW","VIC","QLD","SA","WA","TAS","NT","ACT"].map(j=><option key={j}>{j}</option>)}</Select></Field>
          <Field label="Receiving Jurisdiction"><Select value={form.receiving} onChange={e => setForm({ ...form, receiving: e.target.value })}><option value="">Select…</option>{["NSW","VIC","QLD","SA","WA","TAS","NT","ACT","Canada","USA","NZ"].map(j=><option key={j}>{j}</option>)}</Select></Field>
          <Field label="Incident / Deployment Name" span={2}><Input placeholder="e.g. Northern Rivers Flood Response" value={form.incident} onChange={e => setForm({ ...form, incident: e.target.value })} /></Field>
          <Field label="Start Date"><Input type="date" /></Field>
          <Field label="End Date (estimated)"><Input type="date" /></Field>
          <Field label="Urgency"><Select value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}><option value="">Select…</option><option>Immediate</option><option>Urgent</option><option>Planned</option><option>Non-Urgent</option></Select></Field>
          <Field label="Priority"><Select><option value="">Select…</option><option>P1 — Life Safety</option><option>P2 — Property Protection</option><option>P3 — Environmental</option><option>P4 — Planned Support</option></Select></Field>
          <Field label="Justification" span={2}><textarea placeholder="Describe why this request is needed…" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.g300}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", minHeight: 80, resize: "vertical", boxSizing: "border-box" }} /></Field>

          {/* Briefing Materials */}
          <div style={{ gridColumn: "1 / -1", marginTop: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 650, marginBottom: 8 }}>Briefing Materials</div>
            <div style={{ fontSize: 12, color: T.g500, marginBottom: 12 }}>Attach photos, briefing packs, videos, or maps that will be shown to team members when reviewing this request for EOI submission.</div>

            {/* Upload zone */}
            <div style={{
              padding: "20px", border: `2px dashed ${T.g300}`, borderRadius: 10,
              textAlign: "center", cursor: "pointer", marginBottom: 12,
              background: T.g50, transition: "border-color .15s",
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.blue, marginBottom: 4 }}>Drop files here or click to browse</div>
              <div style={{ fontSize: 11.5, color: T.g400 }}>Supports PDF, JPG, PNG, MP4, MOV · Max 50 MB per file</div>
            </div>

            {/* Simulated already-attached files */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { name: "Ops Briefing Pack.pdf", type: "PDF", size: "4.2 MB", color: T.orangeL, fg: "#c06e15" },
                { name: "Aerial overview — fire perimeter.jpg", type: "Photo", size: "1.8 MB", color: T.blueL, fg: T.blue },
                { name: "Base camp layout.jpg", type: "Photo", size: "2.1 MB", color: T.blueL, fg: T.blue },
                { name: "Terrain briefing video.mp4", type: "Video", size: "18.4 MB", color: T.coralL, fg: T.coral },
              ].map((f, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 12px", background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 6, background: f.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 700, color: f.fg, flexShrink: 0,
                  }}>{f.type}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 550, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                    <div style={{ fontSize: 10.5, color: T.g400 }}>{f.size} · Uploaded just now</div>
                  </div>
                  <span style={{ fontSize: 11, color: T.coral, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>Remove</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: T.g400, marginTop: 8 }}>These materials will be visible to eligible team members when they review this request and submit an Expression of Interest.</div>
          </div>
        </div>}

        {step === 3 && <div>
          <p style={{ fontSize: 13, color: T.g600, marginBottom: 16 }}>Specify the roles and quantities required:</p>
          {form.roles.map((r, i) => <div key={i} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr auto", gap: 10, marginBottom: 10, alignItems: "end" }}>
            <Field label={i === 0 ? "Role" : ""}><Select><option>Select role…</option>{["Crew Leader","Crew Member","Operations Officer","Safety Officer","IC Support","Management Support","Heavy Plant Operator","AREP","INLO","Deployment Manager"].map(r=><option key={r}>{r}</option>)}</Select></Field>
            <Field label={i === 0 ? "Qty" : ""}><Input type="number" placeholder="1" /></Field>
            <Field label={i === 0 ? "Qualification" : ""}><Select><option>Any</option><option>Level 2+</option><option>Level 3</option><option>IMT Qualified</option></Select></Field>
            {i > 0 && <button onClick={() => setForm({ ...form, roles: form.roles.filter((_, j) => j !== i) })} style={{ background: "none", border: "none", color: T.coral, cursor: "pointer", fontSize: 16, marginBottom: 8 }}>✕</button>}
          </div>)}
          <Btn v="ghost" onClick={() => setForm({ ...form, roles: [...form.roles, { role: "", qty: 1 }] })} s={{ color: T.blue }}>+ Add another role</Btn>
          <div style={{ marginTop: 20 }}>
            <Field label="Equipment / Support Requirements" span={2}><textarea placeholder="Optional — list any equipment, vehicles, or specialist support needed…" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.g300}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", minHeight: 60, resize: "vertical", boxSizing: "border-box" }} /></Field>
          </div>
        </div>}

        {step === 4 && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Requestor"><Input placeholder="Name" /></Field>
          <Field label="Authoriser"><Input placeholder="Name" /></Field>
          <Field label="Requesting Party (RP)"><Select><option>Select…</option><option>NRSC</option><option>State/Territory</option><option>Agency</option></Select></Field>
          <Field label="Supplying Party (SP)"><Select><option>Select…</option><option>NRSC</option><option>State/Territory</option><option>Agency</option></Select></Field>
          <Field label="Cost Recovery Model" span={2}><Select><option>Select…</option><option>Standard AFAC Cost-Sharing</option><option>Bilateral Agreement</option><option>Host Agency Covers</option><option>Custom</option></Select></Field>
          <Field label="Key Contact — Operations"><Input placeholder="Name and phone" /></Field>
          <Field label="Key Contact — Logistics"><Input placeholder="Name and phone" /></Field>
          <Field label="Reimbursement Notes" span={2}><textarea placeholder="Optional notes on cost recovery arrangements…" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.g300}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", minHeight: 60, resize: "vertical", boxSizing: "border-box" }} /></Field>

          {/* Resource Sharing Agreement (2.33) */}
          <div style={{ gridColumn: "1 / -1", marginTop: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 650, marginBottom: 8 }}>Resource Sharing Agreement</div>
            <div style={{ background: T.g50, border: `1px solid ${T.g200}`, borderRadius: 8, padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12.5, fontWeight: 550 }}>Bilateral Agreement Status</span>
                <span style={{ padding: "3px 10px", background: T.greenL, color: "#5a8a1f", borderRadius: 20, fontSize: 11, fontWeight: 550 }}>Active</span>
              </div>
              {[
                ["Agreement Type", "AFAC Standard Resource Sharing"],
                ["Parties", form.jurisdiction ? `${form.jurisdiction} ↔ ${form.receiving || 'TBC'}` : "Select jurisdictions above"],
                ["Effective Period", "1 Jul 2025 – 30 Jun 2026"],
                ["Cost Basis", "Standard AFAC Cost-Sharing Formula"],
                ["Insurance", "Workers comp covered by home agency"],
                ["Liability", "Host agency assumes operational liability"],
              ].map(([k, v], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${T.g200}`, fontSize: 12 }}>
                  <span style={{ color: T.g500 }}>{k}</span>
                  <span style={{ fontWeight: 550, textAlign: "right", maxWidth: 200 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <Btn v="secondary" s={{ fontSize: 11, padding: "4px 12px" }}>View Full Agreement</Btn>
                <Btn v="secondary" s={{ fontSize: 11, padding: "4px 12px" }}>Request Amendment</Btn>
              </div>
            </div>
          </div>
        </div>}

        {step === 5 && <div>
          <p style={{ fontSize: 13, color: T.g600, marginBottom: 16 }}>Nominate agencies and shortlist personnel for this request:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Card title="Nominate Agencies">
              {["NSW RFS","CFA","QFES","TFS","CFS","DFES","ACT ESA","NTFRS"].map((ag,i)=><label key={ag} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:i<7?`1px solid ${T.g100}`:"none",fontSize:13,cursor:"pointer"}}><input type="checkbox" style={{accentColor:T.blue}} defaultChecked={i<3}/>{ag}</label>)}
            </Card>
            <Card title="Contingent Grouping">
              <p style={{ fontSize: 12.5, color: T.g500, marginBottom: 12 }}>Define how personnel will be grouped:</p>
              {["IMT / Overhead","Crew 1","Crew 2","Specialist"].map((g,i)=><div key={g} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:i<3?`1px solid ${T.g100}`:"none"}}><span style={{fontSize:13,fontWeight:550}}>{g}</span><Input type="number" placeholder="0" style={{width:60}}/></div>)}
            </Card>
          </div>
        </div>}

        {step === 6 && <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Field label="Manifest Required?"><Select><option>Yes — flights to be arranged</option><option>No — self-travel</option><option>Mixed</option></Select></Field>
          <Field label="Muster Point"><Input placeholder="e.g. Sydney Airport T2" /></Field>
          <Field label="Accommodation"><Input placeholder="e.g. Lismore Gateway Motel" /></Field>
          <Field label="Ground Transport"><Select><option>Required — NRSC to arrange</option><option>Required — host agency provides</option><option>Not required</option></Select></Field>
          {form.type === "international" && <>
            <Field label="Passport Check"><Select><option>All personnel verified</option><option>Verification in progress</option><option>Not yet checked</option></Select></Field>
            <Field label="Visa / eTA Status"><Select><option>All approved</option><option>In progress</option><option>Not started</option></Select></Field>
          </>}
          <Field label="Special Instructions" span={2}><textarea placeholder="Any special mobilisation instructions…" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.g300}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", minHeight: 60, resize: "vertical", boxSizing: "border-box" }} /></Field>
        </div>}

        {step === 7 && <div>
          <div style={{ padding: 20, background: T.greenL, borderRadius: 8, marginBottom: 20, border: `1px solid ${T.green}30` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#3a6a10", marginBottom: 4 }}>✓ Request Ready to Submit</div>
            <div style={{ fontSize: 13, color: "#5a8a1f" }}>Review the summary below, then create the request.</div>
          </div>
          <Card title="Request Summary">
            {[["Type", form.type ? form.type.charAt(0).toUpperCase() + form.type.slice(1) : "—"], ["Incident", form.incident || "—"], ["Route", `${form.jurisdiction || "—"} → ${form.receiving || "—"}`], ["Urgency", form.urgency || "—"], ["Roles Requested", `${form.roles.length} role type(s)`], ["Generated ID", "2025_26_011XX_XXX001"]].map(([k, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13, borderBottom: `1px solid ${T.g100}` }}><span style={{ color: T.g500 }}>{k}</span><span style={{ fontWeight: 600, fontFamily: k === "Generated ID" ? "'DM Mono',monospace" : "inherit" }}>{v}</span></div>)}
          </Card>

          {/* Cost Estimate (2.50) */}
          <Card title="Estimated Deployment Cost" s={{ marginTop: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div style={{ padding: "12px 14px", background: T.blueL, borderRadius: 8, border: `1px solid ${T.blue}30` }}>
                <div style={{ fontSize: 10, color: T.blue, fontWeight: 600, textTransform: "uppercase", letterSpacing: .3 }}>Total Estimate</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.blue, marginTop: 2 }}>$186,400</div>
              </div>
              <div style={{ padding: "12px 14px", background: T.g50, borderRadius: 8, border: `1px solid ${T.g200}` }}>
                <div style={{ fontSize: 10, color: T.g500, fontWeight: 600, textTransform: "uppercase", letterSpacing: .3 }}>Per Person/Day</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.navy, marginTop: 2 }}>$620</div>
              </div>
              <div style={{ padding: "12px 14px", background: T.g50, borderRadius: 8, border: `1px solid ${T.g200}` }}>
                <div style={{ fontSize: 10, color: T.g500, fontWeight: 600, textTransform: "uppercase", letterSpacing: .3 }}>Confidence</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: T.orange, marginTop: 2 }}>Medium</div>
              </div>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Cost Breakdown</div>
            {[
              { cat: "Travel & Flights", est: "$42,000", basis: "Based on avg. airfare $1,400 × 30 personnel" },
              { cat: "Accommodation", est: "$56,000", basis: "$200/night × 14 days × 20 rooms" },
              { cat: "Meals & Incidentals", est: "$25,200", basis: "$60/day × 14 days × 30 personnel" },
              { cat: "Ground Transport", est: "$18,000", basis: "Vehicle hire + fuel est. for 6 vehicles" },
              { cat: "Allowances", est: "$37,800", basis: "$90/day deployment allowance × 14 days × 30" },
              { cat: "Insurance & Admin", est: "$7,400", basis: "4% overhead on total deployment cost" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "6px 0", borderBottom: i < 5 ? `1px solid ${T.g100}` : "none" }}>
                <span style={{ fontSize: 12, fontWeight: 550, width: 160 }}>{c.cat}</span>
                <span style={{ fontSize: 12, fontWeight: 650, width: 80 }}>{c.est}</span>
                <span style={{ fontSize: 11, color: T.g500, flex: 1 }}>{c.basis}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, padding: "8px 12px", background: T.orangeL, borderRadius: 6, fontSize: 11.5, color: "#c06e15" }}>
              Estimates based on historical deployment averages. Actual costs may vary based on duration, location, and personnel numbers.
            </div>
          </Card>

          <div style={{ marginTop: 16, padding: "12px 16px", background: T.orangeL, borderRadius: 6, fontSize: 12.5, color: "#c06e15", borderLeft: `3px solid ${T.orange}` }}>
            <strong>⚠ Warnings:</strong> No personnel shortlisted yet. Manifest details incomplete. These can be completed after request creation.
          </div>
        </div>}
      </div>

      <div style={{ padding: "16px 28px", borderTop: `1px solid ${T.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Btn v="ghost" onClick={step === 1 ? onClose : () => setStep(step - 1)}>{step === 1 ? "Cancel" : "← Back"}</Btn>
        <div style={{ display: "flex", gap: 8 }}>
          {step < totalSteps && <Btn v="ghost">Save as Draft</Btn>}
          {step < totalSteps ? <Btn v="primary" onClick={() => setStep(step + 1)}>Continue →</Btn> : <Btn v="primary" onClick={onClose} s={{ background: T.green }}>Create Request</Btn>}
        </div>
      </div>
    </div>
  </div>;
}
