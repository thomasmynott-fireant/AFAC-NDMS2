import { useState, useEffect } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",blueH:"#0B6AB5",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",navyL:"#3A5068",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};

const Chip=({color,children,dot=true})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600},navy:{bg:"#e8ecf0",fg:T.navy}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,whiteSpace:"nowrap",background:c.bg,color:c.fg}}>{dot&&<span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>}{children}</span>};
const Avatar=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all .12s"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600},sm:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`,padding:"4px 12px",fontSize:12}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const Tabs=({tabs,active,onChange})=><div style={{display:"flex",borderBottom:`2px solid ${T.g200}`,gap:0,marginBottom:20}}>{tabs.map(t=><div key={t.id} onClick={()=>onChange(t.id)} style={{padding:"8px 18px",fontSize:13,fontWeight:550,color:active===t.id?T.blue:T.g500,borderBottom:`2px solid ${active===t.id?T.blue:"transparent"}`,marginBottom:-2,cursor:"pointer",whiteSpace:"nowrap"}}>{t.label}{t.count!=null&&<span style={{background:active===t.id?T.blueL:T.g100,color:active===t.id?T.blue:T.g600,fontSize:10,padding:"1px 6px",borderRadius:10,marginLeft:6}}>{t.count}</span>}</div>)}</div>;
const TH=({children,w})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap",background:T.white,width:w}}>{children}</th>;
const TD=({children,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontSize:mono?11.5:13,...s}}>{children}</td>;
const Badge=({label,color})=><span style={{padding:"3px 10px",borderRadius:4,fontSize:11,fontWeight:600,background:{green:T.greenL,blue:T.blueL,orange:T.orangeL,coral:T.coralL,teal:T.tealL,gray:T.g100,navy:"#e8ecf0"}[color]||T.g100,color:{green:"#5a8a1f",blue:T.blue,orange:"#c06e15",coral:T.coral,teal:"#148895",gray:T.g600,navy:T.navy}[color]||T.g600}}>{label}</span>;
const Progress=({pct,color=T.blue})=><div style={{height:6,background:T.g200,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:3,transition:"width .5s"}}/></div>;
const FilterChips=({items,active,onChange})=><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>{items.map(f=><span key={f} onClick={()=>onChange(f)} style={{padding:"4px 14px",borderRadius:20,fontSize:11.5,fontWeight:550,border:`1px solid ${active===f?T.blue:T.g300}`,background:active===f?T.blue:T.white,color:active===f?T.white:T.g600,cursor:"pointer",transition:"all .1s"}}>{f}</span>)}</div>;
const Spark=({data,color=T.blue,w=80,h=24})=>{const max=Math.max(...data);const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v/max)*h)}`).join(" ");return<svg width={w} height={h} style={{display:"block"}}><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/></svg>};
const MetricCard=({label,value,sub,color=T.navy,spark})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"16px 18px"}}><div style={{fontSize:11,color:T.g500,marginBottom:6}}>{label}</div><div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}><div><div style={{fontSize:24,fontWeight:700,color}}>{value}</div>{sub&&<div style={{fontSize:11,color:T.g500,marginTop:2}}>{sub}</div>}</div>{spark&&<Spark data={spark} color={color}/>}</div></div>;

const SCREENS=[
  {group:"Capability 3",items:[
    {id:"c3-live",label:"Live Deployment Board",icon:"📡"},
    {id:"c3-person",label:"Personnel Detail Panel",icon:"👤"},
    {id:"c3-iii",label:"I/I/I Workflow",icon:"⚠"},
    {id:"c3-rolechange",label:"Role-Change Approval",icon:"🔄"},
    {id:"c3-fatigue",label:"Fatigue & Contact Logs",icon:"📋"},
    {id:"c3-rotation",label:"Rotation & Replacement",icon:"🔁"},
  ]},
  {group:"Capability 4",items:[
    {id:"c4-agency",label:"Agency Dashboard",icon:"🏢"},
    {id:"c4-national",label:"NRSC National Dashboard",icon:"🗺"},
    {id:"c4-state",label:"State / RMG Dashboard",icon:"📊"},
    {id:"c4-report",label:"Report Builder",icon:"📄"},
    {id:"c4-sitrep",label:"SitRep Workspace",icon:"📝"},
  ]},
];

const DEPLOYED=[
  {name:"Daniel Thornton",init:"DT",c:T.blue,role:"Crew Leader",agency:"QLD QFES",jur:"NSW",contingent:"CREW2",deployment:"Northern Rivers Flood",location:"Lismore, NSW",status:"Working",day:8,country:"AU"},
  {name:"Rachel Kimura",init:"RK",c:T.teal,role:"Deployment Manager",agency:"QLD QFES",jur:"NSW",contingent:"IMT1",deployment:"Northern Rivers Flood",location:"Lismore, NSW",status:"Working",day:12,country:"AU"},
  {name:"Tom Briggs",init:"TB",c:T.orange,role:"Flood Ops",agency:"QLD QFES",jur:"NSW",contingent:"CREW2",deployment:"Northern Rivers Flood",location:"Lismore, NSW",status:"Resting",day:8,country:"AU"},
  {name:"Peter Nguyễn",init:"PN",c:T.green,role:"INLO",agency:"QLD QFES",jur:"NSW",contingent:"INLO1",deployment:"Canada 2025",location:"Kamloops, BC",status:"Working",day:18,country:"CA"},
  {name:"Alice Nguyễn",init:"AN",c:T.green,role:"INLO Admin",agency:"QLD QFES",jur:"NSW",contingent:"INLO1",deployment:"Canada 2025",location:"Kamloops, BC",status:"Working",day:18,country:"CA"},
  {name:"David Kang",init:"DK",c:T.coral,role:"IC Support",agency:"SA CFS",jur:"VIC",contingent:"IMT1",deployment:"Canada 2025",location:"Kamloops, BC",status:"Working",day:18,country:"CA"},
  {name:"Mark Sullivan",init:"MS",c:T.navy,role:"Crew Leader",agency:"SA CFS",jur:"VIC",contingent:"CREW1",deployment:"Canada 2025",location:"Kamloops, BC",status:"Resting",day:18,country:"CA"},
  {name:"Peter O'Brien",init:"PO",c:T.g500,role:"Safety Officer",agency:"QLD QFES",jur:"NSW",contingent:"IMT1",deployment:"Northern Rivers Flood",location:"Lismore, NSW",status:"Demobilising",day:14,country:"AU"},
  {name:"Chris Adams",init:"CA",c:T.teal,role:"Crew Leader",agency:"SA SASES",jur:"SA",contingent:"CREW2",deployment:"Canada 2025",location:"Kamloops, BC",status:"Working",day:18,country:"CA"},
  {name:"Emma Walsh",init:"EW",c:T.coral,role:"Firefighter",agency:"FENZ",jur:"NZ",contingent:"CREW1",deployment:"Canada 2025",location:"Kamloops, BC",status:"Travel",day:18,country:"CA"},
];

const statusColor=s=>({Working:"blue",Resting:"teal",Travel:"orange",Briefing:"green",Demobilising:"gray","Medical/Other":"coral","In Field":"green","Out of Country":"orange",Mobilising:"blue"}[s]||"gray");

export default function NDMSStage2(){
  const[screen,setScreen]=useState("c3-live");
  const[mounted,setMounted]=useState(false);
  useEffect(()=>{setMounted(true)},[]);
  const R={
    "c3-live":<C3LiveBoard/>,"c3-person":<C3PersonDetail/>,"c3-iii":<C3IIIWorkflow/>,"c3-rolechange":<C3RoleChange/>,
    "c3-fatigue":<C3FatigueLogs/>,"c3-rotation":<C3Rotation/>,"c4-agency":<C4AgencyDash/>,"c4-national":<C4NationalDash/>,
    "c4-state":<C4StateDash/>,"c4-report":<C4ReportBuilder/>,"c4-sitrep":<C4SitRep/>,
  };
  const currentLabel=SCREENS.flatMap(g=>g.items).find(i=>i.id===screen)?.label||"";
  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:T.navy,fontSize:14,lineHeight:1.5,WebkitFontSmoothing:"antialiased",opacity:mounted?1:0,transition:"opacity .3s"}}>
      <nav style={{width:260,background:T.navy,display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
        <div style={{padding:"18px 18px 14px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:36,height:36,background:T.blue,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:800,fontSize:14}}>N</div>
          <div><div style={{color:T.white,fontWeight:700,fontSize:15.5}}>NDMS</div><div style={{color:"rgba(255,255,255,.35)",fontSize:10}}>Stage 2 Prototype</div></div>
        </div>
        <div style={{flex:1,padding:"6px 0"}}>
          {SCREENS.map((g,gi)=><div key={gi} style={{padding:"10px 12px 4px"}}>
            <div style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:1.2,padding:"0 10px 8px"}}>{g.group}</div>
            {g.items.map(item=>{const active=screen===item.id;return<div key={item.id} onClick={()=>setScreen(item.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"7px 11px",borderRadius:6,cursor:"pointer",color:active?T.white:"rgba(255,255,255,.55)",background:active?"rgba(14,120,201,.2)":"transparent",fontSize:12.5,fontWeight:active?600:450,position:"relative",marginBottom:1}}>
              {active&&<div style={{position:"absolute",left:-12,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:T.blue,borderRadius:"0 3px 3px 0"}}/>}
              <span style={{fontSize:14,width:20,textAlign:"center",opacity:active?1:.6}}>{item.icon}</span>{item.label}
            </div>})}
          </div>)}
        </div>
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><Avatar i="JW" c={T.teal} s={32}/><div><div style={{color:"rgba(255,255,255,.85)",fontSize:12.5,fontWeight:550}}>Jessica Walsh</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>NRSC Staff</div></div></div>
        </div>
      </nav>
      <main style={{flex:1,display:"flex",flexDirection:"column",minWidth:0,background:T.g50}}>
        <div style={{height:52,background:T.white,borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",padding:"0 24px",gap:12,flexShrink:0}}>
          <span style={{fontSize:13.5,fontWeight:650}}>{currentLabel}</span><div style={{flex:1}}/><span style={{padding:"3px 10px",background:T.orangeL,color:T.orange,fontSize:10,fontWeight:650,borderRadius:4,letterSpacing:.5}}>PROTOTYPE</span>
        </div>
        <div style={{flex:1,overflowY:"auto"}} key={screen}>{R[screen]}</div>
      </main>
    </div>
  );
}

/* ═══ CAPABILITY 3 — DEPLOYMENT MANAGEMENT ═══ */

function C3LiveBoard(){
  const[view,setView]=useState("list");
  const[filter,setFilter]=useState("All");
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Live Deployment Board</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Active personnel across all deployments — real-time status</p></div>
      <div style={{display:"flex",gap:8}}>
        <div style={{display:"flex",border:`1px solid ${T.g300}`,borderRadius:6,overflow:"hidden"}}>
          {["map","list"].map(v=><button key={v} onClick={()=>setView(v)} style={{padding:"6px 14px",fontSize:12,fontWeight:550,background:view===v?T.blue:T.white,color:view===v?T.white:T.g600,border:"none",cursor:"pointer",fontFamily:"inherit"}}>{v==="map"?"🗺 Map":"☰ List"}</button>)}
        </div>
        <Btn v="secondary">Export</Btn>
      </div>
    </div>

    <FilterChips items={["All","Australia","International","Northern Rivers Flood","Canada 2025","NSW RFS","CFA","SASES","FENZ"]} active={filter} onChange={setFilter}/>

    {/* Status summary strip */}
    <div style={{display:"flex",gap:10,marginBottom:18}}>
      {[{l:"Working",v:153,c:T.blue},{l:"Resting",v:49,c:T.teal},{l:"Travel",v:21,c:T.orange},{l:"Briefing",v:10,c:T.green},{l:"Demob",v:14,c:T.g500}].map((s,i)=><div key={i} style={{flex:1,background:T.white,border:`1px solid ${T.g200}`,borderRadius:6,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:s.c}}/><span style={{fontSize:12,color:T.g600}}>{s.l}</span><span style={{marginLeft:"auto",fontWeight:700,fontSize:15}}>{s.v}</span>
      </div>)}
    </div>

    {view==="map"?
      <Card s={{marginBottom:20}}>
        <div style={{height:340,background:`linear-gradient(170deg,${T.g100},#e0eef8 40%,#e8f0e4 70%,${T.g100})`,borderRadius:6,position:"relative",overflow:"hidden"}}>
          <svg viewBox="0 0 600 340" style={{width:"100%",height:"100%",position:"absolute"}}>
            <path d="M220,70 Q245,45 280,60 Q315,38 350,55 L375,72 Q400,65 418,90 L425,125 Q438,150 425,180 L412,210 Q400,235 375,248 L350,252 Q325,265 300,258 L275,262 Q250,270 232,252 L215,228 Q198,205 205,180 L200,148 Q192,112 205,90 Z" fill="rgba(14,120,201,.05)" stroke="rgba(14,120,201,.12)" strokeWidth="1.5"/>
            {/* Australia markers */}
            <circle cx="340" cy="72" r="8" fill={T.blue} stroke={T.white} strokeWidth="2.5"/><text x="354" y="70" fontSize="10" fill={T.navy} fontWeight="600">Lismore (68)</text>
            <circle cx="380" cy="130" r="5" fill={T.green} stroke={T.white} strokeWidth="2"/><text x="392" y="133" fontSize="9" fill={T.g500}>QLD (38)</text>
            <circle cx="365" cy="180" r="5" fill={T.blue} stroke={T.white} strokeWidth="2"/><text x="378" y="183" fontSize="9" fill={T.g500}>NSW (48)</text>
            <circle cx="330" cy="210" r="4" fill={T.teal} stroke={T.white} strokeWidth="2"/><text x="340" y="213" fontSize="9" fill={T.g500}>VIC (42)</text>
            <circle cx="270" cy="195" r="4" fill={T.g400} stroke={T.white} strokeWidth="2"/><text x="245" y="192" fontSize="9" fill={T.g500}>SA (22)</text>
            {/* Canada */}
            <circle cx="90" cy="40" r="8" fill={T.coral} stroke={T.white} strokeWidth="2.5"/><circle cx="90" cy="40" r="14" fill="none" stroke={T.coral} strokeWidth="1" opacity=".3"/>
            <text x="108" y="38" fontSize="10" fill={T.coral} fontWeight="600">Kamloops (33)</text>
            <text x="108" y="50" fontSize="9" fill={T.g500}>Canada 2025 — International</text>
          </svg>
        </div>
      </Card>
    :
      <Card>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Name</TH><TH>Role</TH><TH>Agency</TH><TH>Contingent</TH><TH>Deployment</TH><TH>Location</TH><TH>Status</TH><TH>Day</TH></tr></thead>
            <tbody>{DEPLOYED.map((p,i)=><tr key={i} style={{cursor:"pointer"}}><TD s={{fontWeight:600}}><div style={{display:"flex",alignItems:"center",gap:8}}><Avatar i={p.init} c={p.c} s={26}/>{p.name}</div></TD><TD>{p.role}</TD><TD>{p.agency}</TD><TD><Badge label={p.contingent} color="blue"/></TD><TD>{p.deployment}</TD><TD>{p.location}</TD><TD><Chip color={statusColor(p.status)}>{p.status}</Chip></TD><TD s={{fontWeight:650}}>{p.day}</TD></tr>)}</tbody>
          </table>
        </div>
      </Card>
    }
  </div>;
}

