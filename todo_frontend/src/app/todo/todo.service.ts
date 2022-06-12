import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todo$ = new BehaviorSubject<Todo[]>([]);
  readonly todos$ = this._todo$.asObservable();

  public todos: Todo[] = [];
  public nextId: number = 1;

  constructor() {}

  // load() {
  //   //Load from Database
  // }

  create(item: Todo): void {
    item.id = this.nextId++;
    this.todos.push(item);
    this._todo$.next(Object.assign([], this.todos));
  }

  remove(id: number): void {
    this.todos.forEach((t, i) => {
      if (t.id === id) {
        this.todos.splice(i, 1);
      }
      this._todo$.next(Object.assign([], this.todos));
    });
  }


}
