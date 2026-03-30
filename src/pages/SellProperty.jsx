import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

const FORMSPREE = 'https://formspree.io/f/YOUR_FORM_ID'

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const STEPS = [
  {
    n: '01', title: 'Seller Consultation',
    desc: 'We sit down with you — in person or virtually — to understand your goals, timeline, and expectations. We walk through our process, our fees, and what you can realistically expect in the current market.',
    icon: '🤝',
  },
  {
    n: '02', title: 'Property Assessment',
    desc: 'Our team visits and evaluates your property against current comparable sales, market conditions, and buyer demand. You receive a detailed pricing recommendation — honest, data-backed, and built to sell.',
    icon: '📋',
  },
  {
    n: '03', title: 'Professional Marketing',
    desc: 'We arrange photography, floor plans, and a compelling listing narrative. Your property goes live on our website, social platforms, and directly to our curated private buyer database.',
    icon: '📸',
  },
  {
    n: '04', title: 'Qualified Viewings',
    desc: 'Every prospective buyer is pre-screened before a viewing — saving you time and ensuring only serious, financially-capable buyers walk through your door.',
    icon: '🔑',
  },
  {
    n: '05', title: 'Offer & Negotiation',
    desc: 'We handle all negotiations on your behalf, advising on every offer with full transparency. Our goal is the best price in the best timeline — and we work hard to get it.',
    icon: '📊',
  },
  {
    n: '06', title: 'Legal & Handover',
    desc: 'Our conveyancing partners manage all paperwork, title transfers, and compliance. Once conditions are met, we coordinate a seamless handover and ensure your funds are released promptly.',
    icon: '⚖️',
  },
]

const REASONS = [
  {
    title: 'Strategic Pricing',
    desc: 'We combine market data, comparable sales, and buyer psychology to price your property to attract the right buyers — and command the best price.',
  },
  {
    title: 'Pre-Qualified Buyers',
    desc: 'Every buyer in our database has been financially vetted. No time-wasters. No deals that collapse at the finish line.',
  },
  {
    title: 'Off-Market Option',
    desc: 'Want to sell discreetly? We can match your property directly to our private buyer list — no public listing, no exposure.',
  },
  {
    title: 'Clear, Agreed Fees',
    desc: 'One agreed commission from the outset. No hidden marketing levies, no admin charges, no surprises. What we quote is what you pay.',
  },
  {
    title: 'Diaspora Support',
    desc: 'Selling from abroad? We manage the entire process remotely — assessments, viewings, offers, legal completion — so you never have to be on the ground.',
  },
  {
    title: 'End-to-End Legal',
    desc: 'We coordinate with trusted property lawyers for title searches, stamp duty, and a clean, watertight transfer at every stage.',
  },
]

const PROPERTY_TYPES = ['Apartment', 'Bungalow', 'Townhouse', 'Villa', 'Land', 'Commercial Property']
const LOCATIONS      = ['Westlands', 'Kilimani', 'Lavington', 'Kileleshwa', 'Runda', 'Karen', 'Langata', 'Other']
const TIMELINES      = ['As soon as possible', 'Within 3 months', '3–6 months', '6–12 months', 'Just exploring']

