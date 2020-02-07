import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliceStationPage } from './police-station.page';

const routes: Routes = [
  {
    path: '',
    component: PoliceStationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliceStationPageRoutingModule {}
