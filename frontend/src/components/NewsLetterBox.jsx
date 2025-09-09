import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event) =>{
        event.preventDefault();
    }
    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className="text-gray-400 mt-3"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, sequi?</p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-md'>
                <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your email' name="" id="" required />
                <button type='submit' className='bg-black text-white text-sm px-10 py-2 sm:py-4 '>SUBSCRIBE OUR NEWSLETTER</button>
            </form>
        </div>
    )
}

export default NewsLetterBox