import { useState } from "react";
import { C3LiveBoard, C3PersonDetail, C3IIIWorkflow, C3RoleChange, C3FatigueLogs, C3Rotation, C4SitRep } from "./ndms-stage2";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const TabBar=({tabs,active,onChange})=><div style={{display:"flex",gap:0,borderBottom:`2px solid ${T.g200}`,marginBottom:0}}>{tabs.map(t=><button key={t} onClick={()=>onChange(t)} style={{padding:"10px 20px",fontSize:13,fontWeight:active===t?650:500,color:active===t?T.blue:T.g500,borderBottom:active===t?`2px solid ${T.blue}`:"2px solid transparent",marginBottom:-2,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>{t}</button>)}</div>;

/* ═══════════════════════════════════════════════
   DEPLOYMENTS WORKSPACE — tabbed module
   Consolidates live board, personnel, welfare,
   role changes, fatigue, rotations, sitreps
   ═══════════════════════════════════════════════ */
export default function DeploymentsWorkspace() {
  const tabs = ["Overview", "Personnel", "Welfare / I-I-I", "Role Changes", "Fatigue & Contacts", "Rotations", "SitReps"];
  const [tab, setTab] = useState("Overview");

  return <div>
    <div style={{ padding: "24px 32px 0" }}>
      <div style={{ marginBottom: 4 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Deployments</h2>
        <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>Live operations — personnel tracking, welfare, role changes, and situational reporting</p>
      </div>
      <TabBar tabs={tabs} active={tab} onChange={setTab} />
    </div>
    <div>
      {tab === "Overview" && <C3LiveBoard />}
      {tab === "Personnel" && <C3PersonDetail />}
      {tab === "Welfare / I-I-I" && <C3IIIWorkflow />}
      {tab === "Role Changes" && <C3RoleChange />}
      {tab === "Fatigue & Contacts" && <C3FatigueLogs />}
      {tab === "Rotations" && <C3Rotation />}
      {tab === "SitReps" && <C4SitRep />}
    </div>
  </div>;
}
