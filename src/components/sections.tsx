import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BadgeCheck } from 'lucide-react';
import * as Matter from 'matter-js';
import { LOGOS, POSTS, PROCESS, PRODUCTS, SERVICES, TESTIMONIALS, WORKS, rp } from '../data/site';
import Reveal from './Reveal';
import { useStore } from './store';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const img = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const f = () => { if (img.current) img.current.style.transform = `translateY(${window.scrollY * -0.06}px)`; };
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="mx-auto max-w-[1220px] px-5 lg:pl-16 grid lg:grid-cols-2 gap-10 items-center min-h-[81vh]">
        <Reveal variant="right">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold"><BadgeCheck size={14} /> Professional IT Consultant</span>
          <h1 className="mt-4 text-[42px] md:text-[55px] leading-[1.05em]">Hi, I'm Devan Rifan<br /><em className="font-serif italic font-medium">IT Consultant &amp; Website Developer</em></h1>
          <p className="mt-5 max-w-md opacity-80 text-[13px] leading-relaxed">With years of experience in web development and digital solutions, I specialize in helping businesses build, optimize, and scale their online presence. My approach combines technical expertise, strategic thinking, and a deep understanding of business needs.</p>
          <div className="mt-6 flex items-center gap-2">
            <a href="https://wa.me/628988640470" target="_blank" rel="noreferrer" className="btn-pill">Free Consultation</a>
            <a href="https://wa.me/628988640470" target="_blank" rel="noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7FD92] text-black" aria-label="free consultation"><ArrowUpRight size={18} /></a>
          </div>
        </Reveal>
        <Reveal variant="scale" delay={0.15}>
          <div className="relative w-full max-w-[500px] justify-self-end">
            <svg width="0" height="0" className="absolute" aria-hidden="true">
              <defs>
                <clipPath id="heroBlob" clipPathUnits="objectBoundingBox">
                  <path d="M0.41,0.02 L0.78,0.02 Q0.96,0.02 0.96,0.20 L0.96,0.58 Q0.96,0.72 0.82,0.73 Q0.75,0.74 0.74,0.82 L0.73,0.89 Q0.725,0.97 0.64,0.97 L0.24,0.97 Q0.10,0.97 0.10,0.83 L0.10,0.58 L0.10,0.42 Q0.10,0.28 0.24,0.25 Q0.31,0.235 0.32,0.15 L0.325,0.10 Q0.33,0.02 0.41,0.02 Z" />
                </clipPath>
              </defs>
            </svg>
            <img ref={img} src="/img/devan-studio.webp" alt="Devan Rifan" className="w-full object-cover aspect-[23/25] will-change-transform" style={{ clipPath: 'url(#heroBlob)' }} />
          </div>
        </Reveal>
      </div>
      <div className="h-7 bg-gradient-to-b from-transparent to-[#F7FD92]" />
    </section>
  );
}

