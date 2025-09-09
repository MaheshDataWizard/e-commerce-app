import React from "react";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className="my-10 md:my-14 flex flex-col md:flex-row justify-center items-center md:items-start gap-10 px-4 md:px-0">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px] rounded-md"
          alt="Contact"
        />
        <div className="flex flex-col justify-center gap-6 text-center md:text-left">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            414604 Delhi, Mumbai <br /> India
          </p>
          <p className="text-gray-500">
            Tel: (415) 666 666 <br />
            mahesh@example.com
          </p>

          <p className="font-semibold text-xl text-gray-600 mt-4">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <a
            href="#"
            className="inline-block border border-black px-6 py-3 text-sm font-medium rounded-md hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
          >
            Explore Jobs
          </a>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Contact;
