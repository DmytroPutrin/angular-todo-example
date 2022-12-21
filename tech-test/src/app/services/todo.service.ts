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
    return this.http.post<Todo>(this.api, todo);
  }

  edit(todo: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.api}/${todo.id}`, todo);
  }

  remove(id: number): Observable<{id: number}> {
    return this.http.delete<{id: number}>(`${this.api}/${id}`);
  }
}
