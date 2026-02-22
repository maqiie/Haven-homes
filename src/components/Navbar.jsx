import { useState, useEffect, useCallback, useRef } from 'react'
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
const moreLinks = [
  { label: 'Our Services',          to: '/services',      desc: 'Everything we offer' },
  { label: 'Sell Your Property',    to: '/sellproperty',  desc: 'Free valuation & sale' },
  { label: 'Developer Partnerships',to: '/developer',     desc: 'Land & JV opportunities' },
  { label: 'About Us',              to: '/about',         desc: 'Our story & team' },
]

const Navbar = () => {
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [openDropdown,  setOpenDropdown]  = useState(null)
  const [mobileSection, setMobileSection] = useState(null)
  const [scrolled,      setScrolled]      = useState(false)

  const location = useLocation()
  const isHome   = location.pathname === '/'
  const navRef   = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setMobileOpen(false); setMobileSection(null); setOpenDropdown(null)
  }, [location.pathname])

  useEffect(() => {
    if (!openDropdown) return
    const fn = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [openDropdown])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleDropdown = useCallback((key) => setOpenDropdown(p => p === key ? null : key), [])
  const closeMobile    = useCallback(() => { setMobileOpen(false); setMobileSection(null) }, [])

  const transparent = isHome && !scrolled && !mobileOpen
  const navText = transparent ? 'rgba(255,255,255,0.85)' : '#1a1a1a'
  const bg      = transparent ? 'transparent' : '#F9F7F4'
  const border  = transparent ? 'transparent' : '#E8E4DF'
  const shadow  = scrolled && !transparent ? '0 1px 0 #E8E4DF' : 'none'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          transition: color 0.2s; position: relative; padding-bottom: 2px;
        }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: -1px;
          width: 0; height: 1px; background: #8B7355; transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }

        /* ── Standard dropdown ── */
        .dd-wrap  { position: relative; }
        .dd-panel {
          position: absolute; top: calc(100% + 12px); left: 50%;
          transform: translateX(-50%);
          background: #fff; border: 1px solid #E8E4DF;
          box-shadow: 0 12px 40px rgba(0,0,0,0.10); z-index: 200; min-width: 220px;
        }
        .dd-pip {
          position: absolute; top: -5px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 9px; height: 9px; background: #fff;
          border: 1px solid #E8E4DF; border-bottom: none; border-right: none;
        }
        .dd-item {
          display: block; font-family: 'DM Sans', sans-serif; font-size: 12.5px;
          font-weight: 400; color: #444; text-decoration: none;
          padding: 11px 22px; border-bottom: 1px solid #F0EDE8;
          letter-spacing: 0.03em; transition: color 0.15s, background 0.15s; white-space: nowrap;
        }
        .dd-item:last-child  { border-bottom: none; }
        .dd-item:hover       { color: #8B7355; background: #FAFAF8; }

        /* ── "More" mega-style dropdown — wider, shows desc ── */
        .dd-more-panel {
          position: absolute; top: calc(100% + 12px); right: 0;
          background: #fff; border: 1px solid #E8E4DF;
          box-shadow: 0 12px 40px rgba(0,0,0,0.10); z-index: 200; width: 280px;
        }
        .dd-more-pip {
          position: absolute; top: -5px; right: 28px;
          transform: rotate(45deg);
          width: 9px; height: 9px; background: #fff;
          border: 1px solid #E8E4DF; border-bottom: none; border-right: none;
        }
        .dd-more-item {
          display: block; text-decoration: none;
          padding: 14px 22px; border-bottom: 1px solid #F0EDE8;
          transition: background 0.15s;
        }
        .dd-more-item:last-child { border-bottom: none; }
        .dd-more-item:hover { background: #FAFAF8; }
        .dd-more-item:hover .dd-more-title { color: #8B7355; }
        .dd-more-title {
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
          color: #1a1a1a; letter-spacing: 0.03em; display: block; margin-bottom: 2px;
          transition: color 0.15s;
        }
        .dd-more-desc {
          font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 300;
          color: #aaa; letter-spacing: 0.02em; display: block;
        }

        .dd-caret         { width: 10px; height: 10px; transition: transform 0.2s; flex-shrink: 0; }
        .dd-caret.is-open { transform: rotate(180deg); }

        /* ── Mobile links ── */
        .mob-link {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; font-family: 'DM Sans', sans-serif; font-size: 13px;
          font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
          text-decoration: none; color: #1a1a1a;
          padding: 16px 0; border: none; border-bottom: 1px solid #F0EDE8;
          background: none; cursor: pointer; text-align: left;
          transition: color 0.2s; line-height: 1;
        }
        .mob-link:hover { color: #8B7355; }
        .mob-sub {
          display: block; font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 400; letter-spacing: 0.06em; text-decoration: none; color: #666;
          padding: 11px 0 11px 18px;
          border-bottom: 1px solid #F5F3F0; border-left: 2px solid #E8E4DF;
          transition: color 0.2s, border-left-color 0.2s;
        }
        .mob-sub:last-child { border-bottom: none; }
        .mob-sub:hover { color: #8B7355; border-left-color: #8B7355; }
        .mob-acc { overflow: hidden; transition: max-height 0.32s ease, opacity 0.28s ease; }

        /* ═══════ RESPONSIVE ═══════ */
        @media (max-width: 1280px) {
          .nav-desktop-row { gap: 20px !important; }
          .nav-cta         { padding: 9px 16px !important; }
        }
        @media (max-width: 1100px) {
          .nav-desktop-row { gap: 16px !important; }
        }
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: flex !important; }
          .nav-drawer  { display: block !important; }
        }
        @media (max-width: 768px) {
          .nav-bar   { height: 64px !important; }
          .logo-word { font-size: 22px !important; }
          .logo-tag  { font-size: 9px !important; }
        }
        @media (max-width: 640px) {
          .nav-bar        { height: 60px !important; padding: 0 5vw !important; }
          .nav-drawer-pad { padding: 6px 5vw 32px !important; }
          .mob-link       { font-size: 12px !important; padding: 14px 0 !important; }
          .mob-sub        { font-size: 11px !important; }
        }
        @media (max-width: 420px) {
          .nav-bar        { height: 56px !important; padding: 0 4vw !important; }
          .logo-word      { font-size: 20px !important; }
          .logo-tag       { display: none !important; }
          .nav-drawer-pad { padding: 6px 4vw 28px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-link::after, .mob-acc, .dd-caret { transition: none !important; }
        }
      `}</style>

      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: bg, borderBottom: `1px solid ${border}`,
        boxShadow: shadow,
        transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}>
        {/* ── TOP BAR ─────────────────────────────────────── */}
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 72, padding: '0 6vw' }}>

            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 2, flexShrink: 0 }}>
              <span className="logo-word" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 26, fontWeight: 600, color: transparent ? '#fff' : '#1a1a1a', letterSpacing: '-0.02em', lineHeight: 1, transition: 'color 0.35s' }}>HavenRise</span>
              <span className="logo-tag"  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B7355', marginLeft: 7 }}>Realty</span>
            </Link>

            {/* ── DESKTOP NAV — hidden ≤1024px ── */}
            <div className="nav-desktop" style={{ display: 'flex' }}>
              <div className="nav-desktop-row" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>

                <Link to="/" className="nav-link" style={{ color: navText }}>Home</Link>

                {/* For Sale */}
                <div className="dd-wrap">
                  <button className="nav-link" onClick={() => toggleDropdown('sale')}
                    aria-expanded={openDropdown === 'sale'} aria-haspopup="true"
                    style={{ color: navText, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
                    For Sale
                    <svg className={`dd-caret${openDropdown === 'sale' ? ' is-open' : ''}`} viewBox="0 0 10 6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === 'sale' && (
                    <div className="dd-panel" style={{ width: 248 }} role="menu">
                      <div className="dd-pip" aria-hidden="true" />
                      {forSaleTypes.map(t => (
                        <Link key={t} to="/properties" className="dd-item" role="menuitem" onClick={() => setOpenDropdown(null)}>{t}</Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* To Let */}
                <div className="dd-wrap">
                  <button className="nav-link" onClick={() => toggleDropdown('rent')}
                    aria-expanded={openDropdown === 'rent'} aria-haspopup="true"
                    style={{ color: navText, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
                    To Let
                    <svg className={`dd-caret${openDropdown === 'rent' ? ' is-open' : ''}`} viewBox="0 0 10 6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === 'rent' && (
                    <div className="dd-panel" style={{ width: 228 }} role="menu">
                      <div className="dd-pip" aria-hidden="true" />
                      {forRentTypes.map(t => (
                        <Link key={t} to="/properties" className="dd-item" role="menuitem" onClick={() => setOpenDropdown(null)}>{t}</Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sell — direct link, visually distinct */}
                <Link to="/sellproperty" className="nav-link" style={{ color: navText }}>Sell</Link>

                {/* More dropdown — Services, Developers, About */}
                <div className="dd-wrap">
                  <button className="nav-link" onClick={() => toggleDropdown('more')}
                    aria-expanded={openDropdown === 'more'} aria-haspopup="true"
                    style={{ color: navText, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit' }}>
                    More
                    <svg className={`dd-caret${openDropdown === 'more' ? ' is-open' : ''}`} viewBox="0 0 10 6" fill="none" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openDropdown === 'more' && (
                    <div className="dd-more-panel" role="menu">
                      <div className="dd-more-pip" aria-hidden="true" />
                      {moreLinks.map(item => (
                        <Link key={item.to} to={item.to} className="dd-more-item" role="menuitem" onClick={() => setOpenDropdown(null)}>
                          <span className="dd-more-title">{item.label}</span>
                          <span className="dd-more-desc">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/contact" className="nav-link" style={{ color: navText }}>Contact</Link>

                {/* CTA */}
                <Link to="/sellproperty" className="nav-cta"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', padding: '10px 22px', background: transparent ? 'rgba(255,255,255,0.12)' : '#8B7355', color: '#fff', border: `1px solid ${transparent ? 'rgba(255,255,255,0.3)' : '#8B7355'}`, transition: 'background 0.2s, border-color 0.2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.borderColor = '#1a1a1a' }}
                  onMouseLeave={e => { e.currentTarget.style.background = transparent ? 'rgba(255,255,255,0.12)' : '#8B7355'; e.currentTarget.style.borderColor = transparent ? 'rgba(255,255,255,0.3)' : '#8B7355' }}>
                  Free Valuation
                </Link>
              </div>
            </div>

            {/* Hamburger — hidden on desktop ── */}
            <button className="nav-burger"
              onClick={() => { setMobileOpen(o => !o); setMobileSection(null) }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 6, flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center', width: 36, height: 36 }}>
              <span style={{ display: 'block', height: 1.5, width: 22, background: transparent ? '#fff' : '#1a1a1a', transition: 'transform 0.25s', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', height: 1.5, width: 16, background: transparent ? '#fff' : '#1a1a1a', transition: 'opacity 0.25s', opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: 'block', height: 1.5, width: 22, background: transparent ? '#fff' : '#1a1a1a', transition: 'transform 0.25s', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ─────────────────────────────────── */}
        <div className="nav-drawer"
          style={{ display: 'none', background: '#F9F7F4', borderTop: '1px solid #E8E4DF', overflow: 'hidden', maxHeight: mobileOpen ? 'calc(100dvh - 72px)' : 0, overflowY: mobileOpen ? 'auto' : 'hidden', transition: 'max-height 0.4s ease', WebkitOverflowScrolling: 'touch' }}>
          <div className="nav-drawer-pad" style={{ padding: '8px 6vw 32px' }}>

            <Link to="/" onClick={closeMobile} className="mob-link">Home</Link>

            {/* For Sale accordion */}
            <div>
              <button className="mob-link" onClick={() => setMobileSection(s => s === 'sale' ? null : 'sale')} aria-expanded={mobileSection === 'sale'}>
                <span>For Sale</span>
                <svg viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ width: 10, height: 10, flexShrink: 0, transition: 'transform 0.25s', transform: mobileSection === 'sale' ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l4 4 4-4" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="mob-acc" style={{ maxHeight: mobileSection === 'sale' ? 400 : 0, opacity: mobileSection === 'sale' ? 1 : 0, marginBottom: mobileSection === 'sale' ? 4 : 0 }}>
                {forSaleTypes.map(t => <Link key={t} to="/properties" onClick={closeMobile} className="mob-sub">{t}</Link>)}
              </div>
            </div>

            {/* To Let accordion */}
            <div>
              <button className="mob-link" onClick={() => setMobileSection(s => s === 'rent' ? null : 'rent')} aria-expanded={mobileSection === 'rent'}>
                <span>To Let</span>
                <svg viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ width: 10, height: 10, flexShrink: 0, transition: 'transform 0.25s', transform: mobileSection === 'rent' ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l4 4 4-4" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="mob-acc" style={{ maxHeight: mobileSection === 'rent' ? 240 : 0, opacity: mobileSection === 'rent' ? 1 : 0, marginBottom: mobileSection === 'rent' ? 4 : 0 }}>
                {forRentTypes.map(t => <Link key={t} to="/properties" onClick={closeMobile} className="mob-sub">{t}</Link>)}
              </div>
            </div>

            {/* Sell — direct */}
            <Link to="/sellproperty" onClick={closeMobile} className="mob-link">Sell Your Property</Link>

            {/* More accordion */}
            <div>
              <button className="mob-link" onClick={() => setMobileSection(s => s === 'more' ? null : 'more')} aria-expanded={mobileSection === 'more'}>
                <span>More</span>
                <svg viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ width: 10, height: 10, flexShrink: 0, transition: 'transform 0.25s', transform: mobileSection === 'more' ? 'rotate(180deg)' : 'none' }}>
                  <path d="M1 1l4 4 4-4" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="mob-acc" style={{ maxHeight: mobileSection === 'more' ? 300 : 0, opacity: mobileSection === 'more' ? 1 : 0, marginBottom: mobileSection === 'more' ? 4 : 0 }}>
                {moreLinks.map(item => (
                  <Link key={item.to} to={item.to} onClick={closeMobile} className="mob-sub">{item.label}</Link>
                ))}
              </div>
            </div>

            <Link to="/contact" onClick={closeMobile} className="mob-link">Contact</Link>

            {/* Mobile CTA */}
            <Link to="/sellproperty" onClick={closeMobile}
              style={{ display: 'block', marginTop: 24, fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', padding: '14px', background: '#8B7355', color: '#fff' }}>
              Free Property Valuation
            </Link>
            <Link to="/contact" onClick={closeMobile}
              style={{ display: 'block', marginTop: 8, fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', padding: '14px', background: '#1a1a1a', color: '#fff' }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Page spacer — non-home pages only */}
      {!isHome && (
        <>
          <div className="nav-spacer" style={{ height: 72 }} />
          <style>{`
            @media (max-width: 768px) { .nav-spacer { height: 64px !important; } }
            @media (max-width: 640px) { .nav-spacer { height: 60px !important; } }
            @media (max-width: 420px) { .nav-spacer { height: 56px !important; } }
          `}</style>
        </>
      )}
    </>
  )
}

export default Navbar