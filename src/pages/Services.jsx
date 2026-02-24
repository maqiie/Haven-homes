import { Link } from 'react-router-dom'

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

// ─── Services — first 6 are property, #07 is chauffeur (treated separately) ──
const PROPERTY_SERVICES = [
  {
    num:'01', title:'Property Sales', sub:'Buy with Confidence',
    desc:'From first viewing to final handover, our sales team guides you through every step. We represent some of Nairobi\'s most exclusive residential listings — with access to off-market properties no one else will show you.',
    features:['Expert property valuation & pricing strategy','Curated shortlisting based on your brief','Negotiation & offer management','Legal coordination through to completion'],
    img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80',
    cta:'Browse Properties', link:'/properties',
  },
  {
    num:'02', title:'Letting & Rentals', sub:'Rent Smarter',
    desc:'Whether you\'re seeking a long-term home or a short-term corporate let, we match you with vetted properties that fit your lifestyle and budget — across Westlands, Kilimani, Lavington, and beyond.',
    features:['Fully verified property listings','Tenant screening & lease preparation','Deposit and rent payment management','Move-in inspection & handover support'],
    img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80',
    cta:'View Rentals', link:'/properties',
  },
  {
    num:'03', title:'Property Management', sub:'Hands-Off Ownership',
    desc:'Own property but don\'t want the hassle? Our management service handles everything — from finding and vetting tenants to coordinating repairs, collecting rent, and providing monthly statements.',
    features:['Tenant sourcing & full background checks','Rent collection & disbursement','Maintenance coordination & contractor network','Monthly reporting & annual accounts'],
    img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
    cta:'Learn More', link:'/contact',
  },
  {
    num:'04', title:'Property Valuation', sub:'Know Your Asset\'s Worth',
    desc:'Accurate, evidence-based valuations for sales, purchases, mortgages, insurance, or legal matters. Our certified valuers assess every property with a comprehensive market analysis and comparable evidence report.',
    features:['Residential & commercial valuations','Mortgage & bank valuation reports','Probate & legal dispute valuations','Portfolio & investment assessments'],
    img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80',
    cta:'Request a Valuation', link:'/contact',
  },
  {
    num:'05', title:'Developer Sales & Marketing', sub:'Off-Plan Excellence',
    desc:'We design and execute full off-plan sales programmes for residential developers — from show-unit fit-out through to final unit handover. Our buyer network and digital reach ensure faster absorption at better prices.',
    features:['Sales strategy & unit pricing','Show unit design & management','Buyer sourcing, qualification & reservation','Digital marketing & PR campaigns'],
    img:'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    cta:'Partner With Us', link:'/contact',
  },
  {
    num:'06', title:'Real Estate Advisory', sub:'Strategic Guidance',
    desc:'Investment advisory for individuals, SACCOs, institutions, and diaspora buyers. We provide market analysis, due diligence, acquisition sourcing, and portfolio optimisation to help you build and protect your real estate wealth.',
    features:['Market entry & investment strategy','Due diligence & title verification','Portfolio review & yield optimisation','Diaspora buying & remote transaction support'],
    img:'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=900&q=80',
    cta:'Talk to an Advisor', link:'/contact',
  },
]

const AIRPORTS = [
  { code:'NBO', name:'JKIA', city:'Nairobi' },
  { code:'MBA', name:'Moi Intl', city:'Mombasa' },
  { code:'WIL', name:'Wilson', city:'Nairobi' },
  { code:'KIS', name:'Kisumu Intl', city:'Kisumu' },
  { code:'EDL', name:'Eldoret Intl', city:'Eldoret' },
]

const JOURNEY_STEPS = [
  { step:'01', label:'We meet you at the airport', icon:'✈' },
  { step:'02', label:'Chauffeur-driven to your accommodation or viewing', icon:'🚗' },
  { step:'03', label:'Tour shortlisted properties with our agents', icon:'🏡' },
  { step:'04', label:'We negotiate and handle every detail', icon:'🤝' },
  { step:'05', label:'Keys in hand — and we\'re still here', icon:'🔑' },
]

