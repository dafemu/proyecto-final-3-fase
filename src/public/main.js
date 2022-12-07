const socket = io();

const productoNombre = document.getElementById('productoNombre');
const productoPrecio = document.getElementById('productoPrecio');
const productoImagen = document.getElementById('productoImagen');
const formulario = document.getElementById('formulario');
const tablaProductos = document.getElementById('tableProductos');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("productoNombre: ", productoNombre.value);
    console.log("productoPrecio: ", productoPrecio.value);
    console.log("productoImagen: ", productoImagen.value);

    const producto = {
        title: productoNombre.value,
        price: productoPrecio.value,
        thumbnail: productoImagen.value,
    }

    socket.emit('nuevo-producto', producto);
    resetearFormulario();
});

function resetearFormulario(){
    formulario.reset();
}

socket.on('productos', data => {
    console.log("data cliente productos: ",data);
    renderProductos(data);
});

socket.on('mensajes', data => {
    console.log("data cliente mensaje: ",data);
    renderMensajes(data);
});

function renderMensajes(data){
    const html = data.map((elem, index) => {
        return (
            `<div>
                <strong class='text-primary'>${elem.author}</strong>
                <time class='text-muted'>${elem.date}</time>
                : <em>${elem.text}</em>
            </div>`
        )
    }).join(" ");
    const div = document.getElementById('mensajes');
    div.innerHTML = html;
}

function renderProductos(data){
    console.log("entra al render producto");

    const cartId = document.getElementById("cartId");
    const idCart = cartId.textContent;

    const conProducto = `
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
        </tr>
    </thead>
    `;
    const sinProducto = `
    <div class="alert alert-warning" role="alert">
        No se encontraron productos
    </div>
    `;

    const productoHTML = data.map((prod, index) => {
        return (`
            <tbody>
                <tr>
                    <td>${prod.title}</td>
                    <td>${prod.price}</td>
                    <td>
                        <img src="${prod.thumbnail}" class="img-thumbnail" alt="${prod.title}">
                    </td>
                    <td>
                        <button class="addBtn btn btn-primary" name="${idCart}" id="${el._id}">Add To Cart</button>   
                    </td>
                </tr>
            </tbody>
        `)
    }).join(" ");

    if(data.length > 0){
        tablaProductos.innerHTML = conProducto + productoHTML;

    }else{
        tablaProductos.innerHTML = sinProducto;
    }

    const addBtn = document.getElementsByClassName("addBtn");
    
    for (let btn of addBtn) {
        btn.addEventListener("click", (e) => {
            let idCart = e.target.name;
            let idProduct = e.target.id;
            addProduct(idCart, idProduct);
        });
    }
}

function addMessage(e){
    console.log("add  message");
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
        date: new Date(),
    };
    socket.emit('nuevo-mensaje', mensaje);

    return false;
}

const renderCounter = () => {
    const counter = document.getElementById("counter");
    const cartId = document.getElementById("cartId").innerHTML; 
    const URL = `/carrito/${cartId}/productos`;
  
    fetch(URL)
      .then(res => res.json())
      .then(res => {
        counter.innerHTML = `
          <p>${res.length}</p>
        `;
        cartContainer.appendChild(counter);
      })
      .catch(err => console.log(err));
} 

renderCounter();

const addProduct = async (idCart, idProduct) => {  
    const url = `/carrito/${idCart}/${idProduct}`;  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((data) => {  
        alert("Producto Agregado al Carrito"); 
        renderCounter(); 
      });
}

const URL = "/lista-productos";

fetch(URL)
  .then(res => res.json())
  .then(res => {
    renderProducts(res);
  })
  .catch(err => console.log(err));

const searchTab = document.getElementById("searchTab");

searchTab.addEventListener("keyup", (e) => {
  const URL = "/lista-productos";
  fetch(URL)
    .then(res => res.json())
    .then(res => {
      const search = e.target.value;
      const productos = res.filter(el => el.description.toLowerCase().includes(search.toLowerCase()));
      renderProducts(productos);
    })
    .catch(err => console.log(err));
}); 