'use server'

import { Query, ID } from "node-appwrite"
import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, USER_DATA_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file"
import { CreateUserParams, RegisterUserParams, UpdateDriverParams } from "@/types"
import { revalidatePath } from "next/cache"

export const createUser = async (user: CreateUserParams) => {
    
    try {
      const newUser = await users.create(
        ID.unique(), 
        undefined,
        user.phone,
        undefined,
        user.name
      )

      return parseStringify(newUser)
    } catch (error: any) {
        console.log(error)
        if(error && error?.code === 409) {
            const existingUser = await users.list([
                Query.equal('phone', [user.phone])
            ])

            return existingUser?.users[0]
        }
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        return null;  // Return a default value like null if fetching fails
    }
};

export const registerDriver = async ({ driverImage, vehicleImage1, vehicleImage2, vehicleImage3, vehicleImage4, ...driver }: RegisterUserParams) => {
    try {
      let file, vehicle1, vehicle2, vehicle3, vehicle4;
  
      if(driverImage) {
        const inputFile = InputFile.fromBuffer(
          driverImage?.get('blobFile') as Blob,
          driverImage?.get('fileName') as string,
        )
  
        file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
      }

      if(vehicleImage1) {
        const inputFile = InputFile.fromBuffer(
          vehicleImage1?.get('blobFile') as Blob,
          vehicleImage1?.get('fileName') as string,
        )
  
        vehicle1 = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
      }

      if(vehicleImage2) {
        const inputFile = InputFile.fromBuffer(
          vehicleImage2?.get('blobFile') as Blob,
          vehicleImage2?.get('fileName') as string,
        )
  
        vehicle2 = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
      }

      if(vehicleImage3) {
        const inputFile = InputFile.fromBuffer(
          vehicleImage3?.get('blobFile') as Blob,
          vehicleImage3?.get('fileName') as string,
        )
  
        vehicle3 = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
      }

      if(vehicleImage4) {
        const inputFile = InputFile.fromBuffer(
          vehicleImage4?.get('blobFile') as Blob,
          vehicleImage4?.get('fileName') as string,
        )
  
        vehicle4 = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
      }
  
      const newDriver = await databases.createDocument(
        DATABASE_ID!,
        USER_DATA_COLLECTION_ID!,
        ID.unique(),
        {
          driverImage:file?.$id || null,
          driverImageUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          vehicleImage1:vehicle1?.$id || null,
          vehicleImage1Url: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          vehicleImage2:vehicle2?.$id || null,
          vehicleImage2Url: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          vehicleImage3:vehicle3?.$id || null,
          vehicleImage3Url: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          vehicleImage4:vehicle4?.$id || null,
          vehicleImage4Url: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          ...driver
        }
      )
  
      return parseStringify(newDriver);
    } catch (error) {
      console.log(error);
    }
  }

  export const getDriver = async () => {
    try {
      const drivers = await databases.listDocuments(
        DATABASE_ID!,
        USER_DATA_COLLECTION_ID!,
        [Query.orderDesc('$createdAt')]
      );
  
      return parseStringify(drivers.documents);
    } catch (error) {
      console.log(error)
    }
  }

  export const getShownDriver = async () => {
    try {
        const drivers = await databases.listDocuments(
            DATABASE_ID!,
            USER_DATA_COLLECTION_ID!,
            [
                Query.orderDesc('$createdAt'),
                Query.equal('status', 'show')
            ]
        );

        return parseStringify(drivers.documents);
    } catch (error) {
        console.log(error);
    }
};


  export const getDriverById = async (documentId: string) => {
    if (!documentId) {
      console.error("Document ID is missing.");
      return null; // Return null or handle accordingly
    }
  
    try {
      const driver = await databases.getDocument(
        DATABASE_ID!,
        USER_DATA_COLLECTION_ID!,
        documentId
      );
  
      return parseStringify(driver);
    } catch (error) {
      console.error(`Error fetching document with ID ${documentId}:`, error);
      return null; // Return null or handle accordingly
    }
  }
  

  export const updateDriverDetails = async ({ documentId, driverDetails }: { documentId: string, driverDetails: any }) => {
    try {
        console.log(driverDetails);

        const updatedDriver = await databases.updateDocument(
            DATABASE_ID!,
            USER_DATA_COLLECTION_ID!,
            documentId,
            { ...driverDetails }  // Spreads the fields within driverDetails
        );

        if (!updatedDriver) {
            throw new Error('Driver not found');
        }

        return parseStringify(updatedDriver);
    } catch (error) {
        console.log(error);
    }
};

export const updateDriverStatus = async ({ documentId, status }: { documentId: string, status: string }) => {
  try {
    const updatedDriver = await databases.updateDocument(
      DATABASE_ID!,
      USER_DATA_COLLECTION_ID!,
      documentId,
      { status }  // Update only the status field
    );

    return parseStringify(updatedDriver);
  } catch (error) {
    console.log(error);
  }
};
