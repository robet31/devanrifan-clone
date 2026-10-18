import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../components/store';
import { PRODUCTS, rp } from '../data/site';
import Reveal from '../components/Reveal';

function Shell({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <main className="pt-32 pb-20 mx-auto max-w-[1220px] px-5 lg:pl-16 min-h-[60vh]">
      <Reveal><h1 className="font-display text-4xl md:text-5xl font-bold">{title}</h1></Reveal>
      <div className="mt-6">{children}</div>
    </main>
  );
}

export function EmptyCart() {
  return (
    <Reveal variant="up">
      <div className="rounded-2xl border border-black/10 bg-[#F6F6F6] px-6 py-5 text-sm">Your cart is currently empty.</div>
      <Link to="/shop" className="btn-pill mt-5 !text-xs">Return to shop</Link>
    </Reveal>
  );
}

export function CartPage() {
  const { cart, remove, total } = useStore();
  const [qty, setQty] = useState<Record<string, number>>({});
  const q = (slug: string, fallback: number) => qty[slug] ?? fallback;
  if (cart.length === 0) return <Shell title="Cart"><EmptyCart /></Shell>;
  return (
    <Shell title="Cart">
      <Reveal variant="up">
      <div className="overflow-x-auto rounded-2xl border border-black/10">
        <table className="w-full text-sm min-w-[640px]">
          <thead><tr className="border-b border-black/10 text-left text-xs uppercase tracking-widest opacity-50">
            <th className="p-4"></th><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Quantity</th><th className="p-4 text-right">Subtotal</th>
          </tr></thead>
          <tbody>
            {cart.map(i => { const p = PRODUCTS.find(p => p.slug === i.slug)!; return (
              <tr key={i.slug} className="border-b border-black/5">
                <td className="p-4"><button onClick={() => remove(i.slug)} className="opacity-50 hover:opacity-100" aria-label="remove">×</button></td>
                <td className="p-4"><span className="flex items-center gap-3"><img src={p.img} alt={p.title} className="h-12 w-16 object-cover rounded-lg" /><b>{p.title}</b></span></td>
                <td className="p-4">{rp(p.price)}</td>
                <td className="p-4"><span className="inline-flex items-center border rounded-full">
                  <button onClick={() => setQty(s => ({ ...s, [i.slug]: Math.max(1, q(i.slug, i.qty) - 1) }))} className="px-3 py-1" aria-label="minus">−</button>
                  <span className="w-6 text-center font-bold">{q(i.slug, i.qty)}</span>
                  <button onClick={() => setQty(s => ({ ...s, [i.slug]: q(i.slug, i.qty) + 1 }))} className="px-3 py-1" aria-label="plus">+</button>
                </span></td>
                <td className="p-4 text-right font-bold">{rp(p.price * q(i.slug, i.qty))}</td>
              </tr>);})}
          </tbody>
        </table>
      </div>
      </Reveal>
      <Reveal variant="up">
      <div className="mt-6 ml-auto max-w-sm rounded-2xl border border-black/10 p-6">
        <h3 className="font-display font-bold text-lg">Cart totals</h3>
        <div className="mt-3 flex justify-between text-sm"><span className="opacity-60">Subtotal</span><b>{rp(total)}</b></div>
        <div className="mt-2 flex justify-between border-t border-black/10 pt-3"><span className="opacity-60">Total</span><b>{rp(total)}</b></div>
        <Link to="/checkout" className="btn-pill dark mt-5 w-full justify-center !text-xs">Proceed to checkout</Link>
      </div>
      </Reveal>
    </Shell>
  );
}

