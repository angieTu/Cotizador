$(document).ready(() => {
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

  carritoPago(serviciosContratados);
});

const carritoPago = (servicios) => {
  const carrito = document.getElementsByClassName("carrito-pago")[0];
  carrito.innerHTML = servicios.map(
    (elem) =>
      `<div><h4><i class="fas fa-hashtag"></i> ${
        elem.nombre
      }</h4><span>$${elem.subTotal()}</span></div>`
  );
  carrito.innerHTML += `<div class='carrito-total'>El costo total es de: $${carritoTotal(
    servicios
  )} + IVA</div>`;
};

const carritoTotal = (servicios) => {
  const total = servicios.map((elem) => elem.subTotal());
  suma = 0;
  for (t of total) {
    suma += t;
  }
  return suma;
};

$(".custom-btn").click((event) => {
  event.preventDefault();
  window.location.pathname = "/proyect/confirm.html";
});
