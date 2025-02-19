"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const Login = () => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const url = process.env.URL;

  const onSubmit = async (data) => {
    const response = await fetch(`/api/login`,{
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'}
    } )
    if(!response.ok){
      const responseData = await response.json();
      setError(responseData.error);
    }
    router.push("/");
  };

  const [hiddenPassword, setHiddenPassword] = useState(true);
  const [error, setError] = useState("");
  ;
  return (
    <div className="h-screen bg-gray-50 ">
      <div className="flex justify-center h-screen items-center relative top-0 shadow-md">
        <div className="bg-gray-100 p-10 rounded-lg shadow-lg h-3/5 w-2/5 flex justify-center items-center flex-col">
          <h1 className="text-2xl font-semibold mb-5 text-gray-700 ">Login</h1>
          <form
            className="w-2/3 flex justify-center flex-col items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-5 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2f3841] bg-gray-200"
                {...register("email", {
                  required: {
                    message: "Email is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-5 w-full relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type={hiddenPassword ? "password" : "text"}
                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2f3841] bg-gray-200"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setHiddenPassword(!hiddenPassword)}
                className="absolute top-2/3 right-3 transform -translate-y-1/2"
              >
                <Image
                  src={hiddenPassword ? "/show.ico" : "/hide.ico"}
                  alt="Toggle Password"
                  width={24}
                  height={24}
                />
              </button>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-lg w-1/3"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
      <script src="https://apis.google.com/js/platform.js" async defer></script>
    </div>
    
  );
};
export default Login;
