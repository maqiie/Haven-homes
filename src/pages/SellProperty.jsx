import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

const FORMSPREE = 'https://formspree.io/f/YOUR_FORM_ID'

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)

const STEPS = [
  { n:'01', title:'Free Valuation',        desc:'We visit your property, assess its condition, location, and comparable sales, then provide a detailed market valuation report — completely free of charge.', icon:'📋' },
  { n:'02', title:'Professional Marketing', desc:'Our team arranges photography, floor plans, and a compelling listing. Your property goes live on our website, social platforms, and to our private buyer database.', icon:'📸' },
  { n:'03', title:'Qualified Viewings',    desc:'We pre-screen every prospective buyer before a viewing — saving you time and ensuring only serious, financially-qualified buyers walk through your door.', icon:'🔑' },
  { n:'04', title:'Offer Management',      desc:'We handle all negotiations on your behalf, advising on every offer. Our goal is to secure the best price in the best timeline.', icon:'🤝' },
  { n:'05', title:'Legal & Completion',    desc:'Our conveyancing partners handle all paperwork, title transfers, and compliance — keeping your sale clean, fast, and legally watertight.', icon:'⚖️' },
  { n:'06', title:'Handover & Payment',    desc:'Once all conditions are met, we coordinate a smooth handover and ensure your funds are released promptly. Done.', icon:'✓' },
]

const REASONS = [
  { title:'Maximum Price, Faster',  desc:'Our pricing strategy and buyer network consistently achieve above-average sale prices with shorter time-on-market than the industry median.' },
  { title:'Serious Buyers Only',    desc:'Every buyer in our database has been financially pre-qualified. No time wasters, no collapsed deals late in the process.' },
  { title:'Off-Market Option',      desc:'Want to sell discreetly? We can match your property directly to our private buyer list — no public listing required.' },
  { title:'Transparent Fees',       desc:'One agreed commission. No hidden marketing levies, no admin charges, no surprises. What we quote is what you pay.' },
  { title:'Diaspora Support',       desc:'Selling from abroad? We manage the entire process remotely — valuations, viewings, offers, and legal completion — while you stay where you are.' },
  { title:'Full Legal Support',     desc:'We coordinate with trusted property lawyers for title searches, stamp duty, and clean transfer — protecting you at every stage.' },
]

const PROPERTY_TYPES = ['Apartment','Bungalow','Townhouse','Villa','Land','Commercial Property']
const LOCATIONS      = ['Westlands','Kilimani','Lavington','Kileleshwa','Runda','Karen','Langata','Other']
const TIMELINES      = ['As soon as possible','Within 3 months','3–6 months','6–12 months','Just exploring']

