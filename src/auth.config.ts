"use client";

import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from "./lib/prisma";

import { z } from 'zod';
import bcryptjs from 'bcryptjs';




export const authConfig: NextAuthConfig = {

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  providers: [

    Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) throw new Error("Invalid data entered");

        const { email, password } = parsedCredentials.data;

        console.log({ email, password });

        //Buscar usuario por correo
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });


        if (!user) throw new Error("User not found");


        // Comparar las contraseñas

        if (!bcryptjs.compareSync(password, user.password)) throw new Error("Invalid password");


        // Regresar el usuario sin el password

        const { password: _, ...rest } = user;

        return rest;





        // return null;
      },
    }),
  ],
};

export const { signIn, signOut, auth } = NextAuth(authConfig);