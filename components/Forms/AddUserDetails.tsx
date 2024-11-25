"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form, FormControl
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserDetailsValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { registerDriver } from "@/lib/actions/user.actions"
import { Towns, DriverFormDefaultValues, VehicleTypes, AvailabiilityTypes, AcTypes } from "@/constants"
import { SelectItem } from "../ui/select"
import FileUploader from "../FileUploader"
import { User } from "@/types"


export enum formFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    SELECT = 'select',
    SKELETON = 'skeleton',
  }


const AddUserDetails = ({ user }: { user: User }) => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserDetailsValidation>>({
    resolver: zodResolver(UserDetailsValidation),
    defaultValues: {
      ...DriverFormDefaultValues,
      name: "",
      phone: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof UserDetailsValidation>) {
    setIsLoading(true);

    let formData, vehicle1Data, vehicle2Data, vehicleData3, vehicleData4;

    if(values.driverImage && values.driverImage.length > 0) {
      const blobFile = new Blob([values.driverImage[0]], {
        type: values.driverImage[0].type,
      })

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.driverImage[0].name)
    } 

    if(values.vehicleImage1 && values.vehicleImage1.length > 0) {
        const blobFile = new Blob([values.vehicleImage1[0]], {
          type: values.vehicleImage1[0].type,
        })
  
        vehicle1Data = new FormData();
        vehicle1Data.append('blobFile', blobFile);
        vehicle1Data.append('fileName', values.vehicleImage1[0].name)
      } 

      if(values.vehicleImage2 && values.vehicleImage2.length > 0) {
        const blobFile = new Blob([values.vehicleImage2[0]], {
          type: values.vehicleImage2[0].type,
        })
  
        vehicle2Data = new FormData();
        vehicle2Data.append('blobFile', blobFile);
        vehicle2Data.append('fileName', values.vehicleImage2[0].name)
      } 

      if(values.vehicleImage3 && values.vehicleImage3.length > 0) {
        const blobFile = new Blob([values.vehicleImage3[0]], {
          type: values.vehicleImage3[0].type,
        })
  
        vehicleData3 = new FormData();
        vehicleData3.append('blobFile', blobFile);
        vehicleData3.append('fileName', values.vehicleImage3[0].name)
      } 

      if(values.vehicleImage4 && values.vehicleImage4.length > 0) {
        const blobFile = new Blob([values.vehicleImage4[0]], {
          type: values.vehicleImage4[0].type,
        })
  
        vehicleData4 = new FormData();
        vehicleData4.append('blobFile', blobFile);
        vehicleData4.append('fileName', values.vehicleImage4[0].name)
      } 

    try {
      
      const driverData = {
        ...values,
        userId: user.$id,
        driverImage: formData,
        vehicleImage1: vehicle1Data,
        vehicleImage2: vehicle2Data,
        vehicleImage3: vehicleData3,
        vehicleImage4: vehicleData4,
      }

      //@ts-ignore
      const driver = await registerDriver(driverData);

      if(driver) {
        router.push(`/dashboard`)
        alert('user added successfully')
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1 text-white-500">

      <section className="space-y-6">
       <div className="mb-9 spac-y-1">
       <h2 className="sub-header">Driver Information</h2>
       </div>
      </section>

      <div className="flex flex-col gap-6 xl:flex-row">
      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="name"      
          label="Full name"
          placeholder="Jhon Doe"
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


      <div className="flex flex-col gap-6 xl:flex-row">
      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="age"      
          label="Driver Age"
          placeholder="30"
          iconAlt=""
      />

      <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="maxPassengers"      
          label="Max Passengers"
          placeholder="9"
          iconAlt=""
      />

      </div>

      <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="location"
          label="Clossest Town"
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
          fieldType={formFieldType.INPUT}
          control={form.control} 
          name="vehicleRegNumber"      
          label="Vehicle Registration Numberr"
          placeholder="ABC123"
          iconAlt=""
      />

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
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="aircondition"
          label="AC/NO AC"
          placeholder="Select a type" 
          iconAlt=""     
      >
        {AcTypes.map((type) => (
            <SelectItem key={type} value={type}>
                <div className="flex cursor-pointer items-center gap-2">
                    <p>{type}</p>    
                </div>
            </SelectItem>
        ))}
      </CustomFormField>

      <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="availability"
          label="Availability"
          placeholder="Select a type" 
          iconAlt=""     
      >
        {AvailabiilityTypes.map((type) => (
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
          label="Vehicel Model"
          placeholder="toyota"
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

      <div className="flex flex-col gap-6 xl:flex-row">

        <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="nationalIdNumber"      
            label="ID Number"
            placeholder="196731510798"
            iconAlt=""
        />

        <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control} 
            name="licenseNumber"      
            label="License Number"
            placeholder="1234567"
            iconAlt=""
        />

        </div>

      <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="driverImage"
          label="Driver Image"
          renderSkeleton={(field) => (
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
          )}
          iconAlt=""     
      />

      <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="vehicleImage1"
          label="Vehicle Image 1"
          renderSkeleton={(field) => (
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
          )}
          iconAlt=""     
      />

      <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="vehicleImage2"
          label="Vehicle Image 2"
          renderSkeleton={(field) => (
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
          )}
          iconAlt=""     
      />

      <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="vehicleImage3"
          label="Vehicle Image 3"
          renderSkeleton={(field) => (
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
          )}
          iconAlt=""     
      />

      <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="vehicleImage4"
          label="Vehicle Image 4"
          renderSkeleton={(field) => (
            <FormControl>
                <FileUploader files={field.value} onChange={field.onChange}/>
            </FormControl>
          )}
          iconAlt=""     
      />

      <SubmitButton isLoading = {isLoading}>Get started</SubmitButton>
    </form>
  </Form>
  )
}

export default AddUserDetails
