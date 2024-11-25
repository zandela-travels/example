'use client';
import { IoLocation } from "react-icons/io5";
import NavBar from '@/components/NavBar/page';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getDriver, getShownDriver } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Towns, VehicleTypes } from '@/constants'; // Import VehicleTypes here
import LoadingSpinner from '@/components/LoadingSpinner';
import Footer from '@/components/Footer';

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
  model: string;
  type: string;
  max: string;
  availability: string;
  aircondition: string;
};

const Page = () => {
  const [drivers, setDrivers] = useState<DriverDe[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<DriverDe[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('Any');
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>('Any'); // Add state for vehicle type
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      const driverData = await getShownDriver();
      const mappedDrivers = driverData.map((driver: any) => ({
        documentId: driver.$id,
        userId: driver.userId,
        name: driver.name,
        phone: driver.phone,
        vehicleRegNumber: driver.vehicleRegNumber,
        status: driver.status,
        imgId: driver.vehicleImage1,
        price: driver.price,
        location: driver.location,
        model: driver.vehicleModel,
        type:driver.vehicleType,
        max: driver.maxPassengers,
        availability: driver.availability,
        aircondition: driver.aircondition,
      }));
      setDrivers(mappedDrivers);
      setFilteredDrivers(mappedDrivers);
      setLoading(false);
    };
    fetchDrivers();
  }, []);

  const handleFilter = () => {
    setLoading(true);
    let filtered = drivers;
    if (selectedLocation !== 'Any') {
      filtered = filtered.filter((driver) => driver.location === selectedLocation);
    }
    if (selectedVehicleType !== 'Any') {
      filtered = filtered.filter((driver) => driver.type === selectedVehicleType);
    }
    setFilteredDrivers(filtered);
    setIsFilterDialogOpen(false);
    setLoading(false);
  };

  const handleEdit = (documentId: string) => {
    setLoading(true);
    router.push(`driverDetails/${documentId}/details`);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <NavBar />
      <div className="bg-backgroundImg bg-cover bg-no-repeat w-screen flex flex-col items-center">
        {/* Header Section 
        <section className="w-screen h-80 flex flex-col items-center justify-center text-white-500 relative">
          <Image src="/assets/images/parkImg.png" layout="fill" objectFit="cover" alt="showroom background" className="opacity-70" />
          <div className="absolute text-center">
            <h1 className="text-5xl font-bold">Cars</h1>
            <p className="text-lg">Home / Cars</p>
          </div>
        </section>*/}

        {/* Filter Dialog */}
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogContent className='text-white-500'>
            <DialogHeader>
              <DialogTitle>Filter Vehicles</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <label htmlFor="location" className="block text-sm font-medium">Closest Town</label>
              <select id="location" className="mt-2 w-full p-2 border rounded text-dark-200" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="Any">Any</option>
                {Towns.map((town) => (
                  <option key={town} value={town}>{town}</option>
                ))}
              </select>
              <label htmlFor="vehicleType" className="block text-sm font-medium mt-4">Vehicle Type</label>
              <select id="vehicleType" className="mt-2 w-full p-2 border rounded text-dark-200" value={selectedVehicleType} onChange={(e) => setSelectedVehicleType(e.target.value)}>
                <option value="Any">Any</option>
                {VehicleTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button className="mt-4 px-4 py-2 bg-orange-500 text-white-500 rounded hover:bg-orange-600 transition duration-300" onClick={handleFilter}>Apply Filter</button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Car Listing Section */}
        <section className="w-11/12 lg:w-4/5 my-10 flex flex-col lg:flex-row">
          {/* Filter Section for Larger Screens */}
          <div className="border-blue hidden lg:block lg:w-1/4 bg-white-500 p-5 rounded-[10px] shadow-lg h-fit">
          <h1 className="text-2xl text-[#0cc0df] font-semibold mb-4">Filters</h1>
            <h2 className="text-lg font-semibold mb-4">Filter by Location</h2>
            <select id="location" className="mt-2 w-full p-2 border rounded" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              <option value="Any">Any</option>
              {Towns.map((town) => (
                <option key={town} value={town}>{town}</option>
              ))}
            </select>
            <h2 className="text-lg font-semibold mb-4 mt-4">Filter by Vehicle Type</h2>
            <select id="vehicleType" className="mt-2 w-full p-2 border rounded" value={selectedVehicleType} onChange={(e) => setSelectedVehicleType(e.target.value)}>
              <option value="Any">Any</option>
              {VehicleTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button className="mt-4 px-4 py-2 blue-btn rounded transition duration-300" onClick={handleFilter}>Apply Filter</button>
          </div>

          {/* Filter Button for Smaller Screens */}
          <button className="mb-4 px-4 py-2 bg-gray-800 text-white-500 rounded lg:hidden hover:bg-gray-900 transition duration-300" onClick={() => setIsFilterDialogOpen(true)}>Open Filters</button>

          <div className="bg-transparent backdrop-blur-[3px] remove-scrollbar scroll-smooth h-[700px] overflow-y-scroll px-2 rounded-lg bg-transparent lg:w-4/5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg">
              {filteredDrivers.map((driver) => (
                <div key={driver.userId} className="border-blue bg-white-500 rounded-[10px] shadow-lg p-4 text-center hover:shadow-xl transition duration-300">
                  <Image src={`${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${driver.imgId}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`} width={200} height={100} alt={driver.name} className="m-0 w-full rounded" />
                  <h3 className="uppercase mt-4 mb-4 text-2xl text-left font-semibold">{driver.model}</h3>
                  <div className='mt-2.5 flex justify-between text-[17px] text-left text-gray-600'>
                    <p>Passengers</p>
                    <p>{driver.max}</p>
                  </div>
                  <div className='mt-2.5 flex justify-between text-[17px] text-left text-gray-600'>
                    <p>Location</p>
                    <p>{driver.location}</p>
                  </div>
                  <div className='mt-2.5 flex justify-between text-[17px] text-left text-gray-600'>
                    <p>Availability</p>
                    <p>{driver.availability}</p>
                  </div>
                  <div className='mt-2.5 flex justify-between text-[17px] text-left text-gray-600'>
                    <p>Aircondition</p>
                    <p>{driver.aircondition}</p>
                  </div>
                  <hr className="mt-6"></hr>
                  <button className="mt-6 w-full px-4 py-2 blue-btn rounded transition duration-300" onClick={() => handleEdit(driver.documentId)}>Select</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Page;
