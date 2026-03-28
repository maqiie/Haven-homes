import { useState, useCallback } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnjbzqjn'

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', interest: '' })
  const [formStatus, setFormStatus] = useState(null)

  const handleField   = useCallback((key, val) => setFormData(prev => ({ ...prev, [key]: val })), [])
  const handleInterest = useCallback(val => setFormData(prev => ({ ...prev, interest: val })), [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '', interest: '' })
      } else { setFormStatus('error') }
    } catch { setFormStatus('error') }
  }, [formData])

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F7F4', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }

        /* ── Animations ── */
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .fade-in { animation: fadeIn 1s ease both; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

        /* ── Interactions ── */
        input:focus, textarea:focus { outline: none; border-color: #8B7355 !important; background: #FEFCF9 !important; }
        input, textarea { transition: border-color .2s, background .2s; }
        .info-card { transition: border-color .3s, box-shadow .3s, transform .3s; }
        .info-card:hover { border-color: rgba(139,115,85,.5) !important; box-shadow: 0 12px 48px rgba(139,115,85,.10); transform: translateY(-2px); }
        .ulink { position: relative; display: inline-block; }
        .ulink::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:1px; background:#8B7355; transition:width .3s; }
        .ulink:hover::after { width:100%; }
        .interest-btn { transition: all .18s ease; }
        .interest-btn:hover:not(.active) { border-color: #8B7355 !important; color: #8B7355 !important; }
        .soc-icon { transition: background .25s, transform .25s, border-color .25s; }
        .soc-icon:hover { background: #8B7355 !important; transform: translateY(-3px); border-color: #8B7355 !important; }
        .soc-icon:hover svg path { fill: #fff; }
        .submit-btn { transition: background .22s, letter-spacing .22s, box-shadow .22s; }
        .submit-btn:hover:not(:disabled) { background: #8B7355 !important; letter-spacing: .22em !important; box-shadow: 0 8px 32px rgba(139,115,85,.28); }
        .map-wrap { position: relative; overflow: hidden; }
        .map-wrap::after { content:''; position:absolute; inset:0; border:1px solid rgba(139,115,85,.2); pointer-events:none; }
        .cta-link { transition: background .22s, letter-spacing .22s; }
        .cta-link:hover { background: #8B7355 !important; letter-spacing: .2em !important; }
        .pill-tag { display: inline-flex; align-items: center; gap: 6px; padding: 5px 13px; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; font-weight: 700; }

        @media (prefers-reduced-motion: reduce) {
          .fade-up, .fade-in { animation: none !important; }
          .info-card, .interest-btn, .soc-icon, .submit-btn, .cta-link { transition: none !important; }
        }
        @media (max-width: 1024px) {
          .contact-layout { grid-template-columns: 1fr !important; }
          .info-sidebar { display: grid !important; grid-template-columns: 1fr 1fr; gap: 16px; }
          .hours-card, .social-card { grid-column: span 2; }
        }
        @media (max-width: 720px) {
          .info-sidebar { grid-template-columns: 1fr !important; }
          .hours-card, .social-card { grid-column: span 1 !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(42px,11vw,72px) !important; }
          .section-px { padding-left: 5vw !important; padding-right: 5vw !important; }
          .interest-row { grid-template-columns: 1fr 1fr !important; }
          .map-meta { flex-direction: column !important; align-items: flex-start !important; }
          .map-meta address { text-align: left !important; }
        }
        @media (max-width: 480px) {
          .interest-row { grid-template-columns: 1fr !important; }
          .info-card { padding: 22px !important; }
          .soc-row { gap: 10px !important; }
        }
      `}</style>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <header style={{ position: 'relative', height: '78vh', minHeight: 560, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="HavenRise Realty — Ciata City Mall, Ridgeways, Nairobi"
          fetchpriority="high"
          decoding="sync"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Multi-layer overlay for depth */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,8,6,.82) 0%, rgba(10,8,6,.45) 60%, rgba(139,115,85,.12) 100%)' }} aria-hidden="true"/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(249,247,244,1) 100%)' }} aria-hidden="true"/>

        {/* Decorative corner line */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 180, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
          <div style={{ position: 'absolute', top: 40, right: -60, width: 200, height: 1, background: 'rgba(139,115,85,.35)', transform: 'rotate(45deg)' }}/>
          <div style={{ position: 'absolute', top: 60, right: -60, width: 200, height: 1, background: 'rgba(139,115,85,.18)', transform: 'rotate(45deg)' }}/>
        </div>

        <div className="section-px" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 6vw 80px' }}>
          <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, animationDelay: '.1s' }}>
            <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true"/>
            <p style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', fontWeight: 600 }}>Get in Touch</p>
          </div>
          <h1 className="fade-up serif hero-title" style={{ fontSize: 'clamp(50px,8vw,100px)', fontWeight: 300, color: '#fff', lineHeight: .9, letterSpacing: '-.03em', animationDelay: '.18s' }}>
            Let's Find<br />
            <em style={{ color: '#C9A97A', fontStyle: 'italic' }}>Your Home</em>
          </h1>
          <p className="fade-up" style={{ marginTop: 26, fontSize: 15, color: 'rgba(255,255,255,.5)', maxWidth: 380, lineHeight: 1.7, fontWeight: 300, animationDelay: '.32s' }}>
            Our team of experts is standing by — whether you're buying, renting, or simply curious.
          </p>

          {/* Quick contact pills */}
          <div className="fade-up" style={{ display: 'flex', gap: 10, marginTop: 36, flexWrap: 'wrap', animationDelay: '.44s' }}>
            <a href="tel:+254728686089" className="pill-tag"
              style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.14)', color: 'rgba(255,255,255,.7)', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              0728 686 089
            </a>
            <a href="mailto:havenriserealtors@gmail.com" className="pill-tag"
              style={{ background: 'rgba(139,115,85,.2)', border: '1px solid rgba(139,115,85,.35)', color: 'rgba(255,255,255,.75)', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
              Email Us
            </a>
            <span className="pill-tag" style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.45)' }}>
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              Ciata City Mall, Ridgeways
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 88, right: '6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10 }} aria-hidden="true">
          <p style={{ color: 'rgba(255,255,255,.28)', fontSize: 9, letterSpacing: '.28em', textTransform: 'uppercase', writingMode: 'vertical-lr' }}>Scroll</p>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,.2), transparent)' }}/>
        </div>
      </header>

      {/* ══ MAIN ════════════════════════════════════════════════════════════ */}
      <main>
        <section className="section-px" style={{ padding: '100px 6vw', maxWidth: 1400, margin: '0 auto' }}>
          <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 60, alignItems: 'start' }}>

            {/* ── SIDEBAR ───────────────────────────────────────────────── */}
            <aside className="info-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              {/* Phone */}
              <div className="info-card" style={{ background: '#fff', border: '1px solid #E8E4DF', padding: '28px 26px' }}>
                <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg, #F5EFE8, #EDE6DC)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(139,115,85,.15)' }}>
                    <svg width="17" height="17" fill="none" stroke="#8B7355" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 700, marginBottom: 7 }}>Call Us</p>
                    <a href="tel:+254728686089" className="ulink" style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none', display: 'block', marginBottom: 2 }}>0728 686 089</a>
                    <a href="tel:+254732866432" className="ulink" style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none', display: 'block', marginBottom: 6 }}>0732 866 432</a>
                    <p style={{ fontSize: 11, color: '#bbb', fontWeight: 300 }}>Mon–Fri, 9:00am – 6:00pm EAT</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="info-card" style={{ background: '#fff', border: '1px solid #E8E4DF', padding: '28px 26px' }}>
                <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg, #F5EFE8, #EDE6DC)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(139,115,85,.15)' }}>
                    <svg width="17" height="17" fill="none" stroke="#8B7355" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 700, marginBottom: 7 }}>Email Us</p>
                    <a href="mailto:havenriserealtors@gmail.com" className="ulink" style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none', display: 'block', marginBottom: 6 }}>havenriserealtors@gmail.com</a>
                    <p style={{ fontSize: 11, color: '#bbb', fontWeight: 300 }}>Reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* ── OFFICE LOCATION ── UPDATED ───────────────────────────── */}
              <div className="info-card" style={{ background: '#fff', border: '1px solid #E8E4DF', padding: '28px 26px' }}>
                <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg, #F5EFE8, #EDE6DC)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(139,115,85,.15)' }}>
                    <svg width="17" height="17" fill="none" stroke="#8B7355" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                  </div>
                  <address style={{ fontStyle: 'normal' }}>
                    <p style={{ fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 700, marginBottom: 7 }}>Visit Us</p>
                    <p style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 500, lineHeight: 1, marginBottom: 2 }}>Ciata City Mall, Ridgeways</p>
                    <p style={{ fontSize: 13, color: '#666', fontWeight: 400, lineHeight: 1.6, marginBottom: 2 }}>Block B, 2nd Floor</p>
                    <p style={{ fontSize: 13, color: '#999', fontWeight: 300 }}>Nairobi, Kenya</p>
                    <a href="https://maps.google.com/?q=Ciata+City+Mall+Ridgeways+Nairobi"
                      target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 10, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700, color: '#8B7355', textDecoration: 'none' }}>
                      Get Directions <ArrowRight />
                    </a>
                  </address>
                </div>
              </div>

              {/* Office Hours */}
              <div className="hours-card" style={{ background: '#1a1a1a', padding: '28px 26px', borderTop: '3px solid #8B7355', position: 'relative', overflow: 'hidden' }}>
                {/* Subtle texture */}
                <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(139,115,85,.06)', pointerEvents: 'none' }} aria-hidden="true"/>
                <p style={{ fontSize: 9, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 700, marginBottom: 22 }}>Office Hours</p>
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM', open: true  },
                  { day: 'Saturday',        time: '10:00 AM – 4:00 PM', open: true  },
                  { day: 'Sunday',          time: 'Closed',              open: false },
                ].map(({ day, time, open }, i, arr) => (
                  <div key={day}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,.45)', fontWeight: 300 }}>{day}</span>
                      <span style={{
                        fontSize: 12, fontWeight: 500, letterSpacing: '.02em',
                        color: open ? '#fff' : 'rgba(255,255,255,.22)',
                      }}>
                        {!open && <span style={{ marginRight: 6, fontSize: 9, letterSpacing: '.12em', color: 'rgba(255,255,255,.2)', textTransform: 'uppercase' }}>—</span>}
                        {time}
                      </span>
                    </div>
                    {i < arr.length - 1 && <div style={{ height: 1, background: 'rgba(255,255,255,.06)' }}/>}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="social-card" style={{ background: 'linear-gradient(135deg, #F5EFE8, #EDE6DC)', padding: '28px 26px', border: '1px solid #E0D9CE' }}>
                <p style={{ fontSize: 9, letterSpacing: '.24em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 700, marginBottom: 18 }}>Follow Us</p>
                <div className="soc-row" style={{ display: 'flex', gap: 10 }}>
                  {[
                    { label: 'Facebook',  d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                    { label: 'X',         d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                    { label: 'Instagram', d: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
                    { label: 'LinkedIn',  d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  ].map(s => (
                    <a key={s.label} href="#" aria-label={s.label} className="soc-icon"
                      style={{ width: 40, height: 40, background: '#fff', border: '1px solid #E8E4DF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#8B7355" aria-hidden="true">
                        <path d={s.d}/>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── FORM ──────────────────────────────────────────────────── */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 36 }}>
                <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true"/>
                <p style={{ fontSize: 10, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Send a Message</p>
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(36px,4vw,60px)', fontWeight: 300, lineHeight: .92, letterSpacing: '-.03em', marginBottom: 52 }}>
                How Can We<br /><em style={{ color: '#8B7355' }}>Help You?</em>
              </h2>

              {formStatus === 'success' ? (
                <div role="alert" style={{ border: '1px solid #E8E4DF', padding: '72px 56px', textAlign: 'center', background: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #8B7355, transparent)' }} aria-hidden="true"/>
                  <div style={{ width: 60, height: 60, border: '1px solid #8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                    <svg width="22" height="18" fill="none" stroke="#8B7355" strokeWidth="2" viewBox="0 0 24 20" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 10l6 6L23 1"/>
                    </svg>
                  </div>
                  <h3 className="serif" style={{ fontSize: 40, fontWeight: 300, marginBottom: 14, letterSpacing: '-.02em' }}>Message Received</h3>
                  <p style={{ fontSize: 14, color: '#888', lineHeight: 1.8, fontWeight: 300, maxWidth: 360, margin: '0 auto 36px' }}>
                    Thank you for reaching out. A member of our team will be in touch within 24 hours.
                  </p>
                  <button onClick={() => setFormStatus(null)}
                    style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: '#8B7355', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                    className="ulink">
                    Send Another Message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>

                  {/* Interest selector */}
                  <fieldset style={{ border: 'none', padding: 0, marginBottom: 36 }}>
                    <legend style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#aaa', marginBottom: 14, fontWeight: 600, display: 'block' }}>
                      I'm interested in
                    </legend>
                    <div className="interest-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                      {['Buying', 'Renting', 'Listing', 'Investing'].map(opt => {
                        const active = formData.interest === opt
                        return (
                          <button key={opt} type="button"
                            className={`interest-btn${active ? ' active' : ''}`}
                            onClick={() => handleInterest(opt)}
                            aria-pressed={active}
                            style={{
                              padding: '12px 8px', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                              fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                              border: '1px solid',
                              borderColor: active ? '#1a1a1a' : '#ddd',
                              background: active ? '#1a1a1a' : '#fff',
                              color: active ? '#fff' : '#aaa',
                            }}>
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  {/* Name */}
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="c-name" style={{ display: 'block', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#aaa', marginBottom: 8, fontWeight: 600 }}>
                      Full Name *
                    </label>
                    <input id="c-name" type="text" required placeholder="Jane Doe" autoComplete="name"
                      value={formData.name}
                      onChange={e => handleField('name', e.target.value)}
                      style={{ width: '100%', padding: '14px 16px', fontSize: 14, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit' }}/>
                  </div>

                  {/* Email + Phone */}
                  <div className="form-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <div>
                      <label htmlFor="c-email" style={{ display: 'block', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#aaa', marginBottom: 8, fontWeight: 600 }}>
                        Email Address *
                      </label>
                      <input id="c-email" type="email" required placeholder="jane@example.com" autoComplete="email"
                        value={formData.email}
                        onChange={e => handleField('email', e.target.value)}
                        style={{ width: '100%', padding: '14px 16px', fontSize: 14, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit' }}/>
                    </div>
                    <div>
                      <label htmlFor="c-phone" style={{ display: 'block', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#aaa', marginBottom: 8, fontWeight: 600 }}>
                        Phone Number
                      </label>
                      <input id="c-phone" type="tel" placeholder="+254 7__ ___ ___" autoComplete="tel"
                        value={formData.phone}
                        onChange={e => handleField('phone', e.target.value)}
                        style={{ width: '100%', padding: '14px 16px', fontSize: 14, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit' }}/>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 36 }}>
                    <label htmlFor="c-msg" style={{ display: 'block', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#aaa', marginBottom: 8, fontWeight: 600 }}>
                      Your Message *
                    </label>
                    <textarea id="c-msg" rows={5} required
                      placeholder="Tell us about your property needs, preferred neighbourhoods, budget range…"
                      value={formData.message}
                      onChange={e => handleField('message', e.target.value)}
                      style={{ width: '100%', padding: '14px 16px', fontSize: 14, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.7 }}/>
                  </div>

                  {formStatus === 'error' && (
                    <p role="alert" style={{ fontSize: 13, color: '#b94040', marginBottom: 20, padding: '12px 16px', background: '#fdf2f2', border: '1px solid #f5c6c6' }}>
                      Something went wrong. Please try again or email us at havenriserealtors@gmail.com
                    </p>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
                    <button type="submit" disabled={formStatus === 'sending' || !formData.interest}
                      className="submit-btn"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 12,
                        padding: '16px 44px', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
                        fontWeight: 600, border: 'none', cursor: formData.interest ? 'pointer' : 'not-allowed',
                        fontFamily: 'inherit',
                        background: formData.interest ? '#1a1a1a' : '#d4cfc9',
                        color: '#fff',
                      }}>
                      {formStatus === 'sending' ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true">
                            <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>Send Message <ArrowRight /></>
                      )}
                    </button>
                    <p style={{ fontSize: 11, color: '#ccc', fontWeight: 300, letterSpacing: '.04em' }}>We respond within 24 hours</p>
                  </div>
                  <p style={{ fontSize: 11, color: '#d4cfc9', marginTop: 18, fontWeight: 300 }}>
                    By submitting you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Gold divider */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #8B7355, transparent)', margin: '0 6vw' }} aria-hidden="true"/>

        {/* ══ MAP ═════════════════════════════════════════════════════════ */}
        <section aria-labelledby="map-heading" style={{ background: '#111110', padding: '100px 6vw', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative radial */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(139,115,85,.07) 0%, transparent 65%)', pointerEvents: 'none' }} aria-hidden="true"/>

          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div className="map-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 28 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true"/>
                  <p style={{ fontSize: 10, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Find Us</p>
                </div>
                <h2 id="map-heading" className="serif" style={{ fontSize: 'clamp(32px,4vw,54px)', fontWeight: 300, color: '#fff', lineHeight: .93, letterSpacing: '-.03em' }}>
                  Our Office<br /><em style={{ color: 'rgba(255,255,255,.35)', fontStyle: 'italic' }}>in Ridgeways</em>
                </h2>
              </div>

              {/* ── Address block UPDATED ── */}
              <address style={{ fontStyle: 'normal', textAlign: 'right' }}>
                <p style={{ fontSize: 15, color: '#fff', fontWeight: 500, marginBottom: 4 }}>Ciata City Mall, Ridgeways</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', lineHeight: 1.8, fontWeight: 300 }}>
                  Block B, 2nd Floor<br />Nairobi, Kenya
                </p>
                <a href="https://maps.google.com/?q=Ciata+City+Mall+Ridgeways+Nairobi"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 700, color: '#8B7355', textDecoration: 'none' }}>
                  Open in Maps <ArrowRight />
                </a>
              </address>
            </div>

            {/* Map frame */}
            <div className="map-wrap" style={{ height: 500 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.729!2d36.8219!3d-1.2225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3f7b7b7b7b7b%3A0x0!2sCiata+City+Mall%2C+Ridgeways%2C+Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0, display: 'block', filter: 'grayscale(15%) contrast(1.08)', opacity: .88 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HavenRise Realty — Ciata City Mall, Block B 2nd Floor, Ridgeways, Nairobi"
              />
            </div>

            {/* Info strip below map */}
            <div style={{ marginTop: 24, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { icon: '🕐', label: 'Mon–Fri', val: '9:00 AM – 6:00 PM' },
                { icon: '🕐', label: 'Saturday', val: '10:00 AM – 4:00 PM' },
                { icon: '📞', label: 'Phone', val: '0728 686 089' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 1, height: 24, background: 'rgba(139,115,85,.3)' }} aria-hidden="true"/>
                  <div>
                    <p style={{ fontSize: 9, color: '#8B7355', letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', fontWeight: 300 }}>{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ BOTTOM CTA ══════════════════════════════════════════════════ */}
        <section style={{ background: '#F0EDE8', padding: '72px 6vw', borderTop: '1px solid #E8E4DF', position: 'relative', overflow: 'hidden' }} aria-label="Explore properties">
          {/* Faint serif watermark */}
          <div className="serif" style={{ position: 'absolute', right: '4vw', top: '50%', transform: 'translateY(-50%)', fontSize: 'clamp(80px,14vw,160px)', fontWeight: 300, color: 'rgba(139,115,85,.06)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-.04em' }} aria-hidden="true">
            HavenRise
          </div>
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 28, position: 'relative' }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: '.26em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 700, marginBottom: 12 }}>Ready to explore?</p>
              <h3 className="serif" style={{ fontSize: 'clamp(24px,3vw,40px)', fontWeight: 300, letterSpacing: '-.025em', lineHeight: 1.05 }}>
                Browse Our <em>Current Listings</em>
              </h3>
            </div>
            <a href="/properties" className="cta-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: '#1a1a1a', color: '#fff', padding: '17px 40px', fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase', textDecoration: 'none' }}>
              View All Properties <ArrowRight />
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Contact