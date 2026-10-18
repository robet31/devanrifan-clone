import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS, PRODUCT_GALLERY, rp } from '../data/site';
import Reveal from '../components/Reveal';
import { useStore } from '../components/store';

export function ProductList() {
  const { add } = useStore();
  return (
    <main className="pt-32 pb-20 mx-auto max-w-[1220px] px-5">
      <Reveal><p className="text-xs font-bold uppercase tracking-widest opacity-50">Plugin Store</p>
      <h1 className="text-[38px] md:text-[55px] leading-none">WordPress plugins, <em className="font-serif italic font-medium">built different.</em></h1>
      <p className="mt-3 opacity-70 max-w-2xl">Ringan, opinionated, dan production-ready. Dibuat langsung oleh Devan Rifan untuk pemilik toko WooCommerce &amp; WordPress.</p></Reveal>
      <Reveal variant="up">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 text-center">
          {[['12','Plugins'],['2k+','Active installs'],['1×','Bayar sekali'],['∞','Free updates'],['0','Zero bloat']].map(([a,b]) => (
            <div key={b} className="rounded-2xl bg-[#F6F6F6] p-5"><p className="font-display text-3xl font-bold">{a}</p><p className="text-xs opacity-60">{b}</p></div>
          ))}
        </div>
      </Reveal>
      <h2 className="font-display text-3xl font-bold mt-12">Custom Plugin</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} variant="up" delay={i * 0.05}>
            <div className="rounded-2xl border border-black/10 overflow-hidden bg-white">
              <Link to={`/product/${p.slug}`} data-cursor="view"><div className="relative"><img src={p.img} alt={p.title} loading="lazy" className="aspect-[16/9] w-full object-cover" /><span className="absolute top-2 left-2 rounded-full bg-black text-white text-[10px] px-2 py-1 font-bold">Sale!</span></div></Link>
              <div className="p-4"><Link to={`/product/${p.slug}`} className="font-bold line-clamp-2">{p.title}</Link>
                <p className="mt-1 text-sm"><s className="opacity-40">{rp(p.old)}</s> <b>{rp(p.price)}</b></p>
                <p className="text-xs opacity-60 mt-1 line-clamp-2">{p.blurb}</p>
                <button onClick={() => add(p.slug)} className="btn-pill mt-3 !text-xs w-full justify-center">Add to cart</button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}

export function ProductDetail() {
  const { slug } = useParams();
  const p = PRODUCTS.find(p => p.slug === slug) ?? PRODUCTS[0];
  const { add } = useStore();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const gallery = slug === PRODUCTS[0].slug ? PRODUCT_GALLERY : [p.img, ...PRODUCT_GALLERY.slice(1)];
  return (
    <main className="pt-32 pb-20 mx-auto max-w-[1220px] px-5">
      <p className="text-xs opacity-60"><Link to="/">Home</Link> / <Link to="/product/">Plugin</Link> / {p.title}</p>
      <div className="grid lg:grid-cols-2 gap-10 mt-4">
        <Reveal variant="scale">
          <img src={gallery[img]} alt={p.title} className="rounded-2xl border w-full aspect-[4/3] object-cover" />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {gallery.map((g, i) => <button key={i} onClick={() => setImg(i)} className={`rounded-xl overflow-hidden border-2 ${i === img ? 'border-black' : 'border-transparent'}`}><img src={g} alt="" loading="lazy" className="aspect-video object-cover w-full" /></button>)}
          </div>
        </Reveal>
        <Reveal variant="right">
          <h1 className="font-display text-4xl font-bold">{p.title}</h1>
          <p className="mt-2"><s className="opacity-40">{rp(p.old)}</s> <b className="text-xl">{rp(p.price)}</b></p>
          <p className="mt-3 text-sm font-bold">Update version 1.6.1</p>
          <ul className="mt-2 text-sm opacity-80 list-disc pl-5 space-y-1">
            <li>Form konfirmasi otomatis di halaman thank-you</li>
            <li>3 metode pembayaran dalam satu tampilan accordion modern</li>
            <li>QRIS auto fill nominal + download</li>
            <li>E-Wallet Virtual Account otomatis</li>
            <li>Dashboard submission + verifikasi satu klik</li>
          </ul>
          <p className="mt-3 text-sm opacity-70">{p.blurb}</p>
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center border rounded-full"><button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2" aria-label="minus">−</button><span className="w-8 text-center font-bold">{qty}</span><button onClick={() => setQty(q => q + 1)} className="px-4 py-2" aria-label="plus">+</button></div>
            <button onClick={() => { for (let i = 0; i < qty; i++) add(p.slug); }} className="btn-pill dark">Add to cart</button>
          </div>
          <p className="mt-3 text-xs opacity-60">SKU: {p.sku} Category: Plugin</p>
        </Reveal>
      </div>
      <div className="mt-12 grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="prose max-w-none text-sm leading-relaxed">
          <h2 className="font-display text-2xl font-bold">Description</h2>
          <p className="mt-2 font-bold">Berhenti Menebak Customer Sudah Transfer atau Belum.</p>
          <p className="mt-2 opacity-80">Form konfirmasi pembayaran otomatis untuk WooCommerce Direct Bank Transfer. Customer pilih Transfer Bank, QRIS, atau E-Wallet, upload bukti, lalu Anda verifikasi dengan satu klik. Order pun langsung jalan.</p>
          <h3 className="font-bold mt-4">Cara Kerja</h3>
          <ol className="list-decimal pl-5 opacity-80"><li>Customer checkout dengan Direct Bank Transfer.</li><li>Form konfirmasi muncul otomatis.</li><li>Anda verifikasi satu klik, order ke Processing.</li></ol>
          <h3 className="font-bold mt-4">FAQ</h3>
          <p className="opacity-80">Perlu gateway? Tidak. Format JPG/PNG/PDF. Satu order satu konfirmasi. Field bisa diubah via Form Builder tanpa coding.</p>
          <h3 className="font-bold mt-4">CHANGELOG 1.6.1</h3>
          <p className="opacity-80">QR nominal otomatis untuk QRIS ShopeePay &amp; OCBC, filter status dashboard, link email 7 hari, anti-duplikat.</p>
        </div>
        <aside className="rounded-2xl bg-[#F6F6F6] p-5 h-fit text-sm">
          <p className="font-bold">Related Products</p>
          {PRODUCTS.filter(x => x.slug !== p.slug).slice(0,3).map(r => (
            <Link key={r.slug} to={`/product/${r.slug}`} className="flex gap-3 mt-3 items-center">
              <img src={r.img} alt={r.title} loading="lazy" className="h-12 w-16 object-cover rounded-lg" />
              <span><b className="line-clamp-2 text-xs">{r.title}</b><br /><span className="text-xs">{rp(r.price)}</span></span>
            </Link>
          ))}
        </aside>
      </div>
    </main>
  );
}
