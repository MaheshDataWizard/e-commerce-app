import React from 'react'
import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 bottom-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} className='w-full md:max-w-[480px] rounded-md' alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl to-gray-600'>Our Store</p>
          <p className='text-gray-500'>414604 delhi Mubai <br />Indiam Namagf</p>
          <p className='text-gray-500'>Tel: (415) 666 666 <br />mahes@example.om</p>
          <p className="font-semibold text-xl text-gray-600">Careeers at forever</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <b className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 ">Explore Jobs</b>

        </div>

      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact