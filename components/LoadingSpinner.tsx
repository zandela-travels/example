// components/LoadingSpinner.js
import React from 'react';
import { PropagateLoader } from 'react-spinners'
import { Righteous } from 'next/font/google'


const inter = Righteous({
  subsets: ["latin"],
  weight: ["400"]
});

const LoadingSpinner = () => {
  return (
    <div className={`${inter.className} bg-backgroundImg bg-cover bg-no-repeat flex flex-col items-center justify-center h-screen opacity-60`}>
      <PropagateLoader color='gold' size={20}/>
    </div>
  );
};

export default LoadingSpinner;
