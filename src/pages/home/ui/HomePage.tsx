import { Categories } from '@/widgets/categories';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Hero } from '@/widgets/hero';
import { Popular } from '@/widgets/popular';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-ink-950 text-text-primary">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Popular />
      </main>
      <Footer />
    </div>
  );
};
