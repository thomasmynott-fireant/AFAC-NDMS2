import { useState, useEffect } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",white:"#FFFFFF"};

const Chip=({color,children,s})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg,...s}}><span style={{width:5,height:5,borderRadius:"50%",background:c.fg}}/>{children}</span>};

const SCREENS=[
  {id:"home",label:"Home",icon:"🏠"},
  {id:"offline",label:"Offline Queue",icon:"📡"},
  {id:"actions",label:"Field Actions",icon:"⚡"},
  {id:"dashboard",label:"Dashboard",icon:"📊"},
  {id:"approvals",label:"Approvals",icon:"✓"},
];

export default function C6Mobile(){
  const[screen,setScreen]=useState("home");
  const[m,setM]=useState(false);
  useEffect(()=>setM(true),[]);
  const R={"home":<MobileHome/>,"offline":<OfflineQueue/>,"actions":<FieldActions/>,"dashboard":<MobileDash/>,"approvals":<MobileApprovals/>};

  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:T.navy,fontSize:14,lineHeight:1.5,WebkitFontSmoothing:"antialiased",opacity:m?1:0,transition:"opacity .3s",background:T.g100,alignItems:"center",justifyContent:"center",gap:32}}>
      {/* Navigation sidebar */}
      <div style={{width:200,flexShrink:0}}>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>NDMS Mobile</div>
          <div style={{fontSize:12,color:T.g500}}>Capability 6 — Companion App</div>
        </div>
        {SCREENS.map(s=><div key={s.id} onClick={()=>setScreen(s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,cursor:"pointer",background:screen===s.id?"#fff":"transparent",border:screen===s.id?`1px solid ${T.g200}`:"1px solid transparent",marginBottom:4,fontWeight:screen===s.id?650:450,color:screen===s.id?T.navy:T.g600,fontSize:13,boxShadow:screen===s.id?"0 1px 3px rgba(0,0,0,.06)":"none"}}>
          <span style={{fontSize:16}}>{s.icon}</span>{s.label}
        </div>)}
        <div style={{marginTop:20,padding:14,background:"#fff",borderRadius:8,border:`1px solid ${T.g200}`}}>
          <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Viewing as</div>
          <div style={{fontSize:13,fontWeight:600}}>Daniel Thornton</div>
          <div style={{fontSize:11.5,color:T.g500}}>Team Member · NSW RFS</div>
        </div>
      </div>

      {/* Phone frame */}
      <div style={{width:375,height:812,borderRadius:40,background:"#000",padding:8,boxShadow:"0 20px 60px rgba(0,0,0,.25)",flexShrink:0,position:"relative"}}>
        {/* Notch */}
        <div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",width:150,height:28,background:"#000",borderRadius:"0 0 20px 20px",zIndex:10}}/>
        {/* Screen */}
        <div style={{width:"100%",height:"100%",borderRadius:32,overflow:"hidden",background:T.g50,display:"flex",flexDirection:"column"}}>
          {/* Status bar */}
          <div style={{height:48,background:T.navy,display:"flex",alignItems:"flex-end",justifyContent:"space-between",padding:"0 24px 8px",flexShrink:0}}>
            <span style={{color:"#fff",fontSize:11,fontWeight:600}}>9:41</span>
            <div style={{display:"flex",gap:4,alignItems:"center"}}>
              <span style={{color:"#fff",fontSize:10}}>5G</span>
              <div style={{display:"flex",gap:1}}>{[7,9,11,14].map((h,i)=><div key={i} style={{width:3,height:h,background:"#fff",borderRadius:1}}/>)}</div>
              <div style={{width:22,height:11,border:"1px solid #fff",borderRadius:3,position:"relative",marginLeft:2}}><div style={{position:"absolute",left:1,top:1,bottom:1,width:"70%",background:T.green,borderRadius:1}}/></div>
            </div>
          </div>

          {/* Content */}
          <div style={{flex:1,overflowY:"auto"}} key={screen}>{R[screen]}</div>

          {/* Bottom nav */}
          <div style={{height:80,background:"#fff",borderTop:`1px solid ${T.g200}`,display:"flex",alignItems:"flex-start",paddingTop:6,flexShrink:0}}>
            {SCREENS.map(s=><div key={s.id} onClick={()=>setScreen(s.id)} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",paddingTop:4}}>
              <span style={{fontSize:20,opacity:screen===s.id?1:.4}}>{s.icon}</span>
              <span style={{fontSize:9.5,fontWeight:screen===s.id?650:450,color:screen===s.id?T.blue:T.g500}}>{s.label}</span>
            </div>)}
          </div>
        </div>
      </div>

      {/* Annotations */}
      <div style={{width:220,flexShrink:0}}>
        <div style={{padding:14,background:"#fff",borderRadius:8,border:`1px solid ${T.g200}`,marginBottom:12}}>
          <div style={{fontSize:12,fontWeight:650,marginBottom:6}}>Design Notes</div>
          <div style={{fontSize:11.5,color:T.g600,lineHeight:1.6}}>
            {screen==="home"&&"Role-based quick-start with open tasks, sync state, and favourites. Larger tap targets for field use."}
            {screen==="offline"&&"Offline queue proves field readiness. Shows pending sync items, conflicts, and last sync time."}
            {screen==="actions"&&"Fast-entry mode for fatigue, incident, contact, claims. Camera capture for receipts."}
            {screen==="dashboard"&&"Simplified card-based dashboard with map and filtered summaries for visibility mode."}
            {screen==="approvals"&&"Audit-safe approval flow with confirm steps, notes, and governance trail."}
          </div>
        </div>
        <div style={{padding:14,background:T.blueL,borderRadius:8,border:`1px solid ${T.blue}20`}}>
          <div style={{fontSize:11,fontWeight:600,color:T.blue,marginBottom:4}}>Mobile-specific</div>
          <div style={{fontSize:11,color:T.g600,lineHeight:1.6}}>Touch-optimised · Progressive disclosure · Offline-first · Camera capture · Bottom navigation</div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile Home ── */
