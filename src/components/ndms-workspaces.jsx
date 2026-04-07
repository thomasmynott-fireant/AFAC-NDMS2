import { useState } from "react";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},teal:{bg:T.tealL,fg:"#148895"},coral:{bg:T.coralL,fg:T.coral},orange:{bg:T.orangeL,fg:"#c06e15"},green:{bg:T.greenL,fg:"#5a8a1f"},gray:{bg:T.g100,fg:T.g600}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};
const Btn=({children,v="secondary",s,...p})=>{const base={display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,border:"none",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit"};const vs={primary:{background:T.blue,color:T.white},secondary:{background:T.white,color:T.navy,border:`1px solid ${T.g300}`},ghost:{background:"transparent",color:T.g600},light:{background:"rgba(255,255,255,.12)",color:T.white,border:"1px solid rgba(255,255,255,.2)"}};return<button style={{...base,...vs[v],...s}} {...p}>{children}</button>};
const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
const Avatar=({i,c=T.blue,s=30})=><div style={{width:s,height:s,borderRadius:"50%",background:c,color:T.white,display:"flex",alignItems:"center",justifyContent:"center",fontSize:s*.35,fontWeight:700,flexShrink:0}}>{i}</div>;
const Badge=({label,color})=><span style={{padding:"3px 10px",borderRadius:4,fontSize:11,fontWeight:600,background:{green:T.greenL,blue:T.blueL,orange:T.orangeL,coral:T.coralL,teal:T.tealL}[color]||T.g100,color:{green:"#5a8a1f",blue:T.blue,orange:"#c06e15",coral:T.coral,teal:"#148895"}[color]||T.g600}}>{label}</span>;
const TH=({children})=><th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`,whiteSpace:"nowrap"}}>{children}</th>;
const TD=({children,fw,mono,s})=><td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontSize:mono?11.5:13,fontFamily:mono?"'DM Mono',monospace":"inherit",fontWeight:fw||400,...s}}>{children}</td>;

/* ═══════════════════════════════════════════════════
   DMT WORKSPACE — Deployment Management Team
   Movement, manifests, contingent changes, replacements
   ═══════════════════════════════════════════════════ */
export function DMTHome(){
  return<div>
    <div style={{background:`linear-gradient(135deg, ${T.navy} 0%, #2c4a6a 100%)`,padding:"22px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div>
        <h1 style={{color:T.white,fontSize:21,fontWeight:700,margin:0}}>DMT Operations Console</h1>
        <p style={{color:"rgba(255,255,255,.55)",fontSize:13,margin:"4px 0 0"}}>Rachel Kimura — Deployment Manager · Northern Rivers Flood Response · Day 12</p>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn v="light">📋 Broadcast Message</Btn>
        <Btn v="primary">+ Movement Action</Btn>
      </div>
    </div>
    <div style={{padding:"20px 32px"}}>
      {/* Alert */}
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:6,marginBottom:20,background:T.coralL,borderLeft:`3px solid ${T.coral}`,fontSize:13}}>
        <span style={{fontWeight:700}}>⚠</span>
        <div><strong>Rotation critical:</strong> DM replacement required by 1 Apr — no candidate sourced. Safety Officer replacement arriving 31 Mar. <a style={{color:"inherit",textDecoration:"underline"}}>Action required →</a></div>
      </div>

      {/* Metrics */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:14,marginBottom:22}}>
        {[
          {label:"In Field",value:"64",change:"Across 3 contingents",color:T.green},
          {label:"Mobilising",value:"8",change:"Arriving next 72h",color:T.blue},
          {label:"Demobilising",value:"14",change:"Departing next 72h",color:T.orange},
          {label:"Unfilled Gaps",value:"3",change:"Action required",color:T.coral},
          {label:"Manifests Active",value:"4",change:"2 outbound, 2 return",color:T.teal},
        ].map((m,i)=><div key={i} style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"18px 20px"}}>
          <div style={{fontSize:12,color:T.g500,marginBottom:8}}>{m.label}</div>
          <div style={{fontSize:26,fontWeight:700,marginBottom:3}}>{m.value}</div>
          <div style={{fontSize:11,fontWeight:550,color:m.color}}>{m.change}</div>
        </div>)}
      </div>

      {/* Two-column layout */}
      <div style={{display:"grid",gridTemplateColumns:"3fr 2fr",gap:20}}>
        <div>
          {/* Movement Board */}
          <Card title="Movement Board — Next 72h" right={<div style={{display:"flex",gap:6}}><Chip color="blue">Inbound 8</Chip><Chip color="orange">Outbound 14</Chip></div>}>
            <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr><TH>Name</TH><TH>Direction</TH><TH>Route</TH><TH>Date</TH><TH>Status</TH></tr></thead>
              <tbody>
                {[
                  {name:"Sam O'Connor",dir:"Inbound",route:"HBA → LIS",date:"31 Mar",status:"Confirmed",c:"green"},
                  {name:"Peter O'Brien",dir:"Outbound",route:"LIS → BNE",date:"31 Mar",status:"Booked",c:"blue"},
                  {name:"Jake Williams",dir:"Inbound",route:"MEL → LIS",date:"2 Apr",status:"Pending",c:"orange"},
                  {name:"Rachel Kimura",dir:"Outbound",route:"LIS → BNE",date:"1 Apr",status:"Gap — no replacement",c:"coral"},
                  {name:"Karen Wong",dir:"Outbound",route:"LIS → BNE",date:"1 Apr",status:"Booked",c:"blue"},
                ].map((r,i)=><tr key={i} style={{cursor:"pointer"}}><TD fw={600}>{r.name}</TD><TD><Badge label={r.dir} color={r.dir==="Inbound"?"green":"orange"}/></TD><TD>{r.route}</TD><TD fw={600}>{r.date}</TD><TD><Chip color={r.c}>{r.status}</Chip></TD></tr>)}
              </tbody>
            </table>
          </Card>

          {/* Contingent Status */}
          <Card title="Contingent Status" right={<Btn v="ghost" s={{fontSize:12}}>View all →</Btn>} s={{marginTop:16}}>
            {[
              {group:"IMT1",type:"IMT & Overhead",count:3,status:"Active (1 demob)",c:"orange",day:"12–14"},
              {group:"CREW1",type:"Flood Ops",count:6,status:"Active",c:"green",day:"8"},
              {group:"CREW2",type:"Flood Ops",count:6,status:"Active",c:"green",day:"8"},
              {group:"Overhead",type:"Safety, Admin",count:4,status:"Active",c:"green",day:"8–12"},
            ].map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<3?`1px solid ${T.g100}`:"none"}}>
              <Badge label={g.group} color="blue"/>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{g.type}</div><div style={{fontSize:11.5,color:T.g500}}>{g.count} personnel · Day {g.day}</div></div>
              <Chip color={g.c}>{g.status}</Chip>
            </div>)}
          </Card>
        </div>

        <div>
          {/* Replacement Actions */}
          <Card title="Replacement Actions" right={<Chip color="coral">3 gaps</Chip>}>
            {[
              {role:"Deployment Manager",deploy:"Northern Rivers Flood",date:"1 Apr",status:"Unsourced",c:"coral"},
              {role:"Flood Ops",deploy:"Northern Rivers Flood",date:"1 Apr",status:"Unsourced",c:"coral"},
              {role:"INLO Admin",deploy:"Canada 2025",date:"8 Apr",status:"Extension pending",c:"orange"},
            ].map((g,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:13,fontWeight:600}}>{g.role}</span>
                <Chip color={g.c}>{g.status}</Chip>
              </div>
              <div style={{fontSize:11.5,color:T.g500}}>{g.deploy} · Demob {g.date}</div>
              <Btn v="primary" s={{marginTop:8,padding:"4px 12px",fontSize:11}}>Source Replacement</Btn>
            </div>)}
          </Card>

          {/* Broadcasts */}
          <Card title="Recent Broadcasts" s={{marginTop:16}}>
            {[
              {title:"Rotation 1 operational briefing",time:"30 Mar 08:00",by:"R. Kimura",recipients:"All CREW2"},
              {title:"Weather warning — thunderstorms 31 Mar",time:"29 Mar 16:00",by:"R. Kimura",recipients:"All personnel"},
              {title:"Accommodation change — CREW1",time:"28 Mar 12:00",by:"R. Kimura",recipients:"CREW1"},
            ].map((b,i)=><div key={i} style={{padding:"8px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
              <div style={{fontSize:13,fontWeight:600}}>{b.title}</div>
              <div style={{fontSize:11,color:T.g500}}>{b.time} · {b.by} → {b.recipients}</div>
            </div>)}
          </Card>

          {/* Logistics */}
          <Card title="Logistics Summary" s={{marginTop:16}}>
            {[["Accommodation","Hilton Lismore — 64 rooms"],["Ground transport","3 buses, 4 utes"],["Meals","Catering contract active"],["Flights booked","22 (12 inbound, 10 outbound)"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:12.5,borderBottom:i<3?`1px solid ${T.g50}`:"none"}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550}}>{v}</span></div>)}
          </Card>
        </div>
      </div>
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════
   AIR DESK WORKSPACE — Aviation operations console
   ═══════════════════════════════════════════════════ */
