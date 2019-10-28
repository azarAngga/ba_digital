webpackJsonp([4],{

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_path__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_chooser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pemakaian_pemakaian__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ba_ba__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__login_login__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__list_wo_list_wo__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_uri_uri__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













// element



//import { CreateWoPage } from '../create-wo/create-wo';



var HomePage = /** @class */ (function () {
    function HomePage(file, platform, filePath, fileChooser, navCtrl, http, camera, events, loadingCtrl, storage, TransferObject, transfer, device, uri, alertCtrl) {
        var _this = this;
        this.file = file;
        this.platform = platform;
        this.filePath = filePath;
        this.fileChooser = fileChooser;
        this.navCtrl = navCtrl;
        this.http = http;
        this.camera = camera;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.TransferObject = TransferObject;
        this.transfer = transfer;
        this.device = device;
        this.uri = uri;
        this.alertCtrl = alertCtrl;
        this.optionsList = [];
        this.nol = 0;
        this.pages = [];
        this.number_index = 0;
        this.path = "-";
        this.nama_file = "-";
        this.platform_device = this.device.platform;
        console.log(this.device);
        // URI
        this.uri_api_alista = this.uri.uri_api_alista;
        this.uri_app_amalia = this.uri.uri_app_amalia;
        this.uri_api_wimata = this.uri.uri_api_wimata;
        this.platform.ready().then(function () {
            _this.storage.get('nik').then(function (val) {
                _this.setData("oke");
                _this.nik = val;
                _this.http.get(_this.uri_api_alista + 'ios/get_data_team_leader.php?nik=' + _this.nik)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    try {
                        console.log("ini witel", data[0].witel);
                        _this.setWitel(data[0].witel);
                        _this.loadMenuWithWitel();
                        _this.events.publish('menu:tampil', _this.pages);
                    }
                    catch (err) {
                        console.log(err);
                        _this.loadMenu();
                        _this.events.publish('menu:tampil', _this.pages);
                    }
                }, function (error) {
                });
                _this.checkUpdate();
                _this.loadNameJabatan();
                _this.onLoad(_this.nik);
            });
        });
    }
    HomePage_1 = HomePage;
    HomePage.prototype.SubmitWo = function () {
        try {
            //for(var ini = 0; ini < this.path.length; ini++){
            this.upload(this.nama_file, this.path);
            //}
            var field_kosong = false;
            var over_stok = false;
            var length_update_material = this.modeKeys.length;
            for (var idx = 0; idx < length_update_material; idx++) {
                if (this.modeKeys[idx].length < 1) {
                    field_kosong = true;
                }
                var stok = this.data_wo[idx].stok;
                var vol = this.modeKeys[idx];
                if (Number(vol) > Number(stok)) {
                    over_stok = true;
                    console.log('over1', this.data_wo[idx].stok);
                    console.log('over2', this.modeKeys[idx]);
                }
            }
            if (field_kosong == true) {
                this.showPrompt("Field update material mandatory");
            }
            else {
                if (over_stok == true) {
                    this.showPrompt("Terdeteksi update material over stok");
                }
                else {
                    this.loading();
                    this.submitAction();
                }
            }
        }
        catch (err) { }
    };
    HomePage.prototype.submitAction = function () {
        var _this = this;
        // create header content
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        // create option 
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var id_barang = [];
        var stok = [];
        var satuan = [];
        var volume = [];
        var wo_number = [];
        for (var idx = 0; idx < this.data_wo.length; idx++) {
            id_barang[idx] = this.data_wo[idx].id_barang;
            stok[idx] = this.data_wo[idx].stok;
            satuan[idx] = this.data_wo[idx].satuan;
            volume[idx] = this.modeKeys[idx];
            wo_number = this.wo;
        }
        var wo = 'wo_number=' + wo_number + '&nik=' + this.nik + '&id_barang=' + id_barang + '&volume=' + volume + '&flag=ionic&namafile=' + this.nama_file + "&versi=" + this.uri.versi;
        //this.showAlertNews(wo);
        console.log("ini_parmeter " + this.uri_api_alista + 'ios/put_data_pemakaian_update_eksisting.php' + wo);
        //execute url post
        this.http.post(this.uri_api_alista + 'ios/put_data_pemakaian.php', wo, requestOptions)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            var data_response = data.status;
            if (data_response == true) {
                _this.navCtrl.setRoot(HomePage_1);
                _this.showPrompt(data.message);
            }
            else {
                _this.showPrompt(data.message);
            }
            _this.loader.dismiss();
        });
    };
    HomePage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        // execute loading 
        this.loader.present();
    };
    HomePage.prototype.showPrompt = function (x) {
        var prompt = this.alertCtrl.create({
            title: 'Response Server',
            message: x,
            buttons: [
                {
                    text: 'Ok',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.showPromptApp = function (x) {
        var prompt = this.alertCtrl.create({
            title: 'Warning',
            message: x,
            buttons: [
                {
                    text: 'Ok',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.setData = function (x) {
        this.storage.set('session', x);
    };
    HomePage.prototype.setNik = function (x) {
        this.storage.set('nik', x);
    };
    HomePage.prototype.onLoad = function (nik) {
        var _this = this;
        this.modeKeys = [];
        console.log(this.modeKeys[0]);
        this.count_wo = 0;
        this.data_wo = [
            { id_barang: '-', stok: "0", satuan: "-" }
        ];
        this.optionsList.push({ value: 1, text: 'option 1', checked: false });
        this.optionsList.push({ value: 2, text: 'option 2', checked: false });
        this.loading();
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        // create option 
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var wo = 'nik=' + nik;
        //let wo = 'nik=97150427';
        console.log(wo);
        console.log(this.uri_api_alista + 'get_data_list_material.php');
        //execute url post
        this.http.post(this.uri_api_alista + 'get_data_list_material.php', wo, requestOptions)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("masuk material");
            _this.data_wo = data;
            for (var idx = 0; idx < data.length; idx++) {
                _this.modeKeys[idx] = 0;
            }
            // dismiss loading from loader
            _this.loader.dismiss();
        });
    };
    HomePage.prototype.checkUpdate = function () {
        var _this = this;
        //this.http.get('http://10.40.108.153/api_test/ios/news_amalia.php?versi='+this.versi).map(res => res.json()).subscribe(data => {
        this.http.get(this.uri_app_amalia + 'news_amalia.php?versi=' + this.uri.versi).map(function (res) { return res.json(); }).subscribe(function (data) {
            var versi_now = data.update[0].versi;
            var trigger = data.update[0].trigger;
            var message = data.update[0].message;
            var message_news = data.news[0].message;
            var tigger_news = data.news[0].trigger;
            if (Number(_this.versi) < Number(versi_now)) {
                if (trigger == 'on') {
                    _this.showAlert(message);
                    console.log("versi", trigger);
                }
                else {
                    console.log("versi", trigger);
                }
            }
            else {
                if (trigger == 'on') {
                    _this.showAlert(message);
                }
            }
            if (tigger_news == 'on') {
                _this.showAlertNews(message_news);
            }
        });
    };
    HomePage.prototype.loadNameJabatan = function () {
        var _this = this;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        // TODO: Encode the values using encodeURIComponent().
        var body = 'nik=' + this.nik;
        console.log('nikName', this.nik);
        this.http.post(this.uri_api_wimata + 'ws_get_data_all_or_one.php', body, options)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log("dari api", data);
            _this.storage.get('foto')
                .then(function (val) {
                _this.foto = val;
                _this.no_gsm(data.no_gsm);
                _this.name(data.name);
                _this.events.publish('menu:tampilNama', data.name, data.nama_posisi, _this.foto);
            });
        });
    };
    HomePage.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Amalia update',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.showAlertNews = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Amalia News',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.browse = function () {
        this.fileGet();
        this.path = "please wait...";
    };
    HomePage.prototype.fileGet = function () {
        var _this = this;
        //var path;
        this.fileChooser.open()
            .then(function (uri) {
            _this.filePath.resolveNativePath(uri)
                .then(function (filePath) {
                _this.path = filePath;
                var nama_ori = filePath.split("/");
                var index_path = nama_ori.length;
                if (nama_ori[index_path - 1].indexOf(".jpg") > 0 ||
                    nama_ori[index_path - 1].indexOf(".jpeg") > 0 ||
                    nama_ori[index_path - 1].indexOf(".png") > 0 ||
                    nama_ori[index_path - 1].indexOf(".PNG") > 0 ||
                    nama_ori[index_path - 1].indexOf(".JPG") > 0 ||
                    nama_ori[index_path - 1].indexOf(".JPEG") > 0 ||
                    nama_ori[index_path - 1].indexOf(".pdf") > 0 ||
                    nama_ori[index_path - 1].indexOf(".PDF") > 0) {
                    _this.nama_file = nama_ori[index_path - 1];
                    //this.path = this.path.replace('file://', '');
                }
                else {
                    _this.path = "-";
                    _this.nama_file = "-";
                    _this.showPromptApp("File yang di perbolehkan {.jpg, .jpeg, .png, .PNG, .JPG, .JPEG, .pdf, .PDF}");
                }
                //this.showAlertNews(this.nama_file);
            })
                .catch(function (err) { });
        })
            .catch(function (e) { });
    };
    HomePage.prototype.upload = function (nama, path) {
        var options = {
            fileKey: "file",
            fileName: nama,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': nama }
        };
        var url = this.uri_app_amalia + "uploads.php";
        var fileTransfer = this.transfer.create();
        //Use the FileTransfer to upload the image
        fileTransfer.upload(path, url, options).then(function (data) {
        }, function (err) { });
    };
    HomePage.prototype.fotoAction = function (i) {
        this.takePicture(this.camera.PictureSourceType.CAMERA, i);
    };
    HomePage.prototype.takePicture = function (sourceType, i) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), i);
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName(), i);
            }
        }, function (err) {
            //this.presentToast('Error while selecting image.');
        });
    };
    // Copy the image to a local folder
    HomePage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName, i) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.path = cordova.file.dataDirectory + newFileName;
            _this.nama_file = _this.nik + "_" + newFileName;
        }, function (error) {
            //this.presentToast('Error while storing file.');
        });
    };
    HomePage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    HomePage.prototype.setWitel = function (x) {
        this.storage.set('witel', x);
    };
    HomePage.prototype.no_gsm = function (x) {
        this.storage.set('no_gsm', x);
    };
    HomePage.prototype.name = function (x) {
        this.storage.set('name', x);
    };
    HomePage.prototype.loadMenu = function () {
        this.pages = [
            { title: 'Update Material Alista', component: HomePage_1 },
            { title: 'List Stok Barang', component: __WEBPACK_IMPORTED_MODULE_14__list_wo_list_wo__["a" /* ListWoPage */] },
            { title: 'Create BA online', component: __WEBPACK_IMPORTED_MODULE_11__pemakaian_pemakaian__["a" /* PemakaianPage */] },
            { title: 'List BA Online', component: __WEBPACK_IMPORTED_MODULE_12__ba_ba__["a" /* BaPage */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_13__login_login__["a" /* LoginPage */] }
        ];
    };
    HomePage.prototype.loadMenuWithWitel = function () {
        this.pages = [
            { title: 'Update Material Alista', component: HomePage_1 },
            { title: 'List Stok Barang', component: __WEBPACK_IMPORTED_MODULE_14__list_wo_list_wo__["a" /* ListWoPage */] },
            { title: 'Create BA online', component: __WEBPACK_IMPORTED_MODULE_11__pemakaian_pemakaian__["a" /* PemakaianPage */] },
            { title: 'List BA Online', component: __WEBPACK_IMPORTED_MODULE_12__ba_ba__["a" /* BaPage */] },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_13__login_login__["a" /* LoginPage */] }
        ];
    };
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <button ion-button menuToggle >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Update Material Alista</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n\n  <ion-item>\n    <ion-label fixed>Wo Number :</ion-label>\n    <ion-input [(ngModel)]="wo" type="text"  value="" placeholder="..."></ion-input>\n  </ion-item>\n  \n</ion-list>\n\n  <ion-item-group *ngFor="let row of data_wo; let i =index">\n    <ion-item-divider color="light" text-wrap> ID Barang &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :  <b>{{row.id_barang}}</b>  </ion-item-divider>\n    <ion-item>Stock Barang  &nbsp;&nbsp;&nbsp;&nbsp;: {{row.stok}}</ion-item>\n    <ion-item>Satuan Barang &nbsp;&nbsp;: {{row.satuan}}</ion-item>\n    <ion-item>\n        <ion-label >Volume Update &nbsp;: </ion-label>\n        <ion-input value="{{nol.value}}" [(ngModel)]="modeKeys[i]" type="text" placeholder="..."  ></ion-input>\n    </ion-item>\n\n  </ion-item-group>\n    <div *ngIf="platform_device ==\'Android\'">\n        <ion-item>\n            File   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: \n            <button wrap-text ion-button color="danger"  (click)="browse()">Upload</button> {{path}}\n            <hr/>\n        </ion-item>\n  </div>\n  <div *ngIf="platform_device ==\'iOS\'">\n        <ion-item>\n            File   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: \n            <button wrap-text ion-button color="danger"  (click)="fotoAction()">Foto </button> {{path}}\n            <hr/>\n        </ion-item>\n  </div>\n<button  ion-button full (click)="SubmitWo()"   color="light" >Submit</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["b" /* FileTransferObject */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_15__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], HomePage);
    return HomePage;
    var HomePage_1;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__list_wo_list_wo__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pemakaian_pemakaian__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ba_ba__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_android_permissions__ = __webpack_require__(228);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, http, http2, alertCtrl, loadingCtrl, storage, device, platform, uri, androidPermissions, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.http2 = http2;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.device = device;
        this.platform = platform;
        this.uri = uri;
        this.androidPermissions = androidPermissions;
        this.events = events;
        this.rootPage = LoginPage_1;
        this.uri_api_amalia = this.uri.uri_api_amalia;
        this.versi = this.uri.versi;
        this.setData("nok");
        this.pages = [];
        this.events.publish('menu:tampil', this.pages);
        this.events.publish('menu:tampilNama', "", "", "hana_splashx3.png");
        this.platform.ready().then(function () {
            _this.androidPermissions.checkPermission(_this.androidPermissions.PERMISSION.CAMERA).then(function (result) {
                _this.androidPermissions.requestPermissions([_this.androidPermissions.PERMISSION.CAMERA, _this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
            }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.CAMERA); });
            _this.androidPermissions.checkPermission(_this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(function (result) {
                _this.androidPermissions.requestPermissions([_this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, _this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
                _this.androidPermissions.requestPermissions([_this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, _this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
            }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE); });
            _this.androidPermissions.checkPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(function (result) {
                _this.androidPermissions.requestPermissions([_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, _this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
            }, function (err) { return _this.androidPermissions.requestPermission(_this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION); });
        });
    }
    LoginPage_1 = LoginPage;
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.putLogin = function () {
        var _this = this;
        if (this.username != null && this.password != null && this.username != "" && this.password != "") {
            this.presentLoading();
            //console.log('http://10.40.108.153/api_test/amalia/login.php?username='+this.username+'&password='+this.password);
            //this.http.get('http://apps.telkomakses.co.id/hana/ios/get_data_hana_login_default.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
            this.http2.get(this.uri_api_amalia + 'get_data_hana_login_default.php?username=' + this.username + '&password=' + this.password + "&versi=" + this.uri.versi).map(function (res) { return res.json(); }).subscribe(function (data) {
                //this.http.get('http://10.40.108.153/api_test/amalia/login.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
                _this.items = data;
                console.log(_this.items);
                // this.loadMenu();
                //    this.setFoto(this.items.result[0].foto);
                //    this.events.publish('menu:tampil', this.pages);
                //    this.loadMenu();
                //    this.setData("oke");
                //    this.setNik(this.username); 
                //    //this.setNik('16940495');
                //    this.navCtrl.setRoot(HomePage);
                //    this.loader.dismiss();
                if (_this.items.result[0].status != "") {
                    if (_this.items.result[0].status == "sukses") {
                        _this.loadMenu();
                        _this.setFoto(_this.items.result[0].foto);
                        _this.events.publish('menu:tampil', _this.pages);
                        _this.loadMenu();
                        //this.setData("oke");
                        _this.setNik(_this.username);
                        //this.setNik('16940495');
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__pemakaian_pemakaian__["a" /* PemakaianPage */]);
                        _this.loader.dismiss();
                    }
                    else {
                        //cheat
                        //this.navCtrl.setRoot(HomePage);
                        //this.setNik('15980003');
                        //--
                        _this.showAlert(_this.items.result[0].message);
                        _this.loader.dismiss();
                    }
                }
            });
        }
        else {
            //   this.http2.get("https://api.telkomakses.co.id/API/amalia/get_data_hana_login_default.php?username=15892288&password=a").map(res => res.json()).subscribe(data => {
            //   //this.http.get('http://10.40.108.153/api_test/amalia/login.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
            //  alert(data);
            // });
            this.showAlert("username dan password tidak boleh kosong");
        }
    };
    LoginPage.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Mohon Maaf',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        this.loader.present();
    };
    LoginPage.prototype.setData = function (x) {
        console.log("set data set");
        this.storage.set('session', x);
    };
    LoginPage.prototype.setFoto = function (x) {
        this.storage.set('foto', x);
    };
    LoginPage.prototype.setNik = function (x) {
        this.storage.set('nik', x);
    };
    LoginPage.prototype.loadMenu = function () {
        this.pages = [
            { title: 'Update Material Alista', component: __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */] },
            { title: 'List Stok Barang', component: __WEBPACK_IMPORTED_MODULE_6__list_wo_list_wo__["a" /* ListWoPage */] },
            { title: 'Create BA Digital', component: __WEBPACK_IMPORTED_MODULE_9__pemakaian_pemakaian__["a" /* PemakaianPage */] },
            { title: 'List BA Digital', component: __WEBPACK_IMPORTED_MODULE_10__ba_ba__["a" /* BaPage */] },
            { title: 'Logout', component: LoginPage_1 }
        ];
    };
    LoginPage.prototype.testHttp = function () {
        this.http.get('http://api.telkomakses.co.id/API/amalia/test.php', {}, {})
            .then(function (data) {
            alert(data.data);
            console.log(data.status);
            console.log(data.data); // data received by server
            console.log(data.headers);
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    LoginPage = LoginPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/login/login.html"*/'<ion-header>\n\n</ion-header>\n\n\n<ion-content padding>\n\n<ion-list>\n<br/>\n<br/>\n<br/>\n<br/>\n<br/>\n<br/>\n<div align="center">\n<img src="AMALIA.png" style="height: 200px" />\n</div>\n  <ion-item>\n    <ion-label fixed><font  color="#303133">Username</font></ion-label>\n    <ion-input type="text" value="" [(ngModel)]="username"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label fixed><font  color="#303133">Password</font></ion-label>\n    <ion-input type="password" [(ngModel)]="password"></ion-input>\n  </ion-item>\n\n  <button color="light" ion-button full (click)="putLogin()">Login</button>\n  <br/>\n  <br/>\n  <br/>\n  <i>Versi {{versi}}</i>\n\n</ion-list>\n</ion-content>\n\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], LoginPage);
    return LoginPage;
    var LoginPage_1;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(176);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.latitude = "-";
        this.longitude = "-";
        this.data = "-";
        this.alamat = "";
        this.data = navParams.get('data');
    }
    MapPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        var options = {
            enableHighAccuracy: true
        };
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["d" /* LocationService */].getMyLocation(options).then(function (location) {
            console.log(location);
            _this.mapOptions = {
                controls: {
                    'compass': true,
                    'myLocationButton': true,
                    'myLocation': true,
                    'indoorPicker': true,
                    'zoom': true,
                }
            };
            _this.setCamera(location.latLng.lat, location.latLng.lng);
            _this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMaps */].create('map_canvas', _this.mapOptions);
            _this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* GoogleMapsEvent */].MAP_READY).then(function () { });
            _this.map.on(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* GoogleMapsEvent */].MAP_CLICK).subscribe(function (data) {
                console.log(data);
                //alert(data[0]['lat']);
                _this.latitude = data[0]['lat'];
                _this.longitude = data[0]['lng'];
                _this.setMarker(_this.latitude, _this.longitude);
            });
        }).catch(function (err) {
            _this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMaps */].create('map_canvas');
            _this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* GoogleMapsEvent */].MAP_READY).then(function () { });
            _this.map.on(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* GoogleMapsEvent */].MAP_CLICK).subscribe(function (data) {
                console.log(data);
                //alert(data[0]['lat']);
                _this.latitude = data[0]['lat'];
                _this.longitude = data[0]['lng'];
                _this.setMarker(_this.latitude, _this.longitude);
            });
        });
    };
    MapPage.prototype.setCamera = function (lat, lng) {
        this.mapOptions = {
            camera: {
                target: {
                    lat: lat,
                    lng: lng
                },
                zoom: 18,
                tilt: 30
            },
            controls: {
                'compass': true,
                'myLocationButton': true,
                'myLocation': true,
                'indoorPicker': true,
                'zoom': true,
            }
        };
    };
    MapPage.prototype.setMarker = function (lat, lng) {
        this.map.clear();
        var marker = this.map.addMarkerSync({
            title: 'Marker ' + this.data,
            icon: 'blue',
            animation: 'DROP',
            position: {
                lat: lat,
                lng: lng
            }
        });
    };
    MapPage.prototype.searchPlace = function () {
        //this.alamat = 'Kyoto, Japan';
        var _this = this;
        // Address -> latitude,longitude
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* Geocoder */].geocode({
            "address": this.alamat
        }).then(function (results) {
            console.log(results);
            _this.latitude = results[0].position.lat;
            _this.longitude = results[0].position.lng;
            if (!results.length) {
                _this.isRunning = false;
                return null;
            }
            //Add a marker
            var marker = _this.map.addMarkerSync({
                'position': results[0].position,
                'title': JSON.stringify(results[0].position)
            });
            // Move to the position
            _this.map.animateCamera({
                'target': marker.getPosition(),
                'zoom': 17
            }).then(function () {
                //marker.showInfoWindow();
                _this.map.clear();
                _this.isRunning = false;
            });
        });
    };
    MapPage.prototype.setKoordinat = function () {
        if (this.latitude == "-") {
            alert("Tandai peta terlebih dahulu dengan cara klik pada peta");
        }
        else {
            var data = { 'latitude': this.latitude, 'longitude': this.longitude, 'data': this.data };
            this.viewCtrl.dismiss(data);
        }
    };
    MapPage.prototype.ionViewWillLeave = function () {
        var nodeList = document.querySelectorAll('._gmaps_cdv_');
        for (var k = 0; k < nodeList.length; ++k) {
            nodeList.item(k).classList.remove('_gmaps_cdv_');
        }
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/map/map.html"*/'<!--\n  Generated template for the MapPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-toolbar>\n        <ion-searchbar placeholder="Alamat" [(ngModel)]="alamat" (ionInput)="searchPlace()"></ion-searchbar>\n    </ion-toolbar>	\n  </ion-navbar>\n</ion-header>\n\n<ion-content  >\n	<div id="map_canvas"></div>\n	<ion-card>\n\n  <ion-card-content>\n   	<div align="center">\n   	 \n	  <div align="center"><h2>*Klik peta untuk menandai koordinat</h2></div>\n	 \n\n	 	<button (click)="setKoordinat()" ion-button icon-only>\n		  simpan sebagai Titik {{data}}\n		</button>\n\n	</div>\n  </ion-card-content>\n\n</ion-card>\n	\n	\n\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pemakaian2_pemakaian2__ = __webpack_require__(180);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the MaterialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MaterialPage = /** @class */ (function () {
    function MaterialPage(navCtrl, storage, loadingCtrl, uri, platform, http, device, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.uri = uri;
        this.platform = platform;
        this.http = http;
        this.device = device;
        this.navParams = navParams;
        this.nol = 0;
        this.no_material = false;
        this.optionsList = [];
        this.platform.ready().then(function () {
            _this.storage.get('nik').then(function (val) {
                _this.nik = val;
                console.log("ini niknya" + _this.nik);
                _this.loadMaterial(_this.nik);
            });
        });
    }
    MaterialPage.prototype.loadMaterial = function (nik) {
        this.pages = [];
        this.number_index = 0;
        this.path = "-";
        this.nama_file = "-";
        this.platform_device = this.device.platform;
        console.log(this.device);
        this.uri_api_alista = this.uri.uri_api_alista;
        this.uri_app_amalia = this.uri.uri_app_amalia;
        this.uri_api_wimata = this.uri.uri_api_wimata;
        this.onLoad(nik);
    };
    MaterialPage.prototype.onLoad = function (nik) {
        var _this = this;
        this.modeKeys = [];
        console.log(this.modeKeys[0]);
        this.count_wo = 0;
        this.data_wo = [
            { id_barang: '-', stok: "0", satuan: "-" }
        ];
        this.optionsList.push({ value: 1, text: 'option 1', checked: false });
        this.optionsList.push({ value: 2, text: 'option 2', checked: false });
        this.loading();
        var headers = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */]({
            headers: headers
        });
        var wo = 'nik=' + nik;
        this.http.post(this.uri_api_alista + 'ios/get_data_list_material2.php', wo, requestOptions)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            try {
                _this.data_wo = data;
                for (var idx = 0; idx < data.length; idx++) {
                    _this.modeKeys[idx] = 0;
                }
            }
            catch (e) {
            }
            _this.loader.dismiss();
        });
    };
    MaterialPage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        this.loader.present();
    };
    MaterialPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MaterialPage');
    };
    MaterialPage.prototype.actionNext = function () {
        var _this = this;
        this.loading();
        var id_barang_m = [];
        var stok_m = [];
        var satuan_m = [];
        var volume_m = [];
        var wo_number_m = [];
        var id_barang_m2 = [];
        var stok_m2 = [];
        var satuan_m2 = [];
        var volume_m2 = [];
        var wo_number_m2 = [];
        try {
            for (var idx = 0; idx < this.data_wo.length; idx++) {
                id_barang_m[idx] = this.data_wo[idx].id_barang;
                stok_m[idx] = this.data_wo[idx].stok;
                satuan_m[idx] = this.data_wo[idx].satuan;
                volume_m[idx] = this.modeKeys[idx];
                id_barang_m2.push(this.data_wo[idx].id_barang);
                stok_m2.push(this.data_wo[idx].stok);
                satuan_m2.push(this.data_wo[idx].satuan);
                volume_m2.push(this.modeKeys[idx]);
            }
        }
        catch (error) {
        }
        var data_new = {
            'id_barang': id_barang_m2,
            'stok': stok_m2,
            'satuan': satuan_m2,
            'volume': volume_m2
        };
        this.storage.get('data2').then(function (val) {
            var parse = JSON.stringify(val);
            var parse_material = JSON.stringify(data_new);
            console.log(_this.uri.uri_api_alista + "amalia_app/material_validation.php?layanan=" + parse + "&material=" + parse_material + "&nik=" + _this.nik + "&no_material=" + _this.no_material);
            _this.http.get(_this.uri.uri_api_alista + "amalia_app/material_validation.php?layanan=" + parse + "&material=" + parse_material + "&nik=" + _this.nik + "&no_material=" + _this.no_material)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.status) {
                    _this.storage.set('data3', data_new);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pemakaian2_pemakaian2__["a" /* Pemakaian2Page */]);
                }
                else {
                    alert(data.message);
                }
                _this.loader.dismiss();
            });
        });
    };
    MaterialPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-material',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/material/material.html"*/'<!--\n  Generated template for the MaterialPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>material</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div>\n\n    <ion-card width="100%">\n         <ion-card-content>\n           <ion-list>\n             <table width="100%">\n                 <tr>\n                 <td valign="top" width="40%">\n                     <ion-checkbox color="green" [(ngModel)]="no_material"></ion-checkbox>\n                     Tidak menggunakan material \n                 </td>\n               </tr>\n             </table>\n           \n           </ion-list>\n         </ion-card-content>\n       </ion-card>\n     <br/>\n   <div *ngIf="no_material == false">\n     <ion-item-group *ngFor="let row of data_wo; let i =index">\n       <ion-item-divider color="light" text-wrap> ID Barang &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :  <b>{{row.id_barang}}</b>  </ion-item-divider>\n       <ion-item>Stock Barang  &nbsp;&nbsp;&nbsp;&nbsp;: {{row.stok}}</ion-item>\n       <ion-item>Satuan Barang &nbsp;&nbsp;: {{row.satuan}}</ion-item>\n       <ion-item>\n           <ion-label >Volume Update &nbsp;: </ion-label>\n           <ion-input value="{{nol.value}}" [(ngModel)]="modeKeys[i]" type="text" placeholder="..."  ></ion-input>\n       </ion-item>\n     </ion-item-group>\n   </div>\n   \n    <br/>\n    <div>\n\n  </div>\n  </div>\n\n  <table width="100%">\n      <tr>\n        <td>\n          <div align="left">\n            <br/>\n            <button class="button" (click)="actionBack()" right>Back</button>\n          </div>\n        </td>\n        <td width="30%">\n          &nbsp;\n        </td>\n        <td>\n          <div align="right">\n            <br/>\n            <button class="button"  (click)="actionNext()" right>Next</button>\n          </div>\n        </td>\n      </tr>\n      </table>\n\n      <br/>\n      <br/>\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/material/material.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], MaterialPage);
    return MaterialPage;
}());

