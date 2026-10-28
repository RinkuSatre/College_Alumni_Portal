import "./Home.css";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Features from "../../components/Features";
import Statistics from "../../components/Statistics";
import Gallery from "../../components/Gallery";
import SuccessStories from "../../components/SuccessStories";
import LatestJobs from "../../components/LatestJobs";
import UpcomingEvents from "../../components/UpcomingEvents";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Statistics />
      <Gallery />
      <SuccessStories />
      <LatestJobs />
      <UpcomingEvents />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;