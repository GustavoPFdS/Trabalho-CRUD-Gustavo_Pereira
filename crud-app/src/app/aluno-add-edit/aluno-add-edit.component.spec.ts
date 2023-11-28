import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoAddEditComponent } from './aluno-add-edit.component';

describe('AlunoAddEditComponent', () => {
  let component: AlunoAddEditComponent;
  let fixture: ComponentFixture<AlunoAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlunoAddEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlunoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
