import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "./strapi";


/*
Inicializa o gerenciador de sessão
definindo dados das credenciais do usuário
e a função de autenticação. Neste caso, a
autenticação já é feita anteriormente pela
verificação diretamente no Strapi, portanto
só recebemos os dados do usuário quando ele
já está autenticado e inicamos sua sessão.
*/
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