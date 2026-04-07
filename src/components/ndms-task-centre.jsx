import { useState } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all .12s"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const Avatar=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const Badge=({label,color})=><span style={{padding:"3px 10px",borderRadius:4,fontSize:11,fontWeight:600,background:{green:T.greenL,blue:T.blueL,orange:T.orangeL,coral:T.coralL,teal:T.tealL}[color]||T.g100,color:{green:"#5a8a1f",blue:T.blue,orange:"#c06e15",coral:T.coral,teal:"#148895"}[color]||T.g600}}>{label}</span>;

/* ═══════════════════════════════════════════════════
   SHARED APPROVAL TIMELINE COMPONENT
   One visual grammar for all approval flows (P0)
   ═══════════════════════════════════════════════════ */
export function ApprovalTimeline({steps}){
  return<div style={{display:"flex",flexDirection:"column",gap:0}}>
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
  </div>;
}

/* ═══════════════════════════════════════════════════
   DEPLOYMENT 360 — RECORD SPINE (P0)
   Shows full chain: Person → Request → Order → Contingent
   → Manifest → Movement → Deployment → SitRep → Claim → NAA
   ═══════════════════════════════════════════════════ */
export function Deployment360(){
  const chain=[
    {type:"Person",id:"Daniel Thornton",sub:"NSW RFS · Crew Leader",color:T.blue},
    {type:"Request",id:"2025_26_007NT_NSW001",sub:"NT → NSW · Interstate",color:T.teal},
    {type:"Order",id:"ORD-2025-0047",sub:"Sub-order D: CREW2",color:T.navy},
    {type:"Contingent",id:"CREW2",sub:"6 personnel · Storm Ops",color:T.green},
    {type:"Manifest",id:"MAN-0047-C2",sub:"SYD → DRW · VA1417",color:T.orange},
    {type:"Movement",id:"In Field",sub:"Lismore, NSW · Day 8",color:T.blue},
    {type:"Deployment",id:"Northern Rivers Flood Response",sub:"64 deployed · Active",color:T.green},
    {type:"SitRep",id:"SITREP-NT-2025-009",sub:"Draft · 30 Mar 2026",color:T.teal},
    {type:"Claim",id:"CLM-2025-0891",sub:"$52.40 AUD · Pending",color:T.orange},
  ];

  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Deployment 360 — Record Spine</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Daniel Thornton · Northern Rivers Flood Response · Full deployment record chain</p></div>

    {/* Horizontal spine */}
    <Card s={{marginBottom:20}}>
      <div style={{display:"flex",alignItems:"center",gap:0,overflowX:"auto",padding:"8px 0"}}>
        {chain.map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",flexShrink:0}}>
          <div style={{padding:"10px 16px",border:`2px solid ${c.color}20`,borderRadius:8,background:T.white,cursor:"pointer",minWidth:120,transition:"all .12s"}}>
            <div style={{fontSize:10,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5}}>{c.type}</div>
            <div style={{fontSize:12.5,fontWeight:650,marginTop:2,fontFamily:c.type==="Request"||c.type==="Order"||c.type==="Manifest"||c.type==="Claim"||c.type==="SitRep"?"'DM Mono',monospace":"inherit",fontSize:c.type==="Request"||c.type==="Claim"?11:12.5}}>{c.id}</div>
            <div style={{fontSize:10.5,color:T.g500,marginTop:1}}>{c.sub}</div>
          </div>
          {i<chain.length-1&&<div style={{width:20,height:2,background:T.g300,flexShrink:0}}/>}
        </div>)}
      </div>
    </Card>

    {/* Detail panels */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
      <Card title="Person Record" right={<Chip color="blue">In Field</Chip>}>
        {[["Name","Daniel Thornton"],["Agency","NSW Rural Fire Service"],["System Role","Team Member"],["Deployment Role","Crew Leader"],["Jurisdiction","NSW"],["Readiness","Interstate Ready (85%)"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12.5,borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550}}>{v}</span></div>)}
      </Card>
      <Card title="Request & Order" right={<Chip color="green">Deployed</Chip>}>
        {[["Request","2025_26_007NT_NSW001"],["Type","Interstate"],["Route","NT → NSW"],["Order","ORD-2025-0047"],["Sub-order","D: CREW2 Storm Ops"],["Filled","18/18 (100%)"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12.5,borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550,fontFamily:k==="Request"||k==="Order"?"'DM Mono',monospace":"inherit",fontSize:k==="Request"?11:12.5}}>{v}</span></div>)}
      </Card>
      <Card title="Approval History">
        <ApprovalTimeline steps={[
          {label:"Request Created",actor:"J. Walsh (NRSC)",timestamp:"14 Mar 09:15",done:true},
          {label:"Order Generated",actor:"System",timestamp:"14 Mar 11:00",done:true},
          {label:"Agency Nominated",actor:"S. Patel (NSW RFS)",timestamp:"16 Mar 10:00",done:true},
          {label:"Deployment Commenced",actor:"System",timestamp:"22 Mar 06:00",done:true},
          {label:"SitRep #9 Draft",actor:"J. Walsh",timestamp:"30 Mar 10:30",active:true,nextAction:"Submit SitRep"},
        ]}/>
      </Card>
    </div>

    {/* Linked records */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginTop:16}}>
      <Card title="Linked Claims" right={<span style={{fontSize:12,color:T.g500}}>8 claims</span>}>
        {[
          {id:"CLM-2025-0891",date:"29 Mar",cat:"Meal",amt:"$52.40",status:"Pending",c:"orange"},
          {id:"CLM-2025-0885",date:"28 Mar",cat:"Transport",amt:"$34.00",status:"Pending",c:"orange"},
          {id:"CLM-2025-0862",date:"25 Mar",cat:"Meal",amt:"$47.50",status:"Approved",c:"green"},
        ].map((cl,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.g500,width:110}}>{cl.id}</span>
          <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:550}}>{cl.cat} — {cl.date}</div></div>
          <span style={{fontSize:12.5,fontWeight:650}}>{cl.amt}</span>
          <Chip color={cl.c}>{cl.status}</Chip>
        </div>)}
      </Card>
      <Card title="Linked SitReps" right={<span style={{fontSize:12,color:T.g500}}>9 reports</span>}>
        {[
          {id:"SITREP-NT-2025-009",title:"SitRep #9",date:"30 Mar",status:"Draft",c:"orange"},
          {id:"SITREP-NT-2025-008",title:"SitRep #8",date:"29 Mar",status:"Submitted",c:"green"},
          {id:"SITREP-NT-2025-007",title:"SitRep #7",date:"28 Mar",status:"Submitted",c:"green"},
        ].map((sr,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.g500,width:140}}>{sr.id}</span>
          <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:550}}>{sr.title} — {sr.date}</div></div>
          <Chip color={sr.c}>{sr.status}</Chip>
        </div>)}
      </Card>
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════
   UNIFIED TASK CENTRE (P1)
   Role-based work queue aggregating all pending actions
   ═══════════════════════════════════════════════════ */
