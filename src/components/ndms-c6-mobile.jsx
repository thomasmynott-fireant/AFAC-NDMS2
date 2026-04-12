import { useState, useEffect } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",white:"#FFFFFF"};

const Chip=({color,children,s})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg,...s}}><span style={{width:5,height:5,borderRadius:"50%",background:c.fg}}/>{children}</span>};

const TM_SCREENS=[
  {id:"home",label:"Home"},
  {id:"checkin",label:"Daily Check-In"},
  {id:"actions",label:"Field Actions"},
  {id:"iii",label:"I/I/I Report"},
  {id:"claims",label:"My Claims"},
];
const AREP_SCREENS=[
  {id:"arep-dash",label:"Dashboard"},
  {id:"arep-team",label:"My Team"},
  {id:"arep-sitrep",label:"SitReps"},
  {id:"arep-rolechange",label:"Role Changes"},
  {id:"arep-rfa",label:"Requests for Assist."},
];

export default function C6Mobile({onBackToDesktop}){
  const[screen,setScreen]=useState("home");
  const[mobileRole,setMobileRole]=useState("tm"); // "tm" or "arep"
  const[m,setM]=useState(false);
  useEffect(()=>setM(true),[]);

  const SCREENS=mobileRole==="tm"?TM_SCREENS:AREP_SCREENS;

  const tmRoutes={"home":<MobileHome/>,"checkin":<DailyCheckIn/>,"actions":<FieldActions/>,"iii":<IIISelfReport/>,"claims":<MobileClaims/>};
  const arepRoutes={"arep-dash":<AREPDashboard/>,"arep-team":<AREPMyTeam/>,"arep-sitrep":<AREPSitReps/>,"arep-rolechange":<AREPRoleChanges/>,"arep-rfa":<AREPRFA/>};
  const R=mobileRole==="tm"?tmRoutes:arepRoutes;

  const handleRoleSwitch=(r)=>{setMobileRole(r);setScreen(r==="tm"?"home":"arep-dash");};

  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:T.navy,fontSize:14,lineHeight:1.5,WebkitFontSmoothing:"antialiased",opacity:m?1:0,transition:"opacity .3s",background:T.g100,alignItems:"center",justifyContent:"center",gap:32}}>
      {/* Navigation sidebar */}
      <div style={{width:200,flexShrink:0}}>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:700,marginBottom:4}}>NDMS Mobile</div>
          <div style={{fontSize:12,color:T.g500}}>Capability 6 — Companion App</div>
        </div>
        {SCREENS.map(s=><div key={s.id} onClick={()=>setScreen(s.id)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:8,cursor:"pointer",background:screen===s.id?"#fff":"transparent",border:screen===s.id?`1px solid ${T.g200}`:"1px solid transparent",marginBottom:4,fontWeight:screen===s.id?650:450,color:screen===s.id?T.navy:T.g600,fontSize:13,boxShadow:screen===s.id?"0 1px 3px rgba(0,0,0,.06)":"none"}}>
          {s.label}
        </div>)}

        {/* Role switcher */}
        <div style={{marginTop:16,padding:10,background:"#fff",borderRadius:8,border:`1px solid ${T.g200}`}}>
          <div style={{fontSize:10,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Switch Role</div>
          <div style={{display:"flex",gap:4}}>
            {[{id:"tm",label:"Team Member"},{id:"arep",label:"AREP / Supervisor"}].map(r=>(
              <div key={r.id} onClick={()=>handleRoleSwitch(r.id)} style={{flex:1,padding:"6px 0",borderRadius:6,textAlign:"center",cursor:"pointer",fontSize:10.5,fontWeight:mobileRole===r.id?650:450,background:mobileRole===r.id?T.blueL:"transparent",color:mobileRole===r.id?T.blue:T.g500,border:`1px solid ${mobileRole===r.id?T.blue+"30":"transparent"}`}}>{r.label}</div>
            ))}
          </div>
        </div>

        <div style={{marginTop:10,padding:14,background:"#fff",borderRadius:8,border:`1px solid ${T.g200}`}}>
          <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Viewing as</div>
          <div style={{fontSize:13,fontWeight:600}}>{mobileRole==="tm"?"Daniel Thornton":"Mark Sullivan"}</div>
          <div style={{fontSize:11.5,color:T.g500}}>{mobileRole==="tm"?"Team Member · QLD QFES":"AREP · Northern Rivers"}</div>
        </div>
        {onBackToDesktop && <button onClick={onBackToDesktop} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",marginTop:12,padding:"9px 14px",background:T.navy,border:"none",borderRadius:8,color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Back to Desktop</button>}
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
          <div style={{height:56,background:"#fff",borderTop:`1px solid ${T.g200}`,display:"flex",alignItems:"center",flexShrink:0}}>
            {SCREENS.map(s=><div key={s.id} onClick={()=>setScreen(s.id)} style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:"8px 0"}}>
              <span style={{fontSize:10.5,fontWeight:screen===s.id?650:450,color:screen===s.id?T.blue:T.g500}}>{s.label}</span>
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
            {screen==="actions"&&"Fast-entry mode for fatigue, incident, contact, claims. Camera capture for receipts."}
            {screen==="claims"&&"Mobile-first claim submission with receipt capture, category selection, and status tracking."}
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
        <div><div style={{color:"#fff",fontSize:17,fontWeight:700}}>Good morning, Daniel</div><div style={{color:"rgba(255,255,255,.5)",fontSize:12}}>Northern Rivers Flood Response · Day 8</div></div>
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
        {title:"WWCC expiring in 3 days",sub:"Upload renewed document"},
        {title:"Upload passport",sub:"Required for international readiness"},
      ].map((t,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:14,background:"#fff",borderRadius:10,marginBottom:8,border:`1px solid ${T.g200}`}}>
        <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{t.title}</div><div style={{fontSize:11.5,color:T.g500}}>{t.sub}</div></div>
        <span style={{color:T.g400,fontSize:18}}>›</span>
      </div>)}

      {/* Quick actions */}
      <div style={{fontSize:13,fontWeight:650,marginTop:16,marginBottom:10}}>Quick Actions</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[{label:"Report Incident",bg:T.coralL,fg:T.coral},{label:"Submit Claim",bg:T.blueL,fg:T.blue},{label:"Log Fatigue",bg:T.tealL,fg:T.teal},{label:"Capture Receipt",bg:T.orangeL,fg:T.orange}].map((a,i)=><div key={i} style={{padding:16,background:"#fff",border:`1px solid ${T.g200}`,borderRadius:10,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:12,fontWeight:600,color:a.fg}}>{a.label}</div>
        </div>)}
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

