'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getDriver, updateDriverStatus } from "@/lib/actions/user.actions"
import { useState, useEffect } from "react"
import StatusBadge from "../StatusBadge";
import UpdateDriverForm from "../Forms/UpdateDriverForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";

// Define a type for the driver data
type Driver = {
  userId: string;
  documentId: string;
  name: string;
  phone: string;
  vehicleRegNumber: string;
  status: string;
};

const DriverTable = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      const driverData = await getDriver();
  
      // Map the returned data to include documentId
      const mappedDrivers = driverData.map((driver: any) => ({
        documentId: driver.$id, 
        userId: driver.userId,
        name: driver.name,
        phone: driver.phone,
        vehicleRegNumber: driver.vehicleRegNumber,
        status: driver.status,
      }));
      
      setDrivers(mappedDrivers);
    };
  
    fetchDrivers();
  }, []);
  

  const handleEdit = (driverId: string, documentId: string) => {
    setSelectedDriverId(driverId);
    setSelectedDriver(documentId);
    setOpen(true);
    console.log(`Edit driver with ID: ${driverId}`);
  };

  const toggleStatus = async (driverId: string, documentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "show" ? "hide" : "show";  // Toggle status
    
    try {
      const updatedDriver = await updateDriverStatus({ documentId, status: newStatus });
  
      if (updatedDriver) {
        setDrivers((prevDrivers) =>
          prevDrivers.map((driver) =>
            driver.userId === driverId ? { ...driver, status: newStatus } : driver
          )
        );
        alert(`Driver status updated to ${newStatus}`);
      }
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Name</TableHead>
            <TableHead className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</TableHead>
            <TableHead className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Vehicle Reg. Number</TableHead>
            <TableHead className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">Status</TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-900 divide-y divide-gray-700">
          {drivers.map((driver) => (
            <TableRow key={driver.userId} className="text-center">
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{driver.name}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{driver.phone}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{driver.vehicleRegNumber}</TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-200"><StatusBadge status={driver.status} /></TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-right">
                <button onClick={() => handleEdit(driver.userId, driver.documentId)} className="text-blue-500 hover:text-blue-700">Edit</button>
                <button onClick={() => toggleStatus(driver.userId, driver.documentId, driver.status)} className="ml-4 text-white-500 hover:text-blue-700">
                {driver.status === 'show' ? 'Hide' : 'Show'}
              </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedDriverId && selectedDriver &&(
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="text-white-500 shad-dialog h-[50%] sm:max-w-md overflow-hidden overflow-y-scroll remove-scrollbar">
            <DialogHeader className="mb-4 space-y-3">
              <DialogTitle className="capitalize">Update Driver</DialogTitle>
            </DialogHeader>
            <UpdateDriverForm userId={selectedDriverId} documentId={selectedDriver} setOpen={setOpen}/>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default DriverTable;
