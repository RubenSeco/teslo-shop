'use client';

import { registerUser } from '@/actions';
import { login } from '@/actions/auth/login';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  name: string;
  email: string;
  password: string;
  placeholder: string;
};

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;

    // Server Action
    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErrorMessage(resp.message as any);
      return;
    }

    await login(email.toLowerCase(), password);
    window.location.replace('/');
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col'>
        <label htmlFor='name'>Nombre completo</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
            'border-red-500': !!errors.name
          })}
          type='text'
          id='name'
          autoFocus
          {...register('name', { required: true })}
        />
        <label htmlFor='email'>Correo electrónico</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
            'border-red-500': !!errors.email
          })}
          type='email'
          id='email'
          {...register('email', { required: true, pattern: /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim })}
        />

        <label htmlFor='password'>Contraseña</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
            'border-red-500': !!errors.password
          })}
          type='password'
          id='password'
          {...register('password', { required: true })}
        />

        <span className='text-red-500'>{errorMessage}</span>

        <button className='btn-primary'>Crear cuenta</button>

        {/* divisor l ine */}
        <div className='flex items-center my-5'>
          <div className='flex-1 border-t border-gray-500'></div>
          <div className='px-2 text-gray-800'>O</div>
          <div className='flex-1 border-t border-gray-500'></div>
        </div>

        <Link
          href='/auth/login'
          className='btn-secondary text-center'>
          Ingresar
        </Link>
      </form>
    </>
  );
};
