import { SearchParamProps } from '@/types';
import React from 'react';

const page = async ({ params: { documentId }, searchParams }: SearchParamProps) => {
  const bookingId = (await searchParams?.bookingId) || 'No Booking ID';

  return (
    <div>
      <h1>Document ID: {documentId}</h1>
      <p>Booking ID: {bookingId}</p>
    </div>
  );
};

export default page;
