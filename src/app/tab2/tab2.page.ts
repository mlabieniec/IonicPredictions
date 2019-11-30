import { Component } from '@angular/core';
import awsconfig from 'src/aws-exports';
import { Hub } from '@aws-amplify/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  defaultSource = awsconfig.predictions.convert.translateText.defaults.sourceLanguage;
  defaultTarget = awsconfig.predictions.convert.translateText.defaults.targetLanguage;
  
  celebDetect = awsconfig.predictions.identify.identifyEntities.celebrityDetectionEnabled as boolean;

  constructor() {
    Hub.listen('settings', (data) => {
      const { payload } = data;
      this.celebDetect = payload.data;
    });
  }

  selectSource(evt) {
    //console.log(evt.target.value);
    Hub.dispatch(
      'settings', 
      { 
          event: 'source', 
          data: evt.target.value
    });
  }

  selectTarget(evt) {
    //console.log(evt.target.value);
    Hub.dispatch(
      'settings', 
      { 
          event: 'target', 
          data: evt.target.value
    });
  }

  toggleCelebDetect(evt) {
    // console.log('celebrityDetectionEnabled: ', evt.detail.checked);
    Hub.dispatch(
      'settings',
      {
        event: 'celebrityDetectionEnabled',
        data: evt.detail.checked
      }
    )
  }

}
