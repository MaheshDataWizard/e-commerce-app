import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm md:text-base text-gray-700'>
            
            {/* Easy Returns */}
            <div>
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Easy Returns" />
                <p className='font-semibold text-lg'>Hassle-Free Returns</p>
                <p className="text-gray-400">Return or exchange any product within 7 days, no questions asked.</p>
            </div>

            {/* Quality Assurance */}
            <div>
                <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Quality Assurance" />
                <p className='font-semibold text-lg'>Premium Quality</p>
                <p className="text-gray-400">All our clothing is made from high-quality materials, ensuring durability and comfort.</p>
            </div>

            {/* Customer Support */}
            <div>
                <img src={assets.support_img} className='w-12 m-auto mb-5' alt="Customer Support" />
                <p className='font-semibold text-lg'>24/7 Support</p>
                <p className="text-gray-400">Our friendly support team is available around the clock to assist you with your orders.</p>
            </div>

        </div>
    )
}

export default OurPolicy
