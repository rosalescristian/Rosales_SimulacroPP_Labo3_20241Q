import { anuncio_Auto } from "./anuncio_Auto.js";
import { mostrarSpinner, ocultarSpinner} from "./spinner.js";

let items = [];
const KEY_STORAGE = "autos"; 

document.addEventListener("DOMContentLoaded", onInit());

function onInit(){
    includeNavBar();
    includeHeader();
    includeFooter();
    /*limpiarTabla();
    actualizarFormulario();
    loadItems();
    rellenarTabla();
    escuchandoFormulario();*/
}

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
        <!--<img class="logo" src="./images/logo.svg" alt="Logo Empresa">-->
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


/*  SCRIPTS DE LA TABLA */

//function loadItems() {
//  let str = leer(KEY_STORAGE) || "[]"; // traeme los datos y si estas vacio definime un array vacio.
//  const objetos = jsonToObject(str) || [];

  /*objetos.forEach(obj => {
        const model = new Casa(
            obj.id,
            obj.titulo,
            obj.precio
        );
        items.push(model);
    });*/
//  items = objetos.map((obj) => {
//    return new Casa(obj.id, obj.titulo, obj.precio);
//  });
//}

// Obtenga el elemento del DOM Table
// Luego agregarle las filas que sean necesarias
// se agregaran dependiendo de la contidad de items que poseo
function rellenarTabla() {
  const tabla = document.getElementById("table-items");
  const tbody = tabla.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  const celdas = [  "id"
                    , "titulo"
                    , "transaccion"
                    , "descripcion"
                    , "precio"
                    , "puertas"
                    , "kilometros"
                    , "potencia"];

  items.forEach((item) => {
    let nuevaFila = document.createElement("tr");

    celdas.forEach((celda) => {
      let nuevaCelda = document.createElement("td");
      nuevaCelda.textContent = item[celda];
      nuevaFila.appendChild(nuevaCelda);
    });
    tbody.appendChild(nuevaFila);
  });
}

function escuchandoFormulario() {
  const formulario = obtenerFormulario();
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const model = new Casa( 
      formulario.querySelector("#id").value,
      formulario.querySelector("#titulo").value,
      formulario.querySelector("#transaccion").value,
      formulario.querySelector("#descripcion").value,
      formulario.querySelector("#precio").value,
      formulario.querySelector("#puertas").value,
      formulario.querySelector("#kilometros").value,
      formulario.querySelector("#optencia").value,
    );

    const rta = model.verify();

    if (rta) {
      items.push(model);
      const str = objectToJson(items);

      escribir(KEY_STORAGE, str);
      actualizarFormulario();
      rellenarTabla();

    } else {
      alert("Error en la carga de datos!");
    }
  });
}

function actualizarFormulario() {
  const formulario = obtenerFormulario();
  if (formulario) formulario.reset();
}

function obtenerFormulario() {
  return document.getElementById("form-item");
}

function limpiarTabla(){
    const table = getElementById("table-items");
    table.innerHTML = '';
}

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