import { useState, useEffect, useCallback } from "react";

/* ─── Brand Tokens ─── */
const T={blue:"#0E78C9",blueL:"#E8F4FC",blueH:"#0B6AB5",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",navyL:"#3A5068",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};

/* ─── Tiny components ─── */
const Chip=({color,children,dot=true})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,whiteSpace:"nowrap",background:c.bg,color:c.fg}}>{dot&&<span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>}{children}</span>};

const Avatar=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;

const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",transition:"all .12s"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600},sm:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`,padding:"4px 12px",fontSize:12}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};

const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;

const Tabs=({tabs,active,onChange})=><div style={{display:"flex",borderBottom:`2px solid ${T.g200}`,gap:0,marginBottom:20}}>{tabs.map(t=><div key={t.id} onClick={()=>onChange(t.id)} style={{padding:"8px 18px",fontSize:13,fontWeight:550,color:active===t.id?T.blue:T.g500,borderBottom:`2px solid ${active===t.id?T.blue:"transparent"}`,marginBottom:-2,cursor:"pointer",whiteSpace:"nowrap",transition:"all .12s"}}>{t.label}{t.count!=null&&<span style={{background:active===t.id?T.blueL:T.g100,color:active===t.id?T.blue:T.g600,fontSize:10,padding:"1px 6px",borderRadius:10,marginLeft:6}}>{t.count}</span>}</div>)}</div>;

const TH=({children})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap",background:T.white,position:"sticky",top:0}}>{children}</th>;
const TD=({children,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontSize:mono?11.5:13,...s}}>{children}</td>;

const Badge=({label,color})=><span style={{padding:"3px 10px",borderRadius:4,fontSize:11,fontWeight:600,background:color==="green"?T.greenL:color==="blue"?T.blueL:color==="orange"?T.orangeL:color==="coral"?T.coralL:color==="teal"?T.tealL:T.g100,color:color==="green"?"#5a8a1f":color==="blue"?T.blue:color==="orange"?"#c06e15":color==="coral"?T.coral:color==="teal"?"#148895":T.g600}}>{label}</span>;

const Progress=({pct,color=T.blue})=><div style={{height:6,background:T.g200,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:3,transition:"width .5s"}}/></div>;

const FilterChips=({items,active,onChange})=><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>{items.map(f=><span key={f} onClick={()=>onChange(f)} style={{padding:"4px 14px",borderRadius:20,fontSize:11.5,fontWeight:550,border:`1px solid ${active===f?T.blue:T.g300}`,background:active===f?T.blue:T.white,color:active===f?T.white:T.g600,cursor:"pointer",transition:"all .1s"}}>{f}</span>)}</div>;

/* ─── NAV structure ─── */
const SCREENS=[
  {group:"Capability 1",items:[
    {id:"c1-readiness",label:"My Readiness Dashboard",icon:"◉"},
    {id:"c1-eoi",label:"Registration / EOI Wizard",icon:"📋"},
    {id:"c1-roles",label:"Roles & Evidence",icon:"🎖"},
    {id:"c1-agency-review",label:"Agency Review Queue",icon:"✓"},
    {id:"c1-national",label:"National Readiness Exceptions",icon:"🔍"},
  ]},
  {group:"Capability 2",items:[
    {id:"c2-register",label:"Request Register",icon:"📄"},
    {id:"c2-order",label:"Order & Fulfilment Console",icon:"📦"},
    {id:"c2-contingent",label:"Contingent Builder",icon:"👥"},
    {id:"c2-manifest",label:"International Manifest",icon:"✈"},
    {id:"c2-travel",label:"Travel & Logistics Planner",icon:"🗺"},
    {id:"c2-movement",label:"Movement-State Dashboard",icon:"📊"},
  ]},
];

