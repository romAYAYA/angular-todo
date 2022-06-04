import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Input() todo!: Todo
  @Output() todoClicked: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editClicked: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteClicked: EventEmitter<Todo> = new EventEmitter<Todo>();

  onTodoClicked(): void {

  }

  onEditClicked(): void {

  }

  onDeleteClicked(): void {

  }
}
