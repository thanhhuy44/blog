import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FormInputs = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();

  const handleLogin = async (body: FormInputs) => {
    console.log("🚀 ~ file: login.tsx:15 ~ handleLogin ~ body:", body);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-y-8 items-start w-full max-w-md">
      <div>
        <p className="text-lg font-light">Welcome back!</p>
        <h1 className="font-bold text-3xl">Login</h1>
      </div>
      <div className="flex flex-col gap-y-4 w-full">
        <label className="form-control w-full">
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email", {
              required: {
                value: true,
                message: "This field is required!",
              },
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email!",
              },
            })}
          />
          <p className="mt-1 min-h-4 text-xs italic text-red-500">
            {errors.email?.message}
          </p>
        </label>
        <label className="form-control w-full">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password", {
              required: {
                value: true,
                message: "This field is required!",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g,
                message:
                  "Password must be >= 8 characters, >= 1 uppercase letter, >= 1 lowercase letter and >= 1 number",
              },
            })}
          />
          <p className="mt-1 min-h-4 text-xs italic text-red-500">
            {errors.password?.message}
          </p>
        </label>
      </div>
      <button
        onClick={handleSubmit(handleLogin)}
        className="btn w-full bg-gray-700 text-white hover:bg-gray-500"
      >
        Login
      </button>
    </div>
  );
}

export default Login;
