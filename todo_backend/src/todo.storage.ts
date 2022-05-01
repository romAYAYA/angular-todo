import { Injectable } from '@nestjs/common';
import { randomString } from './utils/random-string';

export interface ITodoStorageItem {
  id: string;
  text: string;
  isDone: boolean;
  createdOn: string;
}

export interface IAddTodo {
  text: string;
  isDone: boolean;
}

@Injectable()
export class TodoStorage {
  private _store: ITodoStorageItem[] = [];

  public getTodos(): ITodoStorageItem[] {
    return this._store;
  }

  public addTodo(todo: IAddTodo): ITodoStorageItem {
    const itemToAdd: ITodoStorageItem = {
      id: randomString(),
      text: todo.text,
      isDone: todo.isDone,
      createdOn: new Date().toISOString()
    };
    this._store.push(itemToAdd);
    return itemToAdd;
  }

  public deleteTodo(id: ITodoStorageItem['id']): void {
    this._store = this._store.filter(x => x.id !== id);
  }
}
