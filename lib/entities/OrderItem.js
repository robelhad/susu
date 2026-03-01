import { EntitySchema } from "typeorm";


export const OrderItem = new EntitySchema({
 name: "OrderItem",
 tableName: "order_items",
 columns: {
   id: { primary: true, type: "int", generated: true },
   productName: { type: "varchar" },
   productPrice: { type: "float" },
   quantity: { type: "int", default: 1 }
 },
 relations: {
   order: {
     type: "many-to-one",
     target: "Order",
     joinColumn: true,
     onDelete: "CASCADE"
   }
 }
});
