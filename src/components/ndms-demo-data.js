/* ═══════════════════════════════════════════════════════════════
   NDMS SHARED DEMO DATA — Northern Rivers Flood Response
   Canonical dataset for the AFAC tender demonstration.
   All modules reference this file to ensure data coherence.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Flagship Scenario ─── */
export const SCENARIO = {
  name: "Northern Rivers Flood Response",
  shortName: "Northern Rivers",
  incident: "Northern Rivers Flood Response",
  geography: "Lismore / Northern Rivers, NSW",
  location: "Lismore, NSW",
  type: "Interstate",
  season: "2025/26",
  week: 22,
  date: "30 Mar 2026",
  startDate: "14 Mar 2026",
  estEnd: "14 Apr 2026",
  phase: "Response & Recovery",
  deployed: 68,
  activeRequests: 12,
  activeContingents: 8,
  intlScenario: {
    name: "Canada 2025 Wildfire Season",
    shortName: "Canada 2025",
    location: "Kamloops, BC",
    deployed: 33,
  },
};

/* ─── Shared Request IDs ─── */
export const REQUESTS = [
  { id: "2025_26_007NSW_QLD001", type: "Interstate", from: "NSW", to: "QLD", incident: "Northern Rivers Flood Response", status: "Deployed", roles: 22, filled: 22, date: "14 Mar 2026", urgency: "Urgent", c: "green" },
  { id: "2025_26_INT_CAN_001", type: "International", from: "Canada", to: "Multi", incident: "Canada 2025 Wildfire Season", status: "Deployed", roles: 33, filled: 33, date: "1 Feb 2026", urgency: "Planned", c: "green" },
  { id: "2025_26_008NSW_VIC001", type: "Interstate", from: "NSW", to: "VIC", incident: "Northern Rivers Flood Response", status: "Pending Nomination", roles: 12, filled: 0, date: "28 Mar 2026", urgency: "Urgent", c: "orange" },
  { id: "2025_26_009NSW_SA001", type: "Interstate", from: "NSW", to: "SA", incident: "Northern Rivers Flood Response", status: "Draft", roles: 6, filled: 0, date: "30 Mar 2026", urgency: "Non-Urgent", c: "blue" },
  { id: "2025_26_010NSW_WA001", type: "Interstate", from: "NSW", to: "WA", incident: "Northern Rivers Flood Response", status: "Cancelled", roles: 8, filled: 0, date: "10 Jan 2026", urgency: "Urgent", c: "gray" },
];

