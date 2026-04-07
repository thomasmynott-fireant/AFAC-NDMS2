import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { T, ASSETS, CURRENT_REQUESTS, PAST_REQUESTS, RChip, AChip } from "./ndms-naa-core";

/* Fix default marker icons */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ══ Shared UI ══ */
const SCard=({label,value,sub,color=T.navy})=><div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,padding:"14px 18px"}}><div style={{fontSize:10.5,color:T.g500,fontWeight:550,textTransform:"uppercase",letterSpacing:.3}}>{label}</div><div style={{fontSize:22,fontWeight:700,color,marginTop:4}}>{value}</div>{sub&&<div style={{fontSize:11,color:T.g500,marginTop:2}}>{sub}</div>}</div>;
const Btn=({children,v="secondary",s,...p})=>{const vs={primary:{background:T.blue,color:"#fff",border:"none"},secondary:{background:"#fff",color:T.navy,border:`1px solid ${T.g300}`}};return<button style={{display:"inline-flex",alignItems:"center",gap:6,padding:"7px 16px",borderRadius:6,fontSize:13,fontWeight:550,cursor:"pointer",fontFamily:"inherit",...vs[v],...s}} {...p}>{children}</button>};

/* ══ AIRCRAFT MARKER ICON ══ */
function createAircraftIcon(status){
  const colors={Available:T.green,Deployed:T.teal,Moving:T.orange,Unavailable:T.g400,Redeploying:"#6C5CE7"};
  const c=colors[status]||T.g400;
  const html=`<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><div style="width:26px;height:26px;border-radius:6px;background:${c};border:2px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;color:white;font-size:14px;">✈</div></div>`;
  return L.divIcon({html,iconSize:[32,32],iconAnchor:[16,16],popupAnchor:[0,-16],className:""});
}

/* ══ MAP FOCUS COMPONENT ══ */
function MapFocus({focusAssetId}){
  const map=useMap();
  useEffect(()=>{
    if(focusAssetId){
      const a=ASSETS.find(x=>x.id===focusAssetId);
      if(a){map.flyTo([a.lat,a.lng],8,{duration:1});}
    }
  },[focusAssetId,map]);
  return null;
}

