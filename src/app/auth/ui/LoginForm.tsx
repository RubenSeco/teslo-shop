"use client";

import { useFormState } from "react-dom";
import { authenticate } from "@/actions";

import Link from "next/link";

export const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);


  return (
    <form action={dispatch} >
      <div className="flex flex-col">

        <label htmlFor="email" className="flex flex-col">Correo electrónico
          <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            type="email"
            name="email"
            id="email"
          />
        </label>

        <label htmlFor="password" className="flex flex-col">Contraseña
          <input
            className="px-5 py-2 border bg-gray-200 rounded mb-5"
            type="password"
            name="password"
            id="password"
          />
        </label>

        <button
          type="submit"
          className="btn-primary">
          Ingresar
        </button>


        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account"
          className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>

      </div>
    </form>
  );
};
