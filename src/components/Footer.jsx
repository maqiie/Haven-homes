import { Link } from 'react-router-dom'
const currentYear = new Date().getFullYear()
const navLinks      = [['/', 'Home'], ['/properties', 'All Properties'], ['/contact', 'Contact Us'], ['/about', 'About Us']]
const propertyTypes = ['Apartments', 'Townhouses', 'Bungalows', 'Villas', 'Land', 'Commercial']
const legalLinks    = ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
const socials = [
  { label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'Twitter / X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'LinkedIn',  path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
]
const Footer = () => (
  <footer style={{ background: '#111010', color: 'rgba(255,255,255,0.55)', fontFamily: "'DM Sans', sans-serif" }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
      /* ── Links ────────────────────────── */
      .footer-link {
        color: rgba(255,255,255,0.45);
        text-decoration: none;
        font-size: 13px;
        font-weight: 300;
        letter-spacing: 0.03em;
        transition: color 0.2s;
        display: inline-block;
      }
      .footer-link:hover { color: #8B7355; }
      /* ── Social ───────────────────────── */
      .footer-social {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 38px;
        height: 38px;
        border: 1px solid rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.4);
        text-decoration: none;
        flex-shrink: 0;
        transition: border-color 0.2s, color 0.2s, background 0.2s;
      }
      .footer-social:hover {
        border-color: #8B7355;
        color: #8B7355;
        background: rgba(139,115,85,0.08);
      }
      /* ── Column label ─────────────────── */
      .footer-col-label {
        font-size: 10px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: #8B7355;
        font-weight: 600;
        margin-bottom: 20px;
        display: block;
      }
      /* ══════════════════════════════════════════════════
         RESPONSIVE BREAKPOINTS
         xl  : ≤ 1200px  (4-col gets tighter)
         lg  : ≤ 1024px  (collapse to 2 + 2 grid)
         md  : ≤  768px  (2-col grid, reduce padding)
         sm  : ≤  600px  (single column stacked)
         xs  : ≤  420px  (minimal padding, tighter type)
      ══════════════════════════════════════════════════ */
      /* ── xl ───────────────────────────── */
      @media (max-width: 1200px) {
        .footer-grid    { grid-template-columns: 1.5fr 1fr 1fr 1.2fr !important; gap: 40px !important; }
        .footer-main    { padding: 72px 6vw 52px !important; }
      }
      /* ── lg: 2×2 grid ─────────────────── */
      @media (max-width: 1024px) {
        .footer-grid    { grid-template-columns: 1fr 1fr !important; gap: 48px 40px !important; }
        .footer-main    { padding: 64px 6vw 48px !important; }
        .footer-brand   { grid-column: 1 / -1 !important; }   /* brand spans full width */
        .footer-brand-inner { max-width: 480px; }
        .footer-bottom  { flex-direction: row !important; }
      }
      /* ── md ───────────────────────────── */
      @media (max-width: 768px) {
        .footer-grid    { grid-template-columns: 1fr 1fr !important; gap: 40px 28px !important; }
        .footer-main    { padding: 56px 5vw 44px !important; }
        .footer-bottom  { padding: 20px 5vw !important; }
        .footer-bottom-links { gap: 20px !important; }
        .footer-copy    { font-size: 11px !important; }
        .footer-link    { font-size: 12px !important; }
      }
      /* ── sm: single column ────────────── */
      @media (max-width: 600px) {
        .footer-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
        .footer-brand   { grid-column: auto !important; }
        .footer-main    { padding: 52px 5vw 40px !important; }
        .footer-brand p { max-width: 100% !important; }
        .footer-social-row { gap: 10px !important; }
        .footer-bottom  { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
        .footer-bottom-links { flex-wrap: wrap !important; gap: 14px 20px !important; }
        .footer-contact-item p,
        .footer-contact-item a { font-size: 12px !important; }
        .footer-col-label { margin-bottom: 14px !important; }
      }
      /* ── xs ───────────────────────────── */
      @media (max-width: 420px) {
        .footer-main    { padding: 44px 4vw 36px !important; }
        .footer-bottom  { padding: 18px 4vw !important; }
        .footer-logo    { font-size: 24px !important; }
        .footer-logo-sub { font-size: 9px !important; }
        .footer-link    { font-size: 12px !important; }
        .footer-bottom-links { gap: 12px 16px !important; }
        .footer-social  { width: 34px !important; height: 34px !important; }
      }
      /* ── Print ────────────────────────── */
      @media print {
        footer { display: none !important; }
      }
      /* ── Reduced motion ───────────────── */
      @media (prefers-reduced-motion: reduce) {
        .footer-link, .footer-social { transition: none !important; }
      }
    `}</style>
    {/* Top accent line */}
    <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #8B7355, transparent)' }} aria-hidden="true" />
    {/* ── MAIN GRID ─────────────────────────────────────────── */}
    <div className="footer-main" style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 6vw 60px' }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1.2fr', gap: 60 }}>
        {/* ── Brand ── */}
        <div className="footer-brand">
          <div className="footer-brand-inner">
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'baseline', gap: 6, marginBottom: 24 }}>
              <span className="footer-logo" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>HavenRise</span>
              <span className="footer-logo-sub" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 9, fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8B7355' }}>Realty</span>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.85, fontWeight: 300, color: 'rgba(255,255,255,0.4)', maxWidth: 280, marginBottom: 32 }}>
              Nairobi's premier real estate agency, specialising in luxury properties and bespoke real estate solutions. Where your story begins.
            </p>
            <div className="footer-social-row" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <a key={s.label} href="#" className="footer-social" aria-label={s.label}>
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* ── Navigate ── */}
        <nav aria-label="Footer navigation">
          <span className="footer-col-label">Navigate</span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {navLinks.map(([to, label]) => (
              <li key={label}>
                <Link to={to} className="footer-link">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* ── Property Types ── */}
        <div>
          <span className="footer-col-label">Property Types</span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {propertyTypes.map(t => (
              <li key={t}>
                <a href="#" className="footer-link">{t}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* ── Contact ── */}
        <address style={{ fontStyle: 'normal' }}>
          <span className="footer-col-label">Get in Touch</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Address */}
            <div className="footer-contact-item" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <svg style={{ width: 14, height: 14, color: '#8B7355', flexShrink: 0, marginTop: 2 }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
              </svg>
              <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.4)' }}>
                123 Estate Avenue<br />Westlands, Nairobi
              </p>
            </div>
            {/* Phone */}
            <div className="footer-contact-item" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <svg style={{ width: 14, height: 14, color: '#8B7355', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <a href="tel:+254728686089" className="footer-link">0728 686 089</a>
                <a href="tel:+254732866432" className="footer-link">0732 866 432</a>
              </div>
            </div>
            {/* Email */}
            <div className="footer-contact-item" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <svg style={{ width: 14, height: 14, color: '#8B7355', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
              </svg>
              <a href="mailto:havenrise.realty25@gmail.com" className="footer-link">havenrise.realty25@gmail.com</a>
            </div>
            {/* Office hours */}
            <div style={{ paddingTop: 20, marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8B7355', fontWeight: 600, marginBottom: 10 }}>Office Hours</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 300, lineHeight: 1.7 }}>
                Mon – Fri: 8:00am – 6:00pm<br />
                Sat: 9:00am – 3:00pm
              </p>
            </div>
          </div>
        </address>
      </div>
    </div>
    {/* ── BOTTOM BAR ──────────────────────────────────────── */}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="footer-bottom" style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <p className="footer-copy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 300, letterSpacing: '0.03em' }}>
          © {currentYear} HavenRise Realty. All rights reserved.
        </p>
        <div className="footer-bottom-links" style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {legalLinks.map(item => (
            <a key={item} href="#" className="footer-link" style={{ fontSize: 11, letterSpacing: '0.06em' }}>{item}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
)
export default Footer