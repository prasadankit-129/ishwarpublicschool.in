const publicUrl = process.env.REACT_APP_BASENAME || "";
const asset = (path) => `${publicUrl}${path}`;

export const ASSETS = {
  hero: asset("/assets/images/image1.jpg"),
  classroom: asset("/assets/images/image2.jpg"),
  sports: asset("/assets/images/image3.jpg"),
  academics: asset("/assets/images/image4.jpg"),
  faculty: asset("/assets/images/image5.jpg"),
  admissions: asset("/assets/images/image6.jpg"),
  celebration: asset("/assets/images/image7.jpg"),
  building: asset("/assets/images/image8.jpg"),
  students: asset("/assets/images/image9.jpg"),
  library: asset("/assets/images/image1.jpg"),
  scienceLab: asset("/assets/images/image2.jpg"),
  annualFunction: asset("/assets/images/image3.jpg"),
};

export const SCHOOL = {
  name: "Ishwar Public School",
  tagline: "Nurturing Minds. Building Futures.",
  established: 2002,
  email: "admin@ishwarpublicschool.com",
  enquiryEmail: "admin@ishwarpublicschool.com",
  phone: "+91 9424197068",
  phoneRaw: "+919424197068",
  whatsapp: "https://wa.me/+919424197068",
  mapUrl: "https://maps.app.goo.gl/eaGtbmW9fF72WxVv6",
  facebook: "https://www.facebook.com/p/Ishwar-Public-HrSec-School-Birgaon-100076074786887/",
  instagram: "https://www.instagram.com/p/DVu0YCJCOIh/",
  branches: [
    {
      key: "birgaon",
      name: "Birgaon Campus",
      subtitle: "Main Branch",
      established: 2002,
      classes: "Class 1 to 12",
      address: "Vishal Colony, Urla Road, Birgaon, Sadar Bazar, Raipur, Chhattisgarh 492001",
      pin: "492001",
      headTeacher: "Anju Bala",
      teachers: 25,
      classrooms: 15,
      medium: "English",
      board: "State Board (CG)",
    },
    {
      key: "dhaneli",
      name: "Dhaneli Campus",
      subtitle: "Local Branch",
      established: 2013,
      classes: "Class 1 to 8",
      address: "Dhaneli, Dharshiwa Block, Raipur, Chhattisgarh 492116",
      pin: "492116",
      headTeacher: "Tejaswi Dewangan",
      teachers: 9,
      classrooms: 8,
      medium: "English",
      board: "State Board (CG)",
    },
  ],
};

const withId = (prefix, items) =>
  items.map((item, index) => ({ id: `${prefix}-${index + 1}`, ...item }));

export const news = withId("news", [
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

export const testimonials = withId("testimonial", [
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

export const events = withId("event", [
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

export const achievements = withId("achievement", [
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

export const gallery = withId("gallery", [
  { title: "Modern Classrooms", image_url: ASSETS.classroom, category: "classroom" },
  { title: "Playground Activities", image_url: ASSETS.sports, category: "sports" },
  { title: "Cultural Celebration", image_url: ASSETS.celebration, category: "events" },
  { title: "School Building", image_url: ASSETS.building, category: "campus" },
  { title: "Students in Uniform", image_url: ASSETS.students, category: "students" },
  { title: "Library Session", image_url: ASSETS.library, category: "library" },
  { title: "Science Lab", image_url: ASSETS.scienceLab, category: "lab" },
  { title: "Annual Function", image_url: ASSETS.annualFunction, category: "events" },
]);
