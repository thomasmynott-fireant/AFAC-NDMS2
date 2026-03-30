import { useState, useEffect } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",white:"#FFFFFF"};

const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Av=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const Btn=({children,v="secondary",s,...p})=>{const vs={primary:{background:T.blue,color:"#fff",border:"none"},secondary:{background:"#fff",color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600,border:"none"}};return<button style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,cursor:"pointer",fontFamily:"inherit",...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s})=><div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const TH=({children})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap"}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;
const Tabs=({tabs,active,onChange})=><div style={{display:"flex",borderBottom:`2px solid ${T.g200}`,marginBottom:20}}>{tabs.map(t=><div key={t.id} onClick={()=>onChange(t.id)} style={{padding:"8px 18px",fontSize:13,fontWeight:550,color:active===t.id?T.blue:T.g500,borderBottom:`2px solid ${active===t.id?T.blue:"transparent"}`,marginBottom:-2,cursor:"pointer"}}>{t.label}{t.count!=null&&<span style={{background:active===t.id?T.blueL:T.g100,fontSize:10,padding:"1px 6px",borderRadius:10,marginLeft:6}}>{t.count}</span>}</div>)}</div>;

const SCREENS=[
  {id:"my-claims",label:"My Claims",icon:"💰"},
  {id:"submit",label:"Claim Submission",icon:"📝"},
  {id:"agency-review",label:"Agency Review Queue",icon:"✓"},
  {id:"nrsc-audit",label:"NRSC Audit Queue",icon:"🔍"},
  {id:"reconciliation",label:"Reconciliation Workspace",icon:"📊"},
];

