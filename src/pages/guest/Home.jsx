import HeroSection from '@/components/guest/HeroSection';
import FiturUtama from '@/components/guest/MainFeature';
import Statistik from '@/components/guest/Statistic';
import WBSMobile from '@/components/guest/WBSMobile';
import Button from '@/components/common/Button';

export default function Home() {
  console.log("Home component rendered");
  return (
    <div>
      <HeroSection />
      <FiturUtama />
      <Statistik />
      <WBSMobile />
    </div>
  );
}