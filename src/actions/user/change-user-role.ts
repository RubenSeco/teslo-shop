"use server";

import { revalidatePath } from "next/cache";
import { auth } from "../../../auth.config";

export const changeUserRole = async (userId: string, role: string) => {

  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe estar autenticado como administrador",
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,

      },
      data: {
        role: role as any,
      }
    });
    revalidatePath("admin/users");
    return {
      ok: true,
    };


  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar el role, revisar logs"
    };

  }



};