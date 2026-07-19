const withId = (prefix, items) =>
  items.map((item, index) => ({ id: `${prefix}-${index + 1}`, ...item }));

export const fallbackNews = withId("news", [
  {
    title: "Admissions Open for 2026-27 Academic Session",
    content:
      "Applications are now open for Nursery to Class XII at Birgaon and Dhaneli campuses. Limited seats available.",
    category: "announcement",
    created_at: "2026-01-10T00:00:00.000Z",
  },
  {
    title: "Annual Sports Day scheduled for March 15",
    content:
      "Parents are cordially invited to join a day of athletics, teamwork, and celebration at Birgaon campus.",
    category: "notice",
    created_at: "2026-01-08T00:00:00.000Z",
  },
  {
    title: "Ishwar Public School celebrates 22 years of excellence",
    content:
      "Since 2002, the school has continued empowering students across Raipur with academics, values, and confidence.",
    category: "news",
    created_at: "2026-01-05T00:00:00.000Z",
  },
]);

export const fallbackTestimonials = withId("testimonial", [
  {
    name: "Priya Sharma",
    role: "Parent",
    content:
      "Ishwar Public School has been a blessing for my daughter. The teachers are dedicated and truly care about each child's growth.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Alumni",
    content:
      "The strong foundation I received at Ishwar Public School helped me grow in confidence and discipline.",
    rating: 5,
  },
  {
    name: "Sunita Yadav",
    role: "Parent",
    content:
      "Both my children study here. The school balances academics, activities, and values beautifully.",
    rating: 5,
  },
]);

export const fallbackEvents = withId("event", [
  {
    title: "Annual Sports Day 2026",
    description:
      "A day of athletics, teamwork, and celebration featuring students from both branches.",
    event_date: "2026-03-15",
    location: "Birgaon Campus",
  },
  {
    title: "Science Exhibition",
    description:
      "Students showcase projects across physics, chemistry, biology, and practical innovation.",
    event_date: "2026-04-10",
    location: "Birgaon Campus",
  },
  {
    title: "Annual Cultural Program",
    description:
      "An evening of music, dance, and drama celebrating Indian heritage and student talent.",
    event_date: "2026-02-20",
    location: "School Auditorium",
  },
]);

export const fallbackAchievements = withId("achievement", [
  {
    title: "100% Pass Rate in Class XII",
    description: "All students cleared their board exams with distinction.",
    year: "2025",
    category: "academic",
  },
  {
    title: "District-Level Kabaddi Champions",
    description: "Our senior boys team won the district championship.",
    year: "2024",
    category: "sports",
  },
  {
    title: "State-Level Science Olympiad Winner",
    description: "A Class X student secured a top rank at state level.",
    year: "2024",
    category: "academic",
  },
  {
    title: "Best School Award - Dharshiwa Block",
    description: "Recognized for holistic education and community impact.",
    year: "2023",
    category: "recognition",
  },
]);

export const fallbackGallery = withId("gallery", [
  {
    title: "Modern Classrooms",
    image_url:
      "https://images.pexels.com/photos/3231359/pexels-photo-3231359.jpeg?auto=compress&cs=tinysrgb&w=940",
    category: "classroom",
  },
  {
    title: "Playground Activities",
    image_url:
      "https://images.pexels.com/photos/8926842/pexels-photo-8926842.jpeg?auto=compress&cs=tinysrgb&w=940",
    category: "sports",
  },
  {
    title: "Cultural Celebration",
    image_url:
      "https://images.pexels.com/photos/35493021/pexels-photo-35493021.jpeg?auto=compress&cs=tinysrgb&w=940",
    category: "events",
  },
  {
    title: "School Building",
    image_url:
      "https://images.pexels.com/photos/20200756/pexels-photo-20200756.jpeg?auto=compress&cs=tinysrgb&w=940",
    category: "campus",
  },
  {
    title: "Students in Uniform",
    image_url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=940&q=80",
    category: "students",
  },
  {
    title: "Library Session",
    image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=940&q=80",
    category: "library",
  },
  {
    title: "Science Lab",
    image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=940&q=80",
    category: "lab",
  },
  {
    title: "Annual Function",
    image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=940&q=80",
    category: "events",
  },
]);
