import { useState } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const TH=({children,w})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap",width:w}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;
const TabBar=({tabs,active,onChange})=><div style={{display:"flex",gap:0,borderBottom:`2px solid ${T.g200}`,marginBottom:20}}>{tabs.map(t=><button key={t} onClick={()=>onChange(t)} style={{padding:"10px 20px",fontSize:13,fontWeight:active===t?650:500,color:active===t?T.blue:T.g500,borderBottom:active===t?`2px solid ${T.blue}`:"2px solid transparent",marginBottom:-2,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>{t}</button>)}</div>;
const Field=({label,children,span})=><div style={{gridColumn:span?`span ${span}`:undefined}}><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>{label}</label>{children}</div>;
const Input=({placeholder,type="text",...p})=><input type={type} placeholder={placeholder} style={{width:"100%",padding:"8px 12px",border:`1px solid ${T.g300}`,borderRadius:6,fontSize:13,fontFamily:"inherit",background:T.white,boxSizing:"border-box"}} {...p}/>;
const Select=({children,...p})=><select style={{width:"100%",padding:"8px 12px",border:`1px solid ${T.g300}`,borderRadius:6,fontSize:13,fontFamily:"inherit",background:T.white,boxSizing:"border-box"}} {...p}>{children}</select>;

const REQUESTS = [
  {id:"2025_26_007NSW_QLD001",type:"Interstate",from:"NSW",to:"QLD,VIC,SA,TAS",incident:"Northern Rivers Flood Response",status:"Deployed",roles:22,filled:22,date:"14 Mar 2026",urgency:"Urgent",c:"green"},
  {id:"2025_26_INT_CAN_001",type:"International",from:"Canada",to:"Multi",incident:"Canada 2025 Wildfire Season",status:"Deployed",roles:33,filled:33,date:"1 Feb 2026",urgency:"Planned",c:"green"},
  {id:"2025_26_008NSW_VIC001",type:"Interstate",from:"NSW",to:"VIC",incident:"Northern Rivers Flood Response",status:"Pending Nomination",roles:12,filled:0,date:"28 Mar 2026",urgency:"Urgent",c:"orange"},
  {id:"2025_26_009NSW_SA001",type:"Interstate",from:"NSW",to:"SA",incident:"Northern Rivers Flood Response",status:"Draft",roles:6,filled:0,date:"30 Mar 2026",urgency:"Non-Urgent",c:"blue"},
  {id:"2025_26_010NSW_WA001",type:"Interstate",from:"NSW",to:"WA",incident:"Northern Rivers Flood Response",status:"Cancelled",roles:8,filled:0,date:"10 Jan 2026",urgency:"Urgent",c:"gray"},
];

/* ═══════════════════════════════════════════════
   REQUESTS WORKSPACE — tabbed module
   ═══════════════════════════════════════════════ */
export default function RequestsWorkspace({ onOpenWizard }) {
  const tabs = ["Overview", "Orders", "Teams & Contingents", "Manifest", "Travel & Logistics", "Movement"];
  const [tab, setTab] = useState("Overview");

  return <div style={{ padding: "24px 32px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Requests</h2>
        <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>Request lifecycle — from demand through to mobilisation and movement</p>
      </div>
      <Btn v="primary" onClick={onOpenWizard}>+ New Request</Btn>
    </div>
    <TabBar tabs={tabs} active={tab} onChange={setTab} />
    {tab === "Overview" && <OverviewTab onOpenWizard={onOpenWizard} />}
    {tab === "Orders" && <OrdersTab />}
    {tab === "Teams & Contingents" && <ContingentsTab />}
    {tab === "Manifest" && <ManifestTab />}
    {tab === "Travel & Logistics" && <TravelTab />}
    {tab === "Movement" && <MovementTab />}
  </div>;
}

function OverviewTab({ onOpenWizard }) {
  return <>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {[{ l: "Active", v: 2, c: T.green }, { l: "Pending", v: 1, c: T.orange }, { l: "Draft", v: 1, c: T.blue }, { l: "Season Total", v: 5, c: T.navy }].map((s, i) => <div key={i} style={{ flex: 1, background: T.white, border: `1px solid ${T.g200}`, borderRadius: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: s.c }} /><span style={{ fontSize: 12, color: T.g600 }}>{s.l}</span><span style={{ marginLeft: "auto", fontWeight: 700, fontSize: 16 }}>{s.v}</span></div>)}
    </div>
    <Card>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><TH>Request ID</TH><TH>Type</TH><TH>Incident</TH><TH>Route</TH><TH>Roles</TH><TH>Status</TH><TH>Urgency</TH><TH>Created</TH><TH w={50}></TH></tr></thead>
        <tbody>{REQUESTS.map((r, i) => <tr key={i} style={{ cursor: "pointer" }}>
          <TD mono fw={600}>{r.id}</TD>
          <TD><Chip color={r.type === "International" ? "teal" : "blue"}>{r.type}</Chip></TD>
          <TD fw={550}>{r.incident}</TD>
          <TD>{r.from} → {r.to}</TD>
          <TD fw={600}>{r.filled}/{r.roles}</TD>
          <TD><Chip color={r.c}>{r.status}</Chip></TD>
          <TD><Chip color={r.urgency === "Urgent" ? "orange" : r.urgency === "Planned" ? "blue" : "gray"}>{r.urgency}</Chip></TD>
          <TD>{r.date}</TD>
          <TD><span style={{ color: T.g400 }}>›</span></TD>
        </tr>)}</tbody>
      </table>
    </Card>
  </>;
}

/* ─── Approval Chain Tab (NDMS-006) ─── */
function ApprovalChainTab() {
  const steps=[
    {label:"Request Created",actor:"NSW SES State Ops",timestamp:"14 Mar 09:15",done:true,notes:"Flooding reported across Northern Rivers region. Interstate resources requested."},
    {label:"NRSC Validated",actor:"J. Walsh (NRSC)",timestamp:"14 Mar 11:00",done:true,notes:"Meets threshold for interstate deployment under AFAC protocols."},
    {label:"RMG Endorsed",actor:"NSW Resource Management Group",timestamp:"15 Mar 08:30",done:true},
    {label:"Agencies Canvassed",actor:"NRSC Operations",timestamp:"15 Mar 10:00",done:true,notes:"Canvass sent to QLD QFES, VIC CFA, SA CFS, TAS TFS, WA DFES."},
    {label:"Nominations Received",actor:"QLD QFES, VIC CFA, SA CFS, TAS TFS",timestamp:"16 Mar 14:00",done:true,notes:"22 of 22 roles filled. WA DFES declined — local season commitments."},
    {label:"Deployment Approved",actor:"J. Walsh (NRSC)",timestamp:"18 Mar 09:00",done:true},
    {label:"Orders Generated",actor:"System",timestamp:"18 Mar 09:15",done:true},
    {label:"Contingent Mobilised",actor:"System",timestamp:"22 Mar 06:00",done:true},
    {label:"In Field — Active",actor:"—",timestamp:"22 Mar 14:00",active:true,nextAction:"Rotation 1 commencing 31 Mar"},
  ];
  return <>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
      <div><strong style={{fontSize:14}}>2025_26_007NSW_QLD001</strong><span style={{color:T.g500,fontSize:12.5,marginLeft:10}}>Northern Rivers Flood Response · Interstate</span></div>
      <Chip color="green">Deployed</Chip>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
      <Card title="Approval Timeline">
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {steps.map((st,i)=><div key={i} style={{display:"flex",gap:12,position:"relative"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:28,flexShrink:0}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:st.done?T.green:st.active?T.blue:T.g200,color:st.done||st.active?T.white:T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,zIndex:1}}>{st.done?"✓":i+1}</div>
              {i<steps.length-1&&<div style={{width:2,flex:1,background:st.done?T.green:T.g200,minHeight:24}}/>}
            </div>
            <div style={{flex:1,paddingBottom:i<steps.length-1?14:0}}>
              <div style={{fontSize:13,fontWeight:600,color:st.done?T.navy:st.active?T.blue:T.g500}}>{st.label}</div>
              {st.actor&&<div style={{fontSize:11.5,color:T.g500,marginTop:1}}>{st.actor}</div>}
              {st.timestamp&&<div style={{fontSize:11,color:T.g400,marginTop:1}}>{st.timestamp}</div>}
              {st.notes&&<div style={{fontSize:11.5,color:T.g600,fontStyle:"italic",marginTop:3,padding:"4px 8px",background:T.g50,borderRadius:4}}>"{st.notes}"</div>}
              {st.nextAction&&<div style={{fontSize:11,color:T.orange,fontWeight:600,marginTop:3}}>Next: {st.nextAction}</div>}
            </div>
          </div>)}
        </div>
      </Card>
      <div>
        <Card title="Request Summary">
          {[["Request ID","2025_26_007NSW_QLD001"],["Type","Interstate"],["Requesting","NSW"],["Supplying","QLD, VIC, SA, TAS"],["Incident","Northern Rivers Flood"],["Roles Requested","22"],["Roles Filled","22 (100%)"],["Created","14 Mar 2026"],["Mobilised","22 Mar 2026"],["Est. Demob","5 Apr 2026"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12.5,borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550,fontFamily:k.includes("ID")?"'DM Mono',monospace":"inherit"}}>{v}</span></div>)}
        </Card>
        <Card title="Governance" s={{marginTop:16}}>
          {[["Cost Recovery","Standard AFAC Cost-Sharing"],["Requestor","NSW SES State Ops"],["Authoriser","J. Walsh (NRSC)"],["RMG endorsement","Endorsed 15 Mar"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12.5,borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550}}>{v}</span></div>)}
        </Card>
      </div>
    </div>
  </>;
}

/* ─── Agency Response / Nomination Tab (NDMS-007) ─── */
function AgencyResponseTab() {
  const nominations=[
    {agency:"QLD QFES",requested:8,confirmed:8,status:"Filled",c:"green",contact:"Sarah Patel",responded:"16 Mar 10:00",personnel:["D. Thornton (Crew Leader)","T. Briggs (Flood Ops)","K. Wong (Flood Ops)","J. Lee (Flood Ops)","M. Harper (Flood Ops)","S. Rogers (Flood Ops)","L. Chen (Crew Member)","A. Ford (Crew Member)"]},
    {agency:"VIC CFA",requested:6,confirmed:6,status:"Filled",c:"green",contact:"Michael Chen",responded:"16 Mar 12:00",personnel:["R. Kimura (DM)","B. Taylor (Flood Ops)","J. Novak (Crew Member)","P. Singh (Crew Member)","K. Ellis (Crew Member)","R. Torres (Admin)"]},
    {agency:"SA CFS",requested:4,confirmed:4,status:"Filled",c:"green",contact:"James Morton",responded:"16 Mar 14:00",personnel:["Safety Officer","IC Support","Crew Member ×2"]},
    {agency:"TAS TFS",requested:2,confirmed:2,status:"Filled",c:"green",contact:"Kira Thornton",responded:"16 Mar 11:30",personnel:["P. O'Brien (Safety)","M. James (Admin)"]},
    {agency:"WA DFES",requested:2,confirmed:0,status:"Declined",c:"coral",contact:"Peter Walsh",responded:"16 Mar 09:00",reason:"No available personnel due to local season commitments",personnel:[]},
  ];
  const totalReq=nominations.reduce((s,n)=>s+n.requested,0);
  const totalConf=nominations.reduce((s,n)=>s+n.confirmed,0);

  return <>
    <div style={{display:"flex",gap:10,marginBottom:16}}>
      {[{l:"Total Requested",v:totalReq,c:T.navy},{l:"Confirmed",v:totalConf,c:T.green},{l:"Declined",v:totalReq-totalConf,c:T.coral},{l:"Fill Rate",v:`${Math.round(totalConf/totalReq*100)}%`,c:T.blue}].map((s,i)=><div key={i} style={{flex:1,background:T.white,border:`1px solid ${T.g200}`,borderRadius:6,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}><div style={{width:8,height:8,borderRadius:"50%",background:s.c}}/><span style={{fontSize:12,color:T.g600}}>{s.l}</span><span style={{marginLeft:"auto",fontWeight:700,fontSize:16}}>{s.v}</span></div>)}
    </div>

    {nominations.map((n,i)=><Card key={i} title={<span>{n.agency} <Chip color={n.c}>{n.status}</Chip></span>} right={<span style={{fontSize:12,color:T.g500}}>{n.confirmed}/{n.requested} roles</span>} s={{marginBottom:14}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 20px",fontSize:12.5,marginBottom:12}}>
        {[["Contact",n.contact],["Responded",n.responded],["Requested",`${n.requested} personnel`],["Confirmed",`${n.confirmed} personnel`]].map(([k,v],ki)=><div key={ki}><span style={{color:T.g400,fontSize:10.5}}>{k}</span><div style={{fontWeight:550}}>{v}</div></div>)}
      </div>
      {n.reason&&<div style={{padding:"8px 12px",background:T.coralL,borderRadius:6,fontSize:12,color:T.coral,marginBottom:10}}><strong>Reason:</strong> {n.reason}</div>}
      {n.personnel.length>0&&<div>
        <div style={{fontSize:10.5,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Nominated Personnel</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {n.personnel.map((p,pi)=><span key={pi} style={{padding:"3px 10px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:4,fontSize:11.5,fontWeight:500}}>{p}</span>)}
        </div>
      </div>}
      {/* Fill progress bar */}
      <div style={{marginTop:10,height:6,background:T.g200,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${(n.confirmed/n.requested)*100}%`,background:n.status==="Declined"?T.coral:T.green,borderRadius:3,transition:"width .5s"}}/></div>
    </Card>)}
  </>;
}

function OrdersTab() {
  return <Card title="Orders & Fulfilment" right={<Chip color="green">3 active orders</Chip>}>
    {[
      { id: "ORD-2025-0047", request: "2025_26_007NSW_QLD001", subOrders: 4, filled: "22/22", status: "Complete", c: "green" },
      { id: "ORD-2025-0031", request: "2025_26_INT_CAN_001", subOrders: 6, filled: "33/33", status: "Complete", c: "green" },
      { id: "ORD-2025-0052", request: "2025_26_008NSW_VIC001", subOrders: 2, filled: "0/12", status: "Awaiting Nomination", c: "orange" },
    ].map((o, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < 2 ? `1px solid ${T.g100}` : "none" }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600 }}>{o.id}</span><span style={{ color: T.g400, fontSize: 12 }}>← {o.request}</span></div>
        <div style={{ fontSize: 12.5, color: T.g500 }}>{o.subOrders} sub-orders · Filled {o.filled}</div>
      </div>
      <Chip color={o.c}>{o.status}</Chip>
      <Btn v="secondary" s={{ padding: "5px 12px", fontSize: 11 }}>View →</Btn>
    </div>)}
  </Card>;
}

function ContingentsTab() {
  return <>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {[
        { group: "IMT1", type: "IMT & Overhead", request: "Northern Rivers", count: 3, status: "Active", day: "12–14", c: "green" },
        { group: "CREW1", type: "Flood Ops", request: "Northern Rivers", count: 6, status: "Active", day: "8", c: "green" },
        { group: "CREW2", type: "Flood Ops", request: "Northern Rivers", count: 6, status: "Active", day: "8", c: "green" },
        { group: "Overhead", type: "Safety, Admin, DM", request: "Northern Rivers", count: 4, status: "Active", day: "8–12", c: "green" },
      ].map((g, i) => <Card key={i} title={g.group} right={<Chip color={g.c}>{g.status}</Chip>}>
        <div style={{ fontSize: 13, marginBottom: 8 }}>{g.type} · {g.request}</div>
        {[["Personnel", `${g.count}`], ["Day", g.day], ["Request", "2025_26_007NSW_QLD001"]].map(([k, v], j) => <div key={j} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "4px 0", borderBottom: `1px solid ${T.g50}` }}><span style={{ color: T.g500 }}>{k}</span><span style={{ fontWeight: 550 }}>{v}</span></div>)}
      </Card>)}
    </div>
  </>;
}

function ManifestTab() {
  return <Card title="Active Manifests" right={<Chip color="blue">4 manifests</Chip>}>
    {[
      { id: "MAN-0047-C1", route: "BNE → LIS", flight: "REX1712", date: "22 Mar", pax: 6, status: "Arrived", c: "green" },
      { id: "MAN-0047-C2", route: "MEL → LIS", flight: "REX1804", date: "22 Mar", pax: 6, status: "Arrived", c: "green" },
      { id: "MAN-0047-R1", route: "LIS → BNE", flight: "REX1713", date: "1 Apr", pax: 8, status: "Booked", c: "blue" },
      { id: "MAN-0047-R2", route: "LIS → MEL", flight: "QF2164", date: "1 Apr", pax: 6, status: "Pending", c: "orange" },
    ].map((m, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < 3 ? `1px solid ${T.g100}` : "none" }}>
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11.5, fontWeight: 600, width: 100 }}>{m.id}</span>
      <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{m.route} · {m.flight}</div><div style={{ fontSize: 11.5, color: T.g500 }}>{m.date} · {m.pax} passengers</div></div>
      <Chip color={m.c}>{m.status}</Chip>
    </div>)}
  </Card>;
}

function TravelTab() {
  return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    <Card title="Accommodation">
      {[["Northern Rivers — Lismore", "Lismore Gateway Motel · 68 rooms · Active"], ["Canada 2025", "Camp Chilcotin · 33 beds · Active"], ["VIC Support (pending)", "TBA — awaiting mobilisation"]].map(([k, v], i) => <div key={i} style={{ padding: "8px 0", borderBottom: i < 2 ? `1px solid ${T.g100}` : "none" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{k}</div><div style={{ fontSize: 12, color: T.g500 }}>{v}</div></div>)}
    </Card>
    <Card title="Ground Transport">
      {[["Northern Rivers", "3 buses, 4 utes — Lismore depot"], ["Canada 2025", "2 SUVs — supplied by host agency"]].map(([k, v], i) => <div key={i} style={{ padding: "8px 0", borderBottom: i < 1 ? `1px solid ${T.g100}` : "none" }}><div style={{ fontSize: 13, fontWeight: 600 }}>{k}</div><div style={{ fontSize: 12, color: T.g500 }}>{v}</div></div>)}
    </Card>
  </div>;
}

function MovementTab() {
  return <Card title="Movement Board — Next 72h" right={<div style={{ display: "flex", gap: 6 }}><Chip color="blue">Inbound 8</Chip><Chip color="orange">Outbound 14</Chip></div>}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr><TH>Name</TH><TH>Direction</TH><TH>Route</TH><TH>Date</TH><TH>Status</TH></tr></thead>
      <tbody>{[
        { name: "Sam O'Connor", dir: "Inbound", route: "HBA → LIS", date: "31 Mar", status: "Confirmed", c: "green" },
        { name: "Peter O'Brien", dir: "Outbound", route: "LIS → SYD", date: "31 Mar", status: "Booked", c: "blue" },
        { name: "Jake Williams", dir: "Inbound", route: "MEL → LIS", date: "2 Apr", status: "Pending", c: "orange" },
        { name: "Rachel Kimura", dir: "Outbound", route: "LIS → MEL", date: "1 Apr", status: "Gap — no replacement", c: "coral" },
        { name: "Karen Wong", dir: "Outbound", route: "LIS → BNE", date: "1 Apr", status: "Booked", c: "blue" },
      ].map((r, i) => <tr key={i}><TD fw={600}>{r.name}</TD><TD><Chip color={r.dir === "Inbound" ? "green" : "orange"}>{r.dir}</Chip></TD><TD>{r.route}</TD><TD fw={600}>{r.date}</TD><TD><Chip color={r.c}>{r.status}</Chip></TD></tr>)}</tbody>
    </table>
  </Card>;
}

/* ═══════════════════════════════════════════════
   REQUEST WIZARD — 7-step branching flow
   One canonical flow for all "New Request" actions
   ═══════════════════════════════════════════════ */
export function RequestWizard({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ type: "", jurisdiction: "", receiving: "", incident: "", urgency: "", justification: "", roles: [{ role: "", qty: 1 }] });
  const totalSteps = 7;
  const stepLabels = ["Request Type", "Incident Context", "Resource Need", "Governance", "Teaming", "Mobilisation", "Review & Create"];

  return <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(35,52,74,.45)", backdropFilter: "blur(4px)" }}>
    <div style={{ width: 720, maxHeight: "90vh", background: T.white, borderRadius: 12, boxShadow: "0 20px 60px rgba(0,0,0,.2)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "20px 28px", borderBottom: `1px solid ${T.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div><h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>New Request</h3><p style={{ margin: "2px 0 0", fontSize: 12.5, color: T.g500 }}>Step {step} of {totalSteps} — {stepLabels[step - 1]}</p></div>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, color: T.g400, cursor: "pointer", padding: 4 }}>✕</button>
      </div>

      {/* Progress */}
      <div style={{ padding: "0 28px", paddingTop: 16 }}>
        <div style={{ display: "flex", gap: 4 }}>{Array.from({ length: totalSteps }, (_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? T.blue : T.g200, transition: "background .2s" }} />)}</div>
      </div>

      {/* Body */}
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
          <Field label="Incident / Deployment Name" span={2}><Input placeholder="e.g. NT Cyclone Response" value={form.incident} onChange={e => setForm({ ...form, incident: e.target.value })} /></Field>
          <Field label="Start Date"><Input type="date" /></Field>
          <Field label="End Date (estimated)"><Input type="date" /></Field>
          <Field label="Urgency"><Select value={form.urgency} onChange={e => setForm({ ...form, urgency: e.target.value })}><option value="">Select…</option><option>Immediate</option><option>Urgent</option><option>Planned</option><option>Non-Urgent</option></Select></Field>
          <Field label="Priority"><Select><option value="">Select…</option><option>P1 — Life Safety</option><option>P2 — Property Protection</option><option>P3 — Environmental</option><option>P4 — Planned Support</option></Select></Field>
          <Field label="Justification" span={2}><textarea placeholder="Describe why this request is needed…" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.g300}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", minHeight: 80, resize: "vertical", boxSizing: "border-box" }} /></Field>
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
          <Field label="Key Contact — Operations" span={1}><Input placeholder="Name and phone" /></Field>
          <Field label="Key Contact — Logistics" span={1}><Input placeholder="Name and phone" /></Field>
          <Field label="Reimbursement Notes" span={2}><textarea placeholder="Optional notes on cost recovery arrangements…" style={{ width: "100%", padding: "8px 12px", border: `1px solid ${T.g300}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", minHeight: 60, resize: "vertical", boxSizing: "border-box" }} /></Field>
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
          <Field label="Accommodation"><Input placeholder="e.g. Hilton Darwin" /></Field>
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
          <div style={{ marginTop: 16, padding: "12px 16px", background: T.orangeL, borderRadius: 6, fontSize: 12.5, color: "#c06e15", borderLeft: `3px solid ${T.orange}` }}>
            <strong>⚠ Warnings:</strong> No personnel shortlisted yet. Manifest details incomplete. These can be completed after request creation.
          </div>
        </div>}
      </div>

      {/* Footer */}
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
