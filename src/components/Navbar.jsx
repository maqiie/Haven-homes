import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

const forSaleTypes = [
  'Apartments For Sale',
  'Bungalows For Sale',
  'Townhouses For Sale',
  'Land For Sale',
  'Commercial Property For Sale',
]
const forRentTypes = [
  'Apartments For Rent',
  'Townhouses For Rent',
  'Office Spaces For Rent',
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown]         = useState(null)
  const [mobileSection, setMobileSection]       = useState(null) // 'sale' | 'rent' | null
  const [scrolled, setScrolled]                 = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setMobileSection(null)
  }, [location.pathname])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  const closeMobile = useCallback(() => {
    setIsMobileMenuOpen(false)
    setMobileSection(null)
  }, [])

  const transparent = isHome && !scrolled && !isMobileMenuOpen
  const navText = transparent ? 'rgba(255,255,255,0.85)' : '#1a1a1a'
  const bg      = transparent ? 'transparent' : '#F9F7F4'
  const border  = transparent ? 'transparent' : '#E8E4DF'
  const shadow  = scrolled && !transparent ? '0 1px 0 #E8E4DF' : 'none'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Nav link ─────────────────────── */
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -1px;
          width: 0; height: 1px;
          background: #8B7355;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* ── Desktop dropdown items ───────── */
        .dropdown-item {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 400;
          color: #444;
          text-decoration: none;
          padding: 11px 22px;
          border-bottom: 1px solid #F0EDE8;
          letter-spacing: 0.03em;
          transition: color 0.15s, background 0.15s;
        }
        .dropdown-item:last-child { border-bottom: none; }
        .dropdown-item:hover { color: #8B7355; background: #FAFAF8; }

        /* ── Mobile primary link ──────────── */
        .mobile-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #1a1a1a;
          padding: 16px 0;
          border-bottom: 1px solid #F0EDE8;
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          width: 100%;
          text-align: left;
        }
        .mobile-link:last-of-type { border-bottom: none; }
        .mobile-link:hover { color: #8B7355; }

        /* ── Mobile sub-link ──────────────── */
        .mobile-sub {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-decoration: none;
          color: #777;
          padding: 11px 0 11px 18px;
          border-bottom: 1px solid #F5F3F0;
          transition: color 0.2s;
          border-left: 2px solid #F0EDE8;
        }
        .mobile-sub:last-child { border-bottom: none; }
        .mobile-sub:hover { color: #8B7355; border-left-color: #8B7355; }

        /* ── Accordion expand ─────────────── */
        .mobile-section-items {
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.35s ease;
        }

        /* ══════════════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
           xl  : ≤ 1200px  (tight desktop — reduce gaps)
           lg  : ≤ 1024px  (switch to hamburger)
           md  : ≤  768px  (tablet)
           sm  : ≤  640px  (large phone)
           xs  : ≤  420px  (small phone)
        ══════════════════════════════════════════════════ */

        /* ── xl: tighter desktop spacing ─── */
        @media (max-width: 1200px) {
          .nav-desktop-inner { gap: 24px !important; }
          .nav-cta { padding: 9px 18px !important; }
        }

        /* ── lg: hamburger breakpoint ─────── */
        @media (max-width: 1024px) {
          .nav-desktop       { display: none !important; }
          .nav-hamburger     { display: flex !important; }
          .nav-mobile-drawer { display: block !important; }
        }

        /* ── md: reduce navbar height ─────── */
        @media (max-width: 768px) {
          .nav-bar-inner { height: 64px !important; }
          .nav-logo-text { font-size: 22px !important; }
          .nav-logo-sub  { font-size: 9px !important; margin-left: 5px !important; }
          .nav-mobile-drawer { max-height: calc(100vh - 64px) !important; overflow-y: auto !important; }
        }

        /* ── sm ───────────────────────────── */
        @media (max-width: 640px) {
          .nav-bar-inner  { height: 60px !important; padding: 0 5vw !important; }
          .nav-mobile-pad { padding: 4px 5vw 28px !important; }
          .mobile-link    { font-size: 12px !important; padding: 14px 0 !important; }
          .mobile-sub     { font-size: 11px !important; padding: 10px 0 10px 14px !important; }
          .nav-cta-mobile { padding: 13px !important; font-size: 10px !important; }
        }

        /* ── xs ───────────────────────────── */
        @media (max-width: 420px) {
          .nav-logo-text { font-size: 20px !important; }
          .nav-logo-sub  { display: none !important; }
          .nav-bar-inner { height: 56px !important; }
          .nav-mobile-pad { padding: 4px 4vw 24px !important; }
        }

        /* ── Reduced motion ───────────────── */
        @media (prefers-reduced-motion: reduce) {
          .nav-link::after, .mobile-section-items, .nav-mobile-drawer { transition: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: bg,
        borderBottom: `1px solid ${border}`,
        boxShadow: shadow,
        transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}>
        {/* ── BAR ─────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 6vw' }}>
          <div className="nav-bar-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 72 }}>

            {/* LOGO */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span className="nav-logo-text" style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 26, fontWeight: 600,
                color: transparent ? '#fff' : '#1a1a1a',
                letterSpacing: '-0.02em', lineHeight: 1,
                transition: 'color 0.35s',
              }}>HavenRise</span>
              <span className="nav-logo-sub" style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 10, fontWeight: 400,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: '#8B7355', marginLeft: 7, marginBottom: 1,
              }}>Homes</span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="nav-desktop-inner" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
                <Link to="/" className="nav-link" style={{ color: navText }}>Home</Link>

                {/* For Sale */}
                <div style={{ position: 'relative' }}
                  onMouseEnter={() => setOpenDropdown('sale')}
                  onMouseLeave={() => setOpenDropdown(null)}>
                  <button className="nav-link" style={{ color: navText, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
                    For Sale
                    <svg style={{ width: 10, height: 10, transition: 'transform 0.2s', transform: openDropdown === 'sale' ? 'rotate(180deg)' : 'none' }} viewBox="0 0 10 6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === 'sale' && (
                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 16, width: 240, background: '#fff', border: '1px solid #E8E4DF', boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}>
                      <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 9, height: 9, background: '#fff', border: '1px solid #E8E4DF', borderBottom: 'none', borderRight: 'none' }} aria-hidden="true" />
                      {forSaleTypes.map(type => <Link key={type} to="/properties" className="dropdown-item">{type}</Link>)}
                    </div>
                  )}
                </div>

                {/* To Let */}
                <div style={{ position: 'relative' }}
                  onMouseEnter={() => setOpenDropdown('rent')}
                  onMouseLeave={() => setOpenDropdown(null)}>
                  <button className="nav-link" style={{ color: navText, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
                    To Let
                    <svg style={{ width: 10, height: 10, transition: 'transform 0.2s', transform: openDropdown === 'rent' ? 'rotate(180deg)' : 'none' }} viewBox="0 0 10 6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === 'rent' && (
                    <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 16, width: 220, background: '#fff', border: '1px solid #E8E4DF', boxShadow: '0 12px 40px rgba(0,0,0,0.10)' }}>
                      <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 9, height: 9, background: '#fff', border: '1px solid #E8E4DF', borderBottom: 'none', borderRight: 'none' }} aria-hidden="true" />
                      {forRentTypes.map(type => <Link key={type} to="/properties" className="dropdown-item">{type}</Link>)}
                    </div>
                  )}
                </div>

                <Link to="/contact" className="nav-link" style={{ color: navText }}>Contact</Link>

                {/* CTA */}
                <Link to="/contact" className="nav-cta"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', padding: '10px 24px', background: transparent ? 'rgba(255,255,255,0.12)' : '#1a1a1a', color: '#fff', border: `1px solid ${transparent ? 'rgba(255,255,255,0.3)' : '#1a1a1a'}`, transition: 'background 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#8B7355'; e.currentTarget.style.borderColor = '#8B7355' }}
                  onMouseLeave={e => { e.currentTarget.style.background = transparent ? 'rgba(255,255,255,0.12)' : '#1a1a1a'; e.currentTarget.style.borderColor = transparent ? 'rgba(255,255,255,0.3)' : '#1a1a1a' }}>
                  Get Started
                </Link>
              </div>
            </div>

            {/* HAMBURGER */}
            <button
              className="nav-hamburger"
              onClick={() => setIsMobileMenuOpen(o => !o)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexDirection: 'column', gap: 5, alignItems: 'flex-end' }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}>
              <span style={{ display: 'block', height: 1.5, width: 22, background: transparent ? '#fff' : '#1a1a1a', transition: 'all 0.25s', transform: isMobileMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', height: 1.5, width: 16, background: transparent ? '#fff' : '#1a1a1a', transition: 'all 0.25s', opacity: isMobileMenuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', height: 1.5, width: 22, background: transparent ? '#fff' : '#1a1a1a', transition: 'all 0.25s', transform: isMobileMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ───────────────────────────────────── */}
        <div className="nav-mobile-drawer"
          style={{ display: 'none', background: '#F9F7F4', borderTop: '1px solid #E8E4DF', overflow: 'hidden', maxHeight: isMobileMenuOpen ? 600 : 0, transition: 'max-height 0.4s ease', overflowY: 'auto' }}>
          <div className="nav-mobile-pad" style={{ padding: '8px 6vw 32px' }}>

            <Link to="/" onClick={closeMobile} className="mobile-link" style={{ borderBottom: '1px solid #F0EDE8' }}>
              Home
            </Link>

            {/* For Sale accordion */}
            <div>
              <button className="mobile-link"
                onClick={() => setMobileSection(s => s === 'sale' ? null : 'sale')}
                aria-expanded={mobileSection === 'sale'}>
                <span>For Sale</span>
                <svg width="10" height="10" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                  style={{ transition: 'transform 0.25s', transform: mobileSection === 'sale' ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
                  <path d="M1 1l4 4 4-4" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="mobile-section-items" style={{ maxHeight: mobileSection === 'sale' ? 400 : 0, opacity: mobileSection === 'sale' ? 1 : 0, marginBottom: mobileSection === 'sale' ? 4 : 0 }}>
                {forSaleTypes.map(t => <Link key={t} to="/properties" onClick={closeMobile} className="mobile-sub">{t}</Link>)}
              </div>
            </div>

            {/* To Let accordion */}
            <div>
              <button className="mobile-link"
                onClick={() => setMobileSection(s => s === 'rent' ? null : 'rent')}
                aria-expanded={mobileSection === 'rent'}>
                <span>To Let</span>
                <svg width="10" height="10" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                  style={{ transition: 'transform 0.25s', transform: mobileSection === 'rent' ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>
                  <path d="M1 1l4 4 4-4" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="mobile-section-items" style={{ maxHeight: mobileSection === 'rent' ? 400 : 0, opacity: mobileSection === 'rent' ? 1 : 0, marginBottom: mobileSection === 'rent' ? 4 : 0 }}>
                {forRentTypes.map(t => <Link key={t} to="/properties" onClick={closeMobile} className="mobile-sub">{t}</Link>)}
              </div>
            </div>

            <Link to="/contact" onClick={closeMobile} className="mobile-link">Contact</Link>

            <Link to="/contact" onClick={closeMobile} className="nav-cta-mobile"
              style={{ display: 'block', marginTop: 24, fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', padding: '14px', background: '#1a1a1a', color: '#fff' }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer — only non-home pages (home has full-bleed hero) */}
      {!isHome && <div style={{ height: 72 }} className="nav-spacer" />}

      {/* Spacer responsive sizing */}
      <style>{`
        @media (max-width: 768px) { .nav-spacer { height: 64px !important; } }
        @media (max-width: 640px) { .nav-spacer { height: 60px !important; } }
        @media (max-width: 420px) { .nav-spacer { height: 56px !important; } }
      `}</style>
    </>
  )
}

export default Navbar