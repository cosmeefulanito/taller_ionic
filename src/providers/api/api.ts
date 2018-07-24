//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable()
export class ApiProvider {

  constructor() {}

  public getTickets(){ //Hace una referencia al nodo, no hace la query
    return firebase.database().ref('/tickets');
  }

}
