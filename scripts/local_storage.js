
const delay = 3000;

//Funcion para leer del localStorage
export function leer(key) {
    const str = localStorage.getItem(key); // aca puedo meterle validaciones al str (devuelve string o null)
    return JSON.parse(localStorage.getItem(key));
    /* return new Promise((resolve,reject) => {
      setTimeout(() =>{
        try{
          const valor = JSON.parse(localStorage.getItem(key));
          resolve(valor);
        }
        catch(error){
          reject(error);
        }
      },delay);
    }); */
  }
  
  export function limpiar(key){
    /* return new Promise((resolve, reject)=>{
      setTimeout(() =>{
       try{
        localStorage.setItem(clave, jsonStringify(valor));
        resolve();
      }
      catch(error){
        reject(error);
      }
    },delay);
  }); */
  localStorage.removeItem(key);

}


  //Funcion para escribir al localStorage
  //key = string
  //valor = objeto
  export function escribir(key, valor) {
    localStorage.setItem(key, JSON.stringify(valor));
    /* return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        try{
          localStorage.setItem(clave, jsonStringify(valor));
          resolve();
        }
        catch{
          reject(error);
        }
      },delay);
    }) */
  }
  
  
  export function jsonToObject(jsonString) {
    return JSON.parse(jsonString);
  }
  
  export function objectToJson(objeto) {
    return JSON.stringify(objeto);
  }

  
