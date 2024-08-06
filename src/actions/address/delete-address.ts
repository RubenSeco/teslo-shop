"use server";

import prisma from "@/lib/prisma";

export const deleteAddress = async (userId: string) => {

  try {

    const getAddress = await prisma.userAddress.findFirst({
      where: { userId: userId }
    });

    if (getAddress) {

      await prisma.userAddress.delete({
        where: { userId: userId },
      });

    }



  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo eliminar la dirección",
    };

  }


};