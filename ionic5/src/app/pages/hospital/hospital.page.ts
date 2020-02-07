import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { NavController , Platform  } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import {Geolocation, GeolocationOptions} from '@ionic-native/geolocation/ngx';

declare var google: any;


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.page.html',
  styleUrls: ['./hospital.page.scss'],
})
export class HospitalPage {

  map: any;
  markers: any;

  estabelecimentos = [{
    name: 'Estabelecimeto1',
    lat: -15.5837031,
    lng: -56.084949
} , {
  name: 'Estabelecimeto2',
  lat: -15.574358,
  lng: -56.084949
  }];

  constructor(
    private router: Router,
    public geolocation: Geolocation,
    private accsPrvds: AccessProviders,
    private actRoute: ActivatedRoute,
    public navCtrl: NavController,
    private platform: Platform
  ) { }

  // ionViewWillEnter() {
  //   this.platform.ready().then(() => {
  //     this.initPage();
  //   });
  // }

  // initPage() {
  //   this.geolocation.getCurrentPosition().then(result => {
  //     this.loadMap(result.coords.latitude, result.coords.longitude);
  //   });
  // }

  // loadMap(lat , lng) {
  //   let latLng = new google.maps.latlng(lat , lng);

  //   let mapOption = {
  //     center: latLng,
  //     zoom: 14,
  //     mapTypeID: google.maps.mapTypeId.ROADMAP,
  //     disableDefaultUI: true
  //   };

  //   let element = document.getElementById('map');

  //   this.map = new google.maps.Map(element, mapOption);
  // }

}
