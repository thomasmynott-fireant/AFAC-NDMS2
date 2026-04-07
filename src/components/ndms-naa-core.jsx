import { useState } from "react";
import { LiveAssetMap, NationalAssetBoard, PerformanceHistory } from "./ndms-naa-assets";

/* ══ Design tokens ══ */
export const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};

/* ══ Shared UI primitives ══ */
export const RChip=({status})=>{const m={Draft:{bg:T.g100,fg:T.g600},Submitted:{bg:T.blueL,fg:T.blue},"Under Triage":{bg:T.tealL,fg:"#148895"},"Awaiting DM":{bg:T.orangeL,fg:"#c06e15"},"Approved - DM":{bg:T.greenL,fg:"#5a8a1f"},Declined:{bg:T.coralL,fg:T.coral},Escalated:{bg:"#F3F0FF",fg:"#6C5CE7"},"Extension Requested":{bg:T.orangeL,fg:"#c06e15"},Active:{bg:T.greenL,fg:"#5a8a1f"},Redeploying:{bg:T.tealL,fg:"#148895"},Closed:{bg:T.g100,fg:T.g600},"Sign-off Received":{bg:T.greenL,fg:"#5a8a1f"},"Sign-off Filed":{bg:T.g100,fg:T.g500}};const c=m[status]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg,whiteSpace:"nowrap"}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{status}</span>};
export const AChip=({status})=>{const m={Available:{bg:T.greenL,fg:"#5a8a1f"},Moving:{bg:T.orangeL,fg:"#c06e15"},Deployed:{bg:T.tealL,fg:"#148895"},Unavailable:{bg:T.g100,fg:T.g500},Redeploying:{bg:"#F3F0FF",fg:"#6C5CE7"}};const c=m[status]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg,whiteSpace:"nowrap"}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{status}</span>};
const UrgBadge=({u})=><span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:650,background:u==="Urgent"?T.coralL:T.blueL,color:u==="Urgent"?T.coral:T.blue}}>{u}</span>;
const Btn=({children,v="secondary",s,...p})=>{const vs={primary:{background:T.blue,color:"#fff",border:"none"},secondary:{background:"#fff",color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600,border:"none"},danger:{background:T.coral,color:"#fff",border:"none"}};return<button style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,cursor:"pointer",fontFamily:"inherit",...vs[v],...s}} {...p}>{children}</button>};
const SCard=({label,value,sub,color=T.navy})=><div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,padding:"14px 18px"}}><div style={{fontSize:10.5,color:T.g500,fontWeight:550,textTransform:"uppercase",letterSpacing:.3}}>{label}</div><div style={{fontSize:22,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:11,color:T.g500,marginTop:2}}>{sub}</div>}</div>;
const TH=({children,w})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap",width:w}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;
const Field=({label,children})=><div><label style={{fontSize:12,fontWeight:550,color:T.g600,display:"block",marginBottom:4}}>{label}</label><div style={{padding:"9px 12px",background:T.g50,border:`1px solid ${T.g200}`,borderRadius:6,fontSize:13}}>{children}</div></div>;

/* ══ NAA ASSET REGISTER ══ */
export const ASSETS=[
  {id:"NLAT",make:"Lockheed C-130J Hercules",reg:"A97-449",callsign:"NLAT",base:"Richmond NSW",loc:"Richmond NSW",lat:-33.600,lng:150.781,status:"Available",mission:"—",linkedNAA:"NAA-26-001",lastUpdate:"31 Mar 08:00"},
  {id:"NLEAD",make:"King Air 350",reg:"VH-FIZ",callsign:"NLEAD",base:"Bankstown NSW",loc:"Lismore NSW",lat:-28.811,lng:153.278,status:"Deployed",mission:"Northern Rivers — reconnaissance",linkedNAA:"NAA-26-004",lastUpdate:"31 Mar 07:45"},
  {id:"NHAWK-SA",make:"Sikorsky S-70A Black Hawk",reg:"VH-NHA",callsign:"NHAWK (SA)",base:"Parafield SA",loc:"Parafield SA",lat:-34.793,lng:138.633,status:"Deployed",mission:"Northern Rivers — aerial support (returning)",linkedNAA:"NAA-26-003",lastUpdate:"31 Mar 06:30"},
  {id:"NHAWK-QLD",make:"Sikorsky S-70A Black Hawk",reg:"VH-NHB",callsign:"NHAWK (QLD)",base:"Bundaberg QLD",loc:"In transit",lat:-24.867,lng:152.351,status:"Moving",mission:"Repositioning to Bundaberg",linkedNAA:"NAA-26-002",lastUpdate:"31 Mar 07:00"},
  {id:"NS61N",make:"Sikorsky S-61N",reg:"VH-NSA",callsign:"NS61N",base:"Bankstown NSW",loc:"Bankstown NSW",lat:-33.924,lng:150.987,status:"Unavailable",mission:"Scheduled maintenance",linkedNAA:"—",lastUpdate:"30 Mar 16:00"},
];

