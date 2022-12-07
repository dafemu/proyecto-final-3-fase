const variableEntorno = 'mongo';

let productosDao;
let carritosDao;
let usuariosDao;

switch (variableEntorno) {
    case 'mongo':
        const { default: ProductosDaoMongo } =  await import('./productos/ProductosDaoMongo.js');
        const { default: CarritosDaoMongo } = await import('./carritos/CarritosDaoMongo.js');
        const { default: UserDaoMongoDb } = await import('./usuarios/UsuariosDaoMongoDb.js');

        productosDao = new ProductosDaoMongo();
        carritosDao = new CarritosDaoMongo();
        usuariosDao = new UserDaoMongoDb();
    break;

    case 'firebase':
        const daoProductosFirebase = import('./productos/ProductosDaoFirebase');
        const daoCarritosFirebase = import('./carritos/CarritosDaoFirebase');

        productosDao = new daoProductosFirebase();
        carritosDao = new daoCarritosFirebase();
    break;

    case 'memoria':
        const ProductosDaoMemoria = import('../daos/productos/ProductosDaoMemoria.js');
        const CarritosDaoMemoria = import('../daos/carritos/CarritosDaoMemoria.js');

        productosDao = new ProductosDaoMemoria();
        carritosDao = new CarritosDaoMemoria();
    break;

    default:
        const ProductosDaoArchivo = import('../daos/productos/ProductosDaoArchivo.js');
        const CarritosDaoArchivo = import('../daos/carritos/CarritosDaoArchivo.js');
    
        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
    break;
}

//exporto lo que este usando
export default { productosDao, carritosDao, usuariosDao };