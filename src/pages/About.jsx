import { Link } from 'react-router-dom'

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)
const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const STATS = [
  { value: '500+', label: 'Properties Listed' },
  { value: '300+', label: 'Happy Clients' },
  { value: '10+',  label: 'Years Experience' },
  { value: '7',    label: 'Services Offered' },
]

const VALUES = [
  {
    num: '01',
    title: 'Trusted Expertise',
    desc: 'Years of industry experience helping clients make confident property decisions across Nairobi and beyond.',
  },
  {
    num: '02',
    title: 'Premium Listings',
    desc: 'Carefully curated properties that meet modern lifestyle standards — including exclusive off-market opportunities.',
  },
  {
    num: '03',
    title: 'Client-First Approach',
    desc: 'Transparent communication and personalised support from first enquiry through to final handover.',
  },
  {
    num: '04',
    title: 'Diaspora Specialists',
    desc: 'We handle the entire buying or selling process remotely, so you can transact from anywhere in the world.',
  },
  {
    num: '05',
    title: 'Legal Integrity',
    desc: 'Every transaction is backed by top-tier property lawyers ensuring clean, risk-free title transfers.',
  },
  {
    num: '06',
    title: 'No Hidden Fees',
    desc: 'Our fee structure is disclosed upfront. No surprises, no commissions buried in the fine print.',
  },
]

