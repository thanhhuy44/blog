import React, { useState } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { CircleNotch, Eye, EyeSlash } from "@phosphor-icons/react";
import Link from "next/link";
import { ReactElement } from "react";
import GoogleIcon from "@/assets/icons/google.svg";
import FacebookIcon from "@/assets/icons/facebook.svg";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import FacebookLogin from "@greatsumini/react-facebook-login";
import AuthApi from "@/api/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { AppDispatch, AppState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/interface";
import { setIslogin, setUser } from "@/redux/states/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface RegisterFormInputs {
  email: string;
  password: string;
}

function Login() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  const handleLogin: SubmitHandler<RegisterFormInputs> = async (data: any) => {
    if (!isSubmit) {
      setIsSubmit(true);
      const response = await AuthApi.loginLocal(data);
      if (response) {
        dispatch(setUser(response as User));
        dispatch(setIslogin(true));
        setTimeout(() => {
          setIsSubmit(false);
          toast.success("Login success!");
          router.replace("/");
        }, 1500);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
  return (
    <div className="w-full max-w-[384px]">
      <div className="text-[#141416]">
        <h1 className="text-2xl font-semibold leading-8">Welcome back!</h1>
        <p className="text-base font-normal leading-6">Sign in</p>
      </div>
      <div className="mt-14 flex flex-col gap-y-7">
        <div>
          <label
            className="text-[#353945] text-sm font-normal leading-6"
            htmlFor="email"
          >
            Email
          </label>
          <div className="mt-1 rounded-md py-3 px-4 bg-[#EDF2F7] flex items-center gap-x-3">
            <input
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
        <div className="-mt-4 flex justify-end">
          <Link href={"/forgot-password"}>Forgot password?</Link>
        </div>
        <div
          onClick={handleSubmit(handleLogin)}
          className={`flex items-center justify-center w-full py-3 px-4 bg-[#212529] text-white rounded-full select-none hover:opacity-80 duration-300 ${
            isSubmit ? "cursor-text opacity-80" : "cursor-pointer "
          }`}
        >
          {isSubmit ? (
            <CircleNotch className="animate-spin" size={24} />
          ) : (
            "Login"
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
          <div
            onClick={() => {
              login();
            }}
            className="bg-white w-14 h-14 flex items-center justify-center rounded-full shadow cursor-pointer"
          >
            <Image width={32} src={GoogleIcon} alt="google" />
          </div>
          <FacebookLogin
            appId="847018003600123"
            onSuccess={(response) => {
              console.log("Login Success!", response);
            }}
            onFail={(error) => {
              console.log("Login Failed!", error);
            }}
            onProfileSuccess={(response) => {
              console.log("Get Profile Success!", response);
            }}
            render={({ onClick, logout }) => (
              <div
                onClick={onClick}
                className="bg-white w-14 h-14 flex items-center justify-center rounded-full shadow cursor-pointer"
              >
                <Image width={30} src={FacebookIcon} alt="fb" />
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 text-base font-semibold leading-6 gap-x-2">
        <p className="text-[#777E90]">Don’t have an account?</p>
        <Link className="text-[#141416]" href={"/register"}>
          Register
        </Link>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Login;
