import { TodoCategory } from './../../types/todo';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/app/types/todo';

const CategoryOptions = Object.values(TodoCategory).map((c) => ({ value: c }));

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  form: FormGroup;

  categories = CategoryOptions;

  constructor(
    public dialogRef: MatDialogRef<TodoFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { todo?: Todo }) { }

  ngOnInit(): void {
    this.initForm();
  }

  close(isSave = false) {
    if (isSave) {
      const todo = this.data.todo ? { ...this.data.todo, ...this.form.value } : this.form.value;

      this.dialogRef.close(todo);
    } else {
    this.dialogRef.close();
    }
  }

  initForm(): void {
    const todo = this.data.todo || this.defaultTodo();

    this.form = this.fb.group({
      label: this.fb.control(todo.label, [Validators.required, Validators.min(2)]),
      category: this.fb.control(todo.category),
      description: this.fb.control(todo.description),
    });
  }

  get title(): string {
    return this.data.todo ? 'Edit Todo' : 'Add Todo'
  }

  private defaultTodo(): Partial<Todo> {
    return {
      label: '',
      category: 'other',
      description: '',
    }
  }
}
