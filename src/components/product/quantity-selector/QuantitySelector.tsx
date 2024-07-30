'use client';

import clsx from 'clsx';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
  // updateProductQuantity: (product: CartProduct, quantity: number) => void;
  stock?: number;
}

export const QuantitySelector = ({ quantity, onQuantityChanged, stock }: Props) => {
  return (
    <div className='flex'>
      <button
        className={clsx('', { invisible: stock === 0 })}
        onClick={() => onQuantityChanged(quantity === 1 ? 1 : quantity - 1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span
        className={clsx('min-w-20 mx-3 px-5 bg-gray-200 text-center rounded', { 'bg-red-500 font-bold': stock === 0 })}>
        {stock === 0 ? 'Sin stock' : quantity}
      </span>
      <button
        className={clsx('', { invisible: stock === 0 })}
        onClick={() => onQuantityChanged(quantity === stock ? stock : quantity + 1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
