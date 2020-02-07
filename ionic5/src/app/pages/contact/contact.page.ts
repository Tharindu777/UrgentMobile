import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {


  datastorage: any;
  name:string;

  users: any=[];
  limit: number = 13 //limit get data
  start: number = 0;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) { }


  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage-xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.Name;

    });

    this.start = 0;
    this.users = [];
    this.loadUsers();
  }

  async doRefresh(event){
    const loader = await this.loadingCtrl.create({ 
      message: 'Please wait......'
    });
    loader.present();

    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  loadData(event:any){
    this.start += this.limit;
    setTimeout(() =>{
      this.loadUsers().then(()=>{
        event.target.complete();
      });
    }, 500);
  }

  async loadUsers(){
    return new Promise(resolve => {
        let body = {
          aksi: 'load_users',
          start: this.start,
          limit: this.limit
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
         for(let datas of res.result){ //specail if you want to use infiniti scroll load data per limit
           this.users.push(datas);
         }
         resolve(true);
        });
      });
  }    

  async delData(a){
    return new Promise(resolve => {
      let body = {
        aksi: 'del_users',
        id: a
      }

      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          this.presentToast('Delete successfuly');
          this.ionViewDidEnter();
        }else{
          this.presentToast('Delete error');
        }
      });
    });
  }

  async openCrud(a){
    return new Promise(resolve => {
      let body = {
        aksi: 'del_users',
        id: a
      }

      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
        if(res.success==true){
          this.presentToast('Update successfuly');
          this.ionViewDidEnter();
        }else{
          this.presentToast('Update error');
        }
      });
    });
  } 

  async openCrudadd(a){
    this.router.navigate(['/crud/'+a]);
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }


  async prosesLogout(){
    this.storage.clear();
    this.navCtrl.navigateRoot(['/intro']);
    const toast = await this.toastCtrl.create({
      message: 'Logout successfuly',
      duration: 1500
    });
    toast.present();
  }
}