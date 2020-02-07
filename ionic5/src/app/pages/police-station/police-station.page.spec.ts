import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PoliceStationPage } from './police-station.page';

describe('PoliceStationPage', () => {
  let component: PoliceStationPage;
  let fixture: ComponentFixture<PoliceStationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoliceStationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PoliceStationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