/* ─── Main App ─── */
export default function NDMSStage1(){
  const[screen,setScreen]=useState("c1-readiness");
  const[mounted,setMounted]=useState(false);
  useEffect(()=>{setMounted(true)},[]);

  const renderScreen=()=>{
    switch(screen){
      case"c1-readiness":return<C1Readiness/>;
      case"c1-eoi":return<C1EOIWizard/>;
      case"c1-roles":return<C1RolesEvidence/>;
      case"c1-agency-review":return<C1AgencyReview/>;
      case"c1-national":return<C1NationalExceptions/>;
      case"c2-register":return<C2RequestRegister/>;
      case"c2-order":return<C2OrderConsole/>;
      case"c2-contingent":return<C2ContingentBuilder/>;
      case"c2-manifest":return<C2ManifestBuilder/>;
      case"c2-travel":return<C2TravelPlanner/>;
      case"c2-movement":return<C2MovementDashboard/>;
      default:return<C1Readiness/>;
    }
  };

  const currentLabel=SCREENS.flatMap(g=>g.items).find(i=>i.id===screen)?.label||"";

  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:T.navy,fontSize:14,lineHeight:1.5,WebkitFontSmoothing:"antialiased",opacity:mounted?1:0,transition:"opacity .3s"}}>
      {/* NAV */}
      <nav style={{width:260,background:T.navy,display:"flex",flexDirection:"column",flexShrink:0,overflowY:"auto",overflowX:"hidden"}}>
        <div style={{padding:"18px 18px 14px",borderBottom:"1px solid rgba(255,255,255,.08)",display:"flex",alignItems:"center",gap:11}}>
          <div style={{width:36,height:36,background:T.blue,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:800,fontSize:14}}>N</div>
          <div><div style={{color:T.white,fontWeight:700,fontSize:15.5,letterSpacing:.3}}>NDMS</div><div style={{color:"rgba(255,255,255,.35)",fontSize:10}}>Stage 1 Prototype</div></div>
        </div>
        <div style={{flex:1,padding:"6px 0"}}>
          {SCREENS.map((g,gi)=>(
            <div key={gi} style={{padding:"10px 12px 4px"}}>
              <div style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,.3)",textTransform:"uppercase",letterSpacing:1.2,padding:"0 10px 8px"}}>{g.group}</div>
              {g.items.map(item=>{
                const active=screen===item.id;
                return<div key={item.id} onClick={()=>setScreen(item.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"7px 11px",borderRadius:6,cursor:"pointer",color:active?T.white:"rgba(255,255,255,.55)",background:active?"rgba(14,120,201,.2)":"transparent",fontSize:12.5,fontWeight:active?600:450,position:"relative",transition:"all .1s",marginBottom:1}}>
                  {active&&<div style={{position:"absolute",left:-12,top:"50%",transform:"translateY(-50%)",width:3,height:18,background:T.blue,borderRadius:"0 3px 3px 0"}}/>}
                  <span style={{fontSize:14,width:20,textAlign:"center",opacity:active?1:.6}}>{item.icon}</span>
                  {item.label}
                </div>;
              })}
            </div>
          ))}
        </div>
        <div style={{padding:"12px 16px",borderTop:"1px solid rgba(255,255,255,.08)"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <Avatar i="JW" c={T.teal} s={32}/>
            <div><div style={{color:"rgba(255,255,255,.85)",fontSize:12.5,fontWeight:550}}>Jessica Walsh</div><div style={{color:"rgba(255,255,255,.35)",fontSize:11}}>NRSC Staff</div></div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main style={{flex:1,display:"flex",flexDirection:"column",minWidth:0,background:T.g50}}>
        <div style={{height:52,background:T.white,borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",padding:"0 24px",gap:12,flexShrink:0}}>
          <span style={{fontSize:13.5,fontWeight:650}}>{currentLabel}</span>
          <div style={{flex:1}}/>
          <span style={{padding:"3px 10px",background:T.orangeL,color:T.orange,fontSize:10,fontWeight:650,borderRadius:4,letterSpacing:.5}}>PROTOTYPE</span>
        </div>
        <div style={{flex:1,overflowY:"auto"}} key={screen}>{renderScreen()}</div>
      </main>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAPABILITY 1 — TEAM MEMBER DATABASE
   ═══════════════════════════════════════════════════════════════ */

/* ── C1: My Readiness Dashboard ── */
function C1Readiness(){
  return<div style={{padding:"24px 32px"}}>
    {/* Welcome */}
    <div style={{background:`linear-gradient(135deg,${T.blue},#0a5f9e)`,borderRadius:10,padding:"22px 30px",color:T.white,marginBottom:24,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div><h2 style={{color:T.white,fontSize:20,fontWeight:700,margin:0}}>Welcome back, Daniel</h2><p style={{color:"rgba(255,255,255,.6)",fontSize:13,margin:"4px 0 0"}}>2 items need attention · 1 active deployment · Interstate ready</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="sm" s={{background:"rgba(255,255,255,.15)",color:T.white,border:"1px solid rgba(255,255,255,.2)"}}>View Deployment</Btn></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"280px 1fr 1fr",gap:20}}>
      {/* Readiness ring */}
      <Card title="Deployability" right={<Chip color="green">Interstate Ready</Chip>}>
        <div style={{textAlign:"center",padding:"8px 0"}}>
          <div style={{width:120,height:120,margin:"0 auto 12px",position:"relative"}}>
            <svg viewBox="0 0 100 100" style={{width:"100%",height:"100%",transform:"rotate(-90deg)"}}><circle cx="50" cy="50" r="42" fill="none" stroke={T.g200} strokeWidth="8"/><circle cx="50" cy="50" r="42" fill="none" stroke={T.green} strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="40"/></svg>
            <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}><span style={{fontSize:26,fontWeight:700}}>85%</span><span style={{fontSize:10.5,color:T.g500}}>Complete</span></div>
          </div>
          <div style={{display:"flex",gap:20,justifyContent:"center",marginTop:4}}>
            <div><div style={{fontSize:16,color:T.green}}>✓</div><div style={{fontSize:10.5,color:T.g500}}>Interstate</div></div>
            <div><div style={{fontSize:16,color:T.orange}}>○</div><div style={{fontSize:10.5,color:T.g500}}>International</div></div>
          </div>
        </div>
        <div style={{marginTop:12}}>
          <div style={{fontSize:11,color:T.g500,marginBottom:4}}>Deployment Interest</div>
          <div style={{display:"flex",gap:6}}><Chip color="green">Interstate</Chip><Chip color="gray">International (incomplete)</Chip></div>
        </div>
        <div style={{marginTop:12}}>
          <div style={{fontSize:11,color:T.g500,marginBottom:4}}>Documents</div>
          <div style={{fontSize:13,fontWeight:600}}>7 uploaded <span style={{color:T.g400,fontWeight:400}}>· 5 valid · 1 expiring · 1 missing</span></div>
        </div>
      </Card>

      {/* Checklist + expiring */}
      <div>
        <Card title="Open Tasks" right={<Chip color="orange">2</Chip>}>
          {[
            {icon:"⚠",bg:T.orangeL,fg:T.orange,title:"WWCC expiring in 3 days",sub:"Upload renewed Working With Children Check before 2 Apr 2026",action:"Update document"},
            {icon:"📎",bg:T.blueL,fg:T.blue,title:"Upload passport for international readiness",sub:"Required to be considered for international deployments",action:"Upload now"},
          ].map((t,i)=><div key={i} style={{display:"flex",gap:10,padding:"10px 0",borderBottom:i<1?`1px solid ${T.g100}`:"none"}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:t.bg,color:t.fg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{t.icon}</div>
            <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{t.title}</div><div style={{fontSize:11.5,color:T.g500,marginTop:1}}>{t.sub}</div></div>
            <Btn v="sm" s={{alignSelf:"center"}}>{t.action}</Btn>
          </div>)}
        </Card>

        <Card title="Readiness Checklist" s={{marginTop:16}}>
          {[
            {done:true,t:"Profile complete",s:"Personal details, emergency contacts, next of kin"},
            {done:true,t:"Code of Conduct signed",s:"Signed 12 Jan 2026"},
            {done:true,t:"MFA enabled",s:"Authenticator app configured"},
            {done:true,t:"Roles approved",s:"Crew Leader, Strike Team Leader — approved by NSW RFS"},
            {done:true,t:"Medical fitness",s:"Certificate valid until 18 Nov 2026"},
            {done:false,t:"Passport uploaded",s:"Required for international deployability"},
            {done:false,t:"Working With Children Check",s:"Expires 2 Apr 2026 — renewal needed"},
          ].map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 0",borderBottom:i<6?`1px solid ${T.g100}`:"none"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:item.done?T.greenL:T.orangeL,color:item.done?T.green:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{item.done?"✓":"!"}</div>
            <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:500}}>{item.t}</div><div style={{fontSize:11,color:item.done?T.g500:T.orange}}>{item.s}</div></div>
          </div>)}
        </Card>
      </div>

      {/* Current deployment + docs */}
      <div>
        <Card title="Active Deployment" right={<Chip color="blue">Day 8</Chip>}>
          <div style={{borderLeft:`3px solid ${T.blue}`,paddingLeft:14,marginBottom:14}}>
            <div style={{fontSize:15,fontWeight:650,marginBottom:6}}>NT Cyclone Response</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 16px",fontSize:12}}>
              {[["Request","2025_26_007NT_NSW001"],["Role","Crew Leader"],["Location","Darwin, NT"],["Contingent","CREW2"],["Agency","NSW RFS"],["Status","Working"]].map(([k,v],i)=><div key={i}><span style={{color:T.g400,fontSize:10.5}}>{k}</span><div style={{fontWeight:550,fontFamily:k==="Request"?"'DM Mono',monospace":"inherit",fontSize:k==="Request"?11:12}}>{v}</div></div>)}
            </div>
          </div>
          <div style={{fontSize:12,fontWeight:600,marginBottom:6}}>Fatigue</div>
          <div style={{display:"flex",gap:2,marginBottom:4}}>{["W","W","R","W","W","R","W","✦"].map((d,i)=><div key={i} style={{flex:1,height:22,borderRadius:3,background:d==="R"?T.teal:d==="✦"?T.green:T.blue,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,border:d==="✦"?`2px solid ${T.navy}`:"none"}}>{d}</div>)}</div>
          <div style={{fontSize:9.5,color:T.g400,display:"flex",justifyContent:"space-between"}}><span>22 Mar</span><span style={{color:T.navy,fontWeight:600}}>Today</span></div>
        </Card>

        <Card title="Documents" right={<span style={{fontSize:12,color:T.g500}}>7 total</span>} s={{marginTop:16}}>
          {[
            {n:"Medical Fitness Certificate",m:"Exp. 18 Nov 2026",st:"Valid",c:"green"},
            {n:"Code of Conduct Declaration",m:"Signed 12 Jan 2026",st:"Valid",c:"green"},
            {n:"Working With Children Check",m:"Exp. 2 Apr 2026",st:"Expiring",c:"orange"},
            {n:"Chainsaw Operator Cert",m:"Uploaded 8 Sep 2025",st:"Valid",c:"green"},
            {n:"First Aid Certificate",m:"Exp. 15 Aug 2026",st:"Valid",c:"green"},
          ].map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"7px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none"}}>
            <span style={{fontSize:15}}>📄</span>
            <div style={{flex:1}}><div style={{fontSize:12,fontWeight:500}}>{d.n}</div><div style={{fontSize:10.5,color:T.g500}}>{d.m}</div></div>
            <Badge label={d.st} color={d.c}/>
          </div>)}
        </Card>
      </div>
    </div>
  </div>;
}

