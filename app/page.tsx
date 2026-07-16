import HeroSection from "@/components/Home/HeroSection";
import ProblemSection from "@/components/Home/Problemsection";
import SolutionSection from "@/components/Home/Solutionsection";
// import CustomerJourney from "@/components/Home/Customerjourney";
import FeaturesSection from "@/components/Home/Featuressection ";
import BenefitsSection from "@/components/Home/Benefitssection";
import BeforeAfterSection from "@/components/Home/Beforeaftersection";
import HowWeWorkSection from "@/components/Home/Howweworksection";
import StatisticsSection from "@/components/Home/Statisticssection";
import FAQSection from "@/components/Home/Faqsection";
import FinalCTASection from "@/components/Home/Finalctasection";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <BeforeAfterSection />
      <BenefitsSection />
      {/* <CustomerJourney /> */}
      <HowWeWorkSection />
      <StatisticsSection />
      <FAQSection />
      <FinalCTASection />
    </main>

  );
}