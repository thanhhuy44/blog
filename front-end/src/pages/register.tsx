import React, { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { Eye, EyeSlash, CircleNotch } from "@phosphor-icons/react";
import Link from "next/link";
import { ReactElement } from "react";
import GoogleIcon from "@/assets/icons/google.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import AuthApi from "@/api/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface RegisterFormInputs {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
}

function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const password = watch("password", "");
  const handleRegister: SubmitHandler<RegisterFormInputs> = async (
    data: any
  ) => {
    // await AuthApi.registerLocal(data);
    if (!isSubmit) {
      setIsSubmit(true);
      const response = await AuthApi.registerLocal(data);
      if (response) {
        setTimeout(() => {
          setIsSubmit(false);
          toast.success("Register success!");
          router.push("/login");
        }, 1500);
      } else {
        setIsSubmit(false);
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="w-full max-w-[584px]">
      <div className="text-[#141416]">
        <h1 className="text-2xl font-semibold leading-8">Welcome back!</h1>
        <p className="text-base font-normal leading-6">Register</p>
      </div>
      <div className="mt-14 flex flex-col gap-y-7">
        <div>
          <label
            className="text-[#353945] text-sm font-normal leading-6"
            htmlFor="fullname"
          >
            Full name
          </label>
          <div className="mt-1 rounded-md py-3 px-4 bg-[#EDF2F7] flex items-center gap-x-3">
            <input
              className="bg-transparent flex-1 outline-none"
              type="text"
              size={1}
              placeholder="Your full name"
              id="fullname"
              {...register("fullname", {
                required: {
                  message: "This field is required.",
                  value: true,
                },
              })}
            />
          </div>
          <p className="mt-1 text-xs text-[#FF0000]">
            {errors.fullname ? errors.fullname.message : ""}
          </p>
        </div>
        <div>
          <label
            className="text-[#353945] text-sm font-normal leading-6"
            htmlFor="email"
          >
            Email
          </label>
          <div className="mt-1 rounded-md py-3 px-4 bg-[#EDF2F7] flex items-center gap-x-3">
            <input
              id="email"
              className="bg-transparent flex-1 outline-none"
              type="email"
              size={1}
              placeholder="Your email"
              {...register("email", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email.",
                },
              })}
            />
          </div>
          <p className="mt-1 text-xs text-[#FF0000]">
            {errors.email ? errors.email.message : ""}
          </p>
        </div>
        <div>
          <label
            className="text-[#353945] text-sm font-normal leading-6"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mt-1 rounded-md py-3 px-4 bg-[#EDF2F7] flex items-center gap-x-3">
            <input
              id="password"
              className="bg-transparent flex-1 outline-none"
              type="password"
              size={1}
              placeholder="Your password"
              {...register("password", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password have to contain at least 8 characters, 1 number, 1 upper and 1 lowercase.",
                },
              })}
            />
            <div
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
              className="select-none cursor-pointer flex items-center h-full"
            >
              {hidePassword ? <Eye /> : <EyeSlash />}
            </div>
          </div>
          <p className="mt-1 text-xs text-[#FF0000]">
            {errors.password ? errors.password.message : ""}
          </p>
        </div>
        <div>
          <label
            className="text-[#353945] text-sm font-normal leading-6"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <div className="mt-1 rounded-md py-3 px-4 bg-[#EDF2F7] flex items-center gap-x-3">
            <input
              className="bg-transparent flex-1 outline-none"
              type="password"
              size={1}
              placeholder="Confirm your password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                validate: (value) => {
                  if (value !== password) {
                    return "Passwords do not match!";
                  }
                },
              })}
            />
            <div
              onClick={() => {
                setHidePassword(!hidePassword);
              }}
              className="select-none cursor-pointer flex items-center h-full"
            >
              {hidePassword ? <Eye /> : <EyeSlash />}
            </div>
          </div>
          <p className="mt-1 text-xs text-[#FF0000]">
            {errors.confirmPassword ? errors.confirmPassword.message : ""}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="accept"
              className="cursor-pointer"
              {...register("accept", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
            />
            <label htmlFor="accept" className="select-none">
              Accept terms of use and privacy policy
            </label>
          </div>
          <p className="mt-1 text-xs text-[#FF0000]">
            {errors.accept ? errors.accept.message : ""}
          </p>
        </div>
        <div
          onClick={handleSubmit(handleRegister)}
          className={`select-none flex items-center justify-center w-full py-3 px-4 bg-[#212529] text-white rounded-full outline-none hover:opacity-80 duration-300 ${
            isSubmit ? "cursor-default opacity-80" : "cursor-pointer"
          }`}
        >
          {isSubmit ? (
            <CircleNotch size={24} className="animate-spin" />
          ) : (
            "Register"
          )}
        </div>
        <div className="flex items-center gap-x-4">
          <span className="h-[1px] flex-1 bg-[#e3e3e4]"></span>
          <p className="text-[#718096] text-center text-xs font-normal leading-5">
            or do it via other accounts
          </p>
          <span className="h-[1px] flex-1 bg-[#e3e3e4]"></span>
        </div>
        <div className="flex items-center justify-center gap-x-4">
          <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full shadow cursor-pointer">
            <Image width={32} src={GoogleIcon} alt="google" />
          </div>
          <div className="bg-white w-14 h-14 flex items-center justify-center rounded-full shadow cursor-pointer">
            <Image width={30} src={FacebookIcon} alt="fb" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 text-base font-semibold leading-6 gap-x-2">
        <p className="text-[#777E90]">Haven an account?</p>
        <Link className="text-[#141416]" href={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Register;