//# sourceMappingURL=material.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResumePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signature_signature__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pemakaian_pemakaian__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ResumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ResumePage = /** @class */ (function () {
    function ResumePage(navCtrl, navParams, alertCtrl, loadingCtrl, modalController, uri, storage, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalController = modalController;
        this.uri = uri;
        this.storage = storage;
        this.http = http;
        this.sum_pelanggan = 0;
        this.loader_gif = 'off';
        this.sum_mitra = 0;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var millisecond = date.getMilliseconds();
        this.tanggal_ttd = day + "-" + month + "-" + year;
        this.storage.get('data').then(function (val) {
            _this.nama = val.nama_pelanggan;
            _this.no_telp = val.no_telepon;
            _this.alamat = val.alamat_pelanggan;
        });
        this.storage.get('data2').then(function (val) {
            if (val.psb != undefined) {
                if (val.psb == "1") {
                    _this.type_layanan = "1P";
                }
                else if (val.psb == "2") {
                    _this.type_layanan = "2P";
                }
                else if (val.psb == "3") {
                    _this.type_layanan = "3P";
                }
            }
            else if (val.migrasi != undefined) {
                if (val.migrasi == "1") {
                    _this.type_layanan = "Infrastruktur";
                }
                else if (val.migrasi == "4") {
                    _this.type_layanan = "Infrastruktur 1P - 1P";
                }
                else if (val.migrasi == "10") {
                    _this.type_layanan = "Layanan 1P-2P";
                }
                else if (val.migrasi == "5") {
                    _this.type_layanan = "Infrastruktur 1P - 2P";
                }
                else if (val.migrasi == "2") {
                    _this.type_layanan = "Layanan 1P-3P";
                }
                else if (val.migrasi == "6") {
                    _this.type_layanan = "Infrastruktur 1P - 3P";
                }
                else if (val.migrasi == "3") {
                    _this.type_layanan = "Layanan 2P-3P";
                }
                else if (val.migrasi == "7") {
                    _this.type_layanan = "Infrastruktur 2P - 2P";
                }
                else if (val.migrasi == "8") {
                    _this.type_layanan = "Infrastruktur 2P - 3P";
                }
                else if (val.migrasi == "9") {
                    _this.type_layanan = "Infrastruktur 3P - 3P";
                }
            }
            else if (val.tambahan != undefined) {
                if (val.tambahan == "1") {
                    _this.type_layanan = "Change STB";
                }
                else if (val.tambahan == "2") {
                    _this.type_layanan = "STB Tambahan";
                }
                else if (val.tambahan == "3") {
                    _this.type_layanan = "PLC";
                }
                else if (val.tambahan == "4") {
                    _this.type_layanan = "Wifi Extender";
                }
            }
        });
        this.storage.get('nik').then(function (val) {
            _this.nama_signature = year + "" + month + "" + day + "" + hours + "" + minutes + "" + val;
        });
        this.storage.get('data4').then(function (val) {
            _this.test_voice = val.test_voice;
            _this.test_internet = val.test_internet;
            _this.test_use_tv = val.test_use_tv;
            console.log('con4', val);
        });
        this.storage.get('data').then(function (val) {
            _this.data = val;
        });
        this.storage.get('data2').then(function (val) {
            _this.data2 = val;
        });
        this.storage.get('data3').then(function (val) {
            console.log('con', val);
            _this.data3 = val;
        });
        this.storage.get('data4').then(function (val) {
            _this.data4 = val;
        });
        this.storage.get('data5').then(function (val) {
            console.log('con', val);
            _this.data5 = val;
        });
        this.storage.get('data6').then(function (val) {
            console.log('con', val);
            _this.data6 = val;
        });
    }
    ResumePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ResumePage');
    };
    ResumePage.prototype.actionBack = function () {
        this.navCtrl.pop();
    };
    ResumePage.prototype.openSignatureModel1 = function () {
        var _this = this;
        var modal1 = this.modalController.create(__WEBPACK_IMPORTED_MODULE_3__signature_signature__["a" /* SignaturePage */]);
        this.sum_pelanggan++;
        modal1.onDidDismiss(function (data) {
            console.log(data);
            _this.loading();
            _this.signatureImage1 = data.signatureImage;
            console.log(data.signatureImage);
            _this.sendPostRequest(_this.signatureImage1, _this.nama_signature + "_1_" + _this.sum_pelanggan + ".png");
        });
        modal1.present();
    };
    ResumePage.prototype.openSignatureModel2 = function () {
        var _this = this;
        var modal2 = this.modalController.create(__WEBPACK_IMPORTED_MODULE_3__signature_signature__["a" /* SignaturePage */]);
        this.sum_mitra++;
        modal2.onDidDismiss(function (data) {
            _this.loading();
            _this.signatureImage2 = data.signatureImage;
            _this.sendPostRequest(_this.signatureImage2, _this.nama_signature + "_2_" + _this.sum_mitra + ".png");
        });
        modal2.present();
    };
    ResumePage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        // execute loading 
        this.loader.present();
    };
    ResumePage.prototype.sendPostRequest = function (data, nama) {
        var _this = this;
        var link = 'http://alista.telkomakses.co.id/amalia/upload_base64.php';
        var myData = JSON.stringify({ data: data, nama: nama });
        console.log(myData);
        this.http.post(link, myData)
            .subscribe(function (data) {
            _this.loader.dismiss();
        }, function (error) {
            alert(error);
            _this.loader.dismiss();
            console.log("Oooops!");
        });
    };
    ResumePage.prototype.actionPut = function () {
        var _this = this;
        if (this.tempat_ttd == undefined) {
            alert('Tempat tanda tangan tidak boleh kosong');
            return true;
        }
        var confirm = this.alertCtrl.create({
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
                    handler: function () {
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        //confirm.dismiss();
                        _this.loading();
                        var js = JSON.stringify(_this.data);
                        var js2 = JSON.stringify(_this.data2);
                        var js3 = JSON.stringify(_this.data3);
                        var js4 = JSON.stringify(_this.data4);
                        var js5 = JSON.stringify(_this.data5);
                        var js6 = JSON.stringify(_this.data6);
                        var ini = _this.uri.uri_api_alista + "amalia_app/put_data_pemakaian2.php?halaman1=" + js + "&halaman2=" +
                            js2 + "&halaman3=" + js3
                            + "&halaman4=" + js4
                            + "&halaman5=" + js5
                            + "&halaman6=" + js6
                            + "&email=" + data.email
                            + "&ttd1=" + _this.nama_signature + "_1_" + _this.sum_pelanggan + ".png"
                            + "&ttd2=" + _this.nama_signature + "_2_" + _this.sum_mitra + ".png"
                            + "&tempat_ttd=" + _this.tempat_ttd
                            + "&versi=" + _this.uri.versi;
                        console.log(ini);
                        _this.http.get(ini)
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            _this.loader.dismiss();
                            if (data.status == "ok") {
                                _this.showAlert(data.message);
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pemakaian_pemakaian__["a" /* PemakaianPage */]);
                            }
                            else {
                                _this.showAlert(data.message);
                            }
                        }, function (error) {
                            console.log('error put ' + error);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    ResumePage.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    ResumePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-resume',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/resume/resume.html"*/'<!--\n  Generated template for the ResumePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Halaman Akhir</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-card width="100%">\n        <ion-card-header>\n          <b>Resume</b>\n        </ion-card-header>\n      <ion-card-content>\n\n          <table width=100%>\n            <tr>\n              <td>\n                Nama\n              </td>\n              <td>\n                :\n              </td>\n              <td>\n                  {{nama}}\n              </td>\n            </tr>\n            <tr>\n              <td>\n                No Telp.\n              </td>\n              <td>\n                :\n              </td>\n              <td>\n                  {{no_telp}}\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Alamat\n              </td>\n              <td>\n                :\n              </td>\n              <td>\n                  {{alamat}}\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Type Layanan\n              </td>\n              <td>\n                :\n              </td>\n              <td>\n                  {{type_layanan}}\n              </td>\n            </tr>\n            <tr>\n              <td colspan="3">\n                <hr/>\n                Hasil Test Layanan\n                <hr/>\n              </td>\n              \n            </tr>\n            <tr>\n              <td>\n                Test Voice \n              </td>\n              <td>\n                :\n              </td>\n              <td>\n                  <div *ngIf="test_voice == \'1\'"><b style="text-decoration:line-through">Baik</b>  / <b>Tidak</b></div>\n                  <div *ngIf="test_voice == \'0\'"><b >Baik</b>  / <b style="text-decoration:line-through">Tidak</b></div>\n              </td>\n            </tr>\n            <tr>\n              <td>\n                Test Internet\n              </td>\n              <td>\n                :\n              </td>\n              <td>\n                  <div *ngIf="test_internet == \'1\'"><b style="text-decoration:line-through">Baik</b>  / <b>Tidak</b></div>\n                  <div *ngIf="test_internet == \'0\'"><b >Baik</b>  / <b style="text-decoration:line-through">Tidak</b></div>\n                  \n              </td>\n            </tr>\n            <tr>\n              <td>\n                Test Usee TV\n              </td>\n              <td>\n                :\n              </td>\n              <td>\n                  <div *ngIf="test_use_tv == \'1\'"><b style="text-decoration:line-through">Baik</b>  / <b>Tidak</b></div>\n                  <div *ngIf="test_use_tv == \'0\'"><b >Baik</b>  / <b style="text-decoration:line-through">Tidak</b></div>\n              </td>\n            </tr>\n          </table>\n            \n      </ion-card-content>\n    </ion-card>\n\n    <br/>\n    <br/>\n    <br/>\n    <div align="right"> <input style="width: 115px"  type="text" [(ngModel)]="tempat_ttd" value=""  placeholder="Tulis tempat TTD"/> , {{tanggal_ttd}}</div>\n    <br/>\n    <br/>\n    <br/>\n    <table width="100%">\n      <tr>\n        <td><div align="center">Pelanggan</div></td>\n        <td><div align="center">Mitra</div></td>\n      </tr>\n      <tr>\n        <td align="center"  width="50%"><div (click)="openSignatureModel1()"  style="border-color: grey; border-style: dashed;width: 150px;height: 100px" ><img *ngIf="signatureImage1" style="width: 100px;height: 100px" [src]="signatureImage1" ></div></td>\n        <td align="center"  width="50%"><div (click)="openSignatureModel2()"  style="border-color: grey;border-style: dashed;width: 150px;height: 100px" ><img *ngIf="signatureImage2" style="width: 100px;height: 100px" [src]="signatureImage2" ></div></td>\n      </tr>\n    </table>\n\n    <br/>\n	<br/>\n	<br/>\n\n    <table width="100%">\n		<tr>\n			<td>\n				<div align="left" style="margin-left: -15px">\n				  <br/>\n				  <button class="button" (click)="actionBack()" right>&nbsp;< Back&nbsp;</button>\n				</div>\n			</td>\n			<td width="40%">\n				&nbsp;\n			</td>\n			<td>\n				<div align="right" style="margin-right: -10px">\n				  <br/>\n				  <img *ngIf="loader_gif == \'on\'" src="loader.gif" />\n				  <button *ngIf="loader_gif == \'off\'"  class="button" (click)="actionPut()" right>Next</button>\n				</div>\n			</td>\n		</tr>\n	</table>\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/resume/resume.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */]])
    ], ResumePage);
    return ResumePage;
}());

//# sourceMappingURL=resume.js.map

