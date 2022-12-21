import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, from } from 'rxjs';
import { catchError, map, take } from "rxjs/operators";
import { TodoService } from './../../services/todo.service';
import { Todo } from 'src/app/types/todo';
import { TodoFormComponent } from './../todo-form/todo-form.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  searchText = '';

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.todoService.getAll().pipe(
      catchError((e) => {
        this.showToast(e.message);

        return of(e);
      }),
    ).subscribe();
    this.todos$ = this.todoService.todos$.pipe();
  }

  completeTodo(date: string, todo: Todo): void {
    this.todoService.edit({ ...todo, done: date })
    .pipe(
      catchError((e) => {
        this.showToast(e.message);

        return of(e);
      }),
    )  
    .subscribe();
  }

  openTodoForm(todo?: Todo): void {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      data: { todo },
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(todo => {
      if (todo) {
        const action$ = todo.id ? this.todoService.edit(todo) : this.todoService.add(todo);

        action$.pipe(
          take(1),
          catchError((e) => {
            this.showToast(e.message);

            return of(e);
          }),
        ).subscribe();
      }
    });
  }

  removeTodo(id: number): void {
    this.todoService.remove(id).subscribe();
  }

  showToast(msg: string): void {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: "top",
    });
  }
}
