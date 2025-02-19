// "use server"
// import { NextResponse } from "next/server";

// export function middleware(request) {

//     const token = request.cookies.get("uid")?.value; 
    
//     if (!token) {
//         return NextResponse.redirect(new URL("/login", request.url)); // Redirect if no token
//     }

//     return NextResponse.next();
// }
// // export const config = {
// //     matcher: "/*", // ✅ Apply middleware to ALL pages
// // };
