import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import PublicLayout from "@/layouts/PublicLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Academics from "@/pages/Academics";
import Faculty from "@/pages/Faculty";
import Gallery from "@/pages/Gallery";
import News from "@/pages/News";
import Events from "@/pages/Events";
import Achievements from "@/pages/Achievements";
import Admissions from "@/pages/Admissions";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

const appBasename = process.env.REACT_APP_BASENAME || "";

function App() {
  return (
    <div className="App font-body">
      <AuthProvider>
        <BrowserRouter basename={appBasename}>
          <Toaster position="top-right" richColors />
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/news" element={<News />} />
              <Route path="/events" element={<Events />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
