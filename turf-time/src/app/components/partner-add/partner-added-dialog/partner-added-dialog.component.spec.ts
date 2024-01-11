import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAddedDialogComponent } from './partner-added-dialog.component';

describe('PartnerAddedDialogComponent', () => {
  let component: PartnerAddedDialogComponent;
  let fixture: ComponentFixture<PartnerAddedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerAddedDialogComponent]
    });
    fixture = TestBed.createComponent(PartnerAddedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
