import { useState, useEffect, useRef } from "react"

{/* useState — lets you store data that changes. So it used to to track how far you srcolled */}
{/* useEffect — runs code when something happens (page loads, data changes). listening for scroll and mouse movement when the page loads */}
{/* useRef — grabs a direct reference to a HTML element.  */}
{/*  detect when a section becomes visible on screen so animations can trigger */}
{/*  */}

const features = [  

  {
    number: "01",
    title: "Companion Assistant",
    desc: "An AI that walks beside you — learning your voice, your pace, your preferences. It guides without overwhelming, and listens without judgment.",
  },
  {
    number: "02",
    title: "Adaptive Routing",
    desc: "Sensara learns your paths over time. The more you use it, the smarter it gets — remembering the routes that feel safe and familiar to you.",
  },
  {
    number: "03",
    title: "Saved Places",
    desc: "Home. The pharmacy. Your favorite café. Save the places that matter and return to them with a single tap, every time.",
  },
  {
    number: "04",
    title: "Danger Detection",
    desc: "Real-time awareness of hazards near your location. Sensara alerts you calmly before you ever reach a risk — keeping you safe without causing panic.",
  },
  {
    number: "05",
    title: "Emergency Messaging",
    desc: "One tap sends your location, route history, and status directly to your caregiver. Complete information, instantly delivered.",
  },
  {
    number: "06",
    title: "Continuous Learning",
    desc: "Every journey teaches Sensara something new about you. Over time it becomes not just a navigator, but a true extension of your independence.",
  },
]

{/* array of data that stores all our feature cards in one place */}


