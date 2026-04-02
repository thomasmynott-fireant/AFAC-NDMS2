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
   PEOPLE WORKSPACE — tabbed module
   scope: "national" | "agency" | "personal"
   ═══════════════════════════════════════════════ */
export default function PeopleWorkspace({ scope = "national" }) {
  const personalTabs = ["My Profile", "Readiness", "Roles & Evidence", "Approvals History"];
  const orgTabs = ["Directory", "Readiness", "Roles & Evidence", "Exceptions"];
  const tabs = scope === "personal" ? personalTabs : orgTabs;
  const [tab, setTab] = useState(tabs[0]);
  const [search, setSearch] = useState("");

  const filtered = PEOPLE.filter(p => {
    if (scope === "agency") return p.agency === "QLD QFES";
    return true;
  }).filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.agency.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase()));

  if (scope === "personal") return <PersonalRecord tab={tab} setTab={setTab} tabs={tabs} />;

  return (
    <div style={{ padding: "24px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>People</h2>
          <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>
            {scope === "agency" ? "QLD QFES personnel — readiness, qualifications, and deployability" : "National personnel directory — all registered NDMS team members"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn v="secondary">Export</Btn>
          <Btn v="primary">+ Register Person</Btn>
        </div>
      </div>

      <TabBar tabs={tabs} active={tab} onChange={setTab} />

      {tab === "Directory" && <DirectoryTab people={filtered} search={search} setSearch={setSearch} scope={scope} />}
      {tab === "Readiness" && <ReadinessTab people={filtered} scope={scope} />}
      {tab === "Roles & Evidence" && <RolesEvidenceTab people={filtered} />}
      {tab === "Exceptions" && <ExceptionsTab people={filtered} />}
    </div>
  );
}

function DirectoryTab({ people, search, setSearch, scope }) {
  return <>
    {/* Search & filters */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: T.white, border: `1px solid ${T.g300}`, borderRadius: 6, fontSize: 13 }}>
        <span style={{ color: T.g400 }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, agency, role, jurisdiction…" style={{ border: "none", outline: "none", flex: 1, fontSize: 13, fontFamily: "inherit", background: "transparent" }} />
      </div>
      {["All", "Deployed", "Available", "Pending"].map(f => <span key={f} style={{ padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 550, border: `1px solid ${T.g300}`, background: f === "All" ? T.blue : T.white, color: f === "All" ? T.white : T.g600, cursor: "pointer" }}>{f}</span>)}
    </div>

    {/* Stats strip */}
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {[{ l: "Total", v: people.length, c: T.navy }, { l: "Deployed", v: people.filter(p => p.deployment !== "—").length, c: T.blue }, { l: "Available", v: people.filter(p => p.deployment === "—" && p.readiness >= 70).length, c: T.green }, { l: "Exceptions", v: people.filter(p => p.expiry).length, c: T.coral }].map((s, i) => <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} /><span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span><span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span>
      </div>)}
    </div>

    {/* Table */}
    <Card>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><TH w={200}>Name</TH><TH>Agency</TH><TH>Jurisdiction</TH><TH>Role</TH><TH>Deployability</TH><TH>Current Deployment</TH><TH>Readiness</TH><TH w={50}></TH></tr></thead>
        <tbody>
          {people.map((p, i) => <tr key={i} style={{ cursor: "pointer" }}>
            <TD fw={600}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar i={p.initials} c={p.color} s={26} />{p.name}</div></TD>
            <TD>{p.agency}</TD>
            <TD>{p.jurisdiction}</TD>
            <TD>{p.role}</TD>
            <TD><Chip color={p.deployability.includes("Ready") ? "green" : p.deployability.includes("Pending") ? "orange" : p.deployability === "On Hold" ? "coral" : "gray"}>{p.deployability}</Chip></TD>
            <TD s={{ color: p.deployment === "—" ? T.g400 : T.navy, fontWeight: p.deployment === "—" ? 400 : 550 }}>{p.deployment}</TD>
            <TD><div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 40, height: 6, background: T.g200, borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${p.readiness}%`, height: "100%", background: p.readiness >= 80 ? T.green : p.readiness >= 60 ? T.orange : T.coral, borderRadius: 3 }} /></div><span style={{ fontSize: 11, color: T.g500 }}>{p.readiness}%</span></div></TD>
            <TD><span style={{ color: T.g400 }}>›</span></TD>
          </tr>)}
        </tbody>
      </table>
    </Card>
  </>;
}

function ReadinessTab({ people, scope }) {
  const levels = [
    { label: "Interstate Ready", count: people.filter(p => p.deployability === "Interstate Ready").length, pct: 0, color: T.green },
    { label: "International Pending", count: people.filter(p => p.deployability === "International Pending").length, pct: 0, color: T.orange },
    { label: "Pending EOI", count: people.filter(p => p.deployability === "Pending EOI").length, pct: 0, color: T.blue },
    { label: "On Hold", count: people.filter(p => p.deployability === "On Hold").length, pct: 0, color: T.coral },
    { label: "Not Registered", count: people.filter(p => p.deployability === "Not Registered").length, pct: 0, color: T.g500 },
  ];
  levels.forEach(l => { l.pct = Math.round((l.count / people.length) * 100); });

  return <>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 20 }}>
      {levels.map((l, i) => <div key={i} style={{ background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, padding: "16px 18px", textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: l.color }}>{l.count}</div>
        <div style={{ fontSize: 12, color: T.g500, marginTop: 4 }}>{l.label}</div>
        <div style={{ fontSize: 11, color: T.g400, marginTop: 2 }}>{l.pct}%</div>
      </div>)}
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card title="Readiness by Agency">
        {[{ ag: "NSW RFS", total: 6, ready: 5 }, { ag: "CFA", total: 2, ready: 1 }, { ag: "QFES", total: 1, ready: 1 }, { ag: "TFS", total: 1, ready: 1 }, { ag: "CFS", total: 1, ready: 0 }].map((a, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 4 ? `1px solid ${T.g100}` : "none" }}>
          <span style={{ width: 80, fontSize: 13, fontWeight: 600 }}>{a.ag}</span>
          <div style={{ flex: 1, height: 8, background: T.g100, borderRadius: 4, overflow: "hidden" }}><div style={{ width: `${(a.ready / a.total) * 100}%`, height: "100%", background: T.green, borderRadius: 4 }} /></div>
          <span style={{ fontSize: 12, fontWeight: 550, width: 50, textAlign: "right" }}>{a.ready}/{a.total}</span>
        </div>)}
      </Card>
      <Card title="Readiness Tasks Pending">
        {[
          { task: "Complete EOI — Ben Harper", type: "EOI", urgency: "Medium" },
          { task: "Upload eTA — Alice Nguyễn", type: "International", urgency: "High" },
          { task: "Renew WWCC — Linda Brooks", type: "Credential", urgency: "Critical" },
          { task: "Medical fitness review — 4 personnel", type: "Credential", urgency: "Medium" },
        ].map((t, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? `1px solid ${T.g100}` : "none" }}>
          <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 550 }}>{t.task}</div><div style={{ fontSize: 11, color: T.g500 }}>{t.type}</div></div>
          <Chip color={t.urgency === "Critical" ? "coral" : t.urgency === "High" ? "orange" : "blue"}>{t.urgency}</Chip>
        </div>)}
      </Card>
    </div>
  </>;
}

function RolesEvidenceTab({ people }) {
  const roles = ["Crew Leader", "Crew Member", "Operations Officer", "Management Support", "Safety Officer", "Deployment Manager", "IC Support", "Heavy Plant Operator", "AREP", "IMT Support", "Coordinator", "Storm Damage Ops"];
  return <Card title="Qualification & Role Matrix">
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead><tr><TH>Name</TH><TH>Primary Role</TH><TH>Accreditation</TH><TH>WWCC</TH><TH>Medical</TH><TH>First Aid</TH><TH>Evidence</TH></tr></thead>
      <tbody>
        {people.map((p, i) => <tr key={i}>
          <TD fw={600}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar i={p.initials} c={p.color} s={24} />{p.name}</div></TD>
          <TD>{p.role}</TD>
          <TD><Chip color="green">Current</Chip></TD>
          <TD><Chip color={p.name === "Linda Brooks" ? "coral" : "green"}>{p.name === "Linda Brooks" ? "Expired" : "Valid"}</Chip></TD>
          <TD><Chip color="green">Valid</Chip></TD>
          <TD><Chip color="green">Valid</Chip></TD>
          <TD><span style={{ fontSize: 12, color: T.blue, cursor: "pointer" }}>View →</span></TD>
        </tr>)}
      </tbody>
    </table>
  </Card>;
}

function ExceptionsTab({ people }) {
  const exceptions = people.filter(p => p.expiry);
  return <>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {[{ l: "Total Exceptions", v: exceptions.length, c: T.coral }, { l: "Credential Expiries", v: 2, c: T.orange }, { l: "Active I/I/I", v: 1, c: T.coral }, { l: "Fatigue Alerts", v: 1, c: T.orange }].map((s, i) => <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} /><span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span><span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span>
      </div>)}
    </div>
    <Card title="Active Exceptions">
      {exceptions.map((p, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < exceptions.length - 1 ? `1px solid ${T.g100}` : "none" }}>
        <Avatar i={p.initials} c={p.color} s={32} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.name}</div>
          <div style={{ fontSize: 12, color: T.g500 }}>{p.agency} · {p.role}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Chip color={p.expiry.includes("expired") || p.expiry.includes("I/I/I") ? "coral" : "orange"}>{p.expiry}</Chip>
          <div style={{ fontSize: 11, color: T.g400, marginTop: 2 }}>{p.deployment !== "—" ? p.deployment : "Not deployed"}</div>
        </div>
        <Btn v="primary" s={{ padding: "5px 12px", fontSize: 11 }}>Action →</Btn>
      </div>)}
    </Card>
  </>;
}

function PersonalRecord({ tab, setTab, tabs }) {
  const personalTabs = ["My Profile", "Readiness", "Documents", "Roles & Evidence", "Approvals History"];
  return <div style={{ padding: "24px 32px" }}>
    <div style={{ marginBottom: 4 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>My Record</h2>
      <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>Daniel Thornton · QLD QFES · Crew Leader</p>
    </div>
    <TabBar tabs={personalTabs} active={tab} onChange={setTab} />
    {tab === "My Profile" && <Card title="Personal Details">
      {[["Full Name", "Daniel Thornton"], ["Agency", "Queensland Fire & Emergency Services"], ["Jurisdiction", "QLD"], ["Primary Role", "Crew Leader"], ["System Access", "Team Member"], ["Deployment Appointment", "Crew Leader — Northern Rivers Flood Response"], ["Phone", "+61 4XX XXX XXX"], ["Email", "d.thornton@qfes.qld.gov.au"], ["Emergency Contact", "Jane Thornton (spouse)"]].map(([k, v], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 13, borderBottom: `1px solid ${T.g50}` }}><span style={{ color: T.g500 }}>{k}</span><span style={{ fontWeight: 550 }}>{v}</span></div>)}
    </Card>}
    {tab === "Readiness" && <Card title="My Readiness — 85%">
      <div style={{ height: 10, background: T.g200, borderRadius: 5, overflow: "hidden", marginBottom: 16 }}><div style={{ width: "85%", height: "100%", background: T.green, borderRadius: 5 }} /></div>
      {[["Interstate Readiness", "Complete", "green"], ["International Readiness", "Pending eTA", "orange"], ["WWCC", "Valid — Exp 2027", "green"], ["Medical Fitness", "Valid — Exp Nov 2026", "green"], ["First Aid", "Valid — Exp Mar 2027", "green"], ["Accreditation", "Crew Leader — Current", "green"]].map(([k, v, c], i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.g100}` }}><span style={{ fontSize: 13 }}>{k}</span><Chip color={c}>{v}</Chip></div>)}
    </Card>}
    {tab === "Documents" && <DocumentsTab />}
    {tab === "Roles & Evidence" && <Card title="My Roles & Qualifications">
      {[["Primary Role", "Crew Leader", "Active"], ["Secondary Role", "Crew Member", "Active"], ["Qualification", "Swift Water Rescue", "Current"], ["Training", "Flood Operations Advanced", "Completed 2024"]].map(([type, name, status], i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${T.g100}` }}><div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{name}</div><div style={{ fontSize: 11, color: T.g500 }}>{type}</div></div><Chip color="green">{status}</Chip><span style={{ color: T.blue, fontSize: 12, cursor: "pointer" }}>View evidence →</span></div>)}
    </Card>}
    {tab === "Approvals History" && <Card title="My Approval History">
      {[
        { action: "EOI Approved — Interstate Flood", date: "15 Oct 2025", by: "S. Patel (QLD QFES)", status: "Approved", c: "green" },
        { action: "Deployment Confirmed — Northern Rivers Flood", date: "22 Mar 2026", by: "System", status: "Active", c: "blue" },
        { action: "Role Change — Crew Member → Crew Leader", date: "22 Mar 2026", by: "R. Kimura (DM)", status: "Approved", c: "green" },
      ].map((a, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: i < 2 ? `1px solid ${T.g100}` : "none" }}>
        <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{a.action}</div><div style={{ fontSize: 11, color: T.g500 }}>{a.date} · {a.by}</div></div>
        <Chip color={a.c}>{a.status}</Chip>
      </div>)}
    </Card>}
  </div>;
}

/* ─── Document Register Tab (NDMS-022) ─── */
function DocumentsTab() {
  const docs=[
    {name:"Working with Children Check (WWCC)",docId:"WWCC-QLD-2024-1847",status:"Valid",expiry:"15 Jun 2027",uploaded:"12 Jan 2025",c:"green"},
    {name:"Medical Fitness Certificate",docId:"MED-2024-3921",status:"Valid",expiry:"30 Nov 2026",uploaded:"18 Nov 2024",c:"green"},
    {name:"First Aid Certificate (HLTAID011)",docId:"FA-2024-7734",status:"Valid",expiry:"14 Mar 2027",uploaded:"14 Mar 2024",c:"green"},
    {name:"Passport (AU)",docId:"PA4281937",status:"Valid",expiry:"22 Sep 2032",uploaded:"5 Feb 2025",c:"green"},
    {name:"eTA (Canada)",docId:"—",status:"Pending",expiry:"—",uploaded:"—",c:"orange"},
    {name:"Driver's Licence (Class C)",docId:"QLD-DL-9827341",status:"Valid",expiry:"18 Aug 2026",uploaded:"20 Aug 2023",c:"green"},
    {name:"Swift Water Rescue Certificate",docId:"SWR-2024-0412",status:"Valid",expiry:"1 Oct 2026",uploaded:"1 Oct 2024",c:"green"},
    {name:"Code of Conduct Declaration",docId:"COC-2025-DT",status:"Signed",expiry:"Annual",uploaded:"15 Jan 2025",c:"green"},
  ];
  return <>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
      <div style={{display:"flex",gap:8}}>
        {["All","Valid","Expiring","Pending"].map(f=><span key={f} style={{padding:"4px 14px",borderRadius:20,fontSize:11.5,fontWeight:550,border:`1px solid ${f==="All"?T.blue:T.g300}`,background:f==="All"?T.blue:T.white,color:f==="All"?T.white:T.g600,cursor:"pointer"}}>{f}</span>)}
      </div>
      <Btn v="primary">+ Upload Document</Btn>
    </div>
    <Card>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Document</TH><TH>Document ID</TH><TH>Status</TH><TH>Expiry</TH><TH>Uploaded</TH><TH w={80}>Actions</TH></tr></thead>
        <tbody>{docs.map((d,i)=><tr key={i}>
          <TD fw={600}>{d.name}</TD>
          <TD mono>{d.docId}</TD>
          <TD><Chip color={d.c}>{d.status}</Chip></TD>
          <TD>{d.expiry}</TD>
          <TD s={{color:T.g500,fontSize:12}}>{d.uploaded}</TD>
          <TD><span style={{color:T.blue,fontSize:12,cursor:"pointer"}}>View</span></TD>
        </tr>)}</tbody>
      </table>
    </Card>
    <div style={{marginTop:14,padding:"10px 14px",background:T.blueL,borderRadius:6,fontSize:12,color:T.blue}}>
      <strong>Note:</strong> Documents are verified by your agency administrator. Expiring documents will trigger reminder notifications 30 days before expiry.
    </div>
  </>;
}
