import mongoose from "mongoose";
import { Product } from "../models/Product";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    info: { type: String, required: true },
}, { timestamps: true });
// keeping timestamps true gives us created_at and updated_at fields automatically

const ProductTable: mongoose.Model<Product> = mongoose.model<Product>('product', productSchema);
export default ProductTable;



// a chore commit since users wont be able to see the functionalities and these are internal so far.