function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function FeatureCard({ feature, index }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "40px 0",
        display: "grid",
        gridTemplateColumns: "80px 1fr",
        gap: 32,
        cursor: "default",
      }}
      onMouseEnter={e => e.currentTarget.style.borderTopColor = "rgba(255,255,255,0.25)"}
      onMouseLeave={e => e.currentTarget.style.borderTopColor = "rgba(255,255,255,0.08)"}
    >
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", paddingTop: 4 }}>{feature.number}</span>
      <div>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, fontWeight: 400, marginBottom: 12, color: "#f0f0f0" }}>{feature.title}</h3>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.4)", maxWidth: 560 }}>{feature.desc}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [missionRef, missionInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    const onMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("scroll", onScroll)
    window.addEventListener("mousemove", onMouse)
    setTimeout(() => setLoaded(true), 80)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouse)
    }
  }, [])

  const navOpacity = Math.min(scrollY / 200, 1)

  return (
    <div style={{ background: "#08090c", color: "#e8e8e6", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(255,255,255,0.15); }

        .cursor-glow {
          position: fixed;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%);
          transform: translate(-50%, -50%);
          transition: left 0.12s ease, top 0.12s ease;
        }

        .nav-link {
          color: rgba(232,232,230,0.45);
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: rgba(232,232,230,0.9); }

        .btn-main {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 6px;
          background: #e8e8e6;
          color: #08090c;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.01em;
        }
        .btn-main:hover {
          background: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(232,232,230,0.15);
        }

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 6px;
          background: transparent;
          color: rgba(232,232,230,0.6);
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          transition: all 0.25s ease;
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-outline:hover {
          border-color: rgba(255,255,255,0.25);
          color: rgba(232,232,230,0.9);
        }

        .marquee-track {
          display: flex;
          gap: 60px;
          animation: marquee 20s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .big-number {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 400;
          color: #e8e8e6;
          line-height: 1;
        }

        .mission-text {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 400;
          font-style: italic;
          line-height: 1.4;
          color: #e8e8e6;
        }

        .highlight-word {
          color: rgba(255,255,255,0.3);
          transition: color 0.3s;
          cursor: default;
        }
        .highlight-word:hover { color: #e8e8e6; }

        .footer-link {
          color: rgba(232,232,230,0.3);
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }
        .footer-link:hover { color: rgba(232,232,230,0.7); }

        @media (max-width: 768px) {
          .stats-row { grid-template-columns: 1fr !important; }
          .nav-links { display: none !important; }
        }
      `}</style>

      {/* Cursor glow */}
      <div className="cursor-glow" style={{ left: mousePos.x, top: mousePos.y }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "22px 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: `rgba(8,9,12,${navOpacity * 0.95})`,
        backdropFilter: navOpacity > 0.1 ? "blur(20px)" : "none",
        borderBottom: `1px solid rgba(255,255,255,${navOpacity * 0.06})`,
        transition: "background 0.3s, border 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8e8e6" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 16, letterSpacing: "-0.01em" }}>Sensara</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 36 }}>
          <a href="#mission" className="nav-link">Mission</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#about" className="nav-link">About</a>
        </div>
        <a href="#" className="btn-main" style={{ padding: "10px 20px", fontSize: 13 }}>Early Access</a>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 48px 80px", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat", backgroundSize: "200px",
        }} />

        <div style={{
          position: "absolute", top: 120, left: 48,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 0.2s",
        }}>
          <span className="tag">Cognitive Navigation — 2026</span>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(52px, 9vw, 110px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              maxWidth: 900,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
            }}
          >
            Navigate the world.<br />
            <span style={{ fontStyle: "italic", color: "rgba(232,232,230,0.45)" }}>On your terms.</span>
          </h1>

          <div style={{
            marginTop: 48,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease 0.55s, transform 1s ease 0.55s",
          }}>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(232,232,230,0.5)", maxWidth: 420 }}>
              An AI companion built for people with cognitive disabilities — learning your world, protecting your journey, and never leaving your side.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#features" className="btn-main">See How It Works</a>
              <a href="#mission" className="btn-outline">Our Mission</a>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "18px 0", overflow: "hidden" }}>
        <div className="marquee-track">
          {["AI Navigation", "Cognitive Accessibility", "Real-time Alerts", "Caregiver Connect", "Adaptive Learning", "Saved Places", "Companion AI", "Independent Living", "AI Navigation", "Cognitive Accessibility", "Real-time Alerts", "Caregiver Connect", "Adaptive Learning", "Saved Places", "Companion AI", "Independent Living"].map((item, i) => (
            <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section style={{ padding: "100px 48px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {[
            { value: "10M+", label: "Americans living with cognitive disabilities" },
            { value: "24 / 7", label: "Always-on AI companion, never offline" },
            { value: "< 1s", label: "Emergency alert delivery to caregivers" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#08090c", padding: "52px 40px" }}>
              <div className="big-number">{s.value}</div>
              <p style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 200 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section id="mission" style={{ padding: "100px 48px", maxWidth: 1000, margin: "0 auto" }} ref={missionRef}>
        <div style={{ marginBottom: 48 }}>
          <span className="tag">Mission</span>
        </div>
        <p
          className="mission-text"
          style={{
            opacity: missionInView ? 1 : 0,
            transform: missionInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          "We believe independence is a{" "}
          <span className="highlight-word">right</span>, not a{" "}
          <span className="highlight-word">privilege</span>. Sensara exists to give people with cognitive disabilities the freedom to move through the world{" "}
          <span className="highlight-word">safely</span>,{" "}
          <span className="highlight-word">confidently</span>, and entirely on their own terms."
        </p>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 48px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 20 }}>
          <span className="tag">Features</span>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", maxWidth: 280, textAlign: "right", lineHeight: 1.6 }}>
            Every feature designed around one person — the person using it.
          </p>
        </div>

        {features.map((f, i) => (
          <FeatureCard key={f.number} feature={f} index={i} />
        ))}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
      </section>

      {/* CTA */}
      <section id="about" style={{ padding: "120px 48px", textAlign: "center" }} ref={ctaRef}>
        <span className="tag">Get Started</span>
        <h2
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.15,
            marginTop: 32,
            maxWidth: 700,
            margin: "32px auto 0",
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          The future of navigation<br />
          <span style={{ fontStyle: "italic", color: "rgba(232,232,230,0.4)" }}>is compassionate.</span>
        </h2>
        <p style={{
          marginTop: 24, fontSize: 15, color: "rgba(255,255,255,0.35)", maxWidth: 400, margin: "24px auto 40px", lineHeight: 1.75,
          opacity: ctaInView ? 1 : 0,
          transition: "opacity 1s ease 0.2s",
        }}>
          Sensara is currently in development. Join the waitlist and be among the first to experience it.
        </p>
        <a href="#" className="btn-main">Join the Waitlist</a>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "36px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(232,232,230,0.5)" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, color: "rgba(232,232,230,0.5)" }}>Sensara</span>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>© 2026 — All rights reserved</p>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" className="footer-link">{l}</a>
          ))}
        </div>
      </footer>

    </div>
  )
}