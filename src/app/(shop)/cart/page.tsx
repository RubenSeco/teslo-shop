/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { Title } from "@/components";
import Link from 'next/link';
// import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";


export default function () {

  // redirect("/empty");

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title="Carrito" />
        <div className="grid sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb5">
              Continúa comprando
            </Link>
            <ProductsInCart />
          </div>


          {/* Items */}

          {/* Checkout - Resumen de orden de compra*/}


          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <OrderSummary />
            <div className="mt-5 mb-2 w-full">
              <Link
                className="flex btn-primary justify-center"
                href="/checkout/address">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}