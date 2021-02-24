import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Logger } from '@app/@core';
import { TaskService } from '../../task.service';
import { finalize } from 'rxjs/operators';
import { ITask } from '../detail/detail.interface';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DialogData, DialogService } from '@app/@shared';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskSubscribeService } from '../../task-subscribe.service';
import { FacadeService } from '@app/modules/facade.service';

const log = new Logger('TaskHomeComponent');

@Component({
  selector: 'app-task-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  tasks!: ITask[];
  isLoading = false;
  errorMsg!: string;
  showError = false;
  private _subscription!: Subscription;
  private _submitDataSubscription: Subscription;

  constructor(
    private _facadeService: FacadeService,
    private _router: Router,
    private _dialogService: DialogService,
    private _taskSubscribeService: TaskSubscribeService,
    private _snackBar: MatSnackBar
  ) {
    this._submitDataSubscription = this._taskSubscribeService.subscribeDataFetch().subscribe((message) => {
      this.isLoading = true;
      this.getAllTasks();
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.getAllTasks();
  }

  getAllTasks() {
    this._subscription = this._facadeService
      .getAllTasks()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.showError = false;
          this.tasks = data;
          log.info(data);
        },
        (err) => {
          this.showError = true;
          this.errorMsg = 'Error with in fetching data from API, please try later';
          log.error('Error: ' + err.message);
        }
      );
  }

  openDetailPage(item: ITask) {
    this._router.navigate(['task/detail', item.id]);
  }

  openDialog() {
    const data: DialogData = {
      component: AddTaskComponent,
      displayConfig: {
        title: 'Add Task',
        secondaryHeader: '',
        instructionalText: '',
        buttons: {
          secondary: {
            label: 'Cancel',
          },
          primary: {
            label: 'Add Task',
          },
        },
      },
      isFullScreen: true,
    };
    this._dialogService.open(data, true);
  }

  markAsDone(data: ITask) {
    // data.status = 'Completed';
    // data.dueDate = new Date().toString();
    this.isLoading = true;
    this._subscription = this._facadeService
      .updateTask(data)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.showError = false;
          this.getAllTasks();
          this.openSnackBar('Data updated successfully', 'Close');
          log.info(data);
        },
        (err) => {
          log.error('Error: ' + err.message);
        }
      );
  }

  checkTaskValidity(task: ITask): boolean {
    const { dueDate, status } = task;
    const todayDate = new Date();
    const modifiedDueDate = new Date(dueDate);
    todayDate.setHours(0, 0, 0, 0);
    modifiedDueDate.setHours(0, 0, 0, 0);

    if (dueDate === null) return true;
    if (todayDate.getTime() > modifiedDueDate.getTime() || status === 'Completed') return false;

    return true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._submitDataSubscription.unsubscribe();
  }
}
