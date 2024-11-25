'use server'

import { Query, ID } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, BOOKINGS_DATA_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"
import { BookingParams } from "@/types"

export const createBooking = async (appointment: BookingParams) => {
    try {
        const newBooking = await databases.createDocument(
            DATABASE_ID!,
            BOOKINGS_DATA_COLLECTION_ID!,
            ID.unique(),
            appointment
          )
      
          return parseStringify(newBooking);  
    } catch (error) {
      console.log(error)  
    }
}