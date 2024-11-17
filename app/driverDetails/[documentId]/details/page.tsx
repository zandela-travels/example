'use client'

import React, { useEffect, useRef, useState } from 'react';
import NavBar from '@/components/NavBar/page';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { getDriverById } from '@/lib/actions/user.actions';
import { useParams } from 'next/navigation';
import Bookings from '@/components/Forms/Bookings';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type DriverDe = {
  $id: string;
  driverImage: string;
  vehicleImage1: string;
  vehicleImage2: string;
  vehicleImage3: string;
  vehicleImage4: string;
  userId: string;
  documentId: string;
  name: string;
  phone: string;
  age: string;
  vehicleRegNumber: string;
  availability: string;
  aircondition: string;
  status: string;
  price: string;
};

const Page = () => {
  const { documentId } = useParams();
  const [open, setOpen] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [driver, setDriver] = useState<DriverDe | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);


  useEffect(() => {
    const fetchDriver = async () => {
      const driverData = await getDriverById(documentId as string);

      if (driverData) {
        console.log(driverData);
        setDriver(driverData);
      } else {
        console.log('not fetched');
      }
    };

    fetchDriver();
  }, [documentId]);

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on('select', () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  const handleEdit = (userId: string, documentId: string, vehicleId: string, price: string) => {
    setSelectedDriverId(userId);
    setSelectedDriver(documentId);
    setSelectedVehicle(vehicleId);
    setPrice(price)
    setOpen(true);
  };

  return (
    <>
      <NavBar />
      <div className="bg-navbackImg bg-cover bg-no-repeat min-h-screen">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className='w-full h-96 flex flex-col items-center justify-center text-white-500 relative mb-2'>
            <Image 
              src="/assets/images/parkImg.png" // replace with your background image path
              layout='fill'
              objectFit='cover'
              alt='showroom background'
              className= 'opacity-80 rounded-[50px]'
            />
            <div className='absolute text-center'>
              <h1 className='text-6xl font-bold'>Cars</h1>
              <p className='text-xl'>Home / Cars</p>
            </div>
          </div>

          {/* Content Section */}
          {driver && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Side - Details */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Image
                  src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${driver.driverImage}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                  alt="Car 1"
                  width={1000}
                  height={1000}
                  className="w-[200px] h-[200px] object-cover rounded-full"
                />
                <div className="text-lg font-semibold mb-4">${driver.price} / Per Day</div>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li>Doors: {driver.vehicleRegNumber}</li>
                  <li>Passengers: 2</li>
                  <li>Availability: {driver.availability}</li>
                  <li>Age: {driver.age} Years</li>
                  <li>Luggage: 2 Bags</li>
                  <li>Air Condition: {driver.aircondition}</li>
                </ul>
                <div className="mt-6 flex justify-between items-center">
                  <button className="px-4 py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600" onClick={() => handleEdit(driver.userId, documentId as string, driver.vehicleRegNumber, driver.price)}>
                    Book Now
                  </button> 
                </div>
              </div>

              {/* Right Side - Embla Carousel */}
              <div className="relative h-[420px] overflow-hidden overflow-y-scroll remove-scrollbar">
                <div className="bg-white rounded-[30px] shadow-lg overflow-hidden h-full">
                  <div ref={emblaRef} className="embla">
                    <div className="embla__container flex">
                      <div className="embla__slide min-w-full h-[420px]">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${driver.vehicleImage1}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                          alt="Car 1"
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="embla__slide min-w-full h-[420px]">
                      <Image
                          src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${driver.vehicleImage2}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                          alt="Car 1"
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="embla__slide min-w-full h-[420px]">
                      <Image
                          src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${driver.vehicleImage3}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                          alt="Car 1"
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="embla__slide min-w-full h-[420px]">
                      <Image
                          src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${driver.vehicleImage4}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                          alt="Car 1"
                          layout="fill"
                          objectFit="cover"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${index === selectedIndex ? 'bg-yellow-500' : 'bg-white-500'}`}
                      onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedDriverId && selectedDriver && selectedVehicle && price && (
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-sideImg text-white-500 shad-dialog h-[80%] w-[140%] sm:max-w-md overflow-hidden overflow-y-scroll remove-scrollbar">
              <DialogHeader className="mb-4 space-y-3">
                <DialogTitle className="capitalize text-2xl font-bold">Customer Information</DialogTitle>
              </DialogHeader>
              <Bookings userId={selectedDriverId} documentId={selectedDriver} setOpen={setOpen} vehicleId={selectedVehicle} price={price}/>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default Page;
