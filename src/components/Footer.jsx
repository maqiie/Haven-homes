import { Link } from 'react-router-dom'

const currentYear = new Date().getFullYear()

const navLinks = [
  ['/', 'Home'],
  ['/properties', 'All Properties'],
  ['/sellproperty', 'Sell Your Property'],
  ['/contact', 'Contact Us'],
  ['/about', 'About Us'],
]

const propertyTypes = [
  { label: 'Apartments',  to: '/properties?propertyType=apartment' },
  { label: 'Townhouses',  to: '/properties?propertyType=townhouse' },
  { label: 'Villas',      to: '/properties?propertyType=villa' },
  { label: 'Houses',      to: '/properties?propertyType=house' },
  { label: 'For Sale',    to: '/properties?type=for-sale' },
  { label: 'To Let',      to: '/properties?type=for-rent' },
]

const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy']

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/havenriserealtors',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/havenriserealtors',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/havenriserealty',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/havenriserealtors',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
]

const Footer = () => (
  <footer style={{ background: '#0E0D0D', color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

      .ft-link {
        color: rgba(255,255,255,0.38);
        text-decoration: none;
        font-size: 13px;
        font-weight: 300;
        letter-spacing: 0.02em;
        transition: color 0.2s;
        display: inline-block;
        line-height: 1;
      }
      .ft-link:hover { color: #8B7355; }

      .ft-social {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: 1px solid rgba(255,255,255,0.08);
        color: rgba(255,255,255,0.3);
        text-decoration: none;
        flex-shrink: 0;
        transition: border-color 0.22s, color 0.22s, background 0.22s, transform 0.18s;
      }
      .ft-social:hover {
        border-color: #8B7355;
        color: #8B7355;
        background: rgba(139,115,85,0.08);
        transform: translateY(-2px);
      }

      .ft-label {
        font-size: 9.5px;
        letter-spacing: 0.26em;
        text-transform: uppercase;
        color: #8B7355;
        font-weight: 600;
        margin-bottom: 22px;
        display: block;
      }

      .ft-divider {
        height: 1px;
        background: linear-gradient(to right, transparent, rgba(139,115,85,0.5), transparent);
      }

      /* newsletter input */
      .ft-nl-input {
        flex: 1;
        padding: 12px 18px;
        font-size: 12.5px;
        font-family: 'DM Sans', sans-serif;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-right: none;
        color: #fff;
        outline: none;
        transition: border-color 0.2s;
      }
      .ft-nl-input::placeholder { color: rgba(255,255,255,0.25); }
      .ft-nl-input:focus { border-color: rgba(139,115,85,0.5); }
      .ft-nl-btn {
        padding: 12px 22px;
        background: #8B7355;
        color: #fff;
        font-size: 10px;
        font-family: 'DM Sans', sans-serif;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        transition: background 0.2s;
        white-space: nowrap;
      }
      .ft-nl-btn:hover { background: #7a6348; }

      /* responsive */
      @media (max-width: 1024px) {
        .ft-grid { grid-template-columns: 1fr 1fr !important; gap: 48px 40px !important; }
        .ft-brand { grid-column: 1 / -1 !important; }
        .ft-brand-inner { max-width: 500px; }
        .ft-main { padding: 64px 6vw 52px !important; }
      }
      @media (max-width: 768px) {
        .ft-grid { grid-template-columns: 1fr 1fr !important; gap: 40px 24px !important; }
        .ft-main { padding: 56px 5vw 44px !important; }
        .ft-bottom { padding: 20px 5vw !important; }
        .ft-nl-row { flex-direction: column !important; }
        .ft-nl-input { border-right: 1px solid rgba(255,255,255,0.1) !important; border-bottom: none; }
        .ft-nl-btn { width: 100%; }
      }
      @media (max-width: 600px) {
        .ft-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        .ft-brand { grid-column: auto !important; }
        .ft-main { padding: 52px 5vw 40px !important; }
        .ft-bottom-inner { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
        .ft-legal { flex-wrap: wrap !important; gap: 12px 20px !important; }
        .ft-social-row { gap: 8px !important; }
      }
      @media (max-width: 420px) {
        .ft-main { padding: 44px 4vw 36px !important; }
        .ft-bottom { padding: 18px 4vw !important; }
        .ft-logo { font-size: 24px !important; }
        .ft-logo-tag { font-size: 8.5px !important; }
      }
      @media print { footer { display: none !important; } }
      @media (prefers-reduced-motion: reduce) {
        .ft-link, .ft-social { transition: none !important; }
        .ft-social:hover { transform: none !important; }
      }
    `}</style>

    {/* ── top gold rule ── */}
    <div className="ft-divider" />

    {/* ── newsletter strip ── */}
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0a0909' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '36px 6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ flexShrink: 0 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 6 }}>Stay Ahead</p>
          <p style={{ fontSize: 14, fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em' }}>
            New listings & market insights — delivered first.
          </p>
        </div>
        <form onSubmit={e => e.preventDefault()} className="ft-nl-row" style={{ display: 'flex', maxWidth: 420, width: '100%' }}>
          <label htmlFor="ft-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Email address</label>
          <input id="ft-email" type="email" placeholder="Your email address" required autoComplete="email" className="ft-nl-input" />
          <button type="submit" className="ft-nl-btn">Subscribe</button>
        </form>
      </div>
    </div>

    {/* ── main grid ── */}
    <div className="ft-main" style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 6vw 64px' }}>
      <div className="ft-grid" style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr 1fr 1.3fr', gap: 64 }}>

        {/* Brand */}
        <div className="ft-brand">
          <div className="ft-brand-inner">
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: 0, marginBottom: 28 }}>
              <span className="ft-logo" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>HavenRise</span>
              <span className="ft-logo-tag" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 9, fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#8B7355', marginLeft: 8 }}>Realtors</span>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.9, fontWeight: 300, color: 'rgba(255,255,255,0.35)', maxWidth: 270, marginBottom: 36 }}>
              Nairobi's premier real estate agency — curating extraordinary properties across Kenya's most exclusive neighbourhoods.
            </p>
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 28, marginBottom: 36, paddingBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {[['50+', 'Listings'], ['6', 'Locations'], ['6', 'Projects']].map(([n, l]) => (
                <div key={l}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 400, color: '#fff', lineHeight: 1 }}>{n}</p>
                  <p style={{ fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', marginTop: 4, fontWeight: 600 }}>{l}</p>
                </div>
              ))}
            </div>
            {/* Socials */}
            <div className="ft-social-row" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} className="ft-social" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Navigate */}
        <nav aria-label="Footer navigation">
          <span className="ft-label">Navigate</span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {navLinks.map(([to, label]) => (
              <li key={label}>
                <Link to={to} className="ft-link">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Property Types */}
        <div>
          <span className="ft-label">Property Types</span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {propertyTypes.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="ft-link">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <address style={{ fontStyle: 'normal' }}>
          <span className="ft-label">Get in Touch</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Office */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <svg style={{ width: 14, height: 14, color: '#8B7355', flexShrink: 0, marginTop: 2 }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 6 }}>Our Office</p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ciata+City+Mall+Ridgeways+Nairobi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ft-link"
                  style={{ fontSize: 12.5, lineHeight: 1.75 }}
                >
                  Ciata City Mall, Ridgeways<br />
                  Block B · 2nd Floor<br />
                  Nairobi, Kenya
                </a>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <svg style={{ width: 14, height: 14, color: '#8B7355', flexShrink: 0, marginTop: 2 }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 6 }}>Phone</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <a href="tel:+254728686089" className="ft-link" style={{ fontSize: 12.5 }}>+254 728 686 089</a>
                  <a href="tel:+254732866432" className="ft-link" style={{ fontSize: 12.5 }}>+254 732 866 432</a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <svg style={{ width: 14, height: 14, color: '#8B7355', flexShrink: 0, marginTop: 2 }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
              <div>
                <p style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 6 }}>Email</p>
                <a href="mailto:havenriserealtors@gmail.com" className="ft-link" style={{ fontSize: 12.5 }}>havenriserealtors@gmail.com</a>
              </div>
            </div>

            {/* Hours */}
            <div style={{ paddingTop: 20, marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 10 }}>Office Hours</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 300, lineHeight: 1.8 }}>
                Mon – Fri &nbsp;·&nbsp; 8:00 am – 6:00 pm<br />
                Saturday &nbsp;·&nbsp; 9:00 am – 3:00 pm
              </p>
            </div>

          </div>
        </address>
      </div>
    </div>

    {/* ── bottom bar ── */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="ft-bottom" style={{ maxWidth: 1400, margin: '0 auto', padding: '22px 6vw' }}>
        <div className="ft-bottom-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.2)', fontWeight: 300, letterSpacing: '0.03em' }}>
              © {currentYear} HavenRise Realtors. All rights reserved.
            </p>
            <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)', display: 'inline-block' }} aria-hidden="true" />
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', fontWeight: 300, letterSpacing: '0.02em' }}>
              Nairobi, Kenya
            </p>
          </div>
          <div className="ft-legal" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {legalLinks.map(item => (
              <a key={item} href="#" className="ft-link" style={{ fontSize: 11, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.18)' }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </div>

  </footer>
)

export default Footer