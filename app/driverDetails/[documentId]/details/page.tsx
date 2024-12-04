'use client';

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
import Footer from '@/components/Footer';

type DriverDe = {
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
  location: string;
  vehicleModel: string;
  vehicleType: string;
  maxPassengers: string;
  language: string;
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
  const [driver, setDriver] = useState<DriverDe | null>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      const driverData = await getDriverById(documentId as string);
      if (driverData) setDriver(driverData);
    };
    fetchDriver();
  }, [documentId]);

  return (
    <>
      <NavBar />
      <div className="bg-backgroundImg bg-cover bg-no-repeat min-h-screen flex justify-center">
        <div className="container mx-auto p-6">
          {driver && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Driver Details */}
              <div className="bg-white-500 p-6 rounded-[10px] shadow-lg flex flex-col items-center border border-[#0cc0df] h-fit">
                <Image
                  src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${driver.driverImage}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                  alt="Driver"
                  width={200}
                  height={200}
                  className="w-[250px] h-[250px] object-cover rounded-full border border-dark-500"
                />
                <div className="text-lg font-bold text-[#0ccdf0] uppercase mt-2 mb-4">{driver.location}</div>

                <div className="space-y-2 text-m text-gray-600 w-full px-4">
                  <div className="flex justify-between">
                    <p>Driver Name:</p>
                    <p>{driver.name}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Driver Age:</p>
                    <p>{driver.age}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Fluent Languages:</p>
                    <p>{driver.language}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Vehicle Model:</p>
                    <p>{driver.vehicleModel}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Vehicle Type:</p>
                    <p>{driver.vehicleType}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Air Conditioning:</p>
                    <p>{driver.aircondition}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Passengers:</p>
                    <p>{driver.maxPassengers}</p>
                  </div>
                </div>

                <button
                  className="mt-6 px-6 py-2 bg-[#0cc0df] text-white-500 font-bold rounded hover:bg-[#0bb0cf] transition duration-300"
                  onClick={() => setOpen(true)}
                >
                  Book Now
                </button>
              </div>

              {/* Right Side - Embla Carousel and Description */}
              <div className="col-span-2 space-y-6">
                {/* Embla Carousel */}
                <div className="relative overflow-hidden rounded-[10px] shadow-lg bg-white-500">
                  <div ref={emblaRef} className="embla">
                    <div className="embla__container flex">
                      {[driver.vehicleImage1, driver.vehicleImage2, driver.vehicleImage3, driver.vehicleImage4].map(
                        (image, index) => (
                          <div key={index} className="embla__slide min-w-full h-[400px]">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${image}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                              alt={`Vehicle ${index + 1}`}
                              layout="fill"
                              objectFit="cover"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Vehicle Description */}
                <div className="bg-white-500 p-6 rounded-[10px] shadow-lg border border-[#0cc0df]">
                  <h2 className="text-2xl font-bold text-[#0ccdf0] mb-4">Vehicle Description</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    This vehicle is a {driver.vehicleType} model offering a comfortable experience for up to{' '}
                    {driver.maxPassengers} passengers. With {driver.aircondition === 'Yes' ? 'air conditioning' : 'no air conditioning'} and a
                    spacious interior, it is perfect for both city and long-distance trips. Contact {driver.name} for
                    more details.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">Price:</p>
                    <p className="text-lg font-bold text-[#0cc0df]">${driver.price} / day</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {/* Booking Dialog */}
      {driver && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-footerImg text-white-500 shad-dialog h-[80%] sm:max-w-md overflow-hidden overflow-y-scroll remove-scrollbar">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#0cc0df]">Booking Details</DialogTitle>
            </DialogHeader>
            <Bookings
              userId={driver.userId}
              documentId={documentId as string}
              vehicleId={driver.vehicleRegNumber}
              price={driver.price}
              driverName={driver.name}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Page;
