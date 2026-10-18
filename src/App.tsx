import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { StoreProvider } from './components/store';
import { CartDrawer, ContactModal, CustomCursor, Footer, Header, ScrollTop, Toast, WhatsFloat } from './components/chrome';
import Home from './pages/Home';
import { ProductDetail, ProductList } from './pages/Shop';
import { PortfolioDetail, PortfolioList } from './pages/Work';
import { AccountPage, CartPage, CheckoutPage, GenericPage } from './pages/Misc';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60); return; }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollManager />
        <CustomCursor />
        <Header />
        <div className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/" element={<ProductList />} />
          <Route path="/product" element={<ProductList />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/portfolios/" element={<PortfolioList />} />
          <Route path="/portfolios" element={<PortfolioList />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/shop/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/" element={<CheckoutPage />} />
          <Route path="/my-account" element={<AccountPage />} />
          <Route path="/my-account/" element={<AccountPage />} />
          <Route path="/payment-confirmation" element={<GenericPage title="Payment Confirmation" body="Upload bukti transfer di sini (demo). Order auto-update setelah verifikasi satu klik — sama seperti plugin WC Bank Transfer Confirmation." />} />
          <Route path="/igdm-lp" element={<GenericPage title="IGDM LP" body="Landing IGDM (demo). Shortcode pricing asli [igdm_pricing] diganti CTA + form konsultasi." />} />
          <Route path="/igdm-dashboard" element={<GenericPage title="IGDM Dashboard" body="Dashboard IGDM (demo, butuh login). Struktur disamakan dengan halaman utilitas asli." />} />
          <Route path="/section-test" element={<GenericPage title="Section Test" body="Halaman staging untuk uji section & animasi." />} />
          <Route path="*" element={<GenericPage title="404" body="Halaman tidak ditemukan. Kembali ke beranda." />} />
        </Routes>
        </div>
        <Footer />
        <ContactModal />
        <CartDrawer />
        <WhatsFloat />
        <ScrollTop />
        <Toast />
      </BrowserRouter>
    </StoreProvider>
  );
}
