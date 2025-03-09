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
    const response = await fetch(`/api/shortUrl`,{
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

  const items = [
    {
      id: 1,
      title: "Image Conversion",
      content: (
        <form
          className="w-2/3 flex justify-center flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input id></input>
        </form>
      ),
    },
    {
      id: 2,
      title: "Image Compression",
      content: "Form for Image Compression",
    },
    { id: 3, title: "File Sharing", content: "Form for File Sharing" },
    {
      id: 4,
      title: "URL Shortening",
      content: (
        <form
          className="w-2/3 flex justify-center flex-col items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
          id='url'
          type="text"
          {...register("url", {
            required: {
              message: "Email is required",
            },
          })}
          ></input>
          <button type="submit">Submit</button>
        </form>
      ),
    },
    {
      id: 5,
      title: "PDF Text Extraction",
      content: "Form for PDF Text Extraction",
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