function MobileHome(){
  return<div>
    {/* Header */}
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div><div style={{color:"#fff",fontSize:17,fontWeight:700}}>Good morning, Daniel</div><div style={{color:"rgba(255,255,255,.5)",fontSize:12}}>NT Cyclone Response · Day 8</div></div>
        <div style={{width:36,height:36,borderRadius:"50%",background:T.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700}}>DT</div>
      </div>
      {/* Sync status */}
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:"rgba(255,255,255,.08)",borderRadius:8}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:T.green}}/>
        <span style={{color:"rgba(255,255,255,.7)",fontSize:12}}>Connected · Last sync 2 min ago</span>
      </div>
    </div>

    <div style={{padding:"16px 16px 20px"}}>
      {/* Open tasks */}
      <div style={{fontSize:13,fontWeight:650,marginBottom:10}}>Open Tasks</div>
      {[
        {icon:"⚠",bg:T.orangeL,fg:T.orange,title:"WWCC expiring in 3 days",sub:"Upload renewed document"},
        {icon:"📎",bg:T.blueL,fg:T.blue,title:"Upload passport",sub:"Required for international readiness"},
      ].map((t,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:14,background:"#fff",borderRadius:10,marginBottom:8,border:`1px solid ${T.g200}`}}>
        <div style={{width:36,height:36,borderRadius:10,background:t.bg,color:t.fg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{t.icon}</div>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{t.title}</div><div style={{fontSize:11.5,color:T.g500}}>{t.sub}</div></div>
        <span style={{color:T.g400,fontSize:18}}>›</span>
      </div>)}

      {/* Quick actions */}
      <div style={{fontSize:13,fontWeight:650,marginTop:16,marginBottom:10}}>Quick Actions</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[{icon:"⚠",label:"Report Incident",bg:T.coralL},{icon:"💰",label:"Submit Claim",bg:T.blueL},{icon:"📋",label:"Log Fatigue",bg:T.tealL},{icon:"📸",label:"Capture Receipt",bg:T.orangeL}].map((a,i)=><div key={i} style={{padding:16,background:"#fff",border:`1px solid ${T.g200}`,borderRadius:10,textAlign:"center",cursor:"pointer"}}>
          <div style={{width:44,height:44,borderRadius:12,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,margin:"0 auto 8px"}}>{a.icon}</div>
          <div style={{fontSize:12,fontWeight:600}}>{a.label}</div>
        </div>)}
      </div>

      {/* Deployment card */}
      <div style={{fontSize:13,fontWeight:650,marginTop:16,marginBottom:10}}>Current Deployment</div>
      <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:10,padding:14}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
          <span style={{fontSize:14,fontWeight:650}}>NT Cyclone Response</span>
          <Chip color="blue">Day 8</Chip>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 14px",fontSize:12}}>
          {[["Role","Crew Leader"],["Location","Darwin, NT"],["Contingent","CREW2"],["Status","Working"]].map(([k,v],i)=><div key={i}><span style={{color:T.g400,fontSize:10.5}}>{k}</span><div style={{fontWeight:550}}>{v}</div></div>)}
        </div>
        {/* Mini fatigue */}
        <div style={{display:"flex",gap:2,marginTop:10}}>
          {["W","W","R","W","W","R","W","✦"].map((d,i)=><div key={i} style={{flex:1,height:20,borderRadius:3,background:d==="R"?T.teal:d==="✦"?T.green:T.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700}}>{d}</div>)}
        </div>
      </div>

      {/* Notifications */}
      <div style={{fontSize:13,fontWeight:650,marginTop:16,marginBottom:10}}>Notifications</div>
      {[
        {title:"Rotation update",body:"Extended to 5 Apr 2026",time:"Yesterday",unread:true},
        {title:"Claim approved",body:"$47.50 meal — 25 Mar",time:"27 Mar",unread:false},
      ].map((n,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 14px",background:"#fff",borderRadius:10,marginBottom:6,border:`1px solid ${T.g200}`}}>
        {n.unread&&<div style={{width:8,height:8,borderRadius:"50%",background:T.blue,marginTop:4,flexShrink:0}}/>}
        <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:600}}>{n.title}</div><div style={{fontSize:11.5,color:T.g500}}>{n.body}</div></div>
        <span style={{fontSize:10.5,color:T.g400}}>{n.time}</span>
      </div>)}
    </div>
  </div>;
}

