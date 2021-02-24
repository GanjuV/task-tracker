import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskComponent } from './task.component';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/task', pathMatch: 'full' },
    {
      path: 'task',
      component: TaskComponent,
      children: [
        { path: '', component: HomeComponent, data: { title: 'Task' } },
        { path: 'detail/:id', component: DetailComponent, data: { title: 'Task Detail' } },
      ],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RoutingModule {}
