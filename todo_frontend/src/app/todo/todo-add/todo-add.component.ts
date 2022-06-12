import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: 'todo-add.component.html',
  styleUrls: ['todo-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TodoAddComponent implements OnInit{
  todos$!: Observable<Todo[]>;
  todoForm: FormGroup;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder
  ) {
    this.todoForm = this.formBuilder.group({
      id: [''],
      value: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

  onSubmit(): void {
    this.todoService.create(this.todoForm.value);
    this.todoForm.reset();
  }
}
