import { useState } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const Avatar=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const TH=({children,w})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap",width:w}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;
const TabBar=({tabs,active,onChange})=><div style={{display:"flex",gap:0,borderBottom:`2px solid ${T.g200}`,marginBottom:20}}>{tabs.map(t=><button key={t} onClick={()=>onChange(t)} style={{padding:"10px 20px",fontSize:13,fontWeight:active===t?650:500,color:active===t?T.blue:T.g500,borderBottom:active===t?`2px solid ${T.blue}`:"2px solid transparent",marginBottom:-2,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",transition:"all .12s"}}>{t}</button>)}</div>;

const PEOPLE = [
  {name:"Daniel Thornton",agency:"QLD QFES",jurisdiction:"QLD",role:"Crew Leader",deployability:"Interstate Ready",deployment:"Northern Rivers · CREW2",readiness:85,initials:"DT",color:T.blue,expiry:null},
  {name:"Sarah Patel",agency:"QLD QFES",jurisdiction:"QLD",role:"Operations Officer",deployability:"Interstate Ready",deployment:"—",readiness:92,initials:"SP",color:T.coral,expiry:null},
  {name:"Ben Harper",agency:"VIC CFA",jurisdiction:"VIC",role:"Management Support",deployability:"Pending EOI",deployment:"—",readiness:45,initials:"BH",color:T.orange,expiry:"EOI pending"},
  {name:"Tom Briggs",agency:"QLD QFES",jurisdiction:"QLD",role:"Flood Ops",deployability:"Interstate Ready",deployment:"Northern Rivers · CREW2",readiness:78,initials:"TB",color:T.teal,expiry:null},
  {name:"Karen Wong",agency:"QLD QFES",jurisdiction:"QLD",role:"Flood Ops",deployability:"Interstate Ready",deployment:"Northern Rivers · CREW2",readiness:88,initials:"KW",color:"#6C5CE7",expiry:"Fatigue: 9 days"},
  {name:"Rachel Kimura",agency:"VIC CFA",jurisdiction:"VIC",role:"Deployment Manager",deployability:"Interstate Ready",deployment:"Northern Rivers · DM",readiness:90,initials:"RK",color:T.green,expiry:"Demob 1 Apr"},
  {name:"Alice Nguyễn",agency:"VIC CFA",jurisdiction:"VIC",role:"INLO Admin",deployability:"International Pending",deployment:"Canada 2025 · INLO1",readiness:62,initials:"AN",color:T.blue,expiry:"eTA pending"},
  {name:"Peter O'Brien",agency:"TAS TFS",jurisdiction:"TAS",role:"Safety Officer",deployability:"Interstate Ready",deployment:"Northern Rivers · IMT1",readiness:95,initials:"PO",color:T.navy,expiry:null},
  {name:"David Kang",agency:"SA CFS",jurisdiction:"SA",role:"IC Support",deployability:"On Hold",deployment:"Canada 2025 · IMT1",readiness:70,initials:"DK",color:T.coral,expiry:"I/I/I active"},
  {name:"Jake Williams",agency:"VIC CFA",jurisdiction:"VIC",role:"Crew Member",deployability:"Interstate Ready",deployment:"—",readiness:81,initials:"JW",color:T.teal,expiry:null},
  {name:"Linda Brooks",agency:"NSW RFS",jurisdiction:"NSW",role:"Coordinator",deployability:"Not Registered",deployment:"—",readiness:30,initials:"LB",color:T.g500,expiry:"WWCC expired"},
  {name:"Mark Sullivan",agency:"SA CFS",jurisdiction:"SA",role:"AREP",deployability:"Interstate Ready",deployment:"Northern Rivers · AREP",readiness:83,initials:"MS",color:"#00B894",expiry:null},
];

/* ═══════════════════════════════════════════════
   EOI KANBAN DATA
   ═══════════════════════════════════════════════ */
const INTERSTATE_STEPS = [
  "EOI Submitted",
  "Agency Review",
  "NRSC Validation",
  "Pre-Deploy Checks",
  "Nomination Confirmed",
  "Mobilisation Ready",
];

const INTERNATIONAL_STEPS = [
  "EOI Submitted",
  "Agency Review",
  "NRSC Validation",
  "International Clearance",
  "Visa / eTA",
  "Pre-Deploy Checks",
  "Nomination Confirmed",
  "Mobilisation Ready",
];

const EOI_ITEMS = [
  { id: 1, name: "Ben Harper", agency: "VIC CFA", role: "Management Support Officer", type: "Interstate", request: "2025_26_008NSW_VIC001", step: "Agency Review", assignee: "S. Patel", assigneeInit: "SP", dueDate: "2 Apr", priority: "Medium", initials: "BH", color: T.orange },
  { id: 2, name: "Nina Roberts", agency: "QLD QFES", role: "Flood Ops", type: "Interstate", request: "2025_26_007NSW_QLD001", step: "NRSC Validation", assignee: "J. Walsh", assigneeInit: "JW", dueDate: "1 Apr", priority: "High", initials: "NR", color: T.blue },
  { id: 3, name: "Sam O'Connor", agency: "TAS TFS", role: "Safety Officer", type: "Interstate", request: "2025_26_007NSW_QLD001", step: "Nomination Confirmed", assignee: "J. Walsh", assigneeInit: "JW", dueDate: "—", priority: "Low", initials: "SO", color: T.green },
  { id: 4, name: "Lisa Morton", agency: "SA CFS", role: "Crew Member", type: "International", request: "2025_26_INT_CAN_001", step: "Visa / eTA", assignee: "M. Sullivan", assigneeInit: "MS", dueDate: "5 Apr", priority: "High", initials: "LM", color: T.coral },
  { id: 5, name: "Chris Adams", agency: "SA SASES", role: "Crew Leader", type: "International", request: "2025_26_INT_CAN_001", step: "Mobilisation Ready", assignee: "M. Sullivan", assigneeInit: "MS", dueDate: "—", priority: "Low", initials: "CA", color: T.teal },
  { id: 6, name: "Jake Williams", agency: "VIC CFA", role: "Crew Member", type: "Interstate", request: "2025_26_008NSW_VIC001", step: "EOI Submitted", assignee: "Unassigned", assigneeInit: "—", dueDate: "3 Apr", priority: "Medium", initials: "JW", color: T.teal },
  { id: 7, name: "Tom Briggs", agency: "QLD QFES", role: "Flood Ops", type: "Interstate", request: "2025_26_007NSW_QLD001", step: "Pre-Deploy Checks", assignee: "R. Kimura", assigneeInit: "RK", dueDate: "31 Mar", priority: "High", initials: "TB", color: T.blue },
  { id: 8, name: "Alice Nguyễn", agency: "VIC CFA", role: "INLO Admin", type: "International", request: "2025_26_INT_CAN_001", step: "International Clearance", assignee: "J. Walsh", assigneeInit: "JW", dueDate: "4 Apr", priority: "Medium", initials: "AN", color: T.blue },
  { id: 9, name: "Raj Patel", agency: "NSW RFS", role: "Crew Member", type: "Interstate", request: "2025_26_008NSW_VIC001", step: "EOI Submitted", assignee: "Unassigned", assigneeInit: "—", dueDate: "3 Apr", priority: "High", initials: "RP", color: "#6C5CE7" },
  { id: 10, name: "Meg Lawson", agency: "QLD QFES", role: "Crew Leader", type: "Interstate", request: "2025_26_007NSW_QLD001", step: "EOI Submitted", assignee: "Unassigned", assigneeInit: "—", dueDate: "4 Apr", priority: "Medium", initials: "ML", color: T.navy },
  { id: 11, name: "Yuki Tanaka", agency: "VIC CFA", role: "IMT Support", type: "International", request: "2025_26_INT_CAN_001", step: "Agency Review", assignee: "S. Patel", assigneeInit: "SP", dueDate: "3 Apr", priority: "High", initials: "YT", color: T.coral },
  { id: 12, name: "Liam Chen", agency: "TAS TFS", role: "Flood Ops", type: "Interstate", request: "2025_26_007NSW_QLD001", step: "Agency Review", assignee: "R. Kimura", assigneeInit: "RK", dueDate: "2 Apr", priority: "Medium", initials: "LC", color: T.green },
  { id: 13, name: "Priya Sharma", agency: "SA CFS", role: "Operations Officer", type: "Interstate", request: "2025_26_009NSW_SA001", step: "NRSC Validation", assignee: "J. Walsh", assigneeInit: "JW", dueDate: "2 Apr", priority: "Medium", initials: "PS", color: "#00B894" },
  { id: 14, name: "Oscar Trent", agency: "WA DFES", role: "Safety Advisor", type: "Interstate", request: "2025_26_010NSW_WA001", step: "Pre-Deploy Checks", assignee: "R. Kimura", assigneeInit: "RK", dueDate: "4 Apr", priority: "Low", initials: "OT", color: T.orange },
  { id: 15, name: "Zara Mitchell", agency: "QLD QFES", role: "IC Support", type: "International", request: "2025_26_INT_CAN_001", step: "International Clearance", assignee: "M. Sullivan", assigneeInit: "MS", dueDate: "6 Apr", priority: "High", initials: "ZM", color: "#6C5CE7" },
  { id: 16, name: "Dave Kowalski", agency: "VIC CFA", role: "Heavy Plant Operator", type: "Interstate", request: "2025_26_008NSW_VIC001", step: "Nomination Confirmed", assignee: "J. Walsh", assigneeInit: "JW", dueDate: "—", priority: "Low", initials: "DK", color: T.navy },
  { id: 17, name: "Fiona Grant", agency: "NSW RFS", role: "Coordinator", type: "International", request: "2025_26_INT_CAN_001", step: "Visa / eTA", assignee: "J. Walsh", assigneeInit: "JW", dueDate: "7 Apr", priority: "Medium", initials: "FG", color: T.teal },
  { id: 18, name: "Steve Barker", agency: "SA SASES", role: "AREP", type: "International", request: "2025_26_INT_CAN_001", step: "Mobilisation Ready", assignee: "M. Sullivan", assigneeInit: "MS", dueDate: "—", priority: "Low", initials: "SB", color: T.green },
];

/* ═══════════════════════════════════════════════
   TASKS DATA
   ═══════════════════════════════════════════════ */
const TASKS = [
  { id: "T-001", task: "Review EOI — Ben Harper", type: "EOI Review", eoi: "Ben Harper", assignee: "S. Patel", agency: "QLD QFES", status: "In Progress", priority: "Medium", due: "2 Apr 2026", request: "2025_26_008NSW_VIC001" },
  { id: "T-002", task: "Validate credentials — Nina Roberts", type: "Pre-Deploy Check", eoi: "Nina Roberts", assignee: "J. Walsh", agency: "NRSC", status: "Pending", priority: "High", due: "1 Apr 2026", request: "2025_26_007NSW_QLD001" },
  { id: "T-003", task: "Confirm nomination — Sam O'Connor", type: "Nomination", eoi: "Sam O'Connor", assignee: "J. Walsh", agency: "NRSC", status: "Complete", priority: "Low", due: "30 Mar 2026", request: "2025_26_007NSW_QLD001" },
  { id: "T-004", task: "Chase eTA application — Lisa Morton", type: "International Docs", eoi: "Lisa Morton", assignee: "M. Sullivan", agency: "SA CFS", status: "In Progress", priority: "High", due: "5 Apr 2026", request: "2025_26_INT_CAN_001" },
  { id: "T-005", task: "Run pre-deploy checks — Tom Briggs", type: "Pre-Deploy Check", eoi: "Tom Briggs", assignee: "R. Kimura", agency: "VIC CFA", status: "Overdue", priority: "High", due: "31 Mar 2026", request: "2025_26_007NSW_QLD001" },
  { id: "T-006", task: "Assign case officer — Jake Williams", type: "EOI Triage", eoi: "Jake Williams", assignee: "J. Walsh", agency: "NRSC", status: "Pending", priority: "Medium", due: "3 Apr 2026", request: "2025_26_008NSW_VIC001" },
  { id: "T-007", task: "Medical clearance review — Alice Nguyễn", type: "International Docs", eoi: "Alice Nguyễn", assignee: "J. Walsh", agency: "NRSC", status: "In Progress", priority: "Medium", due: "4 Apr 2026", request: "2025_26_INT_CAN_001" },
  { id: "T-008", task: "Agency sign-off — Chris Adams", type: "Agency Approval", eoi: "Chris Adams", assignee: "M. Sullivan", agency: "SA CFS", status: "Complete", priority: "Low", due: "28 Mar 2026", request: "2025_26_INT_CAN_001" },
  { id: "T-009", task: "Fatigue review — Karen Wong", type: "Welfare Check", eoi: "Karen Wong", assignee: "R. Kimura", agency: "VIC CFA", status: "In Progress", priority: "High", due: "30 Mar 2026", request: "2025_26_007NSW_QLD001" },
  { id: "T-010", task: "WWCC renewal reminder — Linda Brooks", type: "Credential Expiry", eoi: "Linda Brooks", assignee: "S. Patel", agency: "QLD QFES", status: "Overdue", priority: "High", due: "12 Jan 2026", request: "—" },
];

/* ═══════════════════════════════════════════════
   PEOPLE WORKSPACE — 3 tabs
   scope: "national" | "agency" | "personal"
   ═══════════════════════════════════════════════ */
export default function PeopleWorkspace({ scope = "national" }) {
  const personalTabs = ["My Profile", "My EOIs", "My Tasks"];
  const orgTabs = ["EOI Management", "Tasks", "Directory"];
  const tabs = scope === "personal" ? personalTabs : orgTabs;
  const [tab, setTab] = useState(tabs[0]);
  const [search, setSearch] = useState("");

  const filtered = PEOPLE.filter(p => {
    if (scope === "agency") return p.agency === "QLD QFES";
    return true;
  }).filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.agency.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase()));

  if (scope === "personal") return <PersonalRecord tab={tab} setTab={setTab} tabs={personalTabs} />;

  return (
    <div style={{ padding: "24px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>People</h2>
          <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>
            {scope === "agency" ? "QLD QFES personnel — EOI management and task tracking" : "National personnel directory — EOI management and task tracking"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn v="secondary">Export</Btn>
          <Btn v="primary">+ Register Person</Btn>
        </div>
      </div>

      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === "Directory" && <DirectoryTab people={filtered} search={search} setSearch={setSearch} scope={scope} />}
      {tab === "EOI Management" && <EOIKanbanTab scope={scope} />}
      {tab === "Tasks" && <TasksTab scope={scope} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   DIRECTORY TAB — grouped by agency + column filters
   ═══════════════════════════════════════════════ */
function DirectoryTab({ people, search, setSearch, scope }) {
  const [filters, setFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);
  const [collapsed, setCollapsed] = useState({});

  const toggleFilter = (col, val) => {
    setFilters(prev => {
      const cur = prev[col] || [];
      return { ...prev, [col]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] };
    });
  };
  const clearFilter = (col) => setFilters(prev => { const n = { ...prev }; delete n[col]; return n; });
  const activeFilterCount = Object.values(filters).filter(v => v && v.length > 0).length;

  const uniqueVals = (key) => [...new Set(people.map(p => p[key]))].sort();
  const filterCols = [
    { key: "agency", label: "Agency" },
    { key: "jurisdiction", label: "Jurisdiction" },
    { key: "role", label: "Role" },
    { key: "deployability", label: "Deployability" },
    { key: "deployment", label: "Current Deployment" },
  ];

  const filtered = people.filter(p => {
    for (const col of filterCols) {
      const vals = filters[col.key];
      if (vals && vals.length > 0 && !vals.includes(p[col.key])) return false;
    }
    return true;
  });

  const agencies = [...new Set(filtered.map(p => p.agency))].sort();
  const grouped = agencies.map(ag => ({ agency: ag, people: filtered.filter(p => p.agency === ag) }));

  const FilterHeader = ({ col }) => {
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
    <div style={{ display: "flex", gap: 10, marginBottom: 12 }} onClick={() => setOpenFilter(null)}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: T.white, border: `1px solid ${T.g300}`, borderRadius: 6, fontSize: 13 }}>
        <span style={{ color: T.g400 }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, agency, role, jurisdiction…" style={{ border: "none", outline: "none", flex: 1, fontSize: 13, fontFamily: "inherit", background: "transparent" }} />
      </div>
      {activeFilterCount > 0 && <span onClick={() => setFilters({})} style={{ padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 550, border: `1px solid ${T.coral}`, background: T.coralL, color: T.coral, cursor: "pointer" }}>Clear all filters ({activeFilterCount})</span>}
    </div>

    {activeFilterCount > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
      {Object.entries(filters).filter(([,v]) => v && v.length).map(([col, vals]) =>
        vals.map(val => <span key={`${col}-${val}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", background: T.blueL, borderRadius: 20, fontSize: 11, fontWeight: 550, color: T.blue }}>
          {filterCols.find(c => c.key === col)?.label}: {val}
          <span onClick={() => toggleFilter(col, val)} style={{ cursor: "pointer", fontSize: 13, lineHeight: 1 }}>✕</span>
        </span>)
      )}
    </div>}

    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {[{ l: "Total", v: filtered.length, c: T.navy }, { l: "Deployed", v: filtered.filter(p => p.deployment !== "—").length, c: T.blue }, { l: "Available", v: filtered.filter(p => p.deployment === "—" && p.readiness >= 70).length, c: T.green }, { l: "Exceptions", v: filtered.filter(p => p.expiry).length, c: T.coral }].map((s, i) => <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} /><span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span><span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span>
      </div>)}
    </div>

    <Card>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr>
          <TH w={200}>Name</TH>
          {filterCols.map(col => <FilterHeader key={col.key} col={col} />)}
          <th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 550, color: T.g500, fontSize: 10.5, textTransform: "uppercase", letterSpacing: .5, borderBottom: `2px solid ${T.g200}`, whiteSpace: "nowrap" }}>Readiness</th>
          <TH w={50}></TH>
        </tr></thead>
        <tbody>
          {grouped.map((group) => {
            const isCollapsed = collapsed[group.agency];
            return [
              <tr key={`header-${group.agency}`}
                onClick={() => setCollapsed(prev => ({ ...prev, [group.agency]: !prev[group.agency] }))}
                style={{ cursor: "pointer", background: T.g50 }}>
                <td colSpan={8} style={{ padding: "10px 10px", borderBottom: `1px solid ${T.g200}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, color: T.g400, transition: "transform .15s", transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)", display: "inline-block" }}>▼</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{group.agency}</span>
                    <span style={{ fontSize: 11, color: T.g500 }}>({group.people.length} {group.people.length === 1 ? "person" : "people"})</span>
                    <span style={{ marginLeft: 8 }}><Chip color="green">{group.people.filter(p => p.deployment !== "—").length} deployed</Chip></span>
                  </div>
                </td>
              </tr>,
              ...(!isCollapsed ? group.people.map((p, i) => (
                <tr key={`${group.agency}-${i}`} style={{ cursor: "pointer" }}>
                  <TD fw={600}><div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 16 }}><Avatar i={p.initials} c={p.color} s={26} />{p.name}</div></TD>
                  <TD>{p.agency}</TD>
                  <TD>{p.jurisdiction}</TD>
                  <TD>{p.role}</TD>
                  <TD><Chip color={p.deployability.includes("Ready") ? "green" : p.deployability.includes("Pending") ? "orange" : p.deployability === "On Hold" ? "coral" : "gray"}>{p.deployability}</Chip></TD>
                  <TD s={{ color: p.deployment === "—" ? T.g400 : T.navy, fontWeight: p.deployment === "—" ? 400 : 550 }}>{p.deployment}</TD>
                  <TD><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 40, height: 6, background: T.g200, borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${p.readiness}%`, height: "100%", background: p.readiness >= 80 ? T.green : p.readiness >= 60 ? T.orange : T.coral, borderRadius: 3 }} /></div><span style={{ fontSize: 11, color: T.g500 }}>{p.readiness}%</span></div></TD>
                  <TD><span style={{ color: T.g400 }}>›</span></TD>
                </tr>
              )) : [])
            ];
          })}
        </tbody>
      </table>
    </Card>
  </>;
}


/* ═══════════════════════════════════════════════
   EOI MANAGEMENT — Kanban Board
   ═══════════════════════════════════════════════ */
function EOIKanbanTab({ scope }) {
  const [typeFilter, setTypeFilter] = useState("All");
  const [requestFilter, setRequestFilter] = useState("All");
  const requests = ["All", ...new Set(EOI_ITEMS.map(e => e.request))];

  const items = EOI_ITEMS.filter(e => {
    if (typeFilter !== "All" && e.type !== typeFilter) return false;
    if (requestFilter !== "All" && e.request !== requestFilter) return false;
    return true;
  });

  const steps = typeFilter === "International" ? INTERNATIONAL_STEPS : typeFilter === "Interstate" ? INTERSTATE_STEPS : [...new Set([...INTERSTATE_STEPS, ...INTERNATIONAL_STEPS])];
  // Deduplicated ordered steps for "All"
  const allSteps = ["EOI Submitted", "Agency Review", "NRSC Validation", "International Clearance", "Visa / eTA", "Pre-Deploy Checks", "Nomination Confirmed", "Mobilisation Ready"];
  const displaySteps = typeFilter === "All" ? allSteps : steps;

  const stepColor = (step) => {
    if (step === "EOI Submitted") return T.g500;
    if (step === "Agency Review" || step === "NRSC Validation") return T.orange;
    if (step === "International Clearance" || step === "Visa / eTA") return T.blue;
    if (step === "Pre-Deploy Checks") return T.teal;
    if (step === "Nomination Confirmed") return T.green;
    if (step === "Mobilisation Ready") return "#00B894";
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
        <span style={{ fontSize: 12, color: T.g500, fontWeight: 550 }}>Request:</span>
        <select value={requestFilter} onChange={e => setRequestFilter(e.target.value)} style={{
          padding: "6px 12px", borderRadius: 6, fontSize: 12, fontWeight: 500, cursor: "pointer",
          border: `1px solid ${requestFilter !== "All" ? T.blue : T.g300}`,
          background: requestFilter !== "All" ? T.blueL : T.white,
          color: requestFilter !== "All" ? T.blue : T.navy,
          fontFamily: "'DM Mono', monospace", outline: "none",
        }}>
          {requests.map(r => <option key={r} value={r}>{r === "All" ? "All Requests" : r}</option>)}
        </select>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", gap: 10 }}>
        {[
          { l: "Total EOIs", v: items.length, c: T.navy },
          { l: "In Progress", v: items.filter(e => !["Mobilisation Ready", "Nomination Confirmed"].includes(e.step)).length, c: T.orange },
          { l: "Complete", v: items.filter(e => ["Mobilisation Ready", "Nomination Confirmed"].includes(e.step)).length, c: T.green },
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
    <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, minHeight: 400 }}>
      {displaySteps.map(step => {
        const stepItems = items.filter(e => e.step === step);
        const sc = stepColor(step);
        return (
          <div key={step} style={{
            minWidth: 220, maxWidth: 260, flex: "0 0 220px",
            background: T.g50, borderRadius: 8, display: "flex", flexDirection: "column",
            border: `1px solid ${T.g200}`,
          }}>
            {/* Column header */}
            <div style={{
              padding: "10px 12px", borderBottom: `2px solid ${sc}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{ fontSize: 11.5, fontWeight: 650, color: T.navy }}>{step}</span>
              <span style={{
                width: 20, height: 20, borderRadius: "50%", background: sc,
                color: T.white, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
              }}>{stepItems.length}</span>
            </div>
            {/* Cards */}
            <div style={{ padding: 8, flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {stepItems.map(eoi => (
                <div key={eoi.id} style={{
                  background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6,
                  padding: "10px 12px", cursor: "pointer", transition: "box-shadow .12s",
                  borderLeft: `3px solid ${eoi.priority === "High" ? T.coral : eoi.priority === "Medium" ? T.orange : T.g300}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <Avatar i={eoi.initials} c={eoi.color} s={22} />
                    <span style={{ fontSize: 12.5, fontWeight: 650, color: T.navy }}>{eoi.name}</span>
                  </div>
                  <div style={{ fontSize: 11, color: T.g500, marginBottom: 4 }}>{eoi.role}</div>
                  <div style={{ fontSize: 10.5, color: T.g400, marginBottom: 8 }}>
                    {eoi.agency} · <Chip color={eoi.type === "Interstate" ? "blue" : "teal"}>{eoi.type}</Chip>
                  </div>
                  {/* Request ref */}
                  <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: T.g500, background: T.g100, padding: "2px 6px", borderRadius: 3, display: "inline-block", marginBottom: 8 }}>{eoi.request}</div>
                  {/* Footer: assignee + due */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${T.g100}`, paddingTop: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Avatar i={eoi.assigneeInit} c={eoi.assignee === "Unassigned" ? T.g400 : T.blue} s={18} />
                      <span style={{ fontSize: 10.5, color: eoi.assignee === "Unassigned" ? T.g400 : T.g600, fontWeight: 550 }}>{eoi.assignee}</span>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      color: eoi.dueDate === "—" ? T.g400 : eoi.priority === "High" ? T.coral : T.g500,
                    }}>
                      {eoi.dueDate === "—" ? "No due date" : `Due ${eoi.dueDate}`}
                    </span>
                  </div>
                </div>
              ))}
              {stepItems.length === 0 && (
                <div style={{ padding: 16, textAlign: "center", fontSize: 11, color: T.g400, fontStyle: "italic" }}>No EOIs</div>
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
   scope: national = super admin (all tasks)
   scope: agency = managed team tasks
   scope: personal = my tasks only
   ═══════════════════════════════════════════════ */
function TasksTab({ scope }) {
  const [filters, setFilters] = useState({});
  const [openFilter, setOpenFilter] = useState(null);

  /* Role-based visibility */
  const visibleTasks = scope === "national"
    ? TASKS
    : scope === "agency"
    ? TASKS.filter(t => t.agency === "QLD QFES")
    : TASKS.filter(t => t.assignee === "J. Walsh"); // default to logged-in user

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
    {/* Visibility banner */}
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ padding: "8px 14px", background: scope === "national" ? T.blueL : scope === "agency" ? T.orangeL : T.greenL, borderRadius: 6, fontSize: 12, fontWeight: 550, color: scope === "national" ? T.blue : scope === "agency" ? "#c06e15" : "#5a8a1f" }}>
        {scope === "national" ? "Super Admin — viewing all tasks across all teams" : scope === "agency" ? "Agency Admin — viewing tasks for your managed team" : "Viewing your assigned tasks"}
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

    {/* Active filter chips */}
    {activeFilterCount > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
      {Object.entries(filters).filter(([,v]) => v && v.length).map(([col, vals]) =>
        vals.map(val => <span key={`${col}-${val}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", background: T.blueL, borderRadius: 20, fontSize: 11, fontWeight: 550, color: T.blue }}>
          {filterCols.find(c => c.key === col)?.label}: {val}
          <span onClick={() => toggleFilter(col, val)} style={{ cursor: "pointer", fontSize: 13, lineHeight: 1 }}>✕</span>
        </span>)
      )}
    </div>}

    {/* Tasks table */}
    <Card>
      <div onClick={() => setOpenFilter(null)}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>
            <TH w={60}>ID</TH>
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
                <TD mono s={{ fontSize: 11 }}>{t.request !== "—" ? t.request : <span style={{ color: T.g400 }}>—</span>}</TD>
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
   PERSONAL RECORD — Team Member view
   ═══════════════════════════════════════════════ */
function PersonalRecord({ tab, setTab, tabs }) {
  return <div style={{ padding: "24px 32px" }}>
    <div style={{ marginBottom: 4 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>My Record</h2>
      <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>Daniel Thornton · QLD QFES · Crew Leader</p>
    </div>
    <TabBar tabs={tabs} active={tab} onChange={setTab} />

    {tab === "My Profile" && <>
      <Card title="Personal Details">
        {[["Full Name", "Daniel Thornton"], ["Agency", "Queensland Fire & Emergency Services"], ["Jurisdiction", "QLD"], ["Primary Role", "Crew Leader"], ["System Access", "Team Member"], ["Deployment Appointment", "Crew Leader — Northern Rivers Flood Response"], ["Phone", "+61 4XX XXX XXX"], ["Email", "d.thornton@qfes.qld.gov.au"], ["Emergency Contact", "Jane Thornton (spouse)"]].map(([k, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13, borderBottom: `1px solid ${T.g50}` }}><span style={{ color: T.g500 }}>{k}</span><span style={{ fontWeight: 550 }}>{v}</span></div>)}
      </Card>
      <Card title="Key Contacts" style={{ marginTop: 16 }}>
        {[
          { initials: "RK", name: "Rachel Kimura", role: "Deployment Manager", color: T.blue },
          { initials: "MS", name: "Mark Sullivan", role: "AREP — Northern Rivers", color: T.teal },
          { initials: "SP", name: "Sarah Patel", role: "QLD QFES Coordinator", color: T.coral },
        ].map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${T.g100}` : "none" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: c.color,
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>{c.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 550 }}>{c.name}</div>
              <div style={{ fontSize: 11.5, color: T.g500 }}>{c.role}</div>
            </div>
          </div>
        ))}
      </Card>
    </>}

    {tab === "My EOIs" && <>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[{ l: "Active EOIs", v: 1, c: T.blue }, { l: "Approved", v: 1, c: T.green }, { l: "Pending", v: 0, c: T.orange }].map((s, i) => <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} /><span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span><span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span>
          </div>)}
        </div>
      </div>
      <Card title="My Expressions of Interest">
        {[
          { deployment: "Northern Rivers Flood Response", role: "Crew Leader", submitted: "15 Mar 2026", status: "Deployed", c: "green", step: "Mobilisation Ready" },
          { deployment: "Canada 2025 Wildfire Season", role: "Crew Member", submitted: "10 Feb 2026", status: "Not Selected", c: "gray", step: "Closed" },
        ].map((eoi, i) => (
          <div key={i} style={{ padding: "14px 0", borderBottom: i === 0 ? `1px solid ${T.g100}` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 650 }}>{eoi.deployment}</span>
              <Chip color={eoi.c}>{eoi.status}</Chip>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, fontSize: 12 }}>
              {[["Role Applied", eoi.role], ["Submitted", eoi.submitted], ["Current Step", eoi.step]].map(([k, v], ki) => (
                <div key={ki}><span style={{ color: T.g400, fontSize: 10.5 }}>{k}</span><div style={{ fontWeight: 550, marginTop: 2 }}>{v}</div></div>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </>}

    {tab === "My Tasks" && <TasksTab scope="personal" />}
  </div>;
}
