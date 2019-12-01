import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  /**
   * Log a service call result
   * @param service String - service name i.e. Identify, Translate etc.
   * @param object Object - payload to print out
   */
  public log(service:string,object:any): void {
    console.log();
    console.info(`+++ Begin: ${service} +++`);
    console.log(JSON.stringify(object, null, 2));
    console.info(`--- End: ${service} ---`);
    console.log();
  }

  public error(service:string,object:any): void {
    console.log();
    console.error(`+++ Begin: ${service} +++`);
    console.log(JSON.stringify(object, null, 2));
    console.error(`--- End: ${service} ---`);
    console.log();
  }
}
