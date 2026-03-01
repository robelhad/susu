import { NextResponse } from "next/server";


export function middleware(req) {
 if (req.nextUrl.pathname.startsWith("/admin")) {
   const auth = req.headers.get("authorization");


   if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
     return new NextResponse("Unauthorized", { status: 401 });
   }
 }
}
