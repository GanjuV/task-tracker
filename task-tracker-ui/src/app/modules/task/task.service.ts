import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITask } from './pages/detail/detail.interface';

const routes = {
  all: () => '/tasks',
  byId: (id: string) => `/task/${id}`,
  addTask: '/task',
  update: (id: string) => `/task/${id}`,
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTask(id: string): Observable<ITask> {
    return this.httpClient.get(routes.byId(id)).pipe(map((body: any) => body));
  }

  getAllTasks(): Observable<any> {
    return this.httpClient.get(routes.all()).pipe(map((body: any) => body));
  }

  addTask(data: ITask): Observable<any> {
    return this.httpClient.post(routes.addTask, data);
  }

  updateTask(data: ITask): Observable<any> {
    return this.httpClient.put(routes.update(data.id), data, { responseType: 'text' });
  }
}
