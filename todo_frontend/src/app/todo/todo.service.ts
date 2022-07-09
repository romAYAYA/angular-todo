import { Injectable } from '@angular/core';
import { ITodo, ITodoRequest } from './todo.model';
import { BehaviorSubject, concatMap, map, Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface ITodoStorageItem {
  id: string,
  text: string,
  isDone: boolean,
  createdOn: string,
  selected: boolean
}


@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  readonly todos$: Observable<ITodo[]> = this._todos$.asObservable();

  readonly selectedTodo$:Observable<ITodo | null> = this._todos$.pipe(
    map((todos) => todos.find((item) => item.selected) ?? null),
  )

  constructor(private _httpClient: HttpClient) {}


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
     return this._httpClient.delete(`http://localhost:3000/delete/${id}`).pipe(
       switchMap(() => this.uploadAllTodos()),
     )
   }

   setActiveTodo(todo: ITodo): void {
    this._todos$.getValue().forEach((item) => item.selected = false);
    const findTodo = this._todos$.getValue().find((item) => item.id === todo.id);
    if(findTodo == null){ return; }
    findTodo.selected = true;
    const todosInStore = this._todos$.getValue();
    const copyofArray :ITodo[] = [];
    todosInStore.forEach((todo) => copyofArray.push({ ...todo }));
    this._todos$.next(copyofArray);

   }

  update(todo: ITodo): void {
    const findTodo = this._todos$.getValue().find((item) => item.id === todo.id);
    if(findTodo == null){ return; }
    const todosInStore = this._todos$.getValue();
    const copyofArray :ITodo[] = [];
    todosInStore.forEach((todo) => copyofArray.push({ ...todo }));
    this._todos$.next(copyofArray);
  }


}
