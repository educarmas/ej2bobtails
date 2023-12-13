// -------------------------------JS BOTON AÑADIR PRODUCTO----------------------------------------

const comprarBtns = document.querySelectorAll(".comprar-btn");
const unidadesSelects = document.querySelectorAll(".unidades");

comprarBtns.forEach((event) => {
  event.addEventListener("click", botonComprar);
  function botonComprar(event) {
    if (event.target.nextElementSibling == null) {
      const unidadesSeleccionadas = 1;
      fAgregarProducto(event, unidadesSeleccionadas);
    } else {
      const select = event.target.nextElementSibling;
      if (select.style.display === "none") {
        select.style.display = "block";
      } else {
        const unidadesSeleccionadas = select.value
        fAgregarProducto(event, unidadesSeleccionadas)

        select.selectedIndex = 0;
        select.style.display = "none"
      }
    }
  }
});

// -------------------------------FIN JS BOTON AÑADIR PRODUCTO----------------------------------------

class Carrito {
  productos = [];

  agregarProducto(producto, cantidadProducto) {

    if (this.productos.find(p => p.id === producto.id)) {
      let numProduct = producto.id
      this.productos[numProduct - 1].cantidad += cantidadProducto
    } else {
      this.productos.push(producto);
    }
  }

  agregarUnidad(idProducto) {
    const producto = this.productos.find(p => p.id === idProducto);

    if (producto) {
      producto.cantidad += 1;

    }
  }

  restarUnidad(idProducto) {
    const producto = this.productos.find(p => p.id === idProducto);

    if (producto && producto.cantidad > 1) {
      producto.cantidad -= 1;

    }
  }

  quitarProducto(idProducto) {

    this.productos = this.productos.filter(p => p.id !== idProducto);
  }

  obtenerProductos() {

    return this.productos;
  }

  calcularTotal() {

    let totalT = this.productos.reduce((total, p) => total + (p.price * p.cantidad), 0)
    return totalT;
  }

  vaciarCarrito() {

    this.productos = [];
  }


}

const carrito = new Carrito();

// Actualizar la vista en HTML
const listaCarrito = document.querySelector('#productos-carrito');
const totalCarrito = document.querySelector('#total-carrito');
const conteoCarrito = document.querySelector('#conteoCarrito')

window.addEventListener('load', function () {
  cantidadDeProductos()
});

function cantidadDeProductos() {
  let cantidadProductos = carrito.productos.length
  // console.log(carrito.productos)
  return conteoCarrito.innerHTML = `( ${cantidadProductos} )`
}


