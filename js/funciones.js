//---------------- CREO EL HTML DE LOS SERVICIOS OFRECIDOS
const serviciosUI = (servicios) => {
  const containerServices =
    document.getElementsByClassName("container-services")[0];

  for (const ser of servicios) {
    const article = document.createElement("article");
    article.classList.add("card-service");
    article.innerHTML = `<h4>${ser.nombre}</h4>
  <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text
    ever since the 1500s.
  </p>
  <span>$${ser.costo} por hora</span>`;
    containerServices.appendChild(article);
  }
};

//--------------- CREO EL HTML DEL COTIZADOR

const cotizadorUI = (servicios) => {
  const containerPrices = document.getElementsByClassName(
    "container-services-add"
  )[0];
  for (servicio of servicios) {
    const article = document.createElement("article");
    article.classList.add("service");
    article.innerHTML = `<h4>${servicio.nombre}</h4> <span>$${servicio.costo} por hora.</span>
   <button class="add-carrito" id=${servicio.id}>Agregar
   <i class="fas fa-shopping-cart cart-item"></i></button>`;
    containerPrices.appendChild(article);
  }

  const botones = $(".add-carrito");
  for (boton of botones) {
    boton.addEventListener("click", function () {
      var button = $(this);
      button.addClass("sendtocart");
      setTimeout(function () {
        button.removeClass("sendtocart");
      }, 1000);
    });
  }
};

//--------------AGREGO EVENTO A CADA BOTON

const eventoAgregar = () => {
  const btnAgregar = document.getElementsByClassName("add-carrito");
  for (const boton of btnAgregar) {
    boton.onclick = (event) => {
      console.log(event);
      agregarServicio(boton.id);
      agregarCarrito();
    };
  }
};

//------------ MODIFICO CANTIDAD DEL CARRITO

const modificoCantidad = () => {
  const cantidad = $("#show-carrito")[0];
  cantidad.innerHTML = `<i class="fas fa-shopping-cart"></i><span>${serviciosContratados.length}</span>`;
};

//------------ BUSCO EL SERVICIO INGRESADO Y AGREGO CANTIDAD

const agregarServicio = (id) => {
  let ID = parseInt(id);
  servicioAAgregar = serviciosOfrecidos.find((elem) => elem.id === ID);
  servicioAAgregar.cantidad = 1;
  const servicio = serviciosContratados.find((elem) => elem.id === ID);

  if (servicio === undefined) {
    serviciosContratados.push(servicioAAgregar);
  }
  modificoCantidad();

  localStorage.setItem(
    "ServiciosContratados",
    JSON.stringify(serviciosContratados)
  );
};

//----------------AGREGAR CANTIDAD

const agregarCantidad = (id) => {
  let ID = parseInt(id);
  const servicio = serviciosContratados.find((elem) => elem.id === ID);
  servicio.cantidad += 1;
  agregarCarrito();
  localStorage.setItem(
    "ServiciosContratados",
    JSON.stringify(serviciosContratados)
  );
};

//---------------ELIMINO CANTIDAD

const eliminarCantidad = (id) => {
  let ID = parseInt(id);
  const servicio = serviciosContratados.find((elem) => elem.id === ID);

  if (servicio.cantidad > 1) {
    servicio.cantidad -= 1;
  }
  agregarCarrito();

  localStorage.setItem(
    "ServiciosContratados",
    JSON.stringify(serviciosContratados)
  );
};

//------------ CREO CARRITO Y AGREGO SERVICIOS

const agregarCarrito = () => {
  let container = document.getElementsByClassName("carrito")[0];
  container.innerHTML = serviciosContratados.map(
    (elem) =>
      `<div class='service-carrito'>
        <h4 class='service-title'>${
          elem.nombre
        }</h4><span>${elem.subTotal()}$.</span>
        <i class="far fa-trash-alt" id=${elem.id}></i>
        <div><button class='decrease' id=${elem.id}>-</button>
        <span>${elem.cantidad} horas</span><button class='add' id=${
        elem.id
      }>+</button>
        </div>
        </div><hr>`
  );

  eventosBotones();
  obtenerTotal();
  carritoUI();
};

