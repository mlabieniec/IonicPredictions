import { Component } from '@angular/core';
import Predictions from '@aws-amplify/predictions';
import { LoadingController } from '@ionic/angular';
import { Hub } from '@aws-amplify/core';
import awsconfig from 'src/aws-exports';

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

  constructor(public loadingController: LoadingController) { 
    Hub.listen('settings', (data) => {
      const { payload } = data;
      console.log(payload);
      if (payload.event === 'source')
        this.sourceLang = payload.data;
      
      if (payload.event === 'target')
        this.targetLang = payload.data;
    });
  }

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
    //console.log('file: ', file);
    const that = this;
    const reader = new FileReader();
    reader.onload = function(e) {
      const target: any = e.target;
      that.photo = target.result;
    };
    reader.readAsDataURL(file);
    Predictions.identify({
      text: {
        source: {
          file,
        },
        format: "PLAIN", // Available options "PLAIN", "FORM", "TABLE", "ALL"
      }
    }).then((result:any) => {
      //console.log('result: ', result);
      this.identifiedText = result.text.fullText;
      this.translate(this.identifiedText);
    })
      .catch(err => {
        console.log(JSON.stringify(err, null, 2));
        this.loading.dismiss();
      })
  }

  translate(textToTranslate:string) {
    this.loading.message = "Translating..."
    Predictions.convert({
      translateText: {
        source: {
          text: textToTranslate,
          language : this.sourceLang // defaults configured on aws-exports.js
          // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
        },
        targetLanguage: this.targetLang
      }
    }).then(result => {
      console.log(JSON.stringify(result, null, 2));
      this.translatedText = result.text;
      this.loading.dismiss();
    }).catch(err => {
      console.log(JSON.stringify(err, null, 2));
      this.loading.dismiss();
    })
  }

  copyText(textArea:any) {
    textArea.select();
    document.execCommand('copy');
  }

}
