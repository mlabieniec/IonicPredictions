import { Component } from '@angular/core';
import Predictions from '@aws-amplify/predictions';
import { LoadingController } from '@ionic/angular';
import { Hub } from '@aws-amplify/core';
import awsconfig from 'src/aws-exports';

/**
 * Amplify Predictions - Translation
 * Settings are pulled from the aws-exports.js file and 
 * can be changed via the Settings (tab2) UI.
 */
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public translatedText = "Choose or Take a Photo"
  public identifiedText:string;
  public photo:string;
  public loading:any;
  
  public sourceLang = awsconfig.predictions.convert.translateText.defaults.sourceLanguage;
  public targetLang = awsconfig.predictions.convert.translateText.defaults.targetLanguage;

  constructor( public loadingController: LoadingController ) { 
    // Listen for changes in settings from the settings view
    Hub.listen('settings', (data) => {
      const { payload } = data;
      if (payload.event === 'source')
        this.sourceLang = payload.data;
      
      if (payload.event === 'target')
        this.targetLang = payload.data;
    });
  }

  /**
   * Fired when a photo is chosen from the file inspector
   * or when a photo is taken via a mobile device. Will 
   * initially identify text from an image, then will call
   * translate()
   * @param evt CustomEvent
   */
  public async onChoose(evt:any) {
    this.loading = await this.loadingController.create({
      message: 'Analyzing...'
    });
    this.translatedText = "";
    this.loading.present();
    let file = null;
    if (evt.target.files) {
      file = evt.target.files[0];
    }
    if (!file && evt.dataTransfer.files) { 
      file = evt.dataTransfer.files[0];
    }
    if (!file) { return; }
    const that = this;
    const reader = new FileReader();
    reader.onload = function(e) {
      const target: any = e.target;
      that.photo = target.result;
    };
    reader.readAsDataURL(file);
    // First, identify text
    Predictions.identify({
      text: {
        source: {
          file,
        },
        // Available options "PLAIN", "FORM", "TABLE", "ALL"
        format: "PLAIN",
      }
    }).then((result:any) => {
      this.identifiedText = result.text.fullText;
      // then translate the text
      this.translate(this.identifiedText);
    })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
        this.loading.dismiss();
      })
  }
  
  /**
   * Translate the text returned from Predictions.identify
   * @param textToTranslate String
   */
  private translate(textToTranslate:string): void {
    this.loading.message = "Translating..."
    Predictions.convert({
      translateText: {
        source: {
          text: textToTranslate,
          // defaults configured on aws-exports.js
          // update-able via the settings ui
          language : this.sourceLang
          // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
        },
        targetLanguage: this.targetLang
      }
    }).then(result => {
      // console.log(JSON.stringify(result, null, 2));
      this.translatedText = result.text;
      this.loading.dismiss();
    }).catch(err => {
      // console.log(JSON.stringify(err, null, 2));
      this.loading.dismiss();
    })
  }

  copyText(textArea:any) {
    textArea.select();
    document.execCommand('copy');
  }

}
