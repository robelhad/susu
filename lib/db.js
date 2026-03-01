import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
let dataSource;


export async function getDataSource() {
 if (dataSource && dataSource.isInitialized) {
   return dataSource;
 }


 dataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: parseInt(process.env.DB_PORT),
   username: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   ssl: {
     rejectUnauthorized: false
   },
   synchronize: true,
   entities: [Product, Order, OrderItem]
 });


 if (!dataSource.isInitialized) {
   await dataSource.initialize();
 }


 return dataSource;
}

