import mongoose from "mongoose";

export interface Product extends mongoose.Document {
    name: string;
    image: string;
    price: number;
    quantity: number;
    info: string;
    createdAt?: Date;
    updatedAt?: Date;
}