import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const routes = {
  all: () => '/mails',
};

@Injectable({
  providedIn: 'root',
})
export class InboxService {
  constructor(private httpClient: HttpClient) {}

  getAllMails(): Observable<any> {
    return this.httpClient.get(routes.all()).pipe(map((body: any) => body));
  }
}
