import { Link } from 'react-router-dom'

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
)

const SERVICES = [
  {
    num:'01', color:'#8B7355',
    title:'Property Sales',
    sub:'Buy with Confidence',
    desc:'From first viewing to final handover, our sales team guides you through every step. We represent some of Nairobi\'s most exclusive residential listings — with access to off-market properties no one else will show you.',
    features:['Expert property valuation & pricing strategy','Curated shortlisting based on your brief','Negotiation & offer management','Legal coordination through to completion'],
    img:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80',
    cta:'Browse Properties', link:'/properties',
  },
  {
    num:'02', color:'#8B7355',
    title:'Letting & Rentals',
    sub:'Rent Smarter',
    desc:'Whether you\'re seeking a long-term home or a short-term corporate let, we match you with vetted properties that fit your lifestyle and budget — across Westlands, Kilimani, Lavington, and beyond.',
    features:['Fully verified property listings','Tenant screening & lease preparation','Deposit and rent payment management','Move-in inspection & handover support'],
    img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80',
    cta:'View Rentals', link:'/properties',
  },
  {
    num:'03', color:'#8B7355',
    title:'Property Management',
    sub:'Hands-Off Ownership',
    desc:'Own property but don\'t want the hassle? Our management service handles everything — from finding and vetting tenants to coordinating repairs, collecting rent, and providing monthly statements.',
    features:['Tenant sourcing & full background checks','Rent collection & disbursement','Maintenance coordination & contractor network','Monthly reporting & annual accounts'],
    img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80',
    cta:'Learn More', link:'/contact',
  },
  {
    num:'04', color:'#8B7355',
    title:'Property Valuation',
    sub:'Know Your Asset\'s Worth',
    desc:'Accurate, evidence-based valuations for sales, purchases, mortgages, insurance, or legal matters. Our certified valuers assess every property with a comprehensive market analysis and comparable evidence report.',
    features:['Residential & commercial valuations','Mortgage & bank valuation reports','Probate & legal dispute valuations','Portfolio & investment assessments'],
    img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80',
    cta:'Request a Valuation', link:'/contact',
  },
  {
    num:'05', color:'#8B7355',
    title:'Developer Sales & Marketing',
    sub:'Off-Plan Excellence',
    desc:'We design and execute full off-plan sales programmes for residential developers — from show-unit fit-out through to final unit handover. Our buyer network and digital reach ensure faster absorption at better prices.',
    features:['Sales strategy & unit pricing','Show unit design & management','Buyer sourcing, qualification & reservation','Digital marketing & PR campaigns'],
    img:'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80',
    cta:'Partner With Us', link:'/developers',
  },
  {
    num:'06', color:'#8B7355',
    title:'Real Estate Advisory',
    sub:'Strategic Guidance',
    desc:'Investment advisory for individuals, SACCOs, institutions, and diaspora buyers. We provide market analysis, due diligence, acquisition sourcing, and portfolio optimisation to help you build and protect your real estate wealth.',
    features:['Market entry & investment strategy','Due diligence & title verification','Portfolio review & yield optimisation','Diaspora buying & remote transaction support'],
    img:'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=900&q=80',
    cta:'Talk to an Advisor', link:'/contact',
  },
]

