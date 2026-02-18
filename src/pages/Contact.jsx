import { useState, useCallback } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', interest: '' })
  const [formStatus, setFormStatus] = useState(null)

  const handleField = useCallback((key, val) =>
    setFormData(prev => ({ ...prev, [key]: val })), [])

  const handleInterest = useCallback(val =>
    setFormData(prev => ({ ...prev, interest: val })), [])

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
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }, [formData])

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#F9F7F4', color: '#1a1a1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .fade-up { animation: fadeUp 0.8s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        /* Input focus */
        input:focus, textarea:focus { outline: none; border-color: #8B7355 !important; }

        /* Contact info card hover */
        .info-card { transition: border-color .3s, box-shadow .3s; }
        .info-card:hover { border-color: rgba(139,115,85,.45) !important; box-shadow: 0 8px 40px rgba(139,115,85,.08); }

        /* Underline link */
        .ulink { position: relative; display: inline-block; }
        .ulink::after { content:''; position:absolute; left:0; bottom:-2px; width:0; height:1px; background:#8B7355; transition:width .3s; }
        .ulink:hover::after { width:100%; }

        /* Interest pill */
        .interest-btn { transition: all .18s ease; }
        .interest-btn:hover { border-color: #8B7355 !important; color: #8B7355 !important; }

        /* Social icon */
        .soc-icon { transition: background .25s, transform .25s; }
        .soc-icon:hover { background: #8B7355 !important; transform: translateY(-2px); }
        .soc-icon:hover svg { color: #fff !important; }

        /* Map overlay */
        .map-wrap { position: relative; overflow: hidden; }
        .map-wrap::after { content:''; position:absolute; inset:0; border:1px solid #E8E4DF; pointer-events:none; }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .fade-up { animation: none !important; }
          .info-card, .interest-btn, .soc-icon { transition: none !important; }
        }

        /* ── Responsive ─────────────────── */
        @media (max-width: 1024px) {
          .contact-layout { grid-template-columns: 1fr !important; }
          .info-sidebar { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .hours-card, .social-card { grid-column: span 2; }
        }
        @media (max-width: 720px) {
          .info-sidebar { grid-template-columns: 1fr !important; }
          .hours-card, .social-card { grid-column: span 1 !important; }
          .form-two-col { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(44px, 12vw, 72px) !important; }
          .section-px { padding-left: 5vw !important; padding-right: 5vw !important; }
          .interest-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .interest-row { grid-template-columns: 1fr !important; }
          .info-card { padding: 24px !important; }
          .soc-row { gap: 10px !important; }
        }
      `}</style>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <header style={{ position: 'relative', height: '72vh', minHeight: 520, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="HavenRise Homes office — Westlands, Nairobi"
          fetchpriority="high"
          decoding="sync"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Gradient overlay — warm-toned to match home brand */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,8,6,.60) 0%, rgba(10,8,6,.50) 55%, rgba(249,247,244,1) 100%)' }} aria-hidden="true" />

        <div className="section-px" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 6vw 72px' }}>
          <div className="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, animationDelay: '.1s' }}>
            <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true" />
            <p style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>Get in Touch</p>
          </div>
          <h1 className="fade-up serif hero-title" style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 300, color: '#fff', lineHeight: .92, letterSpacing: '-.03em', animationDelay: '.2s' }}>
            Let's Find<br /><em style={{ color: '#c9a97a' }}>Your Home</em>
          </h1>
          <p className="fade-up" style={{ marginTop: 24, fontSize: 15, color: 'rgba(255,255,255,.58)', maxWidth: 400, lineHeight: 1.65, fontWeight: 300, animationDelay: '.35s' }}>
            Our team of experts is standing by — whether you're buying, renting, or simply curious.
          </p>
        </div>

        {/* Scroll hint */}
        <div style={{ position: 'absolute', bottom: 80, right: '6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10 }} aria-hidden="true">
          <p style={{ color: 'rgba(255,255,255,.35)', fontSize: 9, letterSpacing: '.25em', textTransform: 'uppercase', writingMode: 'vertical-lr' }}>Scroll</p>
          <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,.2)' }} />
        </div>
      </header>

      {/* ══ MAIN CONTENT ══════════════════════════════════════════════════════ */}
      <main>
        <section className="section-px" style={{ padding: '96px 6vw', maxWidth: 1400, margin: '0 auto' }}>
          <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 56, alignItems: 'start' }}>

            {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
            <aside className="info-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Phone */}
              <div className="info-card" style={{ background: '#fff', border: '1px solid #E8E4DF', padding: '32px 28px' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, background: '#F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" fill="none" stroke="#8B7355" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 6 }}>Call Us</p>
                    <a href="tel:+254123456789" className="ulink" style={{ fontSize: 16, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none', display: 'block', marginBottom: 4 }}>+254 123 456 789</a>
                    <p style={{ fontSize: 12, color: '#aaa', fontWeight: 300 }}>Mon–Fri, 9am–6pm EAT</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="info-card" style={{ background: '#fff', border: '1px solid #E8E4DF', padding: '32px 28px' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, background: '#F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" fill="none" stroke="#8B7355" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 6 }}>Email Us</p>
                    <a href="mailto:info@havenrise.co.ke" className="ulink" style={{ fontSize: 15, fontWeight: 500, color: '#1a1a1a', textDecoration: 'none', display: 'block', marginBottom: 4 }}>info@havenrise.co.ke</a>
                    <p style={{ fontSize: 12, color: '#aaa', fontWeight: 300 }}>Reply within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="info-card" style={{ background: '#fff', border: '1px solid #E8E4DF', padding: '32px 28px' }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, background: '#F0EDE8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" fill="none" stroke="#8B7355" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                    </svg>
                  </div>
                  <address style={{ fontStyle: 'normal' }}>
                    <p style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 6 }}>Visit Us</p>
                    <p style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 400, lineHeight: 1.65 }}>
                      123 Estate Avenue<br />Westlands, Nairobi<br />Kenya
                    </p>
                  </address>
                </div>
              </div>

              {/* Office Hours */}
              <div className="hours-card" style={{ background: '#1a1a1a', padding: '32px 28px', borderTop: '2px solid #8B7355' }}>
                <p style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 24 }}>Office Hours</p>
                {[
                  ['Monday – Friday', '9:00 AM – 6:00 PM'],
                  ['Saturday',        '10:00 AM – 4:00 PM'],
                  ['Sunday',          'Closed'],
                ].map(([day, time], i) => (
                  <div key={day}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', fontWeight: 300 }}>{day}</span>
                      <span style={{ fontSize: 13, color: time === 'Closed' ? 'rgba(255,255,255,.25)' : '#fff', fontWeight: 500, letterSpacing: '.02em' }}>{time}</span>
                    </div>
                    {i < 2 && <div style={{ height: 1, background: 'rgba(255,255,255,.07)' }} />}
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="social-card" style={{ background: '#F0EDE8', padding: '32px 28px', border: '1px solid #E8E4DF' }}>
                <p style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 20 }}>Follow Us</p>
                <div className="soc-row" style={{ display: 'flex', gap: 12 }}>
                  {[
                    { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                    { label: 'X / Twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                    { label: 'Instagram', path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
                    { label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  ].map(s => (
                    <a key={s.label} href="#" aria-label={s.label} className="soc-icon"
                      style={{ width: 40, height: 40, background: '#fff', border: '1px solid #E8E4DF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="#8B7355" aria-hidden="true">
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── FORM ────────────────────────────────────────────────────── */}
            <div>
              {/* Section label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
                <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true" />
                <p style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Send a Message</p>
              </div>
              <h2 className="serif" style={{ fontSize: 'clamp(36px,4vw,58px)', fontWeight: 300, lineHeight: .95, letterSpacing: '-.03em', marginBottom: 48 }}>
                How Can We<br /><em style={{ color: '#8B7355' }}>Help You?</em>
              </h2>

              {formStatus === 'success' ? (
                <div role="alert" style={{ border: '1px solid #E8E4DF', padding: '64px 48px', textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, border: '1px solid #8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#8B7355', fontSize: 22 }} aria-hidden="true">✓</div>
                  <h3 className="serif" style={{ fontSize: 36, fontWeight: 300, marginBottom: 12, letterSpacing: '-.02em' }}>Message Received</h3>
                  <p style={{ fontSize: 14, color: '#777', lineHeight: 1.8, fontWeight: 300, maxWidth: 360, margin: '0 auto 32px' }}>
                    Thank you for reaching out. A member of our team will be in touch within 24 hours.
                  </p>
                  <button onClick={() => setFormStatus(null)} className="ulink"
                    style={{ fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, color: '#8B7355', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Send Another Message →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Interest selector */}
                  <fieldset style={{ border: 'none', padding: 0, marginBottom: 32 }}>
                    <legend style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: '#999', marginBottom: 14, fontWeight: 600, display: 'block' }}>
                      I'm interested in
                    </legend>
                    <div className="interest-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                      {['Buying', 'Renting', 'Listing', 'Investing'].map(opt => (
                        <button key={opt} type="button"
                          onClick={() => handleInterest(opt)}
                          aria-pressed={formData.interest === opt}
                          style={{
                            padding: '11px 8px', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase',
                            fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                            border: '1px solid',
                            borderColor: formData.interest === opt ? '#1a1a1a' : '#ddd',
                            background: formData.interest === opt ? '#1a1a1a' : 'transparent',
                            color: formData.interest === opt ? '#fff' : '#999',
                          }}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Name */}
                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="c-name" style={{ display: 'block', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: '#999', marginBottom: 8, fontWeight: 600 }}>Full Name *</label>
                    <input id="c-name" type="text" required placeholder="Jane Doe" autoComplete="name"
                      value={formData.name}
                      onChange={e => handleField('name', e.target.value)}
                      style={{ width: '100%', padding: '13px 16px', fontSize: 14, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', transition: 'border-color .2s' }} />
                  </div>

                  {/* Email + Phone */}
                  <div className="form-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <div>
                      <label htmlFor="c-email" style={{ display: 'block', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: '#999', marginBottom: 8, fontWeight: 600 }}>Email Address *</label>
                      <input id="c-email" type="email" required placeholder="jane@example.com" autoComplete="email"
                        value={formData.email}
                        onChange={e => handleField('email', e.target.value)}
                        style={{ width: '100%', padding: '13px 16px', fontSize: 14, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', transition: 'border-color .2s' }} />
                    </div>
                    <div>
                      <label htmlFor="c-phone" style={{ display: 'block', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: '#999', marginBottom: 8, fontWeight: 600 }}>Phone Number</label>
                      <input id="c-phone" type="tel" placeholder="+254 123 456 789" autoComplete="tel"
                        value={formData.phone}
                        onChange={e => handleField('phone', e.target.value)}
                        style={{ width: '100%', padding: '13px 16px', fontSize: 14, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', transition: 'border-color .2s' }} />
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 32 }}>
                    <label htmlFor="c-msg" style={{ display: 'block', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: '#999', marginBottom: 8, fontWeight: 600 }}>
                      Your Message *
                    </label>
                    <textarea id="c-msg" rows={5} required
                      placeholder="Tell us about your property needs, preferred neighbourhoods, budget range..."
                      value={formData.message}
                      onChange={e => handleField('message', e.target.value)}
                      style={{ width: '100%', padding: '13px 16px', fontSize: 14, border: '1px solid #E8E4DF', background: '#fff', color: '#1a1a1a', fontFamily: 'inherit', resize: 'vertical', transition: 'border-color .2s', lineHeight: 1.65 }} />
                  </div>

                  {formStatus === 'error' && (
                    <p role="alert" style={{ fontSize: 13, color: '#b94040', marginBottom: 20, padding: '12px 16px', background: '#fdf2f2', border: '1px solid #f5c6c6' }}>
                      Something went wrong. Please try again or email us directly at info@havenrise.co.ke
                    </p>
                  )}

                  {/* Submit */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
                    <button type="submit" disabled={formStatus === 'sending' || !formData.interest}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 12,
                        padding: '16px 40px', fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase',
                        fontWeight: 600, border: 'none', cursor: formData.interest ? 'pointer' : 'not-allowed',
                        fontFamily: 'inherit', background: formData.interest ? '#1a1a1a' : '#ccc', color: '#fff',
                        transition: 'background .2s',
                      }}>
                      {formStatus === 'sending' ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true">
                            <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>Send Message <ArrowRight /></>
                      )}
                    </button>
                    <p style={{ fontSize: 11, color: '#bbb', fontWeight: 300 }}>We respond within 24 hours</p>
                  </div>

                  <p style={{ fontSize: 11, color: '#ccc', marginTop: 20, fontWeight: 300 }}>
                    By submitting this form you agree to our privacy policy and terms of service.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ══ DIVIDER ═══════════════════════════════════════════════════════ */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #8B7355, transparent)', margin: '0 6vw' }} aria-hidden="true" />

        {/* ══ MAP ══════════════════════════════════════════════════════════ */}
        <section aria-labelledby="map-heading" style={{ background: '#1a1a1a', padding: '96px 6vw' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, flexWrap: 'wrap', gap: 24 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 32, height: 1, background: '#8B7355' }} aria-hidden="true" />
                  <p style={{ fontSize: 10, letterSpacing: '.25em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600 }}>Find Us</p>
                </div>
                <h2 id="map-heading" className="serif" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: '#fff', lineHeight: .95, letterSpacing: '-.03em' }}>
                  Our Office<br /><em>in Westlands</em>
                </h2>
              </div>
              <address style={{ fontStyle: 'normal', textAlign: 'right' }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.8, fontWeight: 300 }}>
                  123 Estate Avenue<br />Westlands, Nairobi, Kenya
                </p>
                <a href="https://maps.google.com/?q=Westlands+Nairobi" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 600, color: '#8B7355', textDecoration: 'none' }}>
                  Open in Maps <ArrowRight />
                </a>
              </address>
            </div>

            {/* Map frame */}
            <div className="map-wrap" style={{ height: 480 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.202063174595!2d36.807222!3d-1.286389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d675d20bb1%3A0x26e6c463164d7!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', filter: 'grayscale(20%) contrast(1.05)', opacity: .9 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HavenRise Homes office location — Westlands, Nairobi"
              />
            </div>
          </div>
        </section>

        {/* ══ BOTTOM CTA STRIP ════════════════════════════════════════════ */}
        <section style={{ background: '#F0EDE8', padding: '64px 6vw', borderTop: '1px solid #E8E4DF' }} aria-label="Explore properties">
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 28 }}>
            <div>
              <p style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 10 }}>Ready to explore?</p>
              <h3 className="serif" style={{ fontSize: 'clamp(24px,3vw,38px)', fontWeight: 300, letterSpacing: '-.02em', lineHeight: 1.1 }}>
                Browse Our <em>Current Listings</em>
              </h3>
            </div>
            <a href="/properties"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#1a1a1a', color: '#fff', padding: '16px 36px', fontSize: 12, fontWeight: 600, letterSpacing: '.15em', textTransform: 'uppercase', textDecoration: 'none' }}>
              View All Properties <ArrowRight />
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Contact