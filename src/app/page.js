"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`/api/shortUrl`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      const responseData = await response.json();
      setError(responseData.error);
    }
    router.push("/");
  };

  const items = [
    {
      id: 1,
      title: "Image Compression",
      content: "Form for Image Compression",
    },
    { id: 2, title: "File Sharing", content: "Form for File Sharing" },
    {
      id: 3,
      title: "URL Shortening",
      content: (
        <form
          className="w-2/3 flex justify-center flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-5 w-full">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-gray-700"
            >
              url
            </label>
            <input
              id="url"
              type="url"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2f3841] bg-gray-200"
              {...register("url", {
                required: {
                  message: "url is required",
                },
              })}
            />
            {errors.url && (
              <span className="text-red-500 text-sm">{errors.url.message}</span>
            )}
          </div>
          <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-700 text-white p-2 rounded-lg w-1/3"
            >
              Submit
            </button>
        </form>
      ),
    },
  ];

  const { data: session } = useSession();
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      {items.map((item) => (
        <div key={item.id} className="border rounded-lg shadow-md">
          <button
            onClick={() => toggle(item.id)}
            className="flex justify-between items-center w-full px-4 py-3 text-lg font-semibold bg-gray-200 rounded-lg"
          >
            {item.title}
            <span
              className={`transform transition-transform ${
                openId === item.id ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDown size={20} />
            </span>
          </button>
          {openId === item.id && (
            <div className="px-4 py-3 bg-white border-t transition-all duration-300">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