function C3PersonDetail(){
  const p=DEPLOYED[0];
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Personnel Detail</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Deployed person record — operational view</p></div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 2fr 1fr",gap:20}}>
      {/* Profile */}
      <Card>
        <div style={{textAlign:"center",marginBottom:16}}><Avatar i={p.init} c={p.c} s={64}/><div style={{fontSize:17,fontWeight:700,marginTop:10}}>{p.name}</div><div style={{fontSize:12.5,color:T.g500}}>{p.role} · {p.agency}</div><div style={{marginTop:8}}><Chip color={statusColor(p.status)}>{p.status}</Chip></div></div>
        <div style={{borderTop:`1px solid ${T.g100}`,paddingTop:12}}>
          {[["Location",p.location],["Deployment",p.deployment],["Contingent",p.contingent],["Jurisdiction",p.jur],["Deploy day",`Day ${p.day}`],["Request","2025_26_007NSW_QLD001"],["Manifest","MAN-0047-C2"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12.5,borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550}}>{v}</span></div>)}
        </div>
      </Card>

      {/* Activity & logs */}
      <div>
        <Card title="Fatigue Tracker" right={<span style={{fontSize:12,color:T.g500}}>5 consecutive work days</span>}>
          <div style={{display:"flex",gap:3,marginBottom:6}}>{["W","W","R","W","W","R","W","✦"].map((d,i)=><div key={i} style={{flex:1,height:28,borderRadius:4,background:d==="R"?T.teal:d==="✦"?T.green:T.blue,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,border:d==="✦"?`2px solid ${T.navy}`:"none"}}>{d}</div>)}</div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:T.g400}}><span>22 Mar</span><span style={{fontWeight:600,color:T.navy}}>Today (30 Mar)</span></div>
        </Card>

        <Card title="Recent Activity Log" s={{marginTop:16}}>
          {[
            {time:"30 Mar 08:00",action:"Status updated to Working",by:"System",c:T.blue},
            {time:"29 Mar 18:30",action:"Welfare contact logged by AREP",by:"M. Sullivan",c:T.teal},
            {time:"29 Mar 08:00",action:"Status updated to Working",by:"System",c:T.blue},
            {time:"28 Mar 18:00",action:"Rest day recorded",by:"System",c:T.teal},
            {time:"27 Mar 16:00",action:"Fatigue check — all clear",by:"M. Sullivan (AREP)",c:T.green},
            {time:"26 Mar 09:15",action:"Role confirmed: Crew Leader",by:"R. Kimura (DM)",c:T.green},
            {time:"22 Mar 06:00",action:"Deployment commenced",by:"System",c:T.green},
          ].map((l,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<6?`1px solid ${T.g100}`:"none"}}>
            <div style={{width:3,borderRadius:2,background:l.c,flexShrink:0}}/>
            <div><div style={{fontSize:12.5,fontWeight:550}}>{l.action}</div><div style={{fontSize:10.5,color:T.g500}}>{l.time} · {l.by}</div></div>
          </div>)}
        </Card>
      </div>

      {/* Liaison chain */}
      <div>
        <Card title="Liaison Chain">
          {[{name:"Rachel Kimura",role:"Deployment Manager",phone:"+61 412 xxx xxx",c:T.blue},{name:"Mark Sullivan",role:"AREP — NT Operations",phone:"+61 408 xxx xxx",c:T.teal},{name:"Linda Brooks",role:"NSW RFS Coordinator",phone:"+61 2 xxxx xxxx",c:T.coral},{name:"Jessica Walsh",role:"NRSC Duty Officer",phone:"+61 2 xxxx xxxx",c:T.navy}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:i<3?`1px solid ${T.g100}`:"none"}}>
            <Avatar i={c.name.split(" ").map(w=>w[0]).join("")} c={c.c} s={28}/>
            <div><div style={{fontSize:12.5,fontWeight:600}}>{c.name}</div><div style={{fontSize:11,color:T.g500}}>{c.role}</div></div>
          </div>)}
        </Card>
        <Card title="Linked Manifest" s={{marginTop:16}}>
          <div style={{fontSize:12.5}}><strong>Manifest:</strong> MAN-0047-C2</div>
          <div style={{fontSize:12.5,marginTop:4}}><strong>Flight:</strong> REX1712 BNE→LIS</div>
          <div style={{fontSize:12.5,marginTop:4}}><strong>Accommodation:</strong> Lismore Gateway Motel</div>
          <div style={{marginTop:10}}><Btn v="sm">View full manifest →</Btn></div>
        </Card>
      </div>
    </div>
  </div>;
}

