import { Injectable } from '@angular/core';

export interface Language {
  name: string,
  value: string
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public langs: Array<Language> = [
    { name: 'Arabic', value: 'ar' },
    { name: 'Chinese (Simplified)', value: 'zh' },
    { name: 'Chinese (Traditional)', value: 'zh-TW' },
    { name: 'Czech', value: 'cs' },
    { name: 'Danish', value: 'da' },
    { name: 'Dutch', value: 'nl' },
    { name: 'English', value: 'en' },
    { name: 'Finnish', value: 'fi' },
    { name: 'French', value: 'fr' },
    { name: 'German', value: 'de' },
    { name: 'Hebrew', value: 'he' },
    { name: 'Hindi', value: 'hi' },
    { name: 'Indonesian', value: 'id' },
    { name: 'Italian', value: 'it' },
    { name: 'Japanese', value: 'ja' },
    { name: 'Korean', value: 'ko' },
    { name: 'Malay', value: 'ms' },
    { name: 'Norweigen', value: 'no' },
    { name: 'Persian', value: 'fa' },
    { name: 'Polish', value: 'pl' },
    { name: 'Portuguese', value: 'pt' },
    { name: 'Russian', value: 'ru' },
    { name: 'Spanish', value: 'es' },
    { name: 'Swedish', value: 'sv' },
    { name: 'Turkish', value: 'tr' }
  ];

  constructor() { }
}
