//-------------TRAIGO EL CARRITO DEL STORAGE SI HAY
$(document).ready(() => {
  if ("ServiciosContratados" in localStorage) {
    const serviciosGuardados = JSON.parse(
      localStorage.getItem("ServiciosContratados")
    );
    for (servicio of serviciosGuardados) {
      serviciosContratados.push(
        new Servicio(
          servicio.id,
          servicio.nombre,
          servicio.costo,
          servicio.cantidad
        )
      );
    }

    //---------CREO HTML DE CARRITO
    modificoCantidad();
    agregarCarrito();
  }

  $.get("data/products.json", function (datos, estado) {
    if (estado == "success") {
      for (const dato of datos) {
        serviciosOfrecidos.push(
          new Servicio(dato.id, dato.nombre, dato.costo, dato.cantidad)
        );
      }
    }
    serviciosUI(serviciosOfrecidos);
    cotizadorUI(serviciosOfrecidos);
    eventoAgregar();
  });
});

$("#form-button").click(function () {
  const inputs = $("form :input");
  const infoPost = {
    nombre: inputs[0].value,
    email: inputs[1].value,
    mensaje: inputs[2].value,
  };
  $.post(
    "https://jsonplaceholder.typicode.com/posts",
    infoPost,
    function (respuesta, estado) {
      if (
        estado === "success" &&
        inputs[0].value !== "" &&
        inputs[1].value !== "" &&
        inputs[2].value !== ""
      ) {
        $("#form").append(`<span>Enviado!</span>`);
      }
    }
  );
});

$(".title-main")
  .css({ fontSize: "30px", color: "#19c0e5" }, "slow")
  .delay(500)
  .animate({ fontSize: "54px" });

$("#show-carrito").click(() => {
  $("#container-carrito").toggle("slow");
});

//--------------
// let i = 0;
// let msg = `Lorem Ipsum is simply dummy text of the printing and typesetting
// industry. Lorem Ipsum has been the industry's standard dummy text ever
// since the 1500s, when an unknown printer took a galley of type and
// scrambled it to make a type specimen book. It has survived not only
// five centuries, but also the leap into electronic typesetting.`;
// let velocidad = 100;
// function typeWriter() {
//   if (i < msg.length) {
//     document.getElementById("escribeTexto").innerHTML += msg.charAt(i);
//     i++;

//     setTimeout(typeWriter, velocidad);
//   }
// }
// typeWriter();

let animado = document.getElementsByClassName("card-service");
const mostrarScroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  for (let i = 0; i < animado.length; i++) {
    let altura = animado[i].offsetTop;
    if (altura - 500 < scrollTop) {
      animado[i].style.opacity = 1;
      animado[i].classList.add("mostrarArriba");
    }
  }
};

window.addEventListener("scroll", mostrarScroll);
