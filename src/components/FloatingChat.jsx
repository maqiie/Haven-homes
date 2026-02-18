import { useState, useEffect, useRef } from 'react'
// ─── CONFIG ──────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = '254728686089'
const WHATSAPP_MESSAGE = 'Hi HavenRise! I\'d like to enquire about a property.'
// ─────────────────────────────────────────────────────────────────────────────
const FloatingChat = () => {
  const [open, setOpen]         = useState(false)
  const [visible, setVisible]   = useState(false)
  const [inputVal, setInputVal] = useState('')
  const [sent, setSent]         = useState(false)
  const [activeTab, setActiveTab] = useState('chat') // 'chat' | 'call'
  const panelRef = useRef(null)
  // Show button after 2s
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])
  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])
  const handleWhatsApp = () => {
    const msg = inputVal.trim() || WHATSAPP_MESSAGE
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
    setTimeout(() => { setSent(false); setInputVal(''); setOpen(false) }, 2000)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleWhatsApp() }
  }
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        .fchat-btn {
          width: 58px; height: 58px; border-radius: 50%;
          background: #1a1a1a; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.22);
          transition: transform 0.25s ease, background 0.2s;
          position: relative;
        }
        .fchat-btn:hover { transform: scale(1.08); background: #8B7355; }
        .fchat-panel {
          position: absolute; bottom: 72px; right: 0;
          width: 340px;
          background: #fff;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
          animation: slideUp 0.3s ease;
          overflow: hidden;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fchat-tab {
          flex: 1; padding: 12px 8px; font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; cursor: pointer; border: none;
          background: transparent; transition: all 0.2s;
        }
        .fchat-input {
          width: 100%; padding: 13px 16px; font-size: 13px;
          font-family: 'DM Sans', sans-serif; border: none;
          background: #F9F7F4; resize: none; color: #1a1a1a;
          border-top: 1px solid #F0EDE8;
        }
        .fchat-input:focus { outline: none; }
        .fchat-input::placeholder { color: #bbb; }
        .fchat-send {
          width: 100%; padding: 14px; background: #25D366;
          color: #fff; font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.15em;
          text-transform: uppercase; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.2s;
        }
        .fchat-send:hover { background: #128C7E; }
        .pulse-ring {
          position: absolute; inset: -4px; border-radius: 50%;
          border: 2px solid rgba(139,115,85,0.4);
          animation: pulseRing 2s ease infinite;
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.8; }
          70%  { transform: scale(1.25); opacity: 0; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        .fchat-float-wrap {
          position: fixed; bottom: 28px; right: 28px; z-index: 9999;
          transition: opacity 0.4s, transform 0.4s;
        }
        .contact-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 20px; border-bottom: 1px solid #F5F3F0;
          text-decoration: none; transition: background 0.15s;
          cursor: pointer;
        }
        .contact-row:hover { background: #FAFAF8; }
        .contact-icon {
          width: 38px; height: 38px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
      `}</style>
      <div
        ref={panelRef}
        className="fchat-float-wrap"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
        {/* ── PANEL ── */}
        {open && (
          <div className="fchat-panel">
            {/* Header */}
            <div style={{ background: '#1a1a1a', padding: '20px 20px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Avatar */}
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 600, color: '#fff' }}>H</span>
                    </div>
                    {/* Online dot */}
                    <span style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, borderRadius: '50%', background: '#25D366', border: '2px solid #1a1a1a' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, fontWeight: 600, color: '#fff', lineHeight: 1 }}>HavenRise Realty</p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: '#25D366', marginTop: 3, fontWeight: 400 }}>● Online now</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 4, fontFamily: 'inherit' }}>✕</button>
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 300, lineHeight: 1.5 }}>
                Typically replies within minutes. Start a conversation below.
              </p>
            </div>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #F0EDE8' }}>
              <button className="fchat-tab"
                style={{ color: activeTab === 'chat' ? '#1a1a1a' : '#bbb', borderBottom: activeTab === 'chat' ? '2px solid #8B7355' : '2px solid transparent' }}
                onClick={() => setActiveTab('chat')}>
                Message
              </button>
              <button className="fchat-tab"
                style={{ color: activeTab === 'call' ? '#1a1a1a' : '#bbb', borderBottom: activeTab === 'call' ? '2px solid #8B7355' : '2px solid transparent' }}
                onClick={() => setActiveTab('call')}>
                Call / Email
              </button>
            </div>
            {/* ── CHAT TAB ── */}
            {activeTab === 'chat' && (
              <>
                {/* Greeting bubble */}
                <div style={{ padding: '20px 20px 12px', background: '#F9F7F4' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#8B7355', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, fontWeight: 600, color: '#fff' }}>H</span>
                    </div>
                    <div style={{ background: '#fff', padding: '12px 14px', fontSize: 13, fontFamily: 'DM Sans, sans-serif', color: '#333', lineHeight: 1.6, fontWeight: 300, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', maxWidth: 230 }}>
                      👋 Hi there! Welcome to <strong style={{ fontWeight: 600 }}>HavenRise Realty</strong>.<br />
                      Looking to buy, rent, or list a property? We're here to help!
                    </div>
                  </div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: '#ccc', marginTop: 6, marginLeft: 40, letterSpacing: '0.05em' }}>HavenRise · just now</p>
                </div>
                {sent ? (
                  <div style={{ padding: '20px', textAlign: 'center', background: '#f0fdf4' }}>
                    <p style={{ fontSize: 13, color: '#16a34a', fontFamily: 'DM Sans, sans-serif', fontWeight: 500 }}>
                      ✓ Opening WhatsApp…
                    </p>
                  </div>
                ) : (
                  <div>
                    <textarea
                      className="fchat-input"
                      rows={3}
                      placeholder="Type your message here…"
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button className="fchat-send" onClick={handleWhatsApp}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Chat on WhatsApp
                    </button>
                  </div>
                )}
              </>
            )}
            {/* ── CALL TAB ── */}
            {activeTab === 'call' && (
              <div style={{ paddingBottom: 4 }}>
                {/* Call — primary number */}
                <a href="tel:+254728686089" className="contact-row" style={{ textDecoration: 'none' }}>
                  <div className="contact-icon" style={{ background: '#EEF9F1' }}>
                    <svg width="17" height="17" fill="none" stroke="#16a34a" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Call Us</p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#888', marginTop: 2, fontWeight: 300 }}>0728 686 089 / 0732 866 432</p>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: '#ccc' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                {/* WhatsApp */}
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="contact-row" style={{ textDecoration: 'none' }}>
                  <div className="contact-icon" style={{ background: '#EEF9F1' }}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>WhatsApp</p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#888', marginTop: 2, fontWeight: 300 }}>Chat instantly</p>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: '#ccc' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                {/* Email */}
                <a href="mailto:havenrise.realty25@gmail.com" className="contact-row" style={{ textDecoration: 'none' }}>
                  <div className="contact-icon" style={{ background: '#F5F0EB' }}>
                    <svg width="17" height="17" fill="none" stroke="#8B7355" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Email Us</p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#888', marginTop: 2, fontWeight: 300 }}>havenrise.realty25@gmail.com</p>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: '#ccc' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
                {/* Book a viewing */}
                <a href="#contact" onClick={() => setOpen(false)} className="contact-row" style={{ textDecoration: 'none' }}>
                  <div className="contact-icon" style={{ background: '#F0EDE8' }}>
                    <svg width="17" height="17" fill="none" stroke="#8B7355" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Book a Viewing</p>
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: '#888', marginTop: 2, fontWeight: 300 }}>Schedule an appointment</p>
                  </div>
                  <svg style={{ marginLeft: 'auto', color: '#ccc' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            )}
            {/* Footer */}
            <div style={{ padding: '10px 16px', background: '#F9F7F4', borderTop: '1px solid #F0EDE8', textAlign: 'center' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10, color: '#ccc', letterSpacing: '0.08em' }}>
                Powered by <span style={{ color: '#8B7355', fontWeight: 600 }}>HavenRise Realty</span>
              </p>
            </div>
          </div>
        )}
        {/* ── TRIGGER BUTTON ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
          {/* Label pill — shows when closed */}
          {!open && (
            <div style={{ background: '#1a1a1a', color: '#fff', padding: '8px 16px', fontSize: 11, fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', whiteSpace: 'nowrap', animation: 'slideUp 0.4s ease' }}>
              Chat with us ✦
            </div>
          )}
          <button
            className="fchat-btn"
            onClick={() => setOpen(o => !o)}
            aria-label="Open live chat">
            {/* Pulse ring when closed */}
            {!open && <div className="pulse-ring" />}
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  )
}
export default FloatingChat