function mostrarCarrito() {
  let productos = carrito.obtenerProductos();

  if (productos.length === 0) {
    listaCarrito.textContent = "El carrito está vacío.";
    listaCarrito.style.fontWeight = "bold";
  } else {
    listaCarrito.textContent = '';
    productos.forEach((item) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
      <td class="product-identification col-unoJS">
        <div>
          <img src="${item.img}" alt="${item.description}" class="cart-product-image">
        </div>
        <p class="cart-product-title hide-mobile">${item.description}</p>
        <span class="cart-product-price show-mobile">Cantidad: ${item.cantidad}</span>
      </td>
      <td class="col-dosJS">
        <span class="cart-product-title show-mobile">${item.description}</span>
        <span class="cart-product-price">€ ${item.price}</span>
      </td>
      <td class="col-tresJS hide-mobile">
        <span class="cart-product-price">${item.cantidad}</span>
      </td>
      <td class="col-cuatroJS hide-mobile">
        <span class="cart-product-price">€ ${item.price * item.cantidad}</span>
      </td>
      `;
      listaCarrito.appendChild(tr);
    });

    totalCarrito.textContent = carrito.calcularTotal();
  }
}

let compraRealizada = document.querySelector(".purchase-button")
compraRealizada.addEventListener("click", function () {
  let productos = carrito.obtenerProductos();
  if (productos.length > 0) {
    cerrarVentanaModal()
    carrito.vaciarCarrito();
    totalCarrito.textContent = 0
    cantidadDeProductos();
    mostrarCarrito()
    mostrarPopup()
  }
});

function fAgregarProducto(event, unidades) {
  let product = {};

  product.id = event.target.dataset.id;
  product.price = event.target.previousElementSibling.childNodes[1].nodeValue;
  product.description = event.target.previousElementSibling.previousElementSibling.innerText;
  product.img = event.target.parentNode.previousElementSibling.src;
  product.cantidad = Number(unidades);
  const cantidadProducto = Number(unidades);

  carrito.agregarProducto(product, cantidadProducto)
  cantidadDeProductos()
}

// CODIGO QUE CORRESPONDERÍA A LA LINEA 120  PARA LOS BOTONES DE MAS Y MENOS  --  <span class="cart-product-price"><button class ="agregar-unidad">+</button></span>${item.cantidad}<button class ="restar-unidad">-</button></span>  -- NO ME QUEDAN BIEN EN CUANTO A DISEÑO

// idProducto = product.id;
// const botonAgregarUnidad = document.querySelector("#agregar-unidad");
// console.log("hola")
// console.log(botonAgregarUnidad)
// const botonRestarUnidad = document.querySelector("#restar-unidad");

// botonAgregarUnidad.addEventListener("click", () => {
//   carrito.agregarUnidad(idProducto);
//   cantidadDeProductos();
// });

// botonRestarUnidad.addEventListener("click", () => {
//   carrito.restarUnidad(idProducto);
//   cantidadDeProductos();
// });



// Método Vaciar carrito

const botonVaciarCarrito = document.querySelector(".boton-vaciar-carrito");

botonVaciarCarrito.addEventListener("click", function () {
  carrito.vaciarCarrito();
  totalCarrito.textContent = 0
  cantidadDeProductos();
  mostrarCarrito()
});

// Función popup

function mostrarPopup() {
  var popup = document.getElementById("mensaje-compra");
  popup.style.display = "block";
  setTimeout(ocultarPopup, 4000);
}

function ocultarPopup() {
  var popup = document.getElementById("mensaje-compra");
  popup.style.display = "none";
}


// -----------------------------------Javascript para funcionamiento slider-----------------------------------------

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// -----------------------------------FIN JavaScript para funcionamiento slider-----------------------------------------
// ---------------------------------JavaScript menu hamburguesa versión móvil-------------------------------------------

const toggleButton = document.querySelector("#button-menu");
const navWrapper = document.querySelector("#nav");

toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("close");
  navWrapper.classList.toggle("show");
});

navWrapper.addEventListener("click", (e) => {
  if (e.target.id === "nav") {
    navWrapper.classList.remove("show");
    toggleButton.classList.remove("close");
  }
});

// ---------------------------------FIN JavaScript menu hamburguesa versión móvil-----------------------------------------

// ----------------------------------------Formulario-------------------------------------------

//funcion para validar un campo, recibiendo el id, la mensaje de error, el regex.

function validarInput(idInput, idMensaje, regex, mensaje) {
  const valorInput = document.getElementById(idInput).value; //coger un valor digitado
  const label = document.getElementById(idMensaje); //coger el id que esta en el label
  const span = label.querySelector("span"); //coger todos los spans de dentro del label
  label.classList.remove("error"); //remove la clase si yá ha tenido un error antes, para quitar el rojo
  span.innerText = ""; //remove la mensaje de error

  if (!regex.test(valorInput)) {
    //entra cuando hay error - cuando no coincide con el regex
    label.classList.add("error"); //adiciona clase cuando hay error
    span.innerText = mensaje; //adiciona el mensaje cuando hay error
    return true; //true si ha entrado aqui y hay error
  }
  return false;
}

let mensajeName = "Por favor, ingrese un nombre válido.";
let mensajeLastName = "Por favor, ingrese un apellido válido.";
let mensajeEmail =
  "Por favor, ingrese una dirección de correo electrónico válida.";
let mensajePhone = "Por favor, ingrese un número de teléfono válido";
let mensajeComent = "Por favor, ingrese un comentario";

//validacion de todos los campos en el boton con "submit", para casos de campos vacios

const formulario = document.querySelector("#formulario");
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const mensajeEnvio = document.getElementById("mensajeEnvio");
  mensajeEnvio.innerText = "";

  const nameHasError = validarInput(
    "nombre",
    "mensajeNombre",
    /^[A-Z ]+$/i,
    mensajeName
  ); //true si hay error. False si NO hay error
  const lastNameHasError = validarInput(
    "apellido",
    "mensajeApellido",
    /^[A-Z ]+$/i,
    mensajeLastName
  );
  const emailHasError = validarInput(
    "email",
    "mensajeCorreo",
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    mensajeEmail
  );
  const phoneHasError = validarInput(
    "telefono",
    "mensajeTelefono",
    /(\+34|0034|34)?[ -]*[ -]*([0-9][ -]*){8}/,
    mensajePhone
  );
  const messageHasError = validarInput(
    "comentario",
    "mensajeComentario",
    /^[A-Za-z0-9\s]+$/g,
    mensajeComent
  );

  if (
    !nameHasError &&
    !lastNameHasError &&
    !emailHasError &&
    !phoneHasError &&
    !messageHasError
  ) {
    mensajeEnvio.innerText = "Formulario enviado con suceso.";
    formulario.reset();
  }
});

//validacion campo uno a uno con "blur" cuando se perde el foco

const nombre = document.querySelector("#nombre");
nombre.addEventListener("blur", function () {
  validarInput("nombre", "mensajeNombre", /^[A-Z ]+$/i, mensajeName);
});

const apellido = document.querySelector("#apellido");
apellido.addEventListener("blur", function () {
  validarInput("apellido", "mensajeApellido", /^[A-Z ]+$/i, mensajeLastName);
});

const email = document.querySelector("#email");
email.addEventListener("blur", function () {
  validarInput(
    "email",
    "mensajeCorreo",
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    mensajeEmail
  );
});

const telefono = document.querySelector("#telefono");
telefono.addEventListener("blur", function () {
  validarInput(
    "telefono",
    "mensajeTelefono",
    /(\+34|0034|34)?[ -]*[ -]*([0-9][ -]*){8}/,
    mensajePhone
  );
});

const comentario = document.querySelector("#comentario");
comentario.addEventListener("blur", function () {
  validarInput(
    "comentario",
    "mensajeComentario",
    /^[A-Za-z0-9\s]+$/g,
    mensajeComent
  );
});

// ----------------------------------------FIN Formulario-------------------------------------------

// ---------------------------------Crear ventana modal para carrito con boton abrir/cerrar------------------------------

function abrirVentanaModal() {
  let ventanaModal = document.querySelector("#miVentanaModal");
  ventanaModal.style.display = "block";
  mostrarCarrito();
}

function cerrarVentanaModal() {
  let ventanaModal = document.querySelector("#miVentanaModal");
  ventanaModal.style.display = "none";
}

let boton = document.querySelector("#miBoton");
boton.addEventListener("click", abrirVentanaModal);

let botonCerrar = document.querySelector(".cerrar");
botonCerrar.addEventListener("click", cerrarVentanaModal);

let fondoModal = document.querySelector(".modal");
fondoModal.addEventListener("click", cerrarVentanaModal);

let contenidoModal = document.querySelector(".modal-contenido");
contenidoModal.addEventListener("click", function (event) {
  event.stopPropagation();

});

// ------------------------------ FIN Crear ventana modal para carrito con boton abrir/cerrar------------------------------
