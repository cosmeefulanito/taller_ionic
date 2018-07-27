import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-lista-tickets',
  templateUrl: 'lista-tickets.html',
})
export class ListaTicketsPage {

  public tickets = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public loading: LoadingController
  ) 
    {
      let cargando = this.loading.create({
        content: 'Cargando tickets ...'
      });
      cargando.present();
      
      //Nos traemos los registros
      this.apiProvider.getTickets().on('value',(snapshot)=>{
        this.tickets = [];
        snapshot.forEach((row:any)=>{
          // console.log(row);
          let id = row.key;
          let data = row.val();
          console.log(id, data);

          this.tickets.push({
            id: id,
            nombre: data.nombre,
            estado: data.estado,
            prioridad: data.prioridad  
          })
        });
        cargando.dismiss(); //oculta elemento       
      });
      
      console.log(this.tickets);
    }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaTicketsPage');
  }

  public addTicket(){
    this.navCtrl.push('NuevoTicketPage');
  }

  public detalleTicket(id){
    this.navCtrl.push('EditarTicketPage',{
      idTicket: id
    });
  }

}
