import { TodosModule } from './../todos/todos.module';
import { Todo } from './../types/todo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: TodosModule,
})
export class TodoService {
  private api = 'http://localhost:3000/tasks'; 

  public todos$: BehaviorSubject<Todo[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api).pipe(tap((todos) => this.todos$.next(todos)));
  }

  getById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.api}/${id}`);
  }

  add(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(this.api, todo).pipe(tap((todo) => this.todos$.next([...this.todos$.value, todo])));
  }

  edit(todo: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.api}/${todo.id}`, todo).pipe(
      tap((updated) => {
        const todos = this.todos$.value;
        const index = todos.findIndex((t) => t.id === updated.id);

        if (index > -1) {
          todos[index] = updated;
        }

        this.todos$.next(todos);
      })
    );
  }

  remove(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.api}/${id}`).pipe(tap((todo) => this.todos$.next(this.todos$.value.filter(t => t.id !== id))));
  }
}
