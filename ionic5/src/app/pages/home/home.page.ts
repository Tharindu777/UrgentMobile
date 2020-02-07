import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
  async prosesLogout(){
    this.storage.clear();
    this.navCtrl.navigateRoot(['/intro']);
    const toast = await this.toastCtrl.create({
      message: 'Logout successfuly',
      duration: 1500
    });
    toast.present();
  }

  async mycontact(){
    this.router.navigate(['/contact/']);
  }

  async gohospital(){
    this.router.navigate(['/hospital/']);
  }

  async gopolice(){
    this.router.navigate(['/police-station/']);
  }

  async gofire(){
    this.router.navigate(['/fire/']);
  }




}