/***/ }),

/***/ 133:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 133;

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UriProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the UriProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var UriProvider = /** @class */ (function () {
    function UriProvider(http) {
        this.http = http;
        //uri_api_alista: any = 'http://180.250.124.181/API/alista/';
        //uri_api_alista: any = 'http://10.204.200.8/API/alista/';
        /*uri_api_alista: any = 'http://180.250.124.181/API/alista/';
        uri_app_amalia: any = 'http://180.250.124.181/API/amalia/';
        uri_api_wimata: any = 'http://180.250.124.181/API/wimata/';
        uri_api_amalia: any = 'http://180.250.124.181/API/amalia/';
         //uri_api: any = 'http://180.250.124.181/API/';*/
        //prod: any= 'https://api.telkomakses.co.id/';
        this.prod = 'http://180.250.124.181/';
        this.versi = 12;
        this.uri_api_alista = this.prod + 'API/alista/';
        this.uri_app_amalia = this.prod + 'API/amalia/';
        this.uri_api_wimata = this.prod + 'API/wimata/';
        this.uri_api_amalia = this.prod + 'API/amalia/';
        this.uri_api = this.prod + 'API/';
        this.uri_prod_upload = 'http://alista.telkomakses.co.id/amalia/';
        console.log('Hello UriProvider Provider');
    }
    UriProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], UriProvider);
    return UriProvider;
}());

//# sourceMappingURL=uri.js.map

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/foto/foto.module": [
		313,
		3
	],
	"../pages/map/map.module": [
		310,
		2
	],
	"../pages/material/material.module": [
		311,
		1
	],
	"../pages/resume/resume.module": [
		312,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 175;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pemakaian2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pemakaian4_pemakaian4__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the Pemakaian2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Pemakaian2Page = /** @class */ (function () {
    function Pemakaian2Page(navCtrl, navParams, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.test_voice = '1';
        this.test_internet = '1';
        this.test_use_tv = '1';
        this.catatan_khusus = "1";
        this.other = "";
        this.test_voice_val = "";
        this.test_internet_val = "";
        this.test_use_tv_val = "";
        this.other_view = 0;
    }
    Pemakaian2Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Pemakaian2Page');
    };
    Pemakaian2Page.prototype.actionNext = function () {
        if (this.test_voice_val == "") {
            this.showAlert("Test Voice tidak boleh kosong");
        }
        else if (this.test_internet_val == "") {
            this.showAlert("Test Internet tidak boleh kosong");
        }
        else if (this.test_use_tv_val == "") {
            this.showAlert("Test USEE TV tidak boleh kosong");
        }
        else if (this.test_ping == undefined) {
            this.showAlert("Test Ping tidak boleh kosong");
        }
        else if (this.test_upload == undefined) {
            this.showAlert("Test Upload tidak boleh kosong");
        }
        else if (this.test_download == undefined) {
            this.showAlert("Test Download tidak boleh kosong");
        }
        else if (this.hasil_ukur == undefined) {
            this.showAlert("Hasil Ukur tidak boleh kosong");
        }
        else {
            var data = {
                'test_voice': this.test_voice,
                'test_internet': this.test_internet,
                'test_use_tv': this.test_use_tv,
                'test_ping': this.test_ping,
                'test_upload': this.test_upload,
                'test_download': this.test_download,
                'hasil_ukur': this.hasil_ukur,
                'catatan_khusus': this.catatan_khusus,
                'test_voice_val': this.test_voice_val,
                'test_internet_val': this.test_internet_val,
                'test_use_tv_val': this.test_use_tv_val,
                'other_catatan': this.other
            };
            this.storage.set('data4', data);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pemakaian4_pemakaian4__["a" /* Pemakaian4Page */]);
        }
    };
    Pemakaian2Page.prototype.changeCatatanKhusus = function (x) {
        if (x == '3') {
            this.other_view = 1;
        }
        else {
            this.other_view = 0;
        }
    };
    Pemakaian2Page.prototype.actionBack = function () {
        this.navCtrl.pop();
    };
    Pemakaian2Page.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    Pemakaian2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pemakaian2',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/pemakaian2/pemakaian2.html"*/'<!--\n  Generated template for the Pemakaian2Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Halaman ke-4</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<div class="text_light">\n	<div align="center">\n		<label><font color="red"></font></label>\n	</div>\n	<table width="100%">\n	<tr>\n		<td width="30%"><div class="left_line"><hr class="color" /></div></td>\n		<td width="20%"><div align="center" class="font_color"><b>Test Usage</b></div></td>\n		<td width="30%"><div class="right_line"><hr class="color" /></div></td>\n	</tr>\n	</table>\n	    	<div align="center">\n				<table class="only_border_top" width="100%">\n					<tr>\n						<th width="30%" rowspan="2" class="text_light"><div class="text_light">TEST LAYANAN</div></th>\n						<th width="30%" rowspan="2" class="text_light" ><div class="text_light"></div></th>\n						<th width="30%" class="only_border_bottom "><div class="text_light">KRITERIA</div></th>\n					</tr>\n					<tr >\n						<td>\n							<table width="100%" >\n							<tr >\n								<td width="50%" align="center"><div class="text_light">Baik</div></td>\n								<td width="50%" align="center"><div class="text_light">Buruk</div></td>\n							</tr>\n							</table>\n						</td>\n					</tr>\n					<tr class="only_border_top">\n						<!-- <td > &nbsp;Test Voice</td>\n						<td>&nbsp;Call</td> -->\n						<td colspan="2">\n							<label>Test Voice</label>\n							<ion-input color="red" type="number" [(ngModel)]="test_voice_val" placeholder="Call Number" value=""></ion-input>\n						</td>\n						<td>\n							<ion-list radio-group [(ngModel)]="test_voice">\n							<table width="100%" >\n							<tr>\n								<td width="50%" align="center">\n									\n						                <ion-radio style="margin-top: 20px"  value="1" ></ion-radio>\n						            \n								</td>\n								<td width="50%" align="center">\n									\n						                <ion-radio style="margin-top: 20px"  value="0" ></ion-radio>\n						           \n								</td>\n							</tr>\n							</table>\n							</ion-list>\n						</td>\n					</tr>\n					<tr class="only_border_top">\n						<!-- <td>&nbsp;Test Internet</td>\n						<td>&nbsp;Https://wwww.</td> -->\n						<td colspan="2">\n								<label>Test Internet</label>\n								<ion-input color="red" type="text" [(ngModel)]="test_internet_val" placeholder="Https://www" value=""></ion-input>\n						</td>\n						<td>\n							<ion-list radio-group [(ngModel)]="test_internet" >\n							<table  width="100%">\n							<tr >\n								<td width="50%" align="center">\n									\n						                <ion-radio style="margin-top: 20px"  value="1" ></ion-radio>\n						           \n								</td>\n								<td width="50%" align="center">\n									\n						                <ion-radio style="margin-top: 20px"  value="0" ></ion-radio>\n						            \n								</td>\n							</tr>\n							</table>\n							</ion-list>\n						</td>\n					</tr>\n					<tr class="only_border_top only_border_bottom">\n						<!-- <td>&nbsp;Test UseTV</td>\n						<td>&nbsp;Chanel</td> -->\n						<td colspan="2">\n							<label>Test User TV</label>\n							<ion-input color="red" type="text" [(ngModel)]="test_use_tv_val" placeholder="Channel" value=""></ion-input>\n						</td>\n						<td><div>\n							<ion-list radio-group [(ngModel)]="test_use_tv" >\n							<table width="100%" >\n							<tr>\n								<td width="50%" align="center" >\n						                <ion-radio style="margin-top: 20px" value="1" ></ion-radio>\n								</td>\n								<td width="50%" align="center">\n						                <ion-radio style="margin-top: 20px" value="0" ></ion-radio>\n								</td>\n							</tr>\n							</table>\n							</ion-list>\n						</div>\n						</td>\n					</tr>\n				</table>\n			</div>\n			<br/>\n		    <table width="100%">\n				<tr>\n					<td width="30%"><div class="left_line"><hr class="color" /></div></td>\n					<td width="20%"><div align="center" class="font_color"><b>Test Jaringan</b></div></td>\n					<td width="30%"><div class="right_line"><hr class="color" /></div></td>\n				</tr>\n			</table>\n	  			<table width="100%">\n	  	\n	  				<tr>\n	  					<td>\n	  						&nbsp;Test Ping\n	  						<ion-item>\n							    <ion-input color="red" type="number" [(ngModel)]="test_ping" placeholder="...ms"></ion-input>\n							</ion-item>\n\n	  					</td>\n	  				</tr>\n	  				<tr>\n	  				\n	  					<td>\n	  						Test Upload\n	  						<ion-item>\n							    <ion-input type="number" [(ngModel)]="test_upload" placeholder="...mbps"></ion-input>\n							</ion-item>\n\n	  					</td>\n	  				</tr>\n	  				<tr>\n	  					\n	  					<td>\n	  						Test Download\n	  						<ion-item>\n							    <ion-input type="number" [(ngModel)]="test_download" placeholder="...mbps"></ion-input>\n							</ion-item>\n\n	  					</td>\n	  				</tr>\n	  				<tr>\n	  					\n	  					<td>\n	  						Hasil Ukur & &nbsp;Redaman\n	  						<ion-item>\n							    <ion-input type="number" [(ngModel)]="hasil_ukur" placeholder="...db"></ion-input>\n							</ion-item>\n\n	  					</td>\n	  				</tr>\n\n	  			</table>\n\n		  	<table width="100%">\n				<tr>\n					<td width="30%"><div class="left_line"><hr class="color" /></div></td>\n					<td width="30%"><div align="center" class="font_color"><b>Catatan Khusus</b></div></td>\n					<td width="30%"><div class="right_line"><hr class="color" /></div></td>\n				</tr>\n			</table>\n	  	<ion-card>\n		  <ion-card-content>\n		    <ion-list radio-group>\n\n			   <ion-list radio-group [(ngModel)]="catatan_khusus" (ionChange)="changeCatatanKhusus($event)">\n				<table  width="100%">\n				<tr>\n					<td width="10%" valign="top">\n			             <ion-radio value="1" checked></ion-radio>\n			         </td>\n			        <td valign="top">\n			        	Pelanggan belum / tidak memiliki TV set dan bersedia menitipkan STB ke Telkom\n			        </td>\n					\n				</tr>\n				<tr>\n					<td width="10%" valign="top">\n		                <ion-radio value="2" ></ion-radio>\n					</td>\n					<td>\n						Pelanggan belum / tidak menginginkan Usee TV dan bersedia menitipkan STB ke Telkom	\n					</td>\n				</tr>\n				<tr>\n					<td width="10%" valign="top">\n		                <ion-radio value="3" ></ion-radio>\n					</td>\n					<td>\n						<tr>\n							<td>lain-lain</td> \n							<td>\n								\n									<ion-input  *ngIf="catatan_khusus == 3" type="text" [(ngModel)]="other" placeholder="Tulis sesuatu..."></ion-input>\n								\n							</td> \n						</tr>  \n					</td>\n				</tr>\n				</table>\n				</ion-list>\n			</ion-list>\n		  </ion-card-content>\n		</ion-card>\n		<table width="100%">\n		<tr>\n			<td>\n				<div align="left">\n				  <br/>\n				  <button class="button"   (click)="actionBack()" right>< Back </button>\n				</div>\n			</td>\n			<td width="30%"></td>\n			<td>\n				<div align="right">\n				  <br/>\n				  <button class="button"  (click)="actionNext()" right>Next > </button>\n				</div>\n			</td>\n		</tr>\n		</table>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/pemakaian2/pemakaian2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], Pemakaian2Page);
    return Pemakaian2Page;
}());

//# sourceMappingURL=pemakaian2.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DenahPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pemakaian4_pemakaian4__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DenahPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DenahPage = /** @class */ (function () {
    function DenahPage(navCtrl, navParams, viewCtrl, screenOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.screenOrientation = screenOrientation;
        this.signaturePadOptions = {
            'minWidth': 2,
            'canvasWidth': 340,
            'canvasHeight': 300
        };
    }
    DenahPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignaturePage');
    };
    DenahPage.prototype.drawCancel = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pemakaian4_pemakaian4__["a" /* Pemakaian4Page */]);
    };
    DenahPage.prototype.drawComplete = function () {
        this.signatureImage = this.signaturePad.toDataURL();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pemakaian4_pemakaian4__["a" /* Pemakaian4Page */], { signatureImage: this.signatureImage });
    };
    DenahPage.prototype.drawClear = function () {
        this.signaturePad.clear();
    };
    DenahPage.prototype.canvasResize = function () {
        var canvas = document.querySelector('canvas');
        this.signaturePad.set('minWidth', 1);
        this.signaturePad.set('canvasWidth', canvas.offsetWidth);
        this.signaturePad.set('canvasHeight', canvas.offsetHeight);
    };
    DenahPage.prototype.ngAfterViewInit = function () {
        this.signaturePad.clear();
        this.canvasResize();
    };
    DenahPage.prototype.dismiss = function () {
        this.signatureImage = this.signaturePad.toDataURL();
        var data = { signatureImage: this.signatureImage };
        this.viewCtrl.dismiss(data);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad__["SignaturePad"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad__["SignaturePad"])
    ], DenahPage.prototype, "signaturePad", void 0);
    DenahPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-denah',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/denah/denah.html"*/'<ion-header>\n  <ion-navbar >\n    <ion-title>Gambar Denah</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<signature-pad [options]="signaturePadOptions"  id="signatureCanvas"></signature-pad>\n<ion-grid>\n  <ion-row>\n    <ion-col col-4>\n<button ion-button full color="danger" (click)="drawCancel()">Cancel</button>\n    </ion-col>\n    <ion-col col-4>\n<button ion-button full color="light" (click)="drawClear()">Clear</button>\n    </ion-col>\n    <ion-col col-4>\n<button ion-button full color="secondary" (click)="dismiss()">Done</button>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/denah/denah.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
    ], DenahPage);
    return DenahPage;
}());

