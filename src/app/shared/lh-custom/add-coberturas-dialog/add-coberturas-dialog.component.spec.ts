import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoberturasDialogComponent } from './add-coberturas-dialog.component';

describe('AddCoberturasDialogComponent', () => {
  let component: AddCoberturasDialogComponent;
  let fixture: ComponentFixture<AddCoberturasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoberturasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoberturasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
