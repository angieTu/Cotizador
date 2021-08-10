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
