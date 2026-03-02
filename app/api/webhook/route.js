/*
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { headers } from "next/headers";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(req) {
 const body = await req.text();
 const sig = headers().get("stripe-signature");


 const event = stripe.webhooks.constructEvent(
   body,
   sig,
   process.env.STRIPE_WEBHOOK_SECRET
 );


 if (event.type === "checkout.session.completed") {
   const session = event.data.object;
   const orderId = session.success_url.split("order=")[1];


   await prisma.order.update({
     where: { id: Number(orderId) },
     data: { paid: true },
   });
 }


 return new Response(null, { status: 200 });
}

*/
