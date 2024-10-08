'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store';

import Image from 'next/image';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
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
          <Image
            src={`/products/${product.image}`}
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
            <span>
              <p>
                {product.size} - {product.title} ({product.quantity})
              </p>
            </span>

            <p className='font-bold'>{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
