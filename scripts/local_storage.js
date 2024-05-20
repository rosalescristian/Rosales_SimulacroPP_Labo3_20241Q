
//Funcion para leer del localStorage
export function leer(key) {
    const str = localStorage.getItem(key); // aca puedo meterle validaciones al str (devuelve string o null)
    return JSON.parse(localStorage.getItem(key));
  }
  
  export function limpiar(key){
  localStorage.removeItem(key);

}

  //Funcion para escribir al localStorage
  //key = string
  //valor = objeto
  export function escribir(key, valor) {
    localStorage.setItem(key, JSON.stringify(valor));
  }
  
  export function jsonToObject(jsonString) {
    return JSON.parse(jsonString);
  }
  
  export function objectToJson(objeto) {
    return JSON.stringify(objeto);
  }

  