export function LogoMarquee() {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="bg-[#F6F6F6] py-8 overflow-hidden">
      <div className="marquee-track gap-0" data-cursor="drag">
        {row.map((l, i) => (
          <div key={i} className="flex items-center justify-center px-11 shrink-0 w-[calc(100%/6)] min-w-[160px]">
            <img src={l.src} alt={l.name} className="h-8 w-auto object-contain opacity-80 grayscale hover:grayscale-0" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

const TEAM_IMGS = [
  '/img/devan-rifan-2.webp',
  '/img/devan-rifan-1.webp',
  '/img/devan-rifan-3.webp',
];

export function Services() {
  const { setModal } = useStore();
  const col = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!col.current || window.matchMedia('(max-width: 768px)').matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.tphoto').forEach((el, i) => {
        gsap.to(el, {
          yPercent: i % 2 ? 10 : -10, ease: 'none',
          scrollTrigger: { trigger: col.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section id="our-services" className="mx-auto max-w-[1220px] px-5 lg:pl-16 py-20 grid lg:grid-cols-2 gap-12 items-start">
      <div ref={col} className="relative h-[480px] md:h-[560px]" data-cursor="view">
        <img src={TEAM_IMGS[0]} alt="team" loading="lazy" className="tphoto absolute left-0 top-6 w-[52%] rounded-md object-cover aspect-[4/3] shadow-lg" />
        <img src={TEAM_IMGS[1]} alt="team" loading="lazy" className="tphoto absolute right-0 top-0 w-[54%] rounded-md object-cover aspect-[4/5] shadow-xl" />
        <img src={TEAM_IMGS[2]} alt="team" loading="lazy" className="tphoto absolute left-[10%] bottom-0 w-[56%] rounded-md object-cover aspect-square shadow-xl" />
      </div>
      <div>
        <Reveal variant="right">
          <div className="flex items-center gap-2">
            <button onClick={() => setModal(true)} className="rounded-full border-2 border-black px-5 py-1.5 text-xs font-bold tracking-widest">SEND A MESSAGE</button>
            <button onClick={() => setModal(true)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7FD92]" aria-label="send a message"><ArrowUpRight size={16} /></button>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-5">What I can do for you?</h2>
        </Reveal>
        <div className="mt-6 space-y-7">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} variant="up" delay={i * 0.06}>
              <p className="text-[15px]"><span className="opacity-70 mr-4">{s.n}</span><span className="underline underline-offset-4 font-medium">{s.t}</span></p>
              <p className="mt-3 opacity-80 text-[15px] leading-relaxed max-w-lg">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="mx-auto max-w-[1220px] px-5 lg:pl-16 py-20 grid lg:grid-cols-[300px_1fr] gap-10">
      <Reveal variant="right">
        <span className="inline-block rounded-md bg-black/10 px-3 py-1 text-[11px] font-bold tracking-widest">THE PROCESS</span>
        <h2 className="font-display text-[32px] md:text-[40px] leading-[1.05] font-bold mt-5">Magical digital solutions.</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {PROCESS.map((p, i) => (
          <Reveal key={p.n} variant="up" delay={i * 0.08}>
            <p className="font-display font-bold text-lg"><span className="text-[22px]">{p.n}</span><span className="opacity-40 font-medium text-base"> / </span>{p.t}</p>
            <p className="mt-3 text-[14px] leading-relaxed opacity-80">{p.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const VCHIPS: { t: string; y: 0 | 1; r: number; dy: number }[] = [
  { t: 'Project Manager', y: 1, r: -2, dy: 12 },
  { t: 'PHP', y: 1, r: 68, dy: -6 },
  { t: 'Performance', y: 0, r: -18, dy: 0 },
  { t: 'Mobile Apps', y: 0, r: 0, dy: 14 },
  { t: 'Front-End', y: 0, r: 0, dy: -10 },
  { t: 'WordPress', y: 0, r: 0, dy: 12 },
  { t: 'React', y: 1, r: 0, dy: -16 },
  { t: 'Next.JS', y: 0, r: 0, dy: -4 },
  { t: 'Woocommerce', y: 1, r: 0, dy: 10 },
  { t: 'Back-End', y: 1, r: 0, dy: 10 },
  { t: 'Native Development', y: 1, r: 12, dy: 0 },
  { t: 'Vue', y: 0, r: 8, dy: -12 },
];

export function VisionBlock() {
  const sec = useRef<HTMLElement>(null);
  const h2 = useRef<HTMLHeadingElement>(null);
  const arena = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!h2.current || !sec.current) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const el = h2.current;
    const secEl = sec.current;
    const words = el.textContent!.split(' ');
    el.innerHTML = words.map(w => `<span class="inline-block vw">${w}</span>`).join(' ');
    const ctx = gsap.context(() => {
      gsap.fromTo('.vw', { opacity: 0.14 }, {
        opacity: 1, ease: 'none', stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 40%', scrub: 1 },
      });
    });
    let engine: Matter.Engine | null = null;
    let runner: Matter.Runner | null = null;
    let mouse: Matter.Mouse | null = null;
    let mouseConstraint: Matter.MouseConstraint | null = null;
    let ground: Matter.Body | null = null;
    let wallL: Matter.Body | null = null;
    let wallR: Matter.Body | null = null;
    let spawned = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const sync = () => {
      if (!engine) return;
      for (const b of Matter.Composite.allBodies(engine.world)) {
        const chip = (b as Matter.Body & { chip?: HTMLElement }).chip;
        if (!chip) continue;
        chip.style.transform = `translate(${b.position.x}px, ${b.position.y}px) translate(-50%, -50%) rotate(${b.angle}rad)`;
      }
    };
    const spawn = () => {
      if (spawned || !engine || !arena.current) return;
      spawned = true;
      const els = gsap.utils.shuffle(Array.from(arena.current.querySelectorAll<HTMLElement>('.vchip')));
      els.forEach((chip) => {
        timers.push(setTimeout(() => {
          if (!engine || !arena.current) return;
          const body = Matter.Bodies.rectangle(
            60 + Math.random() * Math.max(arena.current.clientWidth - 120, 40),
            -100,
            chip.offsetWidth, chip.offsetHeight,
            {
              chamfer: { radius: Math.min(28, chip.offsetHeight / 2) },
              restitution: 0.55, friction: 0.35, frictionAir: 0.012, density: 0.0012,
              angle: (Math.random() - 0.5) * 0.7,
            },
          ) as Matter.Body & { chip?: HTMLElement };
          body.chip = chip;
          chip.style.opacity = '1';
          Matter.Composite.add(engine.world, body);
        }, Math.random() * 900));
      });
    };
    const boot = () => {
      if (engine || !arena.current) return;
      const W = arena.current.clientWidth, Hh = arena.current.clientHeight;
      engine = Matter.Engine.create({ enableSleeping: true });
      engine.gravity.y = 1.25;
      ground = Matter.Bodies.rectangle(W / 2, Hh - 30, W + 400, 80, { isStatic: true, restitution: 0.35 });
      wallL = Matter.Bodies.rectangle(-40, Hh / 2, 80, Hh * 3, { isStatic: true });
      wallR = Matter.Bodies.rectangle(W + 40, Hh / 2, 80, Hh * 3, { isStatic: true });
      Matter.Composite.add(engine.world, [ground, wallL, wallR]);
      Matter.Events.on(engine, 'afterUpdate', sync);
      mouse = Matter.Mouse.create(secEl);
      const mw = mouse as Matter.Mouse & { mousewheel?: EventListener };
      if (typeof mw.mousewheel === 'function') {
        secEl.removeEventListener('wheel', mw.mousewheel);
      }
      mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.15, render: { visible: false } },
      });
      Matter.Composite.add(engine.world, mouseConstraint);
      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
      spawn();
    };
    const st = ScrollTrigger.create({ trigger: secEl, start: 'top 75%', once: true, onEnter: boot });
    const onResize = () => {
      if (!engine || !arena.current || !ground || !wallR) return;
      const W = arena.current.clientWidth, Hh = arena.current.clientHeight;
      Matter.Body.setPosition(ground, { x: W / 2, y: Hh - 30 });
      Matter.Body.setPosition(wallR, { x: W + 40, y: Hh / 2 });
    };
    window.addEventListener('resize', onResize);
    return () => {
      ctx.revert();
      st.kill();
      window.removeEventListener('resize', onResize);
      timers.forEach(clearTimeout);
      if (runner) Matter.Runner.stop(runner);
      if (engine) {
        Matter.Events.off(engine, 'afterUpdate', sync);
        Matter.Composite.clear(engine.world, false, true);
        Matter.Engine.clear(engine);
      }
      if (mouse && arena.current) Matter.Mouse.clearSourceEvents(mouse);
      if (mouseConstraint && engine) Matter.Composite.remove(engine.world, mouseConstraint);
      engine = null;
    };
  }, []);
  return (
    <section ref={sec} className="dark-section relative bg-[#111214] text-white overflow-hidden [touch-action:pan-y]">
      <div className="mx-auto max-w-[1220px] px-5 lg:pl-16 pt-14 pb-[280px]">
        <div>
        <svg width="52" height="14" viewBox="0 0 52 14" className="opacity-80 mt-6"><path d="M2 10 L8 4 L14 10 L20 4 L26 10 L32 4 L38 10 L44 4 L50 10" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <h2 ref={h2} className="mt-6 font-display font-bold text-[34px] md:text-[56px] leading-[1.08] max-w-6xl">
          I believe a great website is more than just pretty, it should work hard for your business, day and night.
        </h2>
        <div className="mt-8 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-white/70 px-5 py-1.5 text-xs font-bold tracking-widest">VISION</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7FD92] text-black"><ArrowUpRight size={16} /></span>
        </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2 md:hidden">
          {VCHIPS.map(c => (
            <span key={c.t}
              className={`inline-block rounded-full px-6 py-2.5 font-display font-medium text-lg text-black whitespace-nowrap ${c.y ? 'bg-[#F7FD92]' : 'bg-[#E4E6EF]'}`}>
              {c.t}
            </span>
          ))}
        </div>
        <div ref={arena} aria-hidden="true" className="vpile pointer-events-none absolute inset-0 z-20 hidden md:block">
          {VCHIPS.map(c => (
            <span key={c.t}
              className={`vchip absolute left-0 top-0 inline-block rounded-full px-6 py-2.5 font-display font-medium text-lg md:text-xl text-black whitespace-nowrap opacity-0 ${c.y ? 'bg-[#F7FD92]' : 'bg-[#E4E6EF]'}`}>
              {c.t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Works({ limit = 6, filter = true }: { limit?: number; filter?: boolean }) {
  const [cat, setCat] = useState('All');
  const cats = ['All', ...Array.from(new Set(WORKS.map(w => w.cat)))];
  const list = WORKS.filter(w => cat === 'All' || w.cat === cat).slice(0, limit);
  return (
    <section id="case-studies" className="relative z-10 -mt-10 rounded-t-[2rem] bg-white">
    <div className="mx-auto max-w-[1220px] px-5 lg:pl-16 py-14">
      <Reveal><h2 className="text-[28px] md:text-[36px]">Recent Works</h2></Reveal>
      {filter && (
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-[15px] border-b border-black/10 pb-4">
          <span className="opacity-50">Filter by</span>
          {cats.map(c => <button key={c} onClick={() => setCat(c)} className={`transition ${cat === c ? 'font-bold text-black' : 'opacity-60 hover:opacity-100'}`}>{c}</button>)}
          <Link to="/portfolios/" className="ml-auto inline-flex items-center gap-2 text-sm font-medium">Hire me <span>→</span></Link>
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {list.map((w, i) => (
          <Reveal key={w.slug} variant={i % 2 ? 'rotateY' : 'up'} delay={(i % 3) * 0.06}>
            <Link to={`/portfolio/${w.slug}`} data-cursor="view" className="group block overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm hover:shadow-xl transition">
              <div className="flex items-center gap-1.5 px-4 pt-3"><i className="h-2 w-2 rounded-full bg-black/15" /><i className="h-2 w-2 rounded-full bg-black/15" /><i className="h-2 w-2 rounded-full bg-black/15" /></div>
              <div className="overflow-hidden m-3 mt-2 rounded-lg aspect-[4/3]"><img src={w.cover} alt={w.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" /></div>
              <div className="px-4 pb-4 flex items-center justify-between"><div><h3 className="text-lg font-bold">{w.title}</h3><p className="text-xs opacity-60">{w.cat}</p></div><span className="h-9 w-9 rounded-full border flex items-center justify-center group-hover:bg-black group-hover:text-white transition"><ArrowUpRight size={16} /></span></div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
    </section>
  );
}

export function StorePreview() {
  const { add } = useStore();
  return (
    <section className="mx-auto max-w-[1220px] px-5 pb-20">
      <Reveal><h2 className="text-[32px] md:text-[42px]">Custom Plugin</h2></Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} variant="up" delay={i * 0.06}>
            <div className="rounded-2xl border border-black/10 overflow-hidden bg-white">
              <Link to={`/product/${p.slug}`} data-cursor="view"><div className="relative"><img src={p.img} alt={p.title} loading="lazy" className="aspect-[16/9] w-full object-cover" /><span className="absolute top-2 left-2 rounded-full bg-black text-white text-[10px] px-2 py-1 font-bold">Sale!</span></div></Link>
              <div className="p-4"><Link to={`/product/${p.slug}`} className="font-bold line-clamp-2">{p.title}</Link>
                <p className="mt-1 text-sm"><s className="opacity-40">{rp(p.old)}</s> <b>{rp(p.price)}</b></p>
                <button onClick={() => add(p.slug)} className="btn-pill mt-3 !text-xs w-full justify-center">Add to cart</button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState('');
  const n = TESTIMONIALS.length;
  const go = (d: number) => setIdx(i => (i + d + n) % n);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);
  useEffect(() => {
    const full = TESTIMONIALS[idx];
    setShown('');
    let i = 0, alive = true;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (!alive) return;
      i += 1;
      setShown(full.slice(0, i));
      if (i >= full.length) return;
      const ch = full[i - 1];
      const pause = ch === '.' || ch === ',' || ch === '—' ? 230 : ch === ' ' ? 28 : 13 + Math.random() * 26;
      t = setTimeout(step, pause);
    };
    t = setTimeout(step, 400);
    return () => { alive = false; clearTimeout(t); };
  }, [idx]);
  return (
    <section id="testimonials" className="dark-section bg-[#0E0F11] text-white">
      <div className="mx-auto max-w-[1220px] px-5 lg:pl-16 py-16">
        <Reveal variant="up">
          <span className="inline-block rounded-md bg-[#E4E6EF] text-black px-3 py-1 text-[11px] font-bold tracking-widest">TESTIMONIALS</span>
          <div className="mt-4 flex flex-wrap items-center gap-5">
            <h2 className="font-display font-bold text-[42px] md:text-[64px] leading-none">Customer stories</h2>
            <span className="inline-flex items-center gap-2">
              <span className="rounded-full border border-white/70 px-5 py-1.5 text-xs font-bold tracking-widest">READ MORE</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7FD92] text-black"><ArrowUpRight size={16} /></span>
            </span>
          </div>
        </Reveal>
        <Reveal variant="up">
          <div className="mt-8 flex items-center gap-5 border-t border-white/15 pt-5">
            <span className="text-xs font-bold tracking-widest">TESTIMONIALS</span>
            <span className="flex-1 h-px bg-white/15" />
          </div>
        </Reveal>
        <div className="mt-8 grid lg:grid-cols-[1fr_220px] gap-10 items-center">
          <div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black font-serif text-xl leading-none">“</span>
            <p className="mt-5 text-lg md:text-[22px] font-display font-medium leading-snug max-w-2xl min-h-[120px]">{shown}<span className="inline-block w-[2px] h-[1em] bg-white/70 ml-0.5 animate-pulse align-middle" /></p>
            <div className="mt-5 flex gap-2">
              <button onClick={() => go(-1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black transition" aria-label="prev">←</button>
              <button onClick={() => go(1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-black transition" aria-label="next">→</button>
            </div>
          </div>
          <Reveal variant="scale">
            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border border-white/70">
              <p className="font-display"><span className="text-5xl font-bold">{idx + 1}</span><span className="text-xl opacity-70"> / {n}</span></p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function News() {
  return (
    <section className="mx-auto max-w-[1220px] px-5 lg:pl-16 py-20">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-[52px] md:text-[72px] leading-none">News</h2>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-black px-4 py-1.5 text-xs font-bold tracking-widest">LATEST NEWS</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F7FD92]"><ArrowUpRight size={18} /></span>
          </div>
          <p className="opacity-70 max-w-sm text-[13px]">Latest news in the office. Our design services starts and ends with a best-in-class experience strategy that builds brands.</p>
        </div>
      </Reveal>
      <Reveal variant="up">
        <div className="mt-8 flex items-center justify-between border-b border-black pb-2 text-xs tracking-widest font-medium">
          <span>LATEST POSTS</span><span>09</span>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {POSTS.map((p, i) => (
          <Reveal key={p.slug} variant="up" delay={i * 0.06}>
            <article data-cursor="view" className="rounded-none border border-black/70 bg-white p-3 grid grid-cols-[42%_1fr] gap-4 min-h-[220px]">
              <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover aspect-[3/4]" />
              <div className="py-1 pr-1">
                <p className="text-[11px] opacity-50">{p.date}</p>
                <h3 className="font-display text-[19px] leading-tight mt-2">{p.title}</h3>
                <p className="text-[13px] opacity-80 mt-3 leading-relaxed line-clamp-2">{p.ex}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function ThrowableChips() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia('(max-width:768px)').matches) return;
    const els = Array.from(ref.current.querySelectorAll('.chip'));
    const ctx = gsap.context(() => {
      els.forEach((el, i) => {
        gsap.to(el, {
          y: () => gsap.utils.random(-14, 14), rotation: () => gsap.utils.random(-8, 8),
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
          delay: i * 0.02,
        });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div ref={ref} className="mx-auto max-w-[1220px] px-5 pb-6 flex flex-wrap gap-2 select-none">
      {['WordPress plugins, built different.', 'Ringan', 'Zero bloat', 'Free updates'].map(t => (
        <span key={t} className="chip inline-block rounded-full bg-black text-white text-xs font-bold px-4 py-2">{t}</span>
      ))}
    </div>
  );
}
