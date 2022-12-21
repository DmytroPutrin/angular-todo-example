import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoComponent } from 'src/app/todos/todo/todo.component';
import { TodoListComponent } from 'src/app/todos/todo-list/todo-list.component';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  exports: [
    TodoComponent,
    TodoListComponent
  ]
})
export class TodosModule { }
