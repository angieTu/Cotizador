const servicio1 = new Servicio(1, "Subtítulos en inglés", 2500);
const servicio2 = new Servicio(2, "Subtítulos en portugués", 2000);
const servicio3 = new Servicio(3, "Subtítulos en español", 1500);
const servicio4 = new Servicio(4, "Audio en inglés", 3500);
const servicio5 = new Servicio(5, "Audio en portugués", 3000);
const servicio6 = new Servicio(6, "Audio en español", 2500);
const servicio7 = new Servicio(7, "LSA", 1000);
const servicio8 = new Servicio(8, "Audio descripción en inglés", 2000);
const servicio9 = new Servicio(9, "Audio descripción en portugués", 1500);
const servicio10 = new Servicio(10, "Audio descripción en español", 1000);

//----------------------------------------------
const servicios = [];
servicios.push(
  servicio1,
  servicio2,
  servicio3,
  servicio4,
  servicio5,
  servicio6,
  servicio7,
  servicio8,
  servicio9,
  servicio10
);

//--------------GUARDO LOS OBJETOS EN STORAGE
const guardarLocal = (clave, valor) => {
  localStorage.setItem(clave, valor);
};
guardarLocal("ServiciosOfrecidos", JSON.stringify(servicios));

//-----------TRAIGO LOS SERVICIOS DEL STORAGE
const almacenados = JSON.parse(localStorage.getItem("ServiciosOfrecidos"));
for (const objeto of almacenados) {
  serviciosOfrecidos.push(
    new Servicio(objeto.id, objeto.nombre, objeto.costoPorHora)
  );
}

//-------------TRAIGO EL CARRITO DEL STORAGE SI HAY
$(document).ready(() => {
  if ("ServiciosContratados" in localStorage) {
    const serviciosGuardados = JSON.parse(
      localStorage.getItem("ServiciosContratados")
    );
    for (s of serviciosGuardados) {
      serviciosContratados.push(new Servicio(s.id, s.nombre, s.costoPorHora));
    }
    //---------CREO HTML DE CARRITO
    agregarCarrito();
  }
});

//---------------- CREO EL HTML DE LOS SERVICIOS OFRECIDOS
const containerServices =
  document.getElementsByClassName("container-services")[0];

for (const ser of serviciosOfrecidos) {
  const article = document.createElement("article");
  article.classList.add("card-service");
  article.innerHTML = `<h4>${ser.nombre}</h4>
  <p>
    Lorem Ipsum is simply dummy text of the printing and typesetting
    industry. Lorem Ipsum has been the industry's standard dummy text
    ever since the 1500s, when an unknown printer took a galley of type
    and scrambled it to make a type specimen book.
  </p>
  <span>$${ser.costoPorHora} por hora</span>`;
  containerServices.appendChild(article);
}

//--------------- CREO EL HTML DEL COTIZADOR

const containerPrices = document.getElementsByClassName(
  "container-services-add"
)[0];
for (servicio of serviciosOfrecidos) {
  const article = document.createElement("article");
  article.classList.add("service");
  article.innerHTML = `<h4>${servicio.nombre}</h4> <span>$${servicio.costoPorHora} por hora.</span>
  <input
    type="number"
    placeholder="Cantidad de horas"
    min="1"
    max="4"
  />
  <button class="add-carrito" id=${servicio.id}>Agregar</button>`;
  containerPrices.appendChild(article);
}

$("#form-button").click(function (e) {
  e.preventDefault();
  const inputs = $("form :input");
  if (
    inputs[0].checkValidity() &&
    inputs[1].checkValidity() &&
    inputs[2].checkValidity()
  ) {
    $("form").append("<span>Enviado!</span>");
  }
});
