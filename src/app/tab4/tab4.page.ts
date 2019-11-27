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
      console.log('result: ', result);
      this.entities = result.labels;
      this.loading.dismiss();
    }).catch(err => {
      console.log(JSON.stringify(err, null, 2));
      this.loading.dismiss();
    })
  }
}
