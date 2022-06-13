import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  todos$: Observable<ITodo[]> = this.todoService.todos$;

  constructor(private todoService: TodoService) {}

   deleteTodo(todoId: string): void {
     this.todoService.remove(todoId).subscribe();
   }
}
