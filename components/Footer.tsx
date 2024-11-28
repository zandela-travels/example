'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const Footer = () => {
  const [message, setMessage] = useState('');

  const handleClick = () => {
    alert('Message submitted: ' + message);
    setMessage('');
  }

  return (
    <footer className="w-full bg-footerImg text-white-500 py-10 flex flex-col items-center">
      <div className="w-full lg:w-8/9 flex flex-col lg:flex-row justify-between p-6">
        <div className='flex flex-col m-2 h-full lg:w-1/3'>
          <Image 
            src="/assets/images/nav logom.png"
            height={1000}
            width={1000}
            className='h-[70px] w-[350px] mt-0 mx-0'
            alt='logo'
          />
          <p className='w-full text-center lg:w-3/4 lg:text-left'>
            "We are a leading Company whose determination is to provide the best vehicles
            from all around the country to our valued customers in order to fullfill their needs for a vehicle
            to enjoy their wonderfull getaway with no worries on connecting with a vehicle. We are developing further
            services at the moment to ensure a coverage of all the needs of our customers!"
          </p>
        </div>
        <div className='flex flex-col lg:flex-row w-full lg:w-2/3 mt-8 lg:mt-0 justify-between h-full p-4 mx-0'>
          <div className='flex flex-col items-center lg:items-start lg:w-1/2'>
            <h2 className="text-2xl font-semibold text-[#0ccdf0]">Quick Links</h2>
            <ul className='text-lg text-center lg:text-left'>
              <a className='hover:text-yellow-400' href='/'><li>Home</li></a>
              <a className='hover:text-yellow-400' href='/Goride'><li>Book a Ride</li></a>
              <a className='hover:text-yellow-400' href='/PrivacyPolicy'><li>Privacy Policy</li></a>
              <a className='hover:text-yellow-400' href='/Terms&Conditions'><li>Terms & Conditions</li></a>
            </ul>
          </div>
          <div className='flex flex-col items-center lg:items-start mt-8 lg:mt-0 lg:w-1/2'>
            <h2 className="text-2xl font-semibold text-[#0ccdf0]">
              Any Message for Us!
            </h2>
            <textarea
              placeholder="Your message Here!"
              className="mt-2 px-3 py-2 w-full rounded text-white-500 bg-transparent border border-blue-500"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="mt-2 text-dark-200 px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition duration-300" onClick={handleClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center lg:text-left">© 2024 Zandela Travels. All rights reserved.</p>
    </footer>
  )
}

export default Footer