const SellProperty = () => {
  const [form, setForm]   = useState({ name:'', email:'', phone:'', propertyType:'', location:'', size:'', bedrooms:'', asking:'', timeline:'', details:'' })
  const [status, setStatus] = useState(null)
  const set = useCallback((k,v) => setForm(p=>({...p,[k]:v})),[])

  const submit = useCallback(async e => {
    e.preventDefault(); setStatus('sending')
    try {
      const r = await fetch(FORMSPREE, {
        method:'POST',
        headers:{'Content-Type':'application/json', Accept:'application/json'},
        body: JSON.stringify({...form, _subject:'Sell My Property Enquiry — HavenRise'})
      })
      setStatus(r.ok?'success':'error')
      if (r.ok) setForm({ name:'', email:'', phone:'', propertyType:'', location:'', size:'', bedrooms:'', asking:'', timeline:'', details:'' })
    } catch { setStatus('error') }
  }, [form])

  const inputStyle = { width:'100%', padding:'12px 14px', fontSize:13, border:'1px solid #E8E4DF', background:'#FAFAFA', color:'#1a1a1a', fontFamily:'inherit', transition:'border-color .2s' }
  const labelStyle = { display:'block', fontSize:10, letterSpacing:'.16em', textTransform:'uppercase', color:'#999', marginBottom:7, fontWeight:600 }

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:'#F9F7F4', color:'#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .serif{font-family:'Cormorant Garamond',Georgia,serif;}
        .fade{animation:fadeUp .7s ease both;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        .reason-card{transition:border-color .3s,box-shadow .3s;}
        .reason-card:hover{border-color:rgba(139,115,85,.4)!important;box-shadow:0 6px 28px rgba(0,0,0,.05);}
        input:focus,textarea:focus,select:focus{outline:none;border-color:#8B7355!important;}
        .sel{appearance:none;background-image:url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23aaa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:32px;}
        .cta-btn:hover{background:#8B7355!important;}
        @media(max-width:1024px){.reasons-grid{grid-template-columns:repeat(3,1fr)!important;}.steps-grid{grid-template-columns:repeat(3,1fr)!important;}}
        @media(max-width:768px){
          .hero-pad{padding:140px 5vw 80px!important;}
          .sec-pad{padding:72px 5vw!important;}
          .reasons-grid{grid-template-columns:1fr 1fr!important;}
          .promise-layout{flex-direction:column!important;}
          .form-2{grid-template-columns:1fr!important;}
          .form-3{grid-template-columns:1fr 1fr!important;}
          .cta-bar{flex-direction:column!important;align-items:flex-start!important;}
        }
        @media(max-width:640px){
          .hero-pad{padding:130px 4vw 64px!important;}
          .sec-pad{padding:56px 4vw!important;}
          .steps-grid{grid-template-columns:1fr 1fr!important;}
          .form-3{grid-template-columns:1fr!important;}
        }
        @media(max-width:420px){.reasons-grid{grid-template-columns:1fr!important;}.steps-grid{grid-template-columns:1fr!important;}}
        @media(prefers-reduced-motion:reduce){.fade,.reason-card{animation:none!important;transition:none!important;}}
      `}</style>

      {/* HERO */}
      <header className="hero-pad" style={{ position:'relative', padding:'168px 6vw 96px', background:'#1a1a1a', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1920&q=80" alt="" aria-hidden="true" fetchpriority="high" decoding="sync"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.1 }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 60% 30%, rgba(139,115,85,.18) 0%, transparent 55%)', pointerEvents:'none' }} aria-hidden="true" />
        <div style={{ position:'relative', zIndex:1, maxWidth:1400, margin:'0 auto' }}>
          <div className="fade" style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28 }}>
            <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Ready to Sell?</p>
          </div>
          <h1 className="fade serif" style={{ fontSize:'clamp(46px,7vw,90px)', fontWeight:300, color:'#fff', lineHeight:.9, letterSpacing:'-.03em', marginBottom:28, animationDelay:'.1s' }}>
            Sell Your<br /><em style={{ color:'#c9a97a' }}>Property With Us</em>
          </h1>
          <p className="fade" style={{ fontSize:16, color:'rgba(255,255,255,.5)', maxWidth:520, lineHeight:1.8, fontWeight:300, marginBottom:48, animationDelay:'.2s' }}>
            Nairobi's most trusted real estate team. We handle every detail — from valuation to handover — so you achieve the best price with the least stress.
          </p>
          <div className="fade" style={{ display:'flex', gap:14, flexWrap:'wrap', animationDelay:'.3s' }}>
            <a href="#sell-form" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#8B7355', color:'#fff', padding:'14px 32px', fontSize:12, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none' }}>
              Start My Sale <Arrow />
            </a>
            <a href="#how-it-works" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'transparent', color:'rgba(255,255,255,.65)', padding:'14px 28px', fontSize:12, fontWeight:500, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(255,255,255,.2)' }}>
              How It Works
            </a>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:40, right:'6vw', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }} aria-hidden="true">
          <p style={{ color:'rgba(255,255,255,.2)', fontSize:9, letterSpacing:'.25em', textTransform:'uppercase', writingMode:'vertical-lr' }}>Scroll</p>
          <div style={{ width:1, height:40, background:'rgba(255,255,255,.12)' }} />
        </div>
      </header>

      {/* PROMISE BANNER */}
      <div className="promise-layout" style={{ background:'#8B7355', display:'flex', alignItems:'stretch' }}>
        {[['Free Valuation','No obligation. No fees. Just an honest price.'],['Expert Negotiation','We fight for the best price — every single time.'],['Fast Completion','Average 8 weeks from listing to handover.']].map(([t,d],i) => (
          <div key={t} style={{ flex:1, padding:'36px 28px', borderRight:i<2?'1px solid rgba(255,255,255,.15)':'none' }}>
            <p style={{ fontSize:14, fontWeight:600, color:'#fff', letterSpacing:'.02em', marginBottom:6 }}>{t}</p>
            <p style={{ fontSize:12, color:'rgba(255,255,255,.7)', fontWeight:300, lineHeight:1.6 }}>{d}</p>
          </div>
        ))}
      </div>

      {/* WHY SELL WITH US */}
      <section className="sec-pad" style={{ padding:'96px 6vw', background:'#fff' }} aria-labelledby="reasons-heading">
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Why HavenRise</p>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:56, flexWrap:'wrap', gap:20 }}>
            <h2 id="reasons-heading" className="serif" style={{ fontSize:'clamp(34px,5vw,66px)', fontWeight:300, lineHeight:.92, letterSpacing:'-.03em' }}>
              Six Reasons Sellers<br /><em style={{ color:'#8B7355' }}>Choose Us</em>
            </h2>
            <p style={{ fontSize:14, color:'#888', maxWidth:340, lineHeight:1.75, fontWeight:300 }}>Our track record speaks for itself — but here's what makes the difference.</p>
          </div>
          <div className="reasons-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:2 }}>
            {REASONS.map((r,i) => (
              <div key={r.title} className="reason-card" style={{ background:'#F9F7F4', border:'1px solid #E8E4DF', padding:'28px 22px' }}>
                <p style={{ fontSize:10, letterSpacing:'.12em', color:'#8B7355', fontWeight:700, marginBottom:14 }}>0{i+1}</p>
                <h3 style={{ fontSize:14, fontWeight:600, color:'#1a1a1a', marginBottom:10, lineHeight:1.35 }}>{r.title}</h3>
                <p style={{ fontSize:12, color:'#888', lineHeight:1.75, fontWeight:300 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE BREAK */}
      <div style={{ position:'relative', height:360, overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="Luxury Nairobi property" loading="lazy" decoding="async" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,8,6,.65)' }} aria-hidden="true" />
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 6vw' }}>
          <blockquote>
            <p className="serif" style={{ fontSize:'clamp(22px,4vw,52px)', fontWeight:300, color:'#fff', lineHeight:1.2, letterSpacing:'-.02em', maxWidth:780 }}>
              "We don't just list your property — we position it as the most compelling opportunity in its price bracket."
            </p>
            <cite style={{ display:'block', fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'.2em', textTransform:'uppercase', marginTop:20, fontStyle:'normal' }}>— HavenRise Sales Team</cite>
          </blockquote>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="sec-pad" style={{ padding:'96px 6vw' }} aria-labelledby="steps-heading">
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>The Process</p>
          </div>
          <h2 id="steps-heading" className="serif" style={{ fontSize:'clamp(32px,4vw,58px)', fontWeight:300, lineHeight:.95, letterSpacing:'-.03em', marginBottom:56 }}>
            Six Steps to<br /><em style={{ color:'#8B7355' }}>A Successful Sale</em>
          </h2>
          <div className="steps-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:2 }}>
            {STEPS.map((s,i) => (
              <div key={s.n} style={{ padding:'28px 20px 32px', borderTop:`2px solid ${i===0?'#8B7355':'#E8E4DF'}`, background:'#fff' }}>
                <span style={{ fontSize:28, display:'block', marginBottom:12 }} aria-hidden="true">{s.icon}</span>
                <p className="serif" style={{ fontSize:36, fontWeight:300, color:'#F0EDE8', lineHeight:1, marginBottom:12 }} aria-hidden="true">{s.n}</p>
                <h3 style={{ fontSize:14, fontWeight:600, color:'#1a1a1a', marginBottom:8, lineHeight:1.35 }}>{s.title}</h3>
                <p style={{ fontSize:12, color:'#888', lineHeight:1.75, fontWeight:300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELL FORM */}
      <section id="sell-form" className="sec-pad" style={{ padding:'96px 6vw', background:'#1a1a1a' }} aria-labelledby="form-heading">
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:16 }}>
              <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
              <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Free Valuation</p>
              <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
            </div>
            <h2 id="form-heading" className="serif" style={{ fontSize:'clamp(32px,4vw,56px)', fontWeight:300, color:'#fff', lineHeight:.95, letterSpacing:'-.03em' }}>
              Tell Us About<br /><em>Your Property</em>
            </h2>
            <p style={{ fontSize:14, color:'rgba(255,255,255,.4)', marginTop:16, fontWeight:300, lineHeight:1.7 }}>
              Fill in the details below and our team will contact you within 24 hours to arrange a free valuation.
            </p>
          </div>

          {status === 'success' ? (
            <div style={{ background:'#fff', padding:'64px 48px', textAlign:'center' }} role="alert">
              <div style={{ width:52, height:52, border:'1px solid #8B7355', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', color:'#8B7355', fontSize:20 }}>✓</div>
              <h3 className="serif" style={{ fontSize:30, fontWeight:300, marginBottom:10 }}>We've Got Your Details</h3>
              <p style={{ fontSize:14, color:'#777', lineHeight:1.8, fontWeight:300, maxWidth:380, margin:'0 auto' }}>
                Our sales team will be in touch within 24 hours to arrange your free valuation.
              </p>
              <button onClick={()=>setStatus(null)} style={{ marginTop:24, fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:600, color:'#8B7355', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>Submit Another Property →</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ background:'#fff', padding:'44px 48px' }} noValidate>

              {/* Contact details */}
              <p style={{ fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', color:'#999', fontWeight:600, marginBottom:16, paddingBottom:12, borderBottom:'1px solid #F0EDE8' }}>Your Details</p>
              <div className="form-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label htmlFor="s-name" style={labelStyle}>Full Name *</label>
                  <input id="s-name" type="text" required placeholder="Jane Doe" autoComplete="name" value={form.name} onChange={e=>set('name',e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="s-phone" style={labelStyle}>Phone Number *</label>
                  <input id="s-phone" type="tel" required placeholder="+254 700 000 000" autoComplete="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom:28 }}>
                <label htmlFor="s-email" style={labelStyle}>Email Address *</label>
                <input id="s-email" type="email" required placeholder="jane@example.com" autoComplete="email" value={form.email} onChange={e=>set('email',e.target.value)} style={inputStyle} />
              </div>

              {/* Property details */}
              <p style={{ fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', color:'#999', fontWeight:600, marginBottom:16, paddingBottom:12, borderBottom:'1px solid #F0EDE8' }}>Property Details</p>

              <div className="form-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label htmlFor="s-type" style={labelStyle}>Property Type *</label>
                  <select id="s-type" required className="sel" value={form.propertyType} onChange={e=>set('propertyType',e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
                    <option value="">Select type…</option>
                    {PROPERTY_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="s-loc" style={labelStyle}>Location *</label>
                  <select id="s-loc" required className="sel" value={form.location} onChange={e=>set('location',e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
                    <option value="">Select area…</option>
                    {LOCATIONS.map(l=><option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-3" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label htmlFor="s-beds" style={labelStyle}>Bedrooms</label>
                  <select id="s-beds" className="sel" value={form.bedrooms} onChange={e=>set('bedrooms',e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
                    <option value="">Select…</option>
                    {['Studio','1','2','3','4','5','6+','N/A'].map(b=><option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="s-size" style={labelStyle}>Plot / Floor Size</label>
                  <input id="s-size" type="text" placeholder="e.g. 180 m²" value={form.size} onChange={e=>set('size',e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="s-asking" style={labelStyle}>Asking Price (Optional)</label>
                  <input id="s-asking" type="text" placeholder="e.g. KES 18,000,000" value={form.asking} onChange={e=>set('asking',e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom:14 }}>
                <label htmlFor="s-timeline" style={labelStyle}>When Would You Like to Sell? *</label>
                <select id="s-timeline" required className="sel" value={form.timeline} onChange={e=>set('timeline',e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
                  <option value="">Select timeline…</option>
                  {TIMELINES.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div style={{ marginBottom:28 }}>
                <label htmlFor="s-details" style={labelStyle}>Additional Details</label>
                <textarea id="s-details" rows={4} placeholder="Any additional information about the property — condition, features, title status, reason for selling..."
                  value={form.details} onChange={e=>set('details',e.target.value)}
                  style={{ ...inputStyle, resize:'vertical', lineHeight:1.65 }} />
              </div>

              {status==='error' && <p role="alert" style={{ fontSize:12, color:'#b94040', marginBottom:14, padding:'11px 13px', background:'#fdf2f2', border:'1px solid #f5c6c6' }}>Something went wrong — please call 0728 686 089 or email havenrise.realty25@gmail.com</p>}

              <div style={{ display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
                <button type="submit" disabled={status==='sending'} className="cta-btn"
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 36px', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', fontWeight:600, border:'none', fontFamily:'inherit', background:'#1a1a1a', color:'#fff', cursor:'pointer', transition:'background .2s' }}>
                  {status==='sending'?'Sending…':<>Request Free Valuation <Arrow /></>}
                </button>
                <p style={{ fontSize:11, color:'#bbb', fontWeight:300 }}>Free. No obligation. We'll call you.</p>
              </div>

              <p style={{ fontSize:11, color:'#ccc', marginTop:16, fontWeight:300 }}>By submitting you agree to our privacy policy. We never share your details.</p>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section style={{ background:'#F0EDE8', padding:'64px 6vw', borderTop:'1px solid #E8E4DF' }}>
        <div className="cta-bar" style={{ maxWidth:1400, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:28 }}>
          <div>
            <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'#8B7355', fontWeight:600, marginBottom:10 }}>Prefer to Talk?</p>
            <h3 className="serif" style={{ fontSize:'clamp(22px,3vw,38px)', fontWeight:300, letterSpacing:'-.02em', lineHeight:1.1 }}>
              Call Us Directly or<br /><em>Visit Our Office</em>
            </h3>
          </div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="tel:+254728686089" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#1a1a1a', color:'#fff', padding:'14px 24px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none' }}>
              Call: 0728 686 089 <Arrow />
            </a>
            <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'transparent', color:'#1a1a1a', padding:'14px 24px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #1a1a1a' }}>
              Contact Us <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
export default SellProperty