/* ── Mobile Claims ── */
function MobileClaims(){
  const[view,setView]=useState("list"); // list | new | submitted
  const[newClaim,setNewClaim]=useState({category:"Meal",amount:"",notes:"",receipt:false});

  if(view==="submitted") return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Claim Submitted</div>
    </div>
    <div style={{padding:16,textAlign:"center"}}>
      <div style={{width:56,height:56,borderRadius:"50%",background:T.greenL,color:T.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"30px auto 14px"}}>✓</div>
      <div style={{fontSize:16,fontWeight:650,marginBottom:4}}>Claim Submitted</div>
      <div style={{fontSize:13,color:T.g500,marginBottom:6}}>CLM-2026-0912 · {newClaim.category} · ${newClaim.amount||"0.00"} AUD</div>
      <div style={{fontSize:12,color:T.g400,marginBottom:20}}>Your claim has been submitted for agency review. You will be notified when it is processed.</div>
      <div onClick={()=>{setView("list");setNewClaim({category:"Meal",amount:"",notes:"",receipt:false});}} style={{padding:"12px 24px",background:T.blue,color:"#fff",borderRadius:8,display:"inline-block",fontSize:13,fontWeight:600,cursor:"pointer"}}>Back to Claims</div>
    </div>
  </div>;

  if(view==="new") return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{color:"#fff",fontSize:17,fontWeight:700}}>New Claim</div>
        <span onClick={()=>setView("list")} style={{color:"rgba(255,255,255,.6)",fontSize:13,cursor:"pointer"}}>Cancel</span>
      </div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Northern Rivers Flood Response</div>
    </div>
    <div style={{padding:16}}>
      {/* Category */}
      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Category</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:16}}>
        {["Meal","Sundries","Travel","Accommodation","Communications","Other"].map(c=><div key={c} onClick={()=>setNewClaim({...newClaim,category:c})} style={{padding:"10px 6px",background:newClaim.category===c?T.blueL:"#fff",borderRadius:8,border:`2px solid ${newClaim.category===c?T.blue:T.g200}`,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:11.5,fontWeight:newClaim.category===c?700:500,color:newClaim.category===c?T.blue:T.g600}}>{c}</div>
        </div>)}
      </div>

      {/* Amount */}
      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Amount (AUD)</div>
      <div style={{padding:"12px 14px",background:"#fff",border:`1px solid ${T.g200}`,borderRadius:10,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:16,fontWeight:600,color:T.g400}}>$</span>
        <input type="text" value={newClaim.amount} onChange={e=>setNewClaim({...newClaim,amount:e.target.value})} placeholder="0.00" style={{border:"none",outline:"none",flex:1,fontSize:16,fontWeight:600,fontFamily:"inherit",background:"transparent"}}/>
        <span style={{fontSize:12,color:T.g400}}>AUD</span>
      </div>

      {/* Date */}
      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Date of Expense</div>
      <div style={{padding:"12px 14px",background:"#fff",border:`1px solid ${T.g200}`,borderRadius:10,marginBottom:16,fontSize:13,color:T.g600}}>30 Mar 2026</div>

      {/* Receipt */}
      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Receipt</div>
      <div onClick={()=>setNewClaim({...newClaim,receipt:!newClaim.receipt})} style={{padding:14,background:newClaim.receipt?T.greenL:"#fff",borderRadius:10,border:`1px solid ${newClaim.receipt?T.green:T.g200}`,textAlign:"center",cursor:"pointer",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:600,color:newClaim.receipt?"#5a8a1f":T.g600}}>{newClaim.receipt?"receipt_30mar.jpg attached":"Tap to capture receipt"}</div>
        <div style={{fontSize:11,color:T.g400,marginTop:2}}>{newClaim.receipt?"Tap to remove":"Camera or file upload"}</div>
      </div>

      {/* Notes */}
      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Notes (optional)</div>
      <div style={{padding:"10px 14px",background:"#fff",border:`1px solid ${T.g200}`,borderRadius:10,fontSize:12.5,color:T.g400,minHeight:50,marginBottom:20}}>Add claim description…</div>

      {/* Submit */}
      <div onClick={()=>setView("submitted")} style={{padding:14,background:T.blue,borderRadius:12,textAlign:"center",cursor:"pointer"}}>
        <div style={{color:"#fff",fontSize:15,fontWeight:700}}>Submit Claim</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>Will be sent for agency review</div>
      </div>
    </div>
  </div>;

  // List view
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{color:"#fff",fontSize:17,fontWeight:700}}>My Claims</div>
        <div onClick={()=>setView("new")} style={{padding:"6px 14px",background:T.blue,borderRadius:6,color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>+ New Claim</div>
      </div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Northern Rivers Flood Response</div>
    </div>
    <div style={{padding:16}}>
      {/* Summary strip */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
        {[{l:"Total",v:"$312.80",c:T.navy},{l:"Approved",v:"$214.40",c:T.green},{l:"Pending",v:"$98.40",c:T.orange}].map((m,i)=><div key={i} style={{background:"#fff",borderRadius:10,padding:"10px 8px",border:`1px solid ${T.g200}`,textAlign:"center"}}>
          <div style={{fontSize:15,fontWeight:700,color:m.c}}>{m.v}</div>
          <div style={{fontSize:10.5,color:T.g500,marginTop:1}}>{m.l}</div>
        </div>)}
      </div>

      {/* Claims list */}
      <div style={{fontSize:13,fontWeight:650,marginBottom:10}}>Recent Claims</div>
      {[
        {id:"CLM-2026-0911",cat:"Meal",amt:"$52.40",date:"29 Mar",status:"Submitted",sc:"blue"},
        {id:"CLM-2026-0908",cat:"Sundries",amt:"$31.90",date:"28 Mar",status:"Approved",sc:"green"},
        {id:"CLM-2026-0905",cat:"Meal",amt:"$47.50",date:"27 Mar",status:"Approved",sc:"green"},
        {id:"CLM-2026-0901",cat:"Travel",amt:"$82.60",date:"25 Mar",status:"Approved",sc:"green"},
        {id:"CLM-2026-0898",cat:"Meal",amt:"$46.00",date:"24 Mar",status:"Info Requested",sc:"orange"},
        {id:"CLM-2026-0895",cat:"Sundries",amt:"$52.40",date:"23 Mar",status:"Approved",sc:"green"},
      ].map((cl,i)=><div key={i} style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,padding:"12px 14px",marginBottom:8}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:600}}>{cl.cat}</div>
            <div style={{fontSize:11,color:T.g400}}>{cl.date} · {cl.id}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:15,fontWeight:700}}>{cl.amt}</div>
            <Chip color={cl.sc} s={{fontSize:9.5}}>{cl.status}</Chip>
          </div>
        </div>
      </div>)}

      {/* Claim totals note */}
      <div style={{marginTop:6,padding:"10px 14px",background:T.g50,borderRadius:8,fontSize:11,color:T.g500,textAlign:"center"}}>
        Showing claims for current deployment. All claims are subject to agency review.
      </div>
    </div>
  </div>;
}

