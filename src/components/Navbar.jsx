import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On home page: start transparent over hero, turn solid on scroll
  // On other pages: always solid
  const transparent = isHome && !scrolled && !isMobileMenuOpen

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

  const navText  = transparent ? 'rgba(255,255,255,0.85)' : '#1a1a1a'
  // const navHover = '#8B7355'
  const bg       = transparent ? 'transparent' : '#F9F7F4'
  const border   = transparent ? 'transparent' : '#E8E4DF'
  const shadow   = scrolled && !transparent ? '0 1px 0 #E8E4DF' : 'none'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');
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
        .mobile-link {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          color: #1a1a1a;
          padding: 14px 0;
          border-bottom: 1px solid #F0EDE8;
          transition: color 0.2s;
        }
        .mobile-link:last-child { border-bottom: none; }
        .mobile-link:hover { color: #8B7355; }
        .mobile-sub {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-decoration: none;
          color: #777;
          padding: 9px 0 9px 16px;
          border-bottom: 1px solid #F5F3F0;
          transition: color 0.2s;
        }
        .mobile-sub:last-child { border-bottom: none; }
        .mobile-sub:hover { color: #8B7355; }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: bg,
        borderBottom: `1px solid ${border}`,
        boxShadow: shadow,
        transition: 'background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 6vw' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 72 }}>

            {/* ── LOGO ── */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 26,
                fontWeight: 600,
                color: transparent ? '#fff' : '#1a1a1a',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                transition: 'color 0.35s',
              }}>
                HavenRise
              </span>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#8B7355',
                marginLeft: 7,
                marginBottom: 1,
              }}>
                Homes
              </span>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>

              <Link to="/" className="nav-link" style={{ color: navText }}>Home</Link>

              {/* For Sale Dropdown */}
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setOpenDropdown('sale')}
                onMouseLeave={() => setOpenDropdown(null)}>
                <button className="nav-link" style={{
                  color: navText, background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit',
                }}>
                  For Sale
                  <svg style={{ width: 10, height: 10, transition: 'transform 0.2s', transform: openDropdown === 'sale' ? 'rotate(180deg)' : 'none' }} viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {openDropdown === 'sale' && (
                  <div style={{
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                    marginTop: 16, width: 240,
                    background: '#fff', border: '1px solid #E8E4DF',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
                  }}>
                    {/* pointer */}
                    <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 9, height: 9, background: '#fff', border: '1px solid #E8E4DF', borderBottom: 'none', borderRight: 'none' }} />
                    {forSaleTypes.map((type) => (
                      <Link key={type} to="/properties" className="dropdown-item">{type}</Link>
                    ))}
                  </div>
                )}
              </div>

              {/* For Rent Dropdown */}
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setOpenDropdown('rent')}
                onMouseLeave={() => setOpenDropdown(null)}>
                <button className="nav-link" style={{
                  color: navText, background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit',
                }}>
                  To Let
                  <svg style={{ width: 10, height: 10, transition: 'transform 0.2s', transform: openDropdown === 'rent' ? 'rotate(180deg)' : 'none' }} viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {openDropdown === 'rent' && (
                  <div style={{
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                    marginTop: 16, width: 220,
                    background: '#fff', border: '1px solid #E8E4DF',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.10)',
                  }}>
                    <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 9, height: 9, background: '#fff', border: '1px solid #E8E4DF', borderBottom: 'none', borderRight: 'none' }} />
                    {forRentTypes.map((type) => (
                      <Link key={type} to="/properties" className="dropdown-item">{type}</Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/contact" className="nav-link" style={{ color: navText }}>Contact</Link>

              {/* CTA */}
              <Link to="/contact" style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                padding: '10px 24px',
                background: transparent ? 'rgba(255,255,255,0.12)' : '#1a1a1a',
                color: '#fff',
                border: `1px solid ${transparent ? 'rgba(255,255,255,0.3)' : '#1a1a1a'}`,
                transition: 'background 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#8B7355'; e.currentTarget.style.borderColor = '#8B7355' }}
                onMouseLeave={e => { e.currentTarget.style.background = transparent ? 'rgba(255,255,255,0.12)' : '#1a1a1a'; e.currentTarget.style.borderColor = transparent ? 'rgba(255,255,255,0.3)' : '#1a1a1a' }}
              >
                Get Started
              </Link>
            </div>

            {/* ── MOBILE TOGGLE ── */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              className="mobile-toggle"
              aria-label="Toggle menu"
            >
              <div style={{ width: 22, display: 'flex', flexDirection: 'column', gap: isMobileMenuOpen ? 0 : 5, alignItems: 'flex-end' }}>
                <span style={{ display: 'block', height: 1.5, width: '100%', background: transparent ? '#fff' : '#1a1a1a', transition: 'all 0.25s', transform: isMobileMenuOpen ? 'translateY(3px) rotate(45deg)' : 'none' }} />
                <span style={{ display: 'block', height: 1.5, width: isMobileMenuOpen ? '100%' : '75%', background: transparent ? '#fff' : '#1a1a1a', transition: 'all 0.25s', opacity: isMobileMenuOpen ? 0 : 1 }} />
                <span style={{ display: 'block', height: 1.5, width: '100%', background: transparent ? '#fff' : '#1a1a1a', transition: 'all 0.25s', transform: isMobileMenuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div style={{
          background: '#F9F7F4',
          borderTop: '1px solid #E8E4DF',
          overflow: 'hidden',
          maxHeight: isMobileMenuOpen ? 600 : 0,
          transition: 'max-height 0.4s ease',
          display: 'none',
        }} className="mobile-menu">
          <div style={{ padding: '8px 6vw 32px' }}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">Home</Link>

            <div>
              <p className="mobile-link" style={{ cursor: 'default', color: '#1a1a1a' }}>For Sale</p>
              <div style={{ marginBottom: 8 }}>
                {forSaleTypes.map(t => (
                  <Link key={t} to="/properties" onClick={() => setIsMobileMenuOpen(false)} className="mobile-sub">{t}</Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mobile-link" style={{ cursor: 'default', color: '#1a1a1a' }}>To Let</p>
              <div style={{ marginBottom: 8 }}>
                {forRentTypes.map(t => (
                  <Link key={t} to="/properties" onClick={() => setIsMobileMenuOpen(false)} className="mobile-sub">{t}</Link>
                ))}
              </div>
            </div>

            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mobile-link">Contact</Link>

            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{
              display: 'block', marginTop: 24,
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
              textDecoration: 'none', textAlign: 'center',
              padding: '14px', background: '#1a1a1a', color: '#fff',
            }}>
              Get Started
            </Link>
          </div>
        </div>

        {/* Responsive CSS */}
        <style>{`
          @media (max-width: 1024px) {
            .desktop-nav { display: none !important; }
            .mobile-toggle { display: flex !important; }
            .mobile-menu { display: block !important; }
          }
        `}</style>
      </nav>

      {/* Spacer only on non-home pages (home has full-bleed hero) */}
      {!isHome && <div style={{ height: 72 }} />}
    </>
  )
}

export default Navbar