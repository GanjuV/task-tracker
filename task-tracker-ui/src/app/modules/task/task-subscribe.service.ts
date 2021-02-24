import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class TaskSubscribeService {
  private subject = new Subject<any>();

  constructor() {}

  dataFetch() {
    this.subject.next();
  }

  subscribeDataFetch(): Observable<any> {
    return this.subject.asObservable();
  }
}