export function CheckoutPage() {
  const { cart, total, clear } = useStore();
  const [placed, setPlaced] = useState<string | null>(null);
  const [pay, setPay] = useState('bacs');
  if (cart.length === 0 && !placed) return <Shell title="Checkout"><EmptyCart /></Shell>;
  if (placed) return (
    <Shell title="Checkout">
      <Reveal variant="scale">
        <div className="max-w-xl rounded-3xl border border-black/10 p-10 text-center">
          <p className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F7FD92] text-2xl font-bold">✓</p>
          <h2 className="font-display text-3xl font-bold mt-4">Thank you. Your order has been received.</h2>
          <p className="mt-2 text-sm opacity-60">Order number: <b>{placed}</b> · A confirmation link was sent to your email.</p>
          <Link to="/shop" className="btn-pill mt-6 !text-xs">Return to shop</Link>
        </div>
      </Reveal>
    </Shell>
  );
  return (
    <Shell title="Checkout">
      <form onSubmit={e => { e.preventDefault(); setPlaced(`#${Math.floor(8000 + Math.random() * 999)}`); clear(); }} className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        <Reveal variant="right">
        <div className="rounded-2xl border border-black/10 p-6">
          <h3 className="font-display font-bold text-xl">Billing details</h3>
          <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
            <input required placeholder="First name" className="border rounded-xl px-4 py-3" />
            <input required placeholder="Last name" className="border rounded-xl px-4 py-3" />
            <input placeholder="Company name (optional)" className="border rounded-xl px-4 py-3 sm:col-span-2" />
            <select className="border rounded-xl px-4 py-3 sm:col-span-2 bg-white" defaultValue="Indonesia">
              {['Indonesia','Malaysia','Singapore','United States'].map(c => <option key={c}>{c}</option>)}
            </select>
            <input required placeholder="Street address" className="border rounded-xl px-4 py-3 sm:col-span-2" />
            <input required placeholder="Town / City" className="border rounded-xl px-4 py-3" />
            <input required placeholder="Province" className="border rounded-xl px-4 py-3" />
            <input required placeholder="Postcode / ZIP" className="border rounded-xl px-4 py-3" />
            <input required placeholder="Phone" className="border rounded-xl px-4 py-3" />
            <input required type="email" placeholder="Email address" className="border rounded-xl px-4 py-3 sm:col-span-2" />
            <textarea placeholder="Order notes (optional)" rows={3} className="border rounded-xl px-4 py-3 sm:col-span-2" />
          </div>
        </div>
        </Reveal>
        <Reveal variant="up" delay={0.1}>
        <div className="rounded-2xl border border-black/10 p-6 lg:sticky lg:top-28">
          <h3 className="font-display font-bold text-xl">Your order</h3>
          <div className="mt-4 space-y-2 text-sm">
            {cart.map(i => { const p = PRODUCTS.find(p => p.slug === i.slug)!; return (
              <div key={i.slug} className="flex justify-between gap-3"><span className="opacity-70">{p.title} <b>× {i.qty}</b></span><b>{rp(p.price * i.qty)}</b></div>);})}
            <div className="flex justify-between border-t border-black/10 pt-3"><span className="opacity-60">Subtotal</span><b>{rp(total)}</b></div>
            <div className="flex justify-between text-base"><span className="opacity-60">Total</span><b>{rp(total)}</b></div>
          </div>
          <div className="mt-5 space-y-2 text-sm">
            {[['bacs','Direct bank transfer','Bayar via Transfer Bank, QRIS, atau E-Wallet. Form konfirmasi muncul otomatis di halaman thank-you.'],['qris','QRIS','Scan QR dengan nominal terisi otomatis.'],['ewallet','E-Wallet VA','Virtual Account OVO / DANA / GoPay / ShopeePay.']].map(([v,t,d]) => (
              <div key={v} className={`rounded-xl border ${pay === v ? 'border-black' : 'border-black/15'}`}>
                <button type="button" onClick={() => setPay(v)} className="w-full text-left px-4 py-3 font-bold">{t}</button>
                {pay === v && <p className="px-4 pb-3 text-xs opacity-60">{d}</p>}
              </div>))}
          </div>
          <button className="btn-pill dark mt-5 w-full justify-center !text-xs">Place order</button>
        </div>
        </Reveal>
      </form>
    </Shell>
  );
}

export function AccountPage() {
  return <Shell title="My account"><form onSubmit={e => e.preventDefault()} className="max-w-sm space-y-3">
    <input placeholder="Username or email" className="border rounded-xl px-4 py-3 w-full" /><input placeholder="Password" type="password" className="border rounded-xl px-4 py-3 w-full" />
    <button className="btn-pill dark w-full justify-center">Log in</button></form></Shell>;
}

export function GenericPage({ title, body }: { title: string; body: string }) {
  return <Shell title={title}><p className="opacity-70 max-w-2xl">{body}</p></Shell>;
}
