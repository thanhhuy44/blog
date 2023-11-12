import AuthApi from '@/api/auth';
import AuthLayout from '@/layouts/AuthLayout';
import { CircleNotch, Eye, EyeSlash } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormInputs {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function ChangePassword() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FormInputs>();

  const handleChangePassword = async (data: FormInputs) => {
    setIsSubmit(true);

    const response = await AuthApi.changePassword(data);

    if (response) {
      setTimeout(() => {
        toast.success('Change password success!');
        router.replace('/');
        setIsSubmit(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setIsSubmit(false);
      }, 1500);
    }
  };

  const newPassword = watch('newPassword');

  const [hide, setHide] = useState<{
    currentPassword: boolean;
    newPassword: boolean;
    confirmNewPassword: boolean;
  }>({
    currentPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  return (
    <div className="w-full max-w-md text-primary flex flex-col gap-y-4">
      <h1 className="text-2xl font-semibold leading-8">Change password</h1>
      <div>
        <div className="mt-1 rounded-md py-3 px-4 bg-[#EDF2F7] flex items-center gap-x-3">
          <input
            id="password"
            className="bg-transparent flex-1 outline-none"
            type={hide.currentPassword ? 'password' : 'text'}
            size={1}
            placeholder="Current password"
            {...register('currentPassword', {
              required: {
                value: true,
                message: 'This field is required.',
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Password have to contain at least 8 characters, 1 number, 1 upper and 1 lowercase.',
              },
            })}
          />
          <div
            onClick={() => {
              setHide((prev) => {
                return { ...prev, currentPassword: !prev.currentPassword };
              });
            }}
            className="select-none cursor-pointer flex items-center h-full">
            {hide.currentPassword ? <Eye /> : <EyeSlash />}
          </div>
        </div>
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.currentPassword ? errors.currentPassword.message : ''}
        </p>
      </div>
      <div>
        <div className="mt-1 rounded-md py-3 px-4 bg-[#EDF2F7] flex items-center gap-x-3">
          <input
            id="password"
            className="bg-transparent flex-1 outline-none"
            type={hide.newPassword ? 'password' : 'text'}
            size={1}
            placeholder="New password"
            {...register('newPassword', {
              required: {
                value: true,
                message: 'This field is required.',
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Password have to contain at least 8 characters, 1 number, 1 upper and 1 lowercase.',
              },
            })}
          />
          <div
            onClick={() => {
              setHide((prev) => {
                return { ...prev, newPassword: !prev.newPassword };
              });
            }}
            className="select-none cursor-pointer flex items-center h-full">
            {hide.newPassword ? <Eye /> : <EyeSlash />}
          </div>
        </div>
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.newPassword ? errors.newPassword.message : ''}
        </p>
      </div>
      <div>
        <div className="mt-1 rounded-md py-3 px-4 bg-[#EDF2F7] flex items-center gap-x-3">
          <input
            id="password"
            className="bg-transparent flex-1 outline-none"
            type={hide.confirmNewPassword ? 'password' : 'text'}
            size={1}
            placeholder="Confirm new password"
            {...register('confirmNewPassword', {
              required: {
                value: true,
                message: 'This field is required.',
              },
              validate: (value) => {
                if (value !== newPassword) {
                  return 'Passwords do not match!';
                }
              },
            })}
          />
          <div
            onClick={() => {
              setHide((prev) => {
                return {
                  ...prev,
                  confirmNewPassword: !prev.confirmNewPassword,
                };
              });
            }}
            className="select-none cursor-pointer flex items-center h-full">
            {hide.confirmNewPassword ? <Eye /> : <EyeSlash />}
          </div>
        </div>
        <p className="mt-1 text-xs text-[#FF0000]">
          {errors.confirmNewPassword ? errors.confirmNewPassword.message : ''}
        </p>
      </div>
      <div
        onClick={handleSubmit(handleChangePassword)}
        className={`select-none flex items-center justify-center w-full py-3 px-4 bg-[#212529] text-white rounded-full outline-none hover:opacity-80 duration-300 ${
          isSubmit ? 'cursor-default opacity-80' : 'cursor-pointer'
        }`}>
        {isSubmit ? (
          <CircleNotch size={24} className="animate-spin" />
        ) : (
          'Change Password'
        )}
      </div>
    </div>
  );
}

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ChangePassword;
