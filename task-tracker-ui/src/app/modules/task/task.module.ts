import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { RoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { AddTaskFormService } from './pages/add-task/add-task-form.service';
import { TaskSubscribeService } from './task-subscribe.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    RoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddTaskComponent, TaskComponent, HomeComponent, DetailComponent],
  providers: [AddTaskFormService, TaskSubscribeService],
  entryComponents: [AddTaskComponent],
})
export class TaskModule {}
