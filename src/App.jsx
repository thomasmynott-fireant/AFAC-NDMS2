import { useState } from 'react'
import NDMSPrototype from './components/ndms-prototype'
import C6Mobile from './components/ndms-c6-mobile'
import 'leaflet/dist/leaflet.css'
import './App.css'

const T={blue:"#0E78C9",blueL:"#E8F4FC",teal:"#1FB6C9",navy:"#23344A",g50:"#F8F9FA",g100:"#F1F3F5",g200:"#E5E8EB",g300:"#CED4DA",g400:"#ADB5BD",g500:"#868E96",g600:"#6C757D",white:"#FFFFFF",green:"#8CC43C",greenL:"#F0F9E6",orange:"#F08A27",orangeL:"#FEF3E6",coral:"#E65A46",coralL:"#FDEEEC"};

function LoginScreen({ onLogin }) {
  const [view, setView] = useState("login"); // login, mfa, register, forgot, resetSent, regDone, terms
  const [email, setEmail] = useState("");
  const [mfaCode, setMfaCode] = useState("");

  const inputStyle = { width:"100%",padding:"11px 14px",border:`1px solid ${T.g300}`,borderRadius:8,fontSize:14,fontFamily:"'DM Sans',sans-serif",boxSizing:"border-box",outline:"none",transition:"border-color .15s" };
  const labelStyle = { fontSize:12.5,fontWeight:600,color:T.g600,display:"block",marginBottom:4 };
  const btnPrimary = { width:"100%",padding:"12px",background:T.blue,color:"#fff",border:"none",borderRadius:8,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit" };
  const btnGhost = { background:"none",border:"none",color:T.blue,fontSize:13,fontWeight:550,cursor:"pointer",fontFamily:"inherit",padding:0 };
  const linkStyle = { color:T.blue,fontSize:12.5,fontWeight:550,cursor:"pointer",textDecoration:"none" };

  return (
    <div style={{ display:"flex",height:"100vh",fontFamily:"'DM Sans',-apple-system,sans-serif",color:T.navy,WebkitFontSmoothing:"antialiased" }}>
      {/* Left panel — branding */}
      <div style={{ width:"50%",background:`linear-gradient(135deg, ${T.navy} 0%, #2c4a6a 50%, #1a3a5c 100%)`,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:60 }}>
        <div style={{ color:"#fff",fontSize:42,fontWeight:800,letterSpacing:-1,marginBottom:8 }}>NDMS</div>
        <div style={{ color:"rgba(255,255,255,.55)",fontSize:15,textAlign:"center",maxWidth:360,lineHeight:1.6,marginBottom:32 }}>
          National Deployment Management System
        </div>
        <div style={{ display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center" }}>
          {["Personnel Registry","Request Management","Deployment Ops","Aviation Assets","Financial Reconciliation","Mobile Companion"].map(f=>(
            <span key={f} style={{ padding:"5px 14px",borderRadius:20,background:"rgba(255,255,255,.08)",border:"1px solid rgba(255,255,255,.12)",color:"rgba(255,255,255,.6)",fontSize:12,fontWeight:500 }}>{f}</span>
          ))}
        </div>
        <div style={{ marginTop:48,color:"rgba(255,255,255,.3)",fontSize:11 }}>
          Powered by Fireant · Built for AFAC NRSC
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ width:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:T.g50 }}>
        <div style={{ width:380 }}>

          {/* ── LOGIN ── */}
          {view === "login" && <>
            <div style={{ fontSize:24,fontWeight:700,marginBottom:4 }}>Sign in</div>
            <div style={{ fontSize:13,color:T.g500,marginBottom:24 }}>Access the NDMS platform with your registered credentials.</div>
            <div style={{ marginBottom:14 }}>
              <label style={labelStyle}>Email address</label>
              <input style={inputStyle} type="email" placeholder="name@agency.gov.au" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div style={{ marginBottom:8 }}>
              <label style={labelStyle}>Password</label>
              <input style={inputStyle} type="password" placeholder="••••••••••" />
            </div>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <label style={{ display:"flex",alignItems:"center",gap:6,fontSize:12.5,color:T.g600,cursor:"pointer" }}>
                <input type="checkbox" style={{ accentColor:T.blue }} /> Remember me
              </label>
              <span style={linkStyle} onClick={()=>setView("forgot")}>Forgot password?</span>
            </div>
            <button style={btnPrimary} onClick={()=>setView("mfa")}>Sign In</button>
            <div style={{ textAlign:"center",marginTop:16,fontSize:13,color:T.g500 }}>
              Don't have an account? <span style={linkStyle} onClick={()=>setView("terms")}>Register here</span>
            </div>
          </>}

          {/* ── MFA ── */}
          {view === "mfa" && <>
            <div style={{ fontSize:24,fontWeight:700,marginBottom:4 }}>Verify your identity</div>
            <div style={{ fontSize:13,color:T.g500,marginBottom:24 }}>A 6-digit verification code has been sent to your registered device.</div>
            <div style={{ padding:"14px 16px",background:T.blueL,borderRadius:8,marginBottom:20,fontSize:12.5,color:T.blue,fontWeight:550 }}>
              Multi-factor authentication is required for all NDMS accounts to protect sensitive deployment and personal data.
            </div>
            <div style={{ marginBottom:20 }}>
              <label style={labelStyle}>Verification code</label>
              <div style={{ display:"flex",gap:8 }}>
                {[0,1,2,3,4,5].map(i=>(
                  <input key={i} style={{ ...inputStyle,width:44,textAlign:"center",fontSize:20,fontWeight:700,fontFamily:"'DM Mono',monospace",padding:"10px 0",letterSpacing:0 }}
                    maxLength={1} value={mfaCode[i]||""} onChange={e=>{const v=[...mfaCode];v[i]=e.target.value;setMfaCode(v.join(""));}} />
                ))}
              </div>
            </div>
            <button style={btnPrimary} onClick={onLogin}>Verify & Continue</button>
            <div style={{ textAlign:"center",marginTop:14 }}>
              <button style={btnGhost} onClick={()=>setView("login")}>← Back to sign in</button>
            </div>
            <div style={{ textAlign:"center",marginTop:8,fontSize:12,color:T.g400 }}>
              Didn't receive a code? <span style={linkStyle}>Resend</span> · <span style={linkStyle}>Use backup code</span>
            </div>
          </>}

          {/* ── TERMS (before registration) ── */}
          {view === "terms" && <>
            <div style={{ fontSize:24,fontWeight:700,marginBottom:4 }}>Terms of Use</div>
            <div style={{ fontSize:13,color:T.g500,marginBottom:16 }}>Please review and accept the following before creating your account.</div>
            <div style={{ maxHeight:260,overflowY:"auto",padding:"14px 16px",background:"#fff",border:`1px solid ${T.g200}`,borderRadius:8,marginBottom:16,fontSize:12,lineHeight:1.7,color:T.g600 }}>
              <div style={{ fontWeight:700,color:T.navy,marginBottom:6 }}>NDMS Platform Terms of Use</div>
              <p>By registering for and using the National Deployment Management System (NDMS), you agree to comply with the AFAC National Resource Sharing Centre policies, the Australian Privacy Act 1988, and applicable state/territory privacy legislation.</p>
              <p>Your personal information will be collected, stored, and used solely for the purposes of interstate and international deployment management, resource coordination, and related operational activities.</p>
              <div style={{ fontWeight:700,color:T.navy,marginTop:12,marginBottom:6 }}>Privacy Statement</div>
              <p>Data is hosted on Australian-based servers. Access is restricted to authorised personnel through role-based access control. All actions are audit-logged. Sensitive data is encrypted at rest (AES-256) and in transit (TLS 1.3).</p>
              <p>You may request access to, correction of, or deletion of your personal data by contacting the NRSC Privacy Officer.</p>
            </div>
            <label style={{ display:"flex",alignItems:"flex-start",gap:8,marginBottom:16,cursor:"pointer" }}>
              <input type="checkbox" defaultChecked style={{ accentColor:T.blue,marginTop:2 }} />
              <span style={{ fontSize:12.5,color:T.g600,lineHeight:1.5 }}>I have read and accept the NDMS Terms of Use and Privacy Statement</span>
            </label>
            <button style={btnPrimary} onClick={()=>setView("register")}>Accept & Continue to Registration</button>
            <div style={{ textAlign:"center",marginTop:12 }}>
              <button style={btnGhost} onClick={()=>setView("login")}>← Back to sign in</button>
            </div>
          </>}

          {/* ── REGISTER ── */}
          {view === "register" && <>
            <div style={{ fontSize:24,fontWeight:700,marginBottom:4 }}>Create your account</div>
            <div style={{ fontSize:13,color:T.g500,marginBottom:20 }}>Register as a new NDMS team member. Your account will require agency endorsement before activation.</div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
              <div><label style={labelStyle}>First name</label><input style={inputStyle} placeholder="First name" /></div>
              <div><label style={labelStyle}>Last name</label><input style={inputStyle} placeholder="Last name" /></div>
            </div>
            <div style={{ marginBottom:12 }}><label style={labelStyle}>Email address</label><input style={inputStyle} type="email" placeholder="name@agency.gov.au" /></div>
            <div style={{ marginBottom:12 }}><label style={labelStyle}>Agency</label>
              <select style={{ ...inputStyle, appearance:"auto" }}>
                <option>Select your agency…</option>
                {["QLD QFES","NSW RFS","VIC CFA","SA CFS","TAS TFS","WA DFES","ACT ESA","NT NTFRS","NZ FENZ"].map(a=><option key={a}>{a}</option>)}
              </select>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
              <div><label style={labelStyle}>Password</label><input style={inputStyle} type="password" placeholder="Min 12 characters" /></div>
              <div><label style={labelStyle}>Confirm password</label><input style={inputStyle} type="password" placeholder="Confirm" /></div>
            </div>
            <div style={{ padding:"10px 14px",background:T.blueL,borderRadius:8,marginBottom:16,fontSize:11.5,color:T.blue }}>
              After registration, your account will be reviewed by your agency administrator. You will be notified by email when your account is endorsed.
            </div>
            <button style={btnPrimary} onClick={()=>setView("regDone")}>Create Account</button>
            <div style={{ textAlign:"center",marginTop:12 }}>
              <button style={btnGhost} onClick={()=>setView("login")}>← Already have an account? Sign in</button>
            </div>
          </>}

          {/* ── REGISTRATION COMPLETE ── */}
          {view === "regDone" && <>
            <div style={{ textAlign:"center",padding:"20px 0" }}>
              <div style={{ width:64,height:64,borderRadius:"50%",background:T.greenL,color:T.green,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,margin:"0 auto 16px" }}>✓</div>
              <div style={{ fontSize:22,fontWeight:700,marginBottom:6 }}>Registration Submitted</div>
              <div style={{ fontSize:13,color:T.g500,marginBottom:20,lineHeight:1.6 }}>
                Your account has been created and is pending agency endorsement. You will receive an email when your account is ready.
              </div>
              <div style={{ padding:"12px 16px",background:T.g50,borderRadius:8,border:`1px solid ${T.g200}`,marginBottom:20,textAlign:"left" }}>
                <div style={{ fontSize:10.5,fontWeight:600,color:T.g400,textTransform:"uppercase",letterSpacing:.5,marginBottom:8 }}>What happens next</div>
                {[
                  { step:"1", text:"Agency review", desc:"Your agency administrator will review your registration" },
                  { step:"2", text:"NRSC verification", desc:"NRSC will verify your details and approve your account" },
                  { step:"3", text:"Account activated", desc:"You'll receive login credentials and can set up MFA" },
                ].map((s,i) => (
                  <div key={i} style={{ display:"flex",gap:10,padding:"6px 0" }}>
                    <div style={{ width:22,height:22,borderRadius:"50%",background:T.blue,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0 }}>{s.step}</div>
                    <div><div style={{ fontSize:12.5,fontWeight:600 }}>{s.text}</div><div style={{ fontSize:11.5,color:T.g500 }}>{s.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <button style={btnPrimary} onClick={()=>setView("login")}>Return to Sign In</button>
          </>}

          {/* ── FORGOT PASSWORD ── */}
          {view === "forgot" && <>
            <div style={{ fontSize:24,fontWeight:700,marginBottom:4 }}>Reset password</div>
            <div style={{ fontSize:13,color:T.g500,marginBottom:20 }}>Enter your registered email address and we'll send you a password reset link.</div>
            <div style={{ marginBottom:16 }}>
              <label style={labelStyle}>Email address</label>
              <input style={inputStyle} type="email" placeholder="name@agency.gov.au" />
            </div>
            <button style={btnPrimary} onClick={()=>setView("resetSent")}>Send Reset Link</button>
            <div style={{ textAlign:"center",marginTop:14 }}>
              <button style={btnGhost} onClick={()=>setView("login")}>← Back to sign in</button>
            </div>
          </>}

          {/* ── RESET SENT ── */}
          {view === "resetSent" && <>
            <div style={{ textAlign:"center",padding:"20px 0" }}>
              <div style={{ width:64,height:64,borderRadius:"50%",background:T.blueL,color:T.blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 16px" }}>✉</div>
              <div style={{ fontSize:22,fontWeight:700,marginBottom:6 }}>Check your email</div>
              <div style={{ fontSize:13,color:T.g500,marginBottom:20,lineHeight:1.6 }}>
                If an account exists for that email, a password reset link has been sent. The link will expire in 30 minutes.
              </div>
            </div>
            <button style={btnPrimary} onClick={()=>setView("login")}>Return to Sign In</button>
          </>}

        </div>
      </div>
    </div>
  );
}

function App() {
  const [mobileMode, setMobileMode] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />
  }

  if (mobileMode) {
    return <C6Mobile onBackToDesktop={() => setMobileMode(false)} />
  }

  return <NDMSPrototype onOpenMobile={() => setMobileMode(true)} />
}

export default App

