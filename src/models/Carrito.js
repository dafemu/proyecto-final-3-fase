import mongoose from "mongoose";

const carritoCollection = 'carritos';

const carritoSchema = new mongoose.Schema({
    products: {type: Array, required: true}, 
    userId: { type: String, required: true, max: 100 }, 
});

export const Carrito = mongoose.model(carritoCollection, carritoSchema);