import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

const FORMSPREE = 'https://formspree.io/f/YOUR_FORM_ID'
const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)

const PARTNER_TYPES = [
  { n:'01', title:'Land Owners', desc:'Own undeveloped land in Nairobi or surrounds? We connect you with vetted developers, conduct fair valuations, and structure Joint Venture arrangements that unlock your land\'s full potential without giving it away.' },
  { n:'02', title:'Property Developers', desc:'Building residential estates, mixed-use schemes, or commercial projects? We provide off-plan sales management, market intelligence, and direct access to our database of qualified buyers and investors.' },
  { n:'03', title:'Real Estate Investors', desc:'Seeking co-development, joint venture, or bulk acquisition opportunities? We identify prime targets, lead due diligence, and structure deals that generate strong, long-term compounding returns.' },
  { n:'04', title:'Institutional Partners', desc:'Banks, SACCOs, and funds seeking real estate exposure: we offer structured advisory, portfolio co-investment, and exclusive access to off-market transactions in Nairobi\'s prime submarkets.' },
]

const PROCESS = [
  { step:'01', title:'Initial Consultation',   desc:'We meet to understand your land, capital, and goals. Honest and obligation-free.' },
  { step:'02', title:'Feasibility & Valuation', desc:'Market analysis and land valuation to identify the highest-value use of your asset.' },
  { step:'03', title:'Partner Matching',        desc:'We tap our network to find the right developer, investor, or buyer fit.' },
  { step:'04', title:'Deal Structuring',        desc:'Term negotiations, legal structuring, and due diligence support throughout.' },
  { step:'05', title:'Sales & Delivery',        desc:'Off-plan sales programme, marketing, and project oversight through handover.' },
]

const STATS = [['12+','Active Developments'],['KES 4B+','Development Value'],['85%','Partner Retention'],['48hrs','Response Time']]

const OFFER = [
  { title:'Market Intelligence',   desc:'Deep knowledge of Nairobi\'s micro-markets, zoning laws, and development pipeline.' },
  { title:'Qualified Buyer Access', desc:'Immediate reach to 1,000+ active buyers, investors, and off-plan purchasers.' },
  { title:'Legal Coordination',    desc:'Title verification and transaction security via top property law firms.' },
  { title:'Sales & Marketing',     desc:'Photography, digital campaigns, show-unit management, and open days.' },
  { title:'Project Management',    desc:'Timeline oversight, contractor liaison, and milestone progress reporting.' },
]

