
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateUserForm from '@/components/Forms/CreateUser'
import DriverTable from '@/components/Tables/DriverTable'



const dashboard = () => {

  return (
    <div className='bg-bannerImg bg-repeat bg-cover text-white-500 h-screen w-screen'>
        <div className='flex flex-col'>
        <h1 className='text-left text-[50px] m-5 text-yellow-500 text-semibold'>Welcome!</h1>
        <Dialog>
          <DialogTrigger className='m-5 border-[2px] border-yellow-500 w-fit px-3 py-1 rounded hover:bg-yellow-500 hover:text-dark-200'>New User</DialogTrigger>
          <DialogContent className='text-white-500'>
            <DialogHeader>
              <DialogTitle>Create a New User</DialogTitle>
            </DialogHeader>
            <CreateUserForm />
          </DialogContent>
        </Dialog>

        <DriverTable />
        </div>
    </div>
  )
}

export default dashboard
