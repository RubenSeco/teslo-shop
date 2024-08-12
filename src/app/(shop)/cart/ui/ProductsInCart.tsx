'use client';

import { useEffect, useState } from 'react';
import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';

import Link from 'next/link';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Espere...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className='flex mb-5'>
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width: 'auto',
              height: 'auto'
            }}
            alt={product.title}
            className='mr-5 rounded'
          />

          <div>
            <Link
              className='hover:underline'
              href={`/product/${product.slug}`}>
              <p>
                {product.size} - {product.title}
              </p>
            </Link>

            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            />
            <button
              className='underline mt-3'
              onClick={() => removeProduct(product)}>
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