/* ── Offline Queue ── */
function OfflineQueue(){
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700,marginBottom:8}}>Offline Queue</div>
      {/* Offline banner */}
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px",background:"rgba(240,138,39,.15)",borderRadius:8,border:"1px solid rgba(240,138,39,.3)"}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:T.orange}}/>
        <div><div style={{color:T.orange,fontSize:12,fontWeight:600}}>Limited Connectivity</div><div style={{color:"rgba(255,255,255,.5)",fontSize:11}}>Last successful sync: 30 Mar 08:15</div></div>
      </div>
    </div>

    <div style={{padding:"16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:650}}>Pending Sync Items</span>
        <Chip color="orange">3 items</Chip>
      </div>

      {[
        {icon:"📋",title:"Fatigue entry — 30 Mar",sub:"Working day logged at 08:00",status:"Queued",c:"orange"},
        {icon:"📸",title:"Receipt capture",sub:"receipt_lunch_30mar.jpg (2.1 MB)",status:"Queued",c:"orange"},
        {icon:"💰",title:"Claim draft — Lunch",sub:"$38.50 AUD · Meal category",status:"Draft saved",c:"blue"},
      ].map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:14,background:"#fff",borderRadius:10,marginBottom:8,border:`1px solid ${T.g200}`}}>
        <div style={{width:40,height:40,borderRadius:10,background:T.orangeL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{item.icon}</div>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{item.title}</div><div style={{fontSize:11.5,color:T.g500}}>{item.sub}</div></div>
        <Chip color={item.c}>{item.status}</Chip>
      </div>)}

      {/* Sync button */}
      <div style={{padding:14,background:T.blueL,borderRadius:10,textAlign:"center",marginTop:12,cursor:"pointer",border:`1px solid ${T.blue}30`}}>
        <div style={{fontSize:14,fontWeight:650,color:T.blue}}>🔄 Retry Sync Now</div>
        <div style={{fontSize:11.5,color:T.g500,marginTop:2}}>3 items will be uploaded when connection resumes</div>
      </div>

      {/* Sync history */}
      <div style={{fontSize:13,fontWeight:650,marginTop:20,marginBottom:10}}>Sync History</div>
      {[
        {time:"08:15",status:"Success",items:"2 items synced",c:"green"},
        {time:"07:30",status:"Success",items:"1 item synced",c:"green"},
        {time:"06:00",status:"Failed",items:"Network timeout",c:"coral"},
      ].map((h,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:8,marginBottom:6,border:`1px solid ${T.g200}`}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:{green:T.green,coral:T.coral}[h.c]}}/>
        <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:550}}>{h.items}</div></div>
        <span style={{fontSize:11,color:T.g400}}>Today {h.time}</span>
        <Chip color={h.c} s={{fontSize:10}}>{h.status}</Chip>
      </div>)}

      {/* Conflict */}
      <div style={{marginTop:12,padding:14,background:T.coralL,borderRadius:10,border:`1px solid ${T.coral}30`}}>
        <div style={{fontSize:12.5,fontWeight:650,color:T.coral,marginBottom:4}}>⚠ Sync Conflict</div>
        <div style={{fontSize:12,color:T.g600}}>Fatigue entry for 29 Mar was updated on server by AREP. Review and resolve before next sync.</div>
        <div style={{marginTop:8,padding:"8px 14px",background:"#fff",borderRadius:6,textAlign:"center",fontSize:12,fontWeight:600,color:T.coral,cursor:"pointer"}}>Resolve Conflict</div>
      </div>
    </div>
  </div>;
}

