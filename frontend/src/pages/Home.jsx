import Hero from "./home/Hero";
import BranchesSection from "./home/BranchesSection";
import FeaturesSection from "./home/FeaturesSection";
import AchievementsSection from "./home/AchievementsSection";
import GalleryPreview from "./home/GalleryPreview";
import EventsPreview from "./home/EventsPreview";
import TestimonialsSection from "./home/TestimonialsSection";
import CtaSection from "./home/CtaSection";
import { achievements, events, gallery, testimonials } from "@/data/siteData";

export default function Home() {
  return (
    <div data-testid="home-page">
      <Hero />
      <BranchesSection />
      <FeaturesSection />
      <AchievementsSection items={achievements.slice(0, 4)} />
      <GalleryPreview items={gallery.slice(0, 6)} />
      <EventsPreview items={events.slice(0, 3)} />
      <TestimonialsSection items={testimonials.slice(0, 3)} />
      <CtaSection />
    </div>
  );
}