const WHY = [
  { icon:'🏆', title:'Award-Winning Agency',   desc:'Recognised as one of Nairobi\'s top boutique real estate firms for client satisfaction and transaction integrity.' },
  { icon:'🔑', title:'Off-Market Access',       desc:'Our exclusive network gives you access to properties that are never publicly listed.' },
  { icon:'⚖️', title:'Legal Expertise',         desc:'Every transaction is supported by top-tier property lawyers for clean, risk-free transfers.' },
  { icon:'📊', title:'Data-Driven Pricing',     desc:'We use live market data and comparable sales to ensure you never overpay or undersell.' },
  { icon:'🌍', title:'Diaspora Specialists',    desc:'We handle the entire process remotely — so you can buy or sell from anywhere in the world.' },
  { icon:'🤝', title:'No Hidden Fees',          desc:'Transparent fee structure disclosed upfront. No surprises, no commissions buried in the fine print.' },
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
      .cta-btn{transition:background .2s;}
      .cta-btn:hover{background:#8B7355!important;border-color:#8B7355!important;}
      .ulink{position:relative;}
      .ulink::after{content:'';position:absolute;left:0;bottom:-2px;width:0;height:1px;background:#8B7355;transition:width .3s;}
      .ulink:hover::after{width:100%;}
      @media(max-width:1024px){.why-grid{grid-template-columns:repeat(3,1fr)!important;}}
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
      }
      @media(max-width:640px){
        .hero-pad{padding:130px 4vw 64px!important;}
        .sec-pad{padding:56px 4vw!important;}
        .why-grid{grid-template-columns:1fr 1fr!important;}
        .svc-num{font-size:80px!important;}
      }
      @media(max-width:420px){.why-grid{grid-template-columns:1fr!important;}}
      @media(prefers-reduced-motion:reduce){.fade,.svc-img,.why-card{animation:none!important;transition:none!important;}}
    `}</style>

    {/* HERO */}
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
        <p className="fade" style={{ fontSize:16, color:'rgba(255,255,255,.5)', maxWidth:520, lineHeight:1.8, fontWeight:300, marginBottom:48, animationDelay:'.2s' }}>
          From first-time buyers to institutional investors — we offer a full spectrum of real estate services tailored to every stage of your property journey.
        </p>
        <div className="fade" style={{ display:'flex', gap:8, flexWrap:'wrap', animationDelay:'.3s' }}>
          {SERVICES.map(s => (
            <a key={s.num} href={`#service-${s.num}`} style={{ padding:'8px 18px', border:'1px solid rgba(255,255,255,.15)', color:'rgba(255,255,255,.55)', fontSize:11, fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', textDecoration:'none', background:'transparent', transition:'all .2s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='#8B7355';e.currentTarget.style.color='#8B7355'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,.15)';e.currentTarget.style.color='rgba(255,255,255,.55)'}}>
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

    {/* SERVICES — alternating layout */}
    {SERVICES.map((svc, i) => {
      const rev = i % 2 === 1
      return (
        <section key={svc.num} id={`service-${svc.num}`} className="sec-pad svc-card" style={{ padding:'0', background: i%2===0?'#fff':'#F9F7F4', borderBottom:'1px solid #F0EDE8' }}>
          <div style={{ maxWidth:1400, margin:'0 auto' }}>
            <div className={`svc-row${rev?' rev':''}`} style={{ display:'flex', flexDirection: rev?'row-reverse':'row', minHeight:480 }}>
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
                      <span style={{ position:'absolute', left:0, top:6, width:4, height:4, background:'#8B7355', borderRadius:'50%' }} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={svc.link} className="cta-btn"
                  style={{ display:'inline-flex', alignItems:'center', gap:10, alignSelf:'flex-start', padding:'12px 28px', background:'#1a1a1a', color:'#fff', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #1a1a1a', transition:'all .2s' }}>
                  {svc.cta} <Arrow />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )
    })}

    {/* WHY HAVENRISE */}
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

    {/* CTA STRIP */}
    <section style={{ background:'#F0EDE8', padding:'64px 6vw', borderTop:'1px solid #E8E4DF' }}>
      <div className="cta-bar" style={{ maxWidth:1400, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:28 }}>
        <div>
          <p style={{ fontSize:10, letterSpacing:'.22em', textTransform:'uppercase', color:'#8B7355', fontWeight:600, marginBottom:10 }}>Ready to begin?</p>
          <h3 className="serif" style={{ fontSize:'clamp(24px,3vw,40px)', fontWeight:300, letterSpacing:'-.02em', lineHeight:1.05 }}>
            Talk to Us About<br /><em>Your Property Goals</em>
          </h3>
        </div>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
          <Link to="/contact" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#1a1a1a', color:'#fff', padding:'14px 28px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none' }}>Get In Touch <Arrow /></Link>
          <Link to="/properties" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'transparent', color:'#1a1a1a', padding:'14px 28px', fontSize:11, fontWeight:600, letterSpacing:'.15em', textTransform:'uppercase', textDecoration:'none', border:'1px solid #1a1a1a' }}>Browse Properties <Arrow /></Link>
        </div>
      </div>
    </section>
  </div>
)

export default Services