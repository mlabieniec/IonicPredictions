import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ModalController } from '@ionic/angular';
import { Hub } from '@aws-amplify/core';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss'],
})
export class LanguageSelectComponent implements OnInit {
  
  @Input() selected:string;
  @Input() type:string;

  constructor( 
    public data: DataService, 
    private modalCtrl: ModalController ) { 
  }

  ngOnInit() {
    console.log(`selected: ${this.selected}`);
    console.log(`type: ${this.type}`);
  }

  public select(lang:string): void {
    console.log('selectSource: ', lang);
    Hub.dispatch(
      'settings', 
      { 
          event: this.type, 
          data: lang
    });
    this.dismiss();
  }

  public dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
