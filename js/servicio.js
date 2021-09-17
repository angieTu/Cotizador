class Servicio {
  constructor(id, nombre, costo, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.costo = costo;
    this.cantidad = cantidad;
  }
  sumarIva() {
    this.costo *= 1.21;
  }

  subTotal() {
    return this.costo * this.cantidad;
  }
}