/* ── C1: Registration / EOI Wizard ── */
function C1EOIWizard(){
  const[step,setStep]=useState(1);
  const[deployType,setDeployType]=useState("interstate");
  const steps=["Deployment Type","Personal Details","Roles & Qualifications","Documents","Code of Conduct","Review & Submit"];

  return<div style={{padding:"24px 32px",maxWidth:900,margin:"0 auto"}}>
    <div style={{marginBottom:24}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Expression of Interest</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Complete each section to register for interstate or international deployments</p></div>

    {/* Progress tracker */}
    <div style={{display:"flex",alignItems:"center",marginBottom:32}}>
      {steps.map((st,i)=>{
        const num=i+1;const done=num<step;const active=num===step;
        return<div key={i} style={{flex:1,display:"flex",alignItems:"center"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:0}}>
            <div style={{width:30,height:30,borderRadius:"50%",background:done?T.green:active?T.blue:T.g200,color:done||active?T.white:T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,transition:"all .2s"}}>{done?"✓":num}</div>
            <div style={{fontSize:10,color:active?T.blue:done?T.green:T.g400,fontWeight:active?600:400,marginTop:4,whiteSpace:"nowrap",textAlign:"center"}}>{st}</div>
          </div>
          {i<5&&<div style={{flex:1,height:2,background:done?T.green:T.g200,margin:"0 8px",marginBottom:18}}/>}
        </div>;
      })}
    </div>

    <Card>
      {step===1&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:4}}>What type of deployment are you interested in?</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:20}}>Select one or both options. International deployments require additional documentation including passport and eTA.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          {[{id:"interstate",title:"Interstate Deployment",desc:"Support other Australian states and territories during emergencies",icon:"🇦🇺",reqs:["Profile & emergency contacts","Medical fitness certificate","Relevant qualifications","Working With Children Check"]},
            {id:"international",title:"International Deployment",desc:"Deploy to international partner countries under AFAC coordination",icon:"🌏",reqs:["All interstate requirements","Valid passport","eTA or visa","Additional briefing completion"]}
          ].map(opt=><div key={opt.id} onClick={()=>setDeployType(opt.id)} style={{border:`2px solid ${deployType===opt.id?T.blue:T.g200}`,borderRadius:8,padding:20,cursor:"pointer",background:deployType===opt.id?T.blueL:T.white,transition:"all .12s"}}>
            <div style={{fontSize:24,marginBottom:8}}>{opt.icon}</div>
            <div style={{fontSize:15,fontWeight:650,marginBottom:4}}>{opt.title}</div>
            <div style={{fontSize:12.5,color:T.g600,marginBottom:12}}>{opt.desc}</div>
            <div style={{fontSize:11,color:T.g500}}>
              <div style={{fontWeight:600,marginBottom:4}}>Requirements:</div>
              {opt.reqs.map((r,i)=><div key={i} style={{padding:"2px 0"}}>• {r}</div>)}
            </div>
          </div>)}
        </div>
      </div>}

      {step===2&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:4}}>Personal Details</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:20}}>Your profile information for deployment coordination. All fields are required.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 20px"}}>
          {[["Given name","Daniel"],["Family name","Thornton"],["Date of birth","14/06/1988"],["Phone (mobile)","+61 412 345 678"],["Email","d.thornton@nswrfs.nsw.gov.au"],["Agency","NSW Rural Fire Service"],["Jurisdiction","NSW"],["Emergency contact","Sarah Thornton — +61 408 123 456"]].map(([l,v],i)=><div key={i}>
            <label style={{fontSize:11.5,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>{l}</label>
            <div style={{padding:"8px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>{v}</div>
          </div>)}
        </div>
      </div>}

      {step===3&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:4}}>Roles & Qualifications</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:20}}>Select the roles you are qualified for. Your agency will verify these before approval.</p>
        {[{role:"Crew Leader",qual:"Advanced Firefighting, Crew Leader Cert",status:"Approved",c:"green"},
          {role:"Strike Team Leader",qual:"STL Qualification, Leadership Module",status:"Approved",c:"green"},
          {role:"Storm Damage Operator",qual:"Chainsaw Operator Cert, Working at Heights",status:"Under Review",c:"teal"},
        ].map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
          <div style={{width:22,height:22,borderRadius:4,border:`2px solid ${r.c==="green"?T.green:T.teal}`,background:r.c==="green"?T.greenL:T.tealL,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:r.c==="green"?T.green:T.teal}}>✓</div>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{r.role}</div><div style={{fontSize:11.5,color:T.g500}}>{r.qual}</div></div>
          <Badge label={r.status} color={r.c}/>
        </div>)}
      </div>}

      {step===4&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:4}}>Document Uploads</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:20}}>Upload required evidence documents. Accepted formats: PDF, JPG, PNG (max 10MB each).</p>
        {[{name:"Medical Fitness Certificate",status:"Uploaded",file:"medical_fitness_2025.pdf",c:"green"},
          {name:"Working With Children Check",status:"Expiring",file:"wwcc_nsw_2024.pdf",c:"orange"},
          {name:"Chainsaw Operator Certificate",status:"Uploaded",file:"chainsaw_cert.pdf",c:"green"},
          {name:"First Aid Certificate",status:"Uploaded",file:"first_aid_hltaid011.pdf",c:"green"},
          {name:"Passport (International only)",status:"Not uploaded",file:null,c:"gray"},
        ].map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",border:`1px solid ${T.g200}`,borderRadius:6,marginBottom:8,background:T.white}}>
          <span style={{fontSize:20}}>📎</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:550}}>{d.name}</div>{d.file&&<div style={{fontSize:11,color:T.g500}}>{d.file}</div>}</div>
          <Badge label={d.status} color={d.c}/>
          <Btn v="sm">{d.file?"Replace":"Upload"}</Btn>
        </div>)}
      </div>}

      {step===5&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:4}}>Code of Conduct</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:16}}>Read and accept the AFAC National Deployment Code of Conduct.</p>
        <div style={{background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,padding:20,maxHeight:200,overflowY:"auto",fontSize:12.5,color:T.g700,lineHeight:1.7,marginBottom:16}}>
          <strong>AFAC National Deployment Code of Conduct</strong><br/><br/>
          As a participant in AFAC-coordinated national deployment, I agree to:<br/><br/>
          1. Act in accordance with the direction of the receiving jurisdiction's incident management team.<br/>
          2. Maintain professional conduct at all times while deployed.<br/>
          3. Report any illness, injury, or incident promptly through the established reporting chain.<br/>
          4. Comply with all fatigue management policies and rest requirements.<br/>
          5. Accurately record and report all expenses and claims.<br/>
          6. Respect local community, cultural protocols, and environmental considerations.<br/>
          7. Maintain operational security and handle sensitive information appropriately.
        </div>
        <label style={{display:"flex",alignItems:"center",gap:10,fontSize:13,cursor:"pointer"}}>
          <div style={{width:22,height:22,borderRadius:4,border:`2px solid ${T.green}`,background:T.greenL,display:"flex",alignItems:"center",justifyContent:"center",color:T.green,fontSize:12,fontWeight:700}}>✓</div>
          I have read and agree to the AFAC National Deployment Code of Conduct
        </label>
        <div style={{fontSize:11,color:T.g500,marginTop:8}}>Signed electronically by Daniel Thornton on 12 Jan 2026</div>
      </div>}

      {step===6&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:4}}>Review & Submit</h3>
        <p style={{fontSize:13,color:T.g500,marginBottom:16}}>Review your EOI before submission. Your agency will be notified to review and approve.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          {[{l:"Deployment Type",v:"Interstate"},
            {l:"Name",v:"Daniel Thornton"},
            {l:"Agency",v:"NSW Rural Fire Service"},
            {l:"Jurisdiction",v:"NSW"},
            {l:"Roles",v:"Crew Leader, Strike Team Leader"},
            {l:"Documents",v:"6 of 7 uploaded"},
            {l:"Code of Conduct",v:"Signed 12 Jan 2026"},
            {l:"Status",v:"Ready to submit"},
          ].map((f,i)=><div key={i}><div style={{fontSize:11,color:T.g400,fontWeight:550}}>{f.l}</div><div style={{fontSize:13,fontWeight:550}}>{f.v}</div></div>)}
        </div>
      </div>}

      <div style={{display:"flex",justifyContent:"space-between",marginTop:24,paddingTop:16,borderTop:`1px solid ${T.g200}`}}>
        <Btn v="secondary" s={{opacity:step===1?.4:1}} onClick={()=>setStep(Math.max(1,step-1))}>← Previous</Btn>
        <Btn v="primary" onClick={()=>setStep(Math.min(6,step+1))}>{step===6?"Submit EOI":"Continue →"}</Btn>
      </div>
    </Card>
  </div>;
}

