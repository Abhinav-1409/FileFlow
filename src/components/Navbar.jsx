"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    let isLogin = false;
  return (
    <nav className="navbar bg-[#A0C878] p-4 h-16 flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" alt="logo" height={60} width={100} />
      </Link>
      <div className="flex space-x-4">
        <Link href="/about" className="m-1 p-2 border border-[#A0C878] bg-[#A0C878] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          About
        </Link>
        <Link href="/contact" className="m-1 p-2 border border-[#A0C878] bg-[#A0C878] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          Contact Us
        </Link>
        {!isLogin && <Link href="/login" className="m-1 p-2 border border-[#A0C878] bg-[#A0C878] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          Login
        </Link>}
        {!isLogin && <Link href="/signup" className="m-1 p-2 border border-[#A0C878] bg-[#A0C878] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          Signup
        </Link>}
        {isLogin && <Link href="/dashboard" className="m-1 p-2 border border-[#A0C878] bg-[#A0C878] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          Dashboard
        </Link>}
      </div>
    </nav>
  );
}
