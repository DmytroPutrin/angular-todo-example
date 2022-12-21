import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Todo } from 'src/app/types/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  @Output() complete: EventEmitter<string | undefined> = new EventEmitter();

  @Output() remove: EventEmitter<number> = new EventEmitter();

  @Output() edit: EventEmitter<Todo> = new EventEmitter();

  completed: boolean;
  
  constructor() { }

  ngOnInit(): void {
    this.completed = !!this.todo.done;
  }

  public toggleStatus(): void {
    this.completed = !this.completed;

    console.log(this.completed);

    const date = this.complete ? new Date().toLocaleDateString() : undefined;

    this.complete.emit(date);
  }

  public editItem(): void {
    this.edit.emit(this.todo);
  }

  public removeItem(): void {
    this.remove.emit(this.todo.id);
  }
}
