"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { CircleDashed, Mail, Lock, User, Eye, EyeClosed } from "lucide-react";
import toast from "react-hot-toast";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import Graphic from "@/public/images/login_graphic.png";

// Define a type for the form data
interface FormData {
  name: string;
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [submit, setSubmit] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const submitForm: SubmitHandler<FormData> = async (data: FormData) => {
    setSubmit(true);

    try {
      const response = await axios.post("/api/auth/register", data);
      toast.success(response.data.msg);
      toast.success("Please Login with your account.");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (e: any) {
      toast.error(e?.response?.data?.error || "Registration failed");
      console.log(e?.response?.data?.error);
      setSubmit(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="font-body text-6xl font-bold flex flex-col-reverse items-center lg:flex-row flex-reverse gap-8 items-center justify-center mb-5">
        <h1 className="text-center">
          Bring <span className="text-primary">Ideas</span> to{" "}
          <span className="text-primary">Life!</span>
        </h1>
        <Image src={Graphic} alt="graphic" />
      </div>

      <div className="w-[380px] lg:w-[529px] bg-background mt-10 rounded-lg border border-grey-100 shadow-sm font-body py-[50px] px-[20px] lg:py-[50px] lg:px-[70px]">
        <h2 className="text-center text-3xl font-bold mb-8">Register</h2>

        {/* Registration Form */}
        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-4 top-4 text-gray-400" size={25} />
            <Input
              type="text"
              placeholder="Name"
              className="pl-16 pr-4 py-2 rounded-[16px] h-[56px] lg:text-lg"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
            />
            {errors.name && (
              <span className="text-destructive text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-gray-400" size={25} />
            <Input
              type="email"
              placeholder="Email"
              className="pl-16 pr-4 py-2 rounded-[16px] h-[56px] lg:text-lg"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-destructive text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={25} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-16 pr-12 py-2 rounded-[16px] h-[56px] focus:outline-none lg:text-lg"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {/* Eye Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400 focus:outline-none"
            >
              {showPassword ? (
                <EyeClosed className="transition-all duration-300" size={25} />
              ) : (
                <Eye className="transition-all duration-300" size={25} />
              )}
            </button>
            {errors.password && (
              <span className="text-destructive text-sm">{errors?.password?.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary flex justify-center items-center gap-4 text-white font-semibold py-2 rounded-lg hover:bg-primary/90 py-2 rounded-[16px] h-[56px]"
            disabled={submit}
          >
            {submit ? <CircleDashed className="w-[20px] animate-spin" /> : ""}
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