//# sourceMappingURL=denah.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MitraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_uri_uri__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MitraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MitraPage = /** @class */ (function () {
    function MitraPage(navCtrl, uri, loadingCtrl, navParams, http, viewCtrl) {
        this.navCtrl = navCtrl;
        this.uri = uri;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.http = http;
        this.viewCtrl = viewCtrl;
        console.log('sto', navParams.get('sto'));
        this.sto = navParams.get('sto');
        this.witel = navParams.get('witel');
        if (this.sto == "witel") {
            this.string_placeholder = "Witel";
        }
        else if (this.sto == "sto") {
            this.string_placeholder = "STO";
        }
        else {
            this.string_placeholder = "Mitra";
        }
    }
    MitraPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MitraPage');
    };
    MitraPage.prototype.loadData = function () {
        var _this = this;
        console.log(this.uri.uri_api + "master/get_data_all_master_mitra.php?nama=" + this.search + "&jenis=" + this.sto + "&witel=" + this.witel);
        this.loading();
        this.http.get(this.uri.uri_api + "master/get_data_all_master_mitra.php?nama=" + this.search + "&jenis=" + this.sto + "&witel=" + this.witel)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.json_data_vendor2 = data.mitra;
            _this.initializeItems();
            _this.loader.dismiss();
        });
    };
    MitraPage.prototype.initializeItems = function () {
        this.items = this.json_data_vendor2;
    };
    MitraPage.prototype.searchAction = function () {
        this.loadData();
    };
    MitraPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        //console.log("search"+this.items);
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                try {
                    return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
                catch (err) {
                    return "error";
                }
            });
        }
    };
    MitraPage.prototype.dismiss = function (x) {
        var data = { 'data': x, 'jenis': this.sto };
        this.viewCtrl.dismiss(data);
    };
    MitraPage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        // execute loading 
        this.loader.present();
    };
    MitraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mitra',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/mitra/mitra.html"*/'<ion-content>\n<ion-item>\n    <ion-label fixed>{{string_placeholder}}</ion-label>\n    <ion-input [(ngModel)]="search" placeholder="..." (keyup.enter)="searchAction()" type="text" value=""></ion-input>\n</ion-item>\n<button color="light" ion-button full (click)="searchAction()">Search</button>\n<ion-list>\n\n  <ion-item  style="background-color:#000066;"  *ngFor="let item of items" (click)="dismiss(item)">		\n  <font color="white"><b>{{ item }}</b></font>\n  		\n    \n  </ion-item>\n\n</ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/mitra/mitra.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_uri_uri__["a" /* UriProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], MitraPage);
    return MitraPage;
}());

//# sourceMappingURL=mitra.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pemakaian3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__material_material__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









//declare var $: $;
//import jQuery from "jquery";
/**
 * Generated class for the Pemakaian3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Pemakaian3Page = /** @class */ (function () {
    //atribut: any = 1;
    function Pemakaian3Page(navCtrl, navParams, storage, http, uri, barcodeScanner, alertCtrl, renderer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.http = http;
        this.uri = uri;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.renderer = renderer;
        this.speed = '1';
        this.other_view = 0;
        this.no_row = 0;
        this.arr_material = [];
    }
    Pemakaian3Page.prototype.ngAfterViewInit = function () {
        //declare var $: $;
        //document.getElementById('atribut');
        // $("#atribut").val("test")
        //         //console.log();
        // // alert(input);
    };
    // changeColor(){ $('#xn').text('white'); }
    Pemakaian3Page.prototype.scanSeconStb = function () {
        var _this = this;
        //declare var $: $;
        //alert($("#atribut").val());
        //alert("test");
        this.barcodeScanner.scan().then(function (barcodeData) {
            // Success! Barcode data is here
            var atribut = __WEBPACK_IMPORTED_MODULE_5_jquery__("#atribut").val();
            // this.renderer.setProperty(this.stb1.nativeElement, 'value', 'test');
            __WEBPACK_IMPORTED_MODULE_5_jquery__("#txt_" + atribut).val(barcodeData.text);
            _this.mac_address = barcodeData.text;
        }, function (err) {
            alert(err);
        });
    };
    Pemakaian3Page.prototype.actionScanOnt = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            // Success! Barcode data is here
            _this.sn_ont = barcodeData.text;
        }, function (err) {
            alert(err);
        });
    };
    Pemakaian3Page.prototype.actionModem = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            // Success! Barcode data is here
            _this.sn_modem = barcodeData.text;
        }, function (err) {
            alert(err);
        });
    };
    Pemakaian3Page.prototype.actionMac = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            // Success! Barcode data is here
            _this.mac_address = barcodeData.text;
        }, function (err) {
            alert(err);
        });
    };
    Pemakaian3Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Pemakaian3Page');
    };
    Pemakaian3Page.prototype.actionWifi = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            // Success! Barcode data is here
            _this.sn_wifi_extender = barcodeData.text;
        }, function (err) {
            alert(err);
        });
    };
    Pemakaian3Page.prototype.actionPlc = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            // Success! Barcode data is here
            _this.sn_plc = barcodeData.text;
        }, function (err) {
            alert(err);
        });
    };
    Pemakaian3Page.prototype.checkPaket = function (data_var) {
        var _this = this;
        var data_2 = JSON.stringify(data_var);
        console.log(this.uri.uri_api_alista + "amalia_app/check_layanan.php?data=" + data_2);
        this.http.get(this.uri.uri_api_alista + "amalia_app/check_layanan.php?data=" + data_2)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.status == "ok") {
                _this.storage.set('data2', data_var);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__material_material__["a" /* MaterialPage */]);
            }
            else {
                _this.psb = "0";
                _this.migrasi = "0";
                alert(data.message);
            }
        });
    };
    Pemakaian3Page.prototype.actionNext = function () {
        var stb = [];
        if (this.no_row > 0) {
            var no = 1;
            while (no <= this.no_row) {
                stb.push(__WEBPACK_IMPORTED_MODULE_5_jquery__('#txt_' + no).val());
                no++;
            }
        }
        var data2 = {
            sn_ont: this.sn_ont,
            sn_modem: this.sn_modem,
            modem: this.modem,
            power: this.power,
            dsl: this.dsl,
            sn_plc: this.sn_plc,
            sn_wifi_extender: this.sn_wifi_extender,
            internet: this.internet,
            mac_address: this.mac_address,
            nama: this.nama,
            notel_teknisi: this.notel_teknisi,
            psb: this.psb,
            migrasi: this.migrasi,
            tambahan: this.tambahan,
            speed: this.speed,
            other_speed: this.speed_other,
            stb: stb
        };
        this.checkPaket(data2);
    };
    Pemakaian3Page.prototype.newElement = function () {
        this.no_row = this.no_row + 1;
        var no = this.no_row;
        var data = this.arr_material;
        var no_ = 0;
        var str_app = "";
        if (no <= 3) {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('#parent').append('<div id="el' + no + '"><table><tr><td><button id="btn_' + no + '" class="button"><div><img src="scan_barcode.png"/></div></button></td><td> <input placeholder="tulis disini" id="txt_' + no + '" type="text"/></td></tr></table><br/></div>');
            __WEBPACK_IMPORTED_MODULE_5_jquery__("#btn_" + no).click(function () {
                __WEBPACK_IMPORTED_MODULE_5_jquery__("#atribut").val(no);
                __WEBPACK_IMPORTED_MODULE_5_jquery__("#k").click();
            });
        }
        else {
            alert("Maksimal STB hanya 3 saja");
            this.no_row = 3;
        }
    };
    Pemakaian3Page.prototype.removeElememt = function () {
        var no = this.no_row;
        //alert(x);
        __WEBPACK_IMPORTED_MODULE_5_jquery__('#el' + no).remove();
        this.no_row = this.no_row - 1;
        if (this.no_row < 0) {
            this.no_row = 0;
        }
    };
    Pemakaian3Page.prototype.actionBack = function () {
        this.navCtrl.pop();
    };
    Pemakaian3Page.prototype.actionChangeKecepatan = function (x) {
        if (x == 'other') {
            this.other_view = 1;
        }
        else {
            this.other_view = 0;
        }
    };
    // ngAfterViewInit(){
    //   //this.newElement()
    //   this.no_row = this.no_row+1;
    //   var no = this.no_row;
    //   var data = this.arr_material;
    //   var no_ = 0;
    //   var str_app = "";
    //   if(no <= 3){
    //     $('#parent').append('<div id="el'+no+'"><table><tr><td><button id="btn_'+no+'" class="button"><div><img src="scan_barcode.png"/></div></button></td><td> <input placeholder="tulis disini" id="txt_'+no+'" type="text"/></td></tr></table><br/></div>');
    //     $("#btn_"+no).click(function() {
    //           $("#atribut").val(no);
    //           $("#k").click();
    //         });
    //  }else{
    //   alert("Maksimal STB hanya 3 saja");
    //   this.no_row = 3;
    //  }
    // }
    Pemakaian3Page.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('atri'),
        __metadata("design:type", Object)
    ], Pemakaian3Page.prototype, "atri", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('stb1'),
        __metadata("design:type", Object)
    ], Pemakaian3Page.prototype, "stb1", void 0);
    Pemakaian3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pemakaian3',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/pemakaian3/pemakaian3.html"*/'<!--\n  Generated template for the Pemakaian2Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Halaman ke-2</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n	<!-- <button id="x" (click)="changeColor()">Click Me!</button> (input)="getItems($event)"-->\n<!-- <ion-input type="text"  [(ngModel)]="atr" placeholder="Tulis sesuatu" id="atribut" value="0"></ion-input> -->\n	<input type="text" #atri id="atribut" hidden>\n	<button id="k"  (click)="scanSeconStb()" hidden>test</button>\n	<div align="center">\n		<label><font color="red"></font></label>\n	</div>\n	\n	    	<div align="center">\n				<table  width="100%">\n					<tr>\n						<th width="100%" colspan="2" >\n							<div  style="margin-left: -120px">Modem yang dipasang / ditarik *) </div>\n\n							  <ion-list>\n							  <ion-item>\n								<ion-label>Modem</ion-label>\n								<ion-select [(ngModel)]="modem">\n								  <ion-option value="zte">ZTE</ion-option>\n								  <ion-option value="huawei">Huawei</ion-option>\n								  <ion-option value="NTE (ONT FIBER HOME)">NTE (ONT FIBER HOME)</ion-option>\n								  <ion-option value="ALU">ALU</ion-option>\n								  \n								</ion-select>\n							  </ion-item>\n							</ion-list>\n						</th>\n						\n					</tr>\n					<tr>\n						<td>\n							SN ONT\n							<div >\n								<button (click)="actionScanOnt()"  class="button">\n								  <ion-icon name="md-barcode"></ion-icon> &nbsp; Scan Barcode\n								</button>\n							</div>\n						</td>\n						<td><br/><br/>\n						<ion-list style="margin-left: 10px">\n						  <ion-item>\n						    <ion-input type="text" [(ngModel)]="sn_ont" placeholder="Tulis sesuatu"></ion-input>\n						  </ion-item>\n						  </ion-list>\n						</td>\n						\n					</tr>\n					<tr>\n						<td>\n							SN MODEM\n								<button (click)="actionModem()" class="button">\n								  <ion-icon name="md-barcode"></ion-icon>&nbsp; Scan Barcode\n								</button>\n							\n						</td>\n							<td><br/><br/>\n								<ion-list style="margin-left: 10px">\n								  <ion-item>\n								    <ion-input type="text" [(ngModel)]="sn_modem" placeholder="Tulis sesuatu"></ion-input>\n								  </ion-item>\n								  </ion-list>\n						</td>\n					</tr>\n\n					<!-- <button (click)="newElement()" class="button">Add</button> -->\n					\n					<tr>\n\n						<td colspan="2">\n							<br/>\n							<br/>\n							<hr/>\n							<!-- <button id="btn_1" class="button"></button> -->\n							<div>\n							MAC Address STB \n							<img (click)="removeElememt()" style="margin-top: 10" src="minus.png" height="30"  /> \n							<!-- <img onclick="removeElememt()" style="margin-top: 10" src="minus.png" height="30"  />  -->\n							<!-- <img src="add.png" height="30" onclick="addnew()" /></div> -->\n							<img src="add.png" height="30" (click)="newElement()" /></div>\n								<!-- <button (click)="actionMac()" class="button">\n								  \n								  <ion-icon name="md-barcode"></ion-icon>&nbsp; Scan Barcode\n								</button> -->\n							\n						\n						<table>\n							<tr>\n								<td>\n									<!-- <ion-list style="margin-left: 10px">\n									  <ion-item>\n									    <ion-input type="text" [(ngModel)]="mac_address" placeholder="Tulis sesuatu"></ion-input>\n									  </ion-item>\n									  </ion-list> -->\n								</td>\n								<!-- <td width="10%"><img src="minus.png" height="30"  /></td>\n								<td width="10%"><img src="add.png" height="30" (click) ="newElement()" /> </td> -->\n							</tr>\n						</table>\n						</td>\n					</tr>\n					<tr>\n						<td colspan="2"><div id="parent"></div> <hr/><br/></td>\n\n					</tr>\n					<tr>\n						<td>\n							SN PLC\n								<button (click)="actionPlc()" class="button">\n								  \n								  <ion-icon name="md-barcode"></ion-icon>&nbsp; Scan Barcode\n								</button>\n							\n						</td>\n						<td><br/><br/>\n						<ion-list style="margin-left: 10px">\n						  <ion-item>\n						    <ion-input type="text" [(ngModel)]="sn_plc" placeholder="Tulis sesuatu"></ion-input>\n						  </ion-item>\n						  </ion-list>\n						</td>\n					</tr>\n					<tr>\n						<td>\n							SN WIFI EXTENDER\n								<button (click)="actionWifi()" class="button">\n								  \n								  <ion-icon name="md-barcode"></ion-icon>&nbsp; Scan Barcode\n								</button>\n							\n						</td>\n						<td><br/><br/>\n						<ion-list style="margin-left: 10px">\n						  <ion-item>\n						    <ion-input type="text" [(ngModel)]="sn_wifi_extender" placeholder="Tulis sesuatu"></ion-input>\n						  </ion-item>\n						  </ion-list>\n						</td>\n					</tr>\n					<tr>\n						<td colspan="2">&nbsp;</td>\n					</tr>\n					<tr>\n						<td colspan="2">Lampu indikator modem nyala</td>\n					</tr>\n					<tr>\n						<td colspan="2">&nbsp;</td>\n					</tr>\n					<tr> \n						<td colspan="2">\n							<table width="100%">\n								<tr>\n								<td valign="top" width="40%">\n									  <ion-checkbox color="green" value="1" [(ngModel)]="power"></ion-checkbox>\n									 Power\n								</td>\n								<td valign="top" width="30%">\n									\n									  <ion-checkbox color="green" value="1" [(ngModel)]="dsl"></ion-checkbox>\n									DSL\n								</td>\n								<td valign="top">\n								\n									  <ion-checkbox color="green" value="1" [(ngModel)]="internet" ></ion-checkbox>\n									  Internet\n								</td>\n							</tr>\n						</table>\n					</td>\n					</tr>\n					<tr>\n						<td colspan="2">&nbsp;</td>\n					</tr>\n			\n				</table>\n			</div>\n\n	<!--PSB-->\n	<ion-card>\n	  <ion-card-header>\n	    PSB\n	    <hr/>\n	  </ion-card-header>\n\n	  <ion-card-content>\n	  	<ion-list radio-group [(ngModel)]="psb">\n	    <table width="100%">\n	    	<tr>\n	    		<td width="50%">\n		    		<ion-radio  checked="true" value="1"></ion-radio> 1P\n				</td>\n				<td>\n					<ion-radio value="2"></ion-radio> 2P\n				</td>\n		    	<td>\n		    		<ion-radio   value="3"></ion-radio> 3P\n		    	</td>\n	    	</tr>\n	    </table>\n		</ion-list>\n	  </ion-card-content>\n	</ion-card>\n\n	<br/>\n	<!--MIGRASI-->\n	<ion-card>\n	  <ion-card-header>\n	    Migrasi\n	    <hr/>\n	  </ion-card-header>\n\n	  <ion-card-content>\n	  	<ion-list radio-group [(ngModel)]="migrasi">\n	    <table width="100%">\n	    	<tr hidden>\n	    		<td width="50%">\n		    		<ion-radio checked="true" value="1"></ion-radio> Infrastruktur\n		    	</td>\n		    </tr>\n		    <tr >\n	    		<td width="50%">\n		    		<ion-radio checked="true" value="4"></ion-radio>  Infrastruktur 1P - 1P\n		    	</td>\n		    	<td>\n		    		<ion-radio  value="10"></ion-radio> Layanan 1P-2P\n		    	</td>\n\n		    </tr>\n		    <tr>\n		    	<td width="50%">\n		    		<ion-radio checked="true" value="5"></ion-radio>  Infrastruktur 1P - 2P\n		    	</td>\n		    	<td>\n		    		<ion-radio  value="2"></ion-radio> Layanan 1P-3P\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td width="50%">\n		    		<ion-radio checked="true" value="6"></ion-radio>  Infrastruktur 1P - 3P\n		    	</td>\n		    	<td>\n		    		<ion-radio  value="3"></ion-radio> Layanan 2P-3P\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td width="50%">\n		    		<ion-radio checked="true" value="7"></ion-radio>  Infrastruktur 2P - 2P\n		    	</td>\n		    	<td>\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td width="50%">\n		    		<ion-radio checked="true" value="8"></ion-radio>  Infrastruktur 2P - 3P\n		    	</td>\n		    	<td></td>\n	    	</tr>\n	    	<tr>\n	    		<td width="50%">\n		    		<ion-radio checked="true" value="9"></ion-radio>  Infrastruktur 3P - 3P\n		    	</td>\n		    	<td></td>\n	    	</tr>\n	    	\n	    </table>\n		</ion-list>\n	  </ion-card-content>\n	</ion-card>	\n\n	<br/>\n	<!--TAMBAHAN-->\n	<ion-card>\n		<ion-card-header>\n		  Tambahan\n		  <hr/>\n		</ion-card-header>\n  \n		<ion-card-content>\n			<ion-list radio-group [(ngModel)]="tambahan">\n		  <table width="100%">\n			  <tr>\n				  <td width="50%">\n					<ion-radio value="1"></ion-radio> Change STB\n				  </td>\n				  <td>\n					<ion-radio  value="2"></ion-radio> STB Tambahan\n				  </td>\n				  <td>\n					  \n				  </td>\n			  </tr>\n			  <tr>\n				  <td>\n					<ion-radio  value="3"></ion-radio> PLC\n				  </td>\n				  <td>\n					  <ion-radio  value="4"></ion-radio> Wifi Extender\n				  </td>\n			  </tr>\n			  <tr>\n				  <td>\n					  <ion-radio value="5"></ion-radio> IndiBox\n				  </td>\n				  <td>\n					  \n				  </td>\n			  </tr>\n  \n		  </table>\n		  </ion-list>\n		</ion-card-content>\n	  </ion-card>\n\n	<br/>  \n	<!--TAMBAHAN-->\n	<ion-card>\n\n	  <ion-card-header>\n	    Speed\n	    <hr/>\n	  </ion-card-header>\n\n	  <ion-card-content>\n	  	<ion-list radio-group [(ngModel)]="speed" (ionChange)="actionChangeKecepatan($event)">\n	    <table width="100%">\n	    	<tr>\n	    		<td width="50%">\n		    		<ion-radio checked="true" value="1"></ion-radio> 10MB\n		    	</td>\n		    	<td>\n						<ion-radio  value="2"></ion-radio> 20MB\n		    		\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td>\n						<ion-radio  value="3"></ion-radio> 30MB\n		    	</td>\n		    	<td>\n						<ion-radio  value="4"></ion-radio> 40MB\n		    		\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td>\n						<ion-radio  value="5"></ion-radio> 50MB\n		    	</td>\n		    	<td>\n					\n		    		<ion-radio  value="10"></ion-radio> 100MB\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td>\n		    		<ion-radio  value="11"></ion-radio> 200MB\n		    	</td>\n		    	<td>\n		    		<ion-radio  value="12"></ion-radio> 300MB\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td>\n		    		<ion-radio  value="13"></ion-radio> 1GB\n		    	</td>\n		    	<td>\n		    		&nbsp;\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td colspan="2">\n	    			<table>\n	    			<tr>\n	    				<td>\n	    					<ion-radio  value="other"></ion-radio> \n	    				</td>\n	    				<td><ion-item>\n						    <ion-label fixed>Other</ion-label>\n						    <ion-input *ngIf="other_view == 0"  [(ngModel)]="speed_other" disabled type="number" value=""></ion-input>\n						     <ion-input *ngIf="other_view == 1"  [(ngModel)]="speed_other"  type="number" value=""></ion-input>\n						  </ion-item>\n						</td>\n	    			</tr>\n		    		</table>\n		    	</td>\n	    	</tr>\n	    </table>\n		</ion-list>\n	  </ion-card-content>\n	</ion-card>\n\n		<table width="100%">\n		<tr>\n			<td>\n				<div align="left">\n				  <br/>\n				  <button class="button" (click)="actionBack()" right>Back</button>\n				</div>\n			</td>\n			<td width="30%">\n				&nbsp;\n			</td>\n			<td>\n				<div align="right">\n				  <br/>\n				  <button class="button"  (click)="actionNext()" right>Next</button>\n				</div>\n			</td>\n		</tr>\n		</table>\n\n\n		\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/pemakaian3/pemakaian3.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_6__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer2"]])
    ], Pemakaian3Page);
    return Pemakaian3Page;
}());

//# sourceMappingURL=pemakaian3.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalNikBawahanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ModalNikBawahanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ModalNikBawahanPage = /** @class */ (function () {
    function ModalNikBawahanPage(navCtrl, navParams, http, view, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.view = view;
        this.storage = storage;
        // constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http) {
        this.storage.set('bawahan', '-');
        this.storage.get('witel')
            .then(function (data) {
            console.log("witel", data);
        });
    }
    ModalNikBawahanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ModalNikBawahanPage');
    };
    ModalNikBawahanPage.prototype.dismissItem = function (nik, nama) {
        this.setNikNamaBawahan(nama + " - " + nik);
        this.view.dismiss();
    };
    ModalNikBawahanPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            if (isNaN(val)) {
                this.items = this.items.filter(function (x) {
                    console.log("pass find", x.nama.toLowerCase().indexOf(val.toLowerCase()));
                    return (x.nama.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
            }
            else {
                this.items = this.items.filter(function (x) {
                    console.log("pass find", x.nama.toLowerCase().indexOf(val.toLowerCase()));
                    return (x.nik.toLowerCase().indexOf(val.toLowerCase()) > -1);
                });
            }
        }
    };
    ModalNikBawahanPage.prototype.setNikNamaBawahan = function (nik_nama) {
        this.storage.set('bawahan', nik_nama);
    };
    ModalNikBawahanPage.prototype.initializeItems = function () {
        this.items = this.data_json;
    };
    ModalNikBawahanPage.prototype.findActon = function () {
        var _this = this;
        this.storage.get('witel')
            .then(function (val) {
            console.log('http://api.telkomakses.co.id/API/amalia/get_data_witel.php?nik=' + _this.find + "&witel=" + val);
            _this.http.get('http://api.telkomakses.co.id/API/amalia/get_data_witel.php?nik=' + _this.find + "&witel=" + val)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log(data);
                _this.items = data;
                _this.data_json = data;
            });
        });
    };
    ModalNikBawahanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-modal-nik-bawahan',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/modal-nik-bawahan/modal-nik-bawahan.html"*/'<!--\n  Generated template for the ModalNikBawahanPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-content padding>\n<!-- <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar> -->\n<ion-searchbar [(ngModel)]="find"></ion-searchbar>\n<button  ion-button full (click)="findActon()" color="light" >Find</button>\n\n<ion-list>\n  <button ion-item *ngFor="let item of items" (click)="dismissItem(item.nik,item.nama)">\n    {{ item.nama }} - {{item.nik}}\n  </button>  \n</ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/modal-nik-bawahan/modal-nik-bawahan.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], ModalNikBawahanPage);
    return ModalNikBawahanPage;
}());

