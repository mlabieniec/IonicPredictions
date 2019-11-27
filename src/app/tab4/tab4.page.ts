import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import Predictions from '@aws-amplify/predictions';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  public photo:string;
  public loading:any;
  public entities = [];

  constructor(public loadingController: LoadingController) { }

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
      labels: {
        source: {
          file,
        },
        type: "ALL" // "LABELS" will detect objects , "UNSAFE" will detect if content is not safe, "ALL" will do both default on aws-exports.js
      }
    }).then(result => {
      //console.log('result: ', result);
      this.entities = result.labels;
      this.entities.forEach((entity) => {
        if (entity.boundingBoxes.length > 0) {
          let color = "#"+Math.floor(Math.random()*16777215).toString(16);
          entity.color = color;
          setTimeout(()=> {
            this.drawBoundingBoxes(entity.boundingBoxes, color);
          });
        }
      });
      this.loading.dismiss();
    }).catch(err => {
      console.log(JSON.stringify(err, null, 2));
      this.loading.dismiss();
    })
  }

  drawBoundingBoxes(entities:any, color:string) {
    let canvas = document.getElementById('imgLabelsCanvas') as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    let img = document.getElementById("imgLabels") as HTMLImageElement;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img,0,0,img.width,img.height);  
    img.hidden = true;
    let context = canvas.getContext('2d');
    entities.forEach(bb => {
      setTimeout(() => {
        let width = bb.width * img.width, 
            height = bb.height * img.height,
            x = bb.left * img.width,
            y = bb.top * img.height
        context.beginPath();
        context.rect(x, y, width, height);
        context.lineWidth = 5;
        context.strokeStyle = color;
        context.stroke();
      });
    });
    canvas.setAttribute('style','width: 100%;');
  }
}
