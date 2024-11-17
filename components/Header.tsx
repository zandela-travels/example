import React from 'react'
import { motion } from 'framer-motion'
import { IoIosGlobe, IoMdSearch, IoMdPerson } from "react-icons/io"
import Head from 'next/head'


const Header = () => {
  const [active, setActive] = React.useState(0);

  return (
    <div className='absolute mt-5 flex w-full flex-wrap items-center justify-between gap-2 px-5 text-xs font-medium uppercase opacity-90 md:px-10 text-white-500'>
      <div className='flex items-center gap-2 font-medium tracking-[4px]'>
      <img
            alt=""
            src="assets/images/nav logom.png"
            className="h-12 w-auto"
          />
      </div>
      <ul className='flex flex-wrap items-center gap-3 text-[11px] md:gap-10'>
        {menus.map((menu, index) => {
            return(
                <motion.li 
                    layout
                    key={index}
                    className={`${active == index && "border-b-2 border-b-yellow-500 text-yellow-500"} inline-block cursor-pointer border-b-yello-500 transition duration-300 ease-in-out hover:border-b-2 hover:text-white`}
                    >
                        {menu}
                    </motion.li>
            );
        })}
        <div className='flex items-center gap-6'>
            <IoMdSearch className='text-lg' />
            <IoMdPerson className='text-lg' />
        </div>
      </ul>
    </div>
  );
}

export default Header

const menus = [
    "Home",
    "Book a Ride",
    "Privacy Policies",
    "Terms",
];