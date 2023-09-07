import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "./strapi";

export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
      maxAge: 60 * 10 * 10,
    },
    providers: [
      CredentialsProvider({
        name: "Sign in",
        credentials: {
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
                id: "1",
                name: username
            }
        }
      }),
    ],
  };