export default function C5Finance(){
  const[screen,setScreen]=useState("my-claims");
  const[m,setM]=useState(false);
  useEffect(()=>setM(true),[]);
  const R={"my-claims":<MyClaims/>,"submit":<ClaimSubmit/>,"agency-review":<AgencyReview/>,"nrsc-audit":<NRSCAudit/>,"reconciliation":<Reconciliation/>};
  const cur=SCREENS.find(s=>s.id===screen);
  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:T.navy,fontSize:14,lineHeight:1.5,WebkitFontSmoothing:"antialiased",opacity:m?1:0,transition:"opacity .3s"}}>
      <nav style={{width:256,background:T.navy,display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto"}}>
        <div style={{padding:"18px 18px 14px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:36,height:36,background:T.blue,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:14}}>N</div>
          <div><div style={{color:"#fff",fontWeight:700,fontSize:15.5}}>NDMS</div><div style={{color:"rgba(255,255,255,.35)",fontSize:10}}>Stage 3 — C5 Finance</div></div>
        </div>
        <div style={{flex:1,padding:"12px"}}>
          <div style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:1.2,padding:"0 10px 8px"}}>Financial Reconciliation</div>
          {SCREENS.map(item=>{const a=screen===item.id;return<div key={item.id} onClick={()=>setScreen(item.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 11px",borderRadius:6,cursor:"pointer",color:a?"#fff":"rgba(255,255,255,.55)",background:a?"rgba(14,120,201,.2)":"transparent",fontSize:12.5,fontWeight:a?600:450,position:"relative",marginBottom:2}}>
            {a&&<div style={{position:"absolute",left:-12,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:T.blue,borderRadius:"0 3px 3px 0"}}/>}
            <span style={{fontSize:14,width:20,textAlign:"center"}}>{item.icon}</span>{item.label}
          </div>})}
        </div>
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><Av i="DT" c={T.blue} s={32}/><div><div style={{color:"rgba(255,255,255,.85)",fontSize:12.5,fontWeight:550}}>Daniel Thornton</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>NSW RFS · Team Member</div></div></div>
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

/* ── My Claims ── */
function MyClaims(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>My Claims</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Daniel Thornton · NT Cyclone Response · CREW2</p></div>
      <Btn v="primary">+ New Claim</Btn>
    </div>

    {/* Summary */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
      {[{l:"Total Submitted",v:"$624.80",sub:"8 claims",c:T.navy},{l:"Approved",v:"$312.50",sub:"4 claims",c:T.green},{l:"Pending Review",v:"$247.30",sub:"3 claims",c:T.orange},{l:"Rejected",v:"$65.00",sub:"1 claim",c:T.coral}].map((m,i)=><div key={i} style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,padding:"16px 18px"}}><div style={{fontSize:11,color:T.g500}}>{m.l}</div><div style={{fontSize:22,fontWeight:700,color:m.c,marginTop:4}}>{m.v}</div><div style={{fontSize:11,color:T.g500,marginTop:2}}>{m.sub}</div></div>)}
    </div>

    <Card>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Claim ID</TH><TH>Date</TH><TH>Category</TH><TH>Description</TH><TH>Currency</TH><TH>Amount</TH><TH>Status</TH><TH>Receipt</TH></tr></thead>
        <tbody>
          {[
            {id:"CLM-2025-0891",date:"29 Mar",cat:"Meal",desc:"Dinner — Darwin CBD",cur:"AUD",amt:"$52.40",status:"Pending",color:"orange",receipt:true},
            {id:"CLM-2025-0885",date:"28 Mar",cat:"Transport",desc:"Taxi to staging area",cur:"AUD",amt:"$34.00",status:"Pending",color:"orange",receipt:true},
            {id:"CLM-2025-0878",date:"27 Mar",cat:"Sundries",desc:"Sunscreen, batteries",cur:"AUD",amt:"$28.90",status:"Pending",color:"orange",receipt:true},
            {id:"CLM-2025-0862",date:"25 Mar",cat:"Meal",desc:"Lunch — team meal (shared)",cur:"AUD",amt:"$47.50",status:"Approved",color:"green",receipt:true},
            {id:"CLM-2025-0855",date:"24 Mar",cat:"Meal",desc:"Dinner — hotel restaurant",cur:"AUD",amt:"$68.00",status:"Approved",color:"green",receipt:true},
            {id:"CLM-2025-0841",date:"23 Mar",cat:"Transport",desc:"Airport shuttle SYD–DRW",cur:"AUD",amt:"$124.00",status:"Approved",color:"green",receipt:true},
            {id:"CLM-2025-0838",date:"23 Mar",cat:"Meal",desc:"Breakfast — airport",cur:"AUD",amt:"$73.00",status:"Approved",color:"green",receipt:true},
            {id:"CLM-2025-0820",date:"22 Mar",cat:"Accommodation",desc:"Hotel incidentals — minibar",cur:"AUD",amt:"$65.00",status:"Rejected",color:"coral",receipt:false},
          ].map((r,i)=><tr key={i} style={{cursor:"pointer"}}>
            <TD mono>{r.id}</TD><TD>{r.date}</TD><TD>{r.cat}</TD><TD>{r.desc}</TD>
            <TD><span style={{padding:"2px 8px",background:T.g100,borderRadius:4,fontSize:11,fontWeight:600}}>{r.cur}</span></TD>
            <TD fw={600}>{r.amt}</TD><TD><Chip color={r.color}>{r.status}</Chip></TD>
            <TD>{r.receipt?<span style={{color:T.green}}>📎</span>:<span style={{color:T.coral,fontSize:11}}>Missing</span>}</TD>
          </tr>)}
        </tbody>
      </table>
    </Card>

    {/* Status timeline for last claim */}
    <Card title="Claim Timeline — CLM-2025-0862" s={{marginTop:20}}>
      <div style={{display:"flex",gap:32}}>
        {[{step:"Submitted",date:"25 Mar 14:30",done:true},{step:"Agency Review",date:"26 Mar 10:00",done:true},{step:"Approved",date:"27 Mar 11:20",done:true},{step:"NRSC Audit",date:"—",done:false},{step:"Closed",date:"—",done:false}].map((st,i)=><div key={i} style={{display:"flex",alignItems:"center",flex:1}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:st.done?T.green:T.g200,color:st.done?"#fff":T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{st.done?"✓":i+1}</div>
            <div style={{fontSize:10.5,fontWeight:st.done?600:400,color:st.done?T.green:T.g400,marginTop:4,textAlign:"center"}}>{st.step}</div>
            <div style={{fontSize:9.5,color:T.g400,marginTop:1}}>{st.date}</div>
          </div>
          {i<4&&<div style={{flex:1,height:2,background:st.done?T.green:T.g200,margin:"0 8px",marginBottom:28}}/>}
        </div>)}
      </div>
    </Card>
  </div>;
}

/* ── Claim Submission Flow ── */
function ClaimSubmit(){
  const[step,setStep]=useState(1);
  return<div style={{padding:"24px 32px",maxWidth:860,margin:"0 auto"}}>
    <div style={{marginBottom:24}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Submit Expense Claim</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>NT Cyclone Response · Deployment phase: In Field</p></div>

    {/* Progress */}
    <div style={{display:"flex",alignItems:"center",marginBottom:28}}>
      {["Deployment Phase","Category & Amount","Receipt & Evidence","Allocation","Review & Submit"].map((st,i)=>{const n=i+1,done=n<step,active=n===step;return<div key={i} style={{flex:1,display:"flex",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:done?T.green:active?T.blue:T.g200,color:done||active?"#fff":T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{done?"✓":n}</div>
          <div style={{fontSize:9.5,color:active?T.blue:done?T.green:T.g400,fontWeight:active?600:400,marginTop:3,whiteSpace:"nowrap"}}>{st}</div>
        </div>{i<4&&<div style={{flex:1,height:2,background:done?T.green:T.g200,margin:"0 6px",marginBottom:16}}/>}
      </div>})}
    </div>

    <Card>
      {step===1&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Deployment Phase</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:16}}>Select the deployment phase this expense relates to. This determines applicable allowances and approval routing.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[{id:"pre",label:"Pre-deployment",desc:"Travel, briefing, preparation costs"},{id:"field",label:"In Field",desc:"Operational expenses during deployment"},{id:"demob",label:"Demobilisation",desc:"Return travel, post-deployment costs"}].map(p=><div key={p.id} style={{padding:16,border:`2px solid ${p.id==="field"?T.blue:T.g200}`,borderRadius:8,cursor:"pointer",background:p.id==="field"?T.blueL:"#fff"}}>
            <div style={{fontSize:14,fontWeight:650,marginBottom:4}}>{p.label}</div>
            <div style={{fontSize:12,color:T.g500}}>{p.desc}</div>
          </div>)}
        </div>
      </div>}

      {step===2&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Category & Amount</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>Expense Category</label>
            <div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>🍽 Meal</div>
          </div>
          <div><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>Currency</label>
            <div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>AUD — Australian Dollar</div>
          </div>
          <div><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>Amount</label>
            <div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13,fontWeight:600}}>$ 52.40</div>
          </div>
          <div><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>Date of Expense</label>
            <div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>29 March 2026</div>
          </div>
          <div style={{gridColumn:"1/3"}}><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>Description</label>
            <div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>Dinner — Darwin CBD restaurant, team dinner after operations</div>
          </div>
        </div>
        <div style={{marginTop:14,padding:"10px 14px",background:T.greenL,borderRadius:6,fontSize:12,color:"#4a7a12"}}>
          ✓ Within daily meal allowance threshold ($80.00 AUD per day). No special approval required.
        </div>
      </div>}

      {step===3&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Receipt & Evidence</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:16}}>Upload a photo or scan of your receipt. Accepted formats: JPG, PNG, PDF (max 10MB).</p>
        <div style={{border:`2px dashed ${T.g300}`,borderRadius:8,padding:32,textAlign:"center",background:T.g50}}>
          <div style={{fontSize:36,marginBottom:8}}>📸</div>
          <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>Drag receipt here or tap to capture</div>
          <div style={{fontSize:12,color:T.g500}}>JPG, PNG, or PDF · Max 10MB</div>
          <Btn v="primary" s={{marginTop:14}}>📷 Capture Receipt</Btn>
        </div>
        <div style={{marginTop:14,padding:12,border:`1px solid ${T.g200}`,borderRadius:6,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:20}}>📎</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:550}}>receipt_dinner_29mar.jpg</div><div style={{fontSize:11,color:T.g500}}>1.2 MB · Uploaded just now</div></div>
          <Chip color="green">Attached</Chip>
        </div>
        <div style={{marginTop:12,fontSize:12,color:T.g500,fontStyle:"italic"}}>Tip: Ensure the receipt clearly shows the date, vendor name, and total amount. Itemised receipts are preferred for shared meals.</div>
      </div>}

      {step===4&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Claim Allocation</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:16}}>Is this claim for you only, or shared with others? Shared claims split the cost across participants.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          <div style={{padding:16,border:`2px solid ${T.blue}`,borderRadius:8,background:T.blueL,cursor:"pointer"}}>
            <div style={{fontSize:14,fontWeight:650}}>Self Only</div>
            <div style={{fontSize:12,color:T.g600,marginTop:2}}>Full amount allocated to me</div>
          </div>
          <div style={{padding:16,border:`2px solid ${T.g200}`,borderRadius:8,cursor:"pointer"}}>
            <div style={{fontSize:14,fontWeight:650}}>Shared Claim</div>
            <div style={{fontSize:12,color:T.g600,marginTop:2}}>Split across team members</div>
          </div>
        </div>
        <div style={{padding:12,background:T.g50,borderRadius:6,fontSize:12.5}}>
          <div style={{fontWeight:600,marginBottom:4}}>Allocation Summary</div>
          <div>Daniel Thornton — $52.40 AUD (100%)</div>
        </div>
      </div>}

      {step===5&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Review & Submit</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 24px",fontSize:13,marginBottom:16}}>
          {[["Phase","In Field"],["Category","Meal"],["Amount","$52.40 AUD"],["Date","29 March 2026"],["Description","Dinner — Darwin CBD"],["Receipt","receipt_dinner_29mar.jpg ✓"],["Allocation","Self only (100%)"],["Deployment","NT Cyclone Response"]].map(([k,v],i)=><div key={i}><div style={{fontSize:11,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:550,marginTop:2}}>{v}</div></div>)}
        </div>
        <div style={{padding:"10px 14px",background:T.blueL,borderRadius:6,fontSize:12,color:T.blue}}>
          This claim will be submitted to NSW RFS for agency review. You will be notified when the status changes.
        </div>
      </div>}

      <div style={{display:"flex",justifyContent:"space-between",marginTop:24,paddingTop:16,borderTop:`1px solid ${T.g200}`}}>
        <Btn v="secondary" s={{opacity:step===1?.4:1}} onClick={()=>setStep(Math.max(1,step-1))}>← Previous</Btn>
        <Btn v="primary" onClick={()=>setStep(Math.min(5,step+1))}>{step===5?"Submit Claim":"Continue →"}</Btn>
      </div>
    </Card>
  </div>;
}

