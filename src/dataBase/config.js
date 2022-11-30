import mongoose from "mongoose";

// mongoose.connect("mongodb://localhost:27017/passport-mongo");
mongoose.connect("mongodb://localhost:27017/passport-mongo", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  

mongoose.connection.on('open', _ => {
    console.log('Te has conectado a la BD');
})
.on('error', (error) => {
    console.log('Error en la conexion a la BD: ', error);
})

export default mongoose;
