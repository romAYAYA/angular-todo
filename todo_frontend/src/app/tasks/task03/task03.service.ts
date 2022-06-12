import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, distinctUntilChanged, EMPTY, finalize, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IStore {
  randomNumbers: number[],
  isHttpLoading: boolean
}

@Injectable()
export class Task03Service {

  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [],
    isHttpLoading: false
  });

  isRandomNumberDisabled$$: Observable<boolean> = this._store.pipe(
    map((store) => store.isHttpLoading),
    distinctUntilChanged()

  )

  randomNumbers$$:Observable<number[]> = this._store.pipe(
    map((store) => store.randomNumbers),
    distinctUntilChanged()
  );

  public numbers$$: Observable<number[]> = this._store.pipe(
    map((store) => store.randomNumbers),
    distinctUntilChanged()
  );

  public countOfNumbers$$: Observable<number> = this._store.pipe(
    map((store) => store.randomNumbers.length),
    distinctUntilChanged()
  );

  public minOfAllnumbers$$: Observable<number> = this._store.pipe(
    map((store) => {
      if (store.randomNumbers.length === 0) {
        return 0;
      }
      return Math.min(...store.randomNumbers);
    }),
    distinctUntilChanged()
  );


  public maxOfAllNumbers$$: Observable<number> = this._store.pipe(
    map((store) => {
      if(store.randomNumbers.length === 0){
        return 0;
      }
      return Math.max(...store.randomNumbers);
    }),
    distinctUntilChanged()
  );

  public averageNumber$$: Observable<number> = this._store.pipe(
    map((store) => {
      if(store.randomNumbers.length === 0){
        return 0;
      }
      return store.randomNumbers.reduce((acc, curr) => acc + curr, 0) / store.randomNumbers.length;
    }),
    distinctUntilChanged()
  );

  constructor(private _http: HttpClient) {}

  public addRandomNumber$2(): Observable<void> {
    return this._http.get<{result: number}>('http://localhost:3000/randomNumber').pipe(
      tap(() => this._updateStore({ isHttpLoading: true })),
      map((object) => object.result),
      tap((number) => {
        const randomNumbersInStore: number[] = this._store.getValue().randomNumbers;
        const copyOfNumbers: number[] = [];
        randomNumbersInStore.forEach(num => copyOfNumbers.push(num));
        copyOfNumbers.push(number);
        this._updateStore({ randomNumbers: copyOfNumbers, isHttpLoading: false });
      }),
      map(() => void 0)
    )
  }

  public addRandomNumber$(): Observable<void> {
    return this.randomNumbers$$.pipe(
      take(1),
      switchMap(() => of(void 0).pipe(
        tap(() => this._updateStore({ isHttpLoading: true })),
        switchMap(() => this._http.get<{ result: number }>('http://localhost:3000/randomNumber')),
        finalize(() => this._updateStore({ isHttpLoading: false }))
      )),
      map((object) => object.result),
      catchError(() => {alert('ddd'); return EMPTY;}),
      tap((number) => {
        const randomNumbersInStore: number[] = this._store.getValue().randomNumbers;
        const copyOfNumbers: number[] = [];
        randomNumbersInStore.forEach(num => copyOfNumbers.push(num));
        copyOfNumbers.push(number);
        this._updateStore({ randomNumbers: copyOfNumbers });
      }),
      map(() => void 0)
    )
  }


  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }


}
