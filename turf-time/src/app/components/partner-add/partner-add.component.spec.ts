import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerAddComponent } from './partner-add.component';

describe('PartnerAddComponent', () => {
  let component: PartnerAddComponent;
  let fixture: ComponentFixture<PartnerAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerAddComponent]
    });
    fixture = TestBed.createComponent(PartnerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
