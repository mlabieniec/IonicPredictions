import { Component } from '@angular/core';
import awsconfig from 'src/aws-exports';
import { Hub } from '@aws-amplify/core';

/**
 * Amplify Predictions - Settings UI
 * Configure settings for the other tabs. Initial settings are 
 * pulled from the aws-exports.js file, which is automatically
 * generated via the Amplify CLI 
 */
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  // Source language
  public defaultSource = awsconfig.predictions.convert.translateText.defaults.sourceLanguage;
  // Target language
  public defaultTarget = awsconfig.predictions.convert.translateText.defaults.targetLanguage;
  // Enable celebrity detection in identify
  public celebDetect = awsconfig.predictions.identify.identifyEntities.celebrityDetectionEnabled as boolean;

  constructor() {
    // Listen for settings changed from other views
    Hub.listen('settings', (data) => {
      const { payload } = data;
      this.celebDetect = payload.data;
    });
  }

  /**
   * Select the source language to translate from
   * and dispatch a Hub event for other views to handle
   * @param evt CustomEvent
   */
  public selectSource(evt): void {
    this.defaultSource = evt.target.value;
    Hub.dispatch(
      'settings', 
      { 
          event: 'source', 
          data: evt.target.value
    });
  }

  /**
   * Select the target language to translate to and 
   * dispatch Hub event for other views
   * @param evt CustomEvent
   */
  public selectTarget(evt):void {
    this.defaultTarget = evt.target.value;
    Hub.dispatch(
      'settings', 
      { 
          event: 'target', 
          data: evt.target.value
    });
  }

  /**
   * Toggle celebrity detection on/off for identify entities
   * @param evt CustomEvent
   */
  public toggleCelebDetect(evt):void {
    this.celebDetect = evt.detail.checked;
    Hub.dispatch(
      'settings',
      {
        event: 'celebrityDetectionEnabled',
        data: evt.detail.checked
      }
    )
  }

}
