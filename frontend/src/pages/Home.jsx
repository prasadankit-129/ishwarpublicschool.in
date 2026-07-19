import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import Hero from "./home/Hero";
import BranchesSection from "./home/BranchesSection";
import FeaturesSection from "./home/FeaturesSection";
import AchievementsSection from "./home/AchievementsSection";
import GalleryPreview from "./home/GalleryPreview";
import EventsPreview from "./home/EventsPreview";
import TestimonialsSection from "./home/TestimonialsSection";
import CtaSection from "./home/CtaSection";

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [achievements, setAchievements] = useState([]);

  const loadAll = useCallback(async () => {
    const [t, e, g, a] = await Promise.all([
      api.get("/testimonials").catch(() => ({ data: [] })),
      api.get("/events").catch(() => ({ data: [] })),
      api.get("/gallery").catch(() => ({ data: [] })),
      api.get("/achievements").catch(() => ({ data: [] })),
    ]);
    setTestimonials(t.data.slice(0, 3));
    setEvents(e.data.slice(0, 3));
    setGallery(g.data.slice(0, 6));
    setAchievements(a.data.slice(0, 4));
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div data-testid="home-page">
      <Hero />
      <BranchesSection />
      <FeaturesSection />
      <AchievementsSection items={achievements} />
      <GalleryPreview items={gallery} />
      <EventsPreview items={events} />
      <TestimonialsSection items={testimonials} />
      <CtaSection />
    </div>
  );
}
