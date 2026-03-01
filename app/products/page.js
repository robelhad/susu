export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
//import ProductCard from "./ProductCard";
import Link from "next/link";
import ProductsClient from "./ProductsClient";
import { NextResponse } from "next/server";
const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL  ,
  token: process.env.UPSTASH_REDIS_REST_TOKEN ,
});



export default async function ProductsPage() {

  let products = null; // = await repo.find();
  try {

    //  try {
    // 1️⃣ Check cache first
    const cached = await redis.get("products");

    if (cached) {
      console.log("Serving from Redis cache");
      //return res.json(cached);
      products = cached;
    }
    else {
  
      products = await prisma.product.findMany();
       await redis.set("products", products, { ex: 300 });

    console.log("Serving from database");
    //res.json(products);
    }
    const safeProducts = JSON.parse(JSON.stringify(products));
    return (
    <ProductsClient products={safeProducts?? []} />
      //renderPage("Products - Susu's Macaroon Market", html)
  );
        } catch (error) {
      console.error("Error fetching products:", error);
      return <div>Error loading products</div>;
    }

  
}