//# sourceMappingURL=modal-nik-bawahan.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(253);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_chooser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_path__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__app_component__ = __webpack_require__(305);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_signaturepad__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_signaturepad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_angular2_signaturepad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_google_maps__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_material_material__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_map_map__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_resume_resume__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_home_home__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_foto_foto__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_pemakaian_pemakaian__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_pemakaian2_pemakaian2__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_pemakaian3_pemakaian3__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_pemakaian4_pemakaian4__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_ba_ba__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_list_list__ = __webpack_require__(307);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_login_login__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_choser_choser__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_list_wo_list_wo__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_create_wo_create_wo__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_modal_nik_bawahan_modal_nik_bawahan__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_mitra_mitra__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_signature_signature__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_denah_denah__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_http__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_android_permissions__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_geolocation__ = __webpack_require__(182);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_36__pages_mitra_mitra__["a" /* MitraPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_signature_signature__["a" /* SignaturePage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_denah_denah__["a" /* DenahPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_resume_resume__["a" /* ResumePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_pemakaian_pemakaian__["a" /* PemakaianPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_pemakaian2_pemakaian2__["a" /* Pemakaian2Page */],
                __WEBPACK_IMPORTED_MODULE_27__pages_pemakaian3_pemakaian3__["a" /* Pemakaian3Page */],
                __WEBPACK_IMPORTED_MODULE_24__pages_foto_foto__["a" /* FotoPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_pemakaian4_pemakaian4__["a" /* Pemakaian4Page */],
                __WEBPACK_IMPORTED_MODULE_29__pages_ba_ba__["a" /* BaPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_material_material__["a" /* MaterialPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_choser_choser__["a" /* ChoserPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_list_wo_list_wo__["a" /* ListWoPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_create_wo_create_wo__["a" /* CreateWoPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_modal_nik_bawahan_modal_nik_bawahan__["a" /* ModalNikBawahanPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */], __WEBPACK_IMPORTED_MODULE_15_angular2_signaturepad__["SignaturePadModule"],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/map/map.module#MapPageModule', name: 'MapPage', segment: 'map', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/material/material.module#MaterialPageModule', name: 'MaterialPage', segment: 'material', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/resume/resume.module#ResumePageModule', name: 'ResumePage', segment: 'resume', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/foto/foto.module#FotoPageModule', name: 'FotoPage', segment: 'foto', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_14__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_24__pages_foto_foto__["a" /* FotoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_resume_resume__["a" /* ResumePage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_mitra_mitra__["a" /* MitraPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_signature_signature__["a" /* SignaturePage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_denah_denah__["a" /* DenahPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_pemakaian_pemakaian__["a" /* PemakaianPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_pemakaian2_pemakaian2__["a" /* Pemakaian2Page */],
                __WEBPACK_IMPORTED_MODULE_20__pages_material_material__["a" /* MaterialPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_pemakaian3_pemakaian3__["a" /* Pemakaian3Page */],
                __WEBPACK_IMPORTED_MODULE_28__pages_pemakaian4_pemakaian4__["a" /* Pemakaian4Page */],
                __WEBPACK_IMPORTED_MODULE_29__pages_ba_ba__["a" /* BaPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_choser_choser__["a" /* ChoserPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_list_wo_list_wo__["a" /* ListWoPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_create_wo_create_wo__["a" /* CreateWoPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_modal_nik_bawahan_modal_nik_bawahan__["a" /* ModalNikBawahanPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_device__["a" /* Device */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_file_opener__["a" /* FileOpener */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_google_maps__["b" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_android_permissions__["a" /* AndroidPermissions */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_chooser__["a" /* FileChooser */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_uri_uri__["a" /* UriProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 305:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_foto_foto__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_list_wo_list_wo__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_pemakaian_pemakaian__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_ba_ba__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









//import { ChoserPage } from '../pages/choser/choser';

//import { CreateWoPage } from '../pages/create-wo/create-wo';

//import { MapPage } from '../pages/map/map';
//import { MitraPage } from '../pages/mitra/mitra';
//import { SignaturePage } from '../pages/signature/signature';

var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, storage, events) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.events = events;
        this.initializeApp();
        this.events.subscribe('menu:tampilNama', function (nama, jabatan, foto) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            _this.nama = nama;
            _this.jabatan = jabatan;
            _this.foto = foto;
            if (_this.foto == null) {
                _this.foto = "";
            }
        });
        this.events.subscribe('menu:tampil', function (menu) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            _this.pages = menu;
        });
        // used for an example of ngFor and navigation
        storage.get('session').then(function (val) {
            if (val == 'oke') {
                _this.pages = [
                    { title: 'Update Material Alista', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
                    { title: 'List Stok Barang', component: __WEBPACK_IMPORTED_MODULE_8__pages_list_wo_list_wo__["a" /* ListWoPage */] },
                    { title: 'Create BA Digital', component: __WEBPACK_IMPORTED_MODULE_9__pages_pemakaian_pemakaian__["a" /* PemakaianPage */] },
                    { title: 'Update Foto', component: __WEBPACK_IMPORTED_MODULE_6__pages_foto_foto__["a" /* FotoPage */] },
                    { title: 'List BA Digital', component: __WEBPACK_IMPORTED_MODULE_10__pages_ba_ba__["a" /* BaPage */] },
                    { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */] },
                ];
                console.log('tampil', val);
                //this.rootPage = FotoPage;
                //this.rootPage = MaterialPage;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_pemakaian_pemakaian__["a" /* PemakaianPage */];
            }
            else {
                console.log('login', val);
                //this.rootPage = FotoPage;
                // this.rootPage = LoginPage;
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
            }
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-content>\n  <div style="background:#b30000;">\n  <div align="center" style="margin:10px;background-image: url(\'\')" class="user one"><img src="{{foto}}" class="user one"/></div>\n  </div>\n  <div style="padding:5px;background:#b30000;"><font color="white"><b>{{nama}}</b></font></div>\n  <div style="padding:2px 0 10px 5px;background:#b30000;"><font color="white"><b>{{jabatan}}</b></font></div>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-list',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  \n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-left></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-right>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */]])
    ], ListPage);
    return ListPage;
    var ListPage_1;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_path__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_chooser__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChoserPage = /** @class */ (function () {
    function ChoserPage(fileChooser, TransferObject, navCtrl, transfer, camera, file, filePath, actionSheetCtrl, toastCtrl, platform, loadingCtrl) {
        this.fileChooser = fileChooser;
        this.TransferObject = TransferObject;
        this.navCtrl = navCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.lastImage = null;
    }
    ChoserPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'File',
                    handler: function () {
                        _this.fileGet();
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    ChoserPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            _this.presentToast('Error while selecting image.');
        });
    };
    ChoserPage.prototype.fileGet = function () {
        var _this = this;
        this.fileChooser.open()
            .then(function (uri) {
            _this.filePath.resolveNativePath(uri)
                .then(function (filePath) {
                var options = {
                    fileKey: "file",
                    fileName: 'nama.jpg',
                    chunkedMode: false,
                    mimeType: "multipart/form-data",
                    params: { 'fileName': 'nama.jpg' }
                };
                var url = "http://10.40.108.153/hana/upload.php";
                var fileTransfer = _this.transfer.create();
                _this.loading = _this.loadingCtrl.create({
                    content: 'Uploading...',
                });
                _this.loading.present();
                // Use the FileTransfer to upload the image
                fileTransfer.upload(filePath, url, options).then(function (data) {
                    _this.loading.dismissAll();
                    _this.presentToast('Image succesful uploaded.');
                }, function (err) {
                    _this.loading.dismissAll();
                    _this.presentToast('Error while uploading file.');
                });
            })
                .catch(function (err) {
                _this.loading.dismissAll();
                _this.presentToast('Error file path');
            });
        })
            .catch(function (e) {
            _this.loading.dismissAll();
            _this.presentToast('error uri');
        });
    };
    // Create a new name for the image
    ChoserPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    ChoserPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
        }, function (error) {
            _this.presentToast('Error while storing file.');
        });
    };
    ChoserPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    ChoserPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    ChoserPage.prototype.uploadImage = function () {
        var _this = this;
        // Destination URL
        var url = "http://10.40.108.153/hana/upload.php";
        // File for Upload
        var targetPath = this.pathForImage(this.lastImage);
        // File name only
        var filename = this.lastImage;
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': filename }
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create({
            content: 'Uploading...',
        });
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            _this.loading.dismissAll();
            _this.presentToast('Image succesful uploaded.');
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast('Error while uploading file.');
        });
    };
    ChoserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-choser',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/choser/choser.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>\n      Devdactic Image Upload\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n \n<ion-content padding>\n  <img src="{{pathForImage(lastImage)}}" style="width: 100%" [hidden]="lastImage === null">\n  <h3 [hidden]="lastImage !== null">Please Select Image!</h3>\n</ion-content>\n \n<ion-footer>\n  <ion-toolbar color="primary">\n    <ion-buttons>\n      <button ion-button icon-left (click)="presentActionSheet()">\n        <ion-icon name="camera"></ion-icon>Select Image\n      </button>\n      <button ion-button icon-left (click)="uploadImage()" [disabled]="lastImage === null">\n        <ion-icon name="cloud-upload"></ion-icon>Upload\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/choser/choser.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6__ionic_native_file_chooser__["a" /* FileChooser */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["b" /* FileTransferObject */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_path__["a" /* FilePath */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ChoserPage);
    return ChoserPage;
}());

//# sourceMappingURL=choser.js.map

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateWoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_nik_bawahan_modal_nik_bawahan__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the CreateWoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CreateWoPage = /** @class */ (function () {
    function CreateWoPage(navCtrl, navParams, modalCtrl, storage, http, platform, alertCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.storage = storage;
        this.http = http;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.date_wo = new Date().toISOString();
        var date1 = new Date();
        this.date1_v = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
        this.nik_bawahan = "-";
        this.platform.ready().then(function () {
            _this.storage.get('nik')
                .then(function (val) {
                _this.nik = val;
            });
            _this.storage.get('witel')
                .then(function (val) {
                _this.witel = val;
            });
        });
    }
    CreateWoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateWoPage');
    };
    CreateWoPage.prototype.onChange = function (ev) {
        console.log(ev);
        console.log(ev.year);
        this.date1_v = ev.year + "-" + ev.month + "-" + ev.day;
    };
    CreateWoPage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
    };
    CreateWoPage.prototype.showModel = function () {
        var _this = this;
        this.searchModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__modal_nik_bawahan_modal_nik_bawahan__["a" /* ModalNikBawahanPage */]);
        this.searchModal.onDidDismiss(function (data) {
            _this.storage.get('bawahan')
                .then(function (val) {
                console.log("dismiss", val);
                _this.nik_bawahan = val;
            });
        });
        this.searchModal.present();
    };
    CreateWoPage.prototype.SubmitWo = function () {
        var _this = this;
        if (this.nik_bawahan != "-") {
            this.loading();
            console.log('http://api.telkomakses.co.id/API/amalia/put_wo_number.php?' +
                'niktl=' + this.nik +
                '&nikBawahan=' + this.nik_bawahan +
                '&date=' + this.date1_v +
                '&wo=' + this.wo_number + '&witel=' + this.witel);
            this.http.get('http://api.telkomakses.co.id/API/amalia/put_wo_number.php?' +
                'niktl=' + this.nik +
                '&nikBawahan=' + this.nik_bawahan +
                '&date=' + this.date1_v +
                '&wo=' + this.wo_number + '&witel=' + this.witel)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log("response", data.message);
                if (data.status == 'gagal') {
                    _this.showAlert(data.message);
                }
                else {
                    _this.showAlert(data.message);
                    _this.wo_number = "";
                    _this.nik_bawahan = "-";
                }
                _this.loader.dismiss();
            });
        }
        else {
            this.showAlert("Isi terlebih dahulu nik Naker");
        }
    };
    CreateWoPage.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'response server',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    CreateWoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-create-wo',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/create-wo/create-wo.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <button ion-button menuToggle >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Crete Wo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n\n  <ion-item>\n    <ion-label fixed>Wo Number :</ion-label>\n    <ion-input  [(ngModel)]="wo_number" type="text"  value="" placeholder="..."></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label fixed>Date Wo</ion-label>\n    <ion-datetime (ionChange)="onChange($event)" displayFormat="DD MMMM YYYY" pickerFormat="DD/MMMM/YYYY" [(ngModel)]="date_wo"></ion-datetime>\n  </ion-item>\n  <ion-item>\n    <ion-label fixed>Nik Naker</ion-label>\n \n      <ion-label (click)="showModel()">\n      {{ nik_bawahan }}\n    </ion-label>  \n  </ion-item>\n\n\n\n</ion-list>\n\n<button  ion-button full (click)="SubmitWo()"   color="light" >Submit</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/create-wo/create-wo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], CreateWoPage);
    return CreateWoPage;
}());

