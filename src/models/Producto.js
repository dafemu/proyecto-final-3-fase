import mongoose from "mongoose";

const productoCollection = 'productos';

const productoSchema = new mongoose.Schema({
    nombre : { type: String, require: true, max: 100 },
    descripcion : { type: String, require: true, max: 100 },
    codigo : { type: String, require: true, max: 100 },
    foto : { type: String, require: true, max: 100 },
    precio : { type: Number, require: true },
    stock : { type: Number, require: true },
    timestamp: {type: String, required: true},
});

export const Producto = mongoose.model(productoCollection, productoSchema);