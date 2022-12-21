import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoComponent } from 'src/app/todos/todo/todo.component';
import { TodoListComponent } from 'src/app/todos/todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodosFilterPipe } from '../pipes/todos-filter.pipe';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoFormComponent,
    TodosFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  exports: [
    TodoComponent,
    TodoListComponent
  ]
})
export class TodosModule { }
