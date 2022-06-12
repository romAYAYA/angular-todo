import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit{
  todos$!: Observable<Todo[]>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$
  }

  deleteTodo(todoId: number): void {
    this.todoService.remove(todoId);
  }
}
