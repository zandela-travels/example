import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const UserDetailsValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  location: z.string().min(2, "Select at least one doctor"),
  price: z.string().min(2, "Select at least one doctor"),
  age: z.string().min(2, "Select at least one doctor"),
  vehicleType: z.string().min(2, "Select at least one doctor"),
  vehicleModel: z
    .string()
    .min(2, "Insurance name must be at least 2 characters")
    .max(50, "Insurance name must be at most 50 characters"),
  vehicleRegNumber: z
    .string()
    .min(5, "Registration number must be at least 5 characters")
    .max(10, "Registration number must be at most 10 characters"),
  licenseNumber: z.string().optional(),
  nationalIdNumber: z.string().optional(),
  availability: z.string().optional(),
  language: z.string().optional(),
  aircondition: z.string().optional(),
  maxPassengers: z.string().optional(),
  driverImage: z.custom<File[]>().optional(),
  vehicleImage1: z.custom<File[]>().optional(),
  vehicleImage2: z.custom<File[]>().optional(),
  vehicleImage3: z.custom<File[]>().optional(),
  vehicleImage4: z.custom<File[]>().optional(),
});

export const BookingFormValidation = z.object({
  customerName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  customerPhone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  pickUpLocation: z
    .string()
    .min(2, "Address must be at least 2 characters")
    .max(50, "Address must be at most 50 characters"),
  destination: z
    .string()
    .min(2, "Destination must be at least 2 characters")
    .max(50, "Destination must be at most 50 characters"), 
  days: z.string().optional(),
  driverId: z.string().optional(),
  driverName: z.string().optional(),
  detailId: z.string().optional(),
  vehicleRegNumber: z.string().optional(),
  priceKm: z.string().optional(),
  distance: z.string().optional(),
  amount: z.string().optional(),
  bookingFee: z.string().optional(),
  driverAmount: z.string().optional(),
  pickUpDate: z.coerce.date(),
  pickUpTime: z.string().optional(),
});