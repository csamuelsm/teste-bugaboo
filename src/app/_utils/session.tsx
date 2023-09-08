import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "./strapi";

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 60 * 10 * 10,
    },
    providers: [
      CredentialsProvider({
        name: "Sign in",
        credentials: {
          id: {
            label: "id",
            type: "number",
          },
          user: {
            label: "User",
            type: "text",
          },
          password: { label: "Password", type: "password" },
        },
        //@ts-ignore
        async authorize(credentials, req) {
            let username = credentials?.user;
            console.log("authorizing", username)
            return {
                name: credentials?.id,
            }
        }
      }),
    ],
  };