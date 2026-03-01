import { EntitySchema } from "typeorm";


export const Order = new EntitySchema({
 name: "Order",
 tableName: "orders",
 columns: {
   id: { primary: true, type: "int", generated: true },
   name: { type: "varchar" },
   address: { type: "varchar" },
   total: { type: "float" },
   createdAt: { type: "timestamp", createDate: true }
 },
 relations: {
   orderItems: {
     type: "one-to-many",
     target: "OrderItem",
     inverseSide: "order",
     cascade: true
   }
 }
});

