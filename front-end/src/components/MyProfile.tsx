import { User } from '@/interface';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Password } from '@phosphor-icons/react';
import Link from 'next/link';

interface Props {
  user: User;
}

interface FormInputs {
  fullname: string;
  email: string;
  dob: string;
  gender: number;
  phoneNumber: string;
  address: string;
}

function MyProfile({ user }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
    },
  });

  const handleUpdateProfile = async (data: FormInputs) => {};

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-y-1">
        <label className="text-sm text-gray-700" htmlFor="fullname">
          Full name *
        </label>
        <input
          type="text"
          id="fullname"
          className="bg-[#EDF2F7] px-3 py-1 focus:outline-0 border border-transparent duration-300 focus:border-secondary"
          {...register('fullname', {
            required: {
              value: true,
              message: 'This field is required!',
            },
          })}
        />
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.fullname ? errors.fullname.message : ''}
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <label className="text-sm text-gray-700" htmlFor="fullname">
          Email *
        </label>
        <input
          type="text"
          id="fullname"
          className="bg-[#EDF2F7] px-3 py-1 focus:outline-0 border border-transparent duration-300 focus:border-secondary"
          {...register('email', {
            required: {
              value: true,
              message: 'This field is required!',
            },
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email',
            },
          })}
        />
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.email ? errors.email.message : ''}
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <label className="text-sm text-gray-700" htmlFor="phoneNumber">
          Phone number
        </label>
        <input
          type="text"
          id="phoneNumber"
          className="bg-[#EDF2F7] px-3 py-1 focus:outline-0 border border-transparent duration-300 focus:border-secondary"
          {...register('phoneNumber', {
            pattern: {
              value: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
              message: 'Invalid phone number',
            },
          })}
        />
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.phoneNumber ? errors.phoneNumber.message : ''}
        </p>
      </div>
      <div className="flex flex-col gap-y-1">
        <label className="text-sm text-gray-700" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="bg-[#EDF2F7] px-3 py-1 focus:outline-0 border border-transparent duration-300 focus:border-secondary"
          {...register('address', {})}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <label className="text-sm text-gray-700" htmlFor="dob">
          Date of birth
        </label>
        <input
          type="date"
          id="dob"
          className="bg-[#EDF2F7] px-3 py-1 focus:outline-0 border border-transparent duration-300 focus:border-secondary"
          {...register('dob', {})}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <span className="text-sm text-gray-700">Gender</span>
        <div className="px-3 py-1 flex items-center gap-4">
          <label
            htmlFor="gender-male"
            className="flex items-center gap-x-2 cursor-pointer select-none">
            <input
              type="radio"
              id="gender-male"
              value={1}
              className="bg-[#EDF2F7] px-3 py-1 focus:outline-0 border border-transparent duration-300 focus:border-secondary"
              {...register('gender', {})}
            />
            Male
          </label>
          <label
            htmlFor="gender-female"
            className="flex items-center gap-x-2 cursor-pointer select-none">
            <input
              type="radio"
              id="gender-female"
              value={2}
              className="bg-[#EDF2F7] px-3 py-1 focus:outline-0 border border-transparent duration-300 focus:border-secondary"
              {...register('gender', {})}
            />
            Female
          </label>
          <label
            htmlFor="gender-other"
            className="flex items-center gap-x-2 cursor-pointer select-none">
            <input
              type="radio"
              id="gender-other"
              value={3}
              className="bg-[#EDF2F7] px-3 py-1 focus:outline-0 border border-transparent duration-300 focus:border-secondary"
              {...register('gender', {})}
            />
            Other
          </label>
        </div>
      </div>
      <div className="col-span-2">
        <Link
          href={{
            pathname: '/change-password',
          }}
          className="flex-1 flex items-center gap-x-2 hover:underline">
          <Password size={20} />
          <p className="flex-1">Change Password</p>
        </Link>
      </div>
      <div className="col-start-2 flex justify-end items-center">
        <div
          onClick={handleSubmit(handleUpdateProfile)}
          className="px-8 py-2 bg-primary text-white cursor-pointer select-none">
          Save Change
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