//---------------HTML DEL CARRITO(TOTAL Y BOTONES)

const carritoUI = () => {
  if (serviciosContratados.length >= 1) {
    document.getElementById(
      "container-total"
    ).innerHTML = `<h4>El costo total es de: $ ${suma} + IVA </h4>`;
    $(".btns-carrito").html(`<button class="btn-confirm">
    <span>
      <a  href="./pago.html">Comprar</a></span>
    </button>`);
  } else {
    document.getElementById("container-total").innerHTML =
      "<h4>El carrito se encuentra vacío</h4>";
    $(".btns-carrito").empty();
  }
};

//-------AGREGO EVENTOS BOTONES CARRITO

const eventosBotones = () => {
  const iconosBorrar = document.getElementsByClassName("far fa-trash-alt");
  for (const icono of iconosBorrar) {
    icono.onclick = (event) => {
      borrarServicio(event.target.id);
    };
  }
  const botonAdd = $(".add");
  for (const boton of botonAdd) {
    boton.onclick = (event) => {
      agregarCantidad(event.target.id);
    };
  }
  const botonDecrease = $(".decrease");
  for (const boton of botonDecrease) {
    boton.onclick = (event) => {
      eliminarCantidad(event.target.id);
    };
  }
};

//--------------ELIMINO SERVICIO DEL CARRITO

const borrarServicio = (id) => {
  let ID = parseInt(id);
  serviciosContratados = serviciosContratados.filter(
    (elem) => parseInt(elem.id) !== ID
  );
  obtenerTotal();
  agregarCarrito();
  modificoCantidad();
  localStorage.setItem(
    "ServiciosContratados",
    JSON.stringify(serviciosContratados)
  );
  return serviciosContratados;
};

//------------ CALCULO EL TOTAL

const obtenerTotal = () => {
  const total = serviciosContratados.map((elem) => elem.subTotal());
  suma = 0;
  for (t of total) {
    suma += t;
  }
};

//------------------BOTON PARA OBTENER IVA

const obtenerIva = () => {
  cambio ? (cambio = false) : (cambio = true);
  if (cambio === true) {
    suma *= 1.21;
    document.getElementsByClassName("btn-iva").innerText = "Sin IVA";
    $("#container-total")
      .empty()
      .prepend(`<h4>El costo total es de: $ ${parseFloat(suma)} </h4>`);
  } else if (cambio === false) {
    suma /= 1.21;
    document.getElementsByClassName("btn-iva").innerText = "Con IVA";
    $("#container-total")
      .empty()
      .prepend(`<h4>El costo total es de: $ ${suma} + IVA</h4>`);
  }
};

//------------------ESTILOS AL LIST NAV ACTIVO

$(".list-item").click(function () {
  $(".list-item").removeClass("active");
  $(this).addClass("active");
});

//------------------ANIMACION DEL MAIN

const target = document.getElementById("target");
let array = ["+ personas", "+ idiomas"];
let wordIndex = 0;
let letterIndex = 0;

const createLetter = () => {
  const letter = document.createElement("span");
  target.appendChild(letter);

  letter.classList.add("letter");
  letter.style.opacity = "0";
  letter.style.animation = "anim 5s ease forwards";
  letter.textContent = array[wordIndex][letterIndex];

  setTimeout(() => {
    letter.remove();
  }, 2000);
};

const loop = () => {
  setTimeout(() => {
    if (wordIndex >= array.length) {
      wordIndex = 0;
      letterIndex = 0;
      loop();
    } else if (letterIndex < array[wordIndex].length) {
      createLetter();
      letterIndex++;
      loop();
    } else {
      letterIndex = 0;
      wordIndex++;
      setTimeout(() => {
        loop();
      }, 2000);
    }
  }, 80);
};
loop();

//------------------NAV RESPONSIVE

$(".nav-responsive").click(() => $(".nav-header").addClass("nav-active"));

$(".close-nav").click(() => $(".nav-header").removeClass("nav-active"));
