import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authApi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log("LOGIN INPUT", data);
    // Handle login logic here
    dispatch<any>(login(data.email, data.password, navigate));
    setFormError(null); // Clear any previous errors
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-[#7289da] to-[#5865f2] px-4 py-12 font-comfortaa ">
      <div className="w-full max-w-md rounded-2xl bg-gray-950 p-6 shadow-xl transition-all duration-300 hover:shadow-2xl bg-richblack-700">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 items-center justify-center">
            {/* ICON */}
            <h1 className="text-4xl font-extrabold text-gray-50 text-richblue-5">Login</h1>
            <div className="text-sm font-bold text-richblack-5 ">Don't have an account ? <Link to={'/signup'}><span className="underline ">create</span></Link></div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="text-richblue-5 font-bold text-lg">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="mt-1 w-full rounded-md border-gray-700 bg-gray-800 px-3 py-2 text-gray-50 focus:border-[#7289da] focus:ring-[#7289da]"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="font-bold text-pink-100">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-richblue-5 font-bold text-lg">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="mt-1 w-full rounded-md border-gray-700 bg-gray-800 px-3 py-2 text-gray-50 focus:border-[#7289da] focus:ring-[#7289da]"
                {...register("password", { required: "Password is required" })}
              />
              <span 
                onClick={toggleShowPassword} 
                className="absolute  right-0 flex items-center pr-3  cursor-pointer text-gray-400 top-10"
              >
                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24}/>}
              </span>
              {errors.password && <p className="font-bold text-pink-100">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-[#7289da] px-4 py-2 text-gray-50 transition-colors duration-300 hover:bg-[#5865f2]"
            >
              Login
            </button>
          </form>
          {formError && <p className="text-red-500">{formError}</p>}
        </div>
      </div>
    </div>
  );
}
