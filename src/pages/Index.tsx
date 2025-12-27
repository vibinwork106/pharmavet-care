import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { SafetyBanner } from '@/components/home/SafetyBanner';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { HowItWorks } from '@/components/home/HowItWorks';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <SafetyBanner />
      <CategorySection />
      <FeaturedProducts />
      <HowItWorks />
    </Layout>
  );
};

export default Index;
