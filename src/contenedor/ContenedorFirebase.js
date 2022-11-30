import { credential, firestore } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
const serviceAccount = './db/test-coder-928b9-firebase-adminsdk-pbxfh-d4e455f2e3.json';

initializeApp({credential: credential.cert(serviceAccount)});

const db = firestore();
class ContenedorFirebase {
    constructor(coleccion){
        this.coleccion = db.collection(coleccion);
    }

    created(nuevoElemento){
        // await doc.create(collectionData);
        let doc = this.coleccion.doc();
        const crearElemento = doc.create(nuevoElemento);
        return {
            ...nuevoElemento,
            id: crearElemento.id
        };
    }

    read(){
        this.coleccion.get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.id,
                doc.data();
            });
        })
    }

    update(idElemento, nuevoElemento){
        this.coleccion
        .where('id', "==", idElemento)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.update(nuevoElemento);
            });
        });
    }

    delete(idElemento){
        this.coleccion
        .where('id', "==", idElemento)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                doc.ref.delete();
            });
        });
    }
}
export default ContenedorFirebase;