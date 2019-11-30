import { Component } from '@angular/core';
import Predictions from '@aws-amplify/predictions';
import { LoadingController } from '@ionic/angular';
import { Hub } from '@aws-amplify/core';
import awsconfig from 'src/aws-exports';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public photo:string;
  public loading:any;
  public entities:Array<any>;
  public celebDetect = awsconfig.predictions.identify.identifyEntities.celebrityDetectionEnabled;

  constructor(public loadingController: LoadingController) {
    Hub.listen('settings', (data) => {
      const { payload } = data;
      this.celebDetect = payload.data;
    });
  }

  public async onChoose(evt:any) {
    this.loading = await this.loadingController.create({
      message: 'Identifying...'
    });
    this.loading.present();
    let file = null;
    if (evt.target.files) {
      file = evt.target.files[0];
    }
    if (!file && evt.dataTranfer.files) {
      file = evt.dataTranfer.files[0];
    }
    if (!file) return;
    const context = this, reader = new FileReader();
    reader.onload = function(e) {
      const target: any = e.target;
      context.photo = target.result;
    };
    reader.readAsDataURL(file);
    Predictions.identify({
      entities: {
        source: {
          file
        },
        celebrityDetection: this.celebDetect
      }
    }).then(result => {
      console.log('result: ', result);
      this.entities = result.entities;
      this.entities.forEach((entity) => entity.color = "#"+Math.floor(Math.random()*16777215).toString(16))
      setTimeout(()=> {
        this.drawBoundingBoxes(this.entities);
      });
      this.loading.dismiss();
    }).catch(err => {
      console.log(JSON.stringify(err, null, 2));
      this.loading.dismiss();
    })
  }

  drawBoundingBoxes(entities:any) {
    let canvas = document.getElementById('imgEntitiesCanvas') as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    let img = document.getElementById("imgEntities") as HTMLImageElement;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0,img.width,img.height);  
    img.hidden = true;
    let context = canvas.getContext('2d');
    entities.forEach(entity => {
      setTimeout(()=>{
        let bb = entity.boundingBox,
            width = bb.width * img.width, 
            height = bb.height * img.height,
            x = bb.left * img.width,
            y = bb.top * img.height
        context.beginPath();
        context.rect(x, y, width, height);
        context.lineWidth = 5;
        context.strokeStyle = entity.color;
        context.stroke();
      });
    });
    canvas.setAttribute('style','width: 100%;');
  }

  toggleCelebDetect() {
    this.celebDetect = !this.celebDetect;
    Hub.dispatch(
      'settings',
      {
        event: 'celebrityDetectionEnabled',
        data: this.celebDetect
      }
    )
  }

}
