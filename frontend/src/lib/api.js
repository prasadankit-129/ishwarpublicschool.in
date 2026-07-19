import axios from "axios";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
export const API = `${BACKEND_URL}/api`;

// httpOnly cookies are attached by the browser when withCredentials is true.
// We never store the JWT in JS-accessible storage (XSS-safe).
export const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const SCHOOL = {
  name: "Ishwar Public School",
  tagline: "Nurturing Minds. Building Futures.",
  established: 2002,
  phone: "+91 94241 97068",
  phoneRaw: "+919424197068",
  whatsapp: "https://wa.me/919424197068",
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