//# sourceMappingURL=create-wo.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PemakaianPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mitra_mitra__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__map_map__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pemakaian3_pemakaian3__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_device__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Generated class for the PemakaianPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PemakaianPage = /** @class */ (function () {
    function PemakaianPage(navCtrl, navParams, uri, platform, alertCtrl, modalCtrl, http, loadingCtrl, device, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.uri = uri;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.device = device;
        this.storage = storage;
        this.no_wo = "00";
        this.menu = "order";
        this.lat_odp = "-";
        this.lng_odp = "-";
        this.lat_pel = "-";
        this.lng_pel = "-";
        this.no_material = false;
        this.panjang_drop_core = "";
        this.drop_core = "";
        this.panjang_utp = "";
        this.panjang_pvc = "";
        this.panjang_tray_cable = "";
        this.jumlah_breket = "";
        this.jumlah_klem_ring = "";
        this.jumlah_tiang_telpn = "";
        this.panjang_drop_core_v = "";
        this.drop_core_v = "";
        this.panjang_utp_v = "";
        this.panjang_pvc_v = "";
        this.panjang_tray_cable_v = "";
        this.jumlah_breket_v = "";
        this.jumlah_klem_ring_v = "";
        this.jumlah_tiang_telpn_v = "";
        this.view_nama_mitra = 1;
        this.perusahaan = "telkom akses";
        this.no_row = 0;
        this.no_row_dsg = 0;
        this.nol = 0;
        this.optionsList = [];
        this.storage.set('session', "oke");
        this.tanggal_mulai = new Date().toISOString();
        this.tanggal_selesai = new Date().toISOString();
        var date2 = new Date();
        this.start_date = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
        this.end_date = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
        this.platform.ready().then(function () {
            _this.storage.get('nik').then(function (val) {
                _this.nik = val;
                console.log("ini niknya" + _this.nik);
            });
        });
    }
    PemakaianPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PemakaianPage');
    };
    PemakaianPage.prototype.presentProfileModal = function (x) {
        var _this = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__mitra_mitra__["a" /* MitraPage */], { sto: x, witel: this.witel });
        profileModal.onDidDismiss(function (data) {
            console.log("inii" + data.data);
            if (data.jenis == 'mitra') {
                _this.nama_mitra = data.data;
            }
            else if (data.jenis == 'witel') {
                _this.witel = data.data;
            }
            else {
                _this.sto = data.data;
            }
        });
        profileModal.present();
    };
    PemakaianPage.prototype.changeStart = function (val) {
        console.log("start");
        this.start_date = val.year + "-" + val.month + "-" + val.day;
        console.log("ee" + JSON.stringify(val));
    };
    PemakaianPage.prototype.changeEnd = function (val) {
        console.log("end");
        this.end_date = val.year + "-" + val.month + "-" + val.day;
        console.log(this.start_date);
    };
    PemakaianPage.prototype.changePerusahan = function (val) {
        if (val == 'mitra') {
            this.view_nama_mitra = 2;
        }
        else {
            this.view_nama_mitra = 1;
        }
    };
    PemakaianPage.prototype.actionNext = function () {
        var _this = this;
        var no = 1;
        var id_barang = [];
        var volume = [];
        var satuan = [];
        this.no_wo = this.no_permintaan;
        if (this.no_kontak == undefined) {
            this.showAlert("No no kontak tidak boleh kosong");
        }
        else if (this.sto == undefined) {
            this.showAlert("STO Tidak boleh kosong");
        }
        else if (this.no_permintaan == undefined) {
            this.showAlert("No Permintaan Tidak boleh kosong");
        }
        else if (this.no_telepon == undefined) {
            this.showAlert("No Telepon Tidak boleh kosong");
        }
        else if (this.no_inet == undefined) {
            this.showAlert("No Inet Tidak boleh kosong");
        }
        else if (this.start_date == undefined) {
            this.showAlert("Start Date Tidak boleh kosong");
        }
        else if (this.end_date == undefined) {
            this.showAlert("End Date Tidak boleh kosong");
        }
        else if (this.nama_pelanggan == undefined) {
            this.showAlert("Nama Pelanggan Tidak boleh kosong");
        }
        else if (this.alamat_pelanggan == undefined) {
            this.showAlert("Nama alamat pelanggan Tidak boleh kosong");
        }
        else if (this.rt == undefined) {
            this.showAlert("RT Tidak boleh kosong");
        }
        else if (this.rw == undefined) {
            this.showAlert("RW Tidak boleh kosong");
        }
        else if (this.kelurahan == undefined) {
            this.showAlert("Kelurahan Tidak boleh kosong");
        }
        else if (this.kecamatan == undefined) {
            this.showAlert("kecamatan Tidak boleh kosong");
        }
        else if (this.dp == undefined) {
            this.showAlert("ODP Tidak boleh kosong");
        }
        else if (this.bangunan == undefined) {
            this.showAlert("Info Bangunan Tidak boleh kosong");
        }
        else {
            var datas = {
                'jumlah_tiang_telpn': this.jumlah_tiang_telpn,
                'jumlah_klem_ring': this.jumlah_klem_ring,
                'jumlah_breket': this.jumlah_breket,
                'panjang_pvc': this.panjang_pvc,
                'panjang_utp': this.panjang_utp,
                'panjang_drop_core': this.panjang_drop_core,
                'panjang_tray_cable': this.panjang_tray_cable,
                'drop_core': this.drop_core,
                'nama_mitra': this.nama_mitra,
                'no_wo': this.no_wo,
                'no_kontak': this.no_kontak,
                'meter_awal': this.meter_awal,
                'meter_akhir': this.meter_akhir,
                'sto': this.sto,
                'witel': this.witel,
                'bangunan': this.bangunan,
                'no_kontak_2': this.no_kontak_2,
                'no_material': this.no_material,
                'lat_odp': this.lat_odp,
                'lng_odp': this.lng_odp,
                'lat_pel': this.lat_pel,
                'lng_pel': this.lng_pel,
                'no_permintaan': this.no_permintaan,
                'no_telepon': this.no_telepon,
                'no_inet': this.no_inet,
                'start_date': this.start_date,
                'end_date': this.end_date,
                'nama_pelanggan': this.nama_pelanggan,
                'alamat_pelanggan': this.alamat_pelanggan,
                'rt': this.rt,
                'rw': this.rw,
                'kelurahan': this.kelurahan,
                'kecamatan': this.kecamatan,
                'hk': this.hk,
                'dp': this.dp,
                'klem_primer': this.klem_primer,
                'klem_sec': this.klem_sec,
                'other': { 'id_barang': id_barang, 'volume': volume, 'satuan': satuan },
            };
            this.loading();
            var headers = new __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Headers */]({
                'Content-Type': 'application/x-www-form-urlencoded'
            });
            var requestOptions = new __WEBPACK_IMPORTED_MODULE_6__angular_http__["d" /* RequestOptions */]({
                headers: headers
            });
            var wo = 'nik=' + this.nik + "&wo_number=" + this.no_wo + "&versi=" + this.uri.versi;
            console.log(this.uri.uri_api_alista + 'ios/put_data_pemakaian_halaman1.php');
            this.http.post(this.uri.uri_api_alista + 'ios/put_data_pemakaian_halaman1.php', wo, requestOptions)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.status) {
                    _this.storage.set('data', datas);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pemakaian3_pemakaian3__["a" /* Pemakaian3Page */]);
                }
                else {
                    alert(data.message);
                }
                _this.loader.dismiss();
            });
        }
    };
    PemakaianPage.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    PemakaianPage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        this.loader.present();
    };
    PemakaianPage.prototype.changeNoKontak = function (value) {
        this.no_kontak = value.length > 8 ? value.substring(0, 8) : value;
    };
    PemakaianPage.prototype.presentOdpModal = function (x) {
        var _this = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__map_map__["a" /* MapPage */], { data: x });
        profileModal.onDidDismiss(function (data) {
            if (data.data == 'ODP') {
                _this.lat_odp = data.latitude;
                _this.lng_odp = data.longitude;
            }
            else {
                _this.lat_pel = data.latitude;
                _this.lng_pel = data.longitude;
            }
            console.log("inii" + _this.lat_odp + " " + data.data);
        });
        profileModal.present();
    };
    PemakaianPage.prototype.ionViewWillLeave = function () {
        var nodeList = document.querySelectorAll('._gmaps_cdv_');
        for (var k = 0; k < nodeList.length; ++k) {
            nodeList.item(k).classList.remove('_gmaps_cdv_');
        }
    };
    PemakaianPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pemakaian',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/pemakaian/pemakaian.html"*/'<!--\n  Generated template for the PemakaianPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="danger">\n    <button ion-button menuToggle >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Halaman-1 [versi {{uri.versi}}]</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div [ngSwitch]="menu">\n  <div *ngSwitchCase="\'order\'">\n     <label ><font size="5" color="red">ORDER</font></label>\n     <br/>\n     <br/>\n    <div style="margin: -10px -20px 0px -20px">\n      <ion-card width="100%">\n        <ion-card-header>\n          <b>Nama Perusahaan</b>\n        </ion-card-header>\n      <ion-card-content>\n        <ion-list radio-group [(ngModel)]="perusahaan" (ionChange)="changePerusahan($event)">\n        <table width="100%">\n            <tr>\n              <td><div style="margin-left: 15px"><ion-label ><div style="margin-top: 0px;width: 130px"><ion-radio value="telkom akses" ></ion-radio>\n                         Telkom Akses</div></ion-label></div></td>\n              <td>\n                <table>\n                  <tr>\n                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                        \n                    </td>\n                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                        <div style="margin-top: -15px;margin-left: 10px"><ion-radio value="mitra" ></ion-radio>\n                         Mitra</div>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n        </table>\n        </ion-list>\n      </ion-card-content>\n    </ion-card>\n    </div>\n\n    <br/>\n\n  <ion-item (click)="presentProfileModal(\'mitra\')" *ngIf="view_nama_mitra == 2">\n     <ion-label stacked><font color="black">Nama Mitra</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu"  disabled [(ngModel)]="nama_mitra" style="color:grey" ></ion-input>\n    \n  </ion-item>\n\n  <ion-item hidden>\n    <ion-label stacked><font color="black">No WO</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu" [(ngModel)]="no_wo" style="color:grey"  ></ion-input>\n  </ion-item>\n\n  <br/>\n   <ion-item>\n    <ion-label stacked><font color="black">Witel</font></ion-label>\n    <ion-input (click)="presentProfileModal(\'witel\')"  disabled  placeholder="Tulis sesuatu" [(ngModel)]="witel" style="color:grey"></ion-input>\n  </ion-item>\n\n  <br/>\n\n  <ion-item>\n    <ion-label stacked><font color="black">STO</font></ion-label>\n    <ion-input (click)="presentProfileModal(\'sto\')"  disabled  placeholder="Tulis sesuatu" [(ngModel)]="sto" style="color:grey"></ion-input>\n  </ion-item>\n\n    <ion-label stacked><font color="black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No Permintaan</font></ion-label>\n\n   <ion-item>\n    <ion-label fixed>SC -</ion-label>\n    <ion-input [(ngModel)]="no_permintaan" type="number"  value="" placeholder="Tulis sesuatu"></ion-input>\n  </ion-item>\n\n  <br/>\n  <ion-card width="100%">\n        <ion-card-header>\n          <b>Informasi Bangunan</b>\n        </ion-card-header>\n      <ion-card-content>\n        <ion-list radio-group [(ngModel)]="bangunan" >\n        <table width="100%">\n            <tr>\n              <td><div style="margin-left: 15px"><ion-label ><div style="margin-top: 0px;width: 130px"><ion-radio value="1" ></ion-radio> Rumah</div></ion-label></div></td>\n              <td>\n                <table>\n                  <tr>\n                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                        \n                    </td>\n                    <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n                        <div style="margin-top: -15px;margin-left: 10px"><ion-radio value="2" ></ion-radio>\n                         Apartemen</div>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n        </table>\n        </ion-list>\n      </ion-card-content>\n    </ion-card>\n    <br/>\n\n  <ion-item>\n    <ion-label stacked><font color="black">No Kontak Pelanggan 1</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu" [(ngModel)]="no_kontak"  type="number" max="13" style="color:grey"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label stacked><font color="black">No Kontak Pelanggan 2</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu" [(ngModel)]="no_kontak_2"  type="number" max="13" style="color:grey"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label stacked><font color="black">No Telepon Layanan</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu" [(ngModel)]="no_telepon"  type="number" style="color:grey"></ion-input>\n  </ion-item>\n   <ion-item>\n    <ion-label stacked><font color="black">No Inet</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu" [(ngModel)]="no_inet"  type="number" style="color:grey"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label stacked><font color="black">Tanggal Wo</font></ion-label>\n    <ion-datetime displayFormat="MMM DD, YYYY" (ionChange)="changeStart($event)"  [(ngModel)]="tanggal_mulai"  style="color:grey"></ion-datetime>\n  </ion-item>\n\n  <ion-item>\n    <ion-label stacked><font color="black">Tanggal Transaksi</font></ion-label>\n    <ion-datetime  displayFormat="MMM DD, YYYY" (ionChange)="changeEnd($event)"  [(ngModel)]="tanggal_selesai" style="color:grey" ></ion-datetime>\n  </ion-item>\n  \n   <ion-item>\n    <ion-label stacked><font color="black">Nama Pelanggan</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu" [(ngModel)]="nama_pelanggan" style="color:grey"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label stacked><font color="black">Alamat Pelanggan</font></ion-label>\n    <ion-textarea rows="6" cols="20" placeholder="Tulis sesuatu" [(ngModel)]="alamat_pelanggan" style="color:grey"></ion-textarea>\n  </ion-item>\n\n    <div style="margin-left: 18px;">\n        <ion-label stacked><font color="black">RT / RW</font></ion-label>\n    </div>\n    <table style="margin-left: 10px;">\n      <tr>\n        <td>  \n          <ion-input type="number" placeholder="Tulis sesuatu" [(ngModel)]="rt" style="color:grey"></ion-input>\n        </td>\n        <td>\n            &nbsp;/&nbsp;\n        </td>\n        <td>\n            <ion-input type="number" placeholder="Tulis sesuatu" [(ngModel)]="rw" style="color:grey"></ion-input>\n        </td>\n      </tr>\n    </table>\n\n  <ion-item>\n    <ion-label stacked><font color="black">Kelurahan</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu" [(ngModel)]="kelurahan" style="color:grey"></ion-input>\n  </ion-item> \n  \n  <ion-item>\n    <ion-label stacked><font color="black">Kecamatan</font></ion-label>\n    <ion-input placeholder="Tulis sesuatu" [(ngModel)]="kecamatan" style="color:grey"></ion-input>\n  </ion-item> \n    \n  </div>\n\n  <div *ngSwitchCase="\'datek\'">\n    <label ><font size="5" color="red">DATEK</font></label>\n       <ion-item>\n          <ion-label stacked><font color="black">HK/MSAN/ODC</font></ion-label>\n          <ion-input placeholder="Tulis sesuatu" [(ngModel)]="hk" style="color:grey"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label stacked><font color="black">DP/ODP</font></ion-label>\n          <ion-input placeholder="Tulis sesuatu" [(ngModel)]="dp" style="color:grey"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label stacked><font color="black">Klem Primer/Feeder</font></ion-label>\n          <ion-input placeholder="Tulis sesuatu" [(ngModel)]="klem_primer" style="color:grey"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label stacked><font color="black">Klem Sec/Distribusi</font></ion-label>\n          <ion-input placeholder="Tulis sesuatu" [(ngModel)]="klem_sec" style="color:grey"></ion-input>\n        </ion-item>\n        <ion-item>\n          Koordinat ODP <label *ngIf="lat_odp != \'-\' ">[{{lat_odp}},{{lng_odp}}]</label> <br/>\n         <a href="#" (click)="presentOdpModal(\'ODP\')" class="myButton">Tagging</a>\n        \n        </ion-item>\n\n        <ion-item>\n          Koordinat Pelanggan <label *ngIf="lat_pel != \'-\' ">[{{lat_pel}},{{lng_pel}}]</label> <br/>\n         <a href="#" (click)="presentOdpModal(\'Pelanggan\')" class="myButton">Tagging</a>\n        </ion-item>\n\n\n  </div>\n  <div *ngSwitchCase="\'material\'">\n \n <ion-card width="100%">\n      <ion-card-content>\n        <ion-list>\n          <table width="100%">\n              <tr>\n              <td valign="top" width="40%">\n                  <ion-checkbox color="green" [(ngModel)]="no_material"></ion-checkbox>\n                  Tidak menggunakan material \n              </td>\n            </tr>\n          </table>\n        \n        </ion-list>\n      </ion-card-content>\n    </ion-card>\n  <br/>\n<div *ngIf="no_material == false">\n  <ion-item-group *ngFor="let row of data_wo; let i =index">\n    <ion-item-divider color="light" text-wrap> ID Barang &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :  <b>{{row.id_barang}}</b>  </ion-item-divider>\n    <ion-item>Stock Barang  &nbsp;&nbsp;&nbsp;&nbsp;: {{row.stok}}</ion-item>\n    <ion-item>Satuan Barang &nbsp;&nbsp;: {{row.satuan}}</ion-item>\n    <ion-item>\n        <ion-label >Volume Update &nbsp;: </ion-label>\n        <ion-input value="{{nol.value}}" [(ngModel)]="modeKeys[i]" type="text" placeholder="..."  ></ion-input>\n    </ion-item>\n  </ion-item-group>\n</div>\n\n\n  <div hidden *ngIf="platform_device ==\'Android\'">\n        <ion-item>\n            File   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: \n            <button wrap-text ion-button color="danger"  (click)="browse()">Upload</button> {{path}}\n            <hr/>\n        </ion-item>\n  </div>\n  <div *ngIf="platform_device ==\'iOS\'">\n        <ion-item>\n            File   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: \n            <button wrap-text ion-button color="danger"  (click)="fotoAction()">Foto </button> {{path}}\n            <hr/>\n        </ion-item>\n  </div>\n      <br/>\n      <div>\n\n    <table>\n      <tr>\n        <td >\n        </td>\n        <td width="10%" align="right">\n          <div align="right">\n            <table>\n              <tr>\n                <td>\n                    <button hidden class="button" (click)="newElement()">\n                      <ion-icon name="add"></ion-icon> Item Lain &nbsp;\n                    </button>\n                </td>\n                <td>\n                  &nbsp;\n                  &nbsp;\n                </td>\n                <td>\n                    <button class="button" *ngIf="no_row != 0" (click)="removeElememt()">\n                      &nbsp;&nbsp;<ion-icon name="md-remove"></ion-icon>&nbsp;&nbsp;\n                    </button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </td>\n      </tr>\n    </table>\n\n      <!-- <div  id="parent" style="margin:15px"></div> -->\n      <!-- <div class="border"  >\n          <div *ngFor="let item of data_material" id="el"><table><tr><td width="40%"><input disabled placeholder="ID Barang" type="text" value="{{item.id_barang}}" class="classInput"/></td><td width="20%"><input type="text" value="{{item.jml_pemakaian}}" disabled placeholder="volume" id="volume" class="classInput"/></td><td  width="20%"><input value="{{item.satuan}}" type="text" disabled placeholder="satuan" id="satuan" class="classInput"/></td></tr></table></div>\n      </div> -->\n  </div>\n  </div>\n\n</div>\n  <div padding>\n    <ion-segment [(ngModel)]="menu">\n      <ion-segment-button value="order" style="background: DeepSkyBlue;border-top-left-radius: 10px;border-bottom-left-radius: 10px">\n       <font color="white">ORDER</font> \n      </ion-segment-button>\n\n      <!-- <ion-segment-button value="datek" style="background: DeepSkyBlue">\n        <font color="white"> DATEK </font>\n      </ion-segment-button> -->\n\n      <ion-segment-button value="datek" style="background: DeepSkyBlue;border-top-right-radius: 10px;border-bottom-right-radius: 10px">\n        <font color="white">  DATEK </font>\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n\n    <table>\n      <tr>\n        <td >\n        </td>\n        <td width="10%" align="right">\n          <div align="right">\n            <table>\n              <tr>\n                <td>\n                    <!-- <button class="button" (click)="newElementDsg()">\n                      <font size="2"><ion-icon name="add"></ion-icon> Designator Lain &nbsp;</font>\n                    </button> -->\n                </td>\n                <td>\n                  &nbsp;\n                  &nbsp;\n                </td>\n                <td>\n                    <button class="button" *ngIf="no_row_dsg != 0" (click)="removeElememtDsg()">\n                      &nbsp;&nbsp;<ion-icon name="md-remove"></ion-icon>&nbsp;&nbsp;\n                    </button>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </td>\n      </tr>\n    </table>\n    <br/>\n\n    <div id="parentDsg"></div>\n\n<div align="right">\n  <button class="button" (click)="actionNext()" right>Next ></button>\n</div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/pemakaian/pemakaian.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_device__["a" /* Device */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], PemakaianPage);
    return PemakaianPage;
}());

//# sourceMappingURL=pemakaian.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Pemakaian4Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signature_signature__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__denah_denah__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_screen_orientation__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__foto_foto__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













/**
 * Generated class for the Pemakaian4Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Pemakaian4Page = /** @class */ (function () {
    function Pemakaian4Page(navCtrl, navParams, storage, TransferObject, transfer, screenOrientation, http, platform, uri, loadingCtrl, alertCtrl, modalController, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.TransferObject = TransferObject;
        this.transfer = transfer;
        this.screenOrientation = screenOrientation;
        this.http = http;
        this.platform = platform;
        this.uri = uri;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.modalController = modalController;
        this.viewCtrl = viewCtrl;
        this.loader_gif = 'off';
        this.generate = "on";
        this.sum_denah = 0;
        this.sum_mitra = 0;
        this.sum_pelanggan = 0;
        this.platform.ready().then(function () {
            _this.storage.get('nik').then(function (val) {
                _this.nik = val;
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                var millisecond = date.getMilliseconds();
                _this.tanggal_ttd = day + "-" + month + "-" + year;
                _this.nama_signature = year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds + "" + millisecond + "" + _this.nik;
                console.log(_this.nama_signature);
                _this.uri_api_alista = _this.uri.uri_api_alista;
                _this.uri_app_amalia = _this.uri.uri_app_amalia;
                _this.uri_api_wimata = _this.uri.uri_api_wimata;
                _this.storage.get('data').then(function (val) {
                    _this.data = val;
                });
                _this.storage.get('data2').then(function (val) {
                    _this.data2 = val;
                });
                _this.storage.get('data3').then(function (val) {
                    console.log('con', val);
                    _this.data3 = val;
                });
                _this.storage.get('data_foto').then(function (val) {
                    console.log('con', val);
                    _this.data_foto = val;
                });
            });
        });
    }
    Pemakaian4Page.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Pemakaian4Page');
    };
    Pemakaian4Page.prototype.openSignatureModel1 = function () {
        var _this = this;
        var modal1 = this.modalController.create(__WEBPACK_IMPORTED_MODULE_2__signature_signature__["a" /* SignaturePage */]);
        this.sum_pelanggan++;
        modal1.onDidDismiss(function (data) {
            console.log(data);
            _this.loading();
            _this.signatureImage1 = data.signatureImage;
            console.log(data.signatureImage);
            _this.sendPostRequest(_this.signatureImage1, _this.nama_signature + "_1_" + _this.sum_pelanggan + ".png");
        });
        modal1.present();
    };
    Pemakaian4Page.prototype.openSignatureModel2 = function () {
        var _this = this;
        var modal2 = this.modalController.create(__WEBPACK_IMPORTED_MODULE_2__signature_signature__["a" /* SignaturePage */]);
        this.sum_mitra++;
        modal2.onDidDismiss(function (data) {
            _this.loading();
            _this.signatureImage2 = data.signatureImage;
            _this.sendPostRequest(_this.signatureImage2, _this.nama_signature + "_2_" + _this.sum_mitra + ".png");
        });
        modal2.present();
    };
    Pemakaian4Page.prototype.openModalDenah = function () {
        var _this = this;
        var modal3 = this.modalController.create(__WEBPACK_IMPORTED_MODULE_3__denah_denah__["a" /* DenahPage */]);
        this.sum_denah++;
        modal3.onDidDismiss(function (data) {
            _this.loading();
            _this.denah = data.signatureImage;
            _this.sendPostRequest(_this.denah, _this.nama_signature + "_denah_" + _this.sum_denah + ".png");
        });
        modal3.present();
    };
    Pemakaian4Page.prototype.actionPut = function () {
        var data4 = {
            kendala: this.kendala,
            alasan_decline: this.alasan_decline,
            harga: this.harga,
            tempat_ttd: this.tempat_ttd,
            harga_view: this.harga_view,
            menggunakan_isp_view: this.menggunakan_isp_view,
            url_ttd_pelanggan: this.nama_signature + "_1_" + this.sum_pelanggan + ".png",
            url_ttd_mitra: this.nama_signature + "_2_" + this.sum_mitra + ".png",
            denah: this.nama_signature + "_denah_+" + this.sum_denah + ".png"
        };
        this.storage.set('data5', data4);
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_10__foto_foto__["a" /* FotoPage */]);
    };
    Pemakaian4Page.prototype.upload = function (nama, path) {
        var _this = this;
        console.log("test");
        var options = {
            fileKey: "file",
            fileName: nama,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': nama }
        };
        var url = this.uri.uri_prod_upload + "upload.php";
        console.log(url);
        var fileTransfer = this.transfer.create();
        //Use the FileTransfer to upload the image
        fileTransfer.upload(path, url, options).then(function (data) {
            _this.loader.dismiss();
            console.log("berhasil berhasil uye :" + JSON.stringify(data));
        }, function (err) {
            _this.loader.dismiss();
            console.log("ddd");
            console.log("error", err);
            alert(err);
        });
    };
    Pemakaian4Page.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    //  showConfirm() {
    //   let confirm = this.alertCtrl.create({
    //     title: 'Sertakan email pelanggan ',
    //     inputs: [
    //       {
    //         name: 'email',
    //         placeholder: 'masukan email pelanggan (Wajib)'
    //       }
    //     ],
    //     buttons: [
    //       {
    //         text: 'Cancel',
    //         handler: () => {
    //           console.log('Disagree clicked');
    //         }
    //       },
    //       {
    //         text: 'OK',
    //         handler: (data) => {
    //           var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian2.php?halaman1="+
    //           js+"&halaman2="+
    //           js2+"&halaman3="+
    //           js3+"&halaman4="+
    //           js4+"&versi="+
    //           this.uri.versi;
    //           console.log(ini);   
    //           this.http.get(ini)
    //             .map(res => res.json())
    //             .subscribe(data => {
    //               this.loader.dismiss();
    //               this.loader_gif = 'off';
    //               if(data.status == "ok"){
    //                   this.showAlert(data.message);
    //                   this.navCtrl.setRoot(PemakaianPage);
    //               }else{
    //                 this.loader_gif = 'off';
    //                 this.showAlert(data.message);
    //               }
    //             },error =>{
    //                  this.loader_gif = 'off';
    //                  console.log('error put '+error);
    //             });
    //           console.log('Agree clicked');
    //         }
    //       }
    //     ]
    //   });
    //   confirm.present();
    // }
    Pemakaian4Page.prototype.actionBack = function () {
        this.navCtrl.pop();
    };
    Pemakaian4Page.prototype.showPromptDialog = function () {
        var prompt = this.alertCtrl.create({
            title: 'Email pelanggan',
            message: "Isi email pelanggan ..",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Title'
                },
            ],
            buttons: [
                {
                    text: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'submit',
                    handler: function (data) {
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    Pemakaian4Page.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        // execute loading 
        this.loader.present();
    };
    Pemakaian4Page.prototype.sendPostRequest = function (data, nama) {
        var _this = this;
        var link = 'http://alista.telkomakses.co.id/amalia/upload_base64.php';
        var myData = JSON.stringify({ data: data, nama: nama });
        console.log(myData);
        this.http.post(link, myData)
            .subscribe(function (data) {
            _this.loader.dismiss();
        }, function (error) {
            alert(error);
            _this.loader.dismiss();
            console.log("Oooops!");
        });
    };
    Pemakaian4Page.prototype.actionGenerate = function () {
        var _this = this;
        this.generate = "off";
        var js = this.data;
        var ini = this.uri.uri_api_alista + "amalia_app/push_sms_client.php?nik=" + this.nik + "&no_wo=" + js.no_permintaan + "&versi=" + this.uri.versi + "&nomor=" + js.no_kontak;
        console.log(ini);
        this.loading();
        this.http.get(ini)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.loader.dismiss();
            if (data.status == "T") {
                alert("setelah muncul pesan ini OTP sedang di generate,mintalah kode pada pelanggan kode di kirim melalui nomor kontak pelanggan yang di inputkan pada halaman-1, masukan kode saat setelah kode submit di kolom OTP");
            }
            else {
                _this.showAlert(data.message);
            }
        }, function (error) {
            console.log('error put ' + error);
        });
    };
    Pemakaian4Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pemakaian4',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/pemakaian4/pemakaian4.html"*/'<!--\n  Generated template for the Pemakaian2Page page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Halaman ke-4</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content >\n	<div class="text_light">\n	<div align="center">\n		<label><font color="red">LAPORAN PENYELESAIAN PEKERJAAN INSTALASI PASANG BARU/MIGRASI</font></label>\n	</div>\n	<ion-card >\n	  <ion-card-header>\n	    <font color="red">Disclaimer</font>\n	  </ion-card-header>\n	  <ion-card-content>\n	    	1. Perangkat (ONT/Modem/STB) yang dipasang pelanggan aalah MILIK TELKOM yang dipinjamkan selama menjadi pelanggan TELKOM. Modem yang tidak dipakai karena Migrasi ke Fiber ditarik kembali <br/><br/>\n	    	2.TELKOM dapat mengambil Modem yang tidak dipakai karena Migrasi ke Fiber ditarik kembali\n	    	3.Untuk progress pemiliharaan minitoring, diharapkan power perangkat selalu dalam kondisi hidup (ON)<br/><br/>\n	    	4.Disarankan untuk segera merubah password yang ada untuk menjaga agar tidak dipergunakan pihak-pihak yang tidak dikehendaki.<br/><br/>\n			\n	    	5.pelanggan sudah mendapatkan penjelasan dan sales/setter atau menerima buku petunjuk menggunakan modem internet yang telah dipasang \n	  </ion-card-content>\n	</ion-card>\n\n	<br/>\n	\n	\n\n	<ion-card hidden>\n\n	  <ion-card-header>\n	   <font color="red"> Kendala</font>\n	  </ion-card-header>\n\n	  <ion-card-content>\n	  	<ion-list radio-group [(ngModel)]="kendala">\n	    <table width="100%">\n	    	<tr>\n	    		<td width="50%">\n		    		<ion-radio  value="1"></ion-radio> Alamat Tidak Jelas\n		    	</td>\n		    	<td>\n		    		<div ><ion-radio  value="2"></ion-radio> Nama CP belum sesuai</div>\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td>\n		    		<ion-radio  value="3"></ion-radio> Bangunan direhab\n		    	</td>\n		    	<td>\n		    		<ion-radio  value="4"></ion-radio> Kendala IKR/G\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td>\n		    		<ion-radio  value="5"></ion-radio> Penghuni tidak ada\n		    	</td>\n		    	<td>\n		    		<ion-radio  value="6"></ion-radio> Modem rusak\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td>\n		    		<ion-radio  value="7"></ion-radio> Primer kritis/habis\n		    	</td>\n		    	<td>\n		    		<ion-radio  value="8"></ion-radio> Perangkat belum siap\n		    	</td>\n	    	</tr>\n	    	<tr>\n	    		<td>\n		    		<ion-radio  value="9"></ion-radio> Sekunder kritis/habis\n		    	</td>\n		    	<td>\n		    		<ion-radio  value="10"></ion-radio> Port multimedia habis\n		    	</td>\n	    	</tr>\n	    </table>\n		</ion-list>\n	  </ion-card-content>\n\n	</ion-card>\n\n	<ion-card >\n\n	  <ion-card-header>\n	    <font color="red">Alasan Decline/ Pelanggan tidak memerlukan</font>\n	  </ion-card-header>\n\n	  <ion-card-content>\n	  	<ion-list radio-group [(ngModel)]="alasan_decline" >\n	    <table width="100%">\n	    	<tr>\n	    		<td >\n	    			<table>\n	    				<tr>\n	    					<td width="50%"><ion-radio value="1"></ion-radio> menggunakan ISP</td>\n	    					<td *ngIf="alasan_decline==1">\n								     <input  type="text" [(ngModel)]="menggunakan_isp_view" value=""  placeholder="Tulis sesuatu"/>  \n								     <div style="margin-top: -7px"><hr  /></div>\n	    					</td>\n	    					<td *ngIf="alasan_decline!=1">\n								     <input disabled=""  type="text" [(ngModel)]="menggunakan_isp_view" value=""  placeholder="Tulis sesuatu"/>  \n								     <div style="margin-top: -7px"><hr  /></div>\n	    					</td>\n	    				</tr>\n	    			</table>\n		    	</td>\n		    </tr>\n		    <tr>\n	    		<td >\n	    			<table>\n	    				<tr>\n	    					<td width="100%"><ion-radio  value="2"></ion-radio> Tidak punya PC/Notebook.Gadget\n	    				</tr>\n	    			</table>\n		    	</td>\n		    </tr>\n	    	<tr>\n	    		<td >\n	    			<table>\n	    				<tr>\n	    					<td width="50%"><ion-radio value="3"></ion-radio> Harga yang di inginkan</td>\n	    					<td *ngIf="alasan_decline==3">\n								     <input width="10" type="text" [(ngModel)]="harga_view" value=""  placeholder="Tulis sesuatu"/>  \n								     <div style="margin-top: -7px"><hr  /></div>\n								     <br/>\n	    					</td>\n	    					<td *ngIf="alasan_decline!=3">\n								     <input disabled=""  type="text" [(ngModel)]="harga_view" value=""  placeholder="Tulis sesuatu"/>  \n								     <div style="margin-top: -7px"><hr  /></div>\n								     <br/>\n	    					</td>\n	    				</tr>\n	    			</table>\n		    	</td>\n		    </tr>\n		    <tr>\n	    		<td >\n	    			<table>\n	    				<tr>\n	    					<td width="100%"><ion-radio value="4"></ion-radio> Tidak ada pengguna internet\n	    				</tr>\n	    			</table>\n		    	</td>\n		    </tr>\n		    <tr>\n	    		<td >\n	    			<table>\n	    				<tr>\n	    					<td width="100%"><ion-radio  value="5"></ion-radio> Tidak di izinkan\n	    				</tr>\n	    			</table>\n		    	</td>\n		    </tr>\n		    <tr>\n	    		<td >\n	    			<table>\n	    				<tr>\n	    					<td width="100%"><ion-radio value="6"></ion-radio> Tidak tertarik\n	    				</tr>\n	    			</table>\n		    	</td>\n		    </tr>\n	    </table>\n		</ion-list>\n	  </ion-card-content>\n	</ion-card>\n\n	<table hidden width="100%">\n		<tr>\n			<td><div align="center">Gambar daerah denah pelanggan</div></td>\n		</tr>\n		<tr>\n			<td align="center"  width="50%"><div (click)="openModalDenah()"  style="border-color: grey; border-style: double;width: 250px;height: 200px" ><img *ngIf="denah" style="width: 100px;height: 100px" [src]="denah" ></div></td>\n		</tr>\n	</table>\n\n	<br/>\n	<div hidden align="right"> <input style="width: 115px"  type="text" [(ngModel)]="tempat_ttd" value=""  placeholder="Tulis tempat TTD"/> , {{tanggal_ttd}}</div>\n	<br/>\n	\n	<table hidden width="100%">\n		<tr>\n			<td><div align="center">Pelanggan</div></td>\n			<td><div align="center">Mitra</div></td>\n		</tr>\n		<tr>\n			<td align="center"  width="50%"><div (click)="openSignatureModel1()"  style="border-color: grey; border-style: dashed;width: 150px;height: 100px" ><img *ngIf="signatureImage1" style="width: 100px;height: 100px" [src]="signatureImage1" ></div></td>\n			<td align="center"  width="50%"><div (click)="openSignatureModel2()"  style="border-color: grey;border-style: dashed;width: 150px;height: 100px" ><img *ngIf="signatureImage2" style="width: 100px;height: 100px" [src]="signatureImage2" ></div></td>\n		</tr>\n	</table>\n\n	<br/>\n	<br/>\n	<br/>\n	\n	<button hidden *ngIf="generate == \'on\'" class="button" (click)="actionGenerate()" right>&nbsp;Generate OTP Code&nbsp;</button>\n	<br/>\n	<br/>\n	<br/>\n\n    <table width="100%">\n		<tr>\n			<td>\n				<div align="left" style="margin-left: -15px">\n				  <br/>\n				  <button class="button" (click)="actionBack()" right>&nbsp;< Back&nbsp;</button>\n				</div>\n			</td>\n			<td width="40%">\n				&nbsp;\n			</td>\n			<td>\n				<div align="right" style="margin-right: -10px">\n				  <br/>\n				  <img *ngIf="loader_gif == \'on\'" src="loader.gif" />\n				  <button *ngIf="loader_gif == \'off\'"  class="button" (click)="actionPut()" right>Next</button>\n				</div>\n			</td>\n		</tr>\n	</table>\n\n					\n</div>\n	</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/pemakaian4/pemakaian4.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["b" /* FileTransferObject */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], Pemakaian4Page);
    return Pemakaian4Page;
}());

