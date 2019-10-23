import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UriProvider  } from '../../providers/uri/uri';
import { Pemakaian4Page } from '../pemakaian4/pemakaian4';


/**
 * Generated class for the FotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
})
export class FotoPage {

 img1: any = "icon_camera.png";
 img2: any = "icon_camera.png";
 img3: any = "icon_camera.png";
 img4: any = "icon_camera.png";
 img5: any = "icon_camera.png";
 img6: any = "icon_camera.png";
 img7: any = "icon_camera.png";
 nama_foto: any= "-";
 path: any;
 nik: any = "955139";
 deg1: any = "90deg";
 nama_file: any;
 isian: any = 'nok';
 pilihan: any;
 loader: any;


 lat_1: any;
 lat_2: any;
 lat_3: any;
 lat_4: any;
 lat_5: any;
 lat_6: any;
 lat_7: any;

 long_1: any;
 long_2: any;
 long_3: any;
 long_4: any;
 long_5: any;
 long_6: any;
 long_7: any;

 date_1: any;
 date_2: any;
 date_3: any;
 date_4: any;
 date_5: any;
 date_6: any;
 date_7: any;

 name_1: any;
 name_2: any;
 name_3: any;
 name_4: any;
 name_5: any;
 name_6: any;
 name_7: any;

data: any;
data2: any;
data3: any;
data4: any;

// nik: any;

 latitude: any;
 longitude: any;
 date_new: any;

  uri_api_alista: any;



  constructor(public navCtrl: NavController,
   private fileChooser: FileChooser,
   private storage: Storage,
   public TransferObject: FileTransferObject,
   private transfer: FileTransfer,
   public platform: Platform,
   public uri: UriProvider,
   public loadingCtrl: LoadingController,
   private geolocation: Geolocation,
   public alertCtrl: AlertController,

   public navParams: NavParams,private camera: Camera
  	,private file: File,
  	public http: Http,
  	private filePath: FilePath
  	){

    this.uri_api_alista = this.uri.uri_api_alista;

    this.platform.ready().then(() => {
        this.storage.get('nik').then((val) => {
        	this.nik = val
        	this.showConfirmFoto();
	  		var date = new Date();

	        var year = date.getFullYear();
	        var month = date.getMonth() + 1;
	        var day = date.getDate();
	        var hours = date.getHours();
	        var minutes = date.getMinutes();
	        var seconds = date.getSeconds();
	        var millisecond = date.getMilliseconds();

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
	            console.log('con', val);
	            this.data4 = val;
	          });
			
	        this.nama_foto = year+""+month+""+day+""+hours+""+minutes+""+seconds+""+millisecond+""+this.nik;

	        this.koordinat();

			 
        })
    })
  }

  koordinat(){
  	 this.geolocation.getCurrentPosition().then((resp) => {
			 this.latitude = resp.coords.latitude;
			 this.longitude = resp.coords.longitude;

			}).catch((error) => {
			  console.log('Error getting location', error);
			});
  }

  getDate(){
  		var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var millisecond = date.getMilliseconds();

        return year+"-"+month+"-"+day+" "+hours+":"+minutes
  }
   
	take(index_foto){
		let options: CameraOptions = {
		  quality: 100,
			allowEdit: true,
			saveToPhotoAlbum: true,
			correctOrientation: true,
			encodingType: this.camera.EncodingType.JPEG,
			destinationType: this.camera.DestinationType.FILE_URI
		}

		this.camera.getPicture(options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64 (DATA_URL):
		 let filename = imageData.substring(imageData.lastIndexOf('/')+1);
    	 let path =  imageData.substring(0,imageData.lastIndexOf('/')+1);
    	 

    	 this.file.readAsDataURL(path, filename).then((res)=>{
    	 	this.loading()
    	 	this.upload(filename,imageData,res,index_foto)

    // 	 	if(index_foto == "1"){
    // 	 		this.img1 = res
		 	// }else if(index_foto == "2"){
    // 	 		this.img2 = res
		 	// }else if(index_foto == "3"){
    // 	 		this.img3 = res
		 	// }else if(index_foto == "4"){
    // 	 		this.img4 = res
		 	// }else if(index_foto == "5"){
    // 	 		this.img5 = res
		 	// }else if(index_foto == "6"){
    // 	 		this.img6 = res
		 	// }else if(index_foto == "7"){
    // 	 		this.img7 = res
		 	// }

		 	// this.sendPostRequest(path,filename)
    	 	
    	 });


		 let base64Image = 'data:image/jpeg;base64,' + imageData;
		

		}, (err) => {
		 // Handle error
		});
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FotoPage');
  }

  foto(x){
  	this.koordinat()
  	if(this.pilihan == "1"){
  		this.take(x)
  	}else{
  		this.fileGet(x)

  	}
  }

  sendPostRequest(data,nama){
     var link = 'http://alista.telkomakses.co.id/amalia/upload_base64_2.php';
     var myData = JSON.stringify({data: data,nama: nama});
     
     console.log(myData);
     this.http.post(link, myData)
     .subscribe(data => {
     	alert("sending success : "+data)
     }, error => {
      alert(error);
      // this.loader.dismiss();
     console.log("Oooops!");
     });
   }

   fileGet(index_foto){
      this.fileChooser.open()
          .then(uri => {
             this.filePath.resolveNativePath(uri)
            .then(filePath => {
              this.path = filePath;
              var nama_ori = filePath.split("/");
              var index_path  = nama_ori.length;
              if(
                nama_ori[index_path-1].indexOf(".jpg") > 0  || 
                nama_ori[index_path-1].indexOf(".jpeg") > 0 || 
                nama_ori[index_path-1].indexOf(".png") > 0 || 
                nama_ori[index_path-1].indexOf(".PNG") > 0 ||
                nama_ori[index_path-1].indexOf(".JPG") > 0 ||
                nama_ori[index_path-1].indexOf(".JPEG") > 0 ||
                nama_ori[index_path-1].indexOf(".pdf") > 0 ||
                nama_ori[index_path-1].indexOf(".PDF") > 0
                ){
                 this.nama_file = nama_ori[index_path-1];
		    	 let path =  filePath.substring(0,filePath.lastIndexOf('/')+1);
		    	 
		    	 this.file.readAsDataURL(path, this.nama_file).then((res)=>{
		    	 	this.loading()
		    	 	//this.img1 = res
		    	 	this.upload(this.nama_file,filePath,res,index_foto)
		    	 })
              }else{
                this.path = "-";
                this.nama_file = "-";
                //this.showPromptApp("File yang di perbolehkan {.jpg, .jpeg, .png, .PNG, .JPG, .JPEG, .pdf, .PDF}");
              }
            })
            .catch(err => {});
          })
          .catch(e => {});
    }

    upload(nama,path,res,index_foto){
      var options = {
        fileKey: "file",
        fileName: nama,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': nama}
      };
     
      var url = "http://180.250.124.181/API/amalia/uploads.php";
      const fileTransfer: FileTransferObject = this.transfer.create();
      //Use the FileTransfer to upload the image
      fileTransfer.upload(path, url, options).then(data => {
      		this.loader.dismiss();
      		if(index_foto == "1"){
				this.img1 = res
				this.date_1 = this.getDate()
				this.lat_1 = this.latitude
				this.long_1 = this.longitude
				this.name_1 = nama
		 	}else if(index_foto == "2"){
    	 		this.img2 = res
				this.date_2 = this.getDate()
				this.lat_2 = this.latitude
				this.long_2 = this.longitude
				this.name_2 = nama
		 	}else if(index_foto == "3"){
    	 		this.img3 = res
				this.date_3 = this.getDate()
				this.lat_3 = this.latitude
				this.long_3 = this.longitude
				this.name_3 = nama
		 	}else if(index_foto == "4"){
    	 		this.img4 = res
				this.date_4 = this.getDate()
				this.lat_4 = this.latitude
				this.long_4 = this.longitude
				this.name_4 = nama
		 	}else if(index_foto == "5"){
    	 		this.img5 = res
				this.date_5 = this.getDate()
				this.lat_5 = this.latitude
				this.long_5 = this.longitude
				this.name_5 = nama
		 	}else if(index_foto == "6"){
    	 		this.img6 = res
				this.date_6 = this.getDate()
				this.lat_6 = this.latitude
				this.long_6 = this.longitude
				this.name_6 = nama
		 	}else if(index_foto == "7"){
    	 		this.img7 = res
				this.date_7 = this.getDate()
				this.lat_7 = this.latitude
				this.long_7 = this.longitude
				this.name_7 = nama
		 	}
      }, err => {});

    }


    showConfirmFoto() {
    const confirm = this.alertCtrl.create({
      title: 'Gunaka Attach Foto?',
      message: '*bila menggunakan choose file di anjurkan menggunakan foto dari aplikasi GPS Camera',
      buttons: [
        {
          text: 'Foto Langsung',
          handler: () => {
            this.pilihan = "1";
            this.isian = 'ok';
          }
        },
        {
          text: 'Pilih Foto',
          handler: () => {
            this.pilihan = "2";
            
          }
        }
      ]
    });
    confirm.present();
  }

  loading(){
  	this.loader = this.loadingCtrl.create({
  		content: "please Wait.."
  	})
  	// execute loading 
  	this.loader.present();
  }


  showConfirm() {

  	if(this.img1 == 'icon_camera.png'){
  		alert("Foto ODP tidak boleh kosong")
  	}else if(this.img2 == 'icon_camera.png'){
  		alert("Foto Drop Core tidak boleh kosong")
  	}else if(this.img3 == 'icon_camera.png'){
  		alert("Foto tes Redaman tidak boleh kosong")
  	}else if(this.img4 == 'icon_camera.png'){
  		alert("Foto Jalur IRK tidak boleh kosong")
  	}else if(this.img5 == 'icon_camera.png'){
		alert("Foto Rumah Pelanggan tidak boleh kosong")
  	}else if(this.img6 == 'icon_camera.png'){
  		alert("Foto NTE STB tidak boleh kosong")
  	}else if(this.img7 == 'icon_camera.png'){
		alert("Foto pelanggan tidak boleh kosong")
  	} else{

      var data5 = {

        name_1:this.name_1,
        name_2:this.name_2,
        name_3:this.name_3,
        name_4:this.name_4,
        name_5:this.name_5,
        name_6:this.name_6,
        name_7:this.name_7,

        lat_1:this.lat_1,
        lat_2:this.lat_2,
        lat_3:this.lat_3,
        lat_4:this.lat_4,
        lat_5:this.lat_5,
        lat_6:this.lat_6,
        lat_7:this.lat_7,

        long_1:this.long_1,
        long_2:this.long_2,
        long_3:this.long_3,
        long_4:this.long_4,
        long_5:this.long_5,
        long_6:this.long_6,
        long_7:this.long_7,

        date_1:this.date_1,
        date_2:this.date_2,
        date_3:this.date_3,
        date_4:this.date_4,
        date_5:this.date_5,
        date_6:this.date_6,
        date_7:this.date_7,


    }

      this.storage.set('data_foto',data5);
      this.navCtrl.push(Pemakaian4Page);
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
