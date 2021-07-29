class Servicio {
  constructor(id, nombre, costoPorHora) {
    this.id = id;
    this.nombre = nombre;
    this.costoPorHora = costoPorHora;
  }
  sumarIva() {
    this.costoPorHora *= 1.21;
  }
}
const servicio1 = new Servicio(1, "Subtítulos en Inglés", 200);
const servicio2 = new Servicio(2, "Subtítulos en Portugués", 150);
const servicio3 = new Servicio(3, "Audio en inglés", 150);
const servicio4 = new Servicio(4, "Audio en portugués", 100);
const servicio5 = new Servicio(5, "LSA", 150);

//----------------------------------------------

const serviciosOfrecidos = [];
serviciosOfrecidos.push(servicio1, servicio2, servicio3, servicio4, servicio5);

let servicioAAgregar;
const serviciosContratados = [];
let horas;
let cambio = false;
let suma;

//-----------DEFINO FUNCIONES;

//------------ OBTENGO CANTIDAD DE HORAS

const obtenerHoras = (id) => {
  const obtenerInputs = document.getElementsByTagName("input");
  let ID = id - 1;
  obtenerInputs[ID].setAttribute("readonly", "");
  return parseInt(obtenerInputs[ID].value);
  //----RETORNA NUMERO
};

//------------ BUSCO EL SERVICIO INGRESADO

const obtenerProducto = (id) => {
  let ID = parseInt(id);
  servicioAAgregar = serviciosOfrecidos.find((elem) => elem.id === ID);
  servicioAAgregar.costoPorHora *= !obtenerHoras(ID) ? 1 : obtenerHoras(ID);
  serviciosContratados.push(servicioAAgregar);
};

//------------ AGREGO AL CARRITO

const agregarCarrito = () => {
  let container = document.createElement("div");
  container.classList.add("service-carrito");
  container.innerHTML = `<h1 class='service-title'>${servicioAAgregar.nombre}</h1>
                        <h2>Costo por hora ${servicioAAgregar.costoPorHora}$.</h2>
                       `;
  document.getElementsByClassName("carrito")[0].appendChild(container);
  obtenerTotal();
  document.getElementById(
    "container-total"
  ).innerHTML = `<h1>El costo total es de: $ ${suma} + IVA </h1>`;
};

//------------ CALCULO EL TOTAL

const obtenerTotal = () => {
  const total = serviciosContratados.map((elem) => elem.costoPorHora);
  suma = 0;
  for (t of total) {
    suma += t;
  }
};

//------------------BOTON PARA OBTENER IVA

const btnIva = document.getElementsByClassName("btn-iva");
btnIva[0].onclick = () => iva();

const iva = () => {
  cambio ? (cambio = false) : (cambio = true);
  if (cambio === true) {
    suma *= 1.21;
    btnIva[0].innerText = "Sin IVA";
    document.getElementById(
      "container-total"
    ).innerHTML = `<h1>El costo total es de: $ ${suma} + IVA </h1>`;
  } else if (cambio === false) {
    suma /= 1.21;
    btnIva[0].innerText = "Con IVA";
    document.getElementById(
      "container-total"
    ).innerHTML = `<h1>El costo total es de: $ ${suma} IVA incluído</h1>`;
  }
};

//--------------AGREGO EVENTO A CADA BOTON

const btnAgregar = document.getElementsByClassName("add-carrito");
for (const boton of btnAgregar) {
  boton.onclick = (event) => {
    obtenerProducto(event.target.id);
    agregarCarrito();
    boton.setAttribute("disabled", "");
  };
}
