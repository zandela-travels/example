import React from 'react'
import { easeInOut, motion } from 'framer-motion'

type Props = {
    curIndex: number;
    length: number;
}

const Progress = ({curIndex, length}: Props) => {
  return (
    <>
      <div className='flex h-[1px[ flex-1 items-center rounded-full bg-white bg-opacity-50'>
        <div 
            style={{
                width: (((curIndex + 1) / length) * 100).toString() + "%",
            }}
            className={`h-[2px] rounded-full bg-white-500 bg-opacity-50`}
            ></div>
      </div>
      <span 
        key={curIndex}
        style={{
            overflow: "hidden",
            display: "inline-block",
        }}
      >
        <motion.div
            initial={{
                opacity: 0, 
            }}
            animate={{
                opacity: 1,
            }}
            key={curIndex}
            transition={{
                duration: 0.6,
                ease: easeInOut,
            }}
            className='flex items-center text-4xl font-medium text-white-500'
        >
            0{curIndex + 1}
        </motion.div>    
      </span>  
    </>
  )
}

export default Progress
