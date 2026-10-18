export const LOGOS = [
  { name: 'Acuan', src: 'https://easternboss.com/wp-content/uploads/2026/04/acuan-logo-1.webp' },
  { name: 'Dot', src: 'https://easternboss.com/wp-content/uploads/2026/04/dot-logo.webp' },
  { name: 'Hollo', src: 'https://easternboss.com/wp-content/uploads/2026/04/hollo-logo.webp' },
  { name: 'Paloma', src: 'https://easternboss.com/wp-content/uploads/2026/04/paloma-logo-eb.webp' },
  { name: 'Rumme', src: 'https://easternboss.com/wp-content/uploads/2026/04/rumme-logo-eb.webp' },
  { name: 'Luwansa', src: 'https://easternboss.com/wp-content/uploads/2026/04/luwansa-logo-eb.webp' },
  { name: 'DRE', src: 'https://easternboss.com/wp-content/uploads/2026/04/dre-logo.webp' },
  { name: 'Studio Pinch', src: 'https://easternboss.com/wp-content/uploads/2026/04/studio-pinch-logo.webp' },
  { name: 'AMGC', src: 'https://easternboss.com/wp-content/uploads/2026/04/amgc-logo.webp' },
  { name: 'Yellow Run', src: 'https://easternboss.com/wp-content/uploads/2026/04/yellowrun26.webp' },
  { name: 'Sense Seminyak', src: 'https://easternboss.com/wp-content/uploads/2026/04/senseseminya.webp' },
  { name: 'Renew You', src: 'https://easternboss.com/wp-content/uploads/2026/04/renewyou.webp' },
  { name: 'Skylight', src: 'https://easternboss.com/wp-content/uploads/2026/04/skylight-strategic.webp' },
  { name: 'Kolam Susu', src: 'https://easternboss.com/wp-content/uploads/2026/04/kolam-susu.webp' },
  { name: 'Yafindo', src: 'https://easternboss.com/wp-content/uploads/2026/04/yafindo.webp' },
  { name: 'Mulia Steel', src: 'https://easternboss.com/wp-content/uploads/2026/04/muliasteel.webp' },
];

export const SERVICES = [
  { n: '01', t: 'Website Development', d: 'From landing pages to full-scale web apps, I design and develop websites that are fast, clean, and built to convert. No cookie-cutter templates, just sites tailored to your goals.' },
  { n: '02', t: 'Marketing Strategy', d: 'Positioning, funnels and content systems that turn traffic into pipeline. Every page ships with a conversion job to do.' },
  { n: '03', t: 'Mobile App Design', d: 'App-first UI/UX with native-feel interactions, design systems and handoff-ready screens for iOS and Android.' },
];

export const PROCESS = [
  { n: '01', t: 'Project Offer', d: "We start with a conversation, tell me what you're building, what problem you're solving, and what success looks like. From there, I'll put together a clear proposal with no surprises." },
  { n: '02', t: 'UI/UX Design', d: 'Before writing a single line of code, we get aligned on the look and feel. I make sure the visual direction matches your brand and speaks to the right audience.' },
  { n: '03', t: 'Development', d: 'This is where things come to life. I build clean, well-structured websites that load fast and work smoothly, on desktop, tablet, and mobile.' },
  { n: '04', t: 'Launch', d: "Launch day doesn't have to be stressful. I handle the technical side so you can focus on celebrating, and I stick around to make sure everything runs smoothly after go-live." },
];

export const TAGS = ['Project Manager','Mobile Apps','Woocommerce','WordPress','Native Development','Front-End','Back-End','Performance','PHP','Next.JS','React','Vue'];

export type Work = { slug: string; title: string; cat: string; catslug: string; cover: string; date?: string; client?: string };
export const WORKS: Work[] = [
  { slug: 'amcg', title: 'AMCG', cat: 'Company Profile', catslug: 'company-profile', cover: 'https://devanrifan.com/wp-content/uploads/2026/04/New-Project-21.webp', date: '2020', client: 'LiquidThemes' },
  { slug: 'rummekraft', title: 'Rummekraft', cat: 'Ecommerce', catslug: 'ecommerce', cover: 'https://devanrifan.com/wp-content/uploads/2018/08/New-Project-17.webp', date: '2020', client: 'LiquidThemes' },
  { slug: 'sunset-seminyak', title: 'Sunset Seminyak', cat: 'Hotel & Villa', catslug: 'hotel-villa', cover: 'https://devanrifan.com/wp-content/uploads/2018/08/New-Project-16.webp', date: '2020', client: 'LiquidThemes' },
  { slug: 'paloma-hardware', title: 'Paloma Hardware', cat: 'Ecommerce', catslug: 'ecommerce', cover: 'https://devanrifan.com/wp-content/uploads/2026/04/New-Project-19.webp', date: '2021', client: 'Paloma' },
  { slug: 'yellow-run', title: 'Yellow Run', cat: 'Landing Page', catslug: 'landing-page', cover: 'https://devanrifan.com/wp-content/uploads/2026/04/New-Project-22.webp', date: '2021', client: 'Yellow Run' },
  { slug: 'yafindo', title: 'Yafindo', cat: 'Company Profile', catslug: 'company-profile', cover: 'https://devanrifan.com/wp-content/uploads/2018/08/New-Project-18.webp', date: '2021', client: 'Yafindo' },
  { slug: 'wrapshield', title: 'Wrapshield', cat: 'Company Profile', catslug: 'company-profile', cover: 'https://devanrifan.com/wp-content/uploads/2026/04/New-Project-20.webp', date: '2022', client: 'Wrapshield' },
  { slug: 'skylight', title: 'Skylight', cat: 'Company Profile', catslug: 'company-profile', cover: 'https://devanrifan.com/wp-content/uploads/2018/08/New-Project-23.webp', date: '2022', client: 'Skylight' },
];

