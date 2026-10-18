import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { PRODUCTS } from '../data/site';

export type CartItem = { slug: string; qty: number };
type Store = {
  cart: CartItem[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  count: number;
  total: number;
  modalOpen: boolean;
  setModal: (v: boolean) => void;
  cartOpen: boolean;
  setCart: (v: boolean) => void;
  toast: string;
};

const Ctx = createContext<Store | null>(null);
const priceOf = (slug: string) => PRODUCTS.find(p => p.slug === slug)?.price ?? 0;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCartItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('devan-cart') || '[]'); } catch { return []; }
  });
  const [modalOpen, setModal] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState('');
  useEffect(() => { localStorage.setItem('devan-cart', JSON.stringify(cart)); }, [cart]);

  const v = useMemo<Store>(() => ({
    cart,
    add: (slug) => {
      setCartItems(c => {
        const f = c.find(i => i.slug === slug);
        return f ? c.map(i => i.slug === slug ? { ...i, qty: i.qty + 1 } : i) : [...c, { slug, qty: 1 }];
      });
      const p = PRODUCTS.find(p => p.slug === slug);
      setToast(`Added ${p?.title ?? slug} to cart`);
      setTimeout(() => setToast(''), 2200);
    },
    remove: (slug) => setCartItems(c => c.filter(i => i.slug !== slug)),
    clear: () => setCartItems([]),
    count: cart.reduce((a, b) => a + b.qty, 0),
    total: cart.reduce((a, b) => a + b.qty * priceOf(b.slug), 0),
    modalOpen, setModal, cartOpen, setCart: setCartOpen, toast,
  }), [cart, modalOpen, cartOpen, toast]);
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error('store missing');
  return s;
};
