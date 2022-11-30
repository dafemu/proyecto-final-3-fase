import mongoose from "mongoose";

const carritoCollection = 'carritos';

const carritoSchema = new mongoose.Schema({
    carrito : { type: String, require: true, max: 100 },
});

export const Carrito = mongoose.model(carritoCollection, carritoSchema);