/* ══ NAA REQUEST DATA ══ */
export const CURRENT_REQUESTS=[
  {no:"NAA-26-001",initial:true,urgency:"Urgent",jurisdiction:"NSW",agency:"NSW RFS",asset:"NLAT",assetId:"NLAT",mission:"Northern Rivers flood resupply",incident:"Northern Rivers Flood Response 2026",base:"Richmond NSW",reqStatus:"Active",dmStatus:"Approved",ccoscState:"Notified",tracker:"Updated",signoff:"Received",updated:"31 Mar 08:00",submitted:"28 Mar 06:30",requester:"Air Desk — AFAC NRSC",authoriser:"Jessica Walsh — NRSC Duty Officer"},
  {no:"NAA-26-002",initial:true,urgency:"Non-Urgent",jurisdiction:"QLD",agency:"QFES",asset:"NHAWK (QLD)",assetId:"NHAWK-QLD",mission:"QLD cyclone preparedness positioning",incident:"Cyclone Preparedness 2026",base:"Bundaberg QLD",reqStatus:"Under Triage",dmStatus:"—",ccoscState:"—",tracker:"—",signoff:"—",updated:"31 Mar 07:00",submitted:"30 Mar 14:00",requester:"Air Desk — AFAC NRSC",authoriser:"Pending"},
  {no:"NAA-26-003",initial:false,urgency:"Non-Urgent",jurisdiction:"SA",agency:"SA CFS",asset:"NHAWK (SA)",assetId:"NHAWK-SA",mission:"Northern Rivers aerial support — extension",incident:"Northern Rivers Flood Response 2026",base:"Parafield SA",reqStatus:"Sign-off Received",dmStatus:"Approved",ccoscState:"Notified",tracker:"Updated",signoff:"Received",updated:"31 Mar 06:30",submitted:"27 Mar 14:00",requester:"Air Desk — AFAC NRSC",authoriser:"Jessica Walsh — NRSC Duty Officer",extReason:"3-day extension for continued aerial survey",extOriginal:"NAA-26-003"},
  {no:"NAA-26-004",initial:true,urgency:"Urgent",jurisdiction:"ACT",agency:"ACT ESA",asset:"NLEAD",assetId:"NLEAD",mission:"ACT emergency reconnaissance",incident:"ACT Storm Damage Assessment",base:"Bankstown NSW",reqStatus:"Escalated",dmStatus:"Deferred",ccoscState:"Awaiting ASC",tracker:"—",signoff:"—",updated:"31 Mar 09:15",submitted:"31 Mar 08:00",requester:"Air Desk — AFAC NRSC",authoriser:"Pending — escalated to CCOSC ASC"},
  {no:"NAA-26-001-E1",initial:false,urgency:"Non-Urgent",jurisdiction:"NSW",agency:"NSW RFS",asset:"NLAT",assetId:"NLAT",mission:"Northern Rivers — 2-day extension",incident:"Northern Rivers Flood Response 2026",base:"Richmond NSW",reqStatus:"Extension Requested",dmStatus:"—",ccoscState:"—",tracker:"—",signoff:"—",updated:"31 Mar 10:00",submitted:"31 Mar 10:00",requester:"Air Desk — AFAC NRSC",authoriser:"Pending",extReason:"Additional 2 days for remaining supply drops",extOriginal:"NAA-26-001"},
];

export const PAST_REQUESTS=[
  {no:"NAA-25-118",type:"Initial",jurisdiction:"WA",agency:"DFES WA",asset:"NS61N",mission:"WA coastal patrol",outcome:"Completed",finalBase:"Bankstown NSW",closed:"15 Feb 2026",signoffFiled:true,duration:"5 days",extCount:0},
  {no:"NAA-25-112",type:"Initial",jurisdiction:"VIC",agency:"CFA",asset:"NLEAD",mission:"VIC bushfire reconnaissance",outcome:"Completed",finalBase:"Bankstown NSW",closed:"02 Feb 2026",signoffFiled:true,duration:"3 days",extCount:1},
  {no:"NAA-25-098",type:"Extension",jurisdiction:"NSW",agency:"NSW RFS",asset:"NHAWK (SA)",mission:"NSW flood aerial support — extended",outcome:"Completed",finalBase:"Parafield SA",closed:"18 Jan 2026",signoffFiled:true,duration:"7 days",extCount:2},
  {no:"NAA-25-087",type:"Initial",jurisdiction:"QLD",agency:"QFES",asset:"NHAWK (QLD)",mission:"QLD cyclone response",outcome:"Declined",finalBase:"—",closed:"05 Jan 2026",signoffFiled:false,duration:"—",extCount:0},
  {no:"NAA-25-074",type:"Initial",jurisdiction:"SA",agency:"SA CFS",asset:"NLAT",mission:"SA bushfire resupply",outcome:"Completed",finalBase:"Richmond NSW",closed:"12 Dec 2025",signoffFiled:true,duration:"4 days",extCount:0},
];

