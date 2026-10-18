import { Link, useParams } from 'react-router-dom';
import { WORKS } from '../data/site';
import Reveal from '../components/Reveal';
import { Works } from '../components/sections';

export function PortfolioList() {
  return (
    <main className="pt-32 pb-20 mx-auto max-w-[1220px] px-5">
      <Reveal><h1 className="font-display text-[42px] md:text-[55px] font-bold">Portfolios</h1>
      <p className="opacity-60">8 selected works across company profile, ecommerce, hotel &amp; landing.</p></Reveal>
      <div className="mt-6"><Works limit={8} filter={false} /></div>
    </main>
  );
}

export function PortfolioDetail() {
  const { slug } = useParams();
  const w = WORKS.find(w => w.slug === slug) ?? WORKS[0];
  const idx = WORKS.indexOf(w);
  const prev = WORKS[(idx - 1 + WORKS.length) % WORKS.length];
  return (
    <main className="pt-32 pb-20">
      <div className="mx-auto max-w-[1220px] px-5">
        <Reveal><h1 className="font-display text-[42px] md:text-[55px] font-bold">{w.title}</h1></Reveal>
        <Reveal variant="scale"><img src={w.cover} alt={w.title} className="mt-4 rounded-3xl w-full aspect-[16/8] object-cover" /></Reveal>
        <div className="grid sm:grid-cols-3 gap-4 mt-6 text-sm">
          <div className="rounded-2xl bg-[#F6F6F6] p-5"><p className="opacity-50 text-xs font-bold uppercase">Date</p><p className="font-display text-xl font-bold">{w.date}</p></div>
          <div className="rounded-2xl bg-[#F6F6F6] p-5"><p className="opacity-50 text-xs font-bold uppercase">Client</p><p className="font-display text-xl font-bold">{w.client}</p></div>
          <div className="rounded-2xl bg-[#F6F6F6] p-5"><p className="opacity-50 text-xs font-bold uppercase">Category</p><p className="font-display text-xl font-bold">{w.cat}</p></div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[['01 Problem','We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities.'],['02 Approach','We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities.'],['03 Solution','We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities, digital experiences, and print materials.']].map(([t,d]) => (
            <Reveal key={t} variant="up"><h3 className="font-display font-bold">{t}</h3><p className="mt-2 opacity-70 text-sm">{d}</p></Reveal>
          ))}
        </div>
      </div>
      <section className="bg-[#F6F6F6] mt-12 py-14">
        <div className="mx-auto max-w-[1220px] px-5">
          <Reveal><h2 className="font-display text-3xl font-bold">Light mode</h2></Reveal>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            {[w.cover,'https://devanrifan.com/wp-content/uploads/2018/08/iPhone@2x-3.png'].map((s,i) => <Reveal key={i} variant="scale"><img src={s} alt="" loading="lazy" className="rounded-2xl w-full aspect-video object-cover bg-white" /></Reveal>)}
          </div>
          <Reveal><h2 className="font-display text-3xl font-bold mt-10">Mobile First</h2>
          <p className="opacity-70 max-w-2xl mt-2 text-sm">We provide digital experience services to startups and small businesses. Install any demo, plugin or template in a matter of seconds.</p></Reveal>
          <div className="flex items-center justify-between mt-10 border-t border-black/10 pt-6">
            <p className="text-xs opacity-50">Share on ○ ○ ○</p>
            <Link to={`/portfolio/${prev.slug}`} className="text-sm font-bold underline">← previous project {prev.title}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
