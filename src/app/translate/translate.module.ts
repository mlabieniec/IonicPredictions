import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePage } from './translate.page';
import { DataService } from '../data.service';
import { LanguageSelectComponent } from './language-select/language-select.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: TranslatePage }])
  ],
  providers: [DataService],
  declarations: [TranslatePage, LanguageSelectComponent],
  entryComponents: [LanguageSelectComponent]
})
export class TranslatePageModule {}
