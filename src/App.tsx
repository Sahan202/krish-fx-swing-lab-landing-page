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

const feedbackImages = [
  { src: '/student-feedback-shanaka.jpeg', alt: 'Student feedback message from Shanaka' },
  ...Array.from({ length: 12 }, (_, index) => ({
    src: `/student-feedback-${String(index + 1).padStart(2, '0')}.jpeg`,
    alt: `Krish FX student feedback and trading result ${index + 1}`,
  })),
];

function Brand({ onClick }: { onClick?: () => void }) {
  return <button className="brand" onClick={onClick}><b>K</b><span>KRISH <i>FX</i><small>SWING LAB</small></span></button>;
}

function FeedbackShowcase() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const dragStart = useRef<number | null>(null);
  const dragged = useRef(false);
  const carouselImages = [...feedbackImages, ...feedbackImages.slice(0, 3)];
  const currentStory = currentImage % feedbackImages.length;

  useEffect(() => {
    if (activeImage !== null) return;
    const timer = window.setInterval(() => setCurrentImage((current) => current + 1), 3800);
    return () => window.clearInterval(timer);
  }, [activeImage]);

  useEffect(() => {
    if (activeImage === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowLeft') setActiveImage((activeImage + feedbackImages.length - 1) % feedbackImages.length);
      if (event.key === 'ArrowRight') setActiveImage((activeImage + 1) % feedbackImages.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeImage]);

  const finishSlide = () => {
    if (currentImage !== feedbackImages.length) return;
    setIsResetting(true);
    setCurrentImage(0);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setIsResetting(false)));
  };

  const showPrevious = () => setCurrentImage((current) => current === 0 ? feedbackImages.length - 1 : current - 1);
  const showNext = () => setCurrentImage((current) => current >= feedbackImages.length ? 1 : current + 1);
  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    dragged.current = false;
  };
  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const distance = event.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(distance) < 45) return;
    dragged.current = true;
    if (distance < 0) showNext(); else showPrevious();
  };

  return <>
    <div className="final-cta feedback-showcase">
      <div className="feedback-heading"><div className="feedback-copy"><span className="label">STUDENT FEEDBACK</span><h2>Words that <i>mean everything.</i></h2><p>Real progress is more than a result on a chart. It is the confidence, clarity and gratitude our students carry forward.</p></div><div className="feedback-proof"><strong>{feedbackImages.length}</strong><span>Real student stories</span><small>Four stories in view</small></div></div>
      <div className="feedback-carousel" onPointerDown={startDrag} onPointerUp={finishDrag} onPointerCancel={() => { dragStart.current = null; }}>
        <div className="feedback-gallery" aria-label="Autoplaying student feedback carousel"><div className={`feedback-track${isResetting ? ' resetting' : ''}`} style={{ '--feedback-index': currentImage } as React.CSSProperties} onTransitionEnd={finishSlide}>{carouselImages.map((image, index) => { const storyIndex = index % feedbackImages.length; return <button className="feedback-card" type="button" key={`${image.src}-${index}`} onClick={() => { if (dragged.current) { dragged.current = false; return; } setActiveImage(storyIndex); }} aria-label={`Open student feedback ${storyIndex + 1}`}><img src={image.src} alt={image.alt} loading={index < 5 ? 'eager' : 'lazy'} /><span className="feedback-card-shade" /><span className="feedback-card-meta"><b>{String(storyIndex + 1).padStart(2, '0')}</b><em>View full story</em></span></button>; })}</div></div>
        <button className="feedback-carousel-arrow previous" type="button" aria-label="Previous student feedback" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); showPrevious(); }}>&larr;</button>
        <button className="feedback-carousel-arrow next" type="button" aria-label="Next student feedback" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); showNext(); }}>&rarr;</button>
      </div>
      <div className="feedback-carousel-footer"><div className="feedback-dots" aria-label="Choose student feedback">{feedbackImages.map((image, index) => <button className={index === currentStory ? 'active' : ''} type="button" key={image.src} aria-label={`Show feedback ${index + 1}`} aria-current={index === currentStory ? 'true' : undefined} onClick={() => setCurrentImage(index)} />)}</div><span><i key={currentStory} />Continuous auto play</span></div>
    </div>
    {activeImage !== null && <div className="feedback-lightbox" role="dialog" aria-modal="true" aria-label={`Student feedback ${activeImage + 1}`} onClick={() => setActiveImage(null)}><button className="feedback-lightbox-close" type="button" aria-label="Close feedback" onClick={() => setActiveImage(null)}><X size={22} /></button><button className="feedback-lightbox-nav previous" type="button" aria-label="Previous feedback" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + feedbackImages.length - 1) % feedbackImages.length); }}>&larr;</button><div className="feedback-lightbox-image" onClick={(event) => event.stopPropagation()}><img src={feedbackImages[activeImage].src} alt={feedbackImages[activeImage].alt} /><span>{String(activeImage + 1).padStart(2, '0')} / {feedbackImages.length}</span></div><button className="feedback-lightbox-nav next" type="button" aria-label="Next feedback" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % feedbackImages.length); }}>&rarr;</button></div>}
  </>;
}

function CertificateGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  return <section className="certificate-gallery" aria-labelledby="certificates-title">
    <div className="shell">
      <div className="certificate-heading"><div><span className="label">STUDENT ACHIEVEMENTS</span><h2 id="certificates-title">Proof of <i>progress.</i></h2></div><p>Celebrating the discipline, consistency and real milestones reached by Krish FX students.</p></div>
      <div className="result-video"><div className="result-video-copy"><span className="label">MILESTONE IN MOTION</span><h3>See the journey<br /><i>come to life.</i></h3><p>Real progress deserves more than a number. Watch one of the achievements from our student community.</p><button className="video-live" type="button" onClick={() => setVideoOpen(true)}><span /> Watch full story <ArrowRight size={14} /></button></div><button className="result-video-frame" type="button" onClick={() => setVideoOpen(true)} aria-label="Play full student result video"><iframe src="https://www.youtube-nocookie.com/embed/1jAHGgzj_tc?autoplay=1&mute=1&loop=1&playlist=1jAHGgzj_tc&controls=0&playsinline=1&rel=0&modestbranding=1" title="Krish FX student result video preview" allow="autoplay; encrypted-media; picture-in-picture" /><span className="video-play"><span>▶</span></span><span className="video-play-label">Play full video</span></button></div>
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
  const [activeSection, setActiveSection] = useState('home');
  const heroBackground = useRef<HTMLDivElement>(null);
  const heroContent = useRef<HTMLDivElement>(null);
  const go = (id: string) => { setOpen(false); setActiveSection(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  useEffect(() => {
    let frame = 0;
    let target = 0;
    let current = 0;
    let contentTarget = 0;
    let contentCurrent = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactScreen = window.matchMedia('(max-width: 680px)');
    let previousScrolled = false;
    let previousActive = 'home';
    const sectionIds = ['home', 'mentorship', 'results', 'start', 'contact'];
    const animateBackground = () => {
      current += (target - current) * 0.075;
      contentCurrent += (contentTarget - contentCurrent) * 0.09;
      if (heroBackground.current) heroBackground.current.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      if (heroContent.current) heroContent.current.style.transform = `translate3d(0, ${contentCurrent.toFixed(2)}px, 0)`;
      frame = Math.abs(target - current) > 0.08 || Math.abs(contentTarget - contentCurrent) > 0.08 ? requestAnimationFrame(animateBackground) : 0;
    };
    const updateNavigation = () => {
      const mobile = compactScreen.matches;
      target = reduceMotion.matches ? 0 : Math.min(window.scrollY * (mobile ? 0.06 : 0.16), mobile ? 36 : 110);
      contentTarget = reduceMotion.matches ? 0 : -Math.min(window.scrollY * (mobile ? 0.025 : 0.07), mobile ? 18 : 52);
      const nowScrolled = window.scrollY > 80;
      if (nowScrolled !== previousScrolled) {
        previousScrolled = nowScrolled;
        setNavScrolled(nowScrolled);
      }
      const marker = window.scrollY + window.innerHeight * 0.34;
      let nextActive = 'home';
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top + window.scrollY <= marker) nextActive = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) nextActive = 'contact';
      if (nextActive !== previousActive) {
        previousActive = nextActive;
        setActiveSection(nextActive);
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
          <button className={activeSection === 'home' ? 'active' : ''} aria-current={activeSection === 'home' ? 'page' : undefined} onClick={() => go('home')}>Home</button>
          <button className={activeSection === 'mentorship' ? 'active' : ''} aria-current={activeSection === 'mentorship' ? 'page' : undefined} onClick={() => go('mentorship')}>Mentorship</button>
          <button className={activeSection === 'results' ? 'active' : ''} aria-current={activeSection === 'results' ? 'page' : undefined} onClick={() => go('results')}>Student Results</button>
          <button className={activeSection === 'start' ? 'active' : ''} aria-current={activeSection === 'start' ? 'page' : undefined} onClick={() => go('start')}>Feedback</button>
          <button className={activeSection === 'contact' ? 'active' : ''} aria-current={activeSection === 'contact' ? 'page' : undefined} onClick={() => go('contact')}>Contact Us</button>
        </div>
        <button className="cta mini nav-talk" onClick={() => go('start')}>Start Learning <ArrowRight size={15} /></button>
        <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </nav>
      <div className="shell hero-grid" ref={heroContent}>
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
      <FeedbackShowcase />
      <footer className="site-footer" id="contact"><div className="shell footer-content">
        <div className="footer-brand"><Brand onClick={() => go('home')} /><p>Build your swing-trading process with clarity, discipline and confidence.</p></div>
        <div className="footer-column"><h3>Quick Links</h3><button className={activeSection === 'home' ? 'active' : ''} onClick={() => go('home')}>Home</button><button className={activeSection === 'mentorship' ? 'active' : ''} onClick={() => go('mentorship')}>Mentorship</button><button className={activeSection === 'results' ? 'active' : ''} onClick={() => go('results')}>Student Results</button><button className={activeSection === 'start' ? 'active' : ''} onClick={() => go('start')}>Feedback</button><button className={activeSection === 'contact' ? 'active' : ''} onClick={() => go('contact')}>Contact Us</button></div>
        <div className="footer-column"><h3>Join the Community</h3><a href="https://chat.whatsapp.com/K20nr41lF9IFTlsU1pxGJu?s=cl&p=i&mlu=4" target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp Group</a><a href="https://t.me/KrishFX2" target="_blank" rel="noreferrer"><Send size={17} /> Telegram Channel</a><a href="https://youtube.com/@krishfx1?si=P-7wdK1sP6Xk-hFU" target="_blank" rel="noreferrer"><span className="youtube-icon">▶</span> YouTube</a><a href="https://www.facebook.com/share/1BjMFcZwW3/?mibextid=wwXIfr" target="_blank" rel="noreferrer"><span className="facebook-icon">f</span> Facebook</a></div>
        <div className="footer-column"><h3>Important</h3><span>Educational content only</span><span>Trading involves risk</span><span>Trade responsibly</span></div>
      </div><div className="shell copyright">© 2026 Krish FX Swing Lab. All Rights Reserved.</div></footer>
    </section>
  </main>;
}