/* ══ TAB: LIVE ASSET MAP ══ */
export function LiveAssetMap({focusAssetId,onSelectAsset}){
  const[filter,setFilter]=useState("All");
  const[drawerAsset,setDrawerAsset]=useState(null);
  const filtered=ASSETS.filter(a=>filter==="All"||a.status===filter);

  useEffect(()=>{
    if(focusAssetId){
      const a=ASSETS.find(x=>x.id===focusAssetId);
      if(a)setDrawerAsset(a);
    }
  },[focusAssetId]);

  return <div style={{padding:"20px 32px",display:"flex",gap:16,height:"calc(100% - 40px)"}}>
    <div style={{flex:1,display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
        {["All","Available","Deployed","Moving","Unavailable"].map(f=><button key={f} onClick={()=>setFilter(f)} style={{padding:"4px 12px",borderRadius:20,fontSize:11,fontWeight:550,border:`1px solid ${filter===f?T.blue:T.g300}`,background:filter===f?T.blue:"#fff",color:filter===f?"#fff":T.g600,cursor:"pointer",fontFamily:"inherit"}}>{f}</button>)}
      </div>
      <div style={{flex:1,borderRadius:8,overflow:"hidden",border:`1px solid ${T.g200}`}}>
        <MapContainer center={[-28,140]} zoom={4} style={{height:"100%",width:"100%"}} maxBounds={[[-60,90],[-5,200]]} maxBoundsViscosity={1.0}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://carto.com/">CARTO</a>'/>
          <MapFocus focusAssetId={focusAssetId}/>
          {filtered.map(a=><Marker key={a.id} position={[a.lat,a.lng]} icon={createAircraftIcon(a.status)} eventHandlers={{click:()=>setDrawerAsset(a)}}>
            <Popup><div style={{fontFamily:"'DM Sans',sans-serif",minWidth:180}}>
              <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{a.callsign}</div>
              <div style={{fontSize:12,color:T.g600,marginBottom:2}}>{a.make}</div>
              <div style={{fontSize:11,color:T.g500}}>Reg: {a.reg}</div>
              <div style={{fontSize:11,color:T.g500}}>Mission: {a.mission}</div>
              <div style={{marginTop:6}}><AChip status={a.status}/></div>
            </div></Popup>
          </Marker>)}
        </MapContainer>
      </div>
    </div>
    {drawerAsset&&<div style={{width:300,background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflowY:"auto",flexShrink:0}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:14,fontWeight:650}}>Asset Detail</span>
        <span onClick={()=>setDrawerAsset(null)} style={{cursor:"pointer",color:T.g400,fontSize:20}}>×</span>
      </div>
      <div style={{padding:"14px 18px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:18,fontWeight:700}}>{drawerAsset.callsign}</span>
          <AChip status={drawerAsset.status}/>
        </div>
        <div style={{fontSize:12.5}}>
          {[["Aircraft",drawerAsset.make],["Registration",drawerAsset.reg],["Home Base",drawerAsset.base],["Current Location",drawerAsset.loc],["Mission",drawerAsset.mission],["Linked NAA",drawerAsset.linkedNAA],["Last Update",drawerAsset.lastUpdate]].map(([k,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:`1px solid ${T.g50}`,gap:8}}><span style={{color:T.g500}}>{k}</span><span style={{fontWeight:550,textAlign:"right"}}>{v}</span></div>)}
        </div>
        {drawerAsset.linkedNAA!=="—"&&<div style={{marginTop:12}}>
          <div style={{fontSize:11,color:T.g400,fontWeight:600,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Linked Request</div>
          {(()=>{const r=CURRENT_REQUESTS.find(x=>x.no===drawerAsset.linkedNAA);return r?<div style={{padding:"10px 12px",border:`1px solid ${T.g200}`,borderRadius:6}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontWeight:650,fontFamily:"'DM Mono',monospace",fontSize:12}}>{r.no}</span><RChip status={r.reqStatus}/></div>
            <div style={{fontSize:12,color:T.g600}}>{r.mission}</div>
            <div style={{fontSize:11,color:T.g500,marginTop:2}}>{r.jurisdiction} · {r.agency}</div>
          </div>:<div style={{fontSize:12,color:T.g500}}>Request not found in current register</div>;})()}
        </div>}
        <Btn v="secondary" s={{width:"100%",justifyContent:"center",marginTop:12,fontSize:12}}>Open Full Request</Btn>
      </div>
    </div>}
  </div>;
}

/* ══ TAB: NATIONAL ASSET BOARD ══ */
export function NationalAssetBoard({onSeeOnMap}){
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"flex",gap:10,marginBottom:18}}>
      {[{l:"Available",v:ASSETS.filter(a=>a.status==="Available").length,c:T.green},{l:"Deployed",v:ASSETS.filter(a=>a.status==="Deployed").length,c:T.teal},{l:"Moving",v:ASSETS.filter(a=>a.status==="Moving").length,c:T.orange},{l:"Unavailable",v:ASSETS.filter(a=>a.status==="Unavailable").length,c:T.g500}].map((s,i)=><div key={i} style={{flex:1,background:"#fff",border:`1px solid ${T.g200}`,borderRadius:6,padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}><div style={{width:10,height:10,borderRadius:"50%",background:s.c}}/><span style={{fontSize:12.5,color:T.g600}}>{s.l}</span><span style={{marginLeft:"auto",fontWeight:700,fontSize:18}}>{s.v}</span></div>)}
    </div>
    {ASSETS.map((a,i)=>{const req=CURRENT_REQUESTS.find(r=>r.assetId===a.id&&r.reqStatus!=="Closed");
      return <div key={i} style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",marginBottom:12}}>
        <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:17,fontWeight:700}}>{a.callsign}</span><AChip status={a.status}/>{req&&<RChip status={req.reqStatus}/>}</div>
          <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:12,color:T.g500}}>{a.reg}</span>
            <button onClick={()=>onSeeOnMap(a.id)} style={{padding:"4px 10px",borderRadius:4,border:`1px solid ${T.blue}`,background:T.blueL,color:T.blue,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>📍 Open on Map</button>
          </div>
        </div>
        <div style={{padding:"14px 18px",display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"8px 20px",fontSize:12.5}}>
          {[["Aircraft",a.make],["Registration",a.reg],["Home Base",a.base],["Current Location",a.loc],["Current Mission",a.mission],["Linked NAA",a.linkedNAA],["Last Update",a.lastUpdate],["Asset Status",a.status],["Availability",a.status==="Available"?"Ready":"In Use"],[req?"Request Status":"—",req?req.reqStatus:"—"]].map(([k,v],j)=><div key={j}><div style={{fontSize:10.5,color:T.g400,fontWeight:550}}>{k}</div><div style={{fontWeight:550,marginTop:2}}>{v}</div></div>)}
        </div>
      </div>;
    })}
  </div>;
}

/* ══ TAB: PERFORMANCE & HISTORY ══ */
export function PerformanceHistory(){
  return <div style={{padding:"20px 32px"}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:20}}>
      <SCard label="Avg Response Time" value="42 min" sub="Request → DM decision" color={T.green}/>
      <SCard label="Requests This Season" value="34" sub="Season 2025/26" color={T.navy}/>
      <SCard label="Approval Rate" value="91%" sub="31 of 34 approved" color={T.green}/>
      <SCard label="Escalation Rate" value="3%" sub="1 of 34 escalated" color={T.orange}/>
      <SCard label="Asset Utilisation" value="68%" sub="Days deployed / available" color={T.blue}/>
      <SCard label="Sign-off Compliance" value="94%" sub="30 of 32 filed" color={T.green}/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:20}}>
      {/* Request volume */}
      <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Request Volume by Month</div>
        <div style={{padding:"14px 18px",display:"flex",alignItems:"flex-end",gap:12,height:140}}>
          {[{m:"Oct",v:2},{m:"Nov",v:5},{m:"Dec",v:8},{m:"Jan",v:7},{m:"Feb",v:6},{m:"Mar",v:6}].map((d,i)=><div key={i} style={{flex:1,textAlign:"center"}}><div style={{height:`${(d.v/8)*100}px`,background:T.blue,borderRadius:"4px 4px 0 0",margin:"0 auto",width:32}}/><div style={{fontSize:12,fontWeight:600,marginTop:4}}>{d.v}</div><div style={{fontSize:10,color:T.g400}}>{d.m}</div></div>)}
        </div>
      </div>
      {/* Outcomes */}
      <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Outcomes Breakdown</div>
        <div style={{padding:"14px 18px"}}>
          {[{label:"Approved (DM)",count:31,pct:91,c:T.green},{label:"Declined",count:2,pct:6,c:T.coral},{label:"Escalated to CCOSC",count:1,pct:3,c:T.orange}].map((o,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<2?`1px solid ${T.g100}`:"none"}}><span style={{width:110,fontSize:12.5}}>{o.label}</span><div style={{flex:1,height:18,background:T.g100,borderRadius:3,overflow:"hidden"}}><div style={{width:`${o.pct}%`,height:"100%",background:o.c,borderRadius:3}}/></div><span style={{width:30,fontSize:12.5,fontWeight:650,textAlign:"right"}}>{o.count}</span></div>)}
        </div>
      </div>
    </div>
    {/* Asset utilisation table */}
    <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",marginBottom:20}}>
      <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Asset Utilisation</div>
      <table style={{width:"100%",borderCollapse:"collapse"}}><thead><tr>
        <th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`}}>Asset</th>
        <th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`}}>Days Available</th>
        <th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`}}>Days Deployed</th>
        <th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`}}>Utilisation</th>
        <th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`}}>Missions</th>
        <th style={{textAlign:"left",padding:"8px 10px",fontWeight:550,color:T.g500,fontSize:10.5,textTransform:"uppercase",letterSpacing:.5,borderBottom:`2px solid ${T.g200}`}}>Status</th>
      </tr></thead>
      <tbody>{[
        {asset:"NLAT",avail:160,deployed:95,util:"59%",missions:12,status:"Available"},
        {asset:"NLEAD",avail:165,deployed:120,util:"73%",missions:18,status:"Deployed"},
        {asset:"NHAWK (SA)",avail:155,deployed:110,util:"71%",missions:15,status:"Deployed"},
        {asset:"NHAWK (QLD)",avail:150,deployed:105,util:"70%",missions:14,status:"Moving"},
        {asset:"NS61N",avail:140,deployed:88,util:"63%",missions:10,status:"Unavailable"},
      ].map((a,i)=><tr key={i}>
        <td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontWeight:700}}>{a.asset}</td>
        <td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`}}>{a.avail}</td>
        <td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontWeight:600}}>{a.deployed}</td>
        <td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`,fontWeight:600}}>{a.util}</td>
        <td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`}}>{a.missions}</td>
        <td style={{padding:"9px 10px",borderBottom:`1px solid ${T.g100}`}}><AChip status={a.status}/></td>
      </tr>)}</tbody></table>
    </div>
    {/* Tracker compliance */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
      <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Tracker Compliance</div>
        <div style={{padding:"14px 18px"}}>
          {[{label:"Tracker Updated within 1hr",pct:88,c:T.green},{label:"Sign-off Filed within 24hrs",pct:94,c:T.green},{label:"DM Decision within SLA",pct:91,c:T.green},{label:"Escalation 3-day Resolution",pct:67,c:T.orange}].map((m,i)=><div key={i} style={{marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:12}}>{m.label}</span><span style={{fontSize:12,fontWeight:650}}>{m.pct}%</span></div>
            <div style={{height:6,background:T.g100,borderRadius:3,overflow:"hidden"}}><div style={{width:`${m.pct}%`,height:"100%",background:m.c,borderRadius:3}}/></div>
          </div>)}
        </div>
      </div>
      <div style={{background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden"}}>
        <div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,fontWeight:650,fontSize:14}}>Outcomes by Jurisdiction</div>
        <div style={{padding:"14px 18px"}}>
          {[{j:"NSW",approved:12,declined:0,escalated:0},{j:"VIC",approved:6,declined:1,escalated:0},{j:"QLD",approved:5,declined:1,escalated:1},{j:"SA",approved:4,declined:0,escalated:0},{j:"WA",approved:3,declined:0,escalated:0},{j:"ACT",approved:1,declined:0,escalated:0}].map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"5px 0",borderBottom:`1px solid ${T.g50}`}}>
            <span style={{width:40,fontWeight:650,fontSize:12.5}}>{r.j}</span>
            <div style={{flex:1,display:"flex",gap:2,height:14}}>
              <div style={{width:`${(r.approved/12)*100}%`,background:T.green,borderRadius:"3px 0 0 3px"}}/>
              {r.declined>0&&<div style={{width:`${(r.declined/12)*100}%`,background:T.coral}}/>}
              {r.escalated>0&&<div style={{width:`${(r.escalated/12)*100}%`,background:T.orange,borderRadius:"0 3px 3px 0"}}/>}
            </div>
            <span style={{fontSize:11,color:T.g500,width:50,textAlign:"right"}}>{r.approved+r.declined+r.escalated} total</span>
          </div>)}
        </div>
      </div>
    </div>
  </div>;
}