const SellProperty = () => {
  const [form, setForm]     = useState({ name:'', email:'', phone:'', propertyType:'', location:'', size:'', bedrooms:'', asking:'', timeline:'', details:'' })
  const [status, setStatus] = useState(null)

  const set = useCallback((k, v) => setForm(p => ({ ...p, [k]: v })), [])

  const submit = useCallback(async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _subject: 'Sell My Property Enquiry — HavenRise' }),
      })
      setStatus(r.ok ? 'success' : 'error')
      if (r.ok) setForm({ name:'', email:'', phone:'', propertyType:'', location:'', size:'', bedrooms:'', asking:'', timeline:'', details:'' })
    } catch { setStatus('error') }
  }, [form])

  const inputStyle = {
    width: '100%', padding: '12px 14px', fontSize: 13,
    border: '1px solid #E8E4DF', background: '#FAFAFA',
    color: '#1a1a1a', fontFamily: 'inherit', transition: 'border-color .2s, box-shadow .2s',
  }
  const labelStyle = {
    display: 'block', fontSize: 10, letterSpacing: '.16em',
    textTransform: 'uppercase', color: '#999', marginBottom: 7, fontWeight: 600,
  }

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: '#F9F7F4', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .serif{font-family:'Cormorant Garamond',Georgia,serif;}
        
        /* ── Grain overlay ── */
        .grain::after{
          content:'';position:fixed;inset:0;pointer-events:none;z-index:999;
          opacity:.018;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ── Fade-up entry ── */
        .fade{animation:fadeUp .75s cubic-bezier(.16,1,.3,1) both;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);}}

        /* ── Horizontal rule accent ── */
        .rule{width:32px;height:1px;background:#8B7355;flex-shrink:0;}

        /* ── Reason cards ── */
        .reason-card{
          transition:border-color .35s,box-shadow .35s,transform .35s;
          cursor:default;
        }
        .reason-card:hover{
          border-color:rgba(139,115,85,.5)!important;
          box-shadow:0 8px 32px rgba(0,0,0,.07);
          transform:translateY(-3px);
        }

        /* ── Step cards ── */
        .step-card{transition:border-top-color .3s;}
        .step-card:hover{border-top-color:#8B7355!important;}

        /* ── Inputs ── */
        input:focus,textarea:focus,select:focus{
          outline:none;border-color:#8B7355!important;
          box-shadow:0 0 0 3px rgba(139,115,85,.08)!important;
        }

        /* ── Custom select chevron ── */
        .sel{
          appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23aaa' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat:no-repeat;
          background-position:right 12px center;
          padding-right:32px;
        }

        /* ── CTA buttons ── */
        .btn-gold{transition:background .2s,transform .15s;}
        .btn-gold:hover{background:#6d5a3e!important;transform:translateY(-1px);}
        .btn-outline-dark{transition:background .2s,color .2s,transform .15s;}
        .btn-outline-dark:hover{background:#1a1a1a!important;color:#fff!important;transform:translateY(-1px);}
        .btn-dark{transition:background .2s,transform .15s;}
        .btn-dark:hover{background:#8B7355!important;transform:translateY(-1px);}

        /* ── Decorative number ── */
        .step-num{
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:54px;font-weight:300;
          color:transparent;
          -webkit-text-stroke:1px #E8E4DF;
          line-height:1;margin-bottom:10px;
        }

        /* ── Divider line ── */
        .divider{height:1px;background:linear-gradient(90deg,transparent,#E8E4DF 30%,#E8E4DF 70%,transparent);}

        /* ── Promise pill ── */
        .promise-pill{transition:background .2s;}
        .promise-pill:hover{background:rgba(255,255,255,.06);}

        /* ── Responsive ── */
        @media(max-width:1200px){
          .reasons-grid{grid-template-columns:repeat(3,1fr)!important;}
          .steps-grid{grid-template-columns:repeat(3,1fr)!important;}
        }
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
        @media(max-width:420px){
          .reasons-grid{grid-template-columns:1fr!important;}
          .steps-grid{grid-template-columns:1fr!important;}
        }
        @media(prefers-reduced-motion:reduce){
          .fade,.reason-card,.step-card,.btn-gold,.btn-outline-dark,.btn-dark{
            animation:none!important;transition:none!important;
          }
        }
      `}</style>

      {/* Grain overlay applied to root */}
      <div className="grain" style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:999 }} aria-hidden="true" />

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <header
        className="hero-pad"
        style={{ position:'relative', padding:'180px 6vw 108px', background:'#111', overflow:'hidden' }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1920&q=80"
          alt="" aria-hidden="true" fetchpriority="high" decoding="sync"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.12 }}
        />
        {/* Warm gradient vignette */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 65% 35%, rgba(139,115,85,.22) 0%, transparent 58%), radial-gradient(ellipse at 15% 80%, rgba(60,40,20,.4) 0%, transparent 50%)', pointerEvents:'none' }} aria-hidden="true" />
        {/* Gold horizontal accent line */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(90deg,transparent,rgba(139,115,85,.6) 30%,rgba(201,169,122,.8) 50%,rgba(139,115,85,.6) 70%,transparent)' }} aria-hidden="true" />

        <div style={{ position:'relative', zIndex:1, maxWidth:1400, margin:'0 auto' }}>
          {/* Eyebrow */}
          <div className="fade" style={{ display:'flex', alignItems:'center', gap:14, marginBottom:30 }}>
            <div className="rule" aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Partner With Us to Sell</p>
          </div>

          {/* Headline */}
          <h1 className="fade serif" style={{ fontSize:'clamp(48px,7.5vw,96px)', fontWeight:300, color:'#fff', lineHeight:.88, letterSpacing:'-.03em', marginBottom:32, animationDelay:'.1s' }}>
            Your Property.<br />
            <em style={{ color:'#c9a97a', fontStyle:'italic' }}>Our Expertise.</em><br />
            <span style={{ color:'rgba(255,255,255,.45)', fontSize:'clamp(28px,4vw,56px)' }}>One Partnership.</span>
          </h1>

          <p className="fade" style={{ fontSize:15, color:'rgba(255,255,255,.5)', maxWidth:500, lineHeight:1.85, fontWeight:300, marginBottom:52, animationDelay:'.2s' }}>
            HavenRise works <em style={{ color:'rgba(255,255,255,.7)', fontStyle:'normal', fontWeight:400 }}>alongside you</em> at every step — from initial assessment to final handover — so your sale is handled with precision and your interests are always first.
          </p>

          <div className="fade" style={{ display:'flex', gap:14, flexWrap:'wrap', animationDelay:'.3s' }}>
            <a href="#sell-form" className="btn-gold"
              style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#8B7355', color:'#fff', padding:'15px 34px', fontSize:11, fontWeight:600, letterSpacing:'.18em', textTransform:'uppercase', textDecoration:'none' }}>
              Start the Conversation <Arrow />
            </a>
            <a href="#how-it-works" className="btn-outline-dark"
              style={{ display:'inline-flex', alignItems:'center', gap:10, background:'transparent', color:'rgba(255,255,255,.6)', padding:'15px 28px', fontSize:11, fontWeight:500, letterSpacing:'.16em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(255,255,255,.18)' }}>
              How We Work
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:44, right:'6vw', display:'flex', flexDirection:'column', alignItems:'center', gap:10 }} aria-hidden="true">
          <p style={{ color:'rgba(255,255,255,.18)', fontSize:9, letterSpacing:'.3em', textTransform:'uppercase', writingMode:'vertical-lr' }}>Scroll</p>
          <div style={{ width:1, height:44, background:'linear-gradient(to bottom,rgba(139,115,85,.6),rgba(255,255,255,.06))' }} />
        </div>
      </header>

      {/* ═══════════════════════ PROMISE STRIP ═══════════════════════ */}
      <div className="promise-layout" style={{ background:'#8B7355', display:'flex', alignItems:'stretch' }}>
        {[
          ['Honest Market Assessment', 'A clear, data-backed valuation of your property — aligned with what the market will bear.'],
          ['Active, Collaborative Process', 'We keep you informed at every stage. Every offer, every decision, made together.'],
          ['Fast, Clean Completion', 'Average 8 weeks from instruction to handover — without shortcuts.'],
        ].map(([t, d], i) => (
          <div key={t} className="promise-pill"
            style={{ flex:1, padding:'36px 30px', borderRight:i < 2 ? '1px solid rgba(255,255,255,.15)' : 'none' }}>
            <p style={{ fontSize:14, fontWeight:600, color:'#fff', letterSpacing:'.01em', marginBottom:7 }}>{t}</p>
            <p style={{ fontSize:12, color:'rgba(255,255,255,.72)', fontWeight:300, lineHeight:1.7 }}>{d}</p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════ WHY SELL WITH US ═══════════════════════ */}
      <section className="sec-pad" style={{ padding:'104px 6vw', background:'#fff' }} aria-labelledby="reasons-heading">
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
            <div className="rule" aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Why HavenRise</p>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:60, flexWrap:'wrap', gap:20 }}>
            <h2 id="reasons-heading" className="serif" style={{ fontSize:'clamp(36px,5vw,68px)', fontWeight:300, lineHeight:.9, letterSpacing:'-.03em' }}>
              Six Reasons Sellers<br /><em style={{ color:'#8B7355' }}>Choose to Work With Us</em>
            </h2>
            <p style={{ fontSize:14, color:'#888', maxWidth:360, lineHeight:1.8, fontWeight:300 }}>
              Selling a property is a significant decision. Here's what you can expect when you bring HavenRise into that process.
            </p>
          </div>

          <div className="reasons-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:2 }}>
            {REASONS.map((r, i) => (
              <div key={r.title} className="reason-card"
                style={{ background:'#F9F7F4', border:'1px solid #E8E4DF', padding:'30px 22px', position:'relative', overflow:'hidden' }}>
                {/* Decorative corner */}
                <div style={{ position:'absolute', top:0, right:0, width:32, height:32, borderBottom:'1px solid #E8E4DF', borderLeft:'1px solid #E8E4DF', background:'#fff', opacity:.5 }} aria-hidden="true" />
                <p style={{ fontSize:10, letterSpacing:'.14em', color:'#8B7355', fontWeight:700, marginBottom:16 }}>0{i + 1}</p>
                <h3 style={{ fontSize:13, fontWeight:600, color:'#1a1a1a', marginBottom:10, lineHeight:1.4 }}>{r.title}</h3>
                <p style={{ fontSize:12, color:'#888', lineHeight:1.8, fontWeight:300 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ IMAGE QUOTE BREAK ═══════════════════════ */}
      <div style={{ position:'relative', height:400, overflow:'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Luxury Nairobi property" loading="lazy" decoding="async"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 40%' }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(10,8,6,.78) 0%, rgba(30,22,14,.65) 100%)' }} aria-hidden="true" />
        {/* Gold horizontal accent */}
        <div style={{ position:'absolute', top:'50%', left:'6vw', right:'6vw', height:'1px', background:'linear-gradient(90deg,rgba(139,115,85,.6),transparent)', transform:'translateY(-44px)' }} aria-hidden="true" />
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 6vw' }}>
          <blockquote>
            <p className="serif" style={{ fontSize:'clamp(22px,4vw,54px)', fontWeight:300, color:'#fff', lineHeight:1.18, letterSpacing:'-.025em', maxWidth:820 }}>
              "We don't just list your property — we position it as the most compelling opportunity in its price bracket, and work beside you until the deal is done."
            </p>
            <cite style={{ display:'block', fontSize:10, color:'rgba(255,255,255,.38)', letterSpacing:'.22em', textTransform:'uppercase', marginTop:22, fontStyle:'normal' }}>— HavenRise Sales Team</cite>
          </blockquote>
        </div>
      </div>

      {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
      <section id="how-it-works" className="sec-pad" style={{ padding:'104px 6vw', background:'#F9F7F4' }} aria-labelledby="steps-heading">
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:18 }}>
            <div className="rule" aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Our Process</p>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:64, flexWrap:'wrap', gap:20 }}>
            <h2 id="steps-heading" className="serif" style={{ fontSize:'clamp(34px,4.5vw,62px)', fontWeight:300, lineHeight:.92, letterSpacing:'-.03em' }}>
              How We Work<br /><em style={{ color:'#8B7355' }}>Together to Sell</em>
            </h2>
            <p style={{ fontSize:14, color:'#888', maxWidth:380, lineHeight:1.8, fontWeight:300 }}>
              Six defined stages. Full transparency. You stay in control — we handle the complexity.
            </p>
          </div>

          <div className="steps-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:2 }}>
            {STEPS.map((s, i) => (
              <div key={s.n} className="step-card"
                style={{ padding:'28px 20px 34px', borderTop:`2px solid ${i === 0 ? '#8B7355' : '#D8D4CE'}`, background:'#fff', transition:'border-top-color .3s' }}>
                <div className="step-num" aria-hidden="true">{s.n}</div>
                <span style={{ fontSize:22, display:'block', marginBottom:12 }} aria-hidden="true">{s.icon}</span>
                <h3 style={{ fontSize:13, fontWeight:600, color:'#1a1a1a', marginBottom:8, lineHeight:1.4 }}>{s.title}</h3>
                <p style={{ fontSize:12, color:'#888', lineHeight:1.8, fontWeight:300 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Connecting note */}
          <div style={{ marginTop:44, padding:'28px 32px', background:'rgba(139,115,85,.06)', border:'1px solid rgba(139,115,85,.18)', display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
            <div className="rule" aria-hidden="true" />
            <p style={{ fontSize:13, color:'#5a5a5a', fontWeight:300, lineHeight:1.75, maxWidth:720 }}>
              <strong style={{ fontWeight:600, color:'#1a1a1a' }}>Our fees are commission-based</strong> — agreed upfront and only paid on a successful sale. This means our incentive is perfectly aligned with yours: getting you the best result.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ FORM ═══════════════════════ */}
      <section id="sell-form" className="sec-pad" style={{ padding:'104px 6vw', background:'#1a1a1a', position:'relative', overflow:'hidden' }} aria-labelledby="form-heading">
        {/* Background texture lines */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,.018) 60px, rgba(255,255,255,.018) 61px)', pointerEvents:'none' }} aria-hidden="true" />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,transparent,rgba(139,115,85,.5) 30%,rgba(201,169,122,.7) 50%,rgba(139,115,85,.5) 70%,transparent)' }} aria-hidden="true" />

        <div style={{ maxWidth:900, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ textAlign:'center', marginBottom:56 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:18 }}>
              <div className="rule" aria-hidden="true" />
              <p style={{ fontSize:10, letterSpacing:'.28em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Let's Talk</p>
              <div className="rule" aria-hidden="true" />
            </div>
            <h2 id="form-heading" className="serif" style={{ fontSize:'clamp(34px,4.5vw,58px)', fontWeight:300, color:'#fff', lineHeight:.92, letterSpacing:'-.03em' }}>
              Tell Us About<br /><em>Your Property</em>
            </h2>
            <p style={{ fontSize:14, color:'rgba(255,255,255,.38)', marginTop:18, fontWeight:300, lineHeight:1.75, maxWidth:520, margin:'18px auto 0' }}>
              Share the details below and our team will be in touch within 24 hours to arrange an initial consultation — no pressure, just a conversation.
            </p>
          </div>

          {status === 'success' ? (
            <div style={{ background:'#fff', padding:'72px 48px', textAlign:'center' }} role="alert">
              <div style={{ width:52, height:52, border:'1px solid #8B7355', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', color:'#8B7355', fontSize:20 }}>✓</div>
              <h3 className="serif" style={{ fontSize:32, fontWeight:300, marginBottom:12 }}>We've Received Your Details</h3>
              <p style={{ fontSize:14, color:'#777', lineHeight:1.85, fontWeight:300, maxWidth:400, margin:'0 auto' }}>
                Our team will be in touch within 24 hours to schedule your initial consultation and discuss next steps.
              </p>
              <button onClick={() => setStatus(null)}
                style={{ marginTop:26, fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:600, color:'#8B7355', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>
                Submit Another Property →
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ background:'#fff', padding:'44px 48px' }} noValidate>

              {/* ── Contact details ── */}
              <p style={{ fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'#bbb', fontWeight:600, marginBottom:16, paddingBottom:12, borderBottom:'1px solid #F0EDE8' }}>Your Details</p>
              <div className="form-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label htmlFor="s-name" style={labelStyle}>Full Name *</label>
                  <input id="s-name" type="text" required placeholder="Jane Doe" autoComplete="name"
                    value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="s-phone" style={labelStyle}>Phone Number *</label>
                  <input id="s-phone" type="tel" required placeholder="+254 700 000 000" autoComplete="tel"
                    value={form.phone} onChange={e => set('phone', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom:32 }}>
                <label htmlFor="s-email" style={labelStyle}>Email Address *</label>
                <input id="s-email" type="email" required placeholder="jane@example.com" autoComplete="email"
                  value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
              </div>

              {/* ── Property details ── */}
              <p style={{ fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'#bbb', fontWeight:600, marginBottom:16, paddingBottom:12, borderBottom:'1px solid #F0EDE8' }}>Property Details</p>
              <div className="form-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label htmlFor="s-type" style={labelStyle}>Property Type *</label>
                  <select id="s-type" required className="sel" value={form.propertyType} onChange={e => set('propertyType', e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
                    <option value="">Select type…</option>
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="s-loc" style={labelStyle}>Location *</label>
                  <select id="s-loc" required className="sel" value={form.location} onChange={e => set('location', e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
                    <option value="">Select area…</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-3" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, marginBottom:14 }}>
                <div>
                  <label htmlFor="s-beds" style={labelStyle}>Bedrooms</label>
                  <select id="s-beds" className="sel" value={form.bedrooms} onChange={e => set('bedrooms', e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
                    <option value="">Select…</option>
                    {['Studio','1','2','3','4','5','6+','N/A'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="s-size" style={labelStyle}>Plot / Floor Size</label>
                  <input id="s-size" type="text" placeholder="e.g. 180 m²"
                    value={form.size} onChange={e => set('size', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="s-asking" style={labelStyle}>Asking Price (if known)</label>
                  <input id="s-asking" type="text" placeholder="e.g. KES 18,000,000"
                    value={form.asking} onChange={e => set('asking', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom:14 }}>
                <label htmlFor="s-timeline" style={labelStyle}>Selling Timeline *</label>
                <select id="s-timeline" required className="sel" value={form.timeline} onChange={e => set('timeline', e.target.value)} style={{ ...inputStyle, cursor:'pointer' }}>
                  <option value="">Select timeline…</option>
                  {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:32 }}>
                <label htmlFor="s-details" style={labelStyle}>Additional Details</label>
                <textarea id="s-details" rows={4}
                  placeholder="Property condition, key features, title status, reason for selling — anything that helps us understand your situation."
                  value={form.details} onChange={e => set('details', e.target.value)}
                  style={{ ...inputStyle, resize:'vertical', lineHeight:1.7 }} />
              </div>

              {status === 'error' && (
                <p role="alert" style={{ fontSize:12, color:'#b94040', marginBottom:16, padding:'11px 14px', background:'#fdf2f2', border:'1px solid #f5c6c6' }}>
                  Something went wrong — please call <strong>0728 686 089</strong> or email <strong>havenriserealtors@gmail.com</strong>
                </p>
              )}

              <div style={{ display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
                <button type="submit" disabled={status === 'sending'} className="btn-dark"
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'15px 38px', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', fontWeight:600, border:'none', fontFamily:'inherit', background:'#1a1a1a', color:'#fff', cursor:'pointer' }}>
                  {status === 'sending' ? 'Sending…' : <> Request a Consultation <Arrow /> </>}
                </button>
                <p style={{ fontSize:11, color:'#bbb', fontWeight:300 }}>Our team responds within 24 hours.</p>
              </div>
              <p style={{ fontSize:11, color:'#ccc', marginTop:16, fontWeight:300, lineHeight:1.6 }}>By submitting this form you agree to our privacy policy. Your details are never shared with third parties.</p>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════════════ CONTACT STRIP ═══════════════════════ */}
      <section style={{ background:'#F0EDE8', padding:'68px 6vw', borderTop:'1px solid #E0DBD4' }}>
        <div className="cta-bar" style={{ maxWidth:1400, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:28 }}>
          <div>
            <p style={{ fontSize:10, letterSpacing:'.24em', textTransform:'uppercase', color:'#8B7355', fontWeight:600, marginBottom:10 }}>Prefer a Direct Conversation?</p>
            <h3 className="serif" style={{ fontSize:'clamp(24px,3.2vw,42px)', fontWeight:300, letterSpacing:'-.025em', lineHeight:1.08 }}>
              Call Us or Visit<br /><em>Our Office Directly</em>
            </h3>
          </div>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="tel:+254728686089" className="btn-dark"
              style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#1a1a1a', color:'#fff', padding:'14px 26px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none' }}>
              Call: 0728 686 089 <Arrow />
            </a>
            <Link to="/contact" className="btn-outline-dark"
              style={{ display:'inline-flex', alignItems:'center', gap:10, background:'transparent', color:'#1a1a1a', padding:'14px 26px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #1a1a1a' }}>
              Contact Us <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SellProperty