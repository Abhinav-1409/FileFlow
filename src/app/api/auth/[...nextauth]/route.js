import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";

import Users from "../../../../models/user";
import tokenUtils from "@/utils/token";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/services/connection";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        try {
          console.log(credentials);
          const token = await Users.validateUserLogin(
            credentials.email,
            credentials.password
          );
          const user = await tokenUtils.verifyToken(token);
          return user;
        } catch (e) {
          throw new Error(e);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.sub;
      if (Users.findOne({ email: session.user.email })) {
        const sessionToken = Users.validateUserLogin;
      }
      if(user){
        console.log(user);
        session.user = user;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