function About() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F7F4', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Fade in ── */
        .fade-up { animation: fadeUp .8s cubic-bezier(.22,1,.36,1) both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Hero overlay grain ── */
        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 180px;
          pointer-events: none;
          z-index: 2;
          mix-blend-mode: overlay;
        }

        /* ── Stat item ── */
        .stat-item {
          position: relative;
          padding: 48px 40px;
          border-bottom: 1px solid rgba(255,255,255,.06);
          transition: background .3s;
        }
        .stat-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 2px; height: 0;
          background: #8B7355;
          transition: height .4s cubic-bezier(.22,1,.36,1);
        }
        .stat-item:hover::before { height: 100%; }
        .stat-item:hover { background: rgba(139,115,85,.06); }

        /* ── Value card ── */
        .val-card {
          position: relative;
          padding: 40px 36px;
          background: #fff;
          border: 1px solid #EEEBE6;
          overflow: hidden;
          transition: border-color .35s, box-shadow .35s, transform .35s;
        }
        .val-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #8B7355, #c9a97a);
          transition: width .4s cubic-bezier(.22,1,.36,1);
        }
        .val-card:hover { border-color: rgba(139,115,85,.3); box-shadow: 0 12px 48px rgba(0,0,0,.06); transform: translateY(-3px); }
        .val-card:hover::after { width: 100%; }

        /* ── Mission image ── */
        .mission-img-wrap { position: relative; overflow: hidden; }
        .mission-img-wrap img { transition: transform .8s cubic-bezier(.22,1,.36,1); display: block; }
        .mission-img-wrap:hover img { transform: scale(1.04); }

        /* ── CTA buttons ── */
        .btn-dark { transition: background .2s, color .2s, border-color .2s; }
        .btn-dark:hover { background: #8B7355 !important; border-color: #8B7355 !important; }
        .btn-outline { transition: background .2s, color .2s; }
        .btn-outline:hover { background: #1a1a1a !important; color: #fff !important; }

        /* ── Marquee strip ── */
        .marquee-track {
          display: flex;
          gap: 0;
          animation: marquee 28s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .mission-flex { flex-direction: column !important; }
          .mission-img-col { width: 100% !important; height: 360px !important; }
          .val-grid { grid-template-columns: 1fr 1fr !important; }
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-inner { flex-direction: column !important; align-items: flex-start !important; gap: 36px !important; }
          .cta-divider { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #D8D3CC; padding-top: 28px !important; width: 100% !important; }
        }
        @media (max-width: 560px) {
          .val-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(52px, 14vw, 90px) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fade-up, .mission-img-wrap img, .val-card, .marquee-track { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <header
        className="hero-grain"
        style={{
          position: 'relative',
          padding: 'clamp(120px, 14vw, 200px) 6vw clamp(80px, 8vw, 120px)',
          background: '#111',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        {/* BG image */}
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .12 }}
        />
        {/* Gradient vignette */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(139,115,85,.18) 0%, transparent 50%), linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 60%)' }} />

        {/* Gold accent line — top left */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: '6vw', width: 1, height: '28%', background: 'linear-gradient(to bottom, transparent, #8B7355)' }} />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          {/* Eyebrow */}
          <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div style={{ width: 40, height: 1, background: '#8B7355' }} />
            <span style={{ fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Est. 2014 · Nairobi</span>
          </div>

          {/* Title */}
          <h1
            className="fade-up serif hero-title"
            style={{
              fontSize: 'clamp(64px, 10vw, 128px)',
              fontWeight: 300,
              color: '#fff',
              lineHeight: .88,
              letterSpacing: '-.04em',
              marginBottom: 36,
              animationDelay: '.1s',
            }}
          >
            About<br />
            <em style={{ color: '#c9a97a', fontStyle: 'italic' }}>HavenRise</em>
          </h1>

          {/* Sub + pill row */}
          <div className="fade-up" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, animationDelay: '.2s' }}>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.45)', maxWidth: 480, lineHeight: 1.8, fontWeight: 300 }}>
              Nairobi's premier real estate agency — redefining luxury property with trust, expertise, and a relentless commitment to our clients.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['Luxury', 'Off-Plan', 'Diaspora'].map(tag => (
                <span key={tag} style={{ padding: '6px 16px', border: '1px solid rgba(255,255,255,.15)', color: 'rgba(255,255,255,.4)', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 500 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 40, right: '6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <span style={{ color: 'rgba(255,255,255,.18)', fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', writingMode: 'vertical-lr' }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,.15), transparent)' }} />
        </div>
      </header>

      {/* ══════════════════════════ MARQUEE ══════════════════════════ */}
      <div style={{ background: '#8B7355', overflow: 'hidden', padding: '13px 0', borderTop: '1px solid rgba(0,0,0,.08)' }} aria-hidden="true">
        <div className="marquee-track">
          {Array(2).fill(['Luxury Homes', 'Off-Plan Projects', 'Diaspora Services', 'Secure Transactions', 'Premium Rentals', 'Land & Plots', 'Expert Advice', 'Trusted Since 2014']).flat().map((t, i) => (
            <span key={i} style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)', fontWeight: 600, padding: '0 40px' }}>
              {t} <span style={{ color: 'rgba(255,255,255,.3)', marginLeft: 40 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════ MISSION ══════════════════════════ */}
      <section style={{ padding: 'clamp(72px,8vw,112px) 6vw', background: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="mission-flex" style={{ display: 'flex', gap: 'clamp(40px,6vw,96px)', alignItems: 'center' }}>

            {/* Image col */}
            <div className="mission-img-col mission-img-wrap" style={{ width: '46%', flexShrink: 0, height: 540, position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80"
                alt="HavenRise property"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Corner bracket */}
              <div aria-hidden="true" style={{ position: 'absolute', bottom: -20, right: -20, width: '55%', height: '55%', border: '1px solid #8B7355', zIndex: -1 }} />
              {/* Year badge */}
              <div style={{ position: 'absolute', top: 28, left: 28, background: 'rgba(17,17,17,.92)', backdropFilter: 'blur(6px)', color: '#fff', padding: '7px 18px', fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 700 }}>
                Est. 2014
              </div>
              {/* Gold accent line */}
              <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: -12, width: 2, height: '40%', background: 'linear-gradient(to bottom, #8B7355, transparent)' }} />
            </div>

            {/* Copy col */}
            <div style={{ flex: 1, maxWidth: 520 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1, background: '#8B7355' }} />
                <p style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Our Mission</p>
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(36px,4.5vw,60px)', fontWeight: 300, lineHeight: 1, letterSpacing: '-.03em', marginBottom: 28, color: '#1a1a1a' }}>
                Where Every Client<br /><em style={{ color: '#8B7355' }}>Finds Their Place</em>
              </h2>
              <div style={{ width: 40, height: 1, background: '#E8E4DF', marginBottom: 28 }} />
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.95, fontWeight: 300, marginBottom: 20 }}>
                At HavenRise, we believe that finding the right property is one of life's most significant milestones. Founded in Nairobi, we've grown into the city's most trusted boutique real estate agency — connecting buyers, renters, and investors with properties that truly fit their lives.
              </p>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.95, fontWeight: 300, marginBottom: 40 }}>
                We combine deep local market knowledge, a curated off-market network, and exceptional personal service to deliver an experience that goes far beyond the transaction. From Westlands to Lavington, Kilimani to the Coast — we are with you every step of the way.
              </p>
              <Link
                to="/contact"
                className="btn-dark"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#1a1a1a', color: '#fff', padding: '14px 32px', fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #1a1a1a' }}
              >
                Get in Touch <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════ STATS ══════════════════════════ */}
      <section style={{ background: '#111', borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="stat-item" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
                <p
                  className="serif"
                  style={{ fontSize: 'clamp(52px,6vw,88px)', fontWeight: 300, color: i % 2 === 0 ? '#fff' : '#c9a97a', lineHeight: 1, letterSpacing: '-.04em' }}
                >
                  {s.value}
                </p>
                <p style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', fontWeight: 500, marginTop: 12 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ WHY HAVENRISE ══════════════════════════ */}
      <section style={{ padding: 'clamp(72px,8vw,112px) 6vw', background: '#F9F7F4' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1, background: '#8B7355' }} />
                <p style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Why Choose Us</p>
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 300, lineHeight: .92, letterSpacing: '-.04em', color: '#1a1a1a' }}>
                The HavenRise<br /><em>Difference</em>
              </h2>
            </div>
            <p style={{ fontSize: 13, color: '#999', maxWidth: 300, lineHeight: 1.85, fontWeight: 300, textAlign: 'right' }}>
              Six pillars that set us apart in Nairobi's competitive real estate market.
            </p>
          </div>

          {/* Grid */}
          <div className="val-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {VALUES.map(v => (
              <div key={v.num} className="val-card">
                <p
                  className="serif"
                  aria-hidden="true"
                  style={{ fontSize: 56, fontWeight: 300, color: '#F0EDE8', lineHeight: 1, marginBottom: -4, letterSpacing: '-.04em' }}
                >
                  {v.num}
                </p>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', marginBottom: 12, marginTop: 8, letterSpacing: '.01em' }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: '#888', lineHeight: 1.85, fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CTA STRIP ══════════════════════════ */}
      <section style={{ background: '#1a1a1a', padding: 'clamp(56px,6vw,80px) 6vw', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle gold glow */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(139,115,85,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="cta-inner" style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, position: 'relative', zIndex: 1 }}>
          {/* Heading */}
          <div>
            <p style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 14 }}>Ready to begin?</p>
            <h3 className="serif" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 300, letterSpacing: '-.03em', lineHeight: 1, color: '#fff' }}>
              Find Your Dream<br /><em style={{ color: '#c9a97a' }}>Property Today</em>
            </h3>
          </div>

          {/* Address */}
          <div className="cta-divider" style={{ borderLeft: '1px solid rgba(255,255,255,.1)', paddingLeft: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <PinIcon />
              <p style={{ fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Our Office</p>
            </div>
            <p className="serif" style={{ fontSize: 20, fontWeight: 400, color: 'rgba(255,255,255,.8)', lineHeight: 1.5, letterSpacing: '-.01em' }}>
              Ciata City Mall, Ridgeways<br />Block B, 2nd Floor
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              to="/properties"
              className="btn-dark"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#8B7355', color: '#fff', padding: '15px 32px', fontSize: 11, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #8B7355' }}
            >
              Browse Properties <Arrow />
            </Link>
            <Link
              to="/contact"
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: 'rgba(255,255,255,.7)', padding: '15px 32px', fontSize: 11, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(255,255,255,.2)' }}
            >
              Get in Touch <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About