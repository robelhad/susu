import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(request) {
 try {
   const { name, address, cartItems } = await request.json();


   //const ds = await getDataSource();
   //const repo = ds.getRepository("Order");

  if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

   const total = cartItems.reduce(
     (sum, item) => sum + item.price * item.quantity,
     0
   );

/*
   const order = {
     name,
     address,
     total,
     orderItems: cartItems.map(item => ({
       productName: item.name,
       productPrice: item.price,
       quantity: item.quantity
     }))
   };
   const saved = await repo.save(order);


   return NextResponse.json({
     success: true,
     orderId: saved.id
   });
*/
 const order = await prisma.order.create({
   data: {
     name,
     address,
     total,
     items: {
       create: cartItems.map((item) => ({
         productName: item.name,
         productPrice: item.price,
         quantity: item.quantity,
       })),
     },
   },
 });


 const session = await stripe.checkout.sessions.create({
   payment_method_types: ["card"],
   line_items: cartItems.map((item) => ({
     price_data: {
       currency: "usd",
       product_data: { name: item.name },
       unit_amount: Math.round(item.price * 100),
     },
     quantity: item.quantity,
   })),
   mode: "payment",
   success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?order=${order.id}`,
   cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
 });


 return NextResponse.json({ url: session.url });


 } catch (err) {
   return NextResponse.json(
     { error: err.message },
     { status: 500 }
   );
 }
}