/* ── Field Actions Hub ── */
function FieldActions(){
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Field Actions</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Quick-entry mode for field operations</div>
    </div>
    <div style={{padding:16}}>
      {/* Action buttons - large touch targets */}
      {[
        {icon:"📋",title:"Log Fatigue Status",desc:"Record today's work/rest status",bg:T.blueL,border:T.blue},
        {icon:"⚠",title:"Report Incident (I/I/I)",desc:"Illness, injury, or incident self-report",bg:T.coralL,border:T.coral},
        {icon:"👤",title:"Log Welfare Contact",desc:"Record welfare check or team contact",bg:T.tealL,border:T.teal},
        {icon:"💰",title:"Submit Expense Claim",desc:"New claim with receipt capture",bg:T.orangeL,border:T.orange},
        {icon:"📸",title:"Capture Attachment",desc:"Photo or document for any workflow",bg:T.greenL,border:T.green},
      ].map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:16,background:"#fff",borderRadius:12,marginBottom:10,border:`1px solid ${T.g200}`,borderLeft:`4px solid ${a.border}`,cursor:"pointer"}}>
        <div style={{width:48,height:48,borderRadius:12,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{a.icon}</div>
        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:650}}>{a.title}</div><div style={{fontSize:12,color:T.g500,marginTop:2}}>{a.desc}</div></div>
        <span style={{color:T.g400,fontSize:22}}>›</span>
      </div>)}

      {/* Quick claim form */}
      <div style={{fontSize:13,fontWeight:650,marginTop:16,marginBottom:10}}>Quick Claim Form</div>
      <div style={{background:"#fff",borderRadius:12,border:`1px solid ${T.g200}`,padding:16}}>
        {[["Category","Meal"],["Amount",""],["Currency","AUD"]].map(([l,v],i)=><div key={i} style={{marginBottom:12}}>
          <label style={{fontSize:11.5,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>{l}</label>
          <div style={{padding:"10px 14px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:8,fontSize:14,minHeight:20}}>{v}</div>
        </div>)}
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1,padding:"12px",background:T.blueL,borderRadius:8,textAlign:"center",cursor:"pointer",border:`1px solid ${T.blue}30`}}>
            <div style={{fontSize:18}}>📸</div>
            <div style={{fontSize:11,fontWeight:600,color:T.blue,marginTop:2}}>Take Photo</div>
          </div>
          <div style={{flex:1,padding:"12px",background:T.g100,borderRadius:8,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:18}}>📎</div>
            <div style={{fontSize:11,fontWeight:600,color:T.g600,marginTop:2}}>Attach File</div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ── Mobile Dashboard ── */
function MobileDash(){
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Dashboard</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>NT Cyclone Response overview</div>
    </div>
    <div style={{padding:16}}>
      {/* Summary cards */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {[{l:"Deployed",v:"64",c:T.blue},{l:"Working",v:"48",c:T.green},{l:"Resting",v:"12",c:T.teal},{l:"Issues",v:"3",c:T.coral}].map((m,i)=><div key={i} style={{background:"#fff",borderRadius:10,padding:"14px",border:`1px solid ${T.g200}`,textAlign:"center"}}>
          <div style={{fontSize:22,fontWeight:700,color:m.c}}>{m.v}</div>
          <div style={{fontSize:11,color:T.g500,marginTop:2}}>{m.l}</div>
        </div>)}
      </div>

      {/* Mini map */}
      <div style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,overflow:"hidden",marginBottom:14}}>
        <div style={{height:140,background:`linear-gradient(170deg,${T.g100},#e0eef8 60%,#e8f0e4)`,position:"relative"}}>
          <svg viewBox="0 0 340 140" style={{width:"100%",height:"100%"}}>
            <circle cx="170" cy="50" r="8" fill={T.blue} stroke="#fff" strokeWidth="2.5"/>
            <text x="185" y="52" fontSize="10" fill={T.navy} fontWeight="600">Darwin (64)</text>
          </svg>
        </div>
        <div style={{padding:"10px 14px",display:"flex",justifyContent:"space-between",fontSize:11.5}}>
          <span style={{color:T.g500}}>Active deployments</span>
          <span style={{fontWeight:600}}>Darwin, NT</span>
        </div>
      </div>

      {/* Active issues */}
      <div style={{fontSize:13,fontWeight:650,marginBottom:10}}>Active Issues</div>
      {[
        {title:"Fatigue warning — K. Wong",sub:"9 consecutive work days",c:"orange"},
        {title:"Rotation gap — DM",sub:"Replacement needed by 1 Apr",c:"coral"},
        {title:"Claims overdue",sub:"3 past review window",c:"orange"},
      ].map((iss,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:"#fff",borderRadius:10,marginBottom:6,border:`1px solid ${T.g200}`}}>
        <Chip color={iss.c}>{iss.c==="coral"?"!":"⏱"}</Chip>
        <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:600}}>{iss.title}</div><div style={{fontSize:11,color:T.g500}}>{iss.sub}</div></div>
        <span style={{color:T.g400,fontSize:16}}>›</span>
      </div>)}

      {/* Contingent summary */}
      <div style={{fontSize:13,fontWeight:650,marginTop:16,marginBottom:10}}>My Contingent — CREW2</div>
      {[
        {name:"Daniel Thornton",status:"Working",day:8},
        {name:"Tom Briggs",status:"Resting",day:8},
        {name:"Karen Wong",status:"Working",day:8},
        {name:"Ben Taylor",status:"Working",day:8},
      ].map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",background:"#fff",borderRadius:8,marginBottom:4,border:`1px solid ${T.g200}`}}>
        <span style={{fontSize:13,fontWeight:600,flex:1}}>{p.name}</span>
        <Chip color={p.status==="Working"?"blue":"teal"}>{p.status}</Chip>
        <span style={{fontSize:11,color:T.g400}}>D{p.day}</span>
      </div>)}
    </div>
  </div>;
}

