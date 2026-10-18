import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Menu, ShoppingCart, User, X } from 'lucide-react';
import { PRODUCTS, rp } from '../data/site';
import { useStore } from './store';
import Reveal from './Reveal';

export function Magnetic({ children, strength = 18, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(max-width: 768px)').matches) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      if (dist < 90) el.style.transform = `translate(${(dx / 90) * strength}px,${(dy / 90) * strength}px)`;
    };
    const leave = () => { el.style.transform = 'translate(0,0)'; };
    window.addEventListener('mousemove', move, { passive: true });
    el.addEventListener('mouseleave', leave);
    el.style.transition = 'transform .3s cubic-bezier(.2,.7,.2,1)';
    return () => { window.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, [strength]);
  return <div ref={ref} className={`inline-block ${className}`}>{children}</div>;
}

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      const t = (e.target as HTMLElement).closest('[data-cursor]');
      const mode = t?.getAttribute('data-cursor');
      if (ring.current) {
        ring.current.classList.toggle('big', mode === 'view' || mode === 'drag');
        if (label.current) label.current.textContent = mode === 'drag' ? '← Drag →' : mode === 'view' ? 'Explore' : '';
      }
    };
    const loop = () => {
      rx += (x - rx) * 0.16; ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate(${x - 4}px,${y - 4}px)`;
      if (ring.current) {
        const s = ring.current.classList.contains('big') ? 48 : 18;
        ring.current.style.transform = `translate(${rx - s}px,${ry - s}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return (<>
    <div ref={dot} className="lqd-cc-dot" />
    <div ref={ring} className="lqd-cc-ring"><span ref={label} /></div>
  </>);
}

const NAV = [
  { to: '/#our-services', label: 'My Services' },
  { to: '/#case-studies', label: 'Case Studies' },
  { to: '/#testimonials', label: 'Testimonials' },
  { to: '/#contact', label: 'Contact' },
  { to: '/product/', label: 'Products' },
];

export function Header() {
  const { count, setCart, setModal } = useStore();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    const f = () => setStuck(window.scrollY > 24);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => { setOpen(false); }, [loc.pathname]);
  return (
    <>
    <header className={`site-header fixed top-0 inset-x-0 z-50 transition-all ${stuck ? '' : ''}`}>
      <div className="mx-auto px-5 pt-5 transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)]" style={{ maxWidth: stuck ? 1120 : 900 }}>
        <div className={`flex items-center justify-between gap-4 rounded-xl bg-white px-6 py-3 transition-shadow duration-500 ${stuck ? 'shadow-[0_22px_50px_rgba(0,0,0,0.16)]' : 'shadow-[0_8px_24px_rgba(0,0,0,0.08)]'}`}>
          <Link to="/" className="flex items-center gap-2 shrink-0" data-cursor="view">
            <img src="https://devanrifan.com/wp-content/uploads/2022/10/Devan-Logo.png" alt="Devan Rifan" className={`w-auto transition-all duration-500 ${stuck ? 'h-8' : 'h-7'}`} />
          </Link>
          <nav className={`hidden lg:flex items-center whitespace-nowrap font-medium transition-all duration-500 ${stuck ? 'gap-7 text-[14px]' : 'gap-4 text-[12px]'}`}>
            {NAV.map(n => <Link key={n.label} to={n.to} className="nav-link">{n.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/my-account" className={`h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-all duration-500 ${stuck ? 'hidden sm:flex' : 'hidden'}`} aria-label="account"><User size={16} /></Link>
            <button onClick={() => setCart(true)} className="relative flex h-9 w-9 items-center justify-center rounded-full" aria-label="cart">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">{count}</span>
            </button>
            <button onClick={() => setModal(true)} className={`btn-pill hidden md:inline-flex transition-all duration-500 ${stuck ? '!py-2' : '!py-1.5 !text-[11px] !px-4'}`}>Consultation</button>
            <button onClick={() => setModal(true)} className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-[#F7FD92] text-black" aria-label="consultation arrow"><ArrowUpRight size={18} /></button>
            <button onClick={() => setOpen(true)} className="lg:hidden flex items-center gap-2 text-sm font-semibold" aria-label="menu">
              <Menu size={20} /> Menu
            </button>
          </div>
        </div>
      </div>
    </header>
    <SideDrawer open={open} onClose={() => setOpen(false)} />
    <SideRails onMenu={() => setOpen(true)} />
    </>
  );
}

export function SideDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`fixed inset-0 z-[100] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} />
      <aside className={`absolute right-0 top-0 h-full w-full max-w-[560px] bg-white rounded-l-[2rem] shadow-2xl overflow-y-auto transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.2,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={onClose} className="absolute top-6 right-6 h-11 w-11 rounded-full bg-black text-white flex items-center justify-center" aria-label="close menu"><X size={20} /></button>
        <div className="px-8 md:px-12 py-16 grid grid-cols-[140px_1fr] gap-8 min-h-full">
          <div>
            <p className="text-xs font-bold text-black/30">Social</p>
            <div className="mt-6 space-y-4 text-[15px] font-medium">
              {['Facebook','Behance','Dribble','Instagram','Youtube'].map(s => <a key={s} href="#" onClick={e => e.preventDefault()} className="block hover:opacity-60">{s}</a>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-black/30">Menu</p>
            <nav className={`drawer-nav mt-4 space-y-4 ${open ? 'open' : ''}`}>
              {NAV.map((n, i) => (
                <Link key={n.label} to={n.to} onClick={onClose}
                  className="drawer-link block font-display font-medium text-3xl md:text-[42px] leading-tight"
                  style={{ '--i': i } as CSSProperties}>{n.label}</Link>
              ))}
            </nav>
            <div className="mt-12">
              <p className="text-xs font-bold text-black/30">Get in touch</p>
              <p className="text-lg font-medium mt-1">info@liquid.com</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function SideRails({ onMenu }: { onMenu: () => void }) {
  const { setModal } = useStore();
  const [prog, setProg] = useState(0);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProg(max > 0 ? h.scrollTop / max : 0);
      const els = document.elementsFromPoint(28, window.innerHeight * 0.5);
      const bg = els.find(e => !(e as HTMLElement).closest?.('.siderail'));
      setDark(!!(bg as HTMLElement)?.closest?.('.dark-section'));
    };
    window.addEventListener('scroll', f, { passive: true });
    f();
    return () => window.removeEventListener('scroll', f);
  }, []);
  const tone = dark ? 'text-white' : 'text-black';
  return (
    <>
      <div className={`siderail hidden lg:flex fixed left-5 top-0 bottom-0 z-40 flex-col items-center justify-between py-28 w-8 transition-colors duration-300 ${tone}`}>
        <button onClick={onMenu} className="flex flex-col items-center gap-2" aria-label="open menu" data-cursor="view">
          <span className="flex gap-1"><i className="block w-px h-5 bg-current" /><i className="block w-px h-5 bg-current" /><i className="block w-px h-5 bg-current" /></span>
          <span className="text-xs font-bold" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Menu</span>
        </button>
        <a href="mailto:hello@devanrifan.com" className="text-xs font-medium" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>hello@devanrifan.com</a>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-2" aria-label="scroll to top">
          <span className="text-xs font-medium" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Scroll to top</span>
          <span className={`relative w-px h-20 ${dark ? 'bg-white/20' : 'bg-black/15'}`}><i className={`absolute top-0 left-0 w-px ${dark ? 'bg-white' : 'bg-black'}`} style={{ height: `${Math.max(8, prog * 100)}%` }} /><i className={`absolute -bottom-1 -left-[3px] block h-2 w-2 rounded-full ${dark ? 'bg-white' : 'bg-black'}`} /></span>
        </button>
      </div>
      <button onClick={() => setModal(true)} data-cursor="view"
        className={`siderail send-tab hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-40 text-[13px] font-semibold tracking-wide hover:opacity-60 transition-colors duration-300 ${tone}`}
        style={{ writingMode: 'vertical-rl' }} aria-label="send a message">
        Send a message
      </button>
    </>
  );
}

export function Footer() {
  const { setModal } = useStore();
  const soc = 'h-[18px] w-[18px]';
  const socials: { label: string; href: string; icon: ReactNode }[] = [
    { label: 'Instagram', href: 'http://instagram.com/devanrifan', icon: (<svg viewBox="0 0 24 24" className={soc} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" /></svg>) },
    { label: 'Youtube', href: 'http://youtube.com/@devanprogramming/', icon: (<svg viewBox="0 0 24 24" className={soc} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10.5 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" /></svg>) },
    { label: 'Linkedin', href: 'http://linkedin.com/in/devanrifan', icon: (<svg viewBox="0 0 24 24" className={soc} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3" /><text x="12" y="16.5" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="currentColor" stroke="none" fontFamily="Space Grotesk,sans-serif">in</text></svg>) },
    { label: 'Tiktok', href: 'https://www.tiktok.com/@devanrifan', icon: (<svg viewBox="0 0 24 24" className={soc} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 4c.4 2.6 2.2 4.4 5 4.7" /></svg>) },
  ];
  return (
    <>
      <ContactSection />
      <footer className="dark-section bg-[#0E0F11] text-white/80">
      <div className="mx-auto max-w-[1220px] px-5 lg:pl-16 pt-14">
        <Reveal variant="right">
        <div className="flex items-start justify-between gap-6 pb-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">We'd like to talk</h2>
            <div className="mt-4 flex items-center gap-2">
              <button onClick={() => setModal(true)} className="rounded-full border border-white/70 px-5 py-1.5 text-xs font-bold tracking-widest text-white hover:bg-white hover:text-black transition">CONTACT US</button>
              <button onClick={() => setModal(true)} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7FD92] text-black" aria-label="contact us"><ArrowUpRight size={16} /></button>
            </div>
          </div>
          <svg width="90" height="90" viewBox="0 0 80 80" className="hidden sm:block opacity-90 shrink-0" aria-hidden="true"><path d="M60.5 0V4.7H8.8L80 75.9 75.8 79.1 5 8.3V60.5H0V0H60.5Z" fill="#fff" /></svg>
        </div>
        </Reveal>
      </div>
      <div className="mx-auto max-w-[1220px] px-5 lg:pl-16 pb-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="text-[11px] tracking-[0.2em] text-white/35 mb-5">INFORMATION</h4>
            <div className="space-y-3 text-[15px]">
              <p>Contact Us</p>
              <p className="flex items-center gap-2">FAQ <span className="rounded-full border border-white/25 px-2.5 py-0.5 text-[10px] tracking-widest text-white/70">SOON</span></p>
              <p>Report A Bug</p><p>Careers</p><p>About Us</p>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.2em] text-white/35 mb-5">MY ACCOUNT</h4>
            <div className="space-y-3 text-[15px]">
              <p>Company</p><p>Contact</p><p>Privacy Policy</p><p>Careers</p>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.2em] text-white/35 mb-5">NEED HELP?</h4>
            <p className="text-[11px] tracking-[0.2em] text-white/35">CALL US DIRECTLY</p>
            <p className="text-white font-display text-xl font-bold mt-1">089 8864 0470</p>
            <p className="text-[11px] tracking-[0.2em] text-white/35 mt-5">NEED SUPPORT?</p>
            <p className="text-white font-display text-lg font-bold mt-1">hello@devanrifan.com</p>
          </div>
          <div>
            <h4 className="text-[11px] tracking-[0.2em] text-white/35 mb-5">KEEP IN TOUCH</h4>
            <form onSubmit={e => e.preventDefault()} className="flex items-center border-b border-white/20 pb-2">
              <input placeholder="Enter your email address" className="bg-transparent flex-1 outline-none placeholder:text-white/40 text-[15px]" />
              <button className="text-white pl-3" aria-label="subscribe">〉</button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 mt-12 pt-6 text-xs">
          <img src="https://devanrifan.com/wp-content/uploads/2022/10/Devan-Logo-1.png" alt="Devan" className="h-8 w-auto brightness-0 invert opacity-90" loading="lazy" />
          <p className="text-white/60">© 2026 Devan Rifan</p>
          <div className="flex gap-3">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:text-white transition" aria-label={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}

const BUDGETS = ['$100-$300', '$300-$500', '$500-$1000'];

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [budget, setBudget] = useState(BUDGETS[0]);
  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto max-w-[1220px] px-5 lg:pl-16 py-16 grid lg:grid-cols-2 gap-10">
        <Reveal variant="right">
          <p className="text-xs font-bold uppercase tracking-widest opacity-50">Send a message</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-2">Have a project<br />in mind?</h2>
          <p className="mt-4 opacity-70 max-w-sm text-sm">Tell me what you're building and what success looks like. I'll reply within 1×24h with a clear proposal — no surprises.</p>
          <p className="mt-6 text-sm font-bold">hello@devanrifan.com</p>
          <p className="text-sm font-bold">089 8864 0470</p>
        </Reveal>
        <Reveal variant="up" delay={0.1}>
          {sent ? <p className="font-display text-2xl font-bold">Message sent. Talk soon.</p> : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid grid-cols-2 gap-x-4 gap-y-5">
            <input required placeholder="What's your name?" className="border-b border-black/25 py-2 outline-none text-sm col-span-1" />
            <input required type="email" placeholder="Email address" className="border-b border-black/25 py-2 outline-none text-sm col-span-1" />
            <input placeholder="Select a Discussion Topic" className="border-b border-black/25 py-2 outline-none text-sm col-span-1" />
            <div className="col-span-1 flex flex-wrap gap-2 items-center">
              {BUDGETS.map(b => <button type="button" key={b} onClick={() => setBudget(b)} className={`rounded-full border px-3 py-1 text-xs ${budget === b ? 'bg-black text-white border-black' : 'border-black/20'}`}>{b}</button>)}
            </div>
            <textarea required rows={4} placeholder="A brief description about your project/request/consultation" className="border-b border-black/25 py-2 outline-none text-sm col-span-2" />
            <label className="col-span-2 flex items-start gap-3 text-xs opacity-80">
              <input required type="checkbox" className="mt-0.5 h-4 w-4" /> I am bound by the terms of the Service I accept Privacy Policy
            </label>
            <button className="col-span-2 rounded-full border-2 border-black py-3 text-sm font-bold tracking-widest hover:bg-black hover:text-white transition">SEND MESSAGE</button>
          </form>)}
        </Reveal>
      </div>
    </section>
  );
}

export function ContactModal() {
  const { modalOpen, setModal } = useStore();
  const [render, setRender] = useState(false);
  const [anim, setAnim] = useState(false);
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (modalOpen) {
      setRender(true);
      setSent(false);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      document.body.style.overflow = 'hidden';
      const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setModal(false); };
      window.addEventListener('keydown', esc);
      return () => { cancelAnimationFrame(r); window.removeEventListener('keydown', esc); };
    }
    setAnim(false);
    document.body.style.overflow = '';
    const t = setTimeout(() => setRender(false), 500);
    return () => clearTimeout(t);
  }, [modalOpen, setModal]);
  if (!render) return null;
  const d = (i: number): CSSProperties => ({ transitionDelay: anim ? `${120 + i * 80}ms` : '0ms' });
  const field = 'border-b border-black/25 py-2 outline-none text-[15px] w-full bg-transparent';
  const label = 'text-[15px]';
  return (
    <div className={anim ? 'modal-open' : ''}>
    <div className="modal-bg fixed inset-0 z-[100] bg-white overflow-y-auto">
      <button onClick={() => setModal(false)} className="modal-item absolute top-6 right-6 z-10 h-11 w-11 flex items-center justify-center text-2xl font-light hover:rotate-90 transition-transform duration-300" style={d(0)} aria-label="close"><X size={26} /></button>
      <div className="grid lg:grid-cols-2 min-h-full">
        <div className="relative px-8 md:px-16 py-14 flex flex-col overflow-hidden">
          <img src="/img/devan-rifan-2.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-10 pointer-events-none" />
          <div className="relative">
            <h2 className="modal-item font-display font-bold text-[64px] md:text-[100px] leading-[0.95]" style={d(1)}>Send a<br /><em className="font-serif italic font-medium">message.</em></h2>
            <p className="modal-item mt-5 text-[17px]" style={d(2)}>We're here to answer any question you may have.</p>
          </div>
          <div className="relative grid grid-cols-2 gap-8 mt-auto pt-16">
            <div className="modal-item" style={d(3)}>
              <h6 className="font-bold text-sm">careers</h6>
              <p className="mt-3 text-[15px]">Would you like to join our growing team?</p>
              <p className="mt-4 font-bold text-[17px]">careers@devanrifan.com</p>
            </div>
            <div className="modal-item" style={d(4)}>
              <h6 className="font-bold text-sm">Feedbacks</h6>
              <p className="mt-3 text-[15px]">Have a project in mind? Send a message.</p>
              <p className="mt-4 font-bold text-[17px]">hello@devanrifan.com</p>
            </div>
          </div>
        </div>
        <div className="px-8 md:px-16 py-14">
          {sent ? <p className="modal-item font-display text-3xl font-bold mt-20" style={d(5)}>Message sent.<br />I'll reply within 1×24h.</p> : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid grid-cols-2 gap-x-8 gap-y-8 mt-6">
            <div className="modal-item" style={d(5)}><p className={label}>What's your name?</p><input required className={`${field} mt-1`} /></div>
            <div className="modal-item" style={d(6)}><p className={label}>Email address</p><input required type="email" className={`${field} mt-1`} /></div>
            <div className="modal-item" style={d(7)}><p className={label}>Select a Discussion Topic</p><input className={`${field} mt-1`} /></div>
            <div className="modal-item" style={d(8)}><p className={label}>What's your budget?</p><input className={`${field} mt-1`} /></div>
            <div className="modal-item col-span-2" style={d(9)}><p className={label}>A brief description about your project/request/consultation</p><textarea required rows={4} className={`${field} mt-1`} /></div>
            <div className="modal-item col-span-2" style={d(10)}>
              <button className="w-full rounded-full bg-black text-white py-4 text-sm font-bold tracking-widest hover:bg-neutral-800 transition">— SEND MESSAGE</button>
              <p className="mt-4 text-center text-sm">— copy email: info@liquid-themes.com</p>
            </div>
          </form>)}
        </div>
      </div>
    </div>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCart, cart, remove, total, count } = useStore();
  if (!cartOpen) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={() => setCart(false)} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-2xl font-bold">Cart <span className="text-sm align-middle bg-black text-white rounded-full px-2 py-0.5">{count}</span></h3>
          <button onClick={() => setCart(false)} aria-label="close cart"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 && <h5 className="opacity-60">No products in the cart.</h5>}
          {cart.map(i => {
            const p = PRODUCTS.find(p => p.slug === i.slug)!;
            return (
              <div key={i.slug} className="flex gap-3 border rounded-xl p-3">
                <img src={p.img} alt={p.title} className="h-16 w-20 object-cover rounded-lg" loading="lazy" />
                <div className="flex-1 text-xs">
                  <p className="font-bold line-clamp-2">{p.title}</p>
                  <p className="mt-1">{i.qty} × {rp(p.price)}</p>
                  <button onClick={() => remove(i.slug)} className="underline opacity-60">remove</button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t pt-4 flex items-center justify-between font-bold">
          <span>Total {rp(total)}</span>
          <Link to="/checkout" onClick={() => setCart(false)} className="btn-pill dark !text-xs">Checkout</Link>
        </div>
      </aside>
    </div>
  );
}

const WA_SVG = (
  <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true"><path fill="#25D366" d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 1.9 6.5L4 29l7.7-1.8c1.8 1 3.9 1.5 4.3 1.5 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.3 0-2.6-.4-3.7-1l-.3-.2-4.3 1 1.1-4.1-.2-.3c-.7-1.1-1.1-2.4-1.1-3.8 0-4.9 4-8.9 8.9-8.9s4.9 4 4.9 8.9-4 8.4-5.3 8.4zm4.9-6.3c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.6.9-.8 1-.1.2-.3.2-.5.1-.3-.1-1-1.1-1.9-2.3-.2-.3 0-.4.1-.5l.5-.6c.1-.2.2-.4.3-.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.5-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" /></svg>
);

export function WhatsFloat() {
  const [open, setOpen] = useState(false);
  const [agent, setAgent] = useState(0);
  const agents: [string, string][] = [['Devan','628988640470'],['Fauziah','6289605544678']];
  useEffect(() => {
    const t = setInterval(() => setAgent(a => (a + 1) % agents.length), 5000);
    return () => clearInterval(t);
  }, []);
  const [name] = agents[agent];
  const text = encodeURIComponent("Hi, I'm interested in your services.");
  return (
    <div className="fixed bottom-5 right-5 z-[90] flex items-end">
      <div className="relative flex items-end">
        <button onClick={() => setOpen(!open)} className="peer order-2 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl border border-black/10" aria-label="whatsapp">{WA_SVG}</button>
        <div className="order-1 absolute bottom-1 right-[64px] whitespace-nowrap rounded-2xl rounded-br-sm bg-white shadow-xl border border-black/10 px-4 py-2 text-xs leading-tight opacity-0 translate-y-1 peer-hover:opacity-100 peer-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <p className="font-bold text-[#25D366]">{name}</p>
          <p className="font-semibold">Chat via WhatsApp</p>
        </div>
        {open && (
          <div className="order-3 absolute bottom-[64px] right-0 w-64 rounded-2xl bg-white shadow-2xl border p-3 text-xs space-y-2">
            {agents.map(([n, ph]) => (
              <a key={n} href={`https://wa.me/${ph}?text=${text}`} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-[#F6F6F6] px-3 py-2 font-bold hover:bg-[#F7FD92]">
                {n} <span>→</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ScrollTop() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 600);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  if (!s) return null;
  return <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-5 left-5 z-[90] h-11 w-11 rounded-full bg-black text-white flex items-center justify-center" aria-label="top"><ArrowUp size={18} /></button>;
}

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] rounded-full bg-black text-white text-xs px-5 py-2.5 shadow-xl">{toast}</div>;
}
