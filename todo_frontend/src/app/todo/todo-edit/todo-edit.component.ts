import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../todo.model';


@Component({
  selector: 'app-edit-todo',
  templateUrl: 'todo-edit.component.html',
  styleUrls: ['todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEditComponent {
  @Input() todo: ITodo | null = null;
  @Output() updatedTodo: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  update(todo:ITodo): void {
    this.updatedTodo.emit(todo);
  }
}
