// Field definitions for the admin CRUD forms.
// Extracted as constants so referential equality is preserved across renders.

export const NEWS_FIELDS = [
  { key: "title", label: "Title" },
  { key: "content", label: "Content", type: "textarea" },
  { key: "category", label: "Category" },
];

export const EVENT_FIELDS = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "event_date", label: "Event Date", type: "date" },
  { key: "location", label: "Location" },
];

export const GALLERY_FIELDS = [
  { key: "title", label: "Title" },
  { key: "image_url", label: "Image URL" },
  { key: "category", label: "Category" },
];

export const TESTIMONIAL_FIELDS = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "content", label: "Content", type: "textarea" },
  { key: "rating", label: "Rating (1-5)", type: "number" },
];

export const ACHIEVEMENT_FIELDS = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "year", label: "Year" },
  { key: "category", label: "Category" },
];

export const TABS = [
  { key: "overview", label: "Overview" },
  { key: "admissions", label: "Admissions" },
  { key: "news", label: "News" },
  { key: "events", label: "Events" },
  { key: "gallery", label: "Gallery" },
  { key: "testimonials", label: "Testimonials" },
  { key: "achievements", label: "Achievements" },
];
