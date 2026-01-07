import Hero from "../components/landing/Hero";
import Navbar from "../components/layout/Navbar";
import Features from "../components/landing/Features";
import Testimonials from "../components/landing/Testimonials";
import Footer from "../components/landing/Footer";
const LandingPage = () => {
  return (
    <div className="mb-[100vh]">
      <Navbar/>
      <Hero />
      <Features/>
      <Testimonials/>
      <Footer/>
     
      {/* other sections */}
    </div>
  );
};

export default LandingPage;
