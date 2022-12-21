import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types/todo';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {
  transform(todos: Todo[], search: string): Todo[] {
    if (!todos) {
      return [];
    }
    if (!search) {
      return todos;
    }
    
    search = search.toLocaleLowerCase();

    return todos.filter((todo) => {
      return todo.label.toLocaleLowerCase().includes(search) || todo.description.toLocaleLowerCase().includes(search);
    });
  }

}
