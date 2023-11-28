import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlunoAddEditComponent } from './aluno-add-edit/aluno-add-edit.component';
import { AlunoService } from './services/aluno.service';
import {OnInit} from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-app';
  displayedColumns: string[] = ['id', 'Num', 'Nome', 'Email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _alunoService: AlunoService){

  }

  ngOnInit(): void {
    this.getAlunoList();
  }

  openAddEditAlunoForm(){
    const dialogRef = this._dialog.open(AlunoAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getAlunoList();
        }
      }
    })
  }

  getAlunoList(){
    this._alunoService.getalunoList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteAluno(id: number){
    this._alunoService.deletealuno(id).subscribe({
      next: (res) =>{
        alert('Aluno Deletado com Sucesso!');
        this.getAlunoList();
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }

  openEditForm(data: any){
    const dialogRef = this._dialog.open(AlunoAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.getAlunoList();
        }
      }
    });
  }
}
