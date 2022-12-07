import { createTransport } from "nodemailer";

const EMAIL = process.env.EMAIL;
const MAIL_PASS = process.env.MAILPASS;

const transporter = createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: EMAIL,
      pass: MAIL_PASS,
  }
});

const sendMail = async (data) => {  

  const emailContent = {
    from: 'Mi primer Email',
    to: EMAIL,
    subject: "Nuevo Registro",
    text: "Hello coders",    
    html: `<h1 style='color: black'>Nuevo Usuario Registrado</h1><p>Nombre: ${data.username}</p><p>Email: ${data.email}</p><p>Edad: ${data.edad}</p><p>Telefono: ${data.telefono}</p><p>Direccion: ${data.direccion}</p><p>Imagen: ${data.image}</p>`,  
  };

  try {
    const info = await transporter.sendMail(emailContent);     
  } catch (error) {
    console.log('erro de nodemailer', error);
  }

}


const newPurchase = async (data) => {  

  const usuario = data.userName;
  const email = data.userMail;
  const productos = data.products; 
  const productosArr = productos.map(el => el.name);

  const emailContent = {
    from: 'Mi primer Email',
    to: EMAIL,
    subject: "Nuevo Pedido de:",
    text: "Hello coders",    
    html: `
    <h3 style='color: black'>Nuevo Pedido de: ${usuario}</h3>
    <p>Email: ${email}</p>
    <p>Productos: ${productosArr}</p>      
    `, 
  };  

  try {
    const info = await transporter.sendMail(emailContent);     
  } catch (error) {
    console.log('erro de nodemailer', error);
  }

}

export {sendMail, newPurchase};