function FieldActions(){
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Field Actions</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Quick-entry mode for field operations</div>
    </div>
    <div style={{padding:16}}>
      {/* Action buttons - large touch targets */}
      {[
        {title:"Log Fatigue Status",desc:"Record today's work/rest status",bg:T.blueL,border:T.blue},
        {title:"Report Incident (I/I/I)",desc:"Illness, injury, or incident self-report",bg:T.coralL,border:T.coral},
        {title:"Log Welfare Contact",desc:"Record welfare check or team contact",bg:T.tealL,border:T.teal},
        {title:"Submit Expense Claim",desc:"New claim with receipt capture",bg:T.orangeL,border:T.orange},
        {title:"Capture Attachment",desc:"Photo or document for any workflow",bg:T.greenL,border:T.green},
      ].map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:16,background:"#fff",borderRadius:12,marginBottom:10,border:`1px solid ${T.g200}`,borderLeft:`4px solid ${a.border}`,cursor:"pointer"}}>
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
            <div style={{fontSize:11,fontWeight:600,color:T.blue}}>Take Photo</div>
          </div>
          <div style={{flex:1,padding:"12px",background:T.g100,borderRadius:8,textAlign:"center",cursor:"pointer"}}>
            <div style={{fontSize:11,fontWeight:600,color:T.g600}}>Attach File</div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}


