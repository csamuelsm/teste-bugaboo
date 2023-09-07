import { authOptions } from "@/app/_utils/session";
import NextAuth, { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};

/*export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        autheticated: !!session,
        session,
    })
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    return NextResponse.json({
        message: "POST funcionando",
        session: session
    })
}*/

/*export async function POST(request: Request, response:Response) {
    let data = await request.json()
    //console.log(data);
    const session = await getSession(request, response);
    session.loggedIn = true;
    return NextResponse.json({
        message: data.user
    })
}*/