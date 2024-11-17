"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form
} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserFormValidation } from "@/lib/validation"
import { createUser } from "@/lib/actions/user.actions"


export enum formFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  SELECT = 'select',
  SKELETON = 'skeleton',
}
 
const CreateUserForm = () => {

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      phone: "",
    },
  })
 
  async function onSubmit({name, phone
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {name, phone};

      const user = await createUser(userData);

      if(user) router.push(`/drivers/${user.$id}/register`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

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
          iconAlt="mobile number"     
      />

      <SubmitButton isLoading = {isLoading}>Submit</SubmitButton>
    </form>
  </Form>
  )
}

export default CreateUserForm
