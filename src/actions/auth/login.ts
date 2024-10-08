'use server';

import { AuthError } from "next-auth";
import { signIn } from "../../../auth.config";



// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {

      switch (error.type) {

        case 'CallbackRouteError':
          return 'CredentialsSignin';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", { email, password });
    return { ok: true };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo iniciar la sesión",
    };
  }

}

