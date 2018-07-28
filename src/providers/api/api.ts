//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as randomString from 'randomstring';




@Injectable()
export class ApiProvider {

  constructor() {}
//Obtiene todos los tickets
  public getTickets(){ //Hace una referencia al nodo, no hace la query
    return firebase.database().ref('/tickets');
  }
//Obtiene un ticket en particular
  public getTicket(id){
    return firebase.database().ref('/tickets/'+ id);
  }
//Crea un nuevo ticket
  public addTicket(data,callback){
    return firebase.database().ref('/tickets/').push(data,callback);
  }

  //Edita ticket
  public editTicket(id,data,callback){
    return firebase.database().ref('/tickets/'+id).set(data,callback);
  }

  public eliminarTicket(id,callback){
    return firebase.database().ref('/tickets/'+id).remove(callback);
  }

  //Resolver tickets
  public resolverTicket(id,callback){
    let resolver = {
      estado: 1
    }
    return firebase.database().ref('/tickets/'+id).update(resolver,callback);
  }

  //Subir un archivo a firebase y retornar la URL
  public subirStorage(dataUrl){
    let rutaArchivo = "/" + randomString.generate()+'.jpg';
    return firebase.storage().ref(rutaArchivo);
  }

}
