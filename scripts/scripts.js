/* import Swal from 'sweetalert2/dist/sweetalert2.js' */

import { anuncio_Auto } from "./anuncio_Auto.js";
import { leer, escribir , limpiar, jsonToObject, objectToJson } from "./local_storage.js";
import { mostrarSpinner, ocultarSpinner} from "./spinner.js";

let items = [];
let formulario = null;
const KEY_STORAGE = "autos"; // es el nombre de la key q uso para local_storage DEFINIRLA!!!

document.addEventListener("DOMContentLoaded", onInit());

function onInit(){
    includeNavBar();
    includeHeader();
    includeFooter();
    //limpiarTabla();
    actualizarFormulario();
    loadItems();
    rellenarTabla();
    obtenerFormulario();
    escuchandoFormulario();
    escuchandoBtnDeleteAll();
}

/*  SCRIPTS DE LA TABLA: VERSION SINCRONICA */

function loadItems() { // primer version de LOAD ITEMS
  let str = leer(KEY_STORAGE) || "[]"; // traeme los datos y si estas vacio definime un array vacio.
  const objetos = jsonToObject(str) || [];

  objetos.forEach(obj => {
    const model = new anuncio_Auto(
                                    obj.id,
                                    obj.titulo,
                                    obj.transaccion,
                                    obj.descripcion,
                                    obj.precio,
                                    obj.puertas,
                                    obj.kilometros,
                                    obj.velocidad
                                  );
    items.push(model);
  });
  items = objetos.map((obj) => {
    return new anuncio_Auto(obj.id,
                            obj.titulo,
                            obj.transaccion,
                            obj.descripcion,
                            obj.precio,
                            obj.puertas,
                            obj.kilometros,
                            obj.velocidad);
  });
}


// Obtenga el elemento del DOM Table
// Luego agregarle las filas que sean necesarias
// se agregaran dependiendo de la cantidad de items que poseo
function rellenarTabla() {
  const tabla = document.getElementById("table-items");
  const tbody = tabla.getElementsByTagName("tbody")[0];
  tbody.innerHTML = '';

  const celdas = ["id", "titulo", "transaccion", "descripcion", "precio", "puertas", "kilometros", "potencia"];

  items.forEach((item) => {
    let nuevaFila = document.createElement("tr"); // Crear una nueva fila para cada ítem

    celdas.forEach((celda) => {
      let nuevaCelda = document.createElement("td"); // Crear una nueva celda para cada propiedad
      nuevaCelda.textContent = item[celda];
      nuevaFila.appendChild(nuevaCelda); // Agregar la celda a la fila
    });

    tbody.appendChild(nuevaFila); // Agregar la fila completa al cuerpo de la tabla
  });
}

function escuchandoFormulario() {
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const fechaActual = new Date();

    const model = new anuncio_Auto( 
      fechaActual.getTime(),                      // paso la fecha completa actual como ID
      formulario.querySelector("#titulo").value,
      //formulario.querySelector("#transaccion").value, // tengo q resolver como levantar el check box
      "venta",
      formulario.querySelector("#descripcion").value,
      formulario.querySelector("#precio").value,
      formulario.querySelector("#puertas").value,
      formulario.querySelector("#kms").value,
      formulario.querySelector("#velocidad").value,
    );

    const rta = model.verify();

    if (rta) {
      items.push(model);
      const str = objectToJson(items);

      escribir(KEY_STORAGE, str);
      //actualizarFormulario();
      rellenarTabla();

      /* Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      }) */

    } else {
        alert("Error en la carga de datos! Hay informacion incorrecta o incompleta. Verifique.");
    }
  }); 
}

function actualizarFormulario() {
  //formulario = obtenerFormulario();
  if (formulario){
    formulario.reset();
  }
}

function obtenerFormulario() {
  return formulario = document.getElementById("form-item");
}

function limpiarTabla(){
    const table = document.getElementById("table-items");
    table.innerHTML = '';
}

function escuchandoBtnDeleteAll() {
  const btn = document.getElementById("btn-delete-all");
  btn.addEventListener("click", (e) => {
    const rta = confirm('Desea eliminar todos los items?');
    
    if(rta){
      items.splice(0, items.length);
      limpiar(KEY_STORAGE);
      rellenarTabla();
    }
  })
}


/*
async function loadItems(){
  mostrarSpinner();
  let str = await leer(KEY_STORAGE);

  ocultarSpinner();
  const objetos = jsonToObject(str) || [];

  objetos.forEach(obj =>{
    const model = new Casa(
      obj.id,
      obj.titulo,
      obj.precio
    );

    items.push(model);
  });
  rellenarTabla();
}
*/


/*  INCLUYO NAV BAR, HEADER Y FOOTER  */

// Genero la nav bar
function generarNavBar() {
  const navBarHTML = `
      <nav>
          <ul>
              <li><a href="#">Nosotros</a></li>
              <li><a href="#">Anuncios</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contacto</a></li>
          </ul>
      </nav>`;
  return navBarHTML;
}

// Genero el resto del contenido del Header en HTML
function generarHTMLHeader(){
  const headerHTML = `
      <!--
      <img class="logo" src="./images/logo.svg" alt="Logo Empresa">
      -->
      <h1>Titulo de mi web</h1>`;
  return headerHTML;
}

// Genero el contenido del Footer en HTML
function generarHTMLFooter(){
  const footerHTML = `
          <p>Todos los derechos reservados 2024 &copy | By Cristian Rosales - UTN : Laboratorio III - Simulacro</p>
      `;
      return footerHTML;
}

// Inyecto la navbar en el header y el footer
function includeNavBar(){
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  const navBar = generarNavBar();

  header.innerHTML = navBar;
  footer.innerHTML = navBar;

}

//Inyecto la navbar y el contenido del HTML en el header
function includeHeader() {
  const header = document.getElementById('header');
  const headerContent = generarHTMLHeader();
  header.innerHTML += headerContent;
}

//Inyecto la navbar y el contenido del HTML en el footer
function includeFooter(){
  const footer = document.getElementById('footer');
  const footerContent = generarHTMLFooter();
  footer.innerHTML += footerContent;
}