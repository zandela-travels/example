import React from 'react'
import { motion } from 'framer-motion'
import { IoMdBookmark } from 'react-icons/io'
import { Data, CurrentSlideData } from '@/app/page'
import OtherInfo from './OtherInfo'


type Props = {
    transitionData: Data;
    currentSlideData: CurrentSlideData;
}


const SlideInfo = ({ transitionData, currentSlideData }: Props) => {
  return (
    <>
      <motion.span layout className='mb-2 h-1 w-5 rounded-full bg-white' />
        <OtherInfo 
            data={transitionData ? transitionData : currentSlideData.data}
        />
      <motion.div layout className='mt-5 flex items-center gap-3'>
        <button 
            className='flex h-[41px] w-[41px] items-center justify-center rounded-full text-white-500 bg-yellow-500 text-xs transition duration-300 ease-in-out hover:opacity-80'
            >
                <IoMdBookmark className='text-xl' />
            </button>
            <button 
                className='w-fit rounded-full border-[1px] border-[#ffffff8f] px-6 py-3 text-[10px] font-thin transition text-white-500 duration-300 ease-in-out hover:bg-white-500 hover:text-black'
            >
                DISCOVER LOCATION
            </button>
      </motion.div>      
    </>
  )
}

export default SlideInfo