function C3IIIWorkflow(){
  const[step]=useState(2);
  const steps=["Self-Report","Management Review","Investigation","Escalation","Complete & Sign","Submitted"];
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Illness / Injury / Incident Report</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>I/I/I-2025-0034 — Canada 2025 · IMT1 contingent</p></div>
      <Chip color="coral">Investigation Commenced</Chip>
    </div>

    {/* Status ladder */}
    <div style={{display:"flex",alignItems:"center",marginBottom:28}}>
      {steps.map((st,i)=>{const num=i+1;const done=num<step;const active=num===step;return<div key={i} style={{flex:1,display:"flex",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:0}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:done?T.green:active?T.coral:T.g200,color:done||active?T.white:T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{done?"✓":num}</div>
          <div style={{fontSize:9.5,color:active?T.coral:done?T.green:T.g400,fontWeight:active?600:400,marginTop:4,whiteSpace:"nowrap",textAlign:"center"}}>{st}</div>
        </div>
        {i<5&&<div style={{flex:1,height:2,background:done?T.green:T.g200,margin:"0 6px",marginBottom:18}}/>}
      </div>})}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
      <div>
        <Card title="Self-Report Details" right={<Badge label="Step 1 Complete" color="green"/>}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 20px",fontSize:12.5}}>
            {[["Reporter","David Kang (IC Support, IMT1)"],["Type","Injury"],["Date/Time","29 Mar 2026, 14:30 local"],["Location","Kamloops Fire Centre, BC"],["Description","Minor laceration to left forearm during equipment handling. First aid applied on-site."],["Medical attention","Yes — first aid on-site, follow-up recommended"],["Witnesses","Mark Sullivan, Emma Walsh"]].map(([k,v],i)=><div key={i} style={i===4?{gridColumn:"1/3"}:{}}><div style={{fontSize:10.5,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:500,marginTop:2}}>{v}</div></div>)}
          </div>
        </Card>

        <Card title="Management Review" right={<Badge label="In Progress" color="coral"/>} s={{marginTop:16}}>
          <div style={{background:T.coralL,borderRadius:6,padding:14,marginBottom:14}}>
            <div style={{fontSize:12.5,fontWeight:600,color:T.coral}}>Investigation commenced by AREP</div>
            <div style={{fontSize:12,color:T.g600,marginTop:4}}>Mark Sullivan (AREP) has commenced a formal review. Awaiting medical follow-up report and witness statements.</div>
          </div>
          <div style={{fontSize:11,color:T.g500}}>
            <div style={{marginBottom:6}}><strong>Assigned investigator:</strong> Mark Sullivan (AREP)</div>
            <div style={{marginBottom:6}}><strong>Notifications sent to:</strong> Rachel Kimura (DM), Linda Brooks (NSW RFS), NRSC Duty Officer</div>
            <div><strong>Next action:</strong> Medical follow-up report expected by 1 Apr 2026</div>
          </div>
        </Card>
      </div>

      <div>
        <Card title="Timeline">
          {[
            {time:"29 Mar 14:30",event:"Self-report submitted",by:"D. Kang",c:T.blue},
            {time:"29 Mar 14:45",event:"AREP notified automatically",by:"System",c:T.teal},
            {time:"29 Mar 15:20",event:"AREP acknowledged report",by:"M. Sullivan",c:T.teal},
            {time:"29 Mar 16:00",event:"Investigation commenced",by:"M. Sullivan",c:T.coral},
            {time:"29 Mar 16:15",event:"DM and agency notified",by:"System",c:T.orange},
            {time:"29 Mar 17:00",event:"NRSC Duty Officer notified",by:"System",c:T.navy},
          ].map((e,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<5?`1px solid ${T.g100}`:"none"}}>
            <div style={{width:3,borderRadius:2,background:e.c,flexShrink:0}}/>
            <div><div style={{fontSize:12,fontWeight:550}}>{e.event}</div><div style={{fontSize:10.5,color:T.g500}}>{e.time} · {e.by}</div></div>
          </div>)}
        </Card>
        <Card title="Actions" s={{marginTop:16}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Btn v="primary" s={{justifyContent:"center"}}>Add Investigation Note</Btn>
            <Btn v="secondary" s={{justifyContent:"center",color:T.coral,borderColor:T.coral}}>Escalate to NRSC</Btn>
            <Btn v="ghost" s={{justifyContent:"center"}}>Request Medical Report</Btn>
          </div>
        </Card>
      </div>
    </div>
  </div>;
}

function C3RoleChange(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Role-Change Approval</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Governed reassignment requests for deployed personnel</p></div>
    <Tabs tabs={[{id:"pending",label:"Pending",count:3},{id:"approved",label:"Approved",count:8},{id:"declined",label:"Declined",count:1}]} active="pending" onChange={()=>{}}/>

    {[
      {name:"Tom Briggs",init:"TB",c:T.orange,from:"Flood Ops",to:"Crew Leader",deployment:"Northern Rivers Flood",contingent:"CREW2",rationale:"Crew Leader vacancy due to demobilisation of P. O'Brien. T. Briggs has STL qualification and 8 days in-field experience on this deployment.",requested:"28 Mar 2026",by:"Rachel Kimura (DM)",status:"Pending Agency",color:"orange"},
      {name:"Emma Walsh",init:"EW",c:T.coral,from:"Firefighter",to:"Communications Operator",deployment:"Canada 2025",contingent:"CREW1",rationale:"Communications equipment operator needed. E. Walsh holds radio operator certification and has prior comms experience.",requested:"29 Mar 2026",by:"Mark Sullivan (AREP)",status:"Pending Agency",color:"orange"},
      {name:"Lisa Morton",init:"LM",c:T.teal,from:"Firefighter",to:"Safety Observer",deployment:"Canada 2025",contingent:"CREW2",rationale:"Additional safety coverage requested by IC Support. L. Morton completed safety observer module.",requested:"30 Mar 2026",by:"David Kang (IC Support)",status:"Pending DM",color:"blue"},
    ].map((r,i)=><Card key={i} title={<span>{r.name} <span style={{fontWeight:400,color:T.g500,fontSize:12}}>— {r.from} → {r.to}</span></span>} right={<Chip color={r.color}>{r.status}</Chip>} s={{marginBottom:14}}>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 20px",fontSize:12.5}}>
            {[["Current Role",r.from],["Requested Role",r.to],["Deployment",r.deployment],["Contingent",r.contingent],["Requested by",r.by],["Date",r.requested]].map(([k,v],i)=><div key={i}><div style={{fontSize:10.5,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:500,marginTop:2}}>{v}</div></div>)}
          </div>
          <div style={{marginTop:12,padding:"10px 14px",background:T.g50,borderRadius:6,fontSize:12.5}}>
            <div style={{fontSize:10.5,color:T.g400,fontWeight:550,marginBottom:4}}>Rationale</div>{r.rationale}
          </div>
        </div>
        <div>
          <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Decision</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Btn v="primary" s={{justifyContent:"center"}}>✓ Approve Role Change</Btn>
            <Btn v="secondary" s={{justifyContent:"center",color:T.coral,borderColor:T.coral}}>✕ Decline</Btn>
          </div>
          <textarea style={{width:"100%",height:50,border:`1px solid ${T.g200}`,borderRadius:6,padding:8,fontSize:12,fontFamily:"inherit",resize:"vertical",marginTop:10}} placeholder="Decision notes (required for decline)..."/>
        </div>
      </div>
    </Card>)}
  </div>;
}

function C3FatigueLogs(){
  const[tab,setTab]=useState("fatigue");
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Fatigue & Contact Logs</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Northern Rivers Flood Response — CREW2 — Work/rest and welfare records</p></div>
    <Tabs tabs={[{id:"fatigue",label:"Fatigue Tracker"},{id:"contact",label:"Contact Log",count:12}]} active={tab} onChange={setTab}/>

    {tab==="fatigue"?<div>
      {/* Alert */}
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderRadius:6,marginBottom:18,background:T.orangeL,borderLeft:`3px solid ${T.orange}`,fontSize:13}}>
        <span style={{fontWeight:700}}>⚠</span><strong>Fatigue threshold:</strong> 3 personnel at 12+ consecutive days. Review rotation plan.
      </div>
      <Card>
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Name</TH><TH>Role</TH>{["22","23","24","25","26","27","28","29","30"].map(d=><TH key={d}>{d}</TH>)}<TH>Consec.</TH><TH>Alert</TH></tr></thead>
          <tbody>
            {[
              {name:"Daniel Thornton",role:"Crew Leader",days:["W","W","R","W","W","R","W","W","W"],consec:3,alert:false},
              {name:"Tom Briggs",role:"Flood Ops",days:["W","W","R","W","W","R","W","R","W"],consec:1,alert:false},
              {name:"Rachel Kimura",role:"DM",days:["W","W","W","W","R","W","W","W","W"],consec:4,alert:false},
              {name:"Karen Wong",role:"Flood Ops",days:["W","W","W","W","W","W","W","W","W"],consec:9,alert:true},
              {name:"Ben Taylor",role:"Flood Ops",days:["W","W","W","W","W","W","R","W","W"],consec:2,alert:false},
            ].map((r,i)=><tr key={i}><TD s={{fontWeight:600,fontSize:12.5}}>{r.name}</TD><TD s={{fontSize:12}}>{r.role}</TD>
              {r.days.map((d,di)=><td key={di} style={{padding:4,textAlign:"center",borderBottom:`1px solid ${T.g100}`}}><div style={{width:24,height:22,borderRadius:3,background:d==="W"?T.blue:T.teal,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,margin:"0 auto"}}>{d}</div></td>)}
              <TD s={{fontWeight:700,color:r.consec>=5?T.coral:r.consec>=3?T.orange:T.navy}}>{r.consec}</TD>
              <TD>{r.alert?<Chip color="coral">Threshold</Chip>:<span style={{color:T.g400,fontSize:12}}>—</span>}</TD>
            </tr>)}
          </tbody>
        </table>
      </Card>
    </div>:
    <Card title="Contact History" right={<Btn v="primary">+ Log Contact</Btn>}>
      {[
        {date:"30 Mar 08:15",type:"Welfare check",who:"CREW2 (team)",by:"Mark Sullivan (AREP)",notes:"All team members checked — morale good. Karen Wong flagged for fatigue review.",method:"In person"},
        {date:"29 Mar 18:30",type:"Welfare check",who:"Daniel Thornton",by:"Mark Sullivan (AREP)",notes:"Individual check — no concerns. Confirmed rest day scheduled for 31 Mar.",method:"In person"},
        {date:"29 Mar 08:00",type:"Briefing contact",who:"CREW2 (team)",by:"Rachel Kimura (DM)",notes:"Morning briefing conducted. Operations plan for day 8 confirmed.",method:"Group briefing"},
        {date:"28 Mar 17:00",type:"Welfare check",who:"Karen Wong",by:"Mark Sullivan (AREP)",notes:"Discussed fatigue levels. K. Wong reports tiredness but capable. Rest day recommended.",method:"Phone"},
        {date:"27 Mar 16:00",type:"Scheduled check",who:"All CREW2",by:"Mark Sullivan (AREP)",notes:"Weekly welfare round complete. No issues raised.",method:"In person"},
      ].map((l,i)=><div key={i} style={{display:"flex",gap:14,padding:"12px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none"}}>
        <div style={{width:3,borderRadius:2,background:l.type.includes("Welfare")?T.teal:T.blue,flexShrink:0}}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:13,fontWeight:600}}>{l.type} — {l.who}</span>
            <span style={{fontSize:11,color:T.g400}}>{l.date}</span>
          </div>
          <div style={{fontSize:12,color:T.g600,marginTop:3}}>{l.notes}</div>
          <div style={{fontSize:11,color:T.g500,marginTop:3}}>By {l.by} · {l.method}</div>
        </div>
      </div>)}
    </Card>}
  </div>;
}

