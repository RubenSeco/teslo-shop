"use server";

import type { Address, Size } from "@/interfaces";
import { auth } from "../../../auth.config";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

  const session = await auth();
  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }
  //  Obtener la información de los productos
  // NOTA: Tener en cuenta que se pueden llevar dos productos con el mismo ID (distinta talla)
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      }
    }
  });

  // Calcular los montos subtotales, totales, tax, etc

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { subTotal, tax, total } = productIds.reduce((totals, item) => {

    const productQuantity = item.quantity;
    const product = products.find((product) => product.id === item.productId);
    if (!product) throw new Error(`${item.productId} no existe - 500`);
    const subTotal = product.price * productQuantity;

    totals.subTotal += subTotal;
    totals.tax += subTotal * 0.15;
    totals.total += subTotal * 1.15;
    return totals;
  }, { subTotal: 0, tax: 0, total: 0 });

  // Crear la transacción de la base de datos

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {

      // 1. Actualizar el stock de los productos
      const updatedProductsPromises = products.map(async (product) => {

        const productQuantity = productIds.filter((p) => p.productId === product.id).reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }
        return tx.product.update({

          where:
            { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            }
          }
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en las existencias (no hay stock)
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no hay stock suficiente`);
        }
      });

      // 2. Crear la orden - Encabezado - Detalles

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,
          isPaid: false,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price: products.find((product) => product.id === p.productId)?.price ?? 0,
              }))
            }
          }
        }
      });

      // Validar, si el price es cero, lanzar un error
      const { country, ...restAddress } = address;
      // 3. Crear la dirección de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          orderId: order.id,
          countryId: address.countryId,
        }
      });

      return {
        order: order,
        updatedProducts: updatedProducts,
        orderAddress: orderAddress,
      };

    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,

    };

  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
