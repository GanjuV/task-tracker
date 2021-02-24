import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'task', loadChildren: () => import('./modules/task/task.module').then((m) => m.TaskModule) },
  { path: 'inbox', loadChildren: () => import('./modules/inbox/inbox.module').then((m) => m.InboxModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