/* ── Daily Check-In (NDMS-014) ── */
function DailyCheckIn(){
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Daily Check-In</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>30 Mar 2026 · Day 8</div>
    </div>
    <div style={{padding:16}}>
      <div style={{fontSize:13,fontWeight:650,marginBottom:10}}>Today's Status</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
        {[
          {label:"Working",selected:true,c:T.blue},
          {label:"Rest Day",selected:false,c:T.teal},
          {label:"Travel Day",selected:false,c:T.orange},
          {label:"Briefing/Training",selected:false,c:T.green},
        ].map((s,i)=><div key={i} style={{padding:"14px",background:s.selected?`${s.c}10`:"#fff",borderRadius:10,border:`2px solid ${s.selected?s.c:T.g200}`,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:12,fontWeight:s.selected?700:500,color:s.selected?s.c:T.g600}}>{s.label}</div>
        </div>)}
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Location</div>
      <div style={{padding:"12px 14px",background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:550}}>Lismore SES HQ</div>
          <div style={{fontSize:11,color:T.g500}}>GPS: -28.8149, 153.2794</div>
        </div>
        <Chip color="green">Auto-detected</Chip>
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Welfare Check</div>
      <div style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,padding:14,marginBottom:14}}>
        {[["Physical wellbeing","Good"],["Mental wellbeing","Good"],["Sleep quality","Fair"],["Any concerns?","No"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",fontSize:12.5,borderBottom:i<3?`1px solid ${T.g100}`:"none"}}>
          <span style={{color:T.g600}}>{k}</span>
          <span style={{fontWeight:550}}>{v}</span>
        </div>)}
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Notes (optional)</div>
      <div style={{padding:"10px 14px",background:"#fff",border:`1px solid ${T.g200}`,borderRadius:10,fontSize:12.5,color:T.g400,minHeight:50,marginBottom:16}}>Add any notes for your AREP or DM…</div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Work Hours</div>
      <div style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,padding:14,marginBottom:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
          <div>
            <div style={{fontSize:11,color:T.g500,marginBottom:4}}>Shift start</div>
            <div style={{padding:"10px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:8,fontSize:13,fontWeight:600,textAlign:"center"}}>06:00</div>
          </div>
          <div>
            <div style={{fontSize:11,color:T.g500,marginBottom:4}}>Shift end</div>
            <div style={{padding:"10px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:8,fontSize:13,fontWeight:600,textAlign:"center"}}>18:00</div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:`1px solid ${T.g100}`}}>
          <span style={{fontSize:12,color:T.g600}}>Total hours today</span>
          <span style={{fontSize:14,fontWeight:700,color:T.blue}}>12.0 hrs</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:`1px solid ${T.g100}`}}>
          <span style={{fontSize:12,color:T.g600}}>Consecutive work days</span>
          <span style={{fontSize:14,fontWeight:700,color:T.orange}}>5 days</span>
        </div>
        <div style={{padding:"8px 10px",background:T.orangeL,borderRadius:6,marginTop:4}}>
          <div style={{fontSize:11,fontWeight:600,color:"#c06e15"}}>Fatigue threshold reached — your AREP has been notified</div>
        </div>
      </div>

      <div style={{padding:14,background:T.blue,borderRadius:12,textAlign:"center",cursor:"pointer"}}>
        <div style={{color:"#fff",fontSize:15,fontWeight:700}}>Submit Check-In</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>Visible to your AREP and Deployment Manager</div>
      </div>

      <div style={{fontSize:12,fontWeight:650,marginTop:16,marginBottom:8,color:T.g500}}>Previous Check-Ins</div>
      {[
        {date:"29 Mar",status:"Working",time:"07:45"},
        {date:"28 Mar",status:"Working",time:"08:00"},
        {date:"27 Mar",status:"Rest Day",time:"09:15"},
      ].map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",background:"#fff",borderRadius:8,marginBottom:4,border:`1px solid ${T.g200}`,fontSize:12}}>
        <span style={{fontWeight:600,width:50}}>{d.date}</span>
        <Chip color={d.status==="Working"?"blue":"teal"}>{d.status}</Chip>

        <span style={{marginLeft:"auto",color:T.g400,fontSize:11}}>{d.time}</span>
      </div>)}
    </div>
  </div>;
}

/* ── I/I/I Self-Report (NDMS-031) ── */
function IIISelfReport(){
  return<div>
    <div style={{background:"linear-gradient(135deg,#8B2020,#c0392b)",padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>I/I/I Self-Report</div>
      <div style={{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2}}>Illness / Injury / Incident</div>
    </div>
    <div style={{padding:16}}>
      <div style={{padding:"12px 14px",background:T.coralL,borderRadius:10,border:`1px solid ${T.coral}40`,marginBottom:16}}>
        <div style={{fontSize:12.5,fontWeight:600,color:T.coral}}>Your AREP and Deployment Manager will be notified immediately upon submission.</div>
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Report Type</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
        {[
          {label:"Illness",selected:false},
          {label:"Injury",selected:true},
          {label:"Incident",selected:false},
        ].map((t,i)=><div key={i} style={{padding:"12px",background:t.selected?T.coralL:"#fff",borderRadius:10,border:`2px solid ${t.selected?T.coral:T.g200}`,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:12,fontWeight:t.selected?700:500,color:t.selected?T.coral:T.g600}}>{t.label}</div>
        </div>)}
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Severity</div>
      <div style={{display:"flex",gap:6,marginBottom:16}}>
        {["Minor","Moderate","Serious","Critical"].map((s,i)=><div key={i} style={{flex:1,padding:"10px 6px",background:i===0?T.orangeL:"#fff",borderRadius:8,border:`2px solid ${i===0?T.orange:T.g200}`,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:11.5,fontWeight:i===0?700:500,color:i===0?T.orange:T.g600}}>{s}</div>
        </div>)}
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Location of Incident</div>
      <div style={{padding:"12px 14px",background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:550}}>Lismore SES HQ — Operations Area</div>
          <div style={{fontSize:11,color:T.g500}}>GPS: -28.8149, 153.2794</div>
        </div>
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Description</div>
      <div style={{padding:"10px 14px",background:"#fff",border:`1px solid ${T.g200}`,borderRadius:10,fontSize:12.5,color:T.g400,minHeight:60,marginBottom:14}}>Describe what happened…</div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>First Aid Required?</div>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {["No","Yes — self","Yes — by officer"].map((opt,i)=><div key={i} style={{flex:1,padding:"10px 6px",background:i===0?T.greenL:"#fff",borderRadius:8,border:`2px solid ${i===0?T.green:T.g200}`,textAlign:"center",cursor:"pointer"}}>
          <div style={{fontSize:10.5,fontWeight:i===0?700:500,color:i===0?"#3a6a10":T.g600}}>{opt}</div>
        </div>)}
      </div>

      <div style={{padding:14,background:T.coral,borderRadius:12,textAlign:"center",cursor:"pointer"}}>
        <div style={{color:"#fff",fontSize:15,fontWeight:700}}>Submit I/I/I Report</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>AREP, DM, and Agency will be notified</div>
      </div>

      <div style={{marginTop:12,padding:"10px 14px",background:T.g100,borderRadius:8,fontSize:11,color:T.g500,textAlign:"center"}}>
        For emergencies call 000. This form is for post-event recording only.
      </div>
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════════════
   AREP / SUPERVISOR MOBILE SCREENS
   ═══════════════════════════════════════════════════════════ */

const TEAM_MEMBERS=[
  {name:"Daniel Thornton",init:"DT",role:"Crew Leader",agency:"QLD QFES",status:"Working",hours:"12.0",consec:5,lastContact:"30 Mar 07:45",welfare:"Good",c:T.blue},
  {name:"Sarah Chen",init:"SC",role:"Strike Team Leader",agency:"QLD QFES",status:"Working",hours:"10.5",consec:4,lastContact:"30 Mar 08:00",welfare:"Good",c:T.teal},
  {name:"James Morton",init:"JM",role:"Crew Leader",agency:"SA CFS",status:"Rest Day",hours:"0",consec:0,lastContact:"30 Mar 09:15",welfare:"Good",c:T.green},
  {name:"Kira Wong",init:"KW",role:"Storm Damage Operator",agency:"VIC CFA",status:"Working",hours:"11.0",consec:5,lastContact:"29 Mar 18:30",welfare:"Fatigued",c:T.orange},
  {name:"Ben Harper",init:"BH",role:"Management Support",agency:"NSW RFS",status:"Working",hours:"8.0",consec:3,lastContact:"30 Mar 10:00",welfare:"Good",c:T.coral},
  {name:"Priya Nandan",init:"PN",role:"Crew Leader",agency:"WA DFES",status:"Travel Day",hours:"0",consec:0,lastContact:"30 Mar 06:30",welfare:"Good",c:"#6C5CE7"},
];

/* ── AREP Dashboard (6.24, 6.25, 6.27, 6.28) ── */
function AREPDashboard(){
  return<div>
    <div style={{background:"linear-gradient(135deg,#1a3a5c,#23344A)",padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Operations Dashboard</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Northern Rivers Flood Response · Day 8</div>
    </div>
    <div style={{padding:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {[
          {label:"Team Members",value:"6",c:T.blue},
          {label:"Checked In Today",value:"4",c:T.green},
          {label:"Welfare Flags",value:"1",c:T.coral},
          {label:"Open Reports",value:"2",c:T.orange},
        ].map((k,i)=><div key={i} style={{padding:"12px 14px",background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`}}>
          <div style={{fontSize:10.5,color:T.g500,fontWeight:550,textTransform:"uppercase",letterSpacing:.3}}>{k.label}</div>
          <div style={{fontSize:22,fontWeight:700,color:k.c,marginTop:2}}>{k.value}</div>
        </div>)}
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Team Status</div>
      <div style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,marginBottom:14}}>
        {TEAM_MEMBERS.map((tm,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderBottom:i<TEAM_MEMBERS.length-1?`1px solid ${T.g100}`:"none"}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:tm.c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{tm.init}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:12.5,fontWeight:600}}>{tm.name}</div>
            <div style={{fontSize:10.5,color:T.g500}}>{tm.role}</div>
          </div>
          <Chip color={tm.status==="Working"?"blue":tm.status==="Rest Day"?"teal":"orange"} s={{fontSize:10}}>{tm.status}</Chip>
        </div>)}
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Today's Activity</div>
      <div style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,padding:14}}>
        {[
          {time:"10:35",text:"Welfare flag raised — K. Wong (fatigue threshold)",c:T.coral},
          {time:"09:15",text:"Check-in received — J. Morton (Rest Day)",c:T.teal},
          {time:"08:00",text:"Check-in received — S. Chen (Working)",c:T.blue},
          {time:"07:45",text:"Check-in received — D. Thornton (Working, 12hrs)",c:T.blue},
          {time:"06:30",text:"P. Nandan departed for Lismore (Travel Day)",c:T.orange},
        ].map((a,i)=><div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none"}}>
          <span style={{fontSize:10.5,color:T.g400,fontWeight:600,width:38,flexShrink:0}}>{a.time}</span>
          <div style={{width:6,height:6,borderRadius:"50%",background:a.c,marginTop:5,flexShrink:0}}/>
          <span style={{fontSize:11.5,color:T.g600}}>{a.text}</span>
        </div>)}
      </div>
    </div>
  </div>;
}

/* ── AREP My Team (6.9, 6.14, 6.20, 6.22, 6.23) ── */
function AREPMyTeam(){
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>My Team</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>6 members · Northern Rivers Flood Response</div>
    </div>
    <div style={{padding:16}}>
      {TEAM_MEMBERS.map((tm,i)=><div key={i} style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,padding:14,marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:tm.c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0}}>{tm.init}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:13,fontWeight:650}}>{tm.name}</div>
            <div style={{fontSize:11,color:T.g500}}>{tm.role} · {tm.agency}</div>
          </div>
          {tm.welfare==="Fatigued"&&<Chip color="coral" s={{fontSize:9}}>Fatigued</Chip>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
          {[
            {label:"Status",value:tm.status,c:tm.status==="Working"?T.blue:T.teal},
            {label:"Hours today",value:tm.hours==="0"?"—":`${tm.hours} hrs`,c:parseFloat(tm.hours)>10?T.coral:T.navy},
            {label:"Consec. days",value:tm.consec===0?"—":tm.consec,c:tm.consec>=5?T.coral:T.navy},
          ].map((f,fi)=><div key={fi} style={{padding:"6px 8px",background:T.g50,borderRadius:6}}>
            <div style={{fontSize:9.5,color:T.g400,textTransform:"uppercase",letterSpacing:.3}}>{f.label}</div>
            <div style={{fontSize:12,fontWeight:650,color:f.c,marginTop:1}}>{f.value}</div>
          </div>)}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,paddingTop:8,borderTop:`1px solid ${T.g100}`}}>
          <span style={{fontSize:10.5,color:T.g400}}>Last contact: {tm.lastContact}</span>
          <span style={{fontSize:11,fontWeight:600,color:T.blue,cursor:"pointer"}}>Log Contact</span>
        </div>
      </div>)}
    </div>
  </div>;
}

/* ── AREP SitReps (6.29, 6.31, 6.32) ── */
function AREPSitReps(){
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Situation Reports</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Create, review, and forward SitReps</div>
    </div>
    <div style={{padding:16}}>
      <div style={{padding:14,background:T.blue,borderRadius:12,textAlign:"center",cursor:"pointer",marginBottom:16}}>
        <div style={{color:"#fff",fontSize:14,fontWeight:700}}>+ New SitRep</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>Create and submit a new situation report</div>
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Draft SitRep</div>
      <div style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,padding:14,marginBottom:14}}>
        <div style={{marginBottom:10}}>
          <div style={{fontSize:11,color:T.g500,marginBottom:4}}>Subject</div>
          <div style={{padding:"8px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:12.5}}>Northern Rivers Ops — Day 8 Update</div>
        </div>
        <div style={{marginBottom:10}}>
          <div style={{fontSize:11,color:T.g500,marginBottom:4}}>Summary</div>
          <div style={{padding:"8px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:12,minHeight:60,lineHeight:1.6,color:T.g600}}>
            Ground crews completed containment on Sector 3. One welfare flag (fatigue) — K. Wong stood down for rest. P. Nandan arriving today as rotation replacement. Weather forecast: improving conditions next 48 hrs.
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          <div><div style={{fontSize:11,color:T.g500,marginBottom:4}}>Personnel on ground</div><div style={{padding:"8px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:12.5,fontWeight:600}}>5 active</div></div>
          <div><div style={{fontSize:11,color:T.g500,marginBottom:4}}>Incidents (24hr)</div><div style={{padding:"8px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:12.5,fontWeight:600}}>0</div></div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1,padding:"10px",background:T.blue,borderRadius:8,textAlign:"center",color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>Submit SitRep</div>
          <div style={{padding:"10px 16px",background:"#fff",border:`1px solid ${T.g300}`,borderRadius:8,fontSize:12,fontWeight:600,cursor:"pointer"}}>Save Draft</div>
        </div>
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Recent SitReps</div>
      {[
        {id:"SITREP-009",title:"Day 7 — Sector 2 cleared",time:"29 Mar 18:00",status:"Submitted"},
        {id:"SITREP-008",title:"Day 6 — Weather delay",time:"28 Mar 17:30",status:"Forwarded to NRSC"},
        {id:"SITREP-007",title:"Day 5 — Rotation R1 complete",time:"27 Mar 18:00",status:"Forwarded to NRSC"},
      ].map((sr,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:8,border:`1px solid ${T.g200}`,marginBottom:6}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:12,fontWeight:600}}>{sr.title}</div>
          <div style={{fontSize:10.5,color:T.g400}}>{sr.id} · {sr.time}</div>
        </div>
        <Chip color={sr.status.includes("Forward")?"green":"blue"} s={{fontSize:9}}>{sr.status}</Chip>
      </div>)}
    </div>
  </div>;
}

/* ── AREP Role Changes (6.15, 6.16, 6.17, 6.18) ── */
function AREPRoleChanges(){
  return<div>
    <div style={{background:T.navy,padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Role Change Requests</div>
      <div style={{color:"rgba(255,255,255,.5)",fontSize:12,marginTop:2}}>Submit and review field role changes</div>
    </div>
    <div style={{padding:16}}>
      <div style={{padding:14,background:T.blue,borderRadius:12,textAlign:"center",cursor:"pointer",marginBottom:16}}>
        <div style={{color:"#fff",fontSize:14,fontWeight:700}}>+ New Role Change Request</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>Request a role change for a team member</div>
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Pending Requests</div>
      {[
        {member:"Kira Wong",from:"Storm Damage Operator",to:"Crew Leader",reason:"Performance and experience — field promotion",status:"Pending Agency",date:"30 Mar"},
      ].map((rc,i)=><div key={i} style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,padding:14,marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:12.5,fontWeight:650}}>{rc.member}</span>
          <Chip color="orange" s={{fontSize:9}}>{rc.status}</Chip>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
          <span style={{padding:"3px 8px",background:T.g100,borderRadius:4,fontSize:11,fontWeight:550}}>{rc.from}</span>
          <span style={{fontSize:11,color:T.g400}}>→</span>
          <span style={{padding:"3px 8px",background:T.blueL,borderRadius:4,fontSize:11,fontWeight:550,color:T.blue}}>{rc.to}</span>
        </div>
        <div style={{fontSize:11.5,color:T.g600,marginBottom:8}}>{rc.reason}</div>
        <div style={{fontSize:10.5,color:T.g400}}>Submitted: {rc.date} · Awaiting agency endorsement</div>
      </div>)}

      <div style={{fontSize:13,fontWeight:650,marginBottom:8,marginTop:14}}>Completed</div>
      {[
        {member:"Ben Harper",from:"Crew Leader",to:"Management Support",status:"Approved",date:"25 Mar"},
        {member:"James Morton",from:"Strike Team Leader",to:"Crew Leader",status:"Declined",date:"22 Mar"},
      ].map((rc,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:8,border:`1px solid ${T.g200}`,marginBottom:6}}>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:600}}>{rc.member}: {rc.from} → {rc.to}</div>
          <div style={{fontSize:10.5,color:T.g400}}>{rc.date}</div>
        </div>
        <Chip color={rc.status==="Approved"?"green":"coral"} s={{fontSize:9}}>{rc.status}</Chip>
      </div>)}
    </div>
  </div>;
}

/* ── AREP Requests for Assistance (6.33, 6.34) ── */
function AREPRFA(){
  return<div>
    <div style={{background:"linear-gradient(135deg,#8B4513,#A0522D)",padding:"16px 20px 20px"}}>
      <div style={{color:"#fff",fontSize:17,fontWeight:700}}>Requests for Assistance</div>
      <div style={{color:"rgba(255,255,255,.6)",fontSize:12,marginTop:2}}>Submit and manage field resource requests</div>
    </div>
    <div style={{padding:16}}>
      <div style={{padding:14,background:T.blue,borderRadius:12,textAlign:"center",cursor:"pointer",marginBottom:16}}>
        <div style={{color:"#fff",fontSize:14,fontWeight:700}}>+ New Request for Assistance</div>
        <div style={{color:"rgba(255,255,255,.5)",fontSize:11,marginTop:2}}>Submit an electronic request to NRSC</div>
      </div>

      <div style={{fontSize:13,fontWeight:650,marginBottom:8}}>Active Requests</div>
      {[
        {id:"RFA-2026-003",title:"Additional chainsaw operators — Sector 4",urgency:"Urgent",status:"Under Review",date:"30 Mar 09:00",details:"2x chainsaw-certified operators needed for Sector 4 clearance. Current team capacity insufficient for fallen timber volume."},
        {id:"RFA-2026-002",title:"Generator replacement — Base Camp",urgency:"Non-Urgent",status:"Approved",date:"29 Mar 14:00",details:"Primary generator showing faults. Replacement needed before next rotation."},
      ].map((rfa,i)=><div key={i} style={{background:"#fff",borderRadius:10,border:`1px solid ${T.g200}`,padding:14,marginBottom:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
          <span style={{fontSize:10.5,fontFamily:"'DM Mono',monospace",color:T.g400}}>{rfa.id}</span>
          <div style={{display:"flex",gap:4}}>
            <Chip color={rfa.urgency==="Urgent"?"coral":"gray"} s={{fontSize:9}}>{rfa.urgency}</Chip>
            <Chip color={rfa.status==="Approved"?"green":"orange"} s={{fontSize:9}}>{rfa.status}</Chip>
          </div>
        </div>
        <div style={{fontSize:12.5,fontWeight:650,marginBottom:4}}>{rfa.title}</div>
        <div style={{fontSize:11.5,color:T.g600,marginBottom:6,lineHeight:1.5}}>{rfa.details}</div>
        <div style={{fontSize:10.5,color:T.g400}}>Submitted: {rfa.date}</div>
      </div>)}

      <div style={{fontSize:13,fontWeight:650,marginBottom:8,marginTop:14}}>Closed Requests</div>
      {[
        {id:"RFA-2026-001",title:"Medical supplies resupply",status:"Fulfilled",date:"27 Mar"},
      ].map((rfa,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:8,border:`1px solid ${T.g200}`,marginBottom:6}}>
        <div style={{flex:1}}>
          <div style={{fontSize:12,fontWeight:600}}>{rfa.title}</div>
          <div style={{fontSize:10.5,color:T.g400}}>{rfa.id} · {rfa.date}</div>
        </div>
        <Chip color="green" s={{fontSize:9}}>{rfa.status}</Chip>
      </div>)}
    </div>
  </div>;
}

export {
  MobileHome,
  MobileClaims,
  FieldActions,
  DailyCheckIn,
  IIISelfReport
};
