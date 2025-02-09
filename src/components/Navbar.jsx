"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    let isLogin = false;
  return (
    <nav className="navbar bg-[#DDEB9D] p-4 h-16 flex justify-between items-center">
      <Link href="/">
        <Image src="/logo.png" alt="logo" height={60} width={100} />
      </Link>
      <div className="flex space-x-4">
        <Link href="/about" className="m-1 p-2 border border-[#DDEB9D] bg-[#DDEB9D] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          About
        </Link>
        <Link href="/contact" className="m-1 p-2 border border-[#DDEB9D] bg-[#DDEB9D] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          Contact Us
        </Link>
        {!isLogin && <Link href="/auth" className="m-1 p-2 border border-[#DDEB9D] bg-[#DDEB9D] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          Login/Signup
        </Link>}
        {isLogin && <Link href="/dashboard" className="m-1 p-2 border border-[#DDEB9D] bg-[#DDEB9D] hover:bg-[#A0C878] rounded-2xl text-lg font-semibold text-[#27667B] hover:text-[#143D60] ">
          Dashboard
        </Link>}
      </div>
    </nav>
  );
}
