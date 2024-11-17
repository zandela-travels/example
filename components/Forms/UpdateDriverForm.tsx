'use client'

import { useForm } from "react-hook-form"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getDriverById, updateDriverDetails } from "@/lib/actions/user.actions"
import { Towns, VehicleTypes } from "@/constants"
import { SelectItem } from "../ui/select"

export enum formFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    SELECT = 'select',
    SKELETON = 'skeleton',
}

const UpdateDriverForm = ({ userId, documentId, setOpen }: { userId: string, documentId: string, setOpen: (open: boolean) => void; }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      phone: "",
      location: "",
      vehicleType: "",
      vehicleModel: "",
      price: ""
    },
  });

  useEffect(() => {
    const fetchDriver = async () => {
      const driver = await getDriverById(documentId);
      if (driver) {
        form.reset(driver);
      }
    };

    fetchDriver();
  }, [documentId, form]);

  async function onSubmit(values: any) {
    setIsLoading(true);

    try {
      const driverData = {
        userId,
        documentId,
        driverDetails: {
            name: values?.name,
            phone: values?.phone,
            location: values?.location,
            vehicleType: values?.vehicleType,
            vehicleModel: values?.vehicleModel,
            price: values?.price
        }
      }

      const driverDetails = await updateDriverDetails(driverData);

      if(driverDetails) {
        alert('User updated successfully');
        setOpen(false);
        window.location.reload();
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Driver Information</h2>
          </div>
        </section>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="name"      
            label="Full name"
            placeholder="John Doe"
            iconAlt="user"
          />

          <CustomFormField
            fieldType={formFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="0762870489" 
            iconAlt=""     
          />
        </div>

        <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="location"
          label="Closest Town"
          placeholder="Select a town" 
          iconAlt=""     
        >
          {Towns.map((town) => (
            <SelectItem key={town} value={town}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{town}</p>    
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.SELECT}
            control={form.control}
            name="vehicleType"
            label="Vehicle Type"
            placeholder="Select a type" 
            iconAlt=""     
          >
            {VehicleTypes.map((type) => (
              <SelectItem key={type} value={type}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{type}</p>    
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="vehicleModel"      
            label="Vehicle Model"
            placeholder="Toyota"
            iconAlt=""
          />

          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="price"      
            label="Price per Km"
            placeholder="120"
            iconAlt=""
          />
        </div>

        <SubmitButton isLoading={isLoading}>Update</SubmitButton>
      </form>
    </Form>
  )
}

export default UpdateDriverForm
