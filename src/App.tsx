'use client';

import { ArrowRight, BarChart3, CheckCircle2, CirclePlay, Menu, MessageCircle, Send, ShieldCheck, TrendingUp, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const benefits = [
  ['01', 'Structured strategy', 'Trade with a clear plan - not emotion.'],
  ['02', 'Expert guidance', 'Learn alongside a focused community.'],
  ['03', 'Built for real life', 'A swing-trading process that fits your schedule.'],
];

const certificates = [
  { src: '/student-pasindu-phase-2.jpeg', name: 'Pasindu G', achievement: 'FundingPips · Phase II' },
  { src: '/student-sumudu-phase-2.jpeg', name: 'Sumudu Lasantha', achievement: 'FundingPips · Phase II' },
  { src: '/student-amesh-funded.jpeg', name: 'Amesh Jayaweera', achievement: 'QT Advanced · $25,000 Funded' },
  { src: '/student-tharinda-phase-2.jpeg', name: 'Tharinda J', achievement: 'FundingPips · Phase II' },
];

function Brand({ onClick }: { onClick?: () => void }) {
  return <button className="brand" onClick={onClick}><b>K</b><span>KRISH <i>FX</i><small>SWING LAB</small></span></button>;
}

function CertificateGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  return <section className="certificate-gallery" aria-labelledby="certificates-title">
    <div className="shell">
      <div className="certificate-heading"><div><span className="label">STUDENT ACHIEVEMENTS</span><h2 id="certificates-title">Proof of <i>progress.</i></h2></div><p>Celebrating the discipline, consistency and real milestones reached by Krish FX students.</p></div>
      <div className="result-video"><div className="result-video-copy"><span className="label">MILESTONE IN MOTION</span><h3>See the journey<br /><i>come to life.</i></h3><p>Real progress deserves more than a number. Watch one of the achievements from our student community.</p><button className="video-live" type="button" onClick={() => setVideoOpen(true)}><span /> Watch full story <ArrowRight size={14} /></button></div><button className="result-video-frame" type="button" onClick={() => setVideoOpen(true)} aria-label="Play full student result video"><video src="/student-result-highlight.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="Student result highlight video" /><span className="video-play"><span>▶</span></span><span className="video-play-label">Play full video</span></button></div>
      <div className="certificate-grid">{certificates.map((certificate, index) => <button className="certificate-card" type="button" key={certificate.src} onClick={() => setSelected(index)} aria-label={`View ${certificate.name}'s achievement certificate`}><span className="certificate-image"><img src={certificate.src} alt={`${certificate.name} achievement certificate`} /></span><span className="certificate-caption"><b>{certificate.name}</b><small>{certificate.achievement}</small><em>View certificate <ArrowRight size={14} /></em></span></button>)}</div>
    </div>
    {selected !== null && <div className="certificate-modal" role="dialog" aria-modal="true" aria-label="Achievement certificate" onClick={() => setSelected(null)}><button className="certificate-close" type="button" aria-label="Close certificate" onClick={() => setSelected(null)}><X size={21} /></button><img src={certificates[selected].src} alt={`${certificates[selected].name} achievement certificate`} onClick={(event) => event.stopPropagation()} /></div>}
    {videoOpen && <div className="video-modal" role="dialog" aria-modal="true" aria-label="Student result video" onClick={() => setVideoOpen(false)}><div className="video-modal-content" onClick={(event) => event.stopPropagation()}><button className="certificate-close" type="button" aria-label="Close video" onClick={() => setVideoOpen(false)}><X size={21} /></button><iframe src="https://www.youtube-nocookie.com/embed/1jAHGgzj_tc?autoplay=1&rel=0" title="Krish FX student result video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div></div>}
  </section>;
}

function MentorToolkit() {
  return <section className="mentor-toolkit reveal" data-reveal aria-labelledby="toolkit-title"><div className="shell">
    <div className="toolkit-heading"><span className="label">THE TRADER&apos;S WORKFLOW</span><h2 id="toolkit-title">A plan before<br /><i>every position.</i></h2><p>Built around the habits a disciplined swing trader needs before, during and after every trade.</p></div>
    <div className="toolkit-grid"><article className="risk-card"><span className="toolkit-kicker">RISK / REWARD</span><h3>Protect the downside.<br />Let winners work.</h3><div className="risk-meter"><span className="risk-side">Risk <b>1R</b></span><div><i /><i /><i /></div><span className="reward-side">Reward <b>3R</b></span></div><small>Every setup begins with a defined invalidation point.</small></article><article className="outlook-card"><div className="outlook-top"><span className="toolkit-kicker">WEEKLY MARKET OUTLOOK</span><span className="outlook-live"><i /> Live focus</span></div><h3>Wait for price to<br /><i>come to your level.</i></h3><p>Patience, clean levels and defined risk over reactive entries.</p><div className="outlook-bars"><span /><span /><span /><span /><span /></div></article></div>
    <div className="journal"><div><span className="label">TRADE JOURNAL PROCESS</span><p>Repeat a process—not a prediction.</p></div><ol><li><b>01</b><span>Analyse</span></li><li><b>02</b><span>Wait</span></li><li><b>03</b><span>Execute</span></li><li><b>04</b><span>Manage</span></li><li><b>05</b><span>Review</span></li></ol></div>
  </div></section>;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const heroBackground = useRef<HTMLDivElement>(null);
  const go = (id: string) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  useEffect(() => {
    let frame = 0;
    let target = 0;
    let current = 0;
    let previousScrolled = false;
    const animateBackground = () => {
      current += (target - current) * 0.075;
      if (heroBackground.current) heroBackground.current.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      frame = Math.abs(target - current) > 0.08 ? requestAnimationFrame(animateBackground) : 0;
    };
    const updateNavigation = () => {
      target = Math.min(window.scrollY * 0.1, 56);
      const nowScrolled = window.scrollY > 80;
      if (nowScrolled !== previousScrolled) {
        previousScrolled = nowScrolled;
        setNavScrolled(nowScrolled);
      }
      if (!frame) frame = requestAnimationFrame(animateBackground);
    };
    updateNavigation();
    window.addEventListener('scroll', updateNavigation, { passive: true });
    return () => { window.removeEventListener('scroll', updateNavigation); if (frame) cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.16 });
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => revealObserver.observe(element));
    const resultCount = document.querySelector<HTMLElement>('.result-stats span:first-child b');
    const countObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const startedAt = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - startedAt) / 1300, 1);
        if (resultCount) resultCount.textContent = `${Math.round(200 * (1 - Math.pow(1 - progress, 3)))}+`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.disconnect();
    }, { threshold: 0.35 });
    if (resultCount?.closest('.community')) countObserver.observe(resultCount.closest('.community')!);
    const resultsCard = document.querySelector<HTMLElement>('.community');
    const resultsObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('results-visible');
      resultsObserver.disconnect();
    }, { threshold: 0.28 });
    if (resultsCard) resultsObserver.observe(resultsCard);
    return () => { revealObserver.disconnect(); countObserver.disconnect(); resultsObserver.disconnect(); };
  }, []);

  return <main>
    <section className="hero" id="home">
      <div className="hero-parallax-bg" ref={heroBackground} aria-hidden="true" />
      <nav className={`nav shell${navScrolled ? ' scrolled' : ''}`}>
        <Brand onClick={() => go('home')} />
        <div className={open ? 'links open' : 'links'}>
          <button onClick={() => go('home')}>Home</button>
          <button onClick={() => go('mentorship')}>Mentorship</button>
          <button onClick={() => go('results')}>Student Results</button>
          <button onClick={() => go('start')}>Feedback</button>
          <button onClick={() => go('contact')}>Contact Us</button>
        </div>
        <button className="cta mini nav-talk" onClick={() => go('start')}>Start Learning <ArrowRight size={15} /></button>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </nav>
      <div className="shell hero-grid">
        <div>
          <span className="eyebrow">FOR DISCIPLINED TRADERS</span>
          <h1>Trade with <i>clarity.</i><br />Grow with <i>confidence.</i></h1>
          <p>Master a refined swing-trading framework designed to help you see opportunity, manage risk, and move with intention.</p>
          <div className="actions">
            <button className="cta enroll-cta" onClick={() => go('mentorship')}>Enroll now <ArrowRight size={18} /></button>
            <button className="watch" onClick={() => go('mentorship')}><CirclePlay size={20} /> See how it works</button>
          </div>
          <small className="trust"><Users size={16} /> Built for traders who value process over noise.</small>
          <div className="hero-insight"><span><b>4H</b> Swing-trading focus</span><span><b>01</b> Refined framework</span><span><b>LIVE</b> Mentorship support</span></div>
          <div className="market-status"><span className="status-dot" /> <b>LONDON / NEW YORK</b><i /> Market session focus</div>
        </div>
      </div>
      <div className="ticker" aria-label="Price action, disciplined risk, swing trading"><div className="ticker-track"><span>PRICE ACTION <b>•</b> DISCIPLINED RISK <b>•</b> SWING TRADING <b>•</b></span><span aria-hidden="true">PRICE ACTION <b>•</b> DISCIPLINED RISK <b>•</b> SWING TRADING <b>•</b></span></div></div>
    </section>

    <section className="intro shell reveal" data-reveal id="mentorship">
      <span className="label">KRISH FX MENTORSHIP</span>
      <div className="intro-top"><h2>Less noise.<br /><i>More intention.</i></h2><p>Trading is not about chasing every move. It is about building a process you trust, then showing up consistently enough to let it work.</p></div>
      <div className="benefits">{benefits.map(([number, title, description]) => <article key={number}><span>{number}</span><BarChart3 /><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="curriculum reveal" data-reveal><div className="shell two-col">
      <div><span className="label">THE MENTORSHIP ROADMAP</span><h2>From chart confusion<br />to <i>calm execution.</i></h2><p>Everything is organised around the skills that actually matter when money is on the line.</p><button className="outline" onClick={() => go('start')}>View mentorship details <ArrowRight size={17} /></button></div>
      <div className="lessons">{[['01', 'Market Foundations'], ['02', 'The Swing Framework'], ['03', 'Risk & Trade Management']].map(([number, title]) => <div key={number}><span>{number}</span><b>{title}</b><ArrowRight size={18} /></div>)}</div>
    </div></section>

    <section className="community shell" id="results"><div><span className="label">STUDENT RESULTS</span><h2>Real traders.<br /><i>Real progress.</i></h2><p>See how disciplined practice, clear structure and a focused trading plan help students move forward.</p><div className="result-stats"><span><b>200+</b>Students mentored</span><span><b>4H</b>Swing trading focus</span></div></div><blockquote>“The mentorship gave me the structure I was missing. I no longer feel like I’m guessing.”<small>- Krish FX student</small></blockquote></section>

    <MentorToolkit />

    <CertificateGallery />

    <section className="final reveal" data-reveal id="start">
      <div className="final-cta feedback-showcase"><div className="feedback-copy"><span className="label">STUDENT FEEDBACK</span><h2>Words that<br /><i>mean everything.</i></h2><p>Real progress is more than a result on a chart. It is the confidence, clarity and gratitude our students carry forward.</p><div className="feedback-author"><span>✓</span><div><b>Shanaka</b><small>Krish FX student</small></div></div></div><div className="feedback-frame"><div className="feedback-frame-top"><span>Student message</span><span>★</span></div><img src="/student-feedback-shanaka.jpeg" alt="Student feedback message from Shanaka" /><div className="feedback-frame-bottom">A journey built with discipline and support.</div></div></div>
      <footer className="site-footer" id="contact"><div className="shell footer-content">
        <div className="footer-brand"><Brand onClick={() => go('home')} /><p>Build your swing-trading process with clarity, discipline and confidence.</p></div>
        <div className="footer-column"><h3>Quick Links</h3><button onClick={() => go('home')}>Home</button><button onClick={() => go('mentorship')}>Mentorship</button><button onClick={() => go('results')}>Student Results</button><button onClick={() => go('start')}>Join Mentorship</button></div>
        <div className="footer-column"><h3>Join the Community</h3><a href="https://chat.whatsapp.com/K20nr41lF9IFTlsU1pxGJu?s=cl&p=i&mlu=4" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp Group</a><a href="https://t.me/KrishFX2" target="_blank" rel="noreferrer"><Send size={17} /> Telegram Channel</a><a href="https://youtube.com/@krishfx1?si=P-7wdK1sP6Xk-hFU" target="_blank" rel="noreferrer"><span className="youtube-icon">▶</span> YouTube</a><a href="https://www.facebook.com/share/1BjMFcZwW3/?mibextid=wwXIfr" target="_blank" rel="noreferrer"><span className="facebook-icon">f</span> Facebook</a></div>
        <div className="footer-column"><h3>Important</h3><span>Educational content only</span><span>Trading involves risk</span><span>Trade responsibly</span></div>
      </div><div className="shell copyright">© 2026 Krish FX Swing Lab. All Rights Reserved.</div></footer>
    </section>
  </main>;
}
