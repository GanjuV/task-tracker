import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { InboxComponent } from './inbox.component';
import { InboxService } from './inbox.service';
import { SharedModule } from '@app/@shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InboxComponent', () => {
  let component: InboxComponent;
  let fixture: ComponentFixture<InboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        CoreModule,
        SharedModule,
        HttpClientTestingModule,
      ],
      declarations: [InboxComponent],
      providers: [InboxService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