//# sourceMappingURL=pemakaian4.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_opener__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_http__ = __webpack_require__(120);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











/**
 * Generated class for the BaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BaPage = /** @class */ (function () {
    function BaPage(navCtrl, navParams, transfer, fileOpener, http, 
        //private androidPermissions: AndroidPermissions,
        uri, storage, platform, https, loadingCtrl, file) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.transfer = transfer;
        this.fileOpener = fileOpener;
        this.http = http;
        this.uri = uri;
        this.storage = storage;
        this.platform = platform;
        this.https = https;
        this.loadingCtrl = loadingCtrl;
        this.file = file;
        this.uri_app_amalia = this.uri.uri_app_amalia;
        this.platform.ready().then(function () {
            _this.storage.get('nik').then(function (val) {
                _this.nik = val;
                _this.getlistBA(_this.nik);
            });
        });
    }
    BaPage.prototype.getlistBA = function (nik) {
        var _this = this;
        var ini = this.uri.uri_api_alista + 'amalia_app/get_data_list_wo.php?nik=' + this.nik;
        console.log(ini);
        this.http.get(ini, {}, {})
            .then(function (data) {
            _this.list = JSON.parse(data.data);
            _this.json_data_vendor2 = JSON.parse(data.data);
            _this.initializeItems();
            var i = JSON.parse(data.data);
            console.log(i[0].no_wo);
            console.log(data.status);
            console.log(data.headers);
        })
            .catch(function (error) {
            console.log(error.status);
            console.log(error.error); // error message as string
            console.log(error.headers);
        });
    };
    BaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BaPage');
    };
    BaPage.prototype.initializeItems = function () {
        var arr = [];
        var ini = 0;
        while (ini < this.json_data_vendor2.length) {
            arr.push(this.json_data_vendor2[ini]['no_wo'] + "_" + this.nik + ".pdf");
            ini++;
        }
        this.items = arr;
    };
    BaPage.prototype.download = function (no_wo) {
        var _this = this;
        this.loading();
        var fileTransfer = this.transfer.create();
        var no_w = no_wo.split("_");
        var url = this.uri.uri_api_alista + 'ios/TCPDF/examples/isi_ba_v2.php?no_wo=' + no_w[0];
        console.log(encodeURI(url));
        fileTransfer.download(encodeURI(url), this.file.externalRootDirectory + no_w[0] + "_" + this.nik + ".pdf").then(function (entry) {
            _this.fileOpener.open(_this.file.externalRootDirectory + no_w[0] + "_" + _this.nik + ".pdf", 'application/pdf')
                .then(function () { return _this.loader.dismiss(); })
                .catch(function (e) { return alert(e); });
        }, function (error) {
            alert(error);
        });
    };
    BaPage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        // execute loading 
        this.loader.present();
    };
    BaPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.initializeItems();
        // set val to the value of the searchbar
        var val = ev.target.value;
        //console.log("search"+this.items);
        console.log(val);
        // if the value is an empty strin g don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter(function (item) {
                try {
                    return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
                }
                catch (err) {
                    return "error";
                }
            });
        }
    };
    BaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-ba',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/ba/ba.html"*/'<!--\n  Generated template for the BaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="danger">\n    <button ion-button menuToggle >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List BA</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item>\n    <ion-label fixed>Search Ba :</ion-label>\n    <ion-input placeholder="..." [(ngModel)]="search" (input)="getItems($event)" type="text" value=""></ion-input>\n</ion-item>\n\n	<ion-list inset>\n	  <button ion-item *ngFor="let item of items" (click)="download(item)">\n      <!-- {{ item.no_wo }}_{{nik}}.pdf -->\n	    {{ item }}\n	  </button> \n	</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/ba/ba.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_opener__["a" /* FileOpener */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_8__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */]])
    ], BaPage);
    return BaPage;
}());

//# sourceMappingURL=ba.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListWoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_uri_uri__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the ListWoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ListWoPage = /** @class */ (function () {
    function ListWoPage(navCtrl, navParams, http, platform, uri, storage, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.platform = platform;
        this.uri = uri;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.platform.ready().then(function () {
            _this.loading();
            _this.storage.get('nik').then(function (val) {
                console.log(_this.uri.uri_api_alista + 'ios/get_data_list_material.php?nik=' + val);
                _this.http.get(_this.uri.uri_api_alista + 'ios/get_data_list_material.php?nik=' + val)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    console.log(data);
                    _this.items = data;
                    _this.loader.dismiss();
                });
            });
        });
    }
    ListWoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListWoPage');
    };
    ListWoPage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        this.loader.present();
    };
    ListWoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-list-wo',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/list-wo/list-wo.html"*/'<!--\n  Generated template for the ListWoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="danger">\n    <button ion-button menuToggle >\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List Stock Barang</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n<ion-list>\n  <button ion-item *ngFor="let item of items" >\n    <div ><td width="100px">ID Barang</td> <td width="10px">:</td> <td>{{ item.id_barang }}</td> </div><br/>\n    <div ><td width="100px">Stock</td> <td width="10px">:</td> <td>{{ item.stok }}</td> </div><br/>\n    <div ><td width="100px">Satuan</td> <td width="10px">:</td> <td>{{ item.satuan }}</td> </div><br/>\n  </button>  \n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/list-wo/list-wo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_5__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */]])
    ], ListWoPage);
    return ListWoPage;
}());

//# sourceMappingURL=list-wo.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_chooser__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_uri_uri__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__resume_resume__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














