import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlunoService } from '../services/aluno.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {OnInit} from '@angular/core';


@Component({
  selector: 'app-aluno-add-edit',
  templateUrl: './aluno-add-edit.component.html',
  styleUrl: './aluno-add-edit.component.scss'
})
export class AlunoAddEditComponent  implements OnInit {
  alunoform: FormGroup;

  constructor(
    private _fb: FormBuilder, 
    private _alunoService: AlunoService, 
    private _dialogRef: MatDialogRef<AlunoAddEditComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.alunoform = this._fb.group({
      Num: '',
      Nome: '',
      Email: '',
    })
  }

  ngOnInit(): void{
    this.alunoform.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.alunoform.valid){
      if(this.data) {
        this._alunoService.updatealuno(this.data.id, this.alunoform.value).subscribe({
          next: (val: any) => {
            alert('Aluno alterado com sucesso!');
            this._dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          }
        });       
      } else {
      this._alunoService.addaluno(this.alunoform.value).subscribe({
        next: (val: any) => {
          alert('Aluno adicionado com sucesso!');
          this._dialogRef.close(true);
        },
        error: (err: any) =>{
          console.error(err);
        }
      });
      }
    }
  }
}
