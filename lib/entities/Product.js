import { EntitySchema } from "typeorm";


export const Product = new EntitySchema({
 name: "Product",
 tableName: "products",
 columns: {
   id: { primary: true, type: "int", generated: true },
   name: { type: "varchar" },
   price: { type: "float" },
   image: { type: "varchar" }
 }
});
