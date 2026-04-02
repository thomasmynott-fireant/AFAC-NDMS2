import { useState, useEffect } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all .12s"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const TH=({children})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap"}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;
const Av=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const Tabs=({tabs,active,onChange})=><div style={{display:"flex",borderBottom:`2px solid ${T.g200}`,marginBottom:20}}>{tabs.map(t=><div key={t.id} onClick={()=>onChange(t.id)} style={{padding:"8px 18px",fontSize:13,fontWeight:550,color:active===t.id?T.blue:T.g500,borderBottom:`2px solid ${active===t.id?T.blue:"transparent"}`,marginBottom:-2,cursor:"pointer"}}>{t.label}{t.count!=null&&<span style={{background:active===t.id?T.blueL:T.g100,fontSize:10,padding:"1px 6px",borderRadius:10,marginLeft:6}}>{t.count}</span>}</div>)}</div>;

export default function AdminWorkspace(){
  const[tab,setTab]=useState("roles");
  const[m,setM]=useState(false);
  useEffect(()=>setM(true),[]);

  return(
    <div style={{padding:"24px 32px",opacity:m?1:0,transition:"opacity .3s"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
        <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Administration & Settings</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>System configuration, role management, and audit controls</p></div>
        <div style={{display:"flex",gap:8}}><Btn v="secondary">Export Audit Log</Btn><Btn v="primary">Save Changes</Btn></div>
      </div>

      <Tabs tabs={[
        {id:"roles",label:"Role Profiles"},
        {id:"agencies",label:"Agency Scoping"},
        {id:"audit",label:"Audit Log",count:142},
        {id:"integrations",label:"Integrations"},
        {id:"system",label:"System Config"},
      ]} active={tab} onChange={setTab}/>

      {tab==="roles"&&<RoleProfiles/>}
      {tab==="agencies"&&<AgencyScoping/>}
      {tab==="audit"&&<AuditLog/>}
      {tab==="integrations"&&<Integrations/>}
      {tab==="system"&&<SystemConfig/>}
    </div>
  );
}

function RoleProfiles(){
  const roles=[
    {role:"NRSC Operations",count:12,perms:["Create requests","Approve deployments","Manage personnel","View all deployments","Generate SitReps","Aviation requests"],level:"Full",c:"teal"},
    {role:"Team Member",count:842,perms:["View own profile","Submit EOI","Log fatigue","Submit claims","View deployment schedule"],level:"Self-service",c:"blue"},
    {role:"Agency Administrator",count:38,perms:["Manage agency personnel","Approve nominations","Review claims","View agency dashboard"],level:"Agency",c:"coral"},
    {role:"Deployment Manager",count:16,perms:["Manage contingent","Approve role changes","View deployed personnel","Log welfare contacts","Submit SitReps"],level:"Operational",c:"green"},
    {role:"Air Desk",count:4,perms:["NAA management","Asset allocation","Flight planning","Aviation approvals"],level:"Aviation",c:"orange"},
    {role:"INLO / AREP",count:8,perms:["Liaison management","Welfare checks","I/I/I reports","Host agency coordination"],level:"Liaison",c:"green"},
    {role:"RMG / State",count:24,perms:["State overview","Resource allocation oversight","SitRep distribution","Cost monitoring"],level:"Oversight",c:"gray"},
    {role:"Executive",count:6,perms:["National overview","CCOSC delegation","Strategic reporting","Cross-jurisdiction view"],level:"Executive",c:"navy"},
  ];

  return<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
    {roles.map((r,i)=><Card key={i} title={<span>{r.role} <Chip color={r.c}>{r.count} users</Chip></span>} right={<Btn v="secondary" s={{padding:"4px 12px",fontSize:11}}>Edit</Btn>}>
      <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Permissions — {r.level} Access</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {r.perms.map((p,pi)=><span key={pi} style={{padding:"3px 10px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:4,fontSize:11,fontWeight:500}}>{p}</span>)}
      </div>
    </Card>)}
  </div>;
}

function AgencyScoping(){
  const agencies=[
    {name:"QLD QFES",state:"QLD",personnel:186,deployed:22,ready:118,admin:"Sarah Patel",c:T.coral},
    {name:"VIC CFA",state:"VIC",personnel:142,deployed:18,ready:92,admin:"Michael Chen",c:T.orange},
    {name:"NSW RFS",state:"NSW",personnel:178,deployed:0,ready:134,admin:"Linda Brooks",c:T.blue},
    {name:"SA CFS",state:"SA",personnel:64,deployed:10,ready:42,admin:"James Morton",c:T.teal},
    {name:"TAS TFS",state:"TAS",personnel:48,deployed:8,ready:28,admin:"Kira Thornton",c:T.green},
    {name:"WA DFES",state:"WA",personnel:92,deployed:0,ready:68,admin:"Peter Walsh",c:T.navy},
    {name:"ACT ESA",state:"ACT",personnel:32,deployed:0,ready:22,admin:"Lisa Ng",c:T.g500},
    {name:"NZ FENZ",state:"NZ",personnel:56,deployed:5,ready:34,admin:"James Carter",c:T.teal},
  ];

  return<Card>
    <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Agency</TH><TH>State</TH><TH>Personnel</TH><TH>Currently Deployed</TH><TH>Interstate Ready</TH><TH>Primary Admin</TH><TH>Status</TH><TH>Actions</TH></tr></thead>
      <tbody>{agencies.map((a,i)=><tr key={i}>
        <TD fw={600}><div style={{display:"flex",alignItems:"center",gap:8}}><Av i={a.name.split(" ").pop().slice(0,2)} c={a.c} s={26}/>{a.name}</div></TD>
        <TD>{a.state}</TD>
        <TD fw={600}>{a.personnel}</TD>
        <TD><Chip color={a.deployed>0?"blue":"gray"}>{a.deployed}</Chip></TD>
        <TD>{a.ready}</TD>
        <TD>{a.admin}</TD>
        <TD><Chip color="green">Active</Chip></TD>
        <TD><Btn v="secondary" s={{padding:"3px 10px",fontSize:11}}>Configure</Btn></TD>
      </tr>)}</tbody>
    </table>
  </Card>;
}

function AuditLog(){
  const logs=[
    {time:"30 Mar 10:35",user:"J. Walsh",action:"Submitted SitRep #9 (Draft)","module":"Reporting",ip:"203.26.xxx.xx"},
    {time:"30 Mar 10:15",user:"System",action:"Fatigue threshold alert triggered for K. Wong","module":"Deployment",ip:"—"},
    {time:"30 Mar 09:45",user:"S. Patel",action:"Approved EOI — Ben Harper (Management Support)","module":"People",ip:"203.12.xxx.xx"},
    {time:"30 Mar 09:30",user:"M. Sullivan",action:"Logged welfare contact — CREW2 team check","module":"Deployment",ip:"192.168.xxx.xx"},
    {time:"30 Mar 09:00",user:"R. Kimura",action:"Updated rotation schedule — CREW2","module":"Deployment",ip:"192.168.xxx.xx"},
    {time:"29 Mar 18:30",user:"D. Thornton",action:"Submitted claim CLM-2025-0891 ($52.40 AUD)","module":"Finance",ip:"10.0.xxx.xx"},
    {time:"29 Mar 16:00",user:"M. Sullivan",action:"I/I/I investigation commenced — D. Kang","module":"Safety",ip:"192.168.xxx.xx"},
    {time:"29 Mar 15:20",user:"M. Sullivan",action:"Acknowledged I/I/I self-report","module":"Safety",ip:"192.168.xxx.xx"},
    {time:"29 Mar 14:45",user:"System",action:"AREP notified of I/I/I report","module":"Safety",ip:"—"},
    {time:"29 Mar 14:30",user:"D. Kang",action:"Filed I/I/I self-report — Injury (minor)","module":"Safety",ip:"10.0.xxx.xx"},
  ];

  return<Card>
    <div style={{display:"flex",gap:8,marginBottom:14}}>
      <div style={{flex:1,padding:"8px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:12.5,color:T.g500}}>🔍 Search audit log...</div>
      <Btn v="secondary" s={{fontSize:11}}>Filter</Btn>
    </div>
    <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Timestamp</TH><TH>User</TH><TH>Action</TH><TH>Module</TH><TH>Source IP</TH></tr></thead>
      <tbody>{logs.map((l,i)=><tr key={i}>
        <TD mono s={{fontSize:11,color:T.g500,whiteSpace:"nowrap"}}>{l.time}</TD>
        <TD fw={550}>{l.user}</TD>
        <TD>{l.action}</TD>
        <TD><Chip color={l.module==="Safety"?"coral":l.module==="Finance"?"orange":l.module==="Deployment"?"blue":"teal"}>{l.module}</Chip></TD>
        <TD mono s={{fontSize:10.5,color:T.g400}}>{l.ip}</TD>
      </tr>)}</tbody>
    </table>
    <div style={{marginTop:12,display:"flex",justifyContent:"space-between",fontSize:12,color:T.g500}}>
      <span>Showing 1–10 of 142 entries</span>
      <span>14-day retention · Compliant with AFAC audit requirements</span>
    </div>
  </Card>;
}

function Integrations(){
  const systems=[
    {name:"AFAC Emergency Portal",type:"Authentication","status":"Connected",health:"Healthy",last:"30 Mar 10:00",c:"green",desc:"SSO and role federation for AFAC member agencies"},
    {name:"Bureau of Meteorology API",type:"Data Feed","status":"Connected",health:"Healthy",last:"30 Mar 10:30",c:"green",desc:"Weather data, fire danger ratings, and warnings integration"},
    {name:"Agency HR Systems",type:"Data Sync","status":"Connected",health:"Degraded",last:"29 Mar 22:00",c:"orange",desc:"Personnel record synchronisation with member agency HR platforms"},
    {name:"NAFC Aviation Registry",type:"Data Feed","status":"Connected",health:"Healthy",last:"30 Mar 09:00",c:"green",desc:"National aerial firefighting asset registry and availability"},
    {name:"Financial Reconciliation",type:"Export","status":"Configured",health:"Standby",last:"28 Mar 14:00",c:"blue",desc:"Invoice and reconciliation export to jurisdiction billing systems"},
    {name:"Email / Notification Gateway",type:"Messaging","status":"Connected",health:"Healthy",last:"30 Mar 10:35",c:"green",desc:"Email notifications, SitRep distribution, and alert messaging"},
    {name:"Geospatial Services",type:"Map Data","status":"Placeholder",health:"Not configured",last:"—",c:"gray",desc:"Mapping layers, incident boundaries, and resource locations"},
    {name:"Document Management",type:"Storage","status":"Placeholder",health:"Not configured",last:"—",c:"gray",desc:"Document storage, version control, and retention management"},
  ];

  return<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
    {systems.map((sys,i)=><Card key={i} title={<span>{sys.name} <Chip color={sys.c}>{sys.health}</Chip></span>}>
      <div style={{fontSize:12.5,color:T.g600,marginBottom:10}}>{sys.desc}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 14px",fontSize:12}}>
        {[["Type",sys.type],["Status",sys.status],["Last sync",sys.last]].map(([k,v],ki)=><div key={ki}><span style={{color:T.g400,fontSize:10.5}}>{k}</span><div style={{fontWeight:550}}>{v}</div></div>)}
      </div>
      <div style={{marginTop:10,display:"flex",gap:6}}>
        <Btn v="secondary" s={{padding:"3px 10px",fontSize:11}}>{sys.status==="Placeholder"?"Configure":"Test Connection"}</Btn>
        {sys.status!=="Placeholder"&&<Btn v="ghost" s={{padding:"3px 10px",fontSize:11}}>View logs</Btn>}
      </div>
    </Card>)}
  </div>;
}

function SystemConfig(){
  const settings=[
    {group:"Deployment Rules",items:[
      {label:"Maximum deployment duration",value:"14 days",desc:"Default max days before mandatory rotation"},
      {label:"Fatigue threshold",value:"5 consecutive work days",desc:"Alert trigger for consecutive work days without rest"},
      {label:"Claims review window",value:"14 days",desc:"Agency review SLA before escalation"},
      {label:"Auto-close window",value:"70 days",desc:"No-response automation for unactioned claims"},
      {label:"Rotation notice period",value:"72 hours",desc:"Minimum notice for inbound/outbound rotation planning"},
    ]},
    {group:"Notification Preferences",items:[
      {label:"I/I/I report filed",value:"Immediate",desc:"AREP, DM, Agency, NRSC Duty Officer"},
      {label:"Fatigue threshold reached",value:"Immediate",desc:"DM, AREP, Agency Coordinator"},
      {label:"Rotation gap identified",value:"4 hours",desc:"NRSC Operations, Agency Coordinator"},
      {label:"Claim submitted",value:"Daily digest",desc:"Agency reviewer queue"},
      {label:"SitRep submitted",value:"Immediate",desc:"Distribution list per deployment"},
    ]},
    {group:"Data Retention",items:[
      {label:"Audit log retention",value:"7 years",desc:"Compliant with AFAC governance framework"},
      {label:"Deployment records",value:"10 years",desc:"Person deployment history and linked records"},
      {label:"Financial records",value:"7 years",desc:"Claims, invoices, reconciliation packs"},
      {label:"I/I/I reports",value:"10 years",desc:"Safety records with full investigation chain"},
    ]},
  ];

  return<div>
    {settings.map((g,gi)=><Card key={gi} title={g.group} s={{marginBottom:16}}>
      {g.items.map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"10px 0",borderBottom:i<g.items.length-1?`1px solid ${T.g100}`:"none"}}>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:600}}>{item.label}</div>
          <div style={{fontSize:11.5,color:T.g500,marginTop:1}}>{item.desc}</div>
        </div>
        <div style={{padding:"6px 14px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:12.5,fontWeight:550,minWidth:120,textAlign:"center"}}>{item.value}</div>
        <Btn v="ghost" s={{padding:"4px 10px",fontSize:11}}>Edit</Btn>
      </div>)}
    </Card>)}
    <div style={{padding:"14px 18px",background:T.blueL,borderRadius:8,border:`1px solid ${T.blue}20`,fontSize:12.5,color:T.blue}}>
      <strong>Note:</strong> System configuration changes are logged to the audit trail and require NRSC Operations or System Administrator role. Changes take effect immediately unless noted otherwise.
    </div>
  </div>;
}
