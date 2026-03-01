import { prisma } from "@/lib/prisma";


export default async function AdminPage() {
 const orders = await prisma.order.findMany({
   include: { items: true },
   orderBy: { createdAt: "desc" },
 });


 return (
   <div>
     <h1>Admin Dashboard</h1>
     {orders.map((order) => (
       <div key={order.id} className="card">
         <h3>Order #{order.id}</h3>
         <p>{order.name}</p>
         <p>${order.total}</p>
         <p>Status: {order.paid ? "Paid" : "Pending"}</p>
       </div>
     ))}
   </div>
 );
}
