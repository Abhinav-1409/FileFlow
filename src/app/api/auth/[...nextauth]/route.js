import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import Users from "../../../../models/user";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const token = await Users.validateUserLogin(
            credentials.email,
            credentials.password
          );
          const response = NextResponse.json(
            { error: "success" },
            { status: 200 }
          );
          response.cookies.set("uid", token, {
            httpOnly: true,
            secure: true,
            path: "/",
          });
          return response;
        } catch (e) {
          return NextResponse.json({error : e.message},{status : 400});
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      console.log(session);
      console.log(token);
      if (Users.findOne({ email: session.user.email })) {
        const sessionToken = Users.validateUserLogin;
      }
      // session.provider = 'google';
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
