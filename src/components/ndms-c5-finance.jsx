import { useState } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600},purple:{bg:"#F3F0FF",fg:"#6C5CE7"}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Av=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const Btn=({children,v="secondary",s,...p})=>{const vs={primary:{background:T.blue,color:"#fff",border:"none"},secondary:{background:"#fff",color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600,border:"none"}};return<button style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,cursor:"pointer",fontFamily:"inherit",...vs[v],...s}} {...p}>{children}</button>};
const TH=({children,w})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap",width:w}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;
const SCard=({label,value,sub,color=T.navy})=><div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,padding:"14px 18px"}}><div style={{fontSize:10.5,color:T.g500,fontWeight:550,textTransform:"uppercase",letterSpacing:.3}}>{label}</div><div style={{fontSize:22,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:11,color:T.g500,marginTop:2}}>{sub}</div>}</div>;
const Field=({label,children})=><div><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>{label}</label><div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>{children}</div></div>;

/* ══════════════════════════════════════════
   DUMMY DATA
   ══════════════════════════════════════════ */
const CLAIMS=[
  {id:"CLM-NT-25018",person:"Ava Mercer",init:"AM",c:T.blue,agency:"NSW RFS",deploy:"Darwin Support 2025/26",phase:"Mobilisation",cat:"Accommodation",amt:248.00,cur:"AUD",forw:"Self",status:"Submitted",receipt:true,date:"28 Mar",updated:"28 Mar 16:40"},
  {id:"CLM-CAN-25104",person:"Levi Hart",init:"LH",c:T.orange,agency:"VIC CFA",deploy:"Canada 2025 Wildfire",phase:"Deployment",cat:"Meals",amt:64.50,cur:"CAD",forw:"Self",status:"Returned for Info",receipt:true,date:"26 Mar",updated:"29 Mar 09:15",reason:"Exceeds daily meal threshold — justification required"},
  {id:"CLM-CAN-25107",person:"Priya Nandan",init:"PN",c:T.teal,agency:"WA DFES",deploy:"Canada 2025 Wildfire",phase:"Demobilisation",cat:"Ground Transport",amt:182.00,cur:"CAD",forw:"Self + Others",status:"Approved at Agency",receipt:true,date:"27 Mar",updated:"30 Mar 11:00"},
  {id:"CLM-CAN-25112",person:"Hugo Bennett",init:"HB",c:"#6C5CE7",agency:"ACT ESA",deploy:"Canada 2025 Wildfire",phase:"Deployment",cat:"Communications",amt:95.00,cur:"CAD",forw:"Self",status:"Special Approval Required",receipt:true,date:"29 Mar",updated:"29 Mar 14:20"},
  {id:"CLM-CAN-25098",person:"Mia Raukura",init:"MR",c:T.coral,agency:"FENZ",deploy:"Canada 2025 Wildfire",phase:"Deployment",cat:"Meals",amt:78.40,cur:"CAD",forw:"Self",status:"Rejected",receipt:false,date:"25 Mar",updated:"28 Mar 10:30",reason:"Missing receipt"},
  {id:"CLM-NT-25022",person:"Sam Ortega",init:"SO",c:T.green,agency:"NSW SES",deploy:"Darwin Support 2025/26",phase:"Deployment",cat:"Meals",amt:52.80,cur:"AUD",forw:"Self",status:"Under NRSC Audit",receipt:true,date:"24 Mar",updated:"30 Mar 08:00"},
  {id:"CLM-NR-25201",person:"Daniel Thornton",init:"DT",c:T.blue,agency:"QLD QFES",deploy:"Northern Rivers Flood",phase:"Deployment",cat:"Meals",amt:47.50,cur:"AUD",forw:"Self",status:"Draft",receipt:false,date:"30 Mar",updated:"30 Mar 12:00"},
  {id:"CLM-NR-25195",person:"Daniel Thornton",init:"DT",c:T.blue,agency:"QLD QFES",deploy:"Northern Rivers Flood",phase:"Mobilisation",cat:"Ground Transport",amt:124.00,cur:"AUD",forw:"Self",status:"Approved at Agency",receipt:true,date:"23 Mar",updated:"27 Mar 15:30"},
  {id:"CLM-CAN-25115",person:"Priya Nandan",init:"PN",c:T.teal,agency:"WA DFES",deploy:"Canada 2025 Wildfire",phase:"Deployment",cat:"Meals",amt:71.20,cur:"CAD",forw:"Self",status:"Submitted",receipt:true,date:"29 Mar",updated:"29 Mar 18:00"},
  {id:"CLM-NT-25030",person:"Ava Mercer",init:"AM",c:T.blue,agency:"NSW RFS",deploy:"Darwin Support 2025/26",phase:"Deployment",cat:"Sundries",amt:34.90,cur:"AUD",forw:"Self",status:"Submitted",receipt:true,date:"29 Mar",updated:"29 Mar 20:00"},
];