/**
 * Generated class for the FotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FotoPage = /** @class */ (function () {
    function FotoPage(navCtrl, fileChooser, storage, TransferObject, transfer, platform, uri, loadingCtrl, geolocation, alertCtrl, navParams, camera, file, http, filePath) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.fileChooser = fileChooser;
        this.storage = storage;
        this.TransferObject = TransferObject;
        this.transfer = transfer;
        this.platform = platform;
        this.uri = uri;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.file = file;
        this.http = http;
        this.filePath = filePath;
        this.img1 = "icon_camera.png";
        this.img2 = "icon_camera.png";
        this.img3 = "icon_camera.png";
        this.img4 = "icon_camera.png";
        this.img5 = "icon_camera.png";
        this.img6 = "icon_camera.png";
        this.img7 = "icon_camera.png";
        this.img8 = "icon_camera.png";
        this.img9 = "icon_camera.png";
        this.img10 = "icon_camera.png";
        this.nama_foto = "-";
        this.nik = "955139";
        this.deg1 = "90deg";
        this.isian = 'nok';
        this.uri_api_alista = this.uri.uri_api_alista;
        this.platform.ready().then(function () {
            _this.storage.get('nik').then(function (val) {
                _this.nik = val;
                _this.showConfirmFoto();
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                var millisecond = date.getMilliseconds();
                _this.storage.get('data').then(function (val) {
                    _this.data = val;
                });
                _this.storage.get('data2').then(function (val) {
                    _this.data2 = val;
                });
                _this.storage.get('data3').then(function (val) {
                    console.log('con', val);
                    _this.data3 = val;
                });
                _this.storage.get('data4').then(function (val) {
                    console.log('con', val);
                    _this.data4 = val;
                });
                _this.nama_foto = year + "" + month + "" + day + "" + hours + "" + minutes + "" + seconds + "" + millisecond + "" + _this.nik;
                _this.koordinat();
            });
        });
    }
    FotoPage.prototype.koordinat = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.latitude = resp.coords.latitude;
            _this.longitude = resp.coords.longitude;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    FotoPage.prototype.getDate = function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var millisecond = date.getMilliseconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    };
    FotoPage.prototype.take = function (index_foto) {
        var _this = this;
        var options = {
            quality: 100,
            allowEdit: true,
            saveToPhotoAlbum: true,
            correctOrientation: true,
            encodingType: this.camera.EncodingType.JPEG,
            destinationType: this.camera.DestinationType.FILE_URI
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var filename = imageData.substring(imageData.lastIndexOf('/') + 1);
            var path = imageData.substring(0, imageData.lastIndexOf('/') + 1);
            _this.loading();
            _this.file.readAsDataURL(path, filename).then(function (res) {
                _this.upload(filename, imageData, res, index_foto);
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
            var base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    FotoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FotoPage');
    };
    FotoPage.prototype.foto = function (x) {
        this.koordinat();
        if (this.pilihan == "1") {
            this.take(x);
        }
        else {
            this.fileGet(x);
        }
    };
    FotoPage.prototype.sendPostRequest = function (data, nama) {
        var link = 'http://alista.telkomakses.co.id/amalia/upload_base64_2.php';
        var myData = JSON.stringify({ data: data, nama: nama });
        console.log(myData);
        this.http.post(link, myData)
            .subscribe(function (data) {
            alert("sending success : " + data);
        }, function (error) {
            alert(error);
            // this.loader.dismiss();
            console.log("Oooops!");
        });
    };
    FotoPage.prototype.fileGet = function (index_foto) {
        var _this = this;
        this.fileChooser.open()
            .then(function (uri) {
            _this.filePath.resolveNativePath(uri)
                .then(function (filePath) {
                _this.path = filePath;
                var nama_ori = filePath.split("/");
                var index_path = nama_ori.length;
                if (nama_ori[index_path - 1].indexOf(".jpg") > 0 ||
                    nama_ori[index_path - 1].indexOf(".jpeg") > 0 ||
                    nama_ori[index_path - 1].indexOf(".png") > 0 ||
                    nama_ori[index_path - 1].indexOf(".PNG") > 0 ||
                    nama_ori[index_path - 1].indexOf(".JPG") > 0 ||
                    nama_ori[index_path - 1].indexOf(".JPEG") > 0 ||
                    nama_ori[index_path - 1].indexOf(".pdf") > 0 ||
                    nama_ori[index_path - 1].indexOf(".PDF") > 0) {
                    _this.nama_file = nama_ori[index_path - 1];
                    var path = filePath.substring(0, filePath.lastIndexOf('/') + 1);
                    _this.file.readAsDataURL(path, _this.nama_file).then(function (res) {
                        _this.loading();
                        //this.img1 = res
                        _this.upload(_this.nama_file, filePath, res, index_foto);
                    });
                }
                else {
                    _this.path = "-";
                    _this.nama_file = "-";
                    //this.showPromptApp("File yang di perbolehkan {.jpg, .jpeg, .png, .PNG, .JPG, .JPEG, .pdf, .PDF}");
                }
            })
                .catch(function (err) { });
        })
            .catch(function (e) { });
    };
    FotoPage.prototype.upload = function (nama, path, res, index_foto) {
        var _this = this;
        var options = {
            fileKey: "file",
            fileName: nama,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'fileName': nama }
        };
        var url = "http://180.250.124.181/API/amalia/uploads.php";
        var fileTransfer = this.transfer.create();
        //Use the FileTransfer to upload the image
        fileTransfer.upload(path, url, options).then(function (data) {
            _this.loader.dismiss();
            if (index_foto == "1") {
                _this.img1 = res;
                _this.date_1 = _this.getDate();
                _this.lat_1 = _this.latitude;
                _this.long_1 = _this.longitude;
                _this.name_1 = nama;
            }
            else if (index_foto == "2") {
                _this.img2 = res;
                _this.date_2 = _this.getDate();
                _this.lat_2 = _this.latitude;
                _this.long_2 = _this.longitude;
                _this.name_2 = nama;
            }
            else if (index_foto == "3") {
                _this.img3 = res;
                _this.date_3 = _this.getDate();
                _this.lat_3 = _this.latitude;
                _this.long_3 = _this.longitude;
                _this.name_3 = nama;
            }
            else if (index_foto == "4") {
                _this.img4 = res;
                _this.date_4 = _this.getDate();
                _this.lat_4 = _this.latitude;
                _this.long_4 = _this.longitude;
                _this.name_4 = nama;
            }
            else if (index_foto == "5") {
                _this.img5 = res;
                _this.date_5 = _this.getDate();
                _this.lat_5 = _this.latitude;
                _this.long_5 = _this.longitude;
                _this.name_5 = nama;
            }
            else if (index_foto == "6") {
                _this.img6 = res;
                _this.date_6 = _this.getDate();
                _this.lat_6 = _this.latitude;
                _this.long_6 = _this.longitude;
                _this.name_6 = nama;
            }
            else if (index_foto == "7") {
                _this.img7 = res;
                _this.date_7 = _this.getDate();
                _this.lat_7 = _this.latitude;
                _this.long_7 = _this.longitude;
                _this.name_7 = nama;
            }
            else if (index_foto == "8") {
                _this.img8 = res;
                _this.date_8 = _this.getDate();
                _this.lat_8 = _this.latitude;
                _this.long_8 = _this.longitude;
                _this.name_8 = nama;
            }
            else if (index_foto == "9") {
                _this.img9 = res;
                _this.date_9 = _this.getDate();
                _this.lat_9 = _this.latitude;
                _this.long_9 = _this.longitude;
                _this.name_9 = nama;
            }
            else if (index_foto == "10") {
                _this.img10 = res;
                _this.date_10 = _this.getDate();
                _this.lat_10 = _this.latitude;
                _this.long_10 = _this.longitude;
                _this.name_10 = nama;
            }
        }, function (err) { });
    };
    FotoPage.prototype.showConfirmFoto = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Gunaka Attach Foto?',
            message: '*bila menggunakan choose file di anjurkan menggunakan foto dari aplikasi GPS Camera',
            buttons: [
                {
                    text: 'Foto Langsung',
                    handler: function () {
                        _this.pilihan = "1";
                        _this.isian = 'ok';
                    }
                },
                {
                    text: 'Pilih Foto',
                    handler: function () {
                        _this.pilihan = "2";
                    }
                }
            ]
        });
        confirm.present();
    };
    FotoPage.prototype.loading = function () {
        this.loader = this.loadingCtrl.create({
            content: "please Wait.."
        });
        // execute loading 
        this.loader.present();
    };
    FotoPage.prototype.showConfirm = function () {
        if (this.img1 == 'icon_camera.png') {
            alert("Foto Depan ODP tidak boleh kosong");
        }
        else if (this.img2 == 'icon_camera.png') {
            alert("Foto Dalam ODP tidak boleh kosong");
        }
        else if (this.img3 == 'icon_camera.png') {
            alert("Foto Label DC / Precon tidak boleh kosong");
        }
        else if (this.img4 == 'icon_camera.png') {
            alert("Foto Hasil Test Redaman di ODP tidak boleh kosong");
        }
        else if (this.img5 == 'icon_camera.png') {
            alert("Foto DC / Precon ke rumah pelanggan tidak boleh kosong");
        }
        else if (this.img6 == 'icon_camera.png') {
            alert("Foto Rumah Pelanggan tidak boleh kosong");
        }
        else if (this.img7 == 'icon_camera.png') {
            alert("Foto jalur IKR tidak boleh kosong");
        }
        else if (this.img8 == 'icon_camera.png') {
            alert("Foto ONT tidak boleh kosong");
        }
        else if (this.img9 == 'icon_camera.png') {
            alert("Foto STB tidak boleh kosong");
        }
        else if (this.img10 == 'icon_camera.png') {
            alert("Foto dengan pelanggan tidak boleh kosong");
        }
        else {
            // let confirm = this.alertCtrl.create({
            // title: 'Sertakan email pelanggan ',
            // inputs: [
            //   {
            //     name: 'email',
            //     placeholder: 'masukan email pelanggan (Wajib)'
            //   }
            // ],
            // buttons: [
            //   {
            //     text: 'Cancel',
            //     handler: () => {
            //     }
            //   },
            //   {
            //     text: 'OK',
            //     handler: (data) => {
            //confirm.dismiss();
            // this.loading();
            var data5 = {
                name_1: this.name_1,
                name_2: this.name_2,
                name_3: this.name_3,
                name_4: this.name_4,
                name_5: this.name_5,
                name_6: this.name_6,
                name_7: this.name_7,
                name_8: this.name_8,
                name_9: this.name_9,
                name_10: this.name_10,
                lat_1: this.lat_1,
                lat_2: this.lat_2,
                lat_3: this.lat_3,
                lat_4: this.lat_4,
                lat_5: this.lat_5,
                lat_6: this.lat_6,
                lat_7: this.lat_7,
                lat_8: this.lat_8,
                lat_9: this.lat_9,
                lat_10: this.lat_10,
                long_1: this.long_1,
                long_2: this.long_2,
                long_3: this.long_3,
                long_4: this.long_4,
                long_5: this.long_5,
                long_6: this.long_6,
                long_7: this.long_7,
                long_8: this.long_8,
                long_9: this.long_9,
                long_10: this.long_10,
                date_1: this.date_1,
                date_2: this.date_2,
                date_3: this.date_3,
                date_4: this.date_4,
                date_5: this.date_5,
                date_6: this.date_6,
                date_7: this.date_7,
                date_8: this.date_8,
                date_9: this.date_9,
                date_10: this.date_10,
            };
            this.storage.set('data6', data5);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__resume_resume__["a" /* ResumePage */]);
            // var js = JSON.stringify(this.data);
            // var js2 = JSON.stringify(this.data2);
            // var js3 = JSON.stringify(this.data3);
            // var js4 = JSON.stringify(this.data4);
            // var js5 = JSON.stringify(data5);
            // var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian2.php?halaman1="+js+"&halaman2="+
            // js2+"&halaman3="+js3
            // +"&halaman4="+js4
            // +"&halaman5="+js5
            // +"&versi="+
            // this.uri.versi; 
            // this.http.get(ini)
            //   .map(res => res.json())
            //   .subscribe(data => {
            //     this.loader.dismiss();
            //     if(data.status == "ok"){
            //         this.showAlert(data.message);
            //         //this.navCtrl.setRoot(PemakaianPage);
            //     }else{
            //       this.showAlert(data.message);
            //     }
            //   },error =>{
            //        console.log('error put '+error);
            //   });
            //console.log('Agree clicked');
            //       }
            //     }
            //   ]
            // });
            // confirm.present();
        }
    };
    FotoPage.prototype.actionBack = function () {
        this.navCtrl.pop();
    };
    FotoPage.prototype.showAlert = function (x) {
        var alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: x,
            buttons: ['OK']
        });
        alert.present();
    };
    FotoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-foto',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/foto/foto.html"*/'<!--\n  Generated template for the FotoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Halaman-5</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n	<table width="100%">\n		<tr>\n			<td align="center">\n				 Depan ODP\n			</td>\n			<td align="center">\n				 Dalam ODP\n\n			</td>\n		</tr>\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n		<tr>\n			<td align="center">\n\n				<ion-card>\n				  <ion-card-content>\n				  	&nbsp;\n					<img *ngIf="img1 == \'icon_camera.png\'" (click)="foto(\'1\')" [src]="img1" style="width: 100px;height: 100px" /> \n					<img *ngIf="img1 != \'icon_camera.png\' && pilihan == \'2\'" (click)="foto(\'1\')" [src]="img1" style="width: 100px;height: 100px;transform: rotate(0deg);" /> \n\n					<img *ngIf="img1 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'1\')" [src]="img1" style="width: 100px;height: 100px" /> \n					&nbsp;\n\n					<table *ngIf="isian == \'ok\'"> \n						<tr>\n							<td>Lat</td>\n							<td>:</td>\n							<td>{{lat_1}}</td>\n						</tr>\n						<tr>\n							<td>Long</td>\n							<td>:</td>\n							<td>{{long_1}}</td>\n						</tr>\n						<tr>\n							<td>Date</td>\n							<td>:</td>\n							<td>{{date_1}}</td>\n						</tr>\n					</table>\n				  </ion-card-content>\n\n				</ion-card>\n				\n			</td>\n			<td align="center">\n				<ion-card>\n				  <ion-card-content text-wrap>\n				&nbsp;\n				<img *ngIf="img2 == \'icon_camera.png\'" (click)="foto(\'2\')" [src]="img2" style="width: 100px;height: 100px" /> \n				<img *ngIf="img2 != \'icon_camera.png\' && pilihan == \'nok\'" (click)="foto(\'2\')" [src]="img2" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n\n					<img *ngIf="img2 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'2\')" [src]="img2" style="width: 100px;height: 100px" /> \n				&nbsp;\n				<table *ngIf="isian == \'ok\'">\n						<tr>\n							<td>Lat</td>\n							<td>:</td>\n							<td>{{lat_2}}</td>\n						</tr>\n						<tr>\n							<td>Long</td>\n							<td>:</td>\n							<td>{{long_2}}</td>\n						</tr>\n\n						<tr>\n							<td>Date</td>\n							<td>:</td>\n							<td>{{date_2}}</td>\n						</tr>\n					</table>\n				 </ion-card-content>\n\n				</ion-card>\n				\n			</td>\n		</tr>\n\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n\n\n		<!-- 2 -->\n\n		<tr>\n			<td align="center">\n				Label DC / Precon\n			</td>\n			<td align="center">\n				Hasil Test Redaman di ODP\n\n			</td>\n		</tr>\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n		<tr>\n			<td align="center">\n\n				<ion-card>\n				  <ion-card-content>\n				  	&nbsp;\n					<img *ngIf="img3 == \'icon_camera.png\'" (click)="foto(\'3\')" [src]="img3" style="width: 100px;height: 100px" /> \n					<img *ngIf="img3 != \'icon_camera.png\' && pilihan == \'nok\'" (click)="foto(\'3\')" [src]="img3" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n\n					<img *ngIf="img3 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'3\')" [src]="img3" style="width: 100px;height: 100px" /> \n					&nbsp;\n\n					<table *ngIf="isian == \'ok\'">\n						<tr>\n							<td>Lat</td>\n							<td>:</td>\n							<td>{{lat_3}}</td>\n						</tr>\n						<tr>\n							<td>Long</td>\n							<td>:</td>\n							<td>{{long_3}}</td>\n						</tr>\n						<tr>\n							<td>Date</td>\n							<td>:</td>\n							<td>{{date_3}}</td>\n						</tr>\n					</table>\n				  </ion-card-content>\n\n				</ion-card>\n				\n			</td>\n			<td align="center">\n				<ion-card>\n				  <ion-card-content text-wrap>\n				&nbsp;\n				<img *ngIf="img4 == \'icon_camera.png\'" (click)="foto(\'4\')" [src]="img4" style="width: 100px;height: 100px" /> \n				<img *ngIf="img4 != \'icon_camera.png\' && pilihan == \'nok\'" (click)="foto(\'4\')" [src]="img4" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n\n					<img *ngIf="img4 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'4\')" [src]="img4" style="width: 100px;height: 100px" />  \n				&nbsp;\n				<table *ngIf="isian == \'ok\'">\n						<tr>\n							<td>Lat</td>\n							<td>:</td>\n							<td>{{lat_4}}</td>\n						</tr>\n						<tr>\n							<td>Long</td>\n							<td>:</td>\n							<td>{{long_4}}</td>\n						</tr>\n\n						<tr>\n							<td>Date</td>\n							<td>:</td>\n							<td>{{date_4}}</td>\n						</tr>\n					</table>\n				 </ion-card-content>\n\n				</ion-card>\n				\n			</td>\n		</tr>\n\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n\n		<!-- 3 -->\n\n		<tr>\n			<td align="center">\n				DC / Precon Ke Rumah Pelanggan\n			</td>\n			<td align="center">\n				Rumah Pelanggan\n			</td>\n		</tr>\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n		<tr>\n			<td align="center">\n\n				<ion-card>\n				  <ion-card-content>\n				  	&nbsp;\n					<img *ngIf="img5 == \'icon_camera.png\'" (click)="foto(\'5\')" [src]="img5" style="width: 100px;height: 100px" /> \n					<img *ngIf="img5 != \'icon_camera.png\' && pilihan == \'nok\'" (click)="foto(\'5\')" [src]="img5" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n\n					<img *ngIf="img5 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'5\')" [src]="img5" style="width: 100px;height: 100px" /> \n					&nbsp;\n\n					<table *ngIf="isian == \'ok\'">\n						<tr>\n							<td>Lat</td>\n							<td>:</td>\n							<td>{{lat_5}}</td>\n						</tr>\n						<tr>\n							<td>Long</td>\n							<td>:</td>\n							<td>{{long_5}}</td>\n						</tr>\n						<tr>\n							<td>Date</td>\n							<td>:</td>\n							<td>{{date_5}}</td>\n						</tr>\n					</table>\n				  </ion-card-content>\n\n				</ion-card>\n				\n			</td>\n			<td align="center">\n				<ion-card>\n				  <ion-card-content text-wrap>\n				&nbsp;\n				<img *ngIf="img6 == \'icon_camera.png\'" (click)="foto(\'6\')" [src]="img6" style="width: 100px;height: 100px" /> \n				<img *ngIf="img6 != \'icon_camera.png\' && pilihan == \'nok\'" (click)="foto(\'6\')" [src]="img6" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n\n					<img *ngIf="img6 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'6\')" [src]="img6" style="width: 100px;height: 100px" /> \n				&nbsp;\n				<table *ngIf="isian == \'ok\'">\n						<tr>\n							<td>Lat</td>\n							<td>:</td>\n							<td>{{lat_6}}</td>\n						</tr>\n						<tr>\n							<td>Long</td>\n							<td>:</td>\n							<td>{{long_6}}</td>\n						</tr>\n\n						<tr>\n							<td>Date</td>\n							<td>:</td>\n							<td>{{date_6}}</td>\n						</tr>\n					</table>\n				 </ion-card-content>\n\n				</ion-card>\n				\n			</td>\n		</tr>\n\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n		<!-- 4 -->\n		<tr>\n			<td  align="center">\n				Jalur IKR\n			</td>\n			<td  align="center">\n					Jalur ONT\n			</td>\n		</tr>\n		<tr>\n			<td colspan="2">&nbsp;</td>\n		</tr>\n		<tr>\n			<td  align="center">\n\n				<ion-card>\n				  <ion-card-content>\n				  	&nbsp;\n					<img *ngIf="img7 == \'icon_camera.png\'" (click)="foto(\'7\')" [src]="img7" style="width: 100px;height: 100px" /> \n					<img *ngIf="img7 != \'icon_camera.png\' && pilihan == \'2\'" (click)="foto(\'7\')" [src]="img7" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n\n					<img *ngIf="img7 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'7\')" [src]="img7" style="width: 100px;height: 100px" /> \n					&nbsp;\n\n					<table *ngIf="isian == \'ok\'">\n						<tr>\n							<td>Lat</td>\n							<td>:</td>\n							<td>{{lat_7}}</td>\n						</tr>\n						<tr>\n							<td>Long</td>\n							<td>:</td>\n							<td>{{long_7}}</td>\n						</tr>\n						<tr>\n							<td>Date</td>\n							<td>:</td>\n							<td>{{date_7}}</td>\n						</tr>\n					</table>\n				  </ion-card-content>\n				</ion-card>\n			</td>\n			<td  align="center">\n\n					<ion-card>\n					  <ion-card-content>\n						  &nbsp;\n						<img *ngIf="img8 == \'icon_camera.png\'" (click)="foto(\'8\')" [src]="img8" style="width: 100px;height: 100px" /> \n						<img *ngIf="img8 != \'icon_camera.png\' && pilihan == \'2\'" (click)="foto(\'8\')" [src]="img8" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n	\n						<img *ngIf="img8 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'8\')" [src]="img8" style="width: 100px;height: 100px" /> \n						&nbsp;\n	\n						<table *ngIf="isian == \'ok\'">\n							<tr>\n								<td>Lat</td>\n								<td>:</td>\n								<td>{{lat_8}}</td>\n							</tr>\n							<tr>\n								<td>Long</td>\n								<td>:</td>\n								<td>{{long_8}}</td>\n							</tr>\n							<tr>\n								<td>Date</td>\n								<td>:</td>\n								<td>{{date_8}}</td>\n							</tr>\n						</table>\n					  </ion-card-content>\n					</ion-card>\n				</td>\n		</tr>\n\n		<!-- 5 -->\n		<tr>\n				<td  align="center">\n					STB\n				</td>\n				<td  align="center">\n					Foto Dengan Pelanggan\n				</td>\n			</tr>\n			<tr>\n				<td colspan="2">&nbsp;</td>\n			</tr>\n			<tr>\n				<td  align="center">\n	\n					<ion-card>\n					  <ion-card-content>\n						  &nbsp;\n						<img *ngIf="img9 == \'icon_camera.png\'" (click)="foto(\'9\')" [src]="img9" style="width: 100px;height: 100px" /> \n						<img *ngIf="img9 != \'icon_camera.png\' && pilihan == \'2\'" (click)="foto(\'9\')" [src]="img9" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n	\n						<img *ngIf="img9 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'9\')" [src]="img9" style="width: 100px;height: 100px" /> \n						&nbsp;\n	\n						<table *ngIf="isian == \'ok\'">\n							<tr>\n								<td>Lat</td>\n								<td>:</td>\n								<td>{{lat_9}}</td>\n							</tr>\n							<tr>\n								<td>Long</td>\n								<td>:</td>\n								<td>{{long_9}}</td>\n							</tr>\n							<tr>\n								<td>Date</td>\n								<td>:</td>\n								<td>{{date_9}}</td>\n							</tr>\n						</table>\n					  </ion-card-content>\n					</ion-card>\n				</td>\n				<td  align="center">\n	\n						<ion-card>\n						  <ion-card-content>\n							  &nbsp;\n							<img *ngIf="img10 == \'icon_camera.png\'" (click)="foto(\'10\')" [src]="img10" style="width: 100px;height: 100px" /> \n							<img *ngIf="img10 != \'icon_camera.png\' && pilihan == \'2\'" (click)="foto(\'10\')" [src]="img10" style="width: 100px;height: 100px;transform: rotate(90deg);" /> \n		\n							<img *ngIf="img10 != \'icon_camera.png\' && pilihan == \'1\'" (click)="foto(\'10\')" [src]="img10" style="width: 100px;height: 100px" /> \n							&nbsp;\n		\n							<table *ngIf="isian == \'ok\'">\n								<tr>\n									<td>Lat</td>\n									<td>:</td>\n									<td>{{lat_10}}</td>\n								</tr>\n								<tr>\n									<td>Long</td>\n									<td>:</td>\n									<td>{{long_10}}</td>\n								</tr>\n								<tr>\n									<td>Date</td>\n									<td>:</td>\n									<td>{{date_10}}</td>\n								</tr>\n							</table>\n						  </ion-card-content>\n						</ion-card>\n					</td>\n			</tr>\n\n\n	</table>\n\n	<br/>\n	<br/>\n	<br/>\n\n	<button class="button" (click)="showConfirm()" right>&nbsp;Submit&nbsp;</button>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/foto/foto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_chooser__["a" /* FileChooser */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["b" /* FileTransferObject */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_10__providers_uri_uri__["a" /* UriProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__["a" /* FilePath */]])
    ], FotoPage);
    return FotoPage;
}());

//# sourceMappingURL=foto.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignaturePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pemakaian4_pemakaian4__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SignaturePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SignaturePage = /** @class */ (function () {
    function SignaturePage(navCtrl, navParams, viewCtrl, screenOrientation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.screenOrientation = screenOrientation;
        this.signaturePadOptions = {
            'minWidth': 2,
            'canvasWidth': 340,
            'canvasHeight': 300
        };
    }
    SignaturePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignaturePage');
    };
    SignaturePage.prototype.drawCancel = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pemakaian4_pemakaian4__["a" /* Pemakaian4Page */]);
    };
    SignaturePage.prototype.drawComplete = function () {
        this.signatureImage = this.signaturePad.toDataURL();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pemakaian4_pemakaian4__["a" /* Pemakaian4Page */], { signatureImage: this.signatureImage });
    };
    SignaturePage.prototype.drawClear = function () {
        this.signaturePad.clear();
    };
    SignaturePage.prototype.canvasResize = function () {
        var canvas = document.querySelector('canvas');
        this.signaturePad.set('minWidth', 1);
        this.signaturePad.set('canvasWidth', canvas.offsetWidth);
        this.signaturePad.set('canvasHeight', canvas.offsetHeight);
    };
    SignaturePage.prototype.ngAfterViewInit = function () {
        this.signaturePad.clear();
        this.canvasResize();
    };
    SignaturePage.prototype.dismiss = function () {
        this.signatureImage = this.signaturePad.toDataURL();
        var data = { signatureImage: this.signatureImage };
        this.viewCtrl.dismiss(data);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad__["SignaturePad"]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_angular2_signaturepad_signature_pad__["SignaturePad"])
    ], SignaturePage.prototype, "signaturePad", void 0);
    SignaturePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-signature',template:/*ion-inline-start:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/signature/signature.html"*/'<ion-header>\n  <ion-navbar >\n    <ion-title>Signature</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n<signature-pad [options]="signaturePadOptions"  id="signatureCanvas"></signature-pad>\n<ion-grid>\n  <ion-row>\n    <ion-col col-4>\n<button ion-button full color="danger" (click)="drawCancel()">Cancel</button>\n    </ion-col>\n    <ion-col col-4>\n<button ion-button full color="light" (click)="drawClear()">Clear</button>\n    </ion-col>\n    <ion-col col-4>\n<button ion-button full color="secondary" (click)="dismiss()">Done</button>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-content>'/*ion-inline-end:"/Users/mojave/Documents/project/ionic/ba_digital/src/pages/signature/signature.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_screen_orientation__["a" /* ScreenOrientation */]])
    ], SignaturePage);
    return SignaturePage;
}());

//# sourceMappingURL=signature.js.map

/***/ })

},[230]);
//# sourceMappingURL=main.js.map