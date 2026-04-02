import { useState } from "react";
import { C4AgencyDash, C4NationalDash, C4StateDash, C4ReportBuilder, C4SitRep } from "./ndms-stage2";

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",tealL:"#E6F8FA",coral:"#E65A46",coralL:"#FDEEEC",orange:"#F08A27",orangeL:"#FEF3E6",green:"#8CC43C",greenL:"#F0F9E6",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",g700:"#495057",white:"#FFFFFF"};
const TabBar=({tabs,active,onChange})=><div style={{display:"flex",gap:0,borderBottom:`2px solid ${T.g200}`,marginBottom:0}}>{tabs.map(t=><button key={t} onClick={()=>onChange(t)} style={{padding:"10px 20px",fontSize:13,fontWeight:active===t?650:500,color:active===t?T.blue:T.g500,borderBottom:active===t?`2px solid ${T.blue}`:"2px solid transparent",marginBottom:-2,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit"}}>{t}</button>)}</div>;

/* ═══════════════════════════════════════════════
   REPORTING WORKSPACE — tabbed module
   Consolidates dashboards, report builder,
   sitreps, and performance
   scope: "national" | "agency" | "state" | "executive"
   ═══════════════════════════════════════════════ */
export default function ReportingWorkspace({ scope = "national" }) {
  const tabs = ["Dashboards", "Report Builder", "SitReps", "Performance"];
  const defaultTab = scope === "agency" ? "Dashboards" : "Dashboards";
  const [tab, setTab] = useState(defaultTab);

  const DashComponent = scope === "agency" ? C4AgencyDash : scope === "state" ? C4StateDash : C4NationalDash;

  return <div>
    <div style={{ padding: "24px 32px 0" }}>
      <div style={{ marginBottom: 4 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Reporting</h2>
        <p style={{ color: T.g500, fontSize: 13, margin: "4px 0 0" }}>
          {scope === "agency" ? "Agency dashboards, reports, and situational awareness" : scope === "state" ? "State/territory oversight and trend reporting" : "National intelligence, dashboards, and reporting"}
        </p>
      </div>
      <TabBar tabs={tabs} active={tab} onChange={setTab} />
    </div>
    <div>
      {tab === "Dashboards" && <DashComponent />}
      {tab === "Report Builder" && <C4ReportBuilder />}
      {tab === "SitReps" && <C4SitRep />}
      {tab === "Performance" && <PerformanceTab />}
    </div>
  </div>;
}

function PerformanceTab() {
  const Card=({title,right,children,s})=><div style={{background:T.white,border:`1px solid ${T.g200}`,borderRadius:8,overflow:"hidden",...s}}>{title&&<div style={{padding:"13px 18px",borderBottom:`1px solid ${T.g200}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}><span style={{fontSize:14,fontWeight:650}}>{title}</span>{right}</div>}<div style={{padding:"14px 18px"}}>{children}</div></div>;
  const Chip=({color,children})=>{const c={blue:{bg:T.blueL,fg:T.blue},green:{bg:T.greenL,fg:"#5a8a1f"},orange:{bg:T.orangeL,fg:"#c06e15"},coral:{bg:T.coralL,fg:T.coral}}[color]||{bg:T.g100,fg:T.g600};return<span style={{display:"inline-flex",alignItems:"center",gap:4,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:550,background:c.bg,color:c.fg}}><span style={{width:6,height:6,borderRadius:"50%",background:c.fg}}/>{children}</span>};

  return <div style={{ padding: "20px 32px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
      {[
        { label: "Season Deployments", value: "14", trend: "+3 vs last season", c: T.blue },
        { label: "Avg Mobilisation Time", value: "38h", trend: "↓12% improvement", c: T.green },
        { label: "Personnel Deployed", value: "247", trend: "Across 6 jurisdictions", c: T.navy },
        { label: "Claims Processed", value: "$1.2M", trend: "94% within SLA", c: T.orange },
      ].map((m, i) => <div key={i} style={{ background: T.white, border: `1px solid ${T.g200}`, borderRadius: 8, padding: "16px 20px" }}>
        <div style={{ fontSize: 11, color: T.g500, marginBottom: 6 }}>{m.label}</div>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 3 }}>{m.value}</div>
        <div style={{ fontSize: 11, fontWeight: 550, color: m.c }}>{m.trend}</div>
      </div>)}
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Card title="Deployment Trend — Season 2025/26">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 8 }}>
          {[{ w: "Oct", v: 12 }, { w: "Nov", v: 28 }, { w: "Dec", v: 45 }, { w: "Jan", v: 82 }, { w: "Feb", v: 120 }, { w: "Mar", v: 247 }, { w: "Apr", v: 0 }, { w: "May", v: 0 }].map((w, i) => <div key={i} style={{ textAlign: "center" }}>
            <div style={{ height: 80, display: "flex", alignItems: "flex-end", justifyContent: "center", marginBottom: 4 }}><div style={{ width: 24, height: `${Math.max((w.v / 247) * 70, 2)}px`, background: w.v > 0 ? T.blue : T.g200, borderRadius: "3px 3px 0 0" }} /></div>
            <div style={{ fontSize: 11, fontWeight: w.v > 0 ? 600 : 400 }}>{w.v || "—"}</div>
            <div style={{ fontSize: 10, color: T.g400 }}>{w.w}</div>
          </div>)}
        </div>
      </Card>
      <Card title="Key Performance Indicators">
        {[
          { kpi: "Request-to-deployment time", target: "< 48h", actual: "38h", status: "Met", c: "green" },
          { kpi: "Contingent fill rate", target: "> 90%", actual: "94%", status: "Met", c: "green" },
          { kpi: "Claims within SLA", target: "> 85%", actual: "94%", status: "Met", c: "green" },
          { kpi: "Welfare contact compliance", target: "100%", actual: "92%", status: "Near", c: "orange" },
          { kpi: "I/I/I report time", target: "< 4h", actual: "2.5h", status: "Met", c: "green" },
        ].map((k, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 4 ? `1px solid ${T.g100}` : "none" }}>
          <div style={{ flex: 1, fontSize: 13 }}>{k.kpi}</div>
          <span style={{ fontSize: 12, color: T.g500, width: 50 }}>{k.target}</span>
          <span style={{ fontSize: 12, fontWeight: 650, width: 40, textAlign: "right" }}>{k.actual}</span>
          <Chip color={k.c}>{k.status}</Chip>
        </div>)}
      </Card>
    </div>
  </div>;
}
