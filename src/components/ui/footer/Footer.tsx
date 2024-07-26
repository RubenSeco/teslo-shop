import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { CgCopyright } from 'react-icons/cg';

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/" className='flex justify-center'>
        <span className={`${titleFont.className} antialiased font-bold mr-1`}>Teslo</span>
        <span className='mr-1'>| shop</span>
        <span className='mr-1'> <CgCopyright /> </span>
        <span className='mr-1'>{new Date().getFullYear()}</span>

      </Link>
      <Link href="/" className='mx-3'>Privacidad & Legal</Link>
      <Link href="/" className='mx-3'>Ubicaciones</Link>
    </div>
  );
};
