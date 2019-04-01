import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pemakaian4Page} from'../pemakaian4/pemakaian4';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the Pemakaian3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pemakaian3',
  templateUrl: 'pemakaian3.html',
})
export class Pemakaian3Page {
 	sn_ont: any;
 	sn_modem: any;
 	modem: any;
 	power: any;
 	dsl: any;
 	internet: any;
 	mac_address: any;
  sn_plc: any;
  sn_wifi_extender: any;

  speed_other: any;
 	nama: any;
 	notel_teknisi: any;
 	psb: any;
 	migrasi: any;
 	speed: any ='1';

 	other: any;
 	other_view: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,private barcodeScanner: BarcodeScanner,public alertCtrl: AlertController) {
    
  }

  actionScanOnt(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_ont = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }

  actionModem(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_modem = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }
  
  actionMac(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.mac_address = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Pemakaian3Page');
  }

  actionWifi(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_wifi_extender = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }

  actionPlc(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_plc = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }


  actionNext(){

    // if(this.sn_ont == undefined){
    //   this.showAlert("SN ONT tidak boleh kosong");
    // }else if(this.sn_modem == undefined){
    //   this.showAlert("Modem tidak boleh kosong");
    // }else if(this.modem == undefined){
    //   this.showAlert("Modem tidak boleh kosong");
    // }else 

    //if(this.mac_address == undefined){
    //  this.showAlert("Mac Address STB tidak boleh kosong");
    //}//else if(this.nama == undefined){
      //this.showAlert("Nama Teknisi tidak boleh kosong");
    //}//else if(this.notel_teknisi == undefined){
     // this.showAlert("Notel Teknisi tidak boleh kosong");
    //}else 

    if(this.psb  == undefined && this.migrasi  == undefined){
      this.showAlert("PSB atau Migrasi tidak boleh kosong");
    }else{
        var data3 = {
            sn_ont:this.sn_ont,
            sn_modem:this.sn_modem,
            modem:this.modem,
            power:this.power,
            dsl:this.dsl,
            sn_plc:this.sn_plc,
            sn_wifi_extender:this.sn_wifi_extender,
            internet:this.internet,
            mac_address:this.mac_address,
            nama:this.nama,
            notel_teknisi:this.notel_teknisi,
            psb:this.psb,
            migrasi:this.migrasi,
            speed:this.speed,
            other_speed:this.speed_other
          }
            this.storage.set('data3',data3);
            this.navCtrl.push(Pemakaian4Page);
    }
  }

  actionBack(){
  	this.navCtrl.pop();
  }

  actionChangeKecepatan(x){
  	if(x == 'other'){
  		this.other_view = 1;
  	}else{
  		this.other_view = 0;
  	}
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
