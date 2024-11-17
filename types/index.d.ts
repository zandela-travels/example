import { Driver } from "./appwrite.types";

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};


declare interface CreateUserParams {
  name: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  location: string | undefined;
  age: string;
  vehicleRegNumber: string;
  vehicleType: string;
  vehicleModel: string | undefined;
  price: string;
  nationalIdNumber: string;
  licenseNumber: string | undefined;
  driverImage: FormData | undefined;
  vehicleImage1: FormData | undefined;
  vehicleImage2: FormData | undefined;
  vehicleImage3: FormData | undefined;
  vehicleImage4: FormData | undefined;
}

declare type UpdateDriverParams = {
  documentId: string;
  driver: Driver;
};