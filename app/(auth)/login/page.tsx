"use client";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, CircleDashed } from "lucide-react"; // Icons for email, password, and eye toggle
import { Input } from "@/components/ui/input"; // Shadcn Input Component
import Graphic from "@/public/images/login_graphic.png";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { UserLoginSchema } from "@/components/schema/user";

interface FormData {
  email: string;
  password: string;
}

interface ErrorType {
  email?: string;
  password?: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  console.log(session.status);

  const submitHandler: SubmitHandler<FormData> = async (data) => {
    toast.success("Ashir");
    const msg = await UserLoginSchema(data);
    if (true != true) {
      Object.entries(msg).forEach(([key, value]) => {
        setError(key as keyof ErrorType, { message: value as string });
      });
      toast.error("Validation Error!");
    } else {
      const signin = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signin?.error) {
        toast.error("Invalid Username or Password");
      } else {
        toast.success("Login Successful");
        setTimeout(() => {
          router.push("/dashboard");
        }, 500);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex  justify-between items-center justify-center ">
      <div className="w-full min-h-screen lg:w-4/12 bg-background  rounded-lg border border-grey-100 shadow-sm font-body  flex flex-col justify-between">
        <div className="px-8 pt-8"><Image
                      src="/logo.png"
                      width={120}
                      height={100}
                      alt="Logo"
                    /></div>
        <div className="py-[50px] px-[20px] lg:py-[50px] lg:px-[70px]">
          <h2 className="text-center text-3xl font-bold mb-8">Login</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
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
                <span className="text-destructive text-sm">
                  {errors.email.message}
                </span>
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
                className="absolute right-4 top-4 text-gray-400 focus:outline-none "
              >
                {showPassword ? (
                  <EyeOff className="transition-all duration-300" size={25} />
                ) : (
                  <Eye className="transition-all duration-300" size={25} />
                )}
              </button>
              {errors.password && (
                <span className="text-destructive text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center gap-4 items-center bg-primary text-white font-semibold py-2 rounded-lg hover:bg-blue-400 py-2 rounded-[16px] h-[56px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircleDashed className="w-[20px] animate-spin" />
              ) : (
                ""
              )}
              Login
            </button>
          </form>
        </div>
        <div className="flex w-full justify-center pb-8"><p className="font-body text-sm text-gray-600 font-semibold">Copyright &copy; 2025</p></div>
      </div>
      <div className="w-4/6 flex-col items-center justify-center hidden lg:flex">
        <div className="font-heading text-6xl font-bold  flex flex-col-reverse items-center lg:flex-row flex-reverse gap-8 items-center justify-center mb-5">
          <h1 className="text-center">
            Bring <span className="text-primary">Ideas</span> to{" "}
            <span className="text-primary">Life!</span>
          </h1>
          <Image src={Graphic} alt="graphic" className="w-32" />
        </div>
        <img src="/images/social-media.png" className="w-[900px]" />
      </div>
    </div>
  );
}