function C3Rotation(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Rotation & Replacement Dashboard</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Sustained deployment management — inbound, outbound, and gaps</p></div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
      {[{l:"Upcoming Demob (72h)",v:"14",c:T.orange},{l:"Inbound Replacements",v:"8",c:T.green},{l:"Unfilled Gaps",v:"3",c:T.coral},{l:"Extension Requests",v:"2",c:T.blue}].map((m,i)=><MetricCard key={i} label={m.l} value={m.v} color={m.c}/>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Card title="Upcoming Demobilisations" right={<Chip color="orange">Next 72h</Chip>}>
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Name</TH><TH>Role</TH><TH>Deployment</TH><TH>Demob Date</TH><TH>Replacement</TH></tr></thead>
          <tbody>
            {[
              {name:"Peter O'Brien",role:"Safety Officer",deploy:"Northern Rivers Flood",date:"31 Mar",replacement:"Sourced",rc:"green"},
              {name:"Rachel Kimura",role:"DM",deploy:"Northern Rivers Flood",date:"1 Apr",replacement:"Required",rc:"coral"},
              {name:"Karen Wong",role:"Flood Ops",deploy:"Northern Rivers Flood",date:"1 Apr",replacement:"Required",rc:"coral"},
              {name:"Tom Briggs",role:"Flood Ops",deploy:"Northern Rivers Flood",date:"2 Apr",replacement:"Sourced",rc:"green"},
            ].map((r,i)=><tr key={i}><TD s={{fontWeight:600}}>{r.name}</TD><TD>{r.role}</TD><TD>{r.deploy}</TD><TD s={{fontWeight:600}}>{r.date}</TD><TD><Chip color={r.rc}>{r.replacement}</Chip></TD></tr>)}
          </tbody>
        </table>
      </Card>

      <Card title="Inbound Replacements">
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Name</TH><TH>Role</TH><TH>Agency</TH><TH>Arrival</TH><TH>Replacing</TH></tr></thead>
          <tbody>
            {[
              {name:"Sam O'Connor",role:"Safety Officer",agency:"TFS",arrival:"31 Mar",replacing:"P. O'Brien"},
              {name:"Jake Williams",role:"Flood Ops",agency:"SA CFS",arrival:"2 Apr",replacing:"T. Briggs"},
              {name:"Nina Roberts",role:"Flood Ops",agency:"QFES",arrival:"3 Apr",replacing:"—"},
            ].map((r,i)=><tr key={i}><TD s={{fontWeight:600}}>{r.name}</TD><TD>{r.role}</TD><TD>{r.agency}</TD><TD s={{fontWeight:600}}>{r.arrival}</TD><TD>{r.replacing}</TD></tr>)}
          </tbody>
        </table>
      </Card>
    </div>

    <Card title="Rotation Gaps — Action Required" right={<Chip color="coral">3 unfilled</Chip>} s={{marginTop:20}}>
      {[
        {role:"Deployment Manager",deploy:"Northern Rivers Flood",gap:"1 Apr — no replacement sourced",urgency:"Critical",c:"coral",action:"Source replacement"},
        {role:"Flood Ops",deploy:"Northern Rivers Flood",gap:"1 Apr — no replacement sourced",urgency:"High",c:"orange",action:"Source replacement"},
        {role:"INLO Admin",deploy:"Canada 2025",gap:"8 Apr — rotation due, extension pending",urgency:"Medium",c:"blue",action:"Confirm extension"},
      ].map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
        <Chip color={g.c}>{g.urgency}</Chip>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{g.role} — {g.deploy}</div><div style={{fontSize:11.5,color:T.g500}}>{g.gap}</div></div>
        <Btn v="primary" s={{fontSize:12,padding:"5px 14px"}}>{g.action}</Btn>
      </div>)}
    </Card>
  </div>;
}

/* ═══ CAPABILITY 4 — SITUATIONAL AWARENESS & REPORTING ═══ */

function C4AgencyDash(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:42,height:42,background:T.coral,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:700,fontSize:13}}>RFS</div>
        <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Agency Dashboard</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>NSW Rural Fire Service — Deployment & readiness overview</p></div>
      </div>
      <Btn v="secondary">Export PDF</Btn>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:20}}>
      {[{l:"Our People Deployed",v:"34",c:T.blue,spark:[20,22,25,28,30,34]},{l:"Interstate Ready",v:"118",c:T.green},{l:"Int'l Ready",v:"42",c:T.teal},{l:"Open Issues",v:"3",c:T.coral},{l:"Claims Pending",v:"$4,230",c:T.orange}].map((m,i)=><MetricCard key={i} {...m}/>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
      <div>
        <Card title="Our Contingents">
          {[{name:"CREW2 — Northern Rivers Flood",personnel:"6 deployed",status:"Active",day:"Day 8",c:"green"},{name:"INLO1 — Canada 2025",personnel:"2 deployed",status:"Active",day:"Day 18",c:"green"},{name:"IMT1 — Northern Rivers Flood",personnel:"3 deployed (1 demob)",status:"Partial Demob",day:"Day 12–14",c:"orange"}].map((ct,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{ct.name}</div><div style={{fontSize:11.5,color:T.g500}}>{ct.personnel} · {ct.day}</div></div>
            <Chip color={ct.c}>{ct.status}</Chip>
          </div>)}
        </Card>
        <Card title="Cost Summary (Season 2025/26)" s={{marginTop:16}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
            {[{l:"Travel",v:"$48,200"},{l:"Accommodation",v:"$32,100"},{l:"Claims Paid",v:"$12,850"},{l:"Claims Pending",v:"$4,230"},{l:"Claims Rejected",v:"$620"},{l:"Total Season",v:"$97,380"}].map((c,i)=><div key={i}><div style={{fontSize:11,color:T.g400}}>{c.l}</div><div style={{fontSize:15,fontWeight:700,marginTop:2,color:i===5?T.navy:T.g700}}>{c.v}</div></div>)}
          </div>
        </Card>
      </div>
      <div>
        <Card title="Open Issues">
          {[{title:"I/I/I Report — Canada 2025",sub:"Investigation commenced · D. Kang",c:"coral"},{title:"Fatigue warning — K. Wong",sub:"9 consecutive work days",c:"orange"},{title:"Rotation gap — DM replacement",sub:"1 Apr — no replacement sourced",c:"coral"}].map((iss,i)=><div key={i} style={{padding:"10px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,fontWeight:600}}>{iss.title}</span></div>
            <div style={{fontSize:11.5,color:T.g500,marginTop:2}}>{iss.sub}</div>
            <Chip color={iss.c}>{iss.c==="coral"?"Critical":"Warning"}</Chip>
          </div>)}
        </Card>
        <Card title="Readiness Snapshot" s={{marginTop:16}}>
          {[{l:"Total registered",v:142},{l:"Interstate ready",v:118},{l:"International ready",v:42},{l:"Currently deployed",v:34},{l:"Available",v:84},{l:"Expiring creds (<30d)",v:7}].map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12.5,borderBottom:i<5?`1px solid ${T.g50}`:"none"}}><span style={{color:T.g500}}>{r.l}</span><span style={{fontWeight:650}}>{r.v}</span></div>)}
        </Card>
      </div>
    </div>
  </div>;
}

function C4NationalDash(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{background:`linear-gradient(135deg,${T.navy},#2c4a6a)`,borderRadius:10,padding:"20px 28px",color:T.white,marginBottom:22,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div><h2 style={{color:T.white,fontSize:20,fontWeight:700,margin:0}}>NRSC National Dashboard</h2><p style={{color:"rgba(255,255,255,.55)",fontSize:13,margin:"4px 0 0"}}>Season 2025/26 · Week 22 · 30 Mar 2026</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="sm" s={{background:"rgba(255,255,255,.12)",color:T.white,border:"1px solid rgba(255,255,255,.2)"}}>Export</Btn><Btn v="primary">New SitRep</Btn></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
      {[{l:"Deployed",v:"247",c:T.blue,spark:[180,195,210,220,230,240,247]},{l:"Requests",v:"12",c:T.navy},{l:"Contingents",v:"8",c:T.teal},{l:"Issues",v:"4",c:T.coral},{l:"Rotations (72h)",v:"14",c:T.orange},{l:"NAA Active",v:"3",c:T.green}].map((m,i)=><MetricCard key={i} {...m}/>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      {/* Map */}
      <Card title="National Deployment Map">
        <div style={{height:240,background:`linear-gradient(170deg,${T.g100},#e0eef8 40%,#e8f0e4 70%,${T.g100})`,borderRadius:6,position:"relative"}}>
          <svg viewBox="0 0 400 240" style={{width:"100%",height:"100%",position:"absolute"}}>
            <path d="M150,50 Q170,32 200,44 Q225,27 250,40 L268,53 Q285,47 298,66 L303,92 Q313,110 303,132 L293,154 Q283,172 263,182 L248,185 Q230,195 212,189 L195,193 Q178,200 165,185 L153,168 Q140,150 145,132 L142,108 Q136,82 145,66 Z" fill="rgba(14,120,201,.05)" stroke="rgba(14,120,201,.12)" strokeWidth="1"/>
            <circle cx="242" cy="52" r="6" fill={T.blue} stroke={T.white} strokeWidth="2"/><text x="253" y="52" fontSize="8" fill={T.navy} fontWeight="600">Lismore 64</text>
            <circle cx="273" cy="96" r="4" fill={T.green} stroke={T.white} strokeWidth="1.5"/><text x="281" y="98" fontSize="7" fill={T.g500}>QLD 38</text>
            <circle cx="262" cy="132" r="4" fill={T.blue} stroke={T.white} strokeWidth="1.5"/><text x="270" y="134" fontSize="7" fill={T.g500}>NSW 48</text>
            <circle cx="235" cy="155" r="3" fill={T.teal} stroke={T.white} strokeWidth="1.5"/><text x="243" y="157" fontSize="7" fill={T.g500}>VIC 42</text>
            <circle cx="190" cy="142" r="3" fill={T.g400} stroke={T.white} strokeWidth="1.5"/><text x="172" y="140" fontSize="7" fill={T.g500}>SA 22</text>
            <circle cx="65" cy="30" r="6" fill={T.coral} stroke={T.white} strokeWidth="2"/><text x="76" y="28" fontSize="8" fill={T.coral} fontWeight="600">Canada 33</text>
          </svg>
        </div>
      </Card>

      {/* Jurisdiction cards */}
      <Card title="Jurisdiction Status">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[{j:"NT",dep:64,req:3,iss:2,c:"green"},{j:"NSW",dep:48,req:2,iss:1,c:"blue"},{j:"VIC",dep:42,req:2,iss:0,c:"blue"},{j:"QLD",dep:38,req:3,iss:0,c:"orange"},{j:"SA",dep:22,req:1,iss:0,c:"gray"},{j:"WA",dep:0,req:1,iss:0,c:"gray"},{j:"ACT",dep:0,req:0,iss:0,c:"gray"},{j:"NZ",dep:5,req:0,iss:0,c:"teal"},{j:"INT'L",dep:33,req:1,iss:1,c:"coral"}].map((j,i)=><div key={i} style={{padding:10,border:`1px solid ${T.g200}`,borderRadius:6,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontWeight:700,fontSize:14}}>{j.j}</span><Chip color={j.c} dot>{""}</Chip></div>
            <div style={{fontSize:10.5,color:T.g500}}>Dep: <strong style={{color:T.navy}}>{j.dep}</strong> · Req: {j.req}{j.iss>0&&<span style={{color:T.coral}}> · ⚠ {j.iss}</span>}</div>
          </div>)}
        </div>
      </Card>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Card title="Active Issues" right={<Chip color="coral">4</Chip>}>
        {[{t:"I/I/I — Welfare (Canada 2025)",s:"Investigation commenced · IMT1",c:"coral",time:"2h"},{t:"Fatigue threshold (NT)",s:"3 at 12+ consecutive days",c:"orange",time:"4h"},{t:"Rotation gap (NT)",s:"2 DM replacements by 4 Apr",c:"coral",time:"6h"},{t:"Claims overdue",s:"7 past 14-day window",c:"orange",time:"1d"}].map((iss,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<3?`1px solid ${T.g100}`:"none",cursor:"pointer"}}>
          <Chip color={iss.c}>{iss.c==="coral"?"Critical":"Warning"}</Chip>
          <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:600}}>{iss.t}</div><div style={{fontSize:11,color:T.g500}}>{iss.s}</div></div>
          <span style={{fontSize:11,color:T.g400}}>{iss.time} ago</span>
        </div>)}
      </Card>
      <Card title="Inbound Rotations (72h)">
        {[{name:"Sam O'Connor",role:"Safety Officer → NT",agency:"TFS",date:"31 Mar"},{name:"Jake Williams",role:"Flood Ops → NT",agency:"SA CFS",date:"2 Apr"},{name:"Nina Roberts",role:"Flood Ops → NT",agency:"QFES",date:"3 Apr"},{name:"Rotation B — Canada",role:"CREW swap ×6",agency:"Multi",date:"8 Apr"}].map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<3?`1px solid ${T.g100}`:"none"}}>
          <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:600}}>{r.name}</div><div style={{fontSize:11,color:T.g500}}>{r.role} · {r.agency}</div></div>
          <Badge label={r.date} color="blue"/>
        </div>)}
      </Card>
    </div>
  </div>;
}

