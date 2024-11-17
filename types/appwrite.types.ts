import { Models } from "node-appwrite";

export interface Driver extends Models.Document {
  userId: string;
  name: string;
  phone: string;
  age: string;
  vehicleRegNumber: string;
  vehicleType: string;
  price: string;
  nationalIdNumber: string;
  licenseNumber: string | undefined;
  vehicleModel: string | undefined;
  location: string | undefined;
  driverImage: FormData | undefined;
  vehicleImage1: FormData | undefined;
  vehicleImage2: FormData | undefined;
  vehicleImage3: FormData | undefined;
  vehicleImage4: FormData | undefined;
}
