let carrito = [];
const totalElemento = document.getElementById('total');
const productosCarrito = document.getElementById('productosCarrito');

function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito() {
    productosCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>${producto.nombre}</strong> - $${producto.precio} <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
        productosCarrito.appendChild(div);
        total += producto.precio;
    });

    totalElemento.innerText = `Total: $${total}`;
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

document.querySelectorAll('.producto button').forEach((button, index) => {
    button.addEventListener('click', function() {
        const producto = {
            nombre: `Producto ${index + 1}`,
            precio: [100, 150, 200][index], // Cambia estos precios según tus productos
        };
        agregarAlCarrito(producto);
    });
});

document.getElementById('vaciarCarrito').addEventListener('click', function() {
    carrito = [];
    actualizarCarrito();
});
