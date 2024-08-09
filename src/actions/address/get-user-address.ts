"use server";
import prisma from '@/lib/prisma';


export const getUserAddress = async (userId: string) => {

  try {

    const address = await prisma.userAddress.findFirst({
      where: { userId }
    });

    const country = await prisma.country.findFirst({
      where: {
        id: address?.countryId as any,
      }
    });


    if (!address) return null;

    const { id, countryId, ...rest } = address;

    return {
      ...rest,
      country: country?.name,
      countryId: id,
    };

  } catch (error) {
    console.log(error);
    return null;

  }

};