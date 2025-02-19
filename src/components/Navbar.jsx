"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    let isLogin = false;
  return (
    <nav className="navbar bg-gray-200 h-16 flex justify-between items-center shadow-md p-4">
      <div className="shadow-md rounded-lg h-12 flex flex-col items-start justify-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" height={40} width={100} />
        </Link>
        </div>
      <div className="flex space-x-4">
        <Link href="/about" className="m-1 p-2  shadow-md bg-gray-200 hover:bg-gray-300 rounded-xl text-lg font-semibold text-gray-700 hover:text-gray-900 ">
          About
        </Link>
        <Link href="/contact" className="m-1 p-2 shadow-md bg-gray-200 hover:bg-gray-300 rounded-xl text-lg font-semibold text-gray-700 hover:text-gray-900 ">
          Contact Us
        </Link>
        {!isLogin && <Link href="/login" className="m-1 p-2  shadow-md bg-gray-200 hover:bg-gray-300 rounded-xl text-lg font-semibold text-gray-700 hover:text-gray-900 ">
          Login
        </Link>}
        {!isLogin && <Link href="/signup" className="m-1 p-2  shadow-md bg-gray-200 hover:bg-gray-300 rounded-xl text-lg font-semibold text-gray-700 hover:text-gray-900 ">
          Signup
        </Link>}
        {isLogin && <Link href="/dashboard" className="m-1 p-2  shadow-md bg-gray-200 hover:bg-gray-300 rounded-xl text-lg font-semibold text-gray-700 hover:text-gray-900 ">
          Dashboard
        </Link>}
      </div>
    </nav>
  );
}
