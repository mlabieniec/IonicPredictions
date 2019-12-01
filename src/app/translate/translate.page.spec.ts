import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TranslatePage } from './translate.page';

describe('TranslatePage', () => {
  let component: TranslatePage;
  let fixture: ComponentFixture<TranslatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TranslatePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TranslatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