function C4StateDash(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>State / RMG Dashboard</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>New South Wales — Resource Management Group oversight view</p></div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
      {[{l:"NSW Personnel Deployed",v:"48",c:T.blue,spark:[30,35,38,42,44,48]},{l:"Contributing To",v:"3 deployments",c:T.navy},{l:"Receiving From",v:"0 jurisdictions",c:T.g500},{l:"Cost This Season",v:"$97,380",c:T.orange}].map((m,i)=><MetricCard key={i} {...m}/>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Card title="Contributing Jurisdictions (sending to NSW)">
        <div style={{textAlign:"center",padding:30,color:T.g400,fontSize:13}}>No inbound deployments to NSW this period</div>
      </Card>
      <Card title="NSW Contributing To">
        {[{deploy:"Northern Rivers Flood Response",personnel:32,roles:"IMT, Crew, DM, Safety",status:"Active"},{deploy:"Canada 2025",personnel:6,roles:"INLO, INLO Admin, Crew",status:"Active"},{deploy:"QLD Storm (pending)",personnel:0,roles:"Awaiting nomination",status:"Pending"}].map((d,i)=><div key={i} style={{padding:"10px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:600,fontSize:13}}>{d.deploy}</span><Chip color={d.status==="Active"?"green":"orange"}>{d.status}</Chip></div>
          <div style={{fontSize:11.5,color:T.g500,marginTop:2}}>{d.personnel} personnel · {d.roles}</div>
        </div>)}
      </Card>
    </div>

    <Card title="High-Level Trend" s={{marginTop:20}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:14}}>
        {[{l:"Week 17",v:18},{l:"Week 18",v:25},{l:"Week 19",v:30},{l:"Week 20",v:38},{l:"Week 21",v:44},{l:"Week 22",v:48}].map((w,i)=><div key={i} style={{textAlign:"center"}}>
          <div style={{height:80,display:"flex",alignItems:"flex-end",justifyContent:"center",marginBottom:4}}>
            <div style={{width:32,height:`${(w.v/48)*70}px`,background:T.blue,borderRadius:"4px 4px 0 0",transition:"height .5s"}}/>
          </div>
          <div style={{fontSize:11,fontWeight:600}}>{w.v}</div>
          <div style={{fontSize:10,color:T.g400}}>{w.l}</div>
        </div>)}
      </div>
    </Card>
  </div>;
}

function C4ReportBuilder(){
  const[cols]=useState(["Name","Role","Agency","Jurisdiction","Deployment","Status","Day","Contingent"]);
  const[selected,setSelected]=useState(["Name","Role","Agency","Deployment","Status","Day"]);
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Report Builder</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Build and export filtered deployment reports</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="secondary">Export Excel</Btn><Btn v="primary">Export PDF</Btn></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:20}}>
      {/* Filters panel */}
      <Card title="Filters">
        <div style={{marginBottom:14}}><div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Deployment</div>
          {["All Deployments","Northern Rivers Flood Response","Canada 2025"].map((d,i)=><label key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:12.5,padding:"4px 0",cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:4,border:`2px solid ${i===0?T.blue:T.g300}`,background:i===0?T.blueL:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:T.blue}}>{i===0?"✓":""}</div>{d}</label>)}
        </div>
        <div style={{marginBottom:14}}><div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Status</div>
          {["Working","Resting","Travel","Briefing","Demobilising"].map((s,i)=><label key={i} style={{display:"flex",alignItems:"center",gap:8,fontSize:12.5,padding:"4px 0",cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:4,border:`2px solid ${T.g300}`,background:T.white}}/>{s}</label>)}
        </div>
        <div><div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Columns</div>
          {cols.map(c=><label key={c} onClick={()=>setSelected(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c])} style={{display:"flex",alignItems:"center",gap:8,fontSize:12.5,padding:"4px 0",cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:4,border:`2px solid ${selected.includes(c)?T.blue:T.g300}`,background:selected.includes(c)?T.blueL:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:T.blue}}>{selected.includes(c)?"✓":""}</div>{c}</label>)}
        </div>
      </Card>

      {/* Preview */}
      <Card title="Report Preview" right={<span style={{fontSize:12,color:T.g500}}>Showing 10 of 247 records</span>}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{selected.map(c=><TH key={c}>{c}</TH>)}</tr></thead>
            <tbody>{DEPLOYED.map((p,i)=><tr key={i}>
              {selected.map(c=><TD key={c} s={{fontWeight:c==="Name"?600:400}}>{
                c==="Name"?p.name:c==="Role"?p.role:c==="Agency"?p.agency:c==="Jurisdiction"?p.jur:
                c==="Deployment"?p.deployment:c==="Status"?<Chip color={statusColor(p.status)}>{p.status}</Chip>:
                c==="Day"?p.day:c==="Contingent"?p.contingent:""
              }</TD>)}
            </tr>)}</tbody>
          </table>
        </div>
        <div style={{marginTop:12,padding:"10px 14px",background:T.g50,borderRadius:6,fontSize:12,color:T.g500,display:"flex",justifyContent:"space-between"}}>
          <span>Report generated: 30 Mar 2026, 10:30 AEST</span>
          <span>Format: PDF / Excel</span>
        </div>
      </Card>
    </div>
  </div>;
}

