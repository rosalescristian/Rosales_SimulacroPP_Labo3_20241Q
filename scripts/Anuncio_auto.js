export class Anuncio_Auto extends Anuncio{
    constructor(id, titulo, transaccion, descripcion, precio, puertas, kilometros, velocidad) {
      super(id,titulo,transaccion,descripcion,precio);
      this.puertas = puertas;
      this.kilometros = kilometros;
      this.velocidad = velocidad;
    }
  
    verify() {
      return this.titulo && this.precio > 0;
    }
  }