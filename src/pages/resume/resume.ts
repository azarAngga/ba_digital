import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController ,LoadingController ,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage' 
import { SignaturePage } from '../signature/signature'
import { Http } from '@angular/http'
import { UriProvider } from "../../providers/uri/uri";
import { PemakaianPage } from "../pemakaian/pemakaian";

/**
 * Generated class for the ResumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html',
})
export class ResumePage {

  sum_pelanggan: any=0;
  loader_gif: any = 'off';
  signatureImage1 : any;
  loader: any;
  signatureImage2: any;
  sum_mitra: any=0;
  nama_signature: any;
  nama: any;
  no_telp: any;
  alamat: any;
  type_layanan: any;
  hasil_test_layanan: any;
  test_voice: any;
  test_internet: any;
  test_use_tv:any;
  tanggal_ttd: any;
  tempat_ttd: any;



  data: any;
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrl: AlertController,
     public loadingCtrl: LoadingController,
     public modalController: ModalController,
     public uri: UriProvider,
     public storage: Storage,
     public http: Http
     ){

      var date = new Date();

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var millisecond = date.getMilliseconds();

      this.tanggal_ttd = day+"-"+month+"-"+year;

       this.storage.get('data').then((val)=>{
         this.nama = val.nama_pelanggan
         this.no_telp = val.no_telepon
         this.alamat = val.alamat_pelanggan
       })

       this.storage.get('data2').then((val)=>{
        if(val.psb != undefined){
          if(val.psb == "1"){
            this.type_layanan = "1P"
          }else if(val.psb == "2"){
            this.type_layanan = "2P"
          }else if(val.psb == "3"){
            this.type_layanan = "3P"
          }
        }else if(val.migrasi != undefined){
          if(val.migrasi == "1"){
            this.type_layanan = "Infrastruktur"
          }else if(val.migrasi == "4"){
            this.type_layanan = "Infrastruktur 1P - 1P"
          
          }else if(val.migrasi == "10"){
            this.type_layanan = "Layanan 1P-2P"
          
          }else if(val.migrasi == "5"){
            this.type_layanan = "Infrastruktur 1P - 2P"
          
          }else if(val.migrasi == "2"){
            this.type_layanan = "Layanan 1P-3P"
          
          }else if(val.migrasi == "6"){
            this.type_layanan = "Infrastruktur 1P - 3P"
          
          }else if(val.migrasi == "3"){
            this.type_layanan = "Layanan 2P-3P"
          
          }else if(val.migrasi == "7"){
            this.type_layanan = "Infrastruktur 2P - 2P"
          
          }else if(val.migrasi == "8"){
            this.type_layanan = "Infrastruktur 2P - 3P"
          
          }else if(val.migrasi == "9"){
            this.type_layanan = "Infrastruktur 3P - 3P"
          }
        }else if(val.tambahan != undefined){
          if(val.tambahan == "1"){
            this.type_layanan = "Change STB"
          }else if(val.tambahan == "2"){
            this.type_layanan = "STB Tambahan"
          }else if(val.tambahan == "3"){
            this.type_layanan = "PLC"
          
          }else if(val.tambahan == "4"){
            this.type_layanan = "Wifi Extender"
          }
        }

      })

      this.storage.get('nik').then(val =>{
        this.nama_signature = year+""+month+""+day+""+hours+""+minutes+""+val;
      })

      this.storage.get('data4').then((val)=>{
        this.test_voice = val.test_voice
        this.test_internet = val.test_internet
        this.test_use_tv = val.test_use_tv
        console.log('con4', val);
      })

      this.storage.get('data').then((val) => {
        this.data = val;
      });

      this.storage.get('data2').then((val) => {
        this.data2 = val;
      });

      this.storage.get('data3').then((val) => {
        console.log('con', val);
        this.data3 = val;
      });

      this.storage.get('data4').then((val) => {
        this.data4 = val;
      });

      this.storage.get('data5').then((val) => {
        console.log('con', val);
        this.data5 = val;
      });

      this.storage.get('data6').then((val) => {
        console.log('con', val);
        this.data6 = val;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResumePage');
  }
  
  actionBack(){
		this.navCtrl.pop();
	}

  openSignatureModel1(){
    let modal1 = this.modalController.create(SignaturePage);
     this.sum_pelanggan++;
     modal1.onDidDismiss(data => {
       console.log(data);
       this.loading();
      this.signatureImage1 = data.signatureImage;
      console.log(data.signatureImage);
      this.sendPostRequest(this.signatureImage1,this.nama_signature+"_1_"+this.sum_pelanggan+".png");
    });
   modal1.present();
}

openSignatureModel2(){
   let modal2 = this.modalController.create(SignaturePage);
   this.sum_mitra++;
   modal2.onDidDismiss(data =>{
        this.loading();
       this.signatureImage2 = data.signatureImage;
       this.sendPostRequest(this.signatureImage2,this.nama_signature+"_2_"+this.sum_mitra+".png");
    });
   modal2.present();
}

loading(){
  this.loader = this.loadingCtrl.create({
    content: "please Wait.."
  })
  // execute loading 
  this.loader.present();
}

sendPostRequest(data,nama){
  var link = 'http://alista.telkomakses.co.id/amalia/upload_base64.php';
  var myData = JSON.stringify({data: data,nama: nama});
  
  console.log(myData);
  this.http.post(link, myData)
  .subscribe(data => {
   this.loader.dismiss();
  }, error => {
   alert(error);
   this.loader.dismiss();
  console.log("Oooops!");
  });
}

actionPut(){
  if(this.tempat_ttd == undefined){
    alert('Tempat tanda tangan tidak boleh kosong')
    return true
  }
  let confirm = this.alertCtrl.create({
    title: 'Sertakan email pelanggan ',
    inputs: [
      {
        name: 'email',
        placeholder: 'masukan email pelanggan (Wajib)'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
        }
      },
      {
        text: 'OK',
        handler: (data) => {
        //confirm.dismiss();
        this.loading();

          var js = JSON.stringify(this.data);
          var js2 = JSON.stringify(this.data2);
          var js3 = JSON.stringify(this.data3);
          var js4 = JSON.stringify(this.data4);
          var js5 = JSON.stringify(this.data5);
          var js6 = JSON.stringify(this.data6);
          
          var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian2.php?halaman1="+js+"&halaman2="+
          js2+"&halaman3="+js3
          +"&halaman4="+js4
          +"&halaman5="+js5
          +"&halaman6="+js6
          +"&email="+data.email
          +"&ttd1="+this.nama_signature+"_1_"+this.sum_pelanggan+".png"
          +"&ttd2="+this.nama_signature+"_2_"+this.sum_mitra+".png"
          +"&tempat_ttd="+this.tempat_ttd
          +"&versi="+this.uri.versi; 
          console.log(ini)
          this.http.get(ini)
            .map(res => res.json())
            .subscribe(data => {
              this.loader.dismiss();
              if(data.status == "ok"){
                  this.showAlert(data.message);
                  this.navCtrl.setRoot(PemakaianPage);
              }else{
                this.showAlert(data.message);
              }
            },error =>{
                console.log('error put '+error);
            });
        }
      }
    ]
  });
confirm.present();
}

showAlert(x){
  let alert = this.alertCtrl.create({
    title: 'Alert',
    subTitle: x,
    buttons: ['OK']
  });
  alert.present();
}


  

}
