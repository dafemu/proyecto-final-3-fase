import twilio from 'twilio';

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;

const client = twilio(accountSid, authToken);

const sendSMS = async (data) => {
  try {
    const message = await client.messages.create({
      body: 'Su pedido ha sido Realizado y se encuentra en Proceso. Nos contactaremos con usted para confirmar el envio.',
      from: process.env.TWILIONUMBER,
      to: data
    });
    console.log(message.sid);
  }
  catch (error) {
    console.log(error);
  }

}

export default sendSMS;


