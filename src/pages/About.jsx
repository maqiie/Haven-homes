import { Link } from 'react-router-dom'

const Arrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
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

const TEAM = [
  {
    name: 'Sarah Kimani',
    role: 'Founder & CEO',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'David Ochieng',
    role: 'Head of Sales',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    name: 'Amina Hassan',
    role: 'Property Advisor',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
]

function About() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F7F4', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .fade { animation: fadeUp .7s ease both; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .val-card {
          border: 1px solid #E8E4DF;
          transition: border-color .3s, box-shadow .3s;
        }
        .val-card:hover {
          border-color: rgba(139,115,85,.45);
          box-shadow: 0 6px 30px rgba(0,0,0,.05);
        }
        .team-img { transition: transform .5s ease; }
        .team-card:hover .team-img { transform: scale(1.04); }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 300;
          color: #fff;
          line-height: 1;
          letter-spacing: -.03em;
        }
        .about-cta-btn { transition: background .2s, border-color .2s; }
        .about-cta-btn:hover { background: #8B7355 !important; border-color: #8B7355 !important; }
        .about-cta-outline:hover { background: rgba(255,255,255,.05) !important; }

        @media (max-width: 768px) {
          .hero-pad    { padding: 140px 5vw 80px !important; }
          .sec-pad     { padding: 72px 5vw !important; }
          .mission-grid { flex-direction: column !important; }
          .mission-img  { width: 100% !important; height: 300px !important; }
          .val-grid    { grid-template-columns: 1fr 1fr !important; }
          .stat-grid   { grid-template-columns: 1fr 1fr !important; }
          .team-grid   { grid-template-columns: 1fr 1fr !important; }
          .cta-bar     { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 520px) {
          .val-grid    { grid-template-columns: 1fr !important; }
          .team-grid   { grid-template-columns: 1fr !important; }
          .stat-grid   { grid-template-columns: 1fr 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fade, .team-img, .val-card { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="hero-pad" style={{ position: 'relative', padding: '168px 6vw 96px', background: '#1a1a1a', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt=""
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .1 }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 30% 60%, rgba(139,115,85,.15) 0%, transparent 55%)', pointerEvents: 'none' }} aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto' }}>
          <div className="fade" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Our Story</p>
          </div>
          <h1 className="fade serif" style={{ fontSize: 'clamp(46px,7vw,90px)', fontWeight: 300, color: '#fff', lineHeight: .9, letterSpacing: '-.03em', marginBottom: 28, animationDelay: '.1s' }}>
            About<br /><em style={{ color: '#c9a97a' }}>HavenRise</em>
          </h1>
          <p className="fade" style={{ fontSize: 16, color: 'rgba(255,255,255,.5)', maxWidth: 520, lineHeight: 1.8, fontWeight: 300, animationDelay: '.2s' }}>
            Nairobi's premier real estate agency — redefining luxury property with trust, expertise, and a relentless commitment to our clients.
          </p>
        </div>

        <div style={{ position: 'absolute', bottom: 40, right: '6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }} aria-hidden="true">
          <p style={{ color: 'rgba(255,255,255,.2)', fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', writingMode: 'vertical-lr' }}>Scroll</p>
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,.12)' }} />
        </div>
      </header>

      {/* ── MISSION ──────────────────────────────────────── */}
      <section className="sec-pad" style={{ padding: '96px 6vw', background: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="mission-grid" style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
            {/* Image */}
            <div className="mission-img" style={{ width: '48%', flexShrink: 0, aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80"
                alt="HavenRise property"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Accent border */}
              <div style={{ position: 'absolute', bottom: -16, right: -16, width: '60%', height: '60%', border: '1px solid #8B7355', zIndex: -1 }} aria-hidden="true" />
              {/* Tag */}
              <div style={{ position: 'absolute', top: 24, left: 24, background: '#1a1a1a', color: '#fff', padding: '5px 14px', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 700 }}>
                Est. 2014
              </div>
            </div>
            {/* Copy */}
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true" />
                <p style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Our Mission</p>
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-.02em', marginBottom: 24, color: '#1a1a1a' }}>
                Where Every Client<br /><em>Finds Their Place</em>
              </h2>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: 20 }}>
                At HavenRise, we believe that finding the right property is one of life's most significant milestones. Founded in Nairobi, we've grown into the city's most trusted boutique real estate agency — connecting buyers, renters, and investors with properties that truly fit their lives.
              </p>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.9, fontWeight: 300, marginBottom: 36 }}>
                We combine deep local market knowledge, a curated off-market network, and exceptional personal service to deliver an experience that goes far beyond the transaction. From Westlands to Lavington, Kilimani to the Coast — we are with you every step of the way.
              </p>
              <Link
                to="/contact"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#1a1a1a', color: '#fff', padding: '12px 28px', fontSize: 11, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #1a1a1a' }}
                className="about-cta-btn"
              >
                Get in Touch <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section style={{ background: '#1a1a1a', padding: '72px 6vw', borderTop: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2 }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{ padding: '40px 32px', background: i % 2 === 0 ? 'rgba(255,255,255,.03)' : 'rgba(139,115,85,.07)', borderLeft: '1px solid rgba(255,255,255,.06)', textAlign: 'center' }}>
                <p className="stat-num">{s.value}</p>
                <p style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', fontWeight: 500, marginTop: 10 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY HAVENRISE ────────────────────────────────── */}
      <section className="sec-pad" style={{ padding: '96px 6vw', background: '#F9F7F4' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Why Choose Us</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20 }}>
            <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,58px)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.03em' }}>
              The HavenRise<br /><em>Difference</em>
            </h2>
            <p style={{ fontSize: 13, color: '#888', maxWidth: 320, lineHeight: 1.8, fontWeight: 300 }}>
              Six pillars that set us apart in Nairobi's competitive real estate market.
            </p>
          </div>
          <div className="val-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {VALUES.map(v => (
              <div key={v.num} className="val-card" style={{ padding: '36px 32px', background: '#fff' }}>
                <p className="serif" style={{ fontSize: 48, fontWeight: 300, color: '#F0EDE8', lineHeight: 1, marginBottom: -8 }} aria-hidden="true">{v.num}</p>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1a1a1a', marginBottom: 12, marginTop: 4 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: '#888', lineHeight: 1.8, fontWeight: 300 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <section className="sec-pad" style={{ padding: '96px 6vw', background: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>The People</p>
          </div>
          <h2 className="serif" style={{ fontSize: 'clamp(32px,4vw,58px)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.03em', marginBottom: 56 }}>
            Meet the<br /><em>Team</em>
          </h2>
          <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {TEAM.map(m => (
              <div key={m.name} className="team-card" style={{ overflow: 'hidden', background: '#F9F7F4', border: '1px solid #F0EDE8' }}>
                <div style={{ height: 320, overflow: 'hidden' }}>
                  <img src={m.img} alt={m.name} className="team-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '24px 28px', borderTop: '1px solid #F0EDE8' }}>
                  <h3 className="serif" style={{ fontSize: 22, fontWeight: 400, color: '#1a1a1a', marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 500 }}>{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section style={{ background: '#F0EDE8', padding: '64px 6vw', borderTop: '1px solid #E8E4DF' }}>
        <div className="cta-bar" style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 28 }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 10 }}>Ready to begin?</p>
            <h3 className="serif" style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 300, letterSpacing: '-.02em', lineHeight: 1.05 }}>
              Find Your Dream<br /><em>Property Today</em>
            </h3>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              to="/properties"
              className="about-cta-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#1a1a1a', color: '#fff', padding: '14px 28px', fontSize: 11, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #1a1a1a' }}
            >
              Browse Properties <Arrow />
            </Link>
            <Link
              to="/contact"
              className="about-cta-btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'transparent', color: '#1a1a1a', padding: '14px 28px', fontSize: 11, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid #1a1a1a' }}
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