/* ── C1: Roles & Evidence ── */
function C1RolesEvidence(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Roles & Evidence</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Daniel Thornton · NSW RFS · Governed readiness record</p></div>
      <Btn v="primary">+ Request New Role</Btn>
    </div>
    {[
      {role:"Crew Leader",family:"Crew",qualifications:["Advanced Firefighting Certificate","Crew Leader Qualification","First Aid (HLTAID011)"],fitness:"Approved",fitnessExpiry:"18 Nov 2026",status:"Approved",reviewer:"Sarah Patel (NSW RFS)",reviewDate:"15 Jan 2026",comments:"All evidence verified. Deployment-ready.",c:"green"},
      {role:"Strike Team Leader",family:"Overhead",qualifications:["STL Qualification Module","Leadership & Command Certificate"],fitness:"Approved",fitnessExpiry:"18 Nov 2026",status:"Approved",reviewer:"Sarah Patel (NSW RFS)",reviewDate:"15 Jan 2026",comments:null,c:"green"},
      {role:"Storm Damage Operator",family:"Crew",qualifications:["Chainsaw Operator Certificate","Working at Heights (pending)"],fitness:"Approved",fitnessExpiry:"18 Nov 2026",status:"Under Review",reviewer:"—",reviewDate:"—",comments:"Awaiting Working at Heights evidence upload.",c:"teal"},
    ].map((r,i)=><Card key={i} title={r.role} right={<div style={{display:"flex",gap:8}}><Chip color={r.c==="green"?"green":"teal"}>{r.status}</Chip><Badge label={r.family} color="blue"/></div>} s={{marginBottom:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20}}>
        <div>
          <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Qualifications</div>
          {r.qualifications.map((q,qi)=><div key={qi} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:12.5}}>
            <span style={{color:q.includes("pending")?T.orange:T.green,fontSize:11}}>{q.includes("pending")?"○":"✓"}</span>{q}
          </div>)}
        </div>
        <div>
          <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Fitness & Evidence</div>
          <div style={{fontSize:12.5,marginBottom:4}}>Medical fitness: <strong>{r.fitness}</strong></div>
          <div style={{fontSize:12.5,marginBottom:4}}>Expiry: {r.fitnessExpiry}</div>
          <div style={{fontSize:12.5}}>Approval state: <Badge label={r.status} color={r.c}/></div>
        </div>
        <div>
          <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Review</div>
          <div style={{fontSize:12.5,marginBottom:4}}>Reviewer: {r.reviewer}</div>
          <div style={{fontSize:12.5,marginBottom:4}}>Date: {r.reviewDate}</div>
          {r.comments&&<div style={{fontSize:12,color:T.g600,fontStyle:"italic",padding:"6px 10px",background:T.g50,borderRadius:4,marginTop:6}}>"{r.comments}"</div>}
        </div>
      </div>
    </Card>)}
  </div>;
}

