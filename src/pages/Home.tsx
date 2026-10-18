import { Hero, LogoMarquee, News, Process, Services, StorePreview, Testimonials, VisionBlock, Works } from '../components/sections';

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoMarquee />
      <Services />
      <Process />
      <VisionBlock />
      <Works limit={6} />
      <StorePreview />
      <Testimonials />
      <News />
    </main>
  );
}