/* ── Mobile Approvals ── */
function MobileApprovals(){
  const[confirmed,setConfirmed]=useState(null);
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Approvals</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Agency Staff — pending review items</div>
    </div>
    <div style={{padding:16}}>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[{l:"Claims",count:3,active:true},{l:"EOIs",count:2},{l:"Role Changes",count:1}].map((t,i)=><div key={i} style={{flex:1,padding:"8px",background:t.active?"#fff":T.g100,borderRadius:8,textAlign:"center",border:t.active?`1px solid ${T.blue}`:`1px solid ${T.g200}`,cursor:"pointer"}}>
          <div style={{fontSize:16,fontWeight:700,color:t.active?T.blue:T.g500}}>{t.count}</div>
          <div style={{fontSize:10.5,fontWeight:550,color:t.active?T.blue:T.g500}}>{t.l}</div>
        </div>)}
      </div>

      {confirmed!==null?
        <div style={{textAlign:"center",padding:40}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:T.greenL,color:T.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 14px"}}>✓</div>
          <div style={{fontSize:16,fontWeight:650,marginBottom:4}}>Approved</div>
          <div style={{fontSize:13,color:T.g500}}>Claim CLM-2025-0891 has been approved. Audit trail updated.</div>
          <div style={{marginTop:16,padding:"10px 20px",background:T.blue,color:"#fff",borderRadius:8,display:"inline-block",fontSize:13,fontWeight:600,cursor:"pointer"}} onClick={()=>setConfirmed(null)}>Back to Queue</div>
        </div>
      :
        <>
          {[
            {id:"CLM-2025-0891",person:"Daniel Thornton",cat:"Meal",amt:"$52.40",cur:"AUD",date:"29 Mar"},
            {id:"CLM-2025-0892",person:"Tom Briggs",cat:"Sundries",amt:"$31.90",cur:"AUD",date:"29 Mar"},
            {id:"CLM-2025-0889",person:"Alice Nguyễn",cat:"Meal",amt:"C$62.30",cur:"CAD",date:"27 Mar"},
          ].map((cl,i)=><div key={i} style={{background:"#fff",borderRadius:12,border:`1px solid ${T.g200}`,padding:16,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div><div style={{fontSize:14,fontWeight:650}}>{cl.person}</div><div style={{fontSize:11.5,color:T.g500}}>{cl.cat} · {cl.date}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:16,fontWeight:700}}>{cl.amt}</div><div style={{fontSize:10.5,color:T.g400}}>{cl.cur}</div></div>
            </div>
            <div style={{fontSize:11,color:T.g500,fontFamily:"'DM Mono',monospace",marginBottom:10}}>{cl.id}</div>
            {/* Confirm step */}
            <div style={{display:"flex",gap:8}}>
              <div onClick={()=>setConfirmed(cl.id)} style={{flex:1,padding:"10px",background:T.greenL,borderRadius:8,textAlign:"center",cursor:"pointer",border:`1px solid ${T.green}30`}}>
                <span style={{fontSize:14,fontWeight:650,color:"#5a8a1f"}}>✓ Approve</span>
              </div>
              <div style={{flex:1,padding:"10px",background:T.coralL,borderRadius:8,textAlign:"center",cursor:"pointer",border:`1px solid ${T.coral}30`}}>
                <span style={{fontSize:14,fontWeight:650,color:T.coral}}>✕ Reject</span>
              </div>
            </div>
          </div>)}

          <div style={{marginTop:10,padding:12,background:T.g50,borderRadius:8,fontSize:11.5,color:T.g500,textAlign:"center"}}>
            All approval actions are audit-logged with timestamp, device, and user identity.
          </div>
        </>
      }
    </div>
  </div>;
}
