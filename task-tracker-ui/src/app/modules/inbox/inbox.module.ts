import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { CoreModule } from '@app/@core';
import { SharedModule } from '@app/@shared';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [CommonModule, CoreModule, SharedModule, FlexLayoutModule, MaterialModule, InboxRoutingModule],
  declarations: [InboxComponent, HomeComponent],
})
export class InboxModule {}
