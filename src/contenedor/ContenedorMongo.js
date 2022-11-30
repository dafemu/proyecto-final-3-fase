import mongoose from "mongoose";

await mongoose.connect('mongodb://localhost:27017/passport-mongo');
class ContenedorMongo {
    constructor(modelo){
        this.modelo = modelo;
    }

    async created(nuevoElemento){
        const crearElemento = new this.modelo(nuevoElemento);
        await crearElemento.save();
        return {
            ...nuevoElemento,
            id: crearElemento.id
        };
    }

    async read(){
        const elementos = await this.modelo.find();
        return elementos;
    }

    async update(idElemento, nuevoElemento){
        const elementoActualizar = await this.modelo.findOneAndUpdate({
            idElemento,
            nuevoElemento
        });
        return elementoActualizar;
    }

    async delete(idElemento){
        const elementoEliminar = await this.modelo.deleteOne(idElemento);
        return elementoEliminar;
    }

    async desconectar(){
        try {
            mongoose.disconnect();
        }catch(error){
            console.log(error);
        }
    }
}
export default ContenedorMongo;