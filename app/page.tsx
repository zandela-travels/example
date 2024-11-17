'use client'

import NavBar from '@/components/NavBar/page'
import { Righteous } from 'next/font/google'
import { AnimatePresence } from "framer-motion"
import Header from '@/components/Header'
import BackgroundImage from '@/components/BackgroundImage'
import Slides from '@/components/Slides'
import SlideInfo from '@/components/SlideInfo'
import Controls from '@/components/Controls'
import React from 'react'
import 'tailwindcss/tailwind.css';



const inter = Righteous({
  subsets: ["latin"],
  weight: ["400"]
});

export type Data = {
  id: number;
  img: string;
  title: string;
  description: string;
  location: string;
};

export type CurrentSlideData = {
  data: Data;
  index: number;
};


export default function Home() {
  const [data, setData] = React.useState<Data[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = React.useState<Data>(
    sliderData[0]
  );
  const [currentSlideData, setCurrentSlideData] = 
    React.useState<CurrentSlideData>({
      data: initData,
      index: 0,
    });

  return (
    /*<div className="bg-bannerImg bg-no-repeat bg-cover bg-center w-full h-screen overflow-y-hidden">
      <header className="bg-dark-500 absolute inset-x-0 top-0 z-50">
        <NavBar />
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-light-200 sm:text-7xl">
              Explore Sri Lanka!
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-dark-200 sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>*/
    <main className={`${inter.className} relative min-h-screen select-none overflow-hidden text-white antialiased`}>
      <AnimatePresence>
        <BackgroundImage 
          transitionData={transitionData}
          currentSlideData={currentSlideData}
        />
        <div className='absolute z-20 h-full w-full' >
          {/*<Header />*/}
          <NavBar />
          <div className='flex h-full w-full grid-cols-10 flex-col md:grid'>
            <div className='col-span-4 mb-3 flex h-full flex-1 flex-col justify-end px-5 md:mb-0 md:justify-center md:px-10'>
              <SlideInfo 
                transitionData={transitionData}
                currentSlideData={currentSlideData}
              />  
            </div>
            <div className='col-span-6 flex h-full flex-1 flex-col justify-start p-4 md:justify-center md:p-10'>
              <Slides data={data} />
              <Controls 
                currentSlideData={currentSlideData}
                data={data}
                transitionData={transitionData}
                initData={initData}
                handleData={setData}
                handleTransitionData={setTransitionData}
                handleCurrentSlideData={setCurrentSlideData}
                sliderData={sliderData}
              />  
            </div>
          </div>
        </div>
      </AnimatePresence>
    </main>
  )
}

const sliderData = [
  { 
    id: 1,
    img: "/assets/images/bg img.png",
    location: "Sirgiriya",
    description: "hello baby",
    title: "Sigiriya"
  },
  {
    id: 2,
    img: "/assets/images/slimg1r.jpeg",
    location: "gampaha",
    description: "kakki baby",
    title: "Helloo"
  },
  {
    id: 3,
    img: "/assets/images/slimg2r.jpg",
    location: "nittambuwa",
    description: "bubulu baby",
    title: "bulu bulu"
  },
  {
    id: 4,
    img: "/assets/images/slimg3r.jpg",
    location: "Thalpe",
    description: "thalpe beach",
    title: "Thalpe"
  },
  {
    id: 5,
    img: "/assets/images/slimg4r.jpg",
    location: "kandy",
    description: "Kandy",
    title: "Kandyy"
  },
];

const initData = sliderData[0];
