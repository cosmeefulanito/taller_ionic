import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';//se pueden poner en una sola linea
import { ToastController } from 'ionic-angular';//se pueden poner en una sola linea



@IonicPage()
@Component({
  selector: 'page-nuevo-ticket',
  templateUrl: 'nuevo-ticket.html',
})
export class NuevoTicketPage {

  public prioridad;
  public nombre;
  public image =''; // ?????????

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: ApiProvider,
    public camera: Camera,
    public loading: LoadingController,
    public toast: ToastController,
  ) {
  }

  

  public tomarFoto(){
    const opcionesCamara: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(opcionesCamara).then((datosImg) => {
      this.image = 'data:image/jpeg;base64,' + datosImg;
    },(error)=>{
      let toast = this.toast.create({
        message: 'Error al tomar la foto',
        duration: 3000
      });
      toast.present();
    });

    
  }

  public nuevoTicket(){
    let nuevoDato = {
      estado:0,
      nombre:this.nombre,
      prioridad:this.prioridad,
      image:null}

    //crea el loading y lo muestra
    let loading = this.loading.create({
      content: 'Subiendo archivo y ticket'
    });
    loading.present();

    //crea una referencia de upload y Se establece el formato en que se va a subir

    let ref = this.api.subirStorage(this.image);
    let upload = ref.putString(this.image, 'data_url');

    //Observa los cambios en el upload para realizar alguna accion
    //este snapshot es una foto del progreso de carga
    upload.on('state_changed', (snapshot: any) => {
      let progreso = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);      

      loading.setContent('Subiendo ('+progreso+'%)');
      console.log("--> "+progreso);

    },(error)=>{
      loading.dismiss();
      let toast = this.toast.create({
        message: 'Error al subir el archivo',
        duration: 3000
      });
      toast.present();
    },() => {
    //Cuando termina obtiene la URL pública del archivo, para asi 
    //guardar esa URL en el objeto que se va a subir a Realtime Database
      upload.snapshot.ref.getDownloadURL().then((url)=>{
        nuevoDato.image = url;
        this.api.addTicket(nuevoDato, (resultado)=>{
          //saca el loading y vuelve a la pagina inicial
          loading.dismiss();
          this.navCtrl.pop();

        });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoTicketPage');
  }

}