export function TaskCentre(){
  const[filter,setFilter]=useState("All");
  const tasks=[
    {id:1,type:"Approval",icon:"✓",bg:T.greenL,fg:T.green,title:"EOI Approval — Ben Harper",sub:"New EOI · Management Support Officer · NSW RFS",urgency:"Medium",time:"8d pending",category:"EOI"},
    {id:2,type:"Approval",icon:"✓",bg:T.greenL,fg:T.green,title:"Role Change — Tom Briggs",sub:"Flood Ops → Crew Leader · Northern Rivers Flood · CREW2",urgency:"High",time:"2d pending",category:"Role Change"},
    {id:3,type:"Exception",icon:"⚠",bg:T.coralL,fg:T.coral,title:"Rotation Gap — DM Replacement",sub:"Northern Rivers Flood · Rachel Kim demobilising 1 Apr · No replacement sourced",urgency:"Critical",time:"1d remaining",category:"Rotation"},
    {id:4,type:"Exception",icon:"⏱",bg:T.orangeL,fg:T.orange,title:"Fatigue Threshold — Karen Wong",sub:"Northern Rivers Flood · CREW2 · 9 consecutive work days",urgency:"High",time:"Active",category:"Fatigue"},
    {id:5,type:"I/I/I",icon:"🔴",bg:T.coralL,fg:T.coral,title:"I/I/I Investigation — David Kang",sub:"Canada 2025 · IMT1 · Injury — investigation commenced",urgency:"Critical",time:"1d active",category:"I/I/I"},
    {id:6,type:"Finance",icon:"$",bg:T.orangeL,fg:T.orange,title:"7 Claims Past Review Window",sub:"Agency review overdue · 14-day SLA exceeded",urgency:"Medium",time:"1d+ overdue",category:"Claims"},
    {id:7,type:"Aviation",icon:"✈",bg:T.blueL,fg:T.blue,title:"NAA Request — NLAT QLD Resupply",sub:"NAA-2025-0019 · Non-Urgent · Awaiting DM sign-off",urgency:"Medium",time:"4h pending",category:"Aviation"},
    {id:8,type:"Aviation",icon:"✈",bg:T.orangeL,fg:T.orange,title:"NAA Extension — NHAWK (SA)",sub:"NAA-2025-0017-E1 · 3-day extension requested",urgency:"Medium",time:"2h pending",category:"Aviation"},
    {id:9,type:"Approval",icon:"✓",bg:T.tealL,fg:T.teal,title:"International Readiness — Alice Nguyễn",sub:"Passport & eTA uploaded · NSW RFS · Pending review",urgency:"Low",time:"3d pending",category:"EOI"},
    {id:10,type:"Exception",icon:"⚠",bg:T.orangeL,fg:T.orange,title:"Expiring Credentials — 7 Personnel",sub:"WWCC, medical fitness expiring within 30 days across 3 agencies",urgency:"Medium",time:"Ongoing",category:"Credentials"},
  ];
  const filters=["All","Approvals","Exceptions","I/I/I","Finance","Aviation"];
  const filtered=filter==="All"?tasks:tasks.filter(t=>
    filter==="Approvals"?t.type==="Approval":
    filter==="Exceptions"?t.type==="Exception":
    filter==="I/I/I"?t.type==="I/I/I":
    filter==="Finance"?t.type==="Finance":
    filter==="Aviation"?t.type==="Aviation":true
  );
  const urgencyColor=u=>u==="Critical"?"coral":u==="High"?"orange":u==="Medium"?"blue":"gray";

  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Task Centre</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Unified work queue — all pending actions across NDMS capabilities</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="secondary">Export</Btn><Btn v="primary">Assign Tasks</Btn></div>
    </div>

    {/* Summary strip */}
    <div style={{display:"flex",gap:10,marginBottom:18}}>
      {[{l:"Critical",v:2,c:T.coral},{l:"High",v:2,c:T.orange},{l:"Medium",v:5,c:T.blue},{l:"Low",v:1,c:T.g500}].map((s,i)=><div key={i} style={{flex:1,background:T.white,border:`1px solid ${T.g200}`,borderRadius:6,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:s.c}}/><span style={{fontSize:12,color:T.g600}}>{s.l}</span><span style={{marginLeft:"auto",fontWeight:700,fontSize:15}}>{s.v}</span>
      </div>)}
    </div>

    {/* Filters */}
    <div style={{display:"flex",gap:6,marginBottom:16}}>{filters.map(f=><span key={f} onClick={()=>setFilter(f)} style={{padding:"4px 14px",borderRadius:20,fontSize:11.5,fontWeight:550,border:`1px solid ${filter===f?T.blue:T.g300}`,background:filter===f?T.blue:T.white,color:filter===f?T.white:T.g600,cursor:"pointer",transition:"all .1s"}}>{f}</span>)}</div>

    {/* Task list */}
    <Card>
      {filtered.map((task,i)=><div key={task.id} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 0",borderBottom:i<filtered.length-1?`1px solid ${T.g100}`:"none",cursor:"pointer"}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:task.bg,color:task.fg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,flexShrink:0}}>{task.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:13.5,fontWeight:600}}>{task.title}</div>
          <div style={{fontSize:12,color:T.g500,marginTop:1}}>{task.sub}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
          <Chip color={urgencyColor(task.urgency)}>{task.urgency}</Chip>
          <span style={{fontSize:11,color:T.g400}}>{task.time}</span>
        </div>
        <Btn v="secondary" s={{padding:"5px 12px",fontSize:11}}>Action →</Btn>
      </div>)}
    </Card>
  </div>;
}

export default TaskCentre;
