import HeroSection from '@/components/guest/HeroSection';
import FiturUtama from '@/components/guest/MainFeature';
import Statistik from '@/components/guest/Statistic';
import WBSMobile from '@/components/guest/WBSMobile';
import Workflow from '@/components/guest/Workflow';

export default function Home() {
  console.log("Home component rendered");
  return (
    <div>
      <HeroSection />
      <FiturUtama />
      <Statistik />
      <Workflow />
      <WBSMobile />
    </div>
  );
}