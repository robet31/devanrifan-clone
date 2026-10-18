import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Variant = 'up' | 'right' | 'scale' | 'rotateY' | 'rotateZ';
const PRESETS: Record<Variant, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  up: { from: { y: 30, opacity: 0 }, to: { y: 0, opacity: 1 } },
  right: { from: { x: 100, opacity: 0 }, to: { x: 0, opacity: 1 } },
  scale: { from: { scale: 0.8, opacity: 0 }, to: { scale: 1, opacity: 1 } },
  rotateY: { from: { x: 30, rotationY: 30, opacity: 0, transformPerspective: 800 }, to: { x: 0, rotationY: 0, opacity: 1 } },
  rotateZ: { from: { y: 50, z: 50, rotationY: 20, opacity: 0, transformPerspective: 900 }, to: { y: 0, z: 0, rotationY: 0, opacity: 1 } },
};

export default function Reveal({ children, variant = 'up', delay = 0, duration = 1, className = '' }: {
  children: ReactNode; variant?: Variant; delay?: number; duration?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia('(max-width: 768px)').matches) return; // match original: disable on mobile
    const p = PRESETS[variant];
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, p.from, {
        ...p.to, duration, delay, ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 88%' },
      });
    });
    return () => ctx.revert();
  }, [variant, delay, duration]);
  return <div ref={ref} className={className}>{children}</div>;
}
