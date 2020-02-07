import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ToastController, LoadingController, AlertController  } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  id: number;

  your_name: string ="";
  email_address: string ="";
  password: string ="";
  confirm_pass: string ="";
  Name: string ="";
  Telephone_No	= "";

  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any)=>{
      console.log(data);
      this.id = data.id;

      if(this.id!=0){
        this.loadUser();
      }
    });
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  loadUser(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_single_data',
        id: this.id
      }

      this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
        this.Name = res.result.Name;
        this.Telephone_No = res.result.Telephone_No;
      });
    });
  }
  

  async crudAction(a){
    if(this.Name==""){
        this.presentToast('Name is required');
    }else if(this.Telephone_No==""){
      this.presentToast('Telephone number is required');
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({ 
        message: 'Please wait......'
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_crud',
          id: this.id,
          Name: this.Name,
          Telephone_No: this.Telephone_No,
          action: a
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res:any)=>{
          if(res.success==true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(a+res.msg);
            this.router.navigate(['/contact']);
          }else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentAlert(res.msg,a);

          }
        },(err)=>{
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Timeout',a);
        });
      });
    }    
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  async presentAlert(a,b) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            //action
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.crudAction(b);
          }
        }
      ]
    });

    await alert.present();
  }

}
