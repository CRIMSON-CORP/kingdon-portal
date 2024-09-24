import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "./axios";

export const nextAuthOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      name: "auth",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const response = await axios.post("/auth/login", {
            username: credentials?.username,
            password: credentials?.password,
          });

          const { code, data: responseData } = response.data;

          if (code === 200) {
            return { ...responseData.user, token: responseData.token };
          } else throw response;
        } catch (error: any) {
          console.log(error);
          throw new Error(error.response?.data?.message || error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session(params) {
      const { session, token } = params;
      session.user = token;
      return session;
    },
    async redirect(params) {
      const { url } = params;
      if (url.startsWith("/")) return `${process.env.NEXTAUTH_URL}${url}`;
      return `${process.env.NEXTAUTH_URL}/${new URL(url).pathname}`;
    },
  },
  jwt: {
    maxAge: 60 * 59,
  },
};
