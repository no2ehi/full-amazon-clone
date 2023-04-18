import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    console.log('>> session: ',req.nextUrl)
    const { pathname, origin } = req.nextUrl;
    const session = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === "production"
    });

    

    if(pathname == "/checkout") {
        if(!session) return NextResponse.redirect(`${origin}`);
    }
    if(pathname.startsWidth("/order")) {
        if(!session) return NextResponse.redirect(`${origin}`);
    }
    if(pathname.startsWidth("/profile")) {
        if(!session) return NextResponse.redirect(`${origin}`);
    }
    if(pathname.startsWidth("/admin")) {
        if(!session) return NextResponse.redirect(`${origin}`);
        if( session.role !== "admin" ) return NextResponse.redirect(`${origin}`);
    }


}