/* ── Agency Review Queue ── */
function AgencyReview(){
  const[selected,setSelected]=useState([]);
  const toggle=id=>setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const claims=[
    {id:"CLM-2025-0891",person:"Daniel Thornton",init:"DT",c:T.blue,cat:"Meal",date:"29 Mar",amt:"$52.40",cur:"AUD",deploy:"NT Cyclone",status:"Pending",reviewer:"Unassigned"},
    {id:"CLM-2025-0885",person:"Daniel Thornton",init:"DT",c:T.blue,cat:"Transport",date:"28 Mar",amt:"$34.00",cur:"AUD",deploy:"NT Cyclone",status:"Pending",reviewer:"Unassigned"},
    {id:"CLM-2025-0892",person:"Tom Briggs",init:"TB",c:T.orange,cat:"Sundries",date:"29 Mar",amt:"$31.90",cur:"AUD",deploy:"NT Cyclone",status:"Pending",reviewer:"Unassigned"},
    {id:"CLM-2025-0887",person:"Rachel Kim",init:"RK",c:T.teal,cat:"Transport",date:"28 Mar",amt:"$124.00",cur:"AUD",deploy:"NT Cyclone",status:"Pending",reviewer:"Unassigned"},
    {id:"CLM-2025-0889",person:"Alice Nguyễn",init:"AN",c:T.green,cat:"Meal",date:"27 Mar",amt:"C$62.30",cur:"CAD",deploy:"Canada 2025",status:"Pending",reviewer:"Unassigned"},
    {id:"CLM-2025-0893",person:"Alice Nguyễn",init:"AN",c:T.green,cat:"Meal",date:"28 Mar",amt:"C$58.70",cur:"CAD",deploy:"Canada 2025",status:"Pending",reviewer:"Unassigned"},
    {id:"CLM-2025-0880",person:"Peter Nguyễn",init:"PN",c:T.green,cat:"Accommodation",date:"26 Mar",amt:"C$189.00",cur:"CAD",deploy:"Canada 2025",status:"Pending",reviewer:"Unassigned"},
    {id:"CLM-2025-0894",person:"Peter Nguyễn",init:"PN",c:T.green,cat:"Meal",date:"29 Mar",amt:"C$71.00",cur:"CAD",deploy:"Canada 2025",status:"INLO Endorsement",reviewer:"P. Nguyễn (INLO)"},
  ];

  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Agency Review Queue</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>NSW Rural Fire Service — Claims awaiting agency cost approval</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="secondary">Export</Btn><Btn v="secondary">Assign Reviewer</Btn></div>
    </div>

    {/* Bulk action bar */}
    {selected.length>0&&<div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:T.blueL,borderRadius:6,marginBottom:14}}>
      <span style={{fontSize:13,fontWeight:600}}>{selected.length} selected</span>
      <div style={{flex:1}}/>
      <Btn v="primary" s={{padding:"5px 14px",fontSize:12}}>✓ Approve Selected</Btn>
      <Btn v="secondary" s={{padding:"5px 14px",fontSize:12,color:T.orange,borderColor:T.orange}}>⏸ Pend Selected</Btn>
      <Btn v="secondary" s={{padding:"5px 14px",fontSize:12,color:T.coral,borderColor:T.coral}}>✕ Reject Selected</Btn>
    </div>}

    <Card>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH><input type="checkbox" style={{cursor:"pointer"}}/></TH><TH>Claim ID</TH><TH>Person</TH><TH>Category</TH><TH>Date</TH><TH>Amount</TH><TH>Currency</TH><TH>Deployment</TH><TH>Status</TH><TH>Actions</TH></tr></thead>
        <tbody>{claims.map((r,i)=><tr key={i} style={{background:selected.includes(r.id)?T.blueL:"transparent"}}>
          <TD><input type="checkbox" checked={selected.includes(r.id)} onChange={()=>toggle(r.id)} style={{cursor:"pointer"}}/></TD>
          <TD mono>{r.id}</TD>
          <TD><div style={{display:"flex",alignItems:"center",gap:6}}><Av i={r.init} c={r.c} s={24}/><span style={{fontWeight:550,fontSize:12.5}}>{r.person}</span></div></TD>
          <TD>{r.cat}</TD><TD>{r.date}</TD>
          <TD fw={600}>{r.amt}</TD>
          <TD><span style={{padding:"2px 8px",background:r.cur==="CAD"?T.tealL:T.g100,borderRadius:4,fontSize:11,fontWeight:600,color:r.cur==="CAD"?"#148895":T.g600}}>{r.cur}</span></TD>
          <TD>{r.deploy}</TD>
          <TD><Chip color={r.status==="INLO Endorsement"?"teal":"orange"}>{r.status}</Chip></TD>
          <TD><div style={{display:"flex",gap:3}}>
            <button style={{width:24,height:24,borderRadius:"50%",border:"none",background:T.greenL,color:T.green,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✓</button>
            <button style={{width:24,height:24,borderRadius:"50%",border:"none",background:T.coralL,color:T.coral,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div></TD>
        </tr>)}</tbody>
      </table>
    </Card>

    <div style={{marginTop:14,display:"flex",gap:14}}>
      <div style={{padding:"10px 14px",background:T.orangeL,borderRadius:6,fontSize:12,color:"#c06e15",flex:1}}>
        <strong>Reminder:</strong> 3 claims approaching 14-day review window. The 70-day no-response automation will auto-close claims without agency action.
      </div>
      <div style={{padding:"10px 14px",background:T.tealL,borderRadius:6,fontSize:12,color:"#148895",flex:1}}>
        <strong>INLO Endorsement:</strong> CLM-2025-0894 exceeds meal threshold (C$65/day). Requires INLO special approval before agency review.
      </div>
    </div>
  </div>;
}

/* ── NRSC Audit Queue ── */
function NRSCAudit(){
  const[drawer,setDrawer]=useState(null);
  const claims=[
    {id:"CLM-2025-0862",person:"Daniel Thornton",agency:"NSW RFS",cat:"Meal",amt:"$47.50",cur:"AUD",deploy:"NT Cyclone",agApproved:"27 Mar",auditor:"—",status:"Awaiting Audit"},
    {id:"CLM-2025-0855",person:"Daniel Thornton",agency:"NSW RFS",cat:"Meal",amt:"$68.00",cur:"AUD",deploy:"NT Cyclone",agApproved:"26 Mar",auditor:"—",status:"Awaiting Audit"},
    {id:"CLM-2025-0841",person:"Daniel Thornton",agency:"NSW RFS",cat:"Transport",amt:"$124.00",cur:"AUD",deploy:"NT Cyclone",agApproved:"26 Mar",auditor:"J. Walsh",status:"Under Review"},
    {id:"CLM-2025-0810",person:"Mark Sullivan",agency:"CFA",cat:"Meal",amt:"C$55.00",cur:"CAD",deploy:"Canada 2025",agApproved:"24 Mar",auditor:"J. Walsh",status:"Returned for Info"},
  ];

  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>NRSC Audit Queue</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Second-line review of agency-approved claims</p></div>
    <Tabs tabs={[{id:"pending",label:"Awaiting Audit",count:2},{id:"review",label:"Under Review",count:1},{id:"returned",label:"Returned for Info",count:1},{id:"complete",label:"Audit Complete",count:28}]} active="pending" onChange={()=>{}}/>

    <div style={{display:"flex",gap:20}}>
      <div style={{flex:1}}>
        <Card>
          <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Claim ID</TH><TH>Person</TH><TH>Agency</TH><TH>Category</TH><TH>Amount</TH><TH>Agency Approved</TH><TH>Status</TH></tr></thead>
            <tbody>{claims.map((r,i)=><tr key={i} style={{cursor:"pointer"}} onClick={()=>setDrawer(r)}>
              <TD mono>{r.id}</TD><TD fw={550}>{r.person}</TD><TD>{r.agency}</TD><TD>{r.cat}</TD>
              <TD fw={600}>{r.amt} <span style={{fontSize:10,color:T.g400}}>{r.cur}</span></TD>
              <TD>{r.agApproved}</TD>
              <TD><Chip color={r.status==="Returned for Info"?"orange":r.status==="Under Review"?"teal":"blue"}>{r.status}</Chip></TD>
            </tr>)}</tbody>
          </table>
        </Card>
      </div>

      {drawer&&<div style={{width:320,background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,padding:18,flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><span style={{fontSize:14,fontWeight:650}}>Audit Panel</span><span onClick={()=>setDrawer(null)} style={{cursor:"pointer",color:T.g400,fontSize:18}}>×</span></div>
        <div style={{fontSize:12.5,marginBottom:14}}>
          {[["Claim",drawer.id],["Person",drawer.person],["Agency",drawer.agency],["Category",drawer.cat],["Amount",`${drawer.amt} ${drawer.cur}`],["Agency approved",drawer.agApproved]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550}}>{v}</span></div>)}
        </div>
        <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Audit History</div>
        <div style={{fontSize:12,color:T.g600,marginBottom:10}}>Agency approved by S. Patel on {drawer.agApproved}. Receipt attached and verified at agency level.</div>
        <textarea style={{width:"100%",height:50,border:`1px solid ${T.g200}`,borderRadius:6,padding:8,fontSize:12,fontFamily:"inherit",resize:"vertical"}} placeholder="Audit notes..."/>
        <div style={{display:"flex",gap:6,marginTop:10}}>
          <Btn v="primary" s={{flex:1,justifyContent:"center",fontSize:12}}>Pass Audit</Btn>
          <Btn v="secondary" s={{flex:1,justifyContent:"center",fontSize:12,color:T.orange,borderColor:T.orange}}>Return for Info</Btn>
        </div>
      </div>}
    </div>
  </div>;
}

/* ── Reconciliation Workspace ── */
function Reconciliation(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Reconciliation Workspace</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>NT Cyclone Response — Deployment-level financial summary</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="secondary">Export Invoice Pack</Btn><Btn v="primary">Generate Reconciliation</Btn></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
      {[{l:"Total Deployment Cost",v:"$284,600",c:T.navy},{l:"Travel & Flights",v:"$98,200",c:T.blue},{l:"Accommodation",v:"$124,400",c:T.teal},{l:"Claims & Expenses",v:"$62,000",c:T.orange}].map((m,i)=><div key={i} style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,padding:"16px 18px"}}><div style={{fontSize:11,color:T.g500}}>{m.l}</div><div style={{fontSize:22,fontWeight:700,color:m.c,marginTop:4}}>{m.v}</div></div>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      {/* By jurisdiction */}
      <Card title="Totals by Jurisdiction">
        <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Jurisdiction</TH><TH>Personnel</TH><TH>Travel</TH><TH>Accomm.</TH><TH>Claims</TH><TH>Total</TH></tr></thead>
          <tbody>
            {[
              {j:"NSW",p:34,travel:"$42,100",acc:"$52,800",claims:"$28,400",total:"$123,300"},
              {j:"VIC",p:12,travel:"$18,600",acc:"$24,200",claims:"$12,100",total:"$54,900"},
              {j:"SA",p:6,travel:"$12,400",acc:"$16,800",claims:"$7,200",total:"$36,400"},
              {j:"QLD",p:8,travel:"$14,200",acc:"$18,400",claims:"$8,600",total:"$41,200"},
              {j:"Other",p:4,travel:"$10,900",acc:"$12,200",claims:"$5,700",total:"$28,800"},
            ].map((r,i)=><tr key={i}><TD fw={600}>{r.j}</TD><TD>{r.p}</TD><TD>{r.travel}</TD><TD>{r.acc}</TD><TD>{r.claims}</TD><TD fw={700}>{r.total}</TD></tr>)}
          </tbody>
        </table>
      </Card>

      {/* By order */}
      <Card title="By Order / Team">
        {[
          {order:"ORD-0047-A",desc:"IMT & Overhead",cost:"$48,200"},
          {order:"ORD-0047-B",desc:"Safety",cost:"$18,600"},
          {order:"ORD-0047-C",desc:"CREW1 Storm Ops",cost:"$86,400"},
          {order:"ORD-0047-D",desc:"CREW2 Storm Ops",cost:"$92,200"},
          {order:"ORD-0047-E",desc:"Management Support",cost:"$39,200"},
        ].map((o,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none",fontSize:13}}>
          <div><span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.g500}}>{o.order}</span><span style={{marginLeft:10,fontWeight:550}}>{o.desc}</span></div>
          <span style={{fontWeight:700}}>{o.cost}</span>
        </div>)}
      </Card>
    </div>

    <Card title="Invoice Notes" s={{marginTop:20}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,fontSize:12.5}}>
        {[["Invoice Reference","INV-AFAC-NT-2025-003"],["Billing Entity","AFAC NRSC"],["Receiving Jurisdiction","NT Government — Emergency Services"],["Period","14 Mar – 14 Apr 2026 (est.)"],["Status","Draft — awaiting final demob costs"],["Prepared by","Jessica Walsh (NRSC)"]].map(([k,v],i)=><div key={i}><div style={{fontSize:11,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:550,marginTop:2}}>{v}</div></div>)}
      </div>
      <div style={{marginTop:14,padding:12,background:T.g50,borderRadius:6}}>
        <div style={{fontSize:11,color:T.g400,fontWeight:600,marginBottom:4}}>Notes</div>
        <div style={{fontSize:12.5,color:T.g600}}>Final reconciliation pending completion of CREW2 demobilisation (est. 5 Apr). Travel costs for return legs not yet captured. 7 expense claims still under agency review.</div>
      </div>
    </Card>
  </div>;
}
