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

  localStorage.setItem(
    "ServiciosContratados",
    JSON.stringify(serviciosContratados)
  );
};

//------------ AGREGO AL CARRITO

const agregarCarrito = () => {
  let container = document.getElementsByClassName("carrito")[0];
  container.innerHTML = serviciosContratados.map(
    (elem) =>
      `<div class='service-carrito'>
        <h4 class='service-title'>${elem.nombre}</h4><span>${
        elem.costoPorHora
      }$.</span>
        <i class="far fa-trash-alt" id=${elem.nombre.replaceAll(
          " ",
          ""
        )}></i></div>`
  );
  const iconosBorrar = document.getElementsByClassName("far fa-trash-alt");

  for (const icono of iconosBorrar) {
    icono.onclick = (event) => {
      borrarServicio(event.target.id);
    };
  }
  obtenerTotal();
  document.getElementById(
    "container-total"
  ).innerHTML = `<hr><h4>El costo total es de: $ ${suma} + IVA </h4>`;
};

//--------------ELIMINO SERVICIO DEL CARRITO

const borrarServicio = (id) => {
  serviciosContratados = serviciosContratados.filter(
    (elem) => elem.nombre.replaceAll(" ", "") !== id
  );
  obtenerTotal();
  agregarCarrito();
  localStorage.setItem(
    "ServiciosContratados",
    JSON.stringify(serviciosContratados)
  );
  return serviciosContratados;
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
    ).innerHTML = `<hr><h4>El costo total es de: $ ${parseFloat(suma)} </h4>`;
  } else if (cambio === false) {
    suma /= 1.21;
    btnIva[0].innerText = "Con IVA";
    document.getElementById(
      "container-total"
    ).innerHTML = `<hr><h4>El costo total es de: $ ${suma} + IVA</h4>`;
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
