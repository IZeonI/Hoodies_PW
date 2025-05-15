// js/carrito.js

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, cantidad, precio, imagen) {
  const carrito = obtenerCarrito();
  const existente = carrito.find(item => item.nombre === nombre);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ nombre, cantidad, precio, imagen });
  }

  guardarCarrito(carrito);
  // alert('Producto agregado al carrito');
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const lista = document.getElementById('carrito-lista');
    const totalProductosElem = document.getElementById('carrito-total-productos');
    const subtotalElem = document.getElementById('carrito-subtotal');
    const totalFinalElem = document.getElementById('carrito-total-final');
    const resumen = document.getElementById('resumen-carrito');
    const vacio = document.getElementById('carrito-vacio');

    lista.innerHTML = '';

    if (carrito.length === 0) {
      resumen.style.display = 'none';
      vacio.style.display = 'block';
      return;
    }

    vacio.style.display = 'none';
    resumen.style.display = 'block';

    let totalProductos = 0;
    let subtotal = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'producto';

    const img = document.createElement('img');
    img.src = item.imagen;
    img.alt = item.nombre;

    const info = document.createElement('div');
    info.className = 'producto-info';

    const nombre = document.createElement('strong');
    nombre.textContent = item.nombre;

    const cantidad = document.createElement('span');
    cantidad.textContent = `Cantidad: ${item.cantidad}`;

    const botones = document.createElement('div');
    botones.className = 'producto-controles';

    const btnMenos = document.createElement('button');
    btnMenos.textContent = '➖';
    btnMenos.onclick = () => cambiarCantidad(index, -1);

    const btnMas = document.createElement('button');
    btnMas.textContent = '➕';
    btnMas.onclick = () => cambiarCantidad(index, 1);

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = '🗑️';
    btnEliminar.onclick = () => eliminarProducto(index);

    botones.appendChild(btnMenos);
    botones.appendChild(btnMas);
    botones.appendChild(btnEliminar);

    const precio = document.createElement('span');
    const itemSubtotal = item.precio * item.cantidad;
    precio.textContent = `Subtotal: $${itemSubtotal.toFixed(2)}`;

    info.appendChild(nombre);
    info.appendChild(cantidad);
    info.appendChild(precio);
    info.appendChild(botones);

    div.appendChild(img);
    div.appendChild(info);
    lista.appendChild(div);

    totalProductos += item.cantidad;
    subtotal += itemSubtotal;
  });


    const envio = 150;
    const totalFinal = subtotal + envio;

    totalProductosElem.textContent = totalProductos;
    subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    totalFinalElem.textContent = `$${totalFinal.toFixed(2)}`;
  }

  function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarCarrito();
  }

  function pagarCarrito() {
    localStorage.removeItem('carrito');
    document.getElementById('carrito-lista').innerHTML = '';
    document.getElementById('resumen-carrito').style.display = 'none';

    const mensaje = document.getElementById('carrito-vacio');
    mensaje.style.display = 'block';
    mensaje.innerHTML = `
      <h2>✅ Pedido completado</h2>
      <p>Tu pedido llegará pronto a tu casa 🏠.</p>
      <a class="volver-btn" href="index.html">← Volver a la tienda</a>
    `;
  }

  function cambiarCantidad(index, cambio) {
  const carrito = obtenerCarrito();
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad < 1) {
    carrito[index].cantidad = 1;
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function eliminarProducto(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