export function AirDeskHome(){
  return<div>
    <div style={{background:`linear-gradient(135deg, #1a3a5c 0%, ${T.navy} 100%)`,padding:"22px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <span style={{fontSize:22}}>✈</span>
          <h1 style={{color:T.white,fontSize:21,fontWeight:700,margin:0}}>Air Desk Operations</h1>
        </div>
        <p style={{color:"rgba(255,255,255,.55)",fontSize:13,margin:0}}>AFAC NRSC — National Aviation Asset Management · 30 Mar 2026</p>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn v="light">Export Status</Btn>
        <Btn v="primary">+ New NAA Request</Btn>
      </div>
    </div>
    <div style={{padding:"20px 32px"}}>
      {/* Asset status strip */}
      <div style={{display:"flex",gap:10,marginBottom:20}}>
        {[{l:"Available",v:1,c:T.green,asset:"NLAT"},{l:"Deployed",v:2,c:T.blue,asset:"NLEAD, NHAWK(SA)"},{l:"Moving",v:1,c:T.orange,asset:"NHAWK(QLD)"},{l:"Maintenance",v:1,c:T.g500,asset:"NS61N"}].map((s,i)=><div key={i} style={{flex:1,background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"14px 16px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}><div style={{width:10,height:10,borderRadius:"50%",background:s.c}}/><span style={{fontSize:12,color:T.g600}}>{s.l}</span><span style={{marginLeft:"auto",fontWeight:700,fontSize:20}}>{s.v}</span></div>
          <div style={{fontSize:11,color:T.g500}}>{s.asset}</div>
        </div>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"5fr 3fr",gap:20}}>
        <div>
          {/* Pending requests */}
          <Card title="Pending Requests" right={<Chip color="orange">2 awaiting</Chip>}>
            {[
              {no:"NAA-2025-0019",asset:"NLAT",type:"New",mission:"QLD resupply",urgency:"Non-Urgent",uc:"blue",status:"Awaiting DM",sc:"teal",time:"4h"},
              {no:"NAA-2025-0017-E1",asset:"NHAWK (SA)",type:"Extension",mission:"Northern Rivers Flood extended",urgency:"Non-Urgent",uc:"blue",status:"Extension Review",sc:"orange",time:"2h"},
            ].map((r,i)=><div key={i} style={{padding:"14px 0",borderBottom:i<1?`1px solid ${T.g100}`:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:11.5,fontWeight:600}}>{r.no}</span>
                  <Badge label={r.type} color={r.type==="Extension"?"orange":"blue"}/>
                </div>
                <Chip color={r.sc}>{r.status}</Chip>
              </div>
              <div style={{fontSize:13,fontWeight:600}}>{r.asset} — {r.mission}</div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
                <Chip color={r.uc}>{r.urgency}</Chip>
                <span style={{fontSize:11,color:T.g400}}>{r.time} pending</span>
              </div>
            </div>)}
          </Card>

          {/* Active missions */}
          <Card title="Active Missions" right={<Chip color="blue">2 deployed</Chip>} s={{marginTop:16}}>
            {[
              {asset:"NLEAD",callsign:"NLEAD",mission:"Northern Rivers Flood — aerial reconnaissance",base:"Lismore NT",since:"28 Mar",ends:"1 Apr (est.)",no:"NAA-2025-0018"},
              {asset:"NHAWK (SA)",callsign:"NHAWK(SA)",mission:"Northern Rivers Flood — aerial support",base:"Lismore NT",since:"27 Mar",ends:"30 Mar (ext. pending)",no:"NAA-2025-0017"},
            ].map((m,i)=><div key={i} style={{padding:"14px 0",borderBottom:i<1?`1px solid ${T.g100}`:"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span style={{fontSize:15,fontWeight:700}}>{m.asset}</span>
                <Chip color="blue">Deployed</Chip>
              </div>
              <div style={{fontSize:12.5,marginBottom:4}}>{m.mission}</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,fontSize:11.5}}>
                {[["Base",m.base],["Since",m.since],["Until",m.ends]].map(([k,v],j)=><div key={j}><span style={{color:T.g400}}>{k}: </span><span style={{fontWeight:550}}>{v}</span></div>)}
              </div>
            </div>)}
          </Card>
        </div>

        <div>
          {/* Quick actions */}
          <Card title="Quick Actions">
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {[{icon:"📝",label:"New Request"},{icon:"🔄",label:"Request Extension"},{icon:"📊",label:"Status Report"},{icon:"⬆",label:"Escalate to CCOSC"}].map((a,i)=><div key={i} style={{padding:14,border:`1px solid ${T.g200}`,borderRadius:6,textAlign:"center",cursor:"pointer",background:T.white}}>
                <div style={{fontSize:22,marginBottom:4}}>{a.icon}</div>
                <div style={{fontSize:12,fontWeight:550}}>{a.label}</div>
              </div>)}
            </div>
          </Card>

          {/* Governance log */}
          <Card title="Recent Governance" s={{marginTop:16}}>
            {[
              {time:"30 Mar 09:00",event:"NAA-2025-0019 raised",by:"Air Desk",c:T.blue},
              {time:"30 Mar 08:00",event:"Extension requested NHAWK(SA)",by:"Air Desk",c:T.orange},
              {time:"28 Mar 07:15",event:"NAA-2025-0018 approved by DM",by:"J. Walsh",c:T.green},
              {time:"27 Mar 14:45",event:"NAA-2025-0017 approved by DM",by:"J. Walsh",c:T.green},
            ].map((e,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<3?`1px solid ${T.g100}`:"none"}}>
              <div style={{width:3,borderRadius:2,background:e.c,flexShrink:0}}/>
              <div><div style={{fontSize:12,fontWeight:550}}>{e.event}</div><div style={{fontSize:10.5,color:T.g500}}>{e.time} · {e.by}</div></div>
            </div>)}
          </Card>

          {/* Season metrics */}
          <Card title="Season Performance" s={{marginTop:16}}>
            {[["Total requests","34"],["Avg response time","42 min"],["Approval rate","91%"],["Asset utilisation","68%"]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",fontSize:12.5,borderBottom:i<3?`1px solid ${T.g50}`:"none"}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:650}}>{v}</span></div>)}
          </Card>
        </div>
      </div>
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════
   EXECUTIVE / CCOSC — Strategic Overview
   Low-density, confidence-level dashboard
   ═══════════════════════════════════════════════════ */
export function ExecutiveHome(){
  return<div>
    <div style={{background:`linear-gradient(135deg, #1a2a3e 0%, ${T.navy} 100%)`,padding:"28px 32px"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
        <div style={{width:42,height:42,background:"rgba(255,255,255,.1)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:T.white,fontWeight:800,fontSize:12,border:"1px solid rgba(255,255,255,.15)"}}>AFAC</div>
        <div>
          <h1 style={{color:T.white,fontSize:22,fontWeight:700,margin:0}}>Executive Overview</h1>
          <p style={{color:"rgba(255,255,255,.45)",fontSize:13,margin:"2px 0 0"}}>CCOSC / ASC Strategic Dashboard · Season 2025/26 · Week 22</p>
        </div>
      </div>
    </div>
    <div style={{padding:"24px 32px"}}>
      {/* Confidence indicators */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:16,marginBottom:24}}>
        {[
          {label:"National Capacity",value:"Adequate",indicator:"green",detail:"84% registered personnel available for deployment"},
          {label:"Active Operations",value:"3 deployments",indicator:"blue",detail:"Northern Rivers Flood (64), Canada 2025 (33), QLD Storm (pending)"},
          {label:"Major Issues",value:"2 critical",indicator:"coral",detail:"I/I/I investigation + DM rotation gap"},
          {label:"Aviation Posture",value:"3 of 5 active",indicator:"blue",detail:"2 deployed, 1 repositioning, 1 available, 1 maintenance"},
        ].map((c,i)=><div key={i} style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:10,padding:"20px 22px"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <div style={{width:12,height:12,borderRadius:"50%",background:{green:T.green,blue:T.blue,coral:T.coral,orange:T.orange}[c.indicator]}}/>
            <span style={{fontSize:12,color:T.g500,fontWeight:550,textTransform:"uppercase",letterSpacing:.5}}>{c.label}</span>
          </div>
          <div style={{fontSize:20,fontWeight:700,marginBottom:4}}>{c.value}</div>
          <div style={{fontSize:12,color:T.g500,lineHeight:1.5}}>{c.detail}</div>
        </div>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        {/* Major issues - top 5 only */}
        <Card title="Major Issues Requiring Attention" right={<Chip color="coral">2 critical</Chip>}>
          {[
            {title:"I/I/I Investigation — Canada 2025",sub:"Injury report filed for D. Kang (IMT1). Investigation commenced by AREP. Medical follow-up expected 1 Apr.",severity:"Critical",c:"coral"},
            {title:"DM Rotation Gap — Northern Rivers Flood",sub:"Rachel Kimura demobilising 1 Apr. No replacement DM sourced. Escalation recommended if not resolved by 31 Mar.",severity:"Critical",c:"coral"},
            {title:"Fatigue Management — Northern Rivers Flood",sub:"3 personnel at 12+ consecutive work days. Rotation plan being actioned.",severity:"High",c:"orange"},
            {title:"Claims Processing Backlog",sub:"7 claims past 14-day agency review window. 70-day automation approaching for 2 claims.",severity:"Medium",c:"blue"},
          ].map((iss,i)=><div key={i} style={{padding:"14px 0",borderBottom:i<3?`1px solid ${T.g100}`:"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:14,fontWeight:650}}>{iss.title}</span>
              <Chip color={iss.c}>{iss.severity}</Chip>
            </div>
            <div style={{fontSize:12.5,color:T.g600,lineHeight:1.5}}>{iss.sub}</div>
          </div>)}
        </Card>

        {/* National deployment summary */}
        <Card title="National Deployment Summary">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px 20px",marginBottom:16}}>
            {[["Total deployed","247"],["Active requests","12"],["Active contingents","8"],["Jurisdictions engaged","6"]].map(([k,v],i)=><div key={i}><div style={{fontSize:11,color:T.g400}}>{k}</div><div style={{fontSize:20,fontWeight:700,marginTop:2}}>{v}</div></div>)}
          </div>
          <div style={{borderTop:`1px solid ${T.g200}`,paddingTop:14}}>
            <div style={{fontSize:12,fontWeight:600,marginBottom:8}}>By Jurisdiction</div>
            {[{j:"NT",v:64,pct:26},{j:"NSW",v:48,pct:19},{j:"VIC",v:42,pct:17},{j:"QLD",v:38,pct:15},{j:"INT'L",v:33,pct:13},{j:"Other",v:22,pct:9}].map((j,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"3px 0"}}>
              <span style={{width:40,fontSize:12,fontWeight:600}}>{j.j}</span>
              <div style={{flex:1,height:16,background:T.g100,borderRadius:3,overflow:"hidden"}}><div style={{width:`${j.pct}%`,height:"100%",background:T.blue,borderRadius:3}}/></div>
              <span style={{width:30,fontSize:12,fontWeight:650,textAlign:"right"}}>{j.v}</span>
            </div>)}
          </div>
        </Card>
      </div>

      {/* Aviation posture */}
      <Card title="Aviation Posture" s={{marginTop:20}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:12}}>
          {[
            {asset:"NLAT",type:"C-130J Hercules",status:"Available",loc:"Richmond NSW",c:"green"},
            {asset:"NLEAD",type:"King Air 350",status:"Deployed",loc:"Lismore NT",c:"blue"},
            {asset:"NHAWK (SA)",type:"Black Hawk",status:"Deployed",loc:"Lismore NT",c:"blue"},
            {asset:"NHAWK (QLD)",type:"Black Hawk",status:"Repositioning",loc:"In transit",c:"orange"},
            {asset:"NS61N",type:"Sikorsky S-61N",status:"Maintenance",loc:"Bankstown NSW",c:"gray"},
          ].map((a,i)=><div key={i} style={{padding:14,border:`1px solid ${T.g200}`,borderRadius:8,textAlign:"center"}}>
            <div style={{fontSize:15,fontWeight:700,marginBottom:4}}>{a.asset}</div>
            <div style={{fontSize:11,color:T.g500,marginBottom:6}}>{a.type}</div>
            <Chip color={a.c}>{a.status}</Chip>
            <div style={{fontSize:10.5,color:T.g400,marginTop:6}}>{a.loc}</div>
          </div>)}
        </div>
      </Card>
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════
   INLO / AREP — Field Coordination Workspace
   Welfare, contacts, SitReps, role changes, I/I/I
   ═══════════════════════════════════════════════════ */
export function INLOHome(){
  return<div>
    <div style={{background:`linear-gradient(135deg, #1a4a3a 0%, #234a3a 100%)`,padding:"22px 32px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div>
        <h1 style={{color:T.white,fontSize:21,fontWeight:700,margin:0}}>Field Coordination — AREP</h1>
        <p style={{color:"rgba(255,255,255,.55)",fontSize:13,margin:"4px 0 0"}}>Mark Sullivan — Agency Representative · Northern Rivers Flood Response · Lismore</p>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn v="light">📋 Log Contact</Btn>
        <Btn v="light" s={{background:"rgba(230,90,70,.3)",borderColor:"rgba(230,90,70,.5)"}}>⚠ Report I/I/I</Btn>
      </div>
    </div>
    <div style={{padding:"20px 32px"}}>
      {/* Welfare alert */}
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:6,marginBottom:20,background:T.orangeL,borderLeft:`3px solid ${T.orange}`,fontSize:13}}>
        <span style={{fontWeight:700}}>⏱</span>
        <div><strong>Welfare overdue:</strong> Karen Wong — last welfare contact 28 Mar (2 days ago). 9 consecutive work days. <a style={{color:"inherit",textDecoration:"underline"}}>Log contact now →</a></div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
        {/* Welfare status */}
        <Card title="Welfare Status" right={<Chip color="orange">1 overdue</Chip>}>
          {[
            {name:"Daniel Thornton",last:"30 Mar 08:15",status:"OK",c:"green",days:0},
            {name:"Tom Briggs",last:"29 Mar 18:30",status:"OK",c:"green",days:1},
            {name:"Karen Wong",last:"28 Mar 17:00",status:"Overdue",c:"coral",days:2},
            {name:"Ben Taylor",last:"30 Mar 08:15",status:"OK",c:"green",days:0},
            {name:"Rachel Kimura",last:"29 Mar 16:00",status:"OK",c:"green",days:1},
          ].map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none"}}>
            <Avatar i={p.name.split(" ").map(w=>w[0]).join("")} c={p.c==="coral"?T.coral:T.blue} s={26}/>
            <div style={{flex:1}}><div style={{fontSize:12.5,fontWeight:600}}>{p.name}</div><div style={{fontSize:10.5,color:T.g500}}>Last: {p.last}</div></div>
            <Chip color={p.c}>{p.status}</Chip>
          </div>)}
        </Card>

        {/* Active I/I/I */}
        <Card title="I/I/I Reports" right={<Chip color="coral">1 active</Chip>}>
          <div style={{padding:"12px 0",borderBottom:`1px solid ${T.g100}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <span style={{fontSize:13,fontWeight:600}}>I/I/I-2025-0034</span>
              <Chip color="coral">Investigation</Chip>
            </div>
            <div style={{fontSize:12,color:T.g600}}>David Kang (IC Support) — Minor laceration during equipment handling. First aid applied.</div>
            <div style={{fontSize:11,color:T.g500,marginTop:4}}>Canada 2025 · IMT1 · 29 Mar 14:30</div>
            <Btn v="primary" s={{marginTop:8,padding:"4px 12px",fontSize:11}}>Add Investigation Note</Btn>
          </div>
          <div style={{paddingTop:12}}>
            <div style={{fontSize:12,color:T.g500,textAlign:"center"}}>No other active reports</div>
          </div>
        </Card>

        {/* Quick actions */}
        <div>
          <Card title="Quick Actions">
            {[
              {icon:"👤",label:"Log Welfare Contact",bg:T.tealL},
              {icon:"⚠",label:"Report Incident (I/I/I)",bg:T.coralL},
              {icon:"🔄",label:"Request Role Change",bg:T.blueL},
              {icon:"📝",label:"Draft Field SitRep",bg:T.orangeL},
              {icon:"📱",label:"Broadcast to Team",bg:T.greenL},
            ].map((a,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none",cursor:"pointer"}}>
              <div style={{width:32,height:32,borderRadius:8,background:a.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{a.icon}</div>
              <span style={{fontSize:13,fontWeight:550}}>{a.label}</span>
              <span style={{marginLeft:"auto",color:T.g400}}>›</span>
            </div>)}
          </Card>
          <Card title="Accountability Chain" s={{marginTop:16}}>
            {[
              {name:"Rachel Kimura",role:"Deployment Manager",c:T.blue},
              {name:"Linda Brooks",role:"QLD QFES Coordinator",c:T.coral},
              {name:"Jessica Walsh",role:"NRSC Duty Officer",c:T.navy},
            ].map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
              <Avatar i={c.name.split(" ").map(w=>w[0]).join("")} c={c.c} s={24}/>
              <div><div style={{fontSize:12,fontWeight:600}}>{c.name}</div><div style={{fontSize:10.5,color:T.g500}}>{c.role}</div></div>
            </div>)}
          </Card>
        </div>
      </div>

      {/* Recent contact log */}
      <Card title="Recent Contact Log" right={<Btn v="primary" s={{padding:"4px 14px",fontSize:12}}>+ Log Contact</Btn>} s={{marginTop:16}}>
        {[
          {date:"30 Mar 08:15",type:"Welfare check",who:"CREW2 (team)",notes:"All checked — morale good. Karen Wong flagged for fatigue review.",method:"In person"},
          {date:"29 Mar 18:30",type:"Welfare check",who:"Daniel Thornton",notes:"No concerns. Rest day scheduled 31 Mar.",method:"In person"},
          {date:"29 Mar 08:00",type:"Briefing",who:"CREW2 (team)",notes:"Morning briefing. Ops plan Day 8 confirmed.",method:"Group briefing"},
        ].map((l,i)=><div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
          <div style={{width:3,borderRadius:2,background:l.type.includes("Welfare")?T.teal:T.blue,flexShrink:0}}/>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:13,fontWeight:600}}>{l.type} — {l.who}</span><span style={{fontSize:11,color:T.g400}}>{l.date}</span></div>
            <div style={{fontSize:12,color:T.g600,marginTop:2}}>{l.notes}</div>
            <div style={{fontSize:11,color:T.g500,marginTop:2}}>{l.method}</div>
          </div>
        </div>)}
      </Card>
    </div>
  </div>;
}

/* ═══════════════════════════════════════════════════
   RMG / STATE OVERSIGHT — Jurisdiction reporting lens
   ═══════════════════════════════════════════════════ */
export function RMGHome(){
  return<div style={{padding:"24px 32px"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
      <div><h2 style={{fontSize:20,fontWeight:700,margin:0}}>RMG / State Oversight</h2><p style={{color:T.g500,fontSize:13,margin:"4px 0 0"}}>New South Wales — Resource Management Group · Season 2025/26</p></div>
      <Btn v="secondary">Export Summary</Btn>
    </div>

    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
      {[{l:"NSW Personnel Deployed",v:"48",c:T.blue},{l:"Contributing To",v:"3",c:T.navy,sub:"deployments"},{l:"Season Cost",v:"$97,380",c:T.orange},{l:"Available Personnel",v:"84",c:T.green}].map((m,i)=><div key={i} style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,padding:"16px 20px"}}><div style={{fontSize:11,color:T.g500}}>{m.l}</div><div style={{fontSize:24,fontWeight:700,color:m.c,marginTop:4}}>{m.v}</div>{m.sub&&<div style={{fontSize:11,color:T.g500,marginTop:2}}>{m.sub}</div>}</div>)}
    </div>

    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <Card title="NSW Contributing To">
        {[
          {deploy:"Northern Rivers Flood Response",personnel:32,roles:"IMT, Crew, DM, Safety",cost:"$68,200",status:"Active",c:"green"},
          {deploy:"Canada 2025",personnel:6,roles:"INLO, INLO Admin, Crew",cost:"$24,100",status:"Active",c:"green"},
          {deploy:"QLD Storm (pending)",personnel:0,roles:"Awaiting nomination · 6 roles",cost:"—",status:"Pending",c:"orange"},
        ].map((d,i)=><div key={i} style={{padding:"12px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:13,fontWeight:650}}>{d.deploy}</span><Chip color={d.c}>{d.status}</Chip></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:T.g500}}><span>{d.personnel} personnel · {d.roles}</span><span style={{fontWeight:600,color:T.navy}}>{d.cost}</span></div>
        </div>)}
      </Card>

      <Card title="Exceptions & Expiries">
        {[
          {label:"Expired medical fitness",val:3,c:T.coral},
          {label:"WWCC expiring <30d",val:4,c:T.orange},
          {label:"Incomplete EOIs",val:6,c:T.orange},
          {label:"International passport missing",val:12,c:T.g400},
          {label:"Pending role approvals",val:3,c:T.blue},
        ].map((e,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:i<4?`1px solid ${T.g100}`:"none",fontSize:13}}>
          <span style={{color:T.g600}}>{e.label}</span>
          <span style={{fontWeight:650,color:e.c}}>{e.val}</span>
        </div>)}
      </Card>
    </div>

    {/* Trend */}
    <Card title="Deployment Trend — NSW Personnel" s={{marginTop:20}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:10}}>
        {[{w:"W15",v:8},{w:"W16",v:12},{w:"W17",v:18},{w:"W18",v:25},{w:"W19",v:30},{w:"W20",v:38},{w:"W21",v:44},{w:"W22",v:48}].map((w,i)=><div key={i} style={{textAlign:"center"}}>
          <div style={{height:80,display:"flex",alignItems:"flex-end",justifyContent:"center",marginBottom:4}}><div style={{width:28,height:`${(w.v/48)*70}px`,background:T.blue,borderRadius:"4px 4px 0 0"}}/></div>
          <div style={{fontSize:12,fontWeight:600}}>{w.v}</div>
          <div style={{fontSize:10,color:T.g400}}>{w.w}</div>
        </div>)}
      </div>
    </Card>
  </div>;
}
