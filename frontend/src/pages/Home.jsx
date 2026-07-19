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
import {
  fallbackAchievements,
  fallbackEvents,
  fallbackGallery,
  fallbackTestimonials,
} from "@/lib/fallbackContent";

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
    setTestimonials((t.data.length ? t.data : fallbackTestimonials).slice(0, 3));
    setEvents((e.data.length ? e.data : fallbackEvents).slice(0, 3));
    setGallery((g.data.length ? g.data : fallbackGallery).slice(0, 6));
    setAchievements((a.data.length ? a.data : fallbackAchievements).slice(0, 4));
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
