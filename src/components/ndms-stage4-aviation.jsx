import { useState, useEffect } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",white:"#FFFFFF"};

const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600},navy:{bg:"#e8ecf0",fg:T.navy}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Av=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const Btn=({children,v="secondary",s,...p})=>{const vs={primary:{background:T.blue,color:"#fff",border:"none"},secondary:{background:"#fff",color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600,border:"none"}};return<button style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,cursor:"pointer",fontFamily:"inherit",...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s,note})=><div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",position:"relative",...s}}>{note&&<div style={{position:"absolute",top:-8,right:12,padding:"2px 10px",background:T.navy,color:"#fff",borderRadius:4,fontSize:9.5,fontWeight:600,letterSpacing:.3,zIndex:1}}>TENDER NOTE</div>}{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const TH=({children})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap"}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;
const Tabs=({tabs,active,onChange})=><div style={{display:"flex",borderBottom:`2px solid ${T.g200}`,marginBottom:20}}>{tabs.map(t=><div key={t.id} onClick={()=>onChange(t.id)} style={{padding:"8px 18px",fontSize:13,fontWeight:550,color:active===t.id?T.blue:T.g500,borderBottom:`2px solid ${active===t.id?T.blue:"transparent"}`,marginBottom:-2,cursor:"pointer"}}>{t.label}{t.count!=null&&<span style={{background:active===t.id?T.blueL:T.g100,fontSize:10,padding:"1px 6px",borderRadius:10,marginLeft:6}}>{t.count}</span>}</div>)}</div>;
const Badge=({label,color})=><span style={{padding:"3px 10px",borderRadius:4,fontSize:11,fontWeight:600,background:{green:T.greenL,blue:T.blueL,orange:T.orangeL,coral:T.coralL,teal:T.tealL,navy:"#e8ecf0"}[color]||T.g100,color:{green:"#5a8a1f",blue:T.blue,orange:"#c06e15",coral:T.coral,teal:"#148895",navy:T.navy}[color]||T.g600}}>{label}</span>;
const FilterChips=({items,active,onChange})=><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>{items.map(f=><span key={f} onClick={()=>onChange(f)} style={{padding:"4px 14px",borderRadius:20,fontSize:11.5,fontWeight:550,border:`1px solid ${active===f?T.blue:T.g300}`,background:active===f?T.blue:T.white,color:active===f?T.white:T.g600,cursor:"pointer"}}>{f}</span>)}</div>;

const ASSETS=[
  {callsign:"NLAT",make:"Lockheed C-130J Hercules",reg:"A97-449",base:"Richmond NSW",nob:"Richmond NSW",status:"Available",mission:"—",loc:"Richmond NSW",color:"green"},
  {callsign:"NLEAD",make:"King Air 350",reg:"VH-FIZ",base:"Bankstown NSW",nob:"Bankstown NSW",status:"Deployed",mission:"NT Cyclone — reconnaissance",loc:"Darwin NT",color:"blue"},
  {callsign:"NHAWK (SA)",make:"Sikorsky S-70A Black Hawk",reg:"VH-NHA",base:"Parafield SA",nob:"Parafield SA",status:"Deployed",mission:"NT Cyclone — aerial support",loc:"Darwin NT",color:"blue"},
  {callsign:"NHAWK (QLD)",make:"Sikorsky S-70A Black Hawk",reg:"VH-NHB",base:"Bundaberg QLD",nob:"Bundaberg QLD",status:"Moving",mission:"Repositioning to Bundaberg",loc:"In transit",color:"orange"},
  {callsign:"NS61N",make:"Sikorsky S-61N",reg:"VH-NSA",base:"Bankstown NSW",nob:"Bankstown NSW",status:"Unavailable",mission:"Scheduled maintenance",loc:"Bankstown NSW",color:"gray"},
];

const SCREENS=[
  {id:"form",label:"NAA Request Form",icon:"📝"},
  {id:"register",label:"NAA Request Register",icon:"📋"},
  {id:"board",label:"National Asset Board",icon:"✈"},
  {id:"approval",label:"Approval & Escalation",icon:"🔐"},
  {id:"performance",label:"Performance Reporting",icon:"📊"},
  {id:"demo",label:"End-to-End Demo Route",icon:"🎯"},
];