/* ── C1: Agency Review Queue ── */
function C1AgencyReview(){
  const[tab,setTab]=useState("eoi");
  const[drawer,setDrawer]=useState(null);
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Agency Review Queue</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>NSW Rural Fire Service — Pending verifications and approvals</p></div>
      <div style={{display:"flex",gap:6}}><Btn v="sm">Export</Btn><Btn v="primary">Bulk Actions</Btn></div>
    </div>
    <Tabs tabs={[{id:"eoi",label:"Pending EOIs",count:5},{id:"evidence",label:"Evidence Review",count:3},{id:"changes",label:"Change Requests",count:2}]} active={tab} onChange={setTab}/>

    <div style={{display:"flex",gap:20}}>
      <div style={{flex:1}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr><TH>Name</TH><TH>Type</TH><TH>Submitted</TH><TH>Status</TH><TH>Documents</TH><TH>Actions</TH></tr></thead>
          <tbody>
            {[
              {name:"Ben Harper",init:"BH",c:T.g500,type:"New EOI",sub:"22 Mar 2026",status:"Pending Review",docs:"4/5",color:"orange"},
              {name:"Karen Wong",init:"KW",c:T.teal,type:"Role Change",sub:"25 Mar 2026",status:"Under Review",docs:"6/6",color:"teal"},
              {name:"James McAllister",init:"JM",c:T.orange,type:"Resubmission",sub:"28 Mar 2026",status:"Evidence Updated",docs:"5/5",color:"blue"},
              {name:"Alice Nguyễn",init:"AN",c:T.green,type:"Int'l Readiness",sub:"27 Mar 2026",status:"Passport Review",docs:"7/7",color:"teal"},
              {name:"Tom Reid",init:"TR",c:T.coral,type:"New EOI",sub:"29 Mar 2026",status:"Pending Review",docs:"3/5",color:"orange"},
            ].map((r,i)=><tr key={i} style={{cursor:"pointer"}} onClick={()=>setDrawer(r)}>
              <TD><div style={{display:"flex",alignItems:"center",gap:8}}><Avatar i={r.init} c={r.c} s={28}/><div><div style={{fontWeight:600,fontSize:13}}>{r.name}</div></div></div></TD>
              <TD>{r.type}</TD>
              <TD>{r.sub}</TD>
              <TD><Chip color={r.color}>{r.status}</Chip></TD>
              <TD>{r.docs}</TD>
              <TD><div style={{display:"flex",gap:4}}>
                <button style={{width:26,height:26,borderRadius:"50%",border:"none",background:T.greenL,color:T.green,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>✓</button>
                <button style={{width:26,height:26,borderRadius:"50%",border:"none",background:T.coralL,color:T.coral,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>✕</button>
                <button style={{width:26,height:26,borderRadius:"50%",border:"none",background:T.orangeL,color:T.orange,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>↩</button>
              </div></TD>
            </tr>)}
          </tbody>
        </table>
      </div>

      {/* Detail drawer */}
      {drawer&&<div style={{width:320,background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:18,flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <span style={{fontSize:14,fontWeight:650}}>Review Panel</span>
          <span onClick={()=>setDrawer(null)} style={{cursor:"pointer",color:T.g400,fontSize:18}}>×</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <Avatar i={drawer.init} c={drawer.c} s={40}/>
          <div><div style={{fontWeight:650}}>{drawer.name}</div><div style={{fontSize:12,color:T.g500}}>{drawer.type} · {drawer.sub}</div></div>
        </div>
        <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Evidence Preview</div>
        {["Medical Fitness Certificate","First Aid (HLTAID011)","Code of Conduct"].map((d,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 0",borderBottom:`1px solid ${T.g100}`,fontSize:12}}><span>📄</span>{d}<Badge label="Valid" color="green"/></div>)}
        <div style={{marginTop:14}}>
          <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Reviewer Notes</div>
          <textarea style={{width:"100%",height:60,border:`1px solid ${T.g200}`,borderRadius:6,padding:8,fontSize:12,fontFamily:"inherit",resize:"vertical"}} placeholder="Add review notes..."/>
        </div>
        <div style={{display:"flex",gap:6,marginTop:12}}>
          <Btn v="primary" s={{flex:1,justifyContent:"center"}}>Approve</Btn>
          <Btn v="secondary" s={{flex:1,justifyContent:"center",color:T.coral,borderColor:T.coral}}>Reject</Btn>
        </div>
        <Btn v="ghost" s={{width:"100%",justifyContent:"center",marginTop:6,color:T.orange}}>Request Changes</Btn>
      </div>}
    </div>
  </div>;
}

/* ── C1: National Readiness Exceptions ── */
function C1NationalExceptions(){
  const[agencyFilter,setAgencyFilter]=useState("All");
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>National Readiness Exceptions</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>NRSC oversight — non-compliant and expiring records across all agencies</p></div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
      {[{l:"Expired Documents",v:"14",c:T.coral},{l:"Expiring <30 days",v:"23",c:T.orange},{l:"Pending Approval",v:"31",c:T.blue},{l:"Inactive Personnel",v:"8",c:T.g500}].map((m,i)=><div key={i} style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"16px 20px",textAlign:"center"}}>
        <div style={{fontSize:24,fontWeight:700,color:m.c}}>{m.v}</div>
        <div style={{fontSize:11.5,color:T.g500,marginTop:2}}>{m.l}</div>
      </div>)}
    </div>

    <FilterChips items={["All","NSW RFS","CFA","ACT ESA","DFES WA","QFES","SASES","FENZ"]} active={agencyFilter} onChange={setAgencyFilter}/>

    <Card>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr><TH>Name</TH><TH>Agency</TH><TH>Jurisdiction</TH><TH>Exception</TH><TH>Severity</TH><TH>Deployability</TH><TH>Days</TH></tr></thead>
        <tbody>
          {[
            {name:"James McAllister",agency:"NSW RFS",jur:"NSW",exception:"Medical fitness expired",severity:"coral",deploy:"Suspended",days:"12"},
            {name:"Priya Singh",agency:"CFA",jur:"VIC",exception:"WWCC expired",severity:"coral",deploy:"Suspended",days:"8"},
            {name:"Tom Walsh",agency:"DFES WA",jur:"WA",exception:"Medical fitness expired",severity:"coral",deploy:"Suspended",days:"3"},
            {name:"Sarah Chen",agency:"NSW RFS",jur:"NSW",exception:"WWCC expiring in 5 days",severity:"orange",deploy:"At Risk",days:"5"},
            {name:"Daniel Thornton",agency:"NSW RFS",jur:"NSW",exception:"WWCC expiring in 3 days",severity:"orange",deploy:"At Risk",days:"3"},
            {name:"Mark O'Sullivan",agency:"ACT ESA",jur:"ACT",exception:"First Aid expiring in 18 days",severity:"orange",deploy:"Active",days:"18"},
            {name:"Lisa Cooper",agency:"QFES",jur:"QLD",exception:"Pending role approval",severity:"blue",deploy:"Pending",days:"22"},
            {name:"Ben Harper",agency:"NSW RFS",jur:"NSW",exception:"Pending EOI approval",severity:"blue",deploy:"Pending",days:"8"},
          ].map((r,i)=><tr key={i} style={{cursor:"pointer"}}>
            <TD s={{fontWeight:600}}>{r.name}</TD>
            <TD>{r.agency}</TD>
            <TD><Badge label={r.jur} color="blue"/></TD>
            <TD>{r.exception}</TD>
            <TD><Chip color={r.severity}>{r.severity==="coral"?"Critical":r.severity==="orange"?"Warning":"Info"}</Chip></TD>
            <TD><Badge label={r.deploy} color={r.severity}/></TD>
            <TD s={{fontWeight:600}}>{r.days}</TD>
          </tr>)}
        </tbody>
      </table>
    </Card>
  </div>;
}

/* ═══════════════════════════════════════════════════════════════
   CAPABILITY 2 — REQUEST MANAGEMENT
   ═══════════════════════════════════════════════════════════════ */

/* ── C2: Request Register ── */
function C2RequestRegister(){
  const[tab,setTab]=useState("active");
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Request Register</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>National mobilisation requests — all jurisdictions</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="secondary">Export</Btn><Btn v="primary">+ New Request</Btn></div>
    </div>
    <Tabs tabs={[{id:"active",label:"Active",count:12},{id:"draft",label:"Draft",count:2},{id:"closed",label:"Closed",count:34}]} active={tab} onChange={setTab}/>
    <FilterChips items={["All","Interstate","International","Urgent","Extension"]} active="All" onChange={()=>{}}/>

    <Card>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr><TH>Request ID</TH><TH>Jurisdiction</TH><TH>Type</TH><TH>Roles Requested</TH><TH>Filled</TH><TH>Status</TH><TH>Handler</TH><TH>Created</TH></tr></thead>
          <tbody>
            {[
              {id:"2025_26_007NT_NSW001",jur:"NT → NSW",type:"Interstate",roles:"IMT, DM, Safety Officer (Field), Storm Damage Ops ×8",filled:"18/18",status:"Deployed",color:"green",handler:"J. Walsh",date:"14 Mar"},
              {id:"2025_26_012INT_CAN001",jur:"NRSC → Canada",type:"International",roles:"INLO, IMT ×3, CREW ×12",filled:"16/16",status:"Mobilising",color:"blue",handler:"P. Nguyễn",date:"8 Mar"},
              {id:"2025_26_015QLD_VIC002",jur:"QLD → VIC",type:"Interstate",roles:"Crew Leader ×2, Storm Damage Ops ×6",filled:"0/8",status:"Pending Allocation",color:"orange",handler:"Unassigned",date:"28 Mar"},
              {id:"2025_26_009SA_NSW003",jur:"SA → NSW",type:"Interstate",roles:"Management Support Officer",filled:"1/1",status:"Demobilising",color:"gray",handler:"L. Brooks",date:"10 Mar"},
              {id:"2025_26_018WA_NT004",jur:"WA → NT",type:"Interstate",roles:"JLO, Safety Advisor",filled:"0/2",status:"Under Review",color:"teal",handler:"M. Cooper",date:"29 Mar"},
              {id:"2025_26_020NT_QLD005",jur:"NT → QLD",type:"Interstate",roles:"Deployment Manager, Admin Support ×2",filled:"1/3",status:"Partially Filled",color:"orange",handler:"J. Walsh",date:"30 Mar"},
              {id:"2025_26_013INT_CAN002",jur:"NRSC → Canada",type:"International (Extension)",roles:"CREW rotation ×6",filled:"6/6",status:"Approved",color:"green",handler:"P. Nguyễn",date:"25 Mar"},
            ].map((r,i)=><tr key={i} style={{cursor:"pointer"}}>
              <TD mono>{r.id}</TD>
              <TD s={{fontWeight:550}}>{r.jur}</TD>
              <TD>{r.type}</TD>
              <TD s={{maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.roles}</TD>
              <TD s={{fontWeight:600}}>{r.filled}</TD>
              <TD><Chip color={r.color}>{r.status}</Chip></TD>
              <TD>{r.handler}</TD>
              <TD s={{color:T.g500,fontSize:12}}>{r.date}</TD>
            </tr>)}
          </tbody>
        </table>
      </div>
    </Card>
  </div>;
}

/* ── C2: Order & Fulfilment Console ── */
function C2OrderConsole(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Order & Fulfilment Console</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Request 2025_26_007NT_NSW001 — NT Cyclone Response</p></div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:20}}>
      {[{l:"Parent Order",v:"ORD-2025-0047"},{l:"RP",v:"Rachel Kimura (NSW RFS)"},{l:"SP",v:"Mark Sullivan (NT Gov)"},{l:"Fulfilment",v:"18/18 (100%)"}].map((m,i)=><div key={i} style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"14px 18px"}}>
        <div style={{fontSize:11,color:T.g400,fontWeight:550}}>{m.l}</div>
        <div style={{fontSize:14,fontWeight:650,marginTop:4}}>{m.v}</div>
      </div>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:20}}>
      <Card title="Sub-Orders" right={<Chip color="green">All Filled</Chip>}>
        {[
          {id:"ORD-0047-A",desc:"IMT & Overhead",roles:"IC Support, Planning, DM",filled:"3/3",status:"Deployed",c:"green"},
          {id:"ORD-0047-B",desc:"Safety",roles:"Safety Officer (Field)",filled:"1/1",status:"Deployed",c:"green"},
          {id:"ORD-0047-C",desc:"Storm Ops Crew 1",roles:"Crew Leader, Storm Damage Ops ×5",filled:"6/6",status:"Deployed",c:"green"},
          {id:"ORD-0047-D",desc:"Storm Ops Crew 2",roles:"Crew Leader, Storm Damage Ops ×5",filled:"6/6",status:"Deployed",c:"green"},
          {id:"ORD-0047-E",desc:"Management Support",roles:"Management Support Officer ×2",filled:"2/2",status:"Demobilising",c:"gray"},
        ].map((o,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none"}}>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:T.g500,width:80}}>{o.id}</span>
          <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{o.desc}</div><div style={{fontSize:11.5,color:T.g500}}>{o.roles}</div></div>
          <span style={{fontSize:12,fontWeight:600}}>{o.filled}</span>
          <Chip color={o.c}>{o.status}</Chip>
        </div>)}
      </Card>

      <Card title="Audit History">
        {[
          {date:"14 Mar 09:15",action:"Request created",by:"J. Walsh (NRSC)",c:T.blue},
          {date:"14 Mar 11:00",action:"Order ORD-2025-0047 generated",by:"System",c:T.teal},
          {date:"15 Mar 14:30",action:"Sub-orders A–E created",by:"J. Walsh",c:T.blue},
          {date:"16 Mar 10:00",action:"NSW RFS nominated 18 personnel",by:"S. Patel (NSW RFS)",c:T.green},
          {date:"17 Mar 08:00",action:"All sub-orders confirmed",by:"J. Walsh",c:T.green},
          {date:"22 Mar 06:00",action:"Deployment commenced — Darwin",by:"System",c:T.green},
          {date:"27 Mar 15:00",action:"MSO ×2 demobilisation started",by:"R. Kimura",c:T.g500},
        ].map((h,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<6?`1px solid ${T.g100}`:"none"}}>
          <div style={{width:3,borderRadius:2,background:h.c,flexShrink:0}}/>
          <div><div style={{fontSize:12,fontWeight:550}}>{h.action}</div><div style={{fontSize:10.5,color:T.g500}}>{h.date} · {h.by}</div></div>
        </div>)}
      </Card>
    </div>
  </div>;
}

/* ── C2: Contingent Builder ── */
function C2ContingentBuilder(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Contingent Builder</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Canada 2025 — International Deployment — 2025_26_012INT_CAN001</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="secondary">Save Draft</Btn><Btn v="primary">Confirm Contingent</Btn></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}}>
      {[{l:"Total Personnel",v:"16"},{l:"Contingent Groups",v:"4"},{l:"Deploy Date",v:"12 Mar 2026"},{l:"Return Date",v:"8 Apr 2026"}].map((m,i)=><div key={i} style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"14px 18px"}}><div style={{fontSize:11,color:T.g400,fontWeight:550}}>{m.l}</div><div style={{fontSize:16,fontWeight:700,marginTop:3}}>{m.v}</div></div>)}
    </div>

    {[
      {group:"INLO1",type:"INLO & Admin",deployed:"12 Mar",roles:[{name:"Peter Nguyễn",role:"INLO",agency:"NSW RFS",jur:"NSW",status:"In Field"},{name:"Alice Nguyễn",role:"INLO Admin",agency:"NSW RFS",jur:"NSW",status:"In Field"}]},
      {group:"IMT1",type:"IMT",deployed:"12 Mar",roles:[{name:"David Kang",role:"IC Support",agency:"CFA",jur:"VIC",status:"In Field"},{name:"Rachel Kim",role:"Planning Officer",agency:"NSW RFS",jur:"NSW",status:"In Field"},{name:"Tom O'Brien",role:"Logistics",agency:"DFES WA",jur:"WA",status:"In Field"}]},
      {group:"CREW1",type:"Crew",deployed:"12 Mar",roles:[{name:"Mark Sullivan",role:"Crew Leader",agency:"CFA",jur:"VIC",status:"In Field"},{name:"Sarah Chen",role:"Firefighter",agency:"CFA",jur:"VIC",status:"In Field"},{name:"James Liu",role:"Firefighter",agency:"ACT ESA",jur:"ACT",status:"In Field"},{name:"Ben Taylor",role:"Firefighter",agency:"NSW RFS",jur:"NSW",status:"In Field"},{name:"Emma Walsh",role:"Firefighter",agency:"FENZ",jur:"NZ",status:"In Field"}]},
      {group:"CREW2",type:"Crew",deployed:"12 Mar",roles:[{name:"Chris Adams",role:"Crew Leader",agency:"SASES",jur:"SA",status:"In Field"},{name:"Lisa Morton",role:"Firefighter",agency:"SASES",jur:"SA",status:"In Field"},{name:"Paul Green",role:"Firefighter",agency:"DFES WA",jur:"WA",status:"In Field"},{name:"Nina Roberts",role:"Firefighter",agency:"QFES",jur:"QLD",status:"In Field"},{name:"Sam O'Connor",role:"Firefighter",agency:"TFS",jur:"TAS",status:"In Field"},{name:"Jake Williams",role:"Firefighter",agency:"CFA",jur:"VIC",status:"In Field"}]},
    ].map((g,gi)=><Card key={gi} title={<span>{g.group} <span style={{fontWeight:400,color:T.g500,fontSize:12}}>— {g.type} · Deployed {g.deployed}</span></span>} right={<Chip color="green">In Field ({g.roles.length})</Chip>} s={{marginBottom:14}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr><TH>Name</TH><TH>Appointed Role</TH><TH>Agency</TH><TH>Jurisdiction</TH><TH>Status</TH></tr></thead>
        <tbody>{g.roles.map((r,ri)=><tr key={ri}><TD s={{fontWeight:600}}>{r.name}</TD><TD>{r.role}</TD><TD>{r.agency}</TD><TD><Badge label={r.jur} color="blue"/></TD><TD><Chip color="green">{r.status}</Chip></TD></tr>)}</tbody>
      </table>
    </Card>)}
  </div>;
}

/* ── C2: International Manifest Builder ── */
function C2ManifestBuilder(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>International Manifest</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Canada 2025 — CREW1 — Outbound BNE → YVR</p></div>
      <div style={{display:"flex",gap:8}}><Btn v="secondary">Print Manifest</Btn><Btn v="primary">Submit Manifest</Btn></div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:14,marginBottom:20}}>
      {[{l:"Port of Entry",v:"Vancouver (YVR)"},{l:"Final Destination",v:"Kamloops, BC, Canada"},{l:"Flight",v:"QF15 BNE→YVR 12 Mar"},{l:"Manifest Status",v:"Submitted ✓"}].map((m,i)=><div key={i} style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"14px 18px"}}><div style={{fontSize:11,color:T.g400,fontWeight:550}}>{m.l}</div><div style={{fontSize:13.5,fontWeight:650,marginTop:3}}>{m.v}</div></div>)}
    </div>

    <Card>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr><TH>Name</TH><TH>DOB</TH><TH>Nationality</TH><TH>Passport No.</TH><TH>Expiry</TH><TH>eTA No.</TH><TH>Baggage (kg)</TH><TH>Validated</TH></tr></thead>
          <tbody>
            {[
              {name:"Mark Sullivan",dob:"22/03/1985",nat:"Australian",pp:"PA4821956",exp:"14/09/2030",eta:"J842916503",bag:"23",valid:true},
              {name:"Sarah Chen",dob:"15/07/1990",nat:"Australian",pp:"PA6134782",exp:"02/03/2029",eta:"J842916504",bag:"23",valid:true},
              {name:"James Liu",dob:"03/11/1992",nat:"Australian",pp:"PA7293615",exp:"28/06/2031",eta:"J842916505",bag:"23",valid:true},
              {name:"Ben Taylor",dob:"19/01/1988",nat:"Australian",pp:"PA3847261",exp:"11/12/2028",eta:"J842916506",bag:"23",valid:true},
              {name:"Emma Walsh",dob:"08/05/1994",nat:"New Zealander",pp:"LN829374",exp:"20/08/2029",eta:"J842916507",bag:"23",valid:true},
            ].map((r,i)=><tr key={i}>
              <TD s={{fontWeight:600}}>{r.name}</TD>
              <TD>{r.dob}</TD>
              <TD>{r.nat}</TD>
              <TD mono>{r.pp}</TD>
              <TD>{r.exp}</TD>
              <TD mono>{r.eta}</TD>
              <TD>{r.bag}</TD>
              <TD>{r.valid?<span style={{color:T.green,fontWeight:700}}>✓</span>:<span style={{color:T.coral,fontWeight:700}}>✕</span>}</TD>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div style={{marginTop:14,padding:"12px 16px",background:T.greenL,borderRadius:6,fontSize:12,color:"#4a7a12",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontWeight:700}}>✓</span> All passport and eTA records validated. Manifest submitted 10 Mar 2026. Read receipt confirmed by CBSA.
      </div>
    </Card>
  </div>;
}

/* ── C2: Travel & Logistics Planner ── */
function C2TravelPlanner(){
  const legs=[
    {leg:1,type:"Domestic Flight",from:"Sydney (SYD)",to:"Brisbane (BNE)",date:"11 Mar 2026",time:"14:00–15:30",carrier:"QF520",status:"Completed",c:"green"},
    {leg:2,type:"Accommodation",from:"Brisbane Airport Hotel",to:"—",date:"11 Mar (overnight)",time:"Check-in 16:00",carrier:"—",status:"Completed",c:"green"},
    {leg:3,type:"International Flight",from:"Brisbane (BNE)",to:"Vancouver (YVR)",date:"12 Mar 2026",time:"09:00–06:30+1",carrier:"QF15",status:"Completed",c:"green"},
    {leg:4,type:"Domestic Flight (Canada)",from:"Vancouver (YVR)",to:"Kamloops (YKA)",date:"13 Mar 2026",time:"10:00–11:10",carrier:"AC8073",status:"Completed",c:"green"},
    {leg:5,type:"Ground Transfer",from:"Kamloops Airport",to:"Kamloops Fire Centre",date:"13 Mar 2026",time:"11:30–12:00",carrier:"BCWS shuttle",status:"Completed",c:"green"},
  ];

  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Travel & Logistics Planner</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Canada 2025 — CREW1 Outbound Itinerary</p></div>

    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:20}}>
      <Card title="Itinerary">
        {legs.map((l,i)=><div key={i} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:36}}>
            <div style={{width:28,height:28,borderRadius:"50%",background:l.c==="green"?T.greenL:T.blueL,color:l.c==="green"?T.green:T.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700}}>{l.leg}</div>
            {i<4&&<div style={{width:2,flex:1,background:T.g200,marginTop:4}}/>}
          </div>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:13,fontWeight:650}}>{l.type}</span>
              <Chip color={l.c}>{l.status}</Chip>
            </div>
            <div style={{fontSize:12.5,marginTop:4}}>{l.from} → {l.to}</div>
            <div style={{fontSize:11.5,color:T.g500,marginTop:2}}>{l.date} · {l.time}{l.carrier!=="—"?` · ${l.carrier}`:""}</div>
          </div>
        </div>)}
      </Card>

      <div>
        <Card title="Key Contacts">
          {[{name:"Peter Nguyễn",role:"INLO",phone:"+61 412 xxx xxx"},{name:"BCWS Liaison",role:"Receiving contact",phone:"+1 250 xxx xxxx"},{name:"Muster Point",role:"Kamloops Fire Centre",phone:"250 828 4131"}].map((c,i)=><div key={i} style={{padding:"8px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
            <div style={{fontSize:13,fontWeight:600}}>{c.name}</div>
            <div style={{fontSize:11.5,color:T.g500}}>{c.role} · {c.phone}</div>
          </div>)}
        </Card>
        <Card title="Accommodation" s={{marginTop:16}}>
          {[{loc:"Brisbane Airport Hotel",dates:"11 Mar (1 night)",status:"Confirmed"},{loc:"Kamloops Best Western",dates:"13 Mar – 8 Apr",status:"Confirmed"}].map((a,i)=><div key={i} style={{padding:"8px 0",borderBottom:i<1?`1px solid ${T.g100}`:"none"}}>
            <div style={{fontSize:13,fontWeight:600}}>{a.loc}</div>
            <div style={{fontSize:11.5,color:T.g500}}>{a.dates} · <span style={{color:T.green,fontWeight:550}}>{a.status}</span></div>
          </div>)}
        </Card>
        <Card title="Muster Points" s={{marginTop:16}}>
          <div style={{fontSize:12.5}}><strong>Departure:</strong> Sydney Intl Terminal, Gate 42</div>
          <div style={{fontSize:12.5,marginTop:6}}><strong>Arrival:</strong> Kamloops Fire Centre, 2045 Okanagan Hwy</div>
        </Card>
      </div>
    </div>
  </div>;
}

/* ── C2: Movement-State Dashboard ── */
function C2MovementDashboard(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{marginBottom:20}}><h2 style={{fontSize:20,fontWeight:700,margin:0}}>Movement-State Dashboard</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Pre-field and active movement tracking across all deployments</p></div>

    {/* State totals */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:22}}>
      {[
        {l:"Mobilising",v:8,c:T.blue,bg:T.blueL},{l:"Briefing",v:10,c:T.teal,bg:T.tealL},
        {l:"Out of Country",v:16,c:T.orange,bg:T.orangeL},{l:"In Field",v:153,c:T.green,bg:T.greenL},
        {l:"Demobilising",v:14,c:T.g600,bg:T.g100},{l:"Working Total",v:247,c:T.navy,bg:T.blueL},
      ].map((m,i)=><div key={i} style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"14px 16px",textAlign:"center"}}>
        <div style={{fontSize:22,fontWeight:700,color:m.c}}>{m.v}</div>
        <div style={{fontSize:11,color:T.g500,marginTop:2}}>{m.l}</div>
        <div style={{marginTop:6}}><Progress pct={Math.round(m.v/247*100)} color={m.c}/></div>
      </div>)}
    </div>

    {/* By jurisdiction and role type */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Card title="By Jurisdiction">
        <table style={{width:"100%",borderCollapse:"collapse"}}>
          <thead><tr><TH>Jurisdiction</TH><TH>Mobilising</TH><TH>Briefing</TH><TH>Out of Country</TH><TH>In Field</TH><TH>Demob</TH><TH>Total</TH></tr></thead>
          <tbody>
            {[
              {j:"NT",mob:2,br:3,ooc:0,inf:52,dem:7,tot:64},
              {j:"NSW",mob:3,br:2,ooc:4,inf:34,dem:5,tot:48},
              {j:"VIC",mob:1,br:2,ooc:4,inf:33,dem:2,tot:42},
              {j:"QLD",mob:2,br:1,ooc:3,inf:32,dem:0,tot:38},
              {j:"SA",mob:0,br:1,ooc:2,inf:19,dem:0,tot:22},
              {j:"INT'L",mob:0,br:1,ooc:3,inf:29,dem:0,tot:33},
            ].map((r,i)=><tr key={i}>
              <TD s={{fontWeight:650}}>{r.j}</TD>
              <TD>{r.mob}</TD><TD>{r.br}</TD><TD>{r.ooc}</TD><TD s={{fontWeight:600}}>{r.inf}</TD><TD>{r.dem}</TD>
              <TD s={{fontWeight:700}}>{r.tot}</TD>
            </tr>)}
          </tbody>
        </table>
      </Card>

      <Card title="By Role Type">
        {[
          {role:"IMT",count:18,pct:7},{role:"Crew",count:142,pct:58},{role:"Overhead",count:24,pct:10},
          {role:"INLO & Admin",count:8,pct:3},{role:"DM & Admin",count:12,pct:5},{role:"S/AREP & Admin",count:6,pct:2},
          {role:"LO & Admin",count:4,pct:2},{role:"Other",count:33,pct:13},
        ].map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 0"}}>
          <span style={{width:100,fontSize:12,color:T.g600,textAlign:"right"}}>{r.role}</span>
          <div style={{flex:1,height:18,background:T.g100,borderRadius:3,overflow:"hidden"}}>
            <div style={{width:`${r.pct}%`,height:"100%",background:T.blue,borderRadius:3}}/>
          </div>
          <span style={{width:30,fontSize:12,fontWeight:650,textAlign:"right"}}>{r.count}</span>
        </div>)}
      </Card>
    </div>
  </div>;
}