const WHY = [
  { icon:'🏆', title:'Award-Winning Agency',   desc:'Recognised as one of Nairobi\'s top boutique real estate firms for client satisfaction and transaction integrity.' },
  { icon:'🔑', title:'Off-Market Access',       desc:'Our exclusive network gives you access to properties that are never publicly listed.' },
  { icon:'⚖️', title:'Legal Expertise',         desc:'Every transaction is supported by top-tier property lawyers for clean, risk-free transfers.' },
  { icon:'📊', title:'Data-Driven Pricing',     desc:'We use live market data and comparable sales to ensure you never overpay or undersell.' },
  { icon:'🌍', title:'Diaspora Specialists',    desc:'We handle the entire process remotely — so you can buy or sell from anywhere in the world.' },
  { icon:'🤝', title:'No Hidden Fees',          desc:'Transparent fee structure disclosed upfront. No surprises, no commissions buried in the fine print.' },
]

const ALL_SERVICES = [
  ...PROPERTY_SERVICES,
  { num:'07', title:'Chauffeur & Airport Transfers', sub:'Arrive in Style', link:'/contact' },
]

const Services = () => (
  <div style={{ fontFamily:"'DM Sans',sans-serif", background:'#F9F7F4', color:'#1a1a1a' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      .serif{font-family:'Cormorant Garamond',Georgia,serif;}
      .fade{animation:fadeUp .7s ease both;}
      @keyframes fadeUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
      .svc-img{transition:transform .6s ease;}
      .svc-card:hover .svc-img{transform:scale(1.04);}
      .why-card{transition:border-color .3s,box-shadow .3s;}
      .why-card:hover{border-color:rgba(139,115,85,.4)!important;box-shadow:0 6px 30px rgba(0,0,0,.05);}
      .cta-btn{transition:all .2s;}
      .cta-btn:hover{background:#8B7355!important;border-color:#8B7355!important;color:#fff!important;}
      .cta-btn-outline:hover{background:#1a1a1a!important;color:#fff!important;}
      .hero-pill{transition:all .2s;}
      .hero-pill:hover{border-color:#8B7355!important;color:#8B7355!important;}
      /* Journey step hover */
      .journey-step{transition:background .25s;}
      .journey-step:hover{background:rgba(139,115,85,.08)!important;}
      /* Airport code hover */
      .airport-card{transition:border-color .25s,background .25s;}
      .airport-card:hover{border-color:#8B7355!important;background:rgba(139,115,85,.06)!important;}
      /* Chauffeur hero */
      .chauffeur-img{transition:transform 8s ease;}
      .chauffeur-wrap:hover .chauffeur-img{transform:scale(1.06);}
      @media(max-width:1024px){.why-grid{grid-template-columns:repeat(3,1fr)!important;}.journey-grid{grid-template-columns:repeat(3,1fr)!important;}}
      @media(max-width:768px){
        .hero-pad{padding:140px 5vw 80px!important;}
        .sec-pad{padding:72px 5vw!important;}
        .svc-row{flex-direction:column!important;}
        .svc-row.rev{flex-direction:column!important;}
        .svc-img-wrap{width:100%!important;height:280px!important;flex-shrink:unset!important;}
        .svc-content{padding:32px 24px!important;}
        .why-grid{grid-template-columns:1fr 1fr!important;}
        .cta-bar{flex-direction:column!important;align-items:flex-start!important;}
        .feat-list{columns:1!important;}
        .chauffeur-inner{grid-template-columns:1fr!important;}
        .chauffeur-img-col{height:300px!important;}
        .journey-grid{grid-template-columns:1fr 1fr!important;}
        .airport-grid{grid-template-columns:repeat(3,1fr)!important;}
        .pivot-cols{grid-template-columns:1fr!important;gap:40px!important;}
        .pivot-steps{flex-direction:column!important;gap:0!important;}
        .pivot-step::after{display:none!important;}
      }
      @media(max-width:640px){
        .hero-pad{padding:130px 4vw 64px!important;}
        .sec-pad{padding:56px 4vw!important;}
        .why-grid{grid-template-columns:1fr 1fr!important;}
        .svc-num{font-size:80px!important;}
        .journey-grid{grid-template-columns:1fr!important;}
        .airport-grid{grid-template-columns:1fr 1fr!important;}
      }
      @media(max-width:420px){.why-grid{grid-template-columns:1fr!important;}.airport-grid{grid-template-columns:1fr 1fr!important;}}
      @media(prefers-reduced-motion:reduce){.fade,.svc-img,.why-card,.chauffeur-img{animation:none!important;transition:none!important;}}
    `}</style>

    {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
    <header className="hero-pad" style={{ position:'relative', padding:'168px 6vw 96px', background:'#1a1a1a', overflow:'hidden' }}>
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80" alt="" aria-hidden="true" fetchpriority="high" decoding="sync"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.08 }} />
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 30% 60%, rgba(139,115,85,.15) 0%, transparent 55%)', pointerEvents:'none' }} aria-hidden="true" />
      <div style={{ position:'relative', zIndex:1, maxWidth:1400, margin:'0 auto' }}>
        <div className="fade" style={{ display:'flex', alignItems:'center', gap:16, marginBottom:28 }}>
          <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
          <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>What We Do</p>
        </div>
        <h1 className="fade serif" style={{ fontSize:'clamp(46px,7vw,90px)', fontWeight:300, color:'#fff', lineHeight:.9, letterSpacing:'-.03em', marginBottom:28, animationDelay:'.1s' }}>
          Our<br /><em style={{ color:'#c9a97a' }}>Services</em>
        </h1>
        <p className="fade" style={{ fontSize:16, color:'rgba(255,255,255,.5)', maxWidth:540, lineHeight:1.8, fontWeight:300, marginBottom:16, animationDelay:'.2s' }}>
          From the moment your flight lands to the day you receive your keys — we are with you at every step. A full-service real estate firm built around your entire journey.
        </p>
        {/* Journey tagline */}
        <p className="fade serif" style={{ fontSize:14, color:'rgba(255,255,255,.28)', fontStyle:'italic', marginBottom:48, letterSpacing:'.04em', animationDelay:'.25s' }}>
          Airport transfers · Property search · Sale & legal · Ongoing management
        </p>
        <div className="fade" style={{ display:'flex', gap:8, flexWrap:'wrap', animationDelay:'.3s' }}>
          {ALL_SERVICES.map(s => (
            <a key={s.num} href={`#service-${s.num}`} className="hero-pill"
              style={{ padding:'8px 18px', border:'1px solid rgba(255,255,255,.15)', color:'rgba(255,255,255,.55)', fontSize:11, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', textDecoration:'none', background:'transparent' }}>
              {s.title}
            </a>
          ))}
        </div>
      </div>
      <div style={{ position:'absolute', bottom:40, right:'6vw', display:'flex', flexDirection:'column', alignItems:'center', gap:8 }} aria-hidden="true">
        <p style={{ color:'rgba(255,255,255,.2)', fontSize:9, letterSpacing:'.25em', textTransform:'uppercase', writingMode:'vertical-lr' }}>Scroll</p>
        <div style={{ width:1, height:40, background:'rgba(255,255,255,.12)' }} />
      </div>
    </header>

    {/* ══ PROPERTY SERVICES — alternating layout ════════════════════════════ */}
    {PROPERTY_SERVICES.map((svc, i) => {
      const rev = i % 2 === 1
      return (
        <section key={svc.num} id={`service-${svc.num}`} className="sec-pad svc-card"
          style={{ padding:'0', background: i%2===0 ? '#fff' : '#F9F7F4', borderBottom:'1px solid #F0EDE8' }}>
          <div style={{ maxWidth:1400, margin:'0 auto' }}>
            <div className={`svc-row${rev?' rev':''}`} style={{ display:'flex', flexDirection:rev?'row-reverse':'row', minHeight:480 }}>
              {/* Image */}
              <div className="svc-img-wrap" style={{ width:'45%', flexShrink:0, overflow:'hidden', background:'#F0EDE8', position:'relative' }}>
                <img src={svc.img} alt={svc.title} className="svc-img" loading="lazy" decoding="async"
                  style={{ width:'100%', height:'100%', objectFit:'cover', position:'absolute', inset:0, display:'block' }} />
                <div style={{ position:'absolute', top:24, left:24 }}>
                  <span style={{ background:'#1a1a1a', color:'#fff', padding:'5px 14px', fontSize:9, letterSpacing:'.18em', textTransform:'uppercase', fontWeight:700 }}>{svc.sub}</span>
                </div>
              </div>
              {/* Content */}
              <div className="svc-content" style={{ flex:1, padding:'56px 60px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
                <p className="svc-num serif" style={{ fontSize:100, fontWeight:300, color:'#F0EDE8', lineHeight:1, marginBottom:0, marginTop:-20 }} aria-hidden="true">{svc.num}</p>
                <h2 className="serif" style={{ fontSize:'clamp(28px,3.5vw,48px)', fontWeight:300, lineHeight:1.05, letterSpacing:'-.02em', marginTop:-16, marginBottom:16, color:'#1a1a1a' }}>
                  {svc.title}
                </h2>
                <p style={{ fontSize:14, color:'#666', lineHeight:1.8, fontWeight:300, marginBottom:28, maxWidth:480 }}>{svc.desc}</p>
                <ul className="feat-list" style={{ columns:2, columnGap:24, listStyle:'none', padding:0, marginBottom:36 }}>
                  {svc.features.map(f => (
                    <li key={f} style={{ fontSize:12, color:'#888', lineHeight:1.7, fontWeight:400, paddingLeft:16, position:'relative', breakInside:'avoid', marginBottom:6 }}>
                      <span style={{ position:'absolute', left:0, top:7, width:4, height:4, background:'#8B7355', borderRadius:'50%' }} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={svc.link} className="cta-btn"
                  style={{ display:'inline-flex', alignItems:'center', gap:10, alignSelf:'flex-start', padding:'12px 28px', background:'#1a1a1a', color:'#fff', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #1a1a1a' }}>
                  {svc.cta} <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )
    })}

    {/* ══ PIVOT SECTION — "Your journey starts before you even arrive" ══════ */}
    <section style={{ background:'#111010', padding:'96px 6vw', position:'relative', overflow:'hidden' }}>
      {/* Subtle texture */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(ellipse at 70% 50%, rgba(139,115,85,.1) 0%, transparent 60%)', pointerEvents:'none' }} aria-hidden="true" />
      <div style={{ maxWidth:1400, margin:'0 auto', position:'relative', zIndex:1 }}>
        {/* Header */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start', marginBottom:72 }} className="pivot-cols">
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:24 }}>
              <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
              <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>The Full Experience</p>
            </div>
            <h2 className="serif" style={{ fontSize:'clamp(32px,4.5vw,64px)', fontWeight:300, color:'#fff', lineHeight:.95, letterSpacing:'-.03em' }}>
              Your journey begins<br /><em style={{ color:'#c9a97a' }}>before you arrive</em>
            </h2>
          </div>
          <div style={{ paddingTop:8 }}>
            <p style={{ fontSize:16, color:'rgba(255,255,255,.45)', lineHeight:1.85, fontWeight:300, marginBottom:24 }}>
              Most agencies wait for you to walk through the door. We don't. We meet you at the gate, drive you in comfort to your first viewing, and stay with you through every decision — from landing to handover.
            </p>
            <p style={{ fontSize:14, color:'rgba(255,255,255,.28)', lineHeight:1.75, fontWeight:300 }}>
              Our chauffeur and airport transfer service is an extension of the same care and discretion we bring to every property transaction. One team. One standard. End to end.
            </p>
          </div>
        </div>

        {/* Journey steps */}
        <div className="pivot-steps" style={{ display:'flex', alignItems:'stretch', gap:0, borderTop:'1px solid rgba(255,255,255,.06)' }}>
          {JOURNEY_STEPS.map((step, i) => (
            <div key={step.step} className="journey-step" style={{
              flex:1,
              padding:'32px 28px',
              borderRight: i < JOURNEY_STEPS.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none',
              position:'relative',
              background:'transparent',
            }}>
              <p className="serif" style={{ fontSize:11, color:'rgba(255,255,255,.2)', letterSpacing:'.2em', marginBottom:16 }}>—{step.step}</p>
              <p style={{ fontSize:22, marginBottom:14 }}>{step.icon}</p>
              <p style={{ fontSize:13, color:'rgba(255,255,255,.55)', lineHeight:1.65, fontWeight:300 }}>{step.label}</p>
              {/* Gold dot at top right */}
              {i === 2 && (
                <div style={{ position:'absolute', top:20, right:20, width:6, height:6, borderRadius:'50%', background:'#8B7355' }} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ CHAUFFEUR SERVICE — full premium treatment ════════════════════════ */}
    <section id="service-07" style={{ background:'#F9F7F4', padding:'0' }}>

      {/* Full-bleed image hero */}
      <div className="chauffeur-wrap" style={{ position:'relative', height:'62vh', minHeight:480, overflow:'hidden', background:'#0e0e0e' }}>
        <img
          src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1920&q=80"
          alt="Luxury chauffeur vehicle — HavenRise airport transfer service"
          className="chauffeur-img"
          loading="lazy" decoding="async"
          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', opacity:.7, transformOrigin:'center center' }}
        />
        {/* Gradient overlay — heavier on left */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(10,8,6,.88) 0%, rgba(10,8,6,.55) 50%, rgba(10,8,6,.15) 100%)' }} aria-hidden="true" />

        {/* Overlay content */}
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', padding:'0 6vw' }}>
          <div style={{ maxWidth:1400, width:'100%', margin:'0 auto' }}>
            <div style={{ maxWidth:580 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <span style={{ background:'#8B7355', color:'#fff', padding:'5px 14px', fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', fontWeight:700 }}>Service 07</span>
                <span style={{ fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', fontWeight:500 }}>Arrive in Style</span>
              </div>
              <h2 className="serif" style={{ fontSize:'clamp(36px,5vw,72px)', fontWeight:300, color:'#fff', lineHeight:.92, letterSpacing:'-.03em', marginBottom:20 }}>
                Chauffeur &<br /><em style={{ color:'#c9a97a' }}>Airport Transfers</em>
              </h2>
              <p style={{ fontSize:15, color:'rgba(255,255,255,.55)', lineHeight:1.8, fontWeight:300, marginBottom:36, maxWidth:460 }}>
                First impressions matter. Whether you're landing at JKIA or flying into Mombasa for a coastal property viewing — we are already waiting, so you can step off the plane and into your journey.
              </p>
              <Link to="/contact" className="cta-btn"
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'14px 32px', background:'#8B7355', color:'#fff', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #8B7355' }}>
                Book a Transfer <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Details panel below the hero image */}
      <div style={{ background:'#fff', borderTop:'3px solid #8B7355' }}>
        <div style={{ maxWidth:1400, margin:'0 auto', padding:'64px 6vw' }}>

          {/* Two-column: features + airports */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, marginBottom:64 }} className="pivot-cols">

            {/* Left — what's included */}
            <div>
              <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'#8B7355', fontWeight:600, marginBottom:20 }}>What's Included</p>
              <ul style={{ listStyle:'none', padding:0 }}>
                {[
                  { label:'Meet & greet at arrivals', detail:'Uniformed driver with name board — no hunting for your ride.' },
                  { label:'Flight tracking', detail:'We adjust for early or delayed arrivals automatically.' },
                  { label:'Luxury fleet', detail:'Executive saloons and spacious SUVs, all immaculately presented.' },
                  { label:'Property viewing tours', detail:'Multi-stop tours across Nairobi neighbourhoods on request.' },
                  { label:'Corporate & VIP packages', detail:'Ongoing contract rates for regular clients and investor groups.' },
                  { label:'24 / 7 availability', detail:'Advance booking or short-notice — we make it work.' },
                ].map((item, i) => (
                  <li key={i} style={{ display:'flex', gap:16, paddingBottom:20, marginBottom:20, borderBottom: i < 5 ? '1px solid #F0EDE8' : 'none', alignItems:'flex-start' }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#8B7355', marginTop:7, flexShrink:0 }} aria-hidden="true" />
                    <div>
                      <p style={{ fontSize:13, fontWeight:600, color:'#1a1a1a', marginBottom:3 }}>{item.label}</p>
                      <p style={{ fontSize:12, color:'#999', lineHeight:1.65, fontWeight:300 }}>{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — airports + booking note */}
            <div>
              <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'#8B7355', fontWeight:600, marginBottom:20 }}>Airports We Cover</p>
              <div className="airport-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:40 }}>
                {AIRPORTS.map(a => (
                  <div key={a.code} className="airport-card"
                    style={{ padding:'20px 16px', border:'1px solid #E8E4DF', textAlign:'center', cursor:'default' }}>
                    <p className="serif" style={{ fontSize:26, fontWeight:300, color:'#1a1a1a', lineHeight:1, marginBottom:4 }}>{a.code}</p>
                    <p style={{ fontSize:11, fontWeight:600, color:'#8B7355', letterSpacing:'.08em', marginBottom:2 }}>{a.name}</p>
                    <p style={{ fontSize:10, color:'#bbb', fontWeight:300 }}>{a.city}</p>
                  </div>
                ))}
                {/* "All Kenya" catch-all card */}
                <div className="airport-card"
                  style={{ padding:'20px 16px', border:'1px solid #E8E4DF', textAlign:'center', background:'#F9F7F4', cursor:'default', gridColumn:'span 2' }}>
                  <p style={{ fontSize:11, fontWeight:600, color:'#8B7355', letterSpacing:'.08em', marginBottom:4 }}>+ All Kenya Airports</p>
                  <p style={{ fontSize:11, color:'#aaa', fontWeight:300, lineHeight:1.5 }}>Any airport in Kenya covered — contact us for custom arrangements</p>
                </div>
              </div>

              {/* Quote / assurance block */}
              <blockquote style={{ borderLeft:'2px solid #8B7355', paddingLeft:20 }}>
                <p className="serif" style={{ fontSize:18, fontWeight:300, color:'#555', lineHeight:1.65, fontStyle:'italic', marginBottom:10 }}>
                  "We don't just pick you up. We make the first hour of your Nairobi experience as smooth as the last."
                </p>
                <p style={{ fontSize:11, color:'#8B7355', letterSpacing:'.1em', textTransform:'uppercase', fontWeight:600 }}>— The HavenRise Team</p>
              </blockquote>
            </div>
          </div>

          {/* Bottom CTA bar within chauffeur section */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:24, padding:'36px 40px', background:'#F9F7F4', borderTop:'1px solid #E8E4DF' }}>
            <div>
              <p style={{ fontSize:13, fontWeight:600, color:'#1a1a1a', marginBottom:4 }}>Arriving in Nairobi?</p>
              <p style={{ fontSize:12, color:'#999', fontWeight:300 }}>Book your transfer at least 12 hours in advance for guaranteed availability.</p>
            </div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <Link to="/contact" className="cta-btn"
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'12px 24px', background:'#8B7355', color:'#fff', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #8B7355' }}>
                Book Transfer <Arrow />
              </Link>
              <a href="tel:+254728686089" className="cta-btn-outline"
                style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'12px 24px', background:'transparent', color:'#1a1a1a', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #1a1a1a', transition:'all .2s' }}>
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══ WHY HAVENRISE ════════════════════════════════════════════════════ */}
    <section className="sec-pad" style={{ padding:'96px 6vw', background:'#1a1a1a' }} aria-labelledby="why-heading">
      <div style={{ maxWidth:1400, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:16 }}>
          <div style={{ width:32, height:1, background:'#8B7355' }} aria-hidden="true" />
          <p style={{ fontSize:10, letterSpacing:'.25em', textTransform:'uppercase', color:'#8B7355', fontWeight:600 }}>Why Choose Us</p>
        </div>
        <h2 id="why-heading" className="serif" style={{ fontSize:'clamp(32px,4vw,58px)', fontWeight:300, color:'#fff', lineHeight:.95, letterSpacing:'-.03em', marginBottom:56 }}>
          The HavenRise<br /><em>Difference</em>
        </h2>
        <div className="why-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:2 }}>
          {WHY.map(w => (
            <div key={w.title} className="why-card" style={{ padding:'28px 22px', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)' }}>
              <span style={{ fontSize:28, display:'block', marginBottom:16 }} aria-hidden="true">{w.icon}</span>
              <h3 style={{ fontSize:14, fontWeight:600, color:'#fff', marginBottom:10, lineHeight:1.3 }}>{w.title}</h3>
              <p style={{ fontSize:12, color:'rgba(255,255,255,.38)', lineHeight:1.75, fontWeight:300 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══ CTA STRIP ════════════════════════════════════════════════════════ */}
    <section style={{ background:'#F0EDE8', padding:'64px 6vw', borderTop:'1px solid #E8E4DF' }}>
      <div className="cta-bar" style={{ maxWidth:1400, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:28 }}>
        <div>
          <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'#8B7355', fontWeight:600, marginBottom:10 }}>Ready to begin?</p>
          <h3 className="serif" style={{ fontSize:'clamp(24px,3vw,40px)', fontWeight:300, letterSpacing:'-.02em', lineHeight:1.05 }}>
            Talk to Us About<br /><em>Your Property Goals</em>
          </h3>
        </div>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#1a1a1a', color:'#fff', padding:'14px 28px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none' }}>
            Get In Touch <Arrow />
          </Link>
          <Link to="/properties" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'transparent', color:'#1a1a1a', padding:'14px 28px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #1a1a1a' }}>
            Browse Properties <Arrow />
          </Link>
        </div>
      </div>
    </section>
  </div>
)

export default Services