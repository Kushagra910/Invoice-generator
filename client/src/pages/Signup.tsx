import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authApi";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../slices/invoiceSlic";

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    // Handle form submission
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords Do not Match");
      return;
    }
    dispatch<any>(signUp(data.firstName , data.lastName, data.email , data.password , data.confirmPassword,navigate ));
    dispatch(setUser(data));
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#36393f] dark:bg-[#36393f] ">
      <div className="grid w-full max-w-[900px] grid-cols-1 gap-8 rounded-lg bg-[#2f3136] p-6 shadow-xl md:grid-cols-2 font-comfortaa pt-9">
        <div className="relative flex items-center justify-center rounded-lg">
          <img
            src="/Sign up-rafiki.svg"
            alt="Sign in"
            className="w-full h-auto object-contain hidden md:block"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <div className="text-[#dcddde] flex flex-col justify-center items-center gap-2">
            <h1 className="text-3xl font-extrabold">Sign In</h1>
            <div>
              Already have an account? <Link to="/login"><span className="underline font-bold">Login</span></Link>
            </div>
          </div>
          <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-richblack-50 font-bold">
                  First Name
                </label>
                <input
                  id="first-name"
                  placeholder="John"
                  className="bg-[#40444b] text-richblack-50 px-2 py-2 rounded-lg"
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && <p className="text-pink-200">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-richblack-50 font-bold">
                  Last Name
                </label>
                <input
                  id="last-name"
                  placeholder="Doe"
                  className="bg-[#40444b] text-[#dcddde] px-2 py-2 rounded-lg"
                  {...register("lastName", { required: "Last name is required" })}
                />
                {errors.lastName && <p className="text-pink-200">{errors.lastName.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-richblack-50 font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@discord.com"
                className="bg-[#40444b] text-richblack-5 px-2 py-2 rounded-lg w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="text-pink-200">{errors.email.message}</p>}
            </div>
            <div className="space-y-2 relative">
              <label htmlFor="password" className="text-richblack-50 font-bold">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="bg-[#40444b] text-richblack-5 px-2 py-2 rounded-lg w-full"
                {...register("password", { required: "Password is required" })}
              />
              <span
                onClick={toggleShowPassword}
                className="absolute top-8 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
              >
                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </span>
              {errors.password && <p className="text-pink-200">{errors.password.message}</p>}
            </div>
            <div className="space-y-2 relative">
              <label htmlFor="confirm-password" className="text-richblack-50 font-bold w-full">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                className="bg-[#40444b] text-richblack-5 font-bold px-2 py-2 rounded-lg w-full"
                {...register("confirmPassword", { required: "Confirm Password is required" })}
              />
              <span
                onClick={toggleShowConfirmPassword}
                className="absolute top-8 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
              >
                {showConfirmPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </span>
              {errors.confirmPassword && <p className="text-pink-200">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" className="bg-[#7289da] text-[#dcddde] hover:bg-[#5b6eae] px-2 py-3 rounded-lg">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
