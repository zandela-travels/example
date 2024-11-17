import React from 'react'
import { motion } from 'framer-motion' 
import { CurrentSlideData, Data } from '@/app/page'


type Props = {
    transitionData: Data;
    currentSlideData: CurrentSlideData;
};

const BackgroundImage = ({ transitionData, currentSlideData }: Props) => {
  return (
    <>
      {transitionData && (
        <motion.img 
            key={`transition-${transitionData.id}`}
            layoutId={`img-${transitionData.img}`}
            alt='Transition image'
            transition={{
                opacity: {ease: "linear"},
                layout: {duration: 0.6},
            }}
            className='absolute left-0 top-0 z-10 h-full w-full object-cover brightness-80'
            src={transitionData.img}
        />    
      )}
      <motion.img 
        alt='Current Image'
        key={`current-${currentSlideData.data.id}`}
        layoutId={`img-${currentSlideData.data.img}`}
        src={currentSlideData.data.img}
        className='absolute left-0 top-0 h-full w-full object-cover brightness-50'
      />  
    </>
  )
}

export default BackgroundImage
