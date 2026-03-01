import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db";
import { prisma } from "@/lib/prisma";


export async function GET() {
 try {
   const ds = await getDataSource();
   const repo = ds.getRepository("Product");
   //const products = await repo.find();
   const products = await prisma.product.findMany();


   return NextResponse.json(products);
 } catch (err) {
   return NextResponse.json(
     { error: err.message },
     { status: 500 }
   );
 }
}
