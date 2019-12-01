import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import Predictions from '@aws-amplify/predictions';

/**
 * Amplify Predicitons - Identify Labels
 * Identify real world objects in an image. 
 */
@Component({
  selector: 'app-label-tab',
  templateUrl: './label.page.html',
  styleUrls: ['./label.page.scss'],
})
export class LabelPage {

  public photo:string;
  public loading:any;
  public entities:Array<any>;

  constructor( public loadingController: LoadingController ) { }

  /**
   * Fired when an image is uploaded or a photo is taken
   * via a mobile device camera
   * @param evt CustomEvent
   */
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
        // "LABELS" will detect objects , "UNSAFE" will detect if content is not safe, "ALL" will do both default on aws-exports.js
        type: "ALL"
      }
    }).then(result => {
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

  /**
   * Draw bounding boxes around the found entities, color
   * coding them per found entity based on the past in color
   * @param entities Array<Any>
   * @param color String
   */
  private drawBoundingBoxes(entities:any, color:string): void {
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
        context.lineWidth = 10;
        context.strokeStyle = color;
        context.stroke();
      });
    });
    canvas.setAttribute('style','width: 100%;');
  }
}