export default function Stage4(){
  const[screen,setScreen]=useState("form");
  const[m,setM]=useState(false);
  useEffect(()=>setM(true),[]);
  const R={"form":<NAAForm/>,"register":<NAARegister/>,"board":<AssetBoard/>,"approval":<ApprovalPanel/>,"performance":<Performance/>,"demo":<DemoRoute/>};
  const cur=SCREENS.find(s=>s.id===screen);
  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:T.navy,fontSize:14,lineHeight:1.5,WebkitFontSmoothing:"antialiased",opacity:m?1:0,transition:"opacity .3s"}}>
      <nav style={{width:256,background:T.navy,display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
        <div style={{padding:"18px 18px 14px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:36,height:36,background:T.blue,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:14}}>N</div>
          <div><div style={{color:"#fff",fontWeight:700,fontSize:15.5}}>NDMS</div><div style={{color:"rgba(255,255,255,.35)",fontSize:10}}>Stage 4 — C7 Aviation + Demo</div></div>
        </div>
        <div style={{flex:1,padding:"12px"}}>
          <div style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:1.2,padding:"0 10px 8px"}}>National Aviation Assets</div>
          {SCREENS.slice(0,5).map(item=>{const a=screen===item.id;return<div key={item.id} onClick={()=>setScreen(item.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 11px",borderRadius:6,cursor:"pointer",color:a?"#fff":"rgba(255,255,255,.55)",background:a?"rgba(14,120,201,.2)":"transparent",fontSize:12.5,fontWeight:a?600:450,position:"relative",marginBottom:2}}>
            {a&&<div style={{position:"absolute",left:-12,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:T.blue,borderRadius:"0 3px 3px 0"}}/>}
            <span style={{fontSize:14,width:20,textAlign:"center"}}>{item.icon}</span>{item.label}
          </div>})}
          <div style={{height:1,background:"rgba(255,255,255,.06)",margin:"12px 10px"}}/>
          <div style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:1.2,padding:"0 10px 8px"}}>Integrated Demo</div>
          {SCREENS.slice(5).map(item=>{const a=screen===item.id;return<div key={item.id} onClick={()=>setScreen(item.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 11px",borderRadius:6,cursor:"pointer",color:a?"#fff":"rgba(255,255,255,.55)",background:a?"rgba(14,120,201,.25)":"transparent",fontSize:12.5,fontWeight:a?600:450,position:"relative",marginBottom:2}}>
            {a&&<div style={{position:"absolute",left:-12,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:T.orange,borderRadius:"0 3px 3px 0"}}/>}
            <span style={{fontSize:14,width:20,textAlign:"center"}}>{item.icon}</span>{item.label}
          </div>})}
        </div>
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><Av i="AD" c={T.orange} s={32}/><div><div style={{color:"rgba(255,255,255,.85)",fontSize:12.5,fontWeight:550}}>Air Desk Operator</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>AFAC NRSC</div></div></div>
        </div>
      </nav>
      <main style={{flex:1,display:"flex",flexDirection:"column",background:T.g50}}>
        <div style={{height:52,background:"#fff",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",padding:"0 24px",gap:12,flexShrink:0}}>
          <span style={{fontSize:13.5,fontWeight:650}}>{cur?.label}</span><div style={{flex:1}}/><span style={{padding:"3px 10px",background:T.orangeL,color:T.orange,fontSize:10,fontWeight:650,borderRadius:4}}>PROTOTYPE</span>
        </div>
        <div style={{flex:1,overflowY:"auto"}} key={screen}>{R[screen]}</div>
      </main>
    </div>
  );
}

/* ── NAA Request Form ── */
function NAAForm(){
  const[urgency,setUrgency]=useState("urgent");
  return<div style={{padding:"24px 32px",maxWidth:920,margin:"0 auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>NAA Request Form</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Raise a request for a national aviation asset</p></div>
      <Btn v="primary">Submit Request</Btn>
    </div>

    {/* Urgency selector */}
    <Card title="1. Urgency & Request Type" note>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        <div onClick={()=>setUrgency("urgent")} style={{padding:18,border:`2px solid ${urgency==="urgent"?T.coral:T.g200}`,borderRadius:8,cursor:"pointer",background:urgency==="urgent"?T.coralL:"#fff"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>🔴</span><span style={{fontSize:15,fontWeight:700,color:T.coral}}>Urgent</span></div>
          <div style={{fontSize:12,color:T.g600}}>Immediate or same-day asset deployment required. Triggers priority approval pathway via Duty Manager.</div>
        </div>
        <div onClick={()=>setUrgency("non-urgent")} style={{padding:18,border:`2px solid ${urgency==="non-urgent"?T.blue:T.g200}`,borderRadius:8,cursor:"pointer",background:urgency==="non-urgent"?T.blueL:"#fff"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontSize:18}}>🔵</span><span style={{fontSize:15,fontWeight:700,color:T.blue}}>Non-Urgent</span></div>
          <div style={{fontSize:12,color:T.g600}}>Planned asset deployment. Standard approval pathway with Duty Manager review within 24 hours.</div>
        </div>
      </div>
      <div style={{padding:"10px 14px",background:urgency==="urgent"?T.coralL:T.blueL,borderRadius:6,fontSize:12,color:urgency==="urgent"?T.coral:T.blue}}>
        {urgency==="urgent"?"⚡ Urgent requests are routed directly to the Duty Manager for immediate approval. CCOSC ASC will be notified automatically.":"ℹ Non-urgent requests follow the standard review pathway with Duty Manager sign-off within 24 hours."}
      </div>
    </Card>

    {/* Asset selection */}
    <Card title="2. Asset Requested" s={{marginTop:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        {ASSETS.filter(a=>a.status==="Available"||a.status==="Deployed").map((a,i)=><div key={i} style={{padding:14,border:`2px solid ${i===0?T.blue:T.g200}`,borderRadius:8,cursor:"pointer",background:i===0?T.blueL:"#fff"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:15,fontWeight:700}}>{a.callsign}</span>
            <Chip color={a.color}>{a.status}</Chip>
          </div>
          <div style={{fontSize:12,color:T.g600}}>{a.make}</div>
          <div style={{fontSize:11.5,color:T.g500,marginTop:2}}>Reg: {a.reg} · NOB: {a.nob}</div>
        </div>)}
      </div>
    </Card>

    {/* Mission details */}
    <Card title="3. Mission Details" s={{marginTop:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[["Mission Type","Aerial reconnaissance and damage assessment"],["Operating Base","Darwin NT"],["Mission Duration","3 days (est. 30 Mar – 1 Apr 2026)"],["Jurisdiction","Northern Territory"],["Incident / Event","NT Cyclone Response 2026"],["Mission Description","Post-cyclone aerial reconnaissance of coastal communities north of Darwin. Damage assessment and supply route survey required."]].map(([l,v],i)=><div key={i} style={i===5?{gridColumn:"1/3"}:{}}>
          <label style={{fontSize:11.5,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>{l}</label>
          <div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>{v}</div>
        </div>)}
      </div>
    </Card>

    {/* Contact & Auth */}
    <Card title="4. Contact & Authorisation" s={{marginTop:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[["Requesting Officer","Air Desk — AFAC NRSC"],["Contact Phone","+61 2 xxxx xxxx"],["Authorising Officer","Jessica Walsh — NRSC Duty Officer"],["Authorisation Reference","AUTH-NAA-2025-0018"]].map(([l,v],i)=><div key={i}>
          <label style={{fontSize:11.5,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>{l}</label>
          <div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>{v}</div>
        </div>)}
      </div>
    </Card>
  </div>;
}

/* ── NAA Request Register ── */
function NAARegister(){
  const[tab,setTab]=useState("active");
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>NAA Request Register</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>National aviation asset requests — operational control view</p></div>
      <Btn v="primary">+ New NAA Request</Btn>
    </div>
    <Tabs tabs={[{id:"active",label:"Active",count:4},{id:"closed",label:"Closed",count:12}]} active={tab} onChange={setTab}/>

    <Card>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Request No.</TH><TH>Asset</TH><TH>Urgency</TH><TH>Type</TH><TH>Mission</TH><TH>Status</TH><TH>Requested</TH><TH>Sign-off</TH><TH>Notes</TH></tr></thead>
          <tbody>
            {[
              {no:"NAA-2025-0018",asset:"NLEAD",urg:"Urgent",type:"New",mission:"NT Cyclone recon",status:"Approved - DM",color:"green",req:"28 Mar 06:30",signoff:"28 Mar 07:15",notes:"Sign-off received"},
              {no:"NAA-2025-0017",asset:"NHAWK (SA)",urg:"Urgent",type:"New",mission:"NT Cyclone aerial",status:"Approved - DM",color:"green",req:"27 Mar 14:00",signoff:"27 Mar 14:45",notes:"Tracker updated"},
              {no:"NAA-2025-0019",asset:"NLAT",urg:"Non-Urgent",type:"New",mission:"QLD resupply",status:"Under Review",color:"teal",req:"30 Mar 09:00",signoff:"—",notes:"Awaiting DM"},
              {no:"NAA-2025-0017-E1",asset:"NHAWK (SA)",urg:"Non-Urgent",type:"Extension",mission:"NT Cyclone extended",status:"Extension Requested",color:"orange",req:"30 Mar 08:00",signoff:"—",notes:"3-day extension"},
            ].map((r,i)=><tr key={i} style={{cursor:"pointer"}}>
              <TD mono fw={600}>{r.no}</TD>
              <TD fw={600}>{r.asset}</TD>
              <TD><Chip color={r.urg==="Urgent"?"coral":"blue"}>{r.urg}</Chip></TD>
              <TD>{r.type==="Extension"?<Badge label="Extension" color="orange"/>:r.type}</TD>
              <TD>{r.mission}</TD>
              <TD><Chip color={r.color}>{r.status}</Chip></TD>
              <TD s={{fontSize:11.5,color:T.g500}}>{r.req}</TD>
              <TD s={{fontSize:11.5}}>{r.signoff}</TD>
              <TD s={{fontSize:12,color:T.g600}}>{r.notes}</TD>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>

    {/* Timestamp ladder for latest request */}
    <Card title="Request Timeline — NAA-2025-0018" s={{marginTop:20}}>
      {[
        {time:"28 Mar 06:30",event:"Request raised by Air Desk",detail:"Urgent — NLEAD requested for NT Cyclone reconnaissance",c:T.coral},
        {time:"28 Mar 06:32",event:"Auto-routed to Duty Manager",detail:"Urgent pathway activated",c:T.orange},
        {time:"28 Mar 06:45",event:"Duty Manager reviewing",detail:"J. Walsh (NRSC)",c:T.teal},
        {time:"28 Mar 07:15",event:"Approved by Duty Manager",detail:"Approved for 3-day deployment. Sign-off filed.",c:T.green},
        {time:"28 Mar 07:16",event:"CCOSC ASC notified",detail:"Automatic notification sent",c:T.navy},
        {time:"28 Mar 07:30",event:"Tracker updated",detail:"NLEAD status → Deployed. Mission: NT Cyclone recon",c:T.green},
        {time:"28 Mar 08:00",event:"Asset departed NOB",detail:"NLEAD departed Bankstown NSW for Darwin NT",c:T.blue},
      ].map((e,i)=><div key={i} style={{display:"flex",gap:12,padding:"8px 0",borderBottom:i<6?`1px solid ${T.g100}`:"none"}}>
        <div style={{width:3,borderRadius:2,background:e.c,flexShrink:0}}/>
        <div style={{width:110,fontSize:11,color:T.g500,flexShrink:0,paddingTop:1}}>{e.time}</div>
        <div><div style={{fontSize:12.5,fontWeight:600}}>{e.event}</div><div style={{fontSize:11.5,color:T.g500}}>{e.detail}</div></div>
      </div>)}
    </Card>
  </div>;
}

/* ── National Asset Board ── */
function AssetBoard(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>National Asset Board</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Live status of all AFAC national aviation assets</p></div>
      <Btn v="secondary">Export Status Report</Btn>
    </div>

    {/* Summary strip */}
    <div style={{display:"flex",gap:10,marginBottom:18}}>
      {[{l:"Available",v:1,c:T.green},{l:"Deployed",v:2,c:T.blue},{l:"Moving",v:1,c:T.orange},{l:"Unavailable",v:1,c:T.g500}].map((s,i)=><div key={i} style={{flex:1,background:"#fff",border:`1px solid ${T.g200}`,borderRadius:6,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:s.c}}/><span style={{fontSize:12.5,color:T.g600}}>{s.l}</span><span style={{marginLeft:"auto",fontWeight:700,fontSize:18}}>{s.v}</span>
      </div>)}
    </div>

    {/* Map */}
    <Card title="Asset Locations" s={{marginBottom:20}}>
      <div style={{height:220,background:`linear-gradient(170deg,${T.g100},#e0eef8 40%,#e8f0e4 70%,${T.g100})`,borderRadius:6,position:"relative"}}>
        <svg viewBox="0 0 500 220" style={{width:"100%",height:"100%",position:"absolute"}}>
          <path d="M180,50 Q200,32 230,44 Q260,27 290,40 L310,53 Q330,47 345,66 L350,92 Q360,110 350,132 L340,154 Q330,172 310,182 L290,185 Q270,195 250,189 L230,193 Q210,200 195,185 L180,168 Q165,150 170,132 L167,108 Q160,82 170,66 Z" fill="rgba(14,120,201,.04)" stroke="rgba(14,120,201,.1)" strokeWidth="1"/>
          {/* Assets */}
          <g><circle cx="260" cy="140" r="7" fill={T.green} stroke="#fff" strokeWidth="2"/><text x="272" y="138" fontSize="9" fill={T.navy} fontWeight="700">NLAT</text><text x="272" y="148" fontSize="8" fill={T.g500}>Richmond NSW</text></g>
          <g><circle cx="282" cy="55" r="7" fill={T.blue} stroke="#fff" strokeWidth="2"/><text x="294" y="53" fontSize="9" fill={T.blue} fontWeight="700">NLEAD</text><text x="294" y="63" fontSize="8" fill={T.g500}>Darwin NT</text></g>
          <g><circle cx="270" cy="60" r="6" fill={T.blue} stroke="#fff" strokeWidth="2"/><text x="230" y="58" fontSize="9" fill={T.blue} fontWeight="700">NHAWK(SA)</text></g>
          <g><circle cx="310" cy="95" r="6" fill={T.orange} stroke="#fff" strokeWidth="2"/><text x="320" y="93" fontSize="9" fill={T.orange} fontWeight="700">NHAWK(QLD)</text><text x="320" y="103" fontSize="8" fill={T.g500}>In transit</text></g>
          <g><circle cx="255" cy="145" r="5" fill={T.g400} stroke="#fff" strokeWidth="2"/><text x="220" y="158" fontSize="8" fill={T.g500}>NS61N (maint.)</text></g>
        </svg>
      </div>
    </Card>

    {/* Asset cards */}
    {ASSETS.map((a,i)=><Card key={i} title={<span style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:17,fontWeight:700}}>{a.callsign}</span><Chip color={a.color}>{a.status}</Chip></span>} right={<span style={{fontSize:12,color:T.g500}}>{a.reg}</span>} s={{marginBottom:12}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px 20px",fontSize:12.5}}>
        {[["Aircraft",a.make],["Registration",a.reg],["NOB / TOB",a.nob],["Current Location",a.loc],["Mission",a.mission],["Status",a.status]].map(([k,v],j)=><div key={j}><div style={{fontSize:10.5,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:550,marginTop:2}}>{v}</div></div>)}
      </div>
    </Card>)}
  </div>;
}

/* ── Approval & Escalation Panel ── */
function ApprovalPanel(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Approval & Escalation Panel</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>NAA-2025-0019 — NLAT request for QLD resupply (Non-Urgent)</p></div>

    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
      <div>
        <Card title="Request Summary">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 20px",fontSize:12.5}}>
            {[["Request","NAA-2025-0019"],["Asset","NLAT (C-130J Hercules)"],["Urgency","Non-Urgent"],["Mission","QLD resupply — cyclone relief"],["Operating Base","Bundaberg QLD"],["Duration","2 days (est.)"],["Requested by","Air Desk — AFAC NRSC"],["Requested","30 Mar 09:00"]].map(([k,v],i)=><div key={i}><div style={{fontSize:10.5,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:550,marginTop:2}}>{v}</div></div>)}
          </div>
        </Card>

        {/* Decision area */}
        <Card title="Duty Manager Decision" right={<Badge label="Awaiting Decision" color="orange"/>} s={{marginTop:16}}>
          <div style={{marginBottom:14}}>
            <label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>Decision Notes</label>
            <textarea style={{width:"100%",height:60,border:`1px solid ${T.g200}`,borderRadius:6,padding:10,fontSize:12.5,fontFamily:"inherit",resize:"vertical"}} placeholder="Enter decision rationale..."/>
          </div>
          <div style={{display:"flex",gap:8}}>
            <Btn v="primary" s={{flex:1,justifyContent:"center"}}>✓ Approve — DM Sign-off</Btn>
            <Btn v="secondary" s={{flex:1,justifyContent:"center",color:T.coral,borderColor:T.coral}}>✕ Decline</Btn>
          </div>
          <Btn v="ghost" s={{width:"100%",justifyContent:"center",marginTop:8,color:T.orange}}>⬆ Escalate to CCOSC ASC</Btn>
        </Card>

        {/* CCOSC notification state */}
        <Card title="CCOSC ASC Notification" s={{marginTop:16}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:10,height:10,borderRadius:"50%",background:T.g300}}/>
            <span style={{fontSize:12.5,color:T.g500}}>Not yet notified — will be notified upon DM decision</span>
          </div>
          <div style={{marginTop:10,fontSize:12,color:T.g500}}>For urgent requests, CCOSC ASC is notified automatically upon approval. For non-urgent requests, notification occurs after DM sign-off.</div>
        </Card>
      </div>

      <div>
        <Card title="Audit Trail">
          {[
            {time:"30 Mar 09:00",event:"Request raised",by:"Air Desk",c:T.blue},
            {time:"30 Mar 09:02",event:"Routed to Duty Manager",by:"System",c:T.teal},
            {time:"30 Mar 09:15",event:"DM notified via SMS/email",by:"System",c:T.teal},
          ].map((e,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
            <div style={{width:3,borderRadius:2,background:e.c,flexShrink:0}}/>
            <div><div style={{fontSize:12,fontWeight:550}}>{e.event}</div><div style={{fontSize:10.5,color:T.g500}}>{e.time} · {e.by}</div></div>
          </div>)}
        </Card>

        <Card title="Exception Log" s={{marginTop:16}}>
          <div style={{fontSize:12.5,color:T.g500,padding:10,textAlign:"center"}}>No exceptions recorded for this request</div>
        </Card>

        <Card title="Extension / Redeployment" s={{marginTop:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Btn v="secondary" s={{justifyContent:"center",fontSize:12}}>Request Extension</Btn>
            <Btn v="secondary" s={{justifyContent:"center",fontSize:12}}>Request Redeployment</Btn>
          </div>
        </Card>
      </div>
    </div>
  </div>;
}

/* ── Performance Reporting ── */
function Performance(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>NAA Performance Reporting</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Season 2025/26 — National aviation asset utilisation and response metrics</p></div>
      <div style={{display:"flex",gap:8}}><FilterChips items={["Season 2025/26","Last 30 days","Last 7 days"]} active="Season 2025/26" onChange={()=>{}}/></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
      {[{l:"Total Requests",v:"34",sub:"Season to date"},{l:"Avg Response Time",v:"42 min",sub:"Request → DM decision",c:T.green},{l:"Approval Rate",v:"91%",sub:"31 of 34 approved",c:T.green},{l:"Asset Utilisation",v:"68%",sub:"Days deployed / days available",c:T.blue}].map((m,i)=><div key={i} style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,padding:"16px 18px"}}><div style={{fontSize:11,color:T.g500}}>{m.l}</div><div style={{fontSize:24,fontWeight:700,color:m.c||T.navy,marginTop:4}}>{m.v}</div><div style={{fontSize:11,color:T.g500,marginTop:2}}>{m.sub}</div></div>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Card title="Request Volume by Month">
        <div style={{display:"flex",alignItems:"flex-end",gap:12,height:140,paddingTop:10}}>
          {[{m:"Oct",v:2},{m:"Nov",v:5},{m:"Dec",v:8},{m:"Jan",v:7},{m:"Feb",v:6},{m:"Mar",v:6}].map((d,i)=><div key={i} style={{flex:1,textAlign:"center"}}>
            <div style={{height:`${(d.v/8)*100}px`,background:T.blue,borderRadius:"4px 4px 0 0",transition:"height .5s",margin:"0 auto",width:32}}/>
            <div style={{fontSize:12,fontWeight:600,marginTop:4}}>{d.v}</div>
            <div style={{fontSize:10,color:T.g400}}>{d.m}</div>
          </div>)}
        </div>
      </Card>

      <Card title="Outcomes Breakdown">
        {[
          {label:"Approved (DM)",count:31,pct:91,c:T.green},
          {label:"Declined",count:2,pct:6,c:T.coral},
          {label:"Escalated to CCOSC",count:1,pct:3,c:T.orange},
        ].map((o,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
          <span style={{width:100,fontSize:12.5}}>{o.label}</span>
          <div style={{flex:1,height:18,background:T.g100,borderRadius:3,overflow:"hidden"}}><div style={{width:`${o.pct}%`,height:"100%",background:o.c,borderRadius:3}}/></div>
          <span style={{width:30,fontSize:12.5,fontWeight:650,textAlign:"right"}}>{o.count}</span>
        </div>)}
      </Card>

      <Card title="Asset Utilisation" s={{gridColumn:"1/3"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Asset</TH><TH>Days Available</TH><TH>Days Deployed</TH><TH>Utilisation</TH><TH>Missions</TH><TH>Current Status</TH></tr></thead>
          <tbody>
            {[
              {asset:"NLAT",avail:160,deployed:95,util:"59%",missions:12,status:"Available",c:"green"},
              {asset:"NLEAD",avail:165,deployed:120,util:"73%",missions:18,status:"Deployed",c:"blue"},
              {asset:"NHAWK (SA)",avail:155,deployed:110,util:"71%",missions:15,status:"Deployed",c:"blue"},
              {asset:"NHAWK (QLD)",avail:150,deployed:105,util:"70%",missions:14,status:"Moving",c:"orange"},
              {asset:"NS61N",avail:140,deployed:88,util:"63%",missions:10,status:"Maintenance",c:"gray"},
            ].map((a,i)=><tr key={i}>
              <TD fw={700}>{a.asset}</TD><TD>{a.avail}</TD><TD fw={600}>{a.deployed}</TD>
              <TD fw={600}>{a.util}</TD><TD>{a.missions}</TD>
              <TD><Chip color={a.c}>{a.status}</Chip></TD>
            </tr>)}
          </tbody>
        </table>
      </Card>
    </div>
  </div>;
}

/* ── End-to-End Demo Route ── */
function DemoRoute(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{background:`linear-gradient(135deg,${T.navy},#2c4a6a)`,borderRadius:10,padding:"24px 30px",color:"#fff",marginBottom:24}}>
      <h2 style={{color:"#fff",fontSize:22,fontWeight:700,margin:0}}>NDMS Prototype — Integrated Demo Route</h2>
      <p style={{color:"rgba(255,255,255,.6)",fontSize:13,margin:"8px 0 0"}}>This page provides the recommended walkthrough sequence for the AFAC tender presentation. Each step links to a delivered prototype screen with annotated handoff notes explaining what it proves.</p>
    </div>

    {/* Demo narrative */}
    {[
      {stage:"Stage 0",title:"Platform Foundation",screens:["Global shell with left navigation","Role-based homepages (NRSC, Team Member, Agency Staff)","Design system with AFAC brand tokens"],proves:"The platform feels like one coherent AFAC system — not seven separate products. Role switching shows audience-appropriate views from a single shell.",artifact:"ndms-prototype.jsx"},
      {stage:"Stage 1a",title:"C1 — Team Member Database",screens:["My Readiness Dashboard with deployability ring","Registration / EOI Wizard (6-step)","Roles & Evidence with governed approval","Agency Review Queue with drawer panel","National Readiness Exceptions with filters"],proves:"NDMS manages the full team member lifecycle from registration to deployability. Exception handling and traceability demonstrate governance maturity.",artifact:"ndms-stage1.jsx"},
      {stage:"Stage 1b",title:"C2 — Request Management",screens:["Request Register with AFAC request IDs","Order & Fulfilment Console with sub-orders","Contingent Builder (INLO1, IMT1, CREW1, CREW2)","International Manifest Builder (passports, eTA, baggage)","Travel & Logistics Planner (5-leg itinerary)","Movement-State Dashboard"],proves:"The mobilisation workflow is end-to-end: from request → order → contingent → manifest → travel → movement tracking. International and interstate flows are visibly related but distinct.",artifact:"ndms-stage1.jsx"},
      {stage:"Stage 2a",title:"C3 — Deployment Management",screens:["Live Deployment Board (map/list toggle)","Personnel Detail Panel with liaison chain","I/I/I Workflow (investigation status ladder)","Role-Change Approval with governance trail","Fatigue & Contact Logs with heatmap","Rotation & Replacement Dashboard"],proves:"Live operational supervision with duty-of-care workflows. The I/I/I flow and fatigue tracking demonstrate welfare governance without command-and-control.",artifact:"ndms-stage2.jsx"},
      {stage:"Stage 2b",title:"C4 — Situational Awareness",screens:["Agency Dashboard (NSW RFS)","NRSC National Dashboard","State / RMG Dashboard","Report Builder with column selection","SitRep Workspace with auto-populated sections"],proves:"Role-specific dashboards answer different questions for different audiences. SitRep workspace shows AFAC's core reporting artifact integrated with deployment data.",artifact:"ndms-stage2.jsx"},
      {stage:"Stage 3a",title:"C5 — Financial Reconciliation",screens:["My Claims with status timeline","Claim Submission (5-step wizard with receipt capture)","Agency Review Queue with bulk actions","NRSC Audit Queue with drawer","Reconciliation Workspace with jurisdiction totals"],proves:"Field-to-finance workflow is complete. Multi-currency handling (AUD/CAD), INLO endorsement, and the 70-day automation show process maturity.",artifact:"ndms-c5-finance.jsx"},
      {stage:"Stage 3b",title:"C6 — Mobile Companion",screens:["Mobile Home (phone frame, role-based)","Offline Queue with sync conflict","Field Actions Hub with camera capture","Mobile Dashboard (simplified cards)","Mobile Approvals with confirm step"],proves:"Not a shrunk desktop — recomposed for touch, connectivity, and field context. Offline-first with sync conflict resolution proves real field readiness.",artifact:"ndms-c6-mobile.jsx"},
      {stage:"Stage 4",title:"C7 — National Aviation Assets",screens:["NAA Request Form (urgent/non-urgent)","NAA Request Register with timestamps","National Asset Board (NLAT, NLEAD, NHAWK, NS61N)","Approval & Escalation Panel","Performance Reporting"],proves:"Aviation governance is distinct from general request management. Scarce asset tracking with DM/CCOSC approval chains and precise audit trails demonstrate executive-level credibility.",artifact:"This artifact"},
    ].map((s,i)=><Card key={i} s={{marginBottom:14}} note>
      <div style={{display:"flex",gap:16}}>
        <div style={{width:80,flexShrink:0}}>
          <Badge label={s.stage} color="blue"/>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontWeight:700,marginBottom:6}}>{s.title}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>
            {s.screens.map((sc,j)=><span key={j} style={{padding:"3px 10px",background:T.g100,borderRadius:4,fontSize:11,color:T.g600}}>{sc}</span>)}
          </div>
          <div style={{padding:"10px 14px",background:T.greenL,borderRadius:6,fontSize:12.5,color:"#4a7a12"}}>
            <strong>What this proves:</strong> {s.proves}
          </div>
          <div style={{fontSize:11,color:T.g500,marginTop:6}}>Artifact: <span style={{fontFamily:"'DM Mono',monospace"}}>{s.artifact}</span></div>
        </div>
      </div>
    </Card>)}

    {/* Summary stats */}
    <Card title="Prototype Coverage Summary" s={{marginTop:10}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
        {[{l:"Total Screens",v:"36+",sub:"Across 7 capabilities"},{l:"Role Views",v:"7",sub:"NRSC, Team, Agency, DMT, AREP, Air Desk, RMG"},{l:"Seeded Scenarios",v:"3",sub:"NT Interstate, Canada Int'l, NAA"},{l:"Interactive Flows",v:"12",sub:"Wizards, approvals, drawers, toggles"}].map((m,i)=><div key={i} style={{textAlign:"center"}}>
          <div style={{fontSize:24,fontWeight:700,color:T.blue}}>{m.v}</div>
          <div style={{fontSize:12.5,fontWeight:600,marginTop:2}}>{m.l}</div>
          <div style={{fontSize:11,color:T.g500,marginTop:1}}>{m.sub}</div>
        </div>)}
      </div>
    </Card>
  </div>;
}