function C4SitRep(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>SitRep Workspace</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Northern Rivers Flood Response — SitRep #9 (Draft)</p></div>
      <div style={{display:"flex",gap:8}}><Chip color="orange">Draft</Chip><Btn v="secondary">Save Draft</Btn><Btn v="primary">Submit SitRep</Btn></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
      <div>
        {/* Auto-populated sections */}
        {[
          {title:"1. Situation Overview",auto:true,content:"Northern Rivers Flood Response continues with 64 personnel deployed across 3 contingents in Lismore, NSW. Operations focus on storm damage clearance and community recovery support. Deployment is in Day 8–14 with first rotation commencing 31 Mar."},
          {title:"2. Deployment Summary",auto:true,content:null,table:[["Contingent","Personnel","Status","Day"],["IMT1","3","Active (1 demob)","12–14"],["CREW1","6","Active","8"],["CREW2","6","Active","8"],["Overhead","4","Active","8–12"]]},
          {title:"3. Weather & Fire Context",auto:false,content:"Post-cyclone conditions: temperatures 32–35°C, humidity 75–85%, scattered thunderstorms forecast for 31 Mar–2 Apr. Wind gusts to 60km/h possible. Category 2 cyclone remnants have weakened to a tropical low."},
          {title:"4. Issues & Risks",auto:true,content:null,items:["I/I/I Report filed for Canada 2025 (IMT1) — investigation commenced","Fatigue threshold warning: 3 personnel at 12+ consecutive days","Rotation gap: 2 DM replacements required by 4 Apr","7 expense claims past 14-day agency review window"]},
          {title:"5. Planned Actions (Next 24–72h)",auto:false,content:"Rotation 1 commencing 31 Mar — Safety Officer replacement arriving. DM replacement to be sourced urgently. Continue storm damage clearance in suburban Lismore. Weather watch for thunderstorm activity."},
        ].map((sec,i)=><Card key={i} title={<span>{sec.title} {sec.auto&&<Badge label="Auto-populated" color="teal"/>}</span>} s={{marginBottom:14}}>
          {sec.content&&<div style={{fontSize:13,lineHeight:1.7,color:T.g700}}>{sec.content}</div>}
          {sec.table&&<table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>{sec.table[0].map(h=><TH key={h}>{h}</TH>)}</tr></thead><tbody>{sec.table.slice(1).map((r,ri)=><tr key={ri}>{r.map((c,ci)=><TD key={ci} s={{fontWeight:ci===0?600:400}}>{c}</TD>)}</tr>)}</tbody></table>}
          {sec.items&&<div>{sec.items.map((item,ii)=><div key={ii} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:ii<sec.items.length-1?`1px solid ${T.g100}`:"none",fontSize:12.5}}><span style={{color:T.coral}}>•</span>{item}</div>)}</div>}
          {!sec.auto&&<div style={{marginTop:10}}><Btn v="ghost" s={{fontSize:11}}>✏ Edit section</Btn></div>}
        </Card>)}
      </div>

      <div>
        <Card title="SitRep Details">
          {[["Report ID","SITREP-NT-2025-009"],["Deployment","Northern Rivers Flood Response"],["Period","29–30 Mar 2026"],["Author","Jessica Walsh"],["Status","Draft"],["Previous","SitRep #8 (Submitted 29 Mar)"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12.5,borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550}}>{v}</span></div>)}
        </Card>

        <Card title="Attachments" s={{marginTop:16}}>
          {[{name:"Weather forecast 31 Mar.pdf",size:"240 KB"},{name:"Ops plan Day 9.pdf",size:"1.2 MB"}].map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<1?`1px solid ${T.g100}`:"none"}}><span>📎</span><div style={{flex:1,fontSize:12.5}}>{a.name}</div><span style={{fontSize:11,color:T.g400}}>{a.size}</span></div>)}
          <Btn v="ghost" s={{marginTop:6,fontSize:11}}>+ Add attachment</Btn>
        </Card>

        <Card title="Workflow" s={{marginTop:16}}>
          {[{step:"Draft",status:"Current",c:T.orange},{step:"Submit",status:"Next",c:T.g400},{step:"Forward to RMG",status:"—",c:T.g300},{step:"Archive",status:"—",c:T.g300}].map((w,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0"}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:w.status==="Current"?w.c:T.g100,color:w.status==="Current"?T.white:T.g400,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700}}>{i+1}</div>
            <span style={{fontSize:12.5,fontWeight:w.status==="Current"?600:400,color:w.status==="Current"?T.navy:T.g400}}>{w.step}</span>
            {w.status==="Current"&&<Chip color="orange">{w.status}</Chip>}
          </div>)}
        </Card>

        <Card title="Distribution" s={{marginTop:16}}>
          {["NRSC Duty Manager","NSW RFS Coordinator","NT Emergency Services","RMG Members"].map((r,i)=><div key={i} style={{fontSize:12.5,padding:"4px 0",borderBottom:i<3?`1px solid ${T.g50}`:"none"}}>📧 {r}</div>)}
        </Card>
      </div>
    </div>
  </div>;
}

export {
  C3LiveBoard,
  C3PersonDetail,
  C3IIIWorkflow,
  C3RoleChange,
  C3FatigueLogs,
  C3Rotation,
  C4AgencyDash,
  C4NationalDash,
  C4StateDash,
  C4ReportBuilder,
  C4SitRep
};
