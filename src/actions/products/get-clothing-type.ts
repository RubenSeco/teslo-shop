"use server";
import prisma from '@/lib/prisma';

export const getClothingType = async () => {

  try {


    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      }
    });

    return categories;

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se obtuvieron los tipos de ropas",
    };
  }


};