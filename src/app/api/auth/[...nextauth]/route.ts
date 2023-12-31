import { authOptions } from "@/app/_utils/session";
import NextAuth, { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
