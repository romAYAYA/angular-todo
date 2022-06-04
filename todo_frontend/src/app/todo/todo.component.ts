import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Todo } from './Todo';

@Component({
  selector: 'app-todo',
  styleUrls: ['./todo.component.scss'],
  templateUrl: './todo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit{
  todos!: Todo[] ;
  showValidationErrors: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.todos = [ { text: 'saklasfaks', completed: true } ]
  }

  // onFormSubmit(form: NgForm): void {
  //   if(form.invalid) {
  //     return this.showValidationErrors = true
  //   }
  //   this.dataService.addTodo(new Todo(form.value.text))
  //   this.showValidationErrors = false
  //   form.reset();
  // }

  toggleCompleted(todo: Todo): void {
    todo.completed = !todo.completed
  }


  // deleteTodo(todo: Todo) {
  //   const index = this.todos.indexOf(todo)
  //   this.dataService.deleteTodo(index)
  // }
}
