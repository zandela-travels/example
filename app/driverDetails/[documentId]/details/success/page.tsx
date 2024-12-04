'use client';

import { SearchParamProps } from '@/types';
import React, { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { getBookingsById } from '@/lib/actions/bookings.actions';
import Link from 'next/link';

type BookingDetails = {
  $id: string;
  documentId: string;
  customerName: string;
  customerPhone: string;
};

const Page = ({ params, searchParams }: { params: Promise<{ documentId: string }>; searchParams: Promise<{ bookingId?: string }> }) => {
  // Unwrap `params` and `searchParams` using `React.use()`
  const { documentId } = use(params);
  const { bookingId } = use(searchParams);

  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const bookingData = await getBookingsById(bookingId as string);

        if (bookingData) {
          setBookingDetails(bookingData);
        } else {
          console.log('Booking data not fetched');
        }
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    fetchDriver();
  }, [bookingId]);

  return (
    <div className="bg-footerImg bg-cover bg-no-repeat min-h-screen flex flex-col items-center text-white-500 p-6 md:p-12 lg:p-24 opacity-90">
      {bookingDetails ? (
          <div className='success-img'>
                <Link href='/'>
                    <Image
                        src="/assets/images/nav logom.png"
                        height={1000}
                        width={1000}
                        alt='logo'
                        className='h-20 w-fit mb-0'
                    />    
                </Link>
    
            <section className='flex flex-col items-center mt-0'>
                <Image
                    src="/assets/gifs/success.gif"
                    height={300}
                    width={200}
                    alt='success'
                />
                <h2 className='header mb-6 max-w-[600px] text-center'>
                    Your <span className='text-green-500'>Booking Details</span> has been successfully submitted!
                </h2>    
                <p>We will be in touch shortly to confirm</p>
            </section>
    
            <p className='copyright'>@2024 CarePulse</p>
         </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
};

export default Page;