/* ─── Deployed Personnel ─── */
export const DEPLOYED = [
  { name: "Daniel Thornton", init: "DT", c: "#0E78C9", role: "Crew Leader", agency: "QLD QFES", jur: "QLD", contingent: "CREW2", deployment: "Northern Rivers", location: "Lismore, NSW", status: "Working", day: 8, country: "AU" },
  { name: "Rachel Kimura", init: "RK", c: "#1FB6C9", role: "Deployment Manager", agency: "VIC CFA", jur: "VIC", contingent: "IMT1", deployment: "Northern Rivers", location: "Lismore, NSW", status: "Working", day: 12, country: "AU" },
  { name: "Tom Briggs", init: "TB", c: "#F08A27", role: "Flood Ops", agency: "QLD QFES", jur: "QLD", contingent: "CREW2", deployment: "Northern Rivers", location: "Lismore, NSW", status: "Resting", day: 8, country: "AU" },
  { name: "Peter Nguyễn", init: "PN", c: "#8CC43C", role: "INLO", agency: "VIC CFA", jur: "VIC", contingent: "INLO1", deployment: "Canada 2025", location: "Kamloops, BC", status: "Working", day: 18, country: "CA" },
  { name: "Alice Nguyễn", init: "AN", c: "#8CC43C", role: "INLO Admin", agency: "VIC CFA", jur: "VIC", contingent: "INLO1", deployment: "Canada 2025", location: "Kamloops, BC", status: "Working", day: 18, country: "CA" },
  { name: "David Kang", init: "DK", c: "#E65A46", role: "IC Support", agency: "SA CFS", jur: "SA", contingent: "IMT1", deployment: "Canada 2025", location: "Kamloops, BC", status: "Working", day: 18, country: "CA" },
  { name: "Mark Sullivan", init: "MS", c: "#23344A", role: "Crew Leader", agency: "SA CFS", jur: "SA", contingent: "CREW1", deployment: "Canada 2025", location: "Kamloops, BC", status: "Resting", day: 18, country: "CA" },
  { name: "Peter O'Brien", init: "PO", c: "#868E96", role: "Safety Officer", agency: "TAS TFS", jur: "TAS", contingent: "IMT1", deployment: "Northern Rivers", location: "Lismore, NSW", status: "Demobilising", day: 14, country: "AU" },
  { name: "Chris Adams", init: "CA", c: "#1FB6C9", role: "Crew Leader", agency: "SA SASES", jur: "SA", contingent: "CREW2", deployment: "Canada 2025", location: "Kamloops, BC", status: "Working", day: 18, country: "CA" },
  { name: "Emma Walsh", init: "EW", c: "#E65A46", role: "Firefighter", agency: "NZ FENZ", jur: "NZ", contingent: "CREW1", deployment: "Canada 2025", location: "Kamloops, BC", status: "Travel", day: 18, country: "CA" },
  { name: "Karen Wong", init: "KW", c: "#F08A27", role: "Flood Ops", agency: "QLD QFES", jur: "QLD", contingent: "CREW2", deployment: "Northern Rivers", location: "Lismore, NSW", status: "Working", day: 8, country: "AU" },
  { name: "Ben Taylor", init: "BT", c: "#0E78C9", role: "Flood Ops", agency: "VIC CFA", jur: "VIC", contingent: "CREW2", deployment: "Northern Rivers", location: "Lismore, NSW", status: "Working", day: 8, country: "AU" },
];

/* ─── Contingent Groups ─── */
export const CONTINGENTS = [
  { group: "IMT1", type: "IMT & Overhead", request: "Northern Rivers", count: 3, status: "Active", day: "12–14", c: "green" },
  { group: "CREW1", type: "Flood Ops", request: "Northern Rivers", count: 6, status: "Active", day: "8", c: "green" },
  { group: "CREW2", type: "Flood Ops", request: "Northern Rivers", count: 6, status: "Active", day: "8", c: "green" },
  { group: "Overhead", type: "Safety, Admin, DM", request: "Northern Rivers", count: 4, status: "Active", day: "8–12", c: "green" },
];

/* ─── Orders ─── */
export const ORDERS = [
  { id: "ORD-2025-0047", request: "2025_26_007NSW_QLD001", subOrders: 4, filled: "22/22", status: "Complete", c: "green" },
  { id: "ORD-2025-0031", request: "2025_26_INT_CAN_001", subOrders: 6, filled: "33/33", status: "Complete", c: "green" },
  { id: "ORD-2025-0052", request: "2025_26_008NSW_VIC001", subOrders: 2, filled: "0/12", status: "Awaiting Nomination", c: "orange" },
];

/* ─── Manifests ─── */
export const MANIFESTS = [
  { id: "MAN-0047-C1", route: "BNE → LIS", flight: "REX1712", date: "22 Mar", pax: 6, status: "Arrived", c: "green" },
  { id: "MAN-0047-C2", route: "MEL → LIS", flight: "REX1804", date: "22 Mar", pax: 6, status: "Arrived", c: "green" },
  { id: "MAN-0047-R1", route: "LIS → BNE", flight: "REX1713", date: "1 Apr", pax: 8, status: "Booked", c: "blue" },
  { id: "MAN-0047-R2", route: "LIS → MEL", flight: "QF2164", date: "1 Apr", pax: 6, status: "Pending", c: "orange" },
];

