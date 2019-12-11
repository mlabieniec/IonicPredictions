import { Injectable } from '@angular/core';
import Recorder from 'src/recorder';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecorderService {

  public rec:any;
  private getBufferSub = new Subject<any>();
  public getBufferListener: Observable<any> = this.getBufferSub.asObservable()
  
  constructor() {}

  init(input,config) {
    this.rec = new Recorder(input, {
        numChannels: 1
    });
  }

  start(): Observable<any> {
    this.rec.record();
    console.log("Recording started");
    return this.getBufferListener;
  }

  stop() {
    this.rec.stop();
    this.rec.getBuffer((b) => {
        this.getBufferSub.next(b);
    });
  }

}
