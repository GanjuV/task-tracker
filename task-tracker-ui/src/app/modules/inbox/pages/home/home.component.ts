import { Component, OnInit, OnDestroy } from '@angular/core';
import { Logger } from '@app/@core';

const log = new Logger('InboxHomeComponent');

@Component({
  selector: 'app-planet-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