const Developers = () => {
  const [form, setForm]   = useState({ name:'', company:'', email:'', phone:'', type:'', message:'' })
  const [status, setStatus] = useState(null)
  const set = useCallback((k,v) => setForm(p=>({...p,[k]:v})),[])

  const submit = useCallback(async e => {
    e.preventDefault(); setStatus('sending')
    try {
      const r = await fetch(FORMSPREE, { method:'POST', headers:{'Content-Type':'application/json', Accept:'application/json'}, body: JSON.stringify({...form, _subject:'Developer/Land Partnership Enquiry'}) })
      setStatus(r.ok ? 'success' : 'error')
      if (r.ok) setForm({ name:'', company:'', email:'', phone:'', type:'', message:'' })
    } catch { setStatus('error') }
  }, [form])

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:'#F9F7F4', color:'#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        .serif{font-family:'Cormorant Garamond',Georgia,serif;}
        .fade{animation:fadeUp .7s ease both;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
        .card{transition:border-color .3s,box-shadow .3s;}
        .card:hover{border-color:rgba(139,115,85,.4)!important;box-shadow:0 8px 40px rgba(0,0,0,.06);}
        .ulink{position:relative;}
        .ulink::after{content:'';position:absolute;left:0;bottom:-2px;width:0;height:1px;background:#8B7355;transition:width .3s;}
        .ulink:hover::after{width:100%;}
        input:focus,textarea:focus,select:focus{outline:none;border-color:#8B7355!important;}
        .cta-btn:hover{background:#8B7355!important;}
        @media(max-width:1024px){.partner-grid{grid-template-columns:1fr 1fr!important;}.stats-band{grid-template-columns:1fr 1fr!important;}.process-grid{grid-template-columns:1fr 1fr!important;}.offer-grid{grid-template-columns:1fr!important;gap:48px!important;}}
        @media(max-width:768px){.hero-pad{padding:140px 5vw 80px!important;}.sec-pad{padding:72px 5vw!important;}.form-2{grid-template-columns:1fr!important;}.cta-bar{flex-direction:column!important;align-items:flex-start!important;}.type-grid{grid-template-columns:1fr 1fr!important;}}
        @media(max-width:640px){.partner-grid{grid-template-columns:1fr!important;}.hero-pad{padding:130px 4vw 64px!important;}.sec-pad{padding:56px 4vw!important;}.process-grid{grid-template-columns:1fr!important;}}
        @media(max-width:420px){.stats-band{grid-template-columns:1fr!important;}.type-grid{grid-template-columns:1fr!important;}}
        @media(prefers-reduced-motion:reduce){.fade,.card{animation:none!important;transition:none!important;}}
      `}</style>

      {/* HERO */}
      <header className="hero-pad" style={{ position:'relative', padding:'168px 6vw 96px', background:'#1a1a1a', overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80" alt="" aria-hidden="true" fetchpriority="high" decoding="sync" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.1 }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 70% 40%, rgba(139,115,85,.18) 0%, transparent 60%)', pointerEvents:'none' }} aria-hidden="true" />
        <div style={{ position:'relative', zIndex:1, maxWidth:1400, margin:'0 auto' }}>
          <div className="fade" style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28 }}>
            <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Strategic Partnerships</p>
          </div>
          <h1 className="fade serif" style={{ fontSize:'clamp(46px,7vw,90px)', fontWeight:300, color:'#fff', lineHeight:.9, letterSpacing:'-.03em', marginBottom:28, animationDelay:'.1s' }}>
            Developers &amp;<br /><em style={{ color:'#c9a97a' }}>Land Partnerships</em>
          </h1>
          <p className="fade" style={{ fontSize:16, color:'rgba(255,255,255,.5)', maxWidth:500, lineHeight:1.8, fontWeight:300, marginBottom:48, animationDelay:'.2s' }}>
            We bridge land, capital, and development expertise — structuring partnerships that unlock maximum value across Nairobi's prime real estate opportunities.
          </p>
          <div className="fade" style={{ display:'flex', gap:14, flexWrap:'wrap', animationDelay:'.3s' }}>
            <a href="#enquire" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#8B7355', color:'#fff', padding:'14px 32px', fontSize:12, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none' }}>Start a Partnership <Arrow /></a>
            <a href="#how-it-works" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'transparent', color:'rgba(255,255,255,.65)', padding:'14px 28px', fontSize:12, fontWeight:500, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(255,255,255,.2)' }}>How It Works</a>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:40, right:'6vw', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }} aria-hidden="true">
          <p style={{ color:'rgba(255,255,255,.2)', fontSize:9, letterSpacing:'.25em', textTransform:'uppercase', writingMode:'vertical-lr' }}>Scroll</p>
          <div style={{ width:1, height:40, background:'rgba(255,255,255,.12)' }} />
        </div>
      </header>

      {/* STATS */}
      <div style={{ background:'#F0EDE8', borderBottom:'1px solid #E8E4DF' }}>
        <div className="stats-band" style={{ maxWidth:1400, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {STATS.map(([n,l],i) => (
            <div key={l} style={{ padding:'36px 24px', textAlign:'center', borderRight: i<3 ? '1px solid #E8E4DF' : 'none' }}>
              <p className="serif" style={{ fontSize:44, fontWeight:300, lineHeight:1, color:'#1a1a1a' }}>{n}</p>
              <p style={{ fontSize:10, letterSpacing:'.16em', textTransform:'uppercase', color:'#8B7355', marginTop:8, fontWeight:600 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHO WE WORK WITH */}
      <section className="sec-pad" style={{ padding:'96px 6vw' }} aria-labelledby="pt-heading">
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Who We Work With</p>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:56, flexWrap:'wrap', gap:20 }}>
            <h2 id="pt-heading" className="serif" style={{ fontSize:'clamp(36px,5vw,68px)', fontWeight:300, lineHeight:.92, letterSpacing:'-.03em' }}>Four Types of<br /><em style={{ color:'#8B7355' }}>Partnership</em></h2>
            <p style={{ fontSize:14, color:'#888', maxWidth:360, lineHeight:1.75, fontWeight:300 }}>Whether you bring land, capital, expertise, or all three — there is a structured model designed for you.</p>
          </div>
          <div className="partner-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2 }}>
            {PARTNER_TYPES.map((pt,) => (
              <article key={pt.n} className="card" style={{ background:'#fff', border:'1px solid #E8E4DF', padding:'32px 24px 36px' }}>
                <p className="serif" style={{ fontSize:52, fontWeight:300, color:'#F0EDE8', lineHeight:1, marginBottom:20 }} aria-hidden="true">{pt.n}</p>
                <h3 style={{ fontSize:16, fontWeight:600, color:'#1a1a1a', marginBottom:12, lineHeight:1.3 }}>{pt.title}</h3>
                <p style={{ fontSize:13, color:'#777', lineHeight:1.8, fontWeight:300 }}>{pt.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE BREAK */}
      <div style={{ position:'relative', height:380, overflow:'hidden' }}>
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80" alt="Nairobi construction" loading="lazy" decoding="async" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'rgba(10,8,6,.7)' }} aria-hidden="true" />
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 6vw' }}>
          <blockquote>
            <p className="serif" style={{ fontSize:'clamp(22px,4vw,50px)', fontWeight:300, color:'#fff', lineHeight:1.2, letterSpacing:'-.02em', maxWidth:820, margin:'0 auto' }}>
              "The right partnership turns idle land into lasting legacy — and we know how to build both."
            </p>
            <cite style={{ display:'block', fontSize:10, color:'rgba(255,255,255,.4)', letterSpacing:'.2em', textTransform:'uppercase', marginTop:24, fontStyle:'normal' }}>— HavenRise Development Team</cite>
          </blockquote>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="sec-pad" style={{ padding:'96px 6vw', background:'#1a1a1a' }} aria-labelledby="process-heading">
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
            <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Our Process</p>
          </div>
          <h2 id="process-heading" className="serif" style={{ fontSize:'clamp(32px,4vw,58px)', fontWeight:300, color:'#fff', lineHeight:.95, letterSpacing:'-.03em', marginBottom:56 }}>
            From First Call<br /><em>to First Shovel</em>
          </h2>
          <div className="process-grid" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:2 }}>
            {PROCESS.map((p,i) => (
              <div key={p.step} style={{ padding:'28px 20px 32px', borderTop:`2px solid ${i===0?'#8B7355':'rgba(255,255,255,.08)'}` }}>
                <p className="serif" style={{ fontSize:40, fontWeight:300, color:'rgba(255,255,255,.07)', lineHeight:1, marginBottom:16 }} aria-hidden="true">{p.step}</p>
                <h3 style={{ fontSize:14, fontWeight:600, color:'#fff', marginBottom:10, lineHeight:1.4 }}>{p.title}</h3>
                <p style={{ fontSize:12, color:'rgba(255,255,255,.38)', lineHeight:1.75, fontWeight:300 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="sec-pad" style={{ padding:'96px 6vw' }} aria-labelledby="offer-heading">
        <div style={{ maxWidth:1400, margin:'0 auto' }}>
          <div className="offer-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
                <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
                <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>What We Bring</p>
              </div>
              <h2 id="offer-heading" className="serif" style={{ fontSize:'clamp(32px,4vw,56px)', fontWeight:300, lineHeight:.95, letterSpacing:'-.03em', marginBottom:36 }}>
                Our Value to<br /><em style={{ color:'#8B7355' }}>Every Deal</em>
              </h2>
              <div style={{ position:'relative', paddingLeft:24, borderLeft:'2px solid #F0EDE8', marginBottom:36 }}>
                <div style={{ position:'absolute', top:0, left:-2, width:2, height:44, background:'#8B7355' }} aria-hidden="true" />
                <p className="serif" style={{ fontSize:19, fontWeight:300, fontStyle:'italic', color:'#666', lineHeight:1.7, maxWidth:380 }}>
                  "We don't just broker deals — we architect outcomes that create compounding value for every party involved."
                </p>
              </div>
              <Link to="/contact" className="ulink" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:12, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:600, color:'#8B7355', textDecoration:'none' }}>
                Speak to Our Team <Arrow />
              </Link>
            </div>
            <div>
              {OFFER.map((item,i) => (
                <div key={item.title} style={{ padding:'22px 0', borderBottom:'1px solid #F0EDE8', display:'flex', gap:20, alignItems:'flex-start' }}>
                  <span style={{ fontSize:10, letterSpacing:'.1em', color:'#8B7355', fontWeight:700, marginTop:2, flexShrink:0 }}>0{i+1}</span>
                  <div>
                    <h3 style={{ fontSize:14, fontWeight:600, color:'#1a1a1a', marginBottom:5 }}>{item.title}</h3>
                    <p style={{ fontSize:13, color:'#888', lineHeight:1.7, fontWeight:300 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section id="enquire" className="sec-pad" style={{ padding:'96px 6vw', background:'#F0EDE8' }} aria-labelledby="enq-heading">
        <div style={{ maxWidth:820, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:52 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginBottom:16 }}>
              <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
              <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Get Started</p>
              <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
            </div>
            <h2 id="enq-heading" className="serif" style={{ fontSize:'clamp(32px,4vw,54px)', fontWeight:300, lineHeight:.95, letterSpacing:'-.03em' }}>
              Start Your<br /><em style={{ color:'#8B7355' }}>Partnership Conversation</em>
            </h2>
          </div>

          {status === 'success' ? (
            <div style={{ background:'#fff', padding:'64px 48px', textAlign:'center', border:'1px solid #E8E4DF' }} role="alert">
              <div style={{ width:52, height:52, border:'1px solid #8B7355', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px', color:'#8B7355', fontSize:20 }}>✓</div>
              <h3 className="serif" style={{ fontSize:30, fontWeight:300, marginBottom:10 }}>Enquiry Received</h3>
              <p style={{ fontSize:14, color:'#777', lineHeight:1.8, fontWeight:300 }}>Our partnerships team will reach out within 48 hours.</p>
              <button onClick={()=>setStatus(null)} style={{ marginTop:24, fontSize:11, letterSpacing:'.16em', textTransform:'uppercase', fontWeight:600, color:'#8B7355', background:'none', border:'none', cursor:'pointer', fontFamily:'inherit' }}>Submit Another →</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ background:'#fff', padding:'44px', border:'1px solid #E8E4DF' }} noValidate>
              {/* Type selector */}
              <div style={{ marginBottom:24 }}>
                <p style={{ fontSize:11, letterSpacing:'.15em', textTransform:'uppercase', color:'#999', marginBottom:10, fontWeight:600 }}>I am a</p>
                <div className="type-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
                  {['Land Owner','Developer','Investor','Institution'].map(t => (
                    <button key={t} type="button" onClick={()=>set('type',t)} aria-pressed={form.type===t}
                      style={{ padding:'10px 6px', fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', fontWeight:500, cursor:'pointer', fontFamily:'inherit', border:'1px solid', borderColor:form.type===t?'#1a1a1a':'#ddd', background:form.type===t?'#1a1a1a':'transparent', color:form.type===t?'#fff':'#999', transition:'all .15s' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                {[['d-name','name','Full Name *','text','Jane Doe','name'],['d-co','company','Company / Organisation','text','Acme Developers Ltd.','organization']].map(([id,k,label,type,ph,ac])=>(
                  <div key={id}>
                    <label htmlFor={id} style={{ display:'block', fontSize:11, letterSpacing:'.15em', textTransform:'uppercase', color:'#999', marginBottom:7, fontWeight:600 }}>{label}</label>
                    <input id={id} type={type} placeholder={ph} autoComplete={ac} required={label.includes('*')} value={form[k]} onChange={e=>set(k,e.target.value)}
                      style={{ width:'100%', padding:'11px 13px', fontSize:13, border:'1px solid #E8E4DF', background:'#FAFAFA', color:'#1a1a1a', fontFamily:'inherit' }} />
                  </div>
                ))}
              </div>
              <div className="form-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                {[['d-email','email','Email Address *','email','jane@example.com','email'],['d-phone','phone','Phone Number *','tel','+254 700 000 000','tel']].map(([id,k,label,type,ph,ac])=>(
                  <div key={id}>
                    <label htmlFor={id} style={{ display:'block', fontSize:11, letterSpacing:'.15em', textTransform:'uppercase', color:'#999', marginBottom:7, fontWeight:600 }}>{label}</label>
                    <input id={id} type={type} placeholder={ph} autoComplete={ac} required value={form[k]} onChange={e=>set(k,e.target.value)}
                      style={{ width:'100%', padding:'11px 13px', fontSize:13, border:'1px solid #E8E4DF', background:'#FAFAFA', color:'#1a1a1a', fontFamily:'inherit' }} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:24 }}>
                <label htmlFor="d-msg" style={{ display:'block', fontSize:11, letterSpacing:'.15em', textTransform:'uppercase', color:'#999', marginBottom:7, fontWeight:600 }}>Tell Us About Your Project / Land *</label>
                <textarea id="d-msg" rows={4} required placeholder="Location, size, zoning, current status, and what you're looking to achieve..."
                  value={form.message} onChange={e=>set('message',e.target.value)}
                  style={{ width:'100%', padding:'11px 13px', fontSize:13, border:'1px solid #E8E4DF', background:'#FAFAFA', color:'#1a1a1a', fontFamily:'inherit', resize:'vertical', lineHeight:1.65 }} />
              </div>
              {status==='error' && <p role="alert" style={{ fontSize:12, color:'#b94040', marginBottom:14, padding:'11px 13px', background:'#fdf2f2', border:'1px solid #f5c6c6' }}>Something went wrong — please email havenrise.realty25@gmail.com</p>}
              <div style={{ display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
                <button type="submit" disabled={status==='sending'||!form.type} className="cta-btn"
                  style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 32px', fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', fontWeight:600, border:'none', fontFamily:'inherit', background:form.type?'#1a1a1a':'#ccc', color:'#fff', cursor:form.type?'pointer':'not-allowed', transition:'background .2s' }}>
                  {status==='sending'?'Sending…':<>Submit Enquiry <Arrow /></>}
                </button>
                <p style={{ fontSize:11, color:'#bbb', fontWeight:300 }}>Confidential — your details are never shared</p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'#1a1a1a', padding:'60px 6vw', borderTop:'2px solid #8B7355' }}>
        <div className="cta-bar" style={{ maxWidth:1400, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:24 }}>
          <div>
            <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'#8B7355', fontWeight:600, marginBottom:8 }}>See Our Portfolio</p>
            <h3 className="serif" style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:300, color:'#fff', letterSpacing:'-.02em' }}>Properties We've <em>Brought to Market</em></h3>
          </div>
          <Link to="/properties" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#8B7355', color:'#fff', padding:'14px 28px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none' }}>View Properties <Arrow /></Link>
        </div>
      </section>
    </div>
  )
}
export default Developers