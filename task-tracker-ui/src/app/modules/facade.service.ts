import { Injectable, Injector } from '@angular/core';
import { InboxService } from './inbox/inbox.service';
import { ITask } from './task/pages/detail/detail.interface';
import { TaskService } from './task/task.service';

@Injectable({
  providedIn: 'root',
})
export class FacadeService {
  private _taskService!: TaskService;

  public get taskService(): TaskService {
    if (!this._taskService) {
      this._taskService = this.injector.get(TaskService);
    }
    return this._taskService;
  }

  private _inboxService!: InboxService;

  public get inboxService(): InboxService {
    if (!this._inboxService) {
      this._inboxService = this.injector.get(InboxService);
    }
    return this._inboxService;
  }

  constructor(private injector: Injector) {}

  // TASK SERVICE
  getTask(id: string) {
    return this.taskService.getTask(id);
  }

  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  addTask(data: ITask) {
    return this.taskService.addTask(data);
  }

  updateTask(data: ITask) {
    return this.taskService.updateTask(data);
  }

  // INBOX SERVICE
  getAllMails() {
    return this.inboxService.getAllMails();
  }
}