export type Product = { slug: string; title: string; price: number; old: number; sku: string; img: string; blurb: string };
export const PRODUCTS: Product[] = [
  { slug: 'woocommerce-bank-transfer-confirmation', title: 'Woocommerce Bank Transfer Confirmation', price: 45000, old: 80000, sku: 'WBT-8767', img: 'https://devanrifan.com/wp-content/uploads/2026/09/Wc-Bank-Transfer-Confirmation-1.webp', blurb: 'Form konfirmasi pembayaran otomatis untuk WooCommerce Direct Bank Transfer: QRIS nominal otomatis, VA e-wallet, dashboard 1-klik.' },
  { slug: 'floating-button-whatsapp-multiple-agents', title: 'Floating Button Whatsapp Multiple Agents', price: 35000, old: 80000, sku: 'FWA-8402', img: 'https://devanrifan.com/wp-content/uploads/2026/05/ChatGPT-Image-May-4-2026-03_03_14-PM.png', blurb: 'Tombol WA mengambang multi-agent dengan mode rotate, greeting pagi/siang/malam, posisi kanan/kiri.' },
  { slug: 'flow-chat-bot', title: 'Flow Chat Bot', price: 35000, old: 80000, sku: 'FCB-8396', img: 'https://devanrifan.com/wp-content/uploads/2026/05/Flow-Chat-Bot.png', blurb: 'Chatbot flow builder tanpa coding untuk WordPress: trigger, branching, dan handoff ke WhatsApp.' },
  { slug: 'woocommerce-order-via-whatsapp', title: 'Woocommerce Order via Whatsapp', price: 35000, old: 80000, sku: 'WOW-8232', img: 'https://devanrifan.com/wp-content/uploads/2026/04/Thumbnail-Product.png', blurb: 'Checkout via WhatsApp: keranjang terkirim rapi ke nomor toko, cocok untuk toko tanpa payment gateway.' },
];

export const PRODUCT_GALLERY = [
  'https://devanrifan.com/wp-content/uploads/2026/09/Wc-Bank-Transfer-Confirmation-1.webp',
  'https://devanrifan.com/wp-content/uploads/2026/09/Screenshot-2026-10-04-at-00.07.44.png',
  'https://devanrifan.com/wp-content/uploads/2026/09/Screenshot-2026-10-04-at-00.08.10.png',
  'https://devanrifan.com/wp-content/uploads/2026/09/Screenshot-2026-10-04-at-00.08.30.png',
];

export const TESTIMONIALS = [
  'By enrolling in the Four Bear Program, UM guarantees you will graduate in four years with a bachelor’s degree. Discover the global city—filled with inspiration, opportunities to explore.',
  'Working with Devan felt like adding a senior product engineer to the team. Fast, clean builds and zero drama at launch.',
  'Our store finally stopped leaking orders. The bank-transfer flow paid for itself in the first week.',
  'Clear proposal, sharp design direction, and a site that loads instantly on mobile. Highly recommended.',
];

export const POSTS = [
  { slug: '5-reasons-to-purchase-desktop-computers', title: 'Investment trend monitor: Top trends in 2023', date: '5 years ago', img: 'https://devanrifan.com/wp-content/uploads/2021/06/blog-img-3-700x450.jpg', ex: 'As the complexity of buildings to increase, the field of architecture became multi-' },
  { slug: 'utilizing-mobile-technology-in-the-field', title: 'Free advertising for your online business', date: '6 years ago', img: 'https://devanrifan.com/wp-content/uploads/2021/06/blog-img-2-700x450.jpg', ex: 'Since the 1980s, as the complexity of buildings began to increase, the field of' },
  { slug: 'success-story-businessman-in-harlem', title: 'Business meeting 2023 in San Francisco', date: '6 years ago', img: 'https://devanrifan.com/wp-content/uploads/2021/06/blog-img-1-700x450.jpg', ex: 'Through a unique combination of engineering, construction and design disciplines and' },
];

export const rp = (n: number) => 'Rp' + n.toLocaleString('id-ID');
