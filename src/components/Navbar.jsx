import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const forSaleTypes = [
  { label: 'All Properties For Sale', to: '/properties?type=for-sale' },
  { label: 'Apartments For Sale',     to: '/properties?type=for-sale&propertyType=apartment' },
  { label: 'Villas For Sale',         to: '/properties?type=for-sale&propertyType=villa' },
  { label: 'Houses For Sale',         to: '/properties?type=for-sale&propertyType=house' },
  { label: 'Townhouses For Sale',     to: '/properties?type=for-sale&propertyType=townhouse' },
]
const forRentTypes = [
  { label: 'All Properties To Let',  to: '/properties?type=for-rent' },
  { label: 'Houses To Let',          to: '/properties?type=for-rent&propertyType=house' },
  { label: 'Villas To Let',          to: '/properties?type=for-rent&propertyType=villa' },
]
const moreLinks = [
  { label: 'Our Services',           to: '/services',     desc: 'Everything we offer' },
  { label: 'Sell Your Property',     to: '/sellproperty', desc: 'Free valuation & sale' },
  { label: 'Developer Partnerships', to: '/developer',    desc: 'Land & JV opportunities' },
  { label: 'About Us',               to: '/about',        desc: 'Our story & team' },
]

const ChevronIcon = ({ open }) => (
  <svg
    width="9" height="6" viewBox="0 0 9 6" fill="none"
    style={{ transition: 'transform 0.25s cubic-bezier(.4,0,.2,1)', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}
    aria-hidden="true"
  >
    <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

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
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setMobileOpen(false); setMobileSection(null); setOpenDropdown(null)
  }, [location.pathname, location.search])

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --nav-gold:    #8B7355;
          --nav-dark:    #1a1a1a;
          --nav-cream:   #F9F7F4;
          --nav-border:  #E8E4DF;
          --nav-muted:   #6b6b6b;
          --nav-hover:   #FAFAF9;
        }

        /* ── Base link ── */
        .hr-nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          padding-bottom: 1px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .hr-nav-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1px;
          background: var(--nav-gold);
          transition: width 0.28s cubic-bezier(.4,0,.2,1);
        }
        .hr-nav-link:hover::after { width: 100%; }

        /* ── Dropdown trigger (button) ── */
        .hr-nav-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: none; border: none;
          cursor: pointer;
          display: flex; align-items: center; gap: 5px;
          padding: 0; position: relative; padding-bottom: 1px;
          transition: color 0.2s;
        }
        .hr-nav-btn::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1px;
          background: var(--nav-gold);
          transition: width 0.28s cubic-bezier(.4,0,.2,1);
        }
        .hr-nav-btn:hover::after,
        .hr-nav-btn[aria-expanded="true"]::after { width: calc(100% - 14px); }

        /* ── Dropdown panels ── */
        .hr-dd-panel {
          position: absolute;
          top: calc(100% + 16px);
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border: 1px solid var(--nav-border);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
          z-index: 200;
          min-width: 230px;
          animation: ddFadeIn 0.18s ease both;
        }
        .hr-dd-panel-right {
          left: auto; right: 0;
          transform: none;
          width: 280px;
        }
        @keyframes ddFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(-4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .hr-dd-panel-right {
          animation: ddFadeInRight 0.18s ease both;
        }
        @keyframes ddFadeInRight {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* pip / caret decoration */
        .hr-dd-pip {
          position: absolute; top: -5px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 8px; height: 8px;
          background: #fff;
          border: 1px solid var(--nav-border);
          border-bottom: none; border-right: none;
        }
        .hr-dd-pip-right {
          left: auto; right: 26px;
        }

        /* dropdown items */
        .hr-dd-item {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 400;
          color: #444;
          text-decoration: none;
          padding: 12px 22px;
          border-bottom: 1px solid #F2EFEB;
          letter-spacing: 0.02em;
          transition: color 0.15s, background 0.15s, padding-left 0.2s;
          white-space: nowrap;
        }
        .hr-dd-item:last-child { border-bottom: none; }
        .hr-dd-item:hover {
          color: var(--nav-gold);
          background: var(--nav-hover);
          padding-left: 26px;
        }

        /* more-style items with description */
        .hr-dd-more-item {
          display: block; text-decoration: none;
          padding: 14px 22px;
          border-bottom: 1px solid #F2EFEB;
          transition: background 0.15s;
        }
        .hr-dd-more-item:last-child { border-bottom: none; }
        .hr-dd-more-item:hover { background: var(--nav-hover); }
        .hr-dd-more-item:hover .hr-dd-more-title { color: var(--nav-gold); }
        .hr-dd-more-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px; font-weight: 500;
          color: var(--nav-dark);
          letter-spacing: 0.03em;
          display: block; margin-bottom: 2px;
          transition: color 0.15s;
        }
        .hr-dd-more-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 10.5px; font-weight: 300;
          color: #b0a898; letter-spacing: 0.02em; display: block;
        }

        /* ── Mobile ── */
        .hr-mob-link {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px; font-weight: 500;
          letter-spacing: 0.13em; text-transform: uppercase;
          text-decoration: none; color: var(--nav-dark);
          padding: 16px 0;
          border: none; border-bottom: 1px solid var(--nav-border);
          background: none; cursor: pointer; text-align: left;
          transition: color 0.2s; line-height: 1;
        }
        .hr-mob-link:hover { color: var(--nav-gold); }
        .hr-mob-sub {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px; font-weight: 400;
          letter-spacing: 0.04em; text-decoration: none;
          color: var(--nav-muted);
          padding: 11px 0 11px 20px;
          border-bottom: 1px solid #F5F3F0;
          border-left: 1.5px solid var(--nav-border);
          transition: color 0.2s, border-left-color 0.2s, padding-left 0.2s;
        }
        .hr-mob-sub:last-child { border-bottom: none; }
        .hr-mob-sub:hover {
          color: var(--nav-gold);
          border-left-color: var(--nav-gold);
          padding-left: 24px;
        }
        .hr-mob-acc {
          overflow: hidden;
          transition: max-height 0.32s cubic-bezier(.4,0,.2,1), opacity 0.25s ease;
        }

        /* gold accent bar at top of nav (non-transparent) */
        .hr-nav-accent {
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, var(--nav-gold) 40%, #c4a87a 70%, transparent 100%);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .hr-nav-accent.visible { opacity: 1; }

        /* responsive */
        @media (max-width: 1024px) {
          .hr-nav-desktop { display: none !important; }
          .hr-nav-burger  { display: flex !important; }
          .hr-nav-drawer  { display: block !important; }
        }
        @media (max-width: 768px) {
          .hr-nav-bar { height: 64px !important; }
          .hr-logo-word { font-size: 23px !important; }
        }
        @media (max-width: 640px) {
          .hr-nav-bar { height: 60px !important; padding: 0 5vw !important; }
          .hr-drawer-pad { padding: 6px 5vw 36px !important; }
        }
        @media (max-width: 420px) {
          .hr-nav-bar { height: 56px !important; padding: 0 4vw !important; }
          .hr-logo-word { font-size: 21px !important; }
          .hr-logo-tag { display: none !important; }
          .hr-drawer-pad { padding: 6px 4vw 28px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hr-nav-link::after, .hr-nav-btn::after, .hr-mob-acc,
          .hr-dd-panel, .hr-dd-panel-right { transition: none !important; animation: none !important; }
        }
      `}</style>

      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: transparent ? 'transparent' : 'rgba(249,247,244,0.97)',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: transparent ? 'none' : 'blur(12px)',
        borderBottom: `1px solid ${transparent ? 'transparent' : 'var(--nav-border)'}`,
        boxShadow: scrolled && !transparent ? '0 1px 0 #E8E4DF' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      }}>
        {/* top gold accent line */}
        <div className={`hr-nav-accent${!transparent ? ' visible' : ''}`} />

        <div style={{ maxWidth: 1380, margin: '0 auto' }}>
          <div className="hr-nav-bar" style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            height: 72, padding: '0 5vw',
          }}>

            {/* ── Logo ── */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 0, flexShrink: 0 }}>
              <span className="hr-logo-word" style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 27, fontWeight: 600,
                color: transparent ? '#fff' : 'var(--nav-dark)',
                letterSpacing: '-0.02em', lineHeight: 1,
                transition: 'color 0.4s',
              }}>HavenRise</span>
              <span className="hr-logo-tag" style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 9.5, fontWeight: 400,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'var(--nav-gold)', marginLeft: 8,
                transition: 'opacity 0.4s',
              }}>Realty</span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hr-nav-desktop" style={{ display: 'flex' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>

                <Link to="/" className="hr-nav-link"
                  style={{ color: transparent ? 'rgba(255,255,255,0.88)' : 'var(--nav-dark)' }}>
                  Home
                </Link>

                {/* For Sale */}
                <div style={{ position: 'relative' }}>
                  <button className="hr-nav-btn"
                    onClick={() => toggleDropdown('sale')}
                    aria-expanded={openDropdown === 'sale'}
                    aria-haspopup="true"
                    style={{ color: transparent ? 'rgba(255,255,255,0.88)' : 'var(--nav-dark)' }}>
                    For Sale
                    <ChevronIcon open={openDropdown === 'sale'} />
                  </button>
                  {openDropdown === 'sale' && (
                    <div className="hr-dd-panel" role="menu">
                      <div className="hr-dd-pip" />
                      {forSaleTypes.map(item => (
                        <Link key={item.to} to={item.to} className="hr-dd-item"
                          role="menuitem" onClick={() => setOpenDropdown(null)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* To Let */}
                <div style={{ position: 'relative' }}>
                  <button className="hr-nav-btn"
                    onClick={() => toggleDropdown('rent')}
                    aria-expanded={openDropdown === 'rent'}
                    aria-haspopup="true"
                    style={{ color: transparent ? 'rgba(255,255,255,0.88)' : 'var(--nav-dark)' }}>
                    To Let
                    <ChevronIcon open={openDropdown === 'rent'} />
                  </button>
                  {openDropdown === 'rent' && (
                    <div className="hr-dd-panel" role="menu">
                      <div className="hr-dd-pip" />
                      {forRentTypes.map(item => (
                        <Link key={item.to} to={item.to} className="hr-dd-item"
                          role="menuitem" onClick={() => setOpenDropdown(null)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/sellproperty" className="hr-nav-link"
                  style={{ color: transparent ? 'rgba(255,255,255,0.88)' : 'var(--nav-dark)' }}>
                  Sell
                </Link>

                {/* More */}
                <div style={{ position: 'relative' }}>
                  <button className="hr-nav-btn"
                    onClick={() => toggleDropdown('more')}
                    aria-expanded={openDropdown === 'more'}
                    aria-haspopup="true"
                    style={{ color: transparent ? 'rgba(255,255,255,0.88)' : 'var(--nav-dark)' }}>
                    More
                    <ChevronIcon open={openDropdown === 'more'} />
                  </button>
                  {openDropdown === 'more' && (
                    <div className="hr-dd-panel hr-dd-panel-right" role="menu">
                      <div className="hr-dd-pip hr-dd-pip-right" />
                      {moreLinks.map(item => (
                        <Link key={item.to} to={item.to} className="hr-dd-more-item"
                          role="menuitem" onClick={() => setOpenDropdown(null)}>
                          <span className="hr-dd-more-title">{item.label}</span>
                          <span className="hr-dd-more-desc">{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link to="/contact" className="hr-nav-link"
                  style={{ color: transparent ? 'rgba(255,255,255,0.88)' : 'var(--nav-dark)' }}>
                  Contact
                </Link>

                {/* CTA — Get Started */}
                <Link to="/contact"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: 10.5, fontWeight: 600,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    textDecoration: 'none',
                    padding: '10px 20px',
                    background: transparent ? 'rgba(255,255,255,0.1)' : 'var(--nav-gold)',
                    color: '#fff',
                    border: `1px solid ${transparent ? 'rgba(255,255,255,0.35)' : 'var(--nav-gold)'}`,
                    transition: 'background 0.22s, border-color 0.22s, transform 0.15s',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--nav-dark)'
                    e.currentTarget.style.borderColor = 'var(--nav-dark)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = transparent ? 'rgba(255,255,255,0.1)' : 'var(--nav-gold)'
                    e.currentTarget.style.borderColor = transparent ? 'rgba(255,255,255,0.35)' : 'var(--nav-gold)'
                    e.currentTarget.style.transform = 'none'
                  }}>
                  Get Started
                </Link>

              </div>
            </div>

            {/* ── Hamburger ── */}
            <button
              className="hr-nav-burger"
              onClick={() => { setMobileOpen(o => !o); setMobileSection(null) }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              style={{
                display: 'none',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 6, flexDirection: 'column', gap: 5,
                alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36,
              }}>
              {[
                { transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none', width: 22 },
                { opacity: mobileOpen ? 0 : 1, width: 14 },
                { transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none', width: 22 },
              ].map((s, i) => (
                <span key={i} style={{
                  display: 'block', height: 1.5,
                  background: transparent ? '#fff' : 'var(--nav-dark)',
                  transition: 'transform 0.28s ease, opacity 0.22s ease',
                  ...s,
                }} />
              ))}
            </button>

          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div className="hr-nav-drawer" style={{
          display: 'none',
          background: 'var(--nav-cream)',
          borderTop: '1px solid var(--nav-border)',
          maxHeight: mobileOpen ? 'calc(100dvh - 72px)' : 0,
          overflowY: mobileOpen ? 'auto' : 'hidden',
          transition: 'max-height 0.4s cubic-bezier(.4,0,.2,1)',
          WebkitOverflowScrolling: 'touch',
        }}>
          <div className="hr-drawer-pad" style={{ padding: '6px 5vw 36px' }}>

            <Link to="/" onClick={closeMobile} className="hr-mob-link">Home</Link>

            {/* For Sale accordion */}
            <div>
              <button className="hr-mob-link"
                onClick={() => setMobileSection(s => s === 'sale' ? null : 'sale')}
                aria-expanded={mobileSection === 'sale'}>
                <span>For Sale</span>
                <ChevronIcon open={mobileSection === 'sale'} />
              </button>
              <div className="hr-mob-acc" style={{
                maxHeight: mobileSection === 'sale' ? 400 : 0,
                opacity: mobileSection === 'sale' ? 1 : 0,
                marginBottom: mobileSection === 'sale' ? 6 : 0,
              }}>
                {forSaleTypes.map(item => (
                  <Link key={item.to} to={item.to} onClick={closeMobile} className="hr-mob-sub">{item.label}</Link>
                ))}
              </div>
            </div>

            {/* To Let accordion */}
            <div>
              <button className="hr-mob-link"
                onClick={() => setMobileSection(s => s === 'rent' ? null : 'rent')}
                aria-expanded={mobileSection === 'rent'}>
                <span>To Let</span>
                <ChevronIcon open={mobileSection === 'rent'} />
              </button>
              <div className="hr-mob-acc" style={{
                maxHeight: mobileSection === 'rent' ? 240 : 0,
                opacity: mobileSection === 'rent' ? 1 : 0,
                marginBottom: mobileSection === 'rent' ? 6 : 0,
              }}>
                {forRentTypes.map(item => (
                  <Link key={item.to} to={item.to} onClick={closeMobile} className="hr-mob-sub">{item.label}</Link>
                ))}
              </div>
            </div>

            <Link to="/sellproperty" onClick={closeMobile} className="hr-mob-link">Sell Your Property</Link>

            {/* More accordion */}
            <div>
              <button className="hr-mob-link"
                onClick={() => setMobileSection(s => s === 'more' ? null : 'more')}
                aria-expanded={mobileSection === 'more'}>
                <span>More</span>
                <ChevronIcon open={mobileSection === 'more'} />
              </button>
              <div className="hr-mob-acc" style={{
                maxHeight: mobileSection === 'more' ? 300 : 0,
                opacity: mobileSection === 'more' ? 1 : 0,
                marginBottom: mobileSection === 'more' ? 6 : 0,
              }}>
                {moreLinks.map(item => (
                  <Link key={item.to} to={item.to} onClick={closeMobile} className="hr-mob-sub">{item.label}</Link>
                ))}
              </div>
            </div>

            <Link to="/contact" onClick={closeMobile} className="hr-mob-link">Contact</Link>

            {/* Mobile CTA */}
            <Link to="/contact" onClick={closeMobile} style={{
              display: 'block', marginTop: 28,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none', textAlign: 'center',
              padding: '15px', background: 'var(--nav-gold)', color: '#fff',
            }}>
              Get Started
            </Link>

          </div>
        </div>
      </nav>

      {/* Spacer for non-home pages */}
      {!isHome && (
        <>
          <div className="hr-nav-spacer" style={{ height: 72 }} />
          <style>{`
            @media (max-width: 768px) { .hr-nav-spacer { height: 64px !important; } }
            @media (max-width: 640px) { .hr-nav-spacer { height: 60px !important; } }
            @media (max-width: 420px) { .hr-nav-spacer { height: 56px !important; } }
          `}</style>
        </>
      )}
    </>
  )
}

export default Navbar