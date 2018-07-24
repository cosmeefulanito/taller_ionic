import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';
import * as firebase from 'firebase';

  

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email:string ='';
  public password:string ='';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loading: LoadingController,
    public toast: ToastController,
  ) {

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(){    
    let email = this.email;
    let pass = this.password;
    let carga = this.loading.create({
      content: 'Esperate conch...'
    });
    let toast = this.toast.create({
      message: 'Error de autenticacion',
      duration: 3000
    });
    carga.present();
    

    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email,pass).then((resultado)=>{
      //console.log(resultado);
      carga.dismiss();
      this.navCtrl.setRoot('ListaTicketsPage');
    },(error)=> {
      toast.dismiss();
      toast.present();
      // console.log(error);
    }); //devuelve una promesa

    console.log(email,pass);
  }

}