/* ─── Movement Board ─── */
export const MOVEMENTS = [
  { name: "Sam O'Connor", dir: "Inbound", route: "HBA → LIS", date: "31 Mar", status: "Confirmed", c: "green" },
  { name: "Peter O'Brien", dir: "Outbound", route: "LIS → SYD", date: "31 Mar", status: "Booked", c: "blue" },
  { name: "Jake Williams", dir: "Inbound", route: "MEL → LIS", date: "2 Apr", status: "Pending", c: "orange" },
  { name: "Rachel Kimura", dir: "Outbound", route: "LIS → MEL", date: "1 Apr", status: "Gap — no replacement", c: "coral" },
  { name: "Karen Wong", dir: "Outbound", route: "LIS → BNE", date: "1 Apr", status: "Booked", c: "blue" },
];

/* ─── Claims ─── */
export const CLAIMS = [
  { id: "CLM-2025-0891", person: "Daniel Thornton", init: "DT", c: "#0E78C9", cat: "Meal", date: "29 Mar", amt: "$52.40", cur: "AUD", deploy: "Northern Rivers", status: "Pending", color: "orange", receipt: true },
  { id: "CLM-2025-0885", person: "Daniel Thornton", init: "DT", c: "#0E78C9", cat: "Transport", date: "28 Mar", amt: "$34.00", cur: "AUD", deploy: "Northern Rivers", status: "Pending", color: "orange", receipt: true },
  { id: "CLM-2025-0878", person: "Daniel Thornton", init: "DT", c: "#0E78C9", cat: "Sundries", date: "27 Mar", amt: "$28.90", cur: "AUD", deploy: "Northern Rivers", status: "Pending", color: "orange", receipt: true },
  { id: "CLM-2025-0862", person: "Daniel Thornton", init: "DT", c: "#0E78C9", cat: "Meal", date: "25 Mar", amt: "$47.50", cur: "AUD", deploy: "Northern Rivers", status: "Approved", color: "green", receipt: true },
  { id: "CLM-2025-0855", person: "Daniel Thornton", init: "DT", c: "#0E78C9", cat: "Meal", date: "24 Mar", amt: "$68.00", cur: "AUD", deploy: "Northern Rivers", status: "Approved", color: "green", receipt: true },
  { id: "CLM-2025-0841", person: "Daniel Thornton", init: "DT", c: "#0E78C9", cat: "Transport", date: "23 Mar", amt: "$124.00", cur: "AUD", deploy: "Northern Rivers", status: "Approved", color: "green", receipt: true },
  { id: "CLM-2025-0838", person: "Daniel Thornton", init: "DT", c: "#0E78C9", cat: "Meal", date: "23 Mar", amt: "$73.00", cur: "AUD", deploy: "Northern Rivers", status: "Approved", color: "green", receipt: true },
  { id: "CLM-2025-0820", person: "Daniel Thornton", init: "DT", c: "#0E78C9", cat: "Accommodation", date: "22 Mar", amt: "$65.00", cur: "AUD", deploy: "Northern Rivers", status: "Rejected", color: "coral", receipt: false },
];

/* ─── Aviation Assets ─── */
export const AVIATION_ASSETS = [
  { asset: "NLAT", type: "C-130J Hercules", status: "Available", loc: "Richmond NSW", c: "green" },
  { asset: "NLEAD", type: "King Air 350", status: "Deployed", loc: "Lismore NSW", c: "blue" },
  { asset: "NHAWK (SA)", type: "Black Hawk", status: "Deployed", loc: "Lismore NSW", c: "blue" },
  { asset: "NHAWK (QLD)", type: "Black Hawk", status: "Repositioning", loc: "In transit", c: "orange" },
  { asset: "NS61N", type: "Sikorsky S-61N", status: "Maintenance", loc: "Bankstown NSW", c: "gray" },
];

/* ─── Approval Steps (shared grammar) ─── */
export const REQUEST_APPROVAL_STEPS = [
  { label: "Request Created", actor: "NSW SES State Ops", timestamp: "14 Mar 09:15", done: true },
  { label: "NRSC Validated", actor: "J. Walsh (NRSC)", timestamp: "14 Mar 11:00", done: true, notes: "Meets threshold for interstate deployment" },
  { label: "RMG Endorsed", actor: "NSW RMG", timestamp: "15 Mar 08:30", done: true },
  { label: "Agencies Canvassed", actor: "NRSC Ops", timestamp: "15 Mar 10:00", done: true },
  { label: "Nominations Received", actor: "QLD QFES, VIC CFA, SA CFS, TAS TFS", timestamp: "16 Mar 14:00", done: true },
  { label: "Deployment Approved", actor: "J. Walsh (NRSC)", timestamp: "18 Mar 09:00", done: true },
  { label: "Contingent Mobilised", actor: "System", timestamp: "22 Mar 06:00", done: true },
  { label: "In Field", actor: "—", timestamp: "22 Mar 14:00", active: true, nextAction: "Rotation 1 commencing 31 Mar" },
];