const statusChipColor=(s)=>({Draft:"gray",Submitted:"blue","Returned for Info":"orange","Approved at Agency":"green","Special Approval Required":"purple",Rejected:"coral","Under NRSC Audit":"teal",Closed:"gray"}[s]||"gray");

/* ══════════════════════════════════════════
   FINANCE WORKSPACE — role-aware tabbed
   ══════════════════════════════════════════ */
export default function FinanceWorkspace({scope="national"}){
  const defaultTab=scope==="personal"?"my-claims":scope==="agency"?"agency-review":"nrsc-audit";
  const[tab,setTab]=useState(defaultTab);
  const[wizardOpen,setWizardOpen]=useState(false);
  const[drawerClaim,setDrawerClaim]=useState(null);

  const tabs=[
    {id:"my-claims",label:"My Claims",count:CLAIMS.filter(c=>c.person==="Daniel Thornton").length},
    {id:"agency-review",label:"Agency Review",count:CLAIMS.filter(c=>["Submitted","Special Approval Required"].includes(c.status)).length},
    {id:"nrsc-audit",label:"NRSC Audit",count:CLAIMS.filter(c=>["Approved at Agency","Under NRSC Audit"].includes(c.status)).length},
    {id:"reconciliation",label:"Reconciliation",count:null},
  ];

  if(wizardOpen) return <ClaimWizard onClose={()=>setWizardOpen(false)}/>;

  return <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{padding:"20px 32px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Financial Reconciliation</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Deployment expense claims, approvals, audit and reconciliation</p></div>
        <div style={{display:"flex",gap:8}}><Btn v="secondary">Export</Btn><Btn v="primary" onClick={()=>setWizardOpen(true)}>+ New Claim</Btn></div>
      </div>
      <div style={{display:"flex",borderBottom:`2px solid ${T.g200}`,marginTop:12}}>
        {tabs.map(t=><div key={t.id} onClick={()=>{setTab(t.id);setDrawerClaim(null);}} style={{padding:"8px 18px",fontSize:13,fontWeight:550,color:tab===t.id?T.blue:T.g500,borderBottom:`2px solid ${tab===t.id?T.blue:"transparent"}`,marginBottom:-2,cursor:"pointer"}}>{t.label}{t.count!=null&&<span style={{background:tab===t.id?T.blueL:T.g100,fontSize:10,padding:"1px 7px",borderRadius:10,marginLeft:6}}>{t.count}</span>}</div>)}
      </div>
    </div>
    <div style={{flex:1,overflowY:"auto",display:"flex"}}>
      <div style={{flex:1,overflowY:"auto"}}>
        {tab==="my-claims"&&<MyClaimsTab onNewClaim={()=>setWizardOpen(true)} onSelectClaim={setDrawerClaim}/>}
        {tab==="agency-review"&&<AgencyReviewTab onSelectClaim={setDrawerClaim}/>}
        {tab==="nrsc-audit"&&<NRSCAuditTab onSelectClaim={setDrawerClaim}/>}
        {tab==="reconciliation"&&<ReconciliationTab/>}
      </div>
      {drawerClaim&&<DetailDrawer claim={drawerClaim} onClose={()=>setDrawerClaim(null)} tab={tab}/>}
    </div>
  </div>;
}

/* ══════════════════════════════════════════
   TAB 1 — MY CLAIMS
   ══════════════════════════════════════════ */
function MyClaimsTab({onNewClaim,onSelectClaim}){
  const my=CLAIMS.filter(c=>c.person==="Daniel Thornton");
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
      <SCard label="Drafts" value={my.filter(c=>c.status==="Draft").length} color={T.g600}/>
      <SCard label="Submitted" value={my.filter(c=>c.status==="Submitted").length} color={T.blue}/>
      <SCard label="Returned" value={my.filter(c=>c.status==="Returned for Info").length} color={T.orange}/>
      <SCard label="Approved" value={my.filter(c=>["Approved at Agency","Under NRSC Audit","Closed"].includes(c.status)).length} color={T.green}/>
      <SCard label="Rejected" value={my.filter(c=>c.status==="Rejected").length} color={T.coral}/>
    </div>
    <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Claim ID</TH><TH>Deployment</TH><TH>Phase</TH><TH>Category</TH><TH>Amount</TH><TH>Currency</TH><TH>For</TH><TH>Status</TH><TH>Receipt</TH><TH>Next Action</TH></tr></thead>
        <tbody>{my.map((r,i)=><tr key={i} onClick={()=>onSelectClaim(r)} style={{cursor:"pointer"}}><TD mono>{r.id}</TD><TD>{r.deploy.split(" ").slice(0,2).join(" ")}</TD><TD>{r.phase}</TD><TD>{r.cat}</TD><TD fw={600}>${r.amt.toFixed(2)}</TD><TD><span style={{padding:"2px 8px",background:r.cur==="CAD"?T.tealL:T.g100,borderRadius:4,fontSize:11,fontWeight:600,color:r.cur==="CAD"?"#148895":T.g600}}>{r.cur}</span></TD><TD>{r.forw}</TD><TD><Chip color={statusChipColor(r.status)}>{r.status}</Chip></TD><TD>{r.receipt?<span style={{color:T.green}}>📎</span>:<span style={{color:T.coral,fontSize:11}}>Missing</span>}</TD><TD><span style={{fontSize:12,color:T.blue,fontWeight:550,cursor:"pointer"}}>{r.status==="Draft"?"Continue":"View"}</span></TD></tr>)}</tbody>
      </table>
    </div>
    <div style={{marginTop:16,padding:"12px 16px",background:T.blueL,borderRadius:6,fontSize:12,color:T.blue}}>
      <strong>Tip:</strong> Claims must be linked to a deployment phase. Receipts are required for all claims over $20 AUD.
    </div>
  </div>;
}

/* ══════════════════════════════════════════
   TAB 2 — AGENCY REVIEW
   ══════════════════════════════════════════ */
function AgencyReviewTab({onSelectClaim}){
  const[selected,setSelected]=useState([]);
  const toggle=id=>setSelected(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  const queue=CLAIMS.filter(c=>["Submitted","Special Approval Required","Returned for Info"].includes(c.status));
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
      <SCard label="Awaiting Review" value={queue.filter(c=>c.status==="Submitted").length} color={T.orange}/>
      <SCard label="Assigned to Me" value={2} color={T.blue}/>
      <SCard label="Pending Clarification" value={queue.filter(c=>c.status==="Returned for Info").length} color={T.orange}/>
      <SCard label="Overdue" value={1} sub=">14 days" color={T.coral}/>
      <SCard label="High Value" value={1} sub=">$150" color={T.navy}/>
      <SCard label="Meal Exceptions" value={1} color="#6C5CE7"/>
    </div>
    {selected.length>0&&<div style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:T.blueL,borderRadius:6,marginBottom:14}}>
      <span style={{fontSize:13,fontWeight:600}}>{selected.length} selected</span><div style={{flex:1}}/>
      <Btn v="secondary" s={{padding:"5px 12px",fontSize:12}}>Assign to Me</Btn>
      <Btn v="primary" s={{padding:"5px 12px",fontSize:12}}>✓ Approve Selected</Btn>
      <Btn v="secondary" s={{padding:"5px 12px",fontSize:12,color:T.orange,borderColor:T.orange}}>⏸ Mark Pending</Btn>
      <Btn v="secondary" s={{padding:"5px 12px",fontSize:12,color:T.coral,borderColor:T.coral}}>✕ Reject</Btn>
    </div>}
    <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH w={30}><input type="checkbox" style={{cursor:"pointer"}}/></TH><TH>Claim ID</TH><TH>Claimant</TH><TH>Agency</TH><TH>Deployment</TH><TH>Phase</TH><TH>Category</TH><TH>Amount</TH><TH>Currency</TH><TH>Status</TH><TH>Actions</TH></tr></thead>
        <tbody>{queue.map((r,i)=><tr key={i} style={{background:selected.includes(r.id)?T.blueL:"transparent"}}>
          <TD><input type="checkbox" checked={selected.includes(r.id)} onChange={()=>toggle(r.id)} style={{cursor:"pointer"}}/></TD>
          <TD mono>{r.id}</TD>
          <TD><div style={{display:"flex",alignItems:"center",gap:6}}><Av i={r.init} c={r.c} s={24}/><span style={{fontWeight:550,fontSize:12.5}}>{r.person}</span></div></TD>
          <TD>{r.agency}</TD><TD>{r.deploy.split(" ").slice(0,2).join(" ")}</TD><TD>{r.phase}</TD><TD>{r.cat}</TD>
          <TD fw={600}>${r.amt.toFixed(2)}</TD>
          <TD><span style={{padding:"2px 8px",background:r.cur==="CAD"?T.tealL:T.g100,borderRadius:4,fontSize:11,fontWeight:600,color:r.cur==="CAD"?"#148895":T.g600}}>{r.cur}</span></TD>
          <TD><Chip color={statusChipColor(r.status)}>{r.status}</Chip></TD>
          <TD><div style={{display:"flex",gap:3}}>
            <button onClick={(e)=>{e.stopPropagation();onSelectClaim(r);}} style={{width:24,height:24,borderRadius:"50%",border:"none",background:T.blueL,color:T.blue,cursor:"pointer",fontSize:10,display:"flex",alignItems:"center",justifyContent:"center"}}>👁</button>
            <button style={{width:24,height:24,borderRadius:"50%",border:"none",background:T.greenL,color:T.green,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✓</button>
            <button style={{width:24,height:24,borderRadius:"50%",border:"none",background:T.coralL,color:T.coral,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div></TD>
        </tr>)}</tbody>
      </table>
    </div>
    <div style={{marginTop:14,display:"flex",gap:14}}>
      <div style={{padding:"10px 14px",background:T.orangeL,borderRadius:6,fontSize:12,color:"#c06e15",flex:1}}>
        <strong>Reminder:</strong> 1 claim approaching 14-day review window. The 70-day no-response rule will auto-close claims without agency action.
      </div>
      <div style={{padding:"10px 14px",background:"#F3F0FF",borderRadius:6,fontSize:12,color:"#6C5CE7",flex:1}}>
        <strong>Special Approval:</strong> CLM-CAN-25112 requires INLO endorsement before agency review can proceed.
      </div>
    </div>
  </div>;
}

/* ══════════════════════════════════════════
   TAB 3 — NRSC AUDIT
   ══════════════════════════════════════════ */
function NRSCAuditTab({onSelectClaim}){
  const queue=CLAIMS.filter(c=>["Approved at Agency","Under NRSC Audit"].includes(c.status));
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
      <SCard label="Ready for Audit" value={queue.filter(c=>c.status==="Approved at Agency").length} color={T.blue}/>
      <SCard label="Under Review" value={queue.filter(c=>c.status==="Under NRSC Audit").length} color={T.teal}/>
      <SCard label="Returned to Agency" value={1} color={T.orange}/>
      <SCard label="Exceptions" value={1} color={T.coral}/>
      <SCard label="Audit Completed" value={28} sub="Season 2025/26" color={T.green}/>
    </div>
    <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Claim ID</TH><TH>Claimant</TH><TH>Home Agency</TH><TH>Deployment</TH><TH>Phase</TH><TH>Category</TH><TH>Local Amount</TH><TH>Currency</TH><TH>Agency Decision</TH><TH>Audit Status</TH></tr></thead>
        <tbody>{queue.map((r,i)=><tr key={i} onClick={()=>onSelectClaim(r)} style={{cursor:"pointer"}}>
          <TD mono>{r.id}</TD>
          <TD><div style={{display:"flex",alignItems:"center",gap:6}}><Av i={r.init} c={r.c} s={24}/><span style={{fontWeight:550,fontSize:12.5}}>{r.person}</span></div></TD>
          <TD>{r.agency}</TD><TD>{r.deploy.split(" ").slice(0,2).join(" ")}</TD><TD>{r.phase}</TD><TD>{r.cat}</TD>
          <TD fw={600}>${r.amt.toFixed(2)}</TD>
          <TD><span style={{padding:"2px 8px",background:r.cur==="CAD"?T.tealL:T.g100,borderRadius:4,fontSize:11,fontWeight:600}}>{r.cur}</span></TD>
          <TD>{r.updated}</TD>
          <TD><Chip color={r.status==="Under NRSC Audit"?"teal":"blue"}>{r.status==="Approved at Agency"?"Awaiting Audit":r.status}</Chip></TD>
        </tr>)}</tbody>
      </table>
    </div>
    <div style={{marginTop:16,padding:"12px 16px",background:T.tealL,borderRadius:6,fontSize:12,color:"#148895"}}>
      <strong>Audit note:</strong> 1 claim (CLM-NT-25022) has been under NRSC review for 5 days. Receipt verified at agency level. Exchange rate applied: 1 CAD = 1.12 AUD.
    </div>
  </div>;
}

/* ══════════════════════════════════════════
   TAB 4 — RECONCILIATION
   ══════════════════════════════════════════ */
function ReconciliationTab(){
  const[deploy,setDeploy]=useState("Northern Rivers Flood");
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
      <div style={{display:"flex",gap:8}}>
        {["Northern Rivers Flood","Canada 2025 Wildfire","Darwin Support"].map(d=><button key={d} onClick={()=>setDeploy(d)} style={{padding:"6px 14px",borderRadius:6,fontSize:12,fontWeight:550,cursor:"pointer",border:`1px solid ${deploy===d?T.blue:T.g300}`,background:deploy===d?T.blueL:"#fff",color:deploy===d?T.blue:T.navy,fontFamily:"inherit"}}>{d}</button>)}
      </div>
      <div style={{display:"flex",gap:8}}><Btn v="secondary">Export Invoice Pack</Btn><Btn v="primary">Generate Reconciliation</Btn></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
      <SCard label="Total Claims" value="64" color={T.navy}/>
      <SCard label="Approved Value" value="$62,400" color={T.green}/>
      <SCard label="Travel & Flights" value="$98,200" color={T.blue}/>
      <SCard label="Accommodation" value="$124,400" color={T.teal}/>
      <SCard label="Open Exceptions" value="3" color={T.coral}/>
      <SCard label="Invoice Status" value="Draft" color={T.orange}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
      <div>
        <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Claims by Jurisdiction</div>
          <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Jurisdiction</TH><TH>Agency</TH><TH>Claims</TH><TH>Approved Value</TH><TH>Travel</TH><TH>Accommodation</TH><TH>Variance</TH></tr></thead>
            <tbody>{[
              {j:"NSW",ag:"RFS / SES",claims:22,approved:"$18,400",travel:"$42,100",acc:"$52,800",variance:"$1,200"},
              {j:"VIC",ag:"CFA",claims:14,approved:"$12,100",travel:"$18,600",acc:"$24,200",variance:"—"},
              {j:"SA",ag:"CFS / SASES",claims:8,approved:"$7,200",travel:"$12,400",acc:"$16,800",variance:"$800"},
              {j:"QLD",ag:"QFES",claims:12,approved:"$8,600",travel:"$14,200",acc:"$18,400",variance:"—"},
              {j:"WA",ag:"DFES",claims:4,approved:"$5,200",travel:"$6,400",acc:"$8,200",variance:"$450"},
              {j:"International",ag:"FENZ",claims:4,approved:"$10,900",travel:"$4,500",acc:"$4,000",variance:"$1,100"},
            ].map((r,i)=><tr key={i}><TD fw={600}>{r.j}</TD><TD>{r.ag}</TD><TD>{r.claims}</TD><TD fw={600}>{r.approved}</TD><TD>{r.travel}</TD><TD>{r.acc}</TD><TD>{r.variance!=="—"?<span style={{color:T.coral,fontWeight:600}}>{r.variance}</span>:<span style={{color:T.g400}}>—</span>}</TD></tr>)}</tbody>
          </table>
        </div>
        <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
          <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Claims by Phase</div>
          <div style={{padding:"14px 18px"}}>
            {[{phase:"Mobilisation",claims:18,value:"$14,200",pct:23},{phase:"Deployment",claims:38,value:"$39,800",pct:64},{phase:"Demobilisation",claims:8,value:"$8,400",pct:13}].map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"8px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
              <span style={{fontSize:13,fontWeight:600,width:120}}>{p.phase}</span>
              <div style={{flex:1,height:8,background:T.g100,borderRadius:4,overflow:"hidden"}}><div style={{height:"100%",background:T.blue,borderRadius:4,width:`${p.pct}%`}}/></div>
              <span style={{fontSize:12,fontWeight:600,width:70,textAlign:"right"}}>{p.value}</span>
              <span style={{fontSize:11,color:T.g500,width:50,textAlign:"right"}}>{p.claims} claims</span>
            </div>)}
          </div>
        </div>
      </div>
      <div>
        <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Invoice Support</div>
          <div style={{padding:"14px 18px",fontSize:12.5}}>
            {[["Invoice Reference","INV-AFAC-NR-2025-003"],["Billing Entity","AFAC NRSC"],["Receiving","NSW Government — Emergency Services"],["Period","14 Mar – 14 Apr 2026 (est.)"],["Status","Draft — awaiting final demob costs"],["Prepared by","Jessica Walsh (NRSC)"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550,textAlign:"right",maxWidth:140}}>{v}</span></div>)}
          </div>
        </div>
        <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
          <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Pack Checklist</div>
          <div style={{padding:"14px 18px"}}>
            {[{item:"All claims audited",done:false},{item:"Travel costs reconciled",done:true},{item:"Accommodation verified",done:true},{item:"Exceptions resolved",done:false},{item:"Invoice notes complete",done:false}].map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",fontSize:12.5}}>
              <span style={{width:18,height:18,borderRadius:4,border:`1.5px solid ${c.done?T.green:T.g300}`,background:c.done?T.greenL:"transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:T.green}}>{c.done&&"✓"}</span>
              <span style={{color:c.done?T.g600:T.navy,fontWeight:c.done?400:550}}>{c.item}</span>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ══════════════════════════════════════════
   DETAIL DRAWER
   ══════════════════════════════════════════ */
function DetailDrawer({claim,onClose,tab}){
  const timeline=[
    {step:"Submitted",date:claim.date+" 14:30",done:true},
    {step:"Agency Review",date:["Approved at Agency","Under NRSC Audit"].includes(claim.status)?claim.updated:"—",done:["Approved at Agency","Under NRSC Audit","Closed"].includes(claim.status)},
    {step:"NRSC Audit",date:claim.status==="Under NRSC Audit"?claim.updated:"—",done:claim.status==="Under NRSC Audit"||claim.status==="Closed"},
    {step:"Closed",date:"—",done:claim.status==="Closed"},
  ];
  return <div style={{width:340,borderLeft:`1px solid ${T.g200}`,background:"#fff",flexShrink:0,overflowY:"auto",display:"flex",flexDirection:"column"}}>
    <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:14,fontWeight:650}}>Claim Detail</span>
      <span onClick={onClose} style={{cursor:"pointer",color:T.g400,fontSize:20,lineHeight:1}}>×</span>
    </div>
    <div style={{padding:"14px 18px",flex:1}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <Av i={claim.init} c={claim.c} s={36}/><div><div style={{fontWeight:600}}>{claim.person}</div><div style={{fontSize:11,color:T.g500}}>{claim.agency}</div></div>
      </div>
      <div style={{fontSize:12.5,marginBottom:16}}>
        {[["Claim ID",claim.id],["Deployment",claim.deploy],["Phase",claim.phase],["Category",claim.cat],["Amount",`$${claim.amt.toFixed(2)} ${claim.cur}`],["For",claim.forw],["Status",claim.status],["Last Updated",claim.updated]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${T.g50}`}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550}}>{v}</span></div>)}
      </div>
      {claim.receipt&&<div style={{padding:10,border:`1px solid ${T.g200}`,borderRadius:6,marginBottom:14,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:18}}>📎</span><div style={{flex:1}}><div style={{fontSize:12,fontWeight:550}}>receipt_{claim.cat.toLowerCase()}_{claim.date.replace(" ","")}.jpg</div><div style={{fontSize:10,color:T.g500}}>1.2 MB · Verified</div></div><Chip color="green">Attached</Chip>
      </div>}
      {claim.reason&&<div style={{padding:"10px 12px",background:T.orangeL,borderRadius:6,fontSize:12,color:"#c06e15",marginBottom:14}}><strong>Note:</strong> {claim.reason}</div>}
      <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Status Timeline</div>
      <div style={{marginBottom:16}}>
        {timeline.map((st,i)=><div key={i} style={{display:"flex",gap:10,marginBottom:i<3?0:0}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:st.done?T.green:T.g200,color:st.done?"#fff":T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700}}>{st.done?"✓":i+1}</div>
            {i<3&&<div style={{width:2,height:20,background:st.done?T.green:T.g200}}/>}
          </div>
          <div style={{paddingBottom:8}}><div style={{fontSize:12,fontWeight:st.done?600:400,color:st.done?T.navy:T.g400}}>{st.step}</div><div style={{fontSize:10,color:T.g400}}>{st.date}</div></div>
        </div>)}
      </div>
      {tab==="nrsc-audit"&&<><div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Audit Notes</div><textarea style={{width:"100%",height:50,border:`1px solid ${T.g200}`,borderRadius:6,padding:8,fontSize:12,fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}} placeholder="Add audit notes..."/></>}
    </div>
    <div style={{padding:"12px 18px",borderTop:`1px solid ${T.g200}`,display:"flex",gap:6}}>
      {tab==="agency-review"&&<><Btn v="primary" s={{flex:1,justifyContent:"center",fontSize:12}}>Approve</Btn><Btn v="secondary" s={{flex:1,justifyContent:"center",fontSize:12,color:T.orange,borderColor:T.orange}}>Pending</Btn><Btn v="secondary" s={{flex:1,justifyContent:"center",fontSize:12,color:T.coral,borderColor:T.coral}}>Reject</Btn></>}
      {tab==="nrsc-audit"&&<><Btn v="primary" s={{flex:1,justifyContent:"center",fontSize:12}}>Pass Audit</Btn><Btn v="secondary" s={{flex:1,justifyContent:"center",fontSize:12,color:T.orange,borderColor:T.orange}}>Return for Info</Btn></>}
      {tab==="my-claims"&&<Btn v="secondary" s={{flex:1,justifyContent:"center",fontSize:12}}>Close</Btn>}
    </div>
  </div>;
}

/* ══════════════════════════════════════════
   CLAIM WIZARD
   ══════════════════════════════════════════ */
function ClaimWizard({onClose}){
  const[step,setStep]=useState(1);
  const steps=["Deployment & Phase","Expense Details","Receipt & Evidence","Allocation","Review & Submit"];
  return <div style={{padding:"24px 32px",maxWidth:860,margin:"0 auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Submit Expense Claim</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Step {step} of {steps.length} — {steps[step-1]}</p></div>
      <Btn v="ghost" onClick={onClose}>✕ Cancel</Btn>
    </div>
    <div style={{display:"flex",alignItems:"center",marginBottom:24}}>
      {steps.map((st,i)=>{const n=i+1,done=n<step,active=n===step;return<div key={i} style={{flex:1,display:"flex",alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:28,height:28,borderRadius:"50%",background:done?T.green:active?T.blue:T.g200,color:done||active?"#fff":T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>{done?"✓":n}</div>
          <div style={{fontSize:9,color:active?T.blue:done?T.green:T.g400,fontWeight:active?600:400,marginTop:3,whiteSpace:"nowrap",maxWidth:80,textAlign:"center",overflow:"hidden",textOverflow:"ellipsis"}}>{st}</div>
        </div>{i<4&&<div style={{flex:1,height:2,background:done?T.green:T.g200,margin:"0 6px",marginBottom:16}}/>}
      </div>})}
    </div>
    <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,padding:"20px 24px"}}>
      {step===1&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Deployment & Phase</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:16}}>Select the deployment and phase this expense relates to.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
          <Field label="Deployment">Northern Rivers Flood Response</Field>
          <Field label="Contingent / Team">CREW2 — Storm Ops</Field>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
          {[{id:"mob",label:"Mobilisation",desc:"Travel, briefing, preparation"},{id:"dep",label:"Deployment",desc:"Operational expenses in field"},{id:"demob",label:"Demobilisation",desc:"Return travel, post-deployment"}].map(p=><div key={p.id} style={{padding:14,border:`2px solid ${p.id==="dep"?T.blue:T.g200}`,borderRadius:8,cursor:"pointer",background:p.id==="dep"?T.blueL:"#fff"}}>
            <div style={{fontSize:13,fontWeight:650,marginBottom:3}}>{p.label}</div><div style={{fontSize:11.5,color:T.g500}}>{p.desc}</div>
          </div>)}
        </div>
      </div>}
      {step===2&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Expense Details</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label="Expense Category">🍽 Meals</Field>
          <Field label="Currency">AUD — Australian Dollar</Field>
          <Field label="Amount">$52.40</Field>
          <Field label="Date of Expense">30 March 2026</Field>
          <div style={{gridColumn:"1/3"}}><Field label="Description">Dinner — Lismore CBD restaurant, team dinner after operations</Field></div>
        </div>
        <div style={{marginTop:14,padding:"10px 14px",background:T.greenL,borderRadius:6,fontSize:12,color:"#4a7a12"}}>✓ Within daily meal allowance threshold ($80.00 AUD per day). No special approval required.</div>
      </div>}
      {step===3&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Receipt & Evidence</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:16}}>Upload a photo or scan of your receipt. Accepted formats: JPG, PNG, PDF (max 10MB).</p>
        <div style={{border:`2px dashed ${T.g300}`,borderRadius:8,padding:28,textAlign:"center",background:T.g50}}>
          <div style={{fontSize:32,marginBottom:6}}>📸</div>
          <div style={{fontSize:14,fontWeight:600,marginBottom:3}}>Drag receipt here or tap to capture</div>
          <div style={{fontSize:12,color:T.g500}}>JPG, PNG, or PDF · Max 10MB</div>
          <Btn v="primary" s={{marginTop:12}}>📷 Capture Receipt</Btn>
        </div>
        <div style={{marginTop:14,padding:10,border:`1px solid ${T.g200}`,borderRadius:6,display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:18}}>📎</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:550}}>receipt_dinner_30mar.jpg</div><div style={{fontSize:11,color:T.g500}}>1.2 MB · Uploaded just now</div></div><Chip color="green">Attached</Chip>
        </div>
      </div>}
      {step===4&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Claim Allocation</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:16}}>Is this claim for you only, or shared with others?</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
          {[{id:"self",label:"Self Only",desc:"Full amount to me",sel:true},{id:"shared",label:"Self + Others",desc:"Split across team",sel:false},{id:"others",label:"Others Only",desc:"On behalf of others",sel:false}].map(o=><div key={o.id} style={{padding:14,border:`2px solid ${o.sel?T.blue:T.g200}`,borderRadius:8,cursor:"pointer",background:o.sel?T.blueL:"#fff"}}>
            <div style={{fontSize:13,fontWeight:650}}>{o.label}</div><div style={{fontSize:11.5,color:T.g600,marginTop:2}}>{o.desc}</div>
          </div>)}
        </div>
        <div style={{padding:12,background:T.g50,borderRadius:6,fontSize:12.5}}><div style={{fontWeight:600,marginBottom:4}}>Allocation Summary</div><div>Daniel Thornton — $52.40 AUD (100%)</div></div>
      </div>}
      {step===5&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Review & Submit</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 24px",fontSize:13,marginBottom:16}}>
          {[["Deployment","Northern Rivers Flood Response"],["Phase","Deployment"],["Category","Meals"],["Amount","$52.40 AUD"],["Date","30 March 2026"],["Description","Dinner — Lismore CBD"],["Receipt","receipt_dinner_30mar.jpg ✓"],["Allocation","Self only (100%)"]].map(([k,v],i)=><div key={i}><div style={{fontSize:11,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:550,marginTop:2}}>{v}</div></div>)}
        </div>
        <div style={{display:"flex",gap:12,marginBottom:16}}>
          <div style={{flex:1,padding:"10px 14px",background:T.blueL,borderRadius:6,fontSize:12,color:T.blue}}>This claim will be submitted to QLD QFES for agency review. You will be notified when the status changes.</div>
        </div>
        <div style={{padding:"10px 14px",background:T.g50,borderRadius:6,fontSize:12,color:T.g600}}>
          <strong>Routing:</strong> Team Member → Agency Review → NRSC Audit → Closed
        </div>
      </div>}
      <div style={{display:"flex",justifyContent:"space-between",marginTop:24,paddingTop:16,borderTop:`1px solid ${T.g200}`}}>
        {step>1?<Btn v="secondary" onClick={()=>setStep(step-1)}>← Previous</Btn>:<Btn v="ghost" onClick={onClose}>Cancel</Btn>}
        <div style={{display:"flex",gap:8}}>
          {step===5&&<Btn v="secondary">Save Draft</Btn>}
          <Btn v="primary" onClick={()=>{if(step<5)setStep(step+1);else onClose();}}>{step===5?"Submit Claim":"Continue →"}</Btn>
        </div>
      </div>
    </div>
  </div>;
}

/* Legacy named exports for backwards compat */
export { FinanceWorkspace as MyClaims, FinanceWorkspace as ClaimSubmit, FinanceWorkspace as AgencyReview, FinanceWorkspace as NRSCAudit, FinanceWorkspace as Reconciliation };
