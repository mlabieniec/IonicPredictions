import { Component } from '@angular/core';
import Predictions from '@aws-amplify/predictions';
import { LoadingController } from '@ionic/angular';
import { Hub } from '@aws-amplify/core';
import awsconfig from 'src/aws-exports';
import { LoggerService } from '../logger.service';

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
  public entities: Array<Any>;
  public drawComplete:boolean;
  public sourceLang = awsconfig.predictions.convert.translateText.defaults.sourceLanguage;
  public targetLang = awsconfig.predictions.convert.translateText.defaults.targetLanguage;
  

  constructor( 
    public loadingController: LoadingController,
    private logger: LoggerService ) { 
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
    const context = this, reader = new FileReader();
    reader.onload = function(e) {
      const target: any = e.target;
      context.photo = target.result;
    };
    reader.readAsDataURL(file);
    // First, identify the text in the image
    Predictions.identify({
      text: {
        source: {
          file,
        },
        // Available options "PLAIN", "FORM", "TABLE", "ALL"
        format: "PLAIN",
      }
    }).then((result:any) => {
      this.logger.log('Predictions.identify',result);
      this.identifiedText = result.text.fullText;
      // Draw the bounding boxes
      this.entities = result.text.words;
      this.entities.forEach((entity) => {
        entity.color = "#"+Math.floor(Math.random()*16777215).toString(16)
        this.translate(entity);
      });
      this.loading.dismiss();
      setTimeout(()=> {
        this.drawBoundingBoxes(this.entities);
      });
    })
      .catch(err => {
        this.logger.log('Predictions.identify -> Error', err);
        this.loading.dismiss();
      })
  }
  
  /**
   * Translate the text returned from Predictions.identify
   * @param entity Object
   */
  private translate(entity:any): void {
    this.loading.message = "Translating..."
    Predictions.convert({
      translateText: {
        source: {
          text: entity.text,
          // defaults configured on aws-exports.js
          // update-able via the settings ui
          language : this.sourceLang
          // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
        },
        targetLanguage: this.targetLang
      }
    }).then(result => {
      this.logger.log('Predictions.convert', result);
      this.translatedText = result.text;
      entity.translatedText = this.translatedText;
      this.loading.dismiss();
    }).catch(err => {
      this.logger.error('Predictions.convert', err);
      this.loading.dismiss();
    })
  }

  generateTextToSpeech(text:string) {
    Predictions.convert({
      textToSpeech: {
        source: {
          text: text,
        },
        voiceId: "Amy" // default configured on aws-exports.js 
        // list of different options are here https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
      }
    }).then(result => {
      let AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
      // console.log({ AudioContext });
      const audioCtx = new AudioContext(); 
      const source = audioCtx.createBufferSource();
      audioCtx.decodeAudioData(result.audioStream, (buffer) => {
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
      }, (err) => this.logger.error('audioCtx.decodeAudioData',err));
    }).catch(err => this.logger.error('Predictions.convert', err));
  }

  /**
   * Draw bounding boxes around the entities that are found
   * using the boundingBox values returned from the service
   * @param entities Array<Any>
   */
  private drawBoundingBoxes(entities:any) {
    this.drawComplete = false;
    let canvas = document.getElementById('imgTranslateCanvas') as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    let img = document.getElementById("imgTranslate") as HTMLImageElement;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0,img.width,img.height);  
    let context = canvas.getContext('2d');
    entities.forEach(entity => {
      setTimeout(()=>{
        try {
          let bb = entity.boundingBox,
              width = bb.width * img.width, 
              height = bb.height * img.height,
              x = bb.left * img.width,
              y = bb.top * img.height
          context.beginPath();
          context.rect(x, y, width, height);
          context.lineWidth = 10;
          context.strokeStyle = entity.color;
          context.stroke();
        } catch(error) {
          this.logger.log('context.stroke', error);
        }
      });
    });
    img.hidden = true;
    this.drawComplete = true;
    canvas.setAttribute('style','width: 100%;');
  }

  copyText(textArea:any) {
    textArea.select();
    document.execCommand('copy');
  }

}
