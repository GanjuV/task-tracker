import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '@app/@core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TaskService } from '../../task.service';
import { ITask } from './detail.interface';

const log = new Logger('TaskDetailComponent');

@Component({
  selector: 'app-film-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  id!: string;
  isLoading = false;
  task!: ITask;
  errorMsg!: string;
  showError = false;
  private _subscription!: Subscription;
  private _routeParamsSubscription: any;
  constructor(private _TaskService: TaskService, private _route: ActivatedRoute) {}

  ngOnInit() {
    this._getRouteId();
    this.getTaskData();
  }

  getTaskData() {
    this.isLoading = true;
    this._subscription = this._TaskService
      .getTask(this.id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data) => {
          this.showError = false;
          this.task = data;
          log.info(data);
        },
        (err) => {
          this.showError = true;
          this.errorMsg = 'Error with in fetching data from API, please try later';
          log.error('Error: ' + err.message);
        }
      );
  }

  private _getRouteId() {
    this._routeParamsSubscription = this._route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnDestroy() {
    this._routeParamsSubscription.unsubscribe();
    this._subscription.unsubscribe();
  }
}
