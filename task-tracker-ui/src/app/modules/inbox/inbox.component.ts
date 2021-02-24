import { Component, OnDestroy, OnInit } from '@angular/core';
import { Logger } from '@app/@core';
import { FacadeService } from '@app/modules/facade.service';
import { Subscription } from 'rxjs';

const log = new Logger('InboxHomeComponent');

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
})
export class InboxComponent implements OnInit, OnDestroy {
  private _subscriptionInbox!: Subscription;
  private _subscriptionTask!: Subscription;

  constructor(private _facadeService: FacadeService) {}

  ngOnInit() {
    // Testing Facade pattern
    this._subscriptionInbox = this._facadeService.getAllMails().subscribe(
      (data) => {
        log.info(data);
      },
      (err) => {
        log.error('Error: ' + err.message);
      }
    );
    this._subscriptionTask = this._facadeService.getAllTasks().subscribe(
      (data) => {
        log.info(data);
      },
      (err) => {
        log.error('Error: ' + err.message);
      }
    );
  }

  ngOnDestroy() {
    this._subscriptionInbox.unsubscribe();
    this._subscriptionTask.unsubscribe();
  }
}