/* ══ WORKSPACE SHELL ══ */
export default function NAAWorkspace(){
  const[tab,setTab]=useState("current");
  const[drawerReq,setDrawerReq]=useState(null);
  const[wizardOpen,setWizardOpen]=useState(false);
  const[mapFocus,setMapFocus]=useState(null);

  const tabs=[
    {id:"current",label:"Current Applications",count:CURRENT_REQUESTS.length},
    {id:"past",label:"Past Applications",count:PAST_REQUESTS.length},
    {id:"map",label:"Live Asset Map"},
    {id:"board",label:"National Asset Board"},
    {id:"approvals",label:"Approvals & Escalation",count:CURRENT_REQUESTS.filter(r=>["Awaiting DM","Escalated","Under Triage"].includes(r.reqStatus)).length},
    {id:"performance",label:"Performance & History"},
  ];

  const handleSeeOnMap=(assetId)=>{setMapFocus(assetId);setTab("map");};

  if(wizardOpen) return <NAAWizard onClose={()=>setWizardOpen(false)}/>;

  return <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
    <div style={{padding:"20px 32px 0"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4}}>
        <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>National Aviation Assets</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>NAA governance console — request management, asset tracking & approvals</p></div>
        <div style={{display:"flex",gap:8}}><Btn v="secondary">Export</Btn><Btn v="primary" onClick={()=>setWizardOpen(true)}>+ New NAA Request</Btn></div>
      </div>
      <div style={{display:"flex",borderBottom:`2px solid ${T.g200}`,marginTop:12,overflowX:"auto"}}>
        {tabs.map(t=><div key={t.id} onClick={()=>{setTab(t.id);setDrawerReq(null);}} style={{padding:"8px 16px",fontSize:13,fontWeight:550,color:tab===t.id?T.blue:T.g500,borderBottom:`2px solid ${tab===t.id?T.blue:"transparent"}`,marginBottom:-2,cursor:"pointer",whiteSpace:"nowrap"}}>{t.label}{t.count!=null&&<span style={{background:tab===t.id?T.blueL:T.g100,fontSize:10,padding:"1px 7px",borderRadius:10,marginLeft:6}}>{t.count}</span>}</div>)}
      </div>
    </div>
    <div style={{flex:1,overflowY:"auto",display:"flex"}}>
      <div style={{flex:1,overflowY:"auto"}}>
        {tab==="current"&&<CurrentApplications onSelect={setDrawerReq} onSeeOnMap={handleSeeOnMap} onNewRequest={()=>setWizardOpen(true)}/>}
        {tab==="past"&&<PastApplications onSelect={setDrawerReq}/>}
        {tab==="map"&&<LiveAssetMap focusAssetId={mapFocus} onSelectAsset={()=>{}}/>}
        {tab==="board"&&<NationalAssetBoard onSeeOnMap={handleSeeOnMap}/>}
        {tab==="approvals"&&<ApprovalsEscalation onSelect={setDrawerReq}/>}
        {tab==="performance"&&<PerformanceHistory/>}
      </div>
      {drawerReq&&<DetailDrawer req={drawerReq} onClose={()=>setDrawerReq(null)} onSeeOnMap={handleSeeOnMap}/>}
    </div>
  </div>;
}

