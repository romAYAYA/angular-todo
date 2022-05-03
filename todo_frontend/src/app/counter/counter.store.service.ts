import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

interface IStore {
  counter: number
}

@Injectable()
export class CounterStoreService {
  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    counter: 0,
  });

  constructor(private _http: HttpClient) {}

  public getCounterFromServer(): Observable<void> {
    return this._http.get<{ counter: number }>('http://localhost:3000/test').pipe(
      tap((response) => this._updateStore({ counter: response.counter })),
      map(() => void 0)
    );
  }

  public incrementOnServer(): Observable<void> {
    return this._http.post<void>('http://localhost:3000/test/increment', null);
  }

  public decrementOnServer(): Observable<void> {
    return this._http.post<void>('http://localhost:3000/test/decrement', null);
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }
}
