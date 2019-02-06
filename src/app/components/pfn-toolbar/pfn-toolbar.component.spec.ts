import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PfnToolbarComponent } from './pfn-toolbar.component';

describe('PfnToolbarComponent', () => {
  let component: PfnToolbarComponent;
  let fixture: ComponentFixture<PfnToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PfnToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PfnToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
