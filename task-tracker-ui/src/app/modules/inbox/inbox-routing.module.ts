import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from './pages/home/home.component';
import { InboxComponent } from './inbox.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  Shell.childRoutes([
    {
      path: 'inbox',
      component: InboxComponent,
      children: [{ path: '', component: HomeComponent, data: { title: 'Inbox' } }],
    },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class InboxRoutingModule {}
