
"use server";

import prisma from "@/lib/prisma";

import { Address } from "@/interfaces";


export const setUserAddress = async (address: Address, userId: string) => {
  try {

    const newAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: newAddress,
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo graba la dirección"
    };

  }


};

const createOrReplaceAddress = async (address: Address, userId: string) => {

  try {

    const storeAddress = await prisma.userAddress.findUnique({

      where: { userId: userId },
    });

    const country = await prisma.country.findFirst({
      where: { name: address.country },
    });

    const addressToSave = {
      address: address.address,
      address2: address.address2,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city,
      countryId: country!.id,
      userId: userId,

    };

    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId: userId },
      data: addressToSave
    });

    return updatedAddress;

  } catch (error) {
    console.log(error);
    throw new Error("No se pudo grabar la dirección");
  }
};

