import { Injectable } from '@angular/core';
import { ITodo, ITodoRequest } from './todo.model';
import { BehaviorSubject, concatMap, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface ITodoStorageItem {
  id: string,
  text: string,
  isDone: boolean,
  createdOn: string
}


@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  readonly todos$: Observable<ITodo[]> = this._todos$.asObservable();
  constructor(private _httpClient: HttpClient) {}


  // create(todoText: string): void {
  //   const arrayTodo = this._todos$.getValue();
  //   const objIds = arrayTodo.map((obj) => obj.id);
  //   let todoId;
  //   if(objIds.length === 0){
  //      todoId = 1;
  //   }else {
  //     todoId = Math.max(...objIds) + 1;
  //   }
  //   const newTodo: ITodo = {
  //     id: todoId.toString(),
  //     text: todoText,
  //     isDone: false,
  //   }
  //
  //   this._todos$.next([...this._todos$.getValue(), newTodo]);
  // }

  create2(todo: ITodoRequest): Observable<void> {
   return this._httpClient.post<ITodoStorageItem>('http://localhost:3000/add', todo).pipe(
     concatMap(() => this.uploadAllTodos()),
   );
  }

  uploadAllTodos(): Observable<void>{
   return this._httpClient.get<ITodoStorageItem[]>('http://localhost:3000/todos').pipe(
      tap((todos) => this._todos$.next(todos)),
      map(() => void 0)
    )
  }

   remove(id: string): Observable<void> {
      // const newArray = this._todos$.getValue().filter(item => item.id !== id);
      // this._todos$.next(newArray);
     return this._httpClient.delete(`http://localhost:3000/delete/${id}`).pipe(
       concatMap(() => this.uploadAllTodos()),
       // switchMap(() => this._httpClient.get<ITodoStorageItem>('http://localhost:3000/todos')),
       // tap((todos) => this._todos$.next([...this._todos$.getValue(), todos])),
     )
   }

  // update(todo: Todo): void {
  //
  // }


}
