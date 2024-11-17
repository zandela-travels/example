'use client';

import NavBar from '@/components/NavBar/page';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getDriver } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Towns } from '@/constants';

type DriverDe = {
  userId: string;
  documentId: string;
  name: string;
  phone: string;
  vehicleRegNumber: string;
  status: string;
  price: string;
  imgId: string;
  location: string;
};

const Page = () => {
  const [drivers, setDrivers] = useState<DriverDe[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<DriverDe[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDrivers = async () => {
      const driverData = await getDriver();

      const mappedDrivers = driverData.map((driver: any) => ({
        documentId: driver.$id,
        userId: driver.userId,
        name: driver.name,
        phone: driver.phone,
        vehicleRegNumber: driver.vehicleRegNumber,
        status: driver.status,
        imgId: driver.vehicleImage4,
        price: driver.price,
        location: driver.location,
      }));

      setDrivers(mappedDrivers);
      setFilteredDrivers(mappedDrivers);
    };

    fetchDrivers();
  }, []);

  const handleFilter = () => {
    const filtered = drivers.filter(
      (driver) => driver.location === selectedLocation
    );
    setFilteredDrivers(filtered);
    setIsFilterDialogOpen(false);
  };

  const handleEdit = (documentId: string) => {
    router.push(`driverDetails/${documentId}/details`);
  };

  return (
    <>
      <NavBar />
      <div className="bg-navbackImg bg-cover bg-no-repeat w-screen flex flex-col items-center">
        {/* Header Section */}
        <section className="w-screen h-96 flex flex-col items-center justify-center text-white-500 relative">
          <Image
            src="/assets/images/parkImg.png"
            layout="fill"
            objectFit="cover"
            alt="showroom background"
            className="opacity-70"
          />
          <div className="absolute text-center">
            <h1 className="text-6xl font-bold">Cars</h1>
            <p className="text-xl">Home / Cars</p>
          </div>
        </section>

        {/* Filter Dialog */}
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Vehicles</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <label htmlFor="location" className="block text-sm font-medium">
                Closest Town
              </label>
              <select
                id="location"
                className="mt-2 w-full p-2 border rounded"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Select a town</option>
                {Towns.map((town) => (
                  <option key={town} value={town}>
                    {town}
                  </option>
                ))}
              </select>
              <button
                className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
                onClick={handleFilter}
              >
                Apply Filter
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Car Listing Section */}
        <section className="w-11/12 lg:w-3/4 my-10 flex flex-col">
          <button
            className="mb-4 px-4 py-2 bg-gray-800 text-white rounded lg:hidden"
            onClick={() => setIsFilterDialogOpen(true)}
          >
            Open Filters
          </button>

          <div className="h-[500px] overflow-y-scroll p-4 rounded-lg bg-transparent shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver) => (
                <div
                  key={driver.userId}
                  className="bg-white rounded-lg shadow-lg p-4 text-center"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${driver.imgId}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`}
                    width={200}
                    height={100}
                    alt={driver.name}
                    className="mx-auto"
                  />
                  <h3 className="mt-4 text-lg font-semibold">{driver.name}</h3>
                  <p className="text-sm text-gray-500">{driver.phone}</p>
                  <p className="mt-4 font-bold text-lg">{driver.price}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-orange-500 text-white rounded"
                    onClick={() => handleEdit(driver.documentId)}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-sideImg text-white-500 py-10 flex flex-col items-center">
          <div className="w-11/12 lg:w-3/4 flex justify-between">
            <div>
              <h2 className="text-xl font-semibold">Legal Policy</h2>
              <ul>
                <li>Term & Condition</li>
                <li>Privacy Policy</li>
                <li>Legal Notice</li>
                <li>Accessibility</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Quick Links</h2>
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Car Type</li>
                <li>Service</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                Subscribe To The Newsletters
              </h2>
              <input
                type="text"
                placeholder="Email..."
                className="mt-2 px-3 py-2 w-full rounded"
              />
              <button className="mt-2 px-4 py-2 bg-orange-500 rounded-full">
                Subscribe
              </button>
            </div>
          </div>
          <p className="mt-10">© 2024 Novaride. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Page;
