const variableEntorno = 'mongo';

let productosDao;
let carritosDao;

switch (variableEntorno) {
    case 'mongo':
        const { default: ProductosDaoMongo } =  await import('./productos/ProductosDaoMongo.js');
        const { default: CarritosDaoMongo } = await import('./carritos/CarritosDaoMongo.js');

        productosDao = new ProductosDaoMongo();
        carritosDao = new CarritosDaoMongo();
        break;

    case 'firebase':
        const daoProductosFirebase = import('./productos/ProductosDaoFirebase');
        const daoCarritosFirebase = import('./carritos/CarritosDaoFirebase');

        productosDao = new daoProductosFirebase();
        carritosDao = new daoCarritosFirebase();
    break;
}

//exporto lo que este usando
export default { productosDao, carritosDao };