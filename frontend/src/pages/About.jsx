import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20">
      {/* --- About Us Section --- */}
      <div className="text-3xl font-semibold text-center pt-10 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-12 flex flex-col md:flex-row items-center gap-12">
        <img 
          src={assets.about_img} 
          alt="About our company" 
          className="w-full md:max-w-[450px] rounded-2xl shadow-md" 
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 leading-relaxed">
          <p>
            At <span className="font-semibold text-gray-900">Forever</span>, we are passionate about making fresh, 
            high-quality groceries accessible to everyone. Our platform connects 
            local farmers and trusted suppliers directly with you, ensuring 
            healthy and affordable food choices.
          </p>

          <p>
            We believe in simplifying your shopping experience with transparency, 
            convenience, and trust at the heart of everything we do.
          </p>

          <b className="text-gray-900 text-lg">Our Mission</b>
          <p>
            To empower communities with reliable, sustainable, and hassle-free 
            grocery solutions—bringing the farm closer to your table while 
            supporting local growers.
          </p>
        </div>
      </div>

      {/* --- Why Choose Us Section --- */}
      <div className="text-3xl font-semibold py-8 text-center">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row text-base mb-20 gap-6">
        <div className="border rounded-2xl px-10 md:px-16 py-10 shadow-sm hover:shadow-lg transition duration-300 flex flex-col gap-5">
          <b>✅ Quality Assurance</b>
          <p className="text-gray-600">
            We carefully source every product to guarantee freshness, authenticity, 
            and nutritional value—so you can trust what’s on your plate.
          </p>
        </div>

        <div className="border rounded-2xl px-10 md:px-16 py-10 shadow-sm hover:shadow-lg transition duration-300 flex flex-col gap-5">
          <b>⚡ Convenience</b>
          <p className="text-gray-600">
            Shop anytime, anywhere with our seamless online platform. 
            Get your essentials delivered to your doorstep without the hassle.
          </p>
        </div>

        <div className="border rounded-2xl px-10 md:px-16 py-10 shadow-sm hover:shadow-lg transition duration-300 flex flex-col gap-5">
          <b>💚 Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our dedicated team is here to assist you at every step, ensuring 
            a smooth, reliable, and friendly shopping experience.
          </p>
        </div>
      </div>

      {/* --- Newsletter Section --- */}
      <NewsLetterBox />
    </div>
  )
}

export default About
