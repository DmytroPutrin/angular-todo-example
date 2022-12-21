import { Observable } from 'rxjs';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAll().subscribe();
    this.todos$ = this.todoService.todos$;
  }

  completeTodo(date: string | undefined, todo: Todo): void {
    this.todoService.edit({ ...todo, done: date }).subscribe(console.log);
  }

}
