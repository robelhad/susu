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

function renderPage(title, content) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>${title}</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
      <style>
        body { padding-top: 50px; }
        .container { max-width: 800px; }
        /* Fireworks animation styles */
        .fireworks-container {
          position: absolute;
          pointer-events: none;
        }
        .firework {
          position: absolute;
          width: 8px;
          height: 8px;
          background: gold;
          border-radius: 50%;
          opacity: 1;
          animation: firework-animation 0.8s ease-out forwards;
        }
        @keyframes firework-animation {
          0% { transform: translate(0, 0); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${content}
      </div>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </body>
  </html>
  `;
}


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
    return (
    <ProductsClient products={products} />
      //renderPage("Products - Susu's Macaroon Market", html)
  );
        } catch (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
    }

  
}