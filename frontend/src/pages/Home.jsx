import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";

const Home = () => {
  return (
    <div className="bg-gray-50">
      <section className="w-full">
        <Hero />
      </section>

      <section className="w-full py-16 px-4 md:px-8">
        <LatestCollection />
      </section>

      <section className="w-full py-16 px-4 md:px-8 bg-gray-100">
        <BestSeller />
      </section>

      <section className="w-full py-16 px-4 md:px-8">
        <OurPolicy />
      </section>

      <section className="w-full py-16 px-4 md:px-8">
        <NewsLetterBox />
      </section>
    </div>
  );
};

export default Home;