/* ══ TAB 1: CURRENT APPLICATIONS ══ */
function CurrentApplications({onSelect,onSeeOnMap,onNewRequest}){
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
      <SCard label="Active Requests" value={CURRENT_REQUESTS.length} color={T.navy}/>
      <SCard label="Awaiting DM" value={CURRENT_REQUESTS.filter(r=>r.reqStatus==="Awaiting DM").length||"0"} color={T.orange}/>
      <SCard label="Escalated" value={CURRENT_REQUESTS.filter(r=>r.reqStatus==="Escalated").length} color="#6C5CE7"/>
      <SCard label="Assets Deployed" value={ASSETS.filter(a=>a.status==="Deployed").length} color={T.teal}/>
      <SCard label="Extensions Open" value={CURRENT_REQUESTS.filter(r=>!r.initial).length} color={T.orange}/>
      <SCard label="Sign-off Pending" value={CURRENT_REQUESTS.filter(r=>r.signoff==="—").length} color={T.coral}/>
    </div>
    <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",minWidth:1200}}><thead><tr>
          <TH>Request No.</TH><TH>Type</TH><TH>Urgency</TH><TH>Jurisdiction</TH><TH>Agency</TH><TH>Asset</TH><TH>Mission</TH><TH>Base</TH><TH>Request Status</TH><TH>DM Status</TH><TH>CCOSC ASC</TH><TH>Tracker</TH><TH>Sign-off</TH><TH>Updated</TH><TH w={90}>Actions</TH>
        </tr></thead>
        <tbody>{CURRENT_REQUESTS.map((r,i)=><tr key={i} onClick={()=>onSelect(r)} style={{cursor:"pointer"}}>
          <TD mono fw={600}>{r.no}</TD>
          <TD>{r.initial?<span style={{fontSize:11,color:T.g500}}>Initial</span>:<span style={{padding:"2px 8px",borderRadius:4,fontSize:10,fontWeight:650,background:T.orangeL,color:"#c06e15"}}>Extension</span>}</TD>
          <TD><UrgBadge u={r.urgency}/></TD>
          <TD fw={600}>{r.jurisdiction}</TD>
          <TD>{r.agency}</TD>
          <TD fw={600}>{r.asset}</TD>
          <TD s={{maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.mission}</TD>
          <TD s={{fontSize:12}}>{r.base}</TD>
          <TD><RChip status={r.reqStatus}/></TD>
          <TD s={{fontSize:12}}>{r.dmStatus}</TD>
          <TD s={{fontSize:12}}>{r.ccoscState}</TD>
          <TD>{r.tracker!=="—"?<span style={{padding:"2px 7px",borderRadius:4,fontSize:10,fontWeight:600,background:T.greenL,color:"#5a8a1f"}}>{r.tracker}</span>:<span style={{color:T.g400}}>—</span>}</TD>
          <TD>{r.signoff!=="—"?<span style={{padding:"2px 7px",borderRadius:4,fontSize:10,fontWeight:600,background:T.greenL,color:"#5a8a1f"}}>{r.signoff}</span>:<span style={{color:T.g400}}>—</span>}</TD>
          <TD s={{fontSize:11,color:T.g500}}>{r.updated}</TD>
          <TD><div style={{display:"flex",gap:4}}>
            {["Active","Deployed"].includes(r.reqStatus)||r.tracker==="Updated"?<button onClick={(e)=>{e.stopPropagation();onSeeOnMap(r.assetId);}} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${T.blue}`,background:T.blueL,color:T.blue,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>📍 Map</button>:null}
            <button onClick={(e)=>{e.stopPropagation();onSelect(r);}} style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${T.g300}`,background:"#fff",color:T.g600,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>View</button>
          </div></TD>
        </tr>)}</tbody></table>
      </div>
    </div>
    <div style={{marginTop:14,display:"flex",gap:14}}>
      <div style={{padding:"10px 14px",background:T.coralL,borderRadius:6,fontSize:12,color:T.coral,flex:1}}><strong>Escalation:</strong> NAA-26-004 (NLEAD — ACT ESA) has been escalated to CCOSC ASC. Awaiting ASC decision.</div>
      <div style={{padding:"10px 14px",background:T.orangeL,borderRadius:6,fontSize:12,color:"#c06e15",flex:1}}><strong>Extension:</strong> NAA-26-001-E1 — NLAT extension request (2 days) pending DM review.</div>
    </div>
  </div>;
}

/* ══ TAB 2: PAST APPLICATIONS ══ */
function PastApplications({onSelect}){
  const[filter,setFilter]=useState({jurisdiction:"All",outcome:"All"});
  const filtered=PAST_REQUESTS.filter(r=>(filter.jurisdiction==="All"||r.jurisdiction===filter.jurisdiction)&&(filter.outcome==="All"||r.outcome===filter.outcome));
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
      {["All","NSW","VIC","QLD","SA","WA","ACT"].map(j=><button key={j} onClick={()=>setFilter(f=>({...f,jurisdiction:j}))} style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:550,border:`1px solid ${filter.jurisdiction===j?T.blue:T.g300}`,background:filter.jurisdiction===j?T.blue:"#fff",color:filter.jurisdiction===j?"#fff":T.g600,cursor:"pointer",fontFamily:"inherit"}}>{j}</button>)}
      <div style={{width:1,background:T.g200,margin:"0 4px"}}/>
      {["All","Completed","Declined"].map(o=><button key={o} onClick={()=>setFilter(f=>({...f,outcome:o}))} style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:550,border:`1px solid ${filter.outcome===o?T.teal:T.g300}`,background:filter.outcome===o?T.teal:"#fff",color:filter.outcome===o?"#fff":T.g600,cursor:"pointer",fontFamily:"inherit"}}>{o}</button>)}
    </div>
    <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>
        <TH>Request No.</TH><TH>Type</TH><TH>Jurisdiction</TH><TH>Asset</TH><TH>Mission</TH><TH>Outcome</TH><TH>Final Base</TH><TH>Closed</TH><TH>Sign-off</TH><TH>Duration</TH><TH>Extensions</TH><TH>Action</TH>
      </tr></thead>
      <tbody>{filtered.map((r,i)=><tr key={i}>
        <TD mono fw={600}>{r.no}</TD>
        <TD>{r.type}</TD><TD fw={600}>{r.jurisdiction}</TD><TD fw={600}>{r.asset}</TD>
        <TD>{r.mission}</TD>
        <TD><span style={{padding:"2px 8px",borderRadius:4,fontSize:11,fontWeight:600,background:r.outcome==="Completed"?T.greenL:T.coralL,color:r.outcome==="Completed"?"#5a8a1f":T.coral}}>{r.outcome}</span></TD>
        <TD s={{fontSize:12}}>{r.finalBase}</TD>
        <TD s={{fontSize:12}}>{r.closed}</TD>
        <TD>{r.signoffFiled?<span style={{color:"#5a8a1f",fontWeight:600,fontSize:12}}>✓ Filed</span>:<span style={{color:T.g400,fontSize:12}}>—</span>}</TD>
        <TD>{r.duration}</TD><TD>{r.extCount}</TD>
        <TD><button style={{padding:"3px 8px",borderRadius:4,border:`1px solid ${T.g300}`,background:"#fff",color:T.g600,fontSize:10,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>View History</button></TD>
      </tr>)}</tbody></table>
    </div>
    <div style={{marginTop:14,padding:"10px 14px",background:T.tealL,borderRadius:6,fontSize:12,color:"#148895"}}>
      <strong>Audit:</strong> {PAST_REQUESTS.length} historical NAA applications. {PAST_REQUESTS.filter(r=>r.signoffFiled).length} with sign-off filed. Full tracker history preserved for each record.
    </div>
  </div>;
}

/* ══ TAB 5: APPROVALS & ESCALATION ══ */
function ApprovalsEscalation({onSelect}){
  const queue=CURRENT_REQUESTS.filter(r=>["Under Triage","Awaiting DM","Escalated","Extension Requested"].includes(r.reqStatus));
  const[selected,setSelected]=useState(queue[0]||null);
  const steps=["Submitted","NRSC Triaged","Awaiting DM","DM Decision","CCOSC ASC Notified","Tracker Updated","Sign-off Received","Filed"];
  const getStepIdx=(r)=>{if(!r)return 0;if(r.reqStatus==="Escalated")return 3;if(r.reqStatus==="Under Triage")return 1;if(r.reqStatus==="Extension Requested")return 2;if(r.signoff==="Received")return 6;if(r.tracker==="Updated")return 5;if(r.ccoscState==="Notified")return 4;if(r.dmStatus==="Approved")return 3;return 2;};
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,minHeight:500}}>
      {/* LEFT — Queue */}
      <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Approval Queue</div>
        <div>{queue.map((r,i)=><div key={i} onClick={()=>setSelected(r)} style={{padding:"12px 18px",borderBottom:`1px solid ${T.g100}`,cursor:"pointer",background:selected?.no===r.no?T.blueL:"transparent"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span style={{fontSize:13,fontWeight:650,fontFamily:"'DM Mono',monospace"}}>{r.no}</span>
            <UrgBadge u={r.urgency}/>
          </div>
          <div style={{fontSize:12,color:T.g600,marginBottom:4}}>{r.asset} · {r.jurisdiction} · {r.agency}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <RChip status={r.reqStatus}/>
            <span style={{fontSize:10,color:T.g400}}>{r.updated}</span>
          </div>
        </div>)}</div>
      </div>
      {/* CENTRE — Approval ladder */}
      <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Approval Ladder {selected&&<span style={{fontSize:12,color:T.g500,fontWeight:400}}>— {selected.no}</span>}</div>
        <div style={{padding:"18px"}}>
          {selected?steps.map((st,i)=>{const done=i<=getStepIdx(selected);const active=i===getStepIdx(selected);return<div key={i} style={{display:"flex",gap:12,marginBottom:0}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div style={{width:24,height:24,borderRadius:"50%",background:done?active&&selected.reqStatus==="Escalated"?"#6C5CE7":T.green:T.g200,color:done?"#fff":T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0}}>{done?"✓":i+1}</div>
              {i<7&&<div style={{width:2,height:24,background:done?T.green:T.g200}}/>}
            </div>
            <div style={{paddingBottom:10}}><div style={{fontSize:12.5,fontWeight:done?600:400,color:done?T.navy:T.g400}}>{st}</div>{active&&<div style={{fontSize:10,color:selected.reqStatus==="Escalated"?"#6C5CE7":T.orange,fontWeight:550}}>← Current step</div>}</div>
          </div>}):<div style={{color:T.g400,fontSize:13,textAlign:"center",paddingTop:40}}>Select a request to view its approval ladder</div>}
        </div>
      </div>
      {/* RIGHT — Actions */}
      <div>
        <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",marginBottom:16}}>
          <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Actions</div>
          <div style={{padding:"14px 18px",display:"flex",flexDirection:"column",gap:8}}>
            <Btn v="primary" s={{justifyContent:"center"}}>✓ Approve — DM Sign-off</Btn>
            <Btn v="danger" s={{justifyContent:"center"}}>✕ Decline</Btn>
            <Btn v="secondary" s={{justifyContent:"center",color:"#6C5CE7",borderColor:"#6C5CE7"}}>⬆ Escalate to CCOSC ASC</Btn>
            <Btn v="secondary" s={{justifyContent:"center"}}>Request Clarification</Btn>
            <div style={{height:1,background:T.g200,margin:"4px 0"}}/>
            <Btn v="secondary" s={{justifyContent:"center"}}>Mark Tracker Updated</Btn>
            <Btn v="secondary" s={{justifyContent:"center"}}>Record Sign-off Received</Btn>
            <Btn v="secondary" s={{justifyContent:"center"}}>File Sign-off</Btn>
          </div>
        </div>
        {selected&&<div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
          <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Notes & History</div>
          <div style={{padding:"14px 18px"}}>
            <textarea style={{width:"100%",height:60,border:`1px solid ${T.g200}`,borderRadius:6,padding:8,fontSize:12,fontFamily:"inherit",resize:"vertical",boxSizing:"border-box"}} placeholder="Add approval note..."/>
            <div style={{marginTop:10}}>
              {[{t:"31 Mar 09:15",e:"Escalated to CCOSC ASC",by:"J. Walsh"},{t:"31 Mar 08:00",e:"Request submitted",by:"Air Desk"}].map((n,i)=><div key={i} style={{display:"flex",gap:8,padding:"5px 0",borderBottom:`1px solid ${T.g50}`}}>
                <div style={{width:3,borderRadius:2,background:i===0?"#6C5CE7":T.blue,flexShrink:0}}/>
                <div><div style={{fontSize:11.5,fontWeight:550}}>{n.e}</div><div style={{fontSize:10,color:T.g400}}>{n.t} · {n.by}</div></div>
              </div>)}
            </div>
          </div>
        </div>}
      </div>
    </div>
  </div>;
}

/* ══ DETAIL DRAWER ══ */
function DetailDrawer({req,onClose,onSeeOnMap}){
  const asset=ASSETS.find(a=>a.id===req.assetId);
  const timeline=[
    {step:"Submitted",date:req.submitted,done:true},
    {step:"NRSC Triage",date:req.reqStatus==="Under Triage"?req.updated:"—",done:!["Draft","Submitted"].includes(req.reqStatus)},
    {step:"Awaiting DM",date:"—",done:["Active","Approved - DM","Sign-off Received","Escalated"].includes(req.reqStatus)||req.dmStatus==="Approved"},
    {step:"DM Decision",date:req.dmStatus==="Approved"?req.updated:"—",done:req.dmStatus==="Approved"},
    {step:"CCOSC ASC",date:req.ccoscState==="Notified"?req.updated:"—",done:req.ccoscState==="Notified"},
    {step:"Active / Deployed",date:req.reqStatus==="Active"?req.updated:"—",done:req.reqStatus==="Active"||req.tracker==="Updated"},
    {step:"Sign-off",date:req.signoff==="Received"?req.updated:"—",done:req.signoff==="Received"},
    {step:"Closed",date:"—",done:req.reqStatus==="Closed"},
  ];
  return <div style={{width:360,borderLeft:`1px solid ${T.g200}`,background:"#fff",flexShrink:0,overflowY:"auto",display:"flex",flexDirection:"column"}}>
    <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:14,fontWeight:650}}>NAA Detail</span>
      <span onClick={onClose} style={{cursor:"pointer",color:T.g400,fontSize:20,lineHeight:1}}>×</span>
    </div>
    <div style={{padding:"14px 18px",flex:1}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <span style={{fontSize:16,fontWeight:700,fontFamily:"'DM Mono',monospace"}}>{req.no}</span>
        <UrgBadge u={req.urgency}/>
      </div>
      <div style={{fontSize:12.5,marginBottom:16}}>
        {[["Jurisdiction",req.jurisdiction],["Agency",req.agency],["Asset",req.asset],["Mission",req.mission],["Incident",req.incident],["Operating Base",req.base],["Request Status",req.reqStatus],["DM Status",req.dmStatus],["CCOSC ASC",req.ccoscState],["Tracker",req.tracker],["Sign-off",req.signoff],["Submitted",req.submitted],["Last Updated",req.updated],["Requester",req.requester],["Authoriser",req.authoriser]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${T.g50}`,gap:8}}><span style={{color:T.g500,flexShrink:0}}>{k}</span><span style={{fontWeight:550,textAlign:"right"}}>{v}</span></div>)}
      </div>
      {!req.initial&&req.extReason&&<div style={{padding:"10px 12px",background:T.orangeL,borderRadius:6,fontSize:12,color:"#c06e15",marginBottom:14}}><strong>Extension:</strong> {req.extReason}<br/><span style={{fontSize:11}}>Original: {req.extOriginal}</span></div>}
      {asset&&<div style={{padding:"10px 12px",border:`1px solid ${T.g200}`,borderRadius:6,marginBottom:14}}>
        <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Linked Asset</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><span style={{fontSize:14,fontWeight:700}}>{asset.callsign}</span><AChip status={asset.status}/></div>
        <div style={{fontSize:12,color:T.g600}}>{asset.make}</div>
        <div style={{fontSize:11,color:T.g500,marginTop:2}}>Reg: {asset.reg} · Base: {asset.base} · Loc: {asset.loc}</div>
      </div>}
      <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:8}}>Status Timeline</div>
      <div style={{marginBottom:16}}>
        {timeline.map((st,i)=><div key={i} style={{display:"flex",gap:10}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:st.done?T.green:T.g200,color:st.done?"#fff":T.g500,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700}}>{st.done?"✓":i+1}</div>
            {i<7&&<div style={{width:2,height:20,background:st.done?T.green:T.g200}}/>}
          </div>
          <div style={{paddingBottom:6}}><div style={{fontSize:12,fontWeight:st.done?600:400,color:st.done?T.navy:T.g400}}>{st.step}</div><div style={{fontSize:10,color:T.g400}}>{st.date}</div></div>
        </div>)}
      </div>
    </div>
    <div style={{padding:"12px 18px",borderTop:`1px solid ${T.g200}`,display:"flex",gap:6,flexWrap:"wrap"}}>
      {req.reqStatus==="Active"&&<Btn v="primary" s={{flex:1,justifyContent:"center",fontSize:12}} onClick={()=>onSeeOnMap(req.assetId)}>📍 See on Map</Btn>}
      <Btn v="secondary" s={{flex:1,justifyContent:"center",fontSize:12}}>Open Approval</Btn>
      {req.reqStatus!=="Closed"&&<Btn v="secondary" s={{flex:1,justifyContent:"center",fontSize:12}}>Request Extension</Btn>}
    </div>
  </div>;
}

/* ══ NAA REQUEST WIZARD ══ */
function NAAWizard({onClose}){
  const[step,setStep]=useState(1);
  const[urgency,setUrgency]=useState("urgent");
  const[assetSel,setAssetSel]=useState("NLAT");
  const steps=["Request Type","Asset & Mission","Operating Location","Authorisation","Review & Submit"];
  return <div style={{padding:"24px 32px",maxWidth:860,margin:"0 auto"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>New NAA Request</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>Step {step} of {steps.length} — {steps[step-1]}</p></div>
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
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Request Type</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          <div onClick={()=>setUrgency("urgent")} style={{padding:18,border:`2px solid ${urgency==="urgent"?T.coral:T.g200}`,borderRadius:8,cursor:"pointer",background:urgency==="urgent"?T.coralL:"#fff"}}><div style={{fontSize:15,fontWeight:700,color:T.coral,marginBottom:4}}>🔴 Urgent</div><div style={{fontSize:12,color:T.g600}}>Immediate asset deployment. Priority DM pathway. CCOSC ASC auto-notified.</div></div>
          <div onClick={()=>setUrgency("non-urgent")} style={{padding:18,border:`2px solid ${urgency==="non-urgent"?T.blue:T.g200}`,borderRadius:8,cursor:"pointer",background:urgency==="non-urgent"?T.blueL:"#fff"}}><div style={{fontSize:15,fontWeight:700,color:T.blue,marginBottom:4}}>🔵 Non-Urgent</div><div style={{fontSize:12,color:T.g600}}>Planned deployment. Standard DM review within 24 hours.</div></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label="Request Category">Initial Request</Field>
          <Field label="Requesting Jurisdiction">New South Wales</Field>
          <Field label="Requesting Agency">NSW RFS</Field>
          <Field label="Priority Justification">{urgency==="urgent"?"Flood emergency — immediate resupply required":"Planned positioning for cyclone season"}</Field>
        </div>
      </div>}
      {step===2&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Asset & Mission</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
          {ASSETS.filter(a=>a.status!=="Unavailable").map(a=><div key={a.id} onClick={()=>setAssetSel(a.id)} style={{padding:14,border:`2px solid ${assetSel===a.id?T.blue:T.g200}`,borderRadius:8,cursor:"pointer",background:assetSel===a.id?T.blueL:"#fff"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:15,fontWeight:700}}>{a.callsign}</span><AChip status={a.status}/></div>
            <div style={{fontSize:12,color:T.g600}}>{a.make}</div>
            <div style={{fontSize:11,color:T.g500,marginTop:2}}>Reg: {a.reg} · Base: {a.base}</div>
          </div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label="Mission Type">Aerial reconnaissance and resupply</Field>
          <Field label="Dispatch Required By">31 Mar 2026 — 06:00</Field>
          <div style={{gridColumn:"1/3"}}><Field label="Mission Description">Post-cyclone aerial reconnaissance of Northern Rivers communities. Flood damage assessment and emergency resupply required.</Field></div>
        </div>
      </div>}
      {step===3&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Operating Location</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label="Operating Airport / Base">Richmond NSW (YSRI)</Field>
          <Field label="Incident Name">Northern Rivers Flood Response 2026</Field>
          <Field label="Geographic Reference">Northern Rivers, NSW</Field>
          <Field label="CTAF / Channel">126.7 MHz</Field>
          <Field label="Incident Controller">Linda Brooks — NSW RFS</Field>
          <Field label="IC Contact">+61 2 xxxx xxxx</Field>
        </div>
      </div>}
      {step===4&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Authorisation</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <Field label="Requester">Air Desk — AFAC NRSC</Field>
          <Field label="Requester Contact">+61 2 xxxx xxxx</Field>
          <Field label="Authorising Officer">Jessica Walsh — NRSC Duty Officer</Field>
          <Field label="Auth Reference">AUTH-NAA-2026-0026</Field>
        </div>
        <div style={{marginTop:16,padding:"10px 14px",background:T.blueL,borderRadius:6,fontSize:12,color:T.blue}}>This request will be routed to the Duty Manager for {urgency==="urgent"?"immediate":"standard"} review.</div>
      </div>}
      {step===5&&<div>
        <h3 style={{fontSize:16,fontWeight:650,marginBottom:12}}>Review & Submit</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 24px",fontSize:13,marginBottom:16}}>
          {[["Urgency",urgency==="urgent"?"🔴 Urgent":"🔵 Non-Urgent"],["Asset",ASSETS.find(a=>a.id===assetSel)?.callsign||"—"],["Jurisdiction","NSW"],["Agency","NSW RFS"],["Mission","Aerial reconnaissance and resupply"],["Operating Base","Richmond NSW"],["Dispatch By","31 Mar 2026 — 06:00"],["Authoriser","Jessica Walsh — NRSC Duty Officer"]].map(([k,v],i)=><div key={i}><div style={{fontSize:11,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:550,marginTop:2}}>{v}</div></div>)}
        </div>
        <div style={{padding:"10px 14px",background:urgency==="urgent"?T.coralL:T.blueL,borderRadius:6,fontSize:12,color:urgency==="urgent"?T.coral:T.blue,marginBottom:12}}>
          <strong>Routing:</strong> Air Desk → NRSC Triage → Duty Manager {urgency==="urgent"?"(Priority)":"(Standard)"} → CCOSC ASC Notification → Active
        </div>
      </div>}
      <div style={{display:"flex",justifyContent:"space-between",marginTop:24,paddingTop:16,borderTop:`1px solid ${T.g200}`}}>
        {step>1?<Btn v="secondary" onClick={()=>setStep(step-1)}>← Previous</Btn>:<Btn v="ghost" onClick={onClose}>Cancel</Btn>}
        <div style={{display:"flex",gap:8}}>
          {step===5&&<Btn v="secondary">Save Draft</Btn>}
          <Btn v="primary" onClick={()=>{if(step<5)setStep(step+1);else onClose();}}>{step===5?"Submit Request":"Continue →"}</Btn>
        </div>
      </div>
    </div>
  </div>;
}
