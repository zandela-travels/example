'use client'

import { useForm } from "react-hook-form"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export enum formFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    SELECT = 'select',
    SKELETON = 'skeleton',
}

const Bookings = ({ userId, documentId, vehicleId, price, setOpen }: { userId: string, documentId: string, vehicleId: string, price: string, setOpen: (open: boolean) => void; }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      driverId: userId,
      detailId: documentId,
      customerName: "",
      customerPhone: "",
      pickUpLocation: "",
      destination: "",
      vehicleRegNumber: vehicleId,
      days: "",
      pickUpDate: "",
      distance: "",
      priceKm: price,
      amount: "",
      bookingFee: "",
      driverAmount: "",
    },
  });

  const { watch, setValue } = form;

  const distance = watch("distance");
  const days = watch("days");
  const priceKm = parseFloat(price);

  useEffect(() => {
    const calculateAmounts = () => {
      const distanceValue = parseFloat(distance) || 0;
      const daysValue = parseInt(days) || 0;
      const tripAmount = (distanceValue * 2 * priceKm) + (daysValue * 2000);
      const bookingFee = distanceValue * 2 * 7;
      const driverAmount = tripAmount - bookingFee;

      setValue("amount", tripAmount.toFixed(2));
      setValue("bookingFee", bookingFee.toFixed(2));
      setValue("driverAmount", driverAmount.toFixed(2));
    };

    calculateAmounts();
  }, [distance, days, priceKm, setValue]);

  async function onSubmit(values: any) {
    setIsLoading(true);
    // Add your submit logic here
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Booking Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="customerName"      
            label="Full name"
            placeholder="John Doe"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={formFieldType.PHONE_INPUT}
            control={form.control}
            name="customerPhone"
            label="Phone Number"
            placeholder="0762870489" 
            iconAlt=""     
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="pickUpLocation"      
            label="Pick Up Address"
            placeholder="Nittambuwa"
            iconAlt=""
          />

          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="destination"      
            label="Destination"
            placeholder="Galle"
            iconAlt=""
          />
        </div>

        <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="distance"      
            label="Distance to destination"
            placeholder="200"
            iconAlt=""
          />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="days"      
            label="No of night stays"
            placeholder="2"
            iconAlt=""
          />

          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="pickUpDate"      
            label="Pick Up Date"
            placeholder="2023/12/4"
            iconAlt=""
          />
        </div>

        <div className="bg-navbackImg p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-dark-200">Billing Summary</h3>
          <div className="flex justify-between mb-2 font-semibold">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-gray-900 font-bold">${form.watch("amount")}</span>
          </div>
          <div className="flex justify-between mb-2 font-semibold">
            <span className="text-gray-700">Booking Fee:</span>
            <span className="text-red-500 font-bold">${form.watch("bookingFee")}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span className="text-gray-700">Amount to be Paid to Driver:</span>
            <span className="text-blue-700 font-bold">${form.watch("driverAmount")}</span>
          </div>
        </div>

        <SubmitButton isLoading={isLoading}>Pay</SubmitButton>
      </form>
    </Form>
  )
}

export default Bookings