/* ─── Agency Nominations ─── */
export const AGENCY_NOMINATIONS = [
  { agency: "QLD QFES", requested: 8, confirmed: 8, status: "Filled", c: "green", personnel: ["D. Thornton (Crew Leader)", "T. Briggs (Flood Ops)", "K. Wong (Flood Ops)", "+5 others"] },
  { agency: "VIC CFA", requested: 6, confirmed: 6, status: "Filled", c: "green", personnel: ["R. Kimura (DM)", "B. Taylor (Flood Ops)", "+4 others"] },
  { agency: "SA CFS", requested: 4, confirmed: 4, status: "Filled", c: "green", personnel: ["Safety Officer", "Admin Support", "+2 others"] },
  { agency: "TAS TFS", requested: 2, confirmed: 2, status: "Filled", c: "green", personnel: ["P. O'Brien (Safety)", "+1 other"] },
  { agency: "WA DFES", requested: 2, confirmed: 0, status: "Declined", c: "coral", reason: "No available personnel due to local season commitments" },
];

/* ─── Roles for NDMS ─── */
export const ROLE_DATA = [
  { id: "nrsc", label: "NRSC Operations", name: "Jessica Walsh", agency: "NRSC", initials: "JW", sysRole: "NRSC Operations" },
  { id: "team", label: "Team Member", name: "Daniel Thornton", agency: "QLD QFES", initials: "DT", sysRole: "Team Member", deployRole: "Crew Leader — Northern Rivers" },
  { id: "agency", label: "Agency Staff", name: "Sarah Patel", agency: "QLD QFES", initials: "SP", sysRole: "Agency Administrator" },
  { id: "dmt", label: "DMT", name: "Rachel Kimura", agency: "VIC CFA", initials: "RK", sysRole: "Team Member", deployRole: "Deployment Manager — Northern Rivers" },
  { id: "airdesk", label: "Air Desk", name: "Air Desk Operator", agency: "AFAC NRSC", initials: "AD", sysRole: "Aviation Operations" },
  { id: "inlo", label: "INLO / AREP", name: "Mark Sullivan", agency: "SA CFS", initials: "MS", sysRole: "Team Member", deployRole: "AREP — Northern Rivers" },
  { id: "rmg", label: "RMG / State", name: "State Coordinator", agency: "NSW", initials: "SC", sysRole: "RMG Member" },
  { id: "exec", label: "Executive", name: "CCOSC Delegate", agency: "AFAC", initials: "CC", sysRole: "Executive Oversight" },
];

/* ─── Status colour mapping ─── */
export const statusColor = (s) => ({
  Working: "blue", Resting: "teal", Travel: "orange", Briefing: "green",
  Demobilising: "gray", "Medical/Other": "coral", "In Field": "green",
  "Out of Country": "orange", Mobilising: "blue",
}[s] || "gray");

/* ─── Jurisdiction metrics ─── */
export const JURISDICTION_METRICS = [
  { code: "NSW", deployed: 0, requests: 1, note: "Requesting jurisdiction", color: "blue" },
  { code: "QLD", deployed: 22, requests: 2, note: "Primary contributor", color: "green" },
  { code: "VIC", deployed: 18, requests: 1, note: "", color: "blue" },
  { code: "SA", deployed: 10, requests: 1, note: "", color: "blue" },
  { code: "TAS", deployed: 8, requests: 1, note: "", color: "teal" },
  { code: "INT'L", deployed: 33, requests: 1, note: "Canada 2025", color: "coral" },
];
