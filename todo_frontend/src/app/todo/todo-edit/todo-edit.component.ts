import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITodo } from '../todo.model';


@Component({
  selector: 'app-edit-todo',
  templateUrl: 'todo-edit.component.html',
  styleUrls: ['todo-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoEditComponent {
  @Input() todo: ITodo | undefined

  update(): void {

  }
}
