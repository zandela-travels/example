'use server'

import { Query, ID } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, BOOKINGS_DATA_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"
import { BookingParams } from "@/types"

export const createBooking = async (bookings: BookingParams) => {
    try {
        const newBooking = await databases.createDocument(
            DATABASE_ID!,
            BOOKINGS_DATA_COLLECTION_ID!,
            ID.unique(),
            bookings
          )
      
          return parseStringify(newBooking);  
    } catch (error) {
      console.log(error)  
    }
}

export const getBookingsById = async (bookingId: string) => {
  if (!bookingId) {
    console.error("Booking ID is missing.");
    return null; // Return null or handle accordingly
  }

  try {
    const bookingDetails = await databases.getDocument(
      DATABASE_ID!,
      BOOKINGS_DATA_COLLECTION_ID!,
      bookingId
    );

    return parseStringify(bookingDetails);
  } catch (error) {
    console.error(`Error fetching document with ID ${bookingId}:`, error);
    return null; // Return null or handle accordingly
  }
}