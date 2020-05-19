import { Component } from '@angular/core';
import awsconfig from 'src/aws-exports';
import { Hub } from '@aws-amplify/core';
import { DataStore } from "@aws-amplify/datastore";
import { Setting } from "src/models";
import { DataService, Language } from '../data.service';
/**
 * Amplify Predictions - Settings UI
 * Configure settings for the other tabs. Initial settings are 
 * pulled from the aws-exports.js file, which is automatically
 * generated via the Amplify CLI 
 */
@Component({
  selector: 'app-settings-tab',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  // Source language
  public defaultSource = awsconfig.predictions.convert.translateText.defaults.sourceLanguage;
  // Target language
  public defaultTarget = awsconfig.predictions.convert.translateText.defaults.targetLanguage;
  // Enable celebrity detection in identify
  public celebDetect = awsconfig.predictions.identify.identifyEntities.celebrityDetectionEnabled as boolean;
  // Supported translate languages
  public langs: Array<Language>;

  constructor(private data: DataService) {
    // supported translate languages
    this.langs = this.data.langs;
    // Listen for settings changed from other views
    Hub.listen('settings', (data) => {
      const { payload } = data;
      this.celebDetect = payload.data;
    });
    this.getSettings('celebDetect')
      .then((setting: Setting) => {
        if (setting) this.celebDetect = (setting.value) ? true : false;
      });
    this.getSettings('translateSource')
      .then((setting: Setting) => {
        if (setting) {
          this.defaultSource = setting.value;
          Hub.dispatch(
            'settings',
            {
              event: 'source',
              data: setting.value
            });
        }
      });
    this.getSettings('translateTarget')
      .then((setting: Setting) => {
        if (setting) {
          this.defaultTarget = setting.value;
          Hub.dispatch(
            'settings',
            {
              event: 'target',
              data: setting.value
            });
        }
      });
  }

  /**
   * Load a setting from local DataStore
   * @param name name of the setting to load from the datastore
   */
  private async getSettings(name: string): Promise<Setting> {
    const setting = await DataStore.query(Setting, c => c.name('eq', name));
    return (setting) ? setting[0] : null;
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
    this.getSettings('translateSource')
      .then((setting: Setting) => {
        if (setting) {
          this.save(setting.name, evt.target.value, setting.id);
        } else {
          this.save('translateSource', evt.target.value);
        }
      });
  }

  /**
   * Select the target language to translate to and 
   * dispatch Hub event for other views
   * @param evt CustomEvent
   */
  public selectTarget(evt): void {
    this.defaultTarget = evt.target.value;
    Hub.dispatch(
      'settings',
      {
        event: 'target',
        data: evt.target.value
      });
    this.getSettings('translateTarget')
      .then((setting: Setting) => {
        if (setting) {
          this.save(setting.name, evt.target.value, setting.id);
        } else {
          this.save('translateTarget', evt.target.value);
        }
      });
  }

  /**
   * Toggle celebrity detection on/off for identify entities
   * @param evt CustomEvent
   */
  public toggleCelebDetect(evt): void {
    this.celebDetect = evt.detail.checked;
    Hub.dispatch(
      'settings',
      {
        event: 'celebrityDetectionEnabled',
        data: evt.detail.checked
      }
    );
    this.getSettings('celebDetect')
      .then((setting: Setting) => {
        if (setting) {
          this.save(setting.name, evt.detail.checked, setting.id);
        } else {
          this.save('celebDetect', evt.detail.checked);
        }
      });
  }

  /**
   * Save a setting to the local datastore
   * @param name Setting name
   * @param value Setting value
   */
  private async save(name: string, value: string, id?: string) {
    if (id) {
      console.log('updating existing setting');
      const setting: Setting = await DataStore.query(Setting, id);
      await DataStore.save(Setting.copyOf(setting, updated => {
        updated.value = value;
        updated.name = setting.name;
      })
      );
    } else {
      console.log('saving new setting');
      await DataStore.save(new Setting({
        'name': name,
        'value': value
      }));
    }
  }

}
