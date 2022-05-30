import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IStore {
  randomNumbers: number[]
}

@Injectable()
export class Task03Service {

  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: []
  });

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

  public addRandomNumber$(): Observable<void> {
    return this._http.get<{result: number}>('http://localhost:3000/randomNumber').pipe(
      map((object) => Number(object.result)),
      map((number) => {
        const randomNumbersInStore: number[] = this._store.getValue().randomNumbers;
        const copyOfNumbers: number[] = [];
        randomNumbersInStore.forEach(num => copyOfNumbers.push(num));
        copyOfNumbers.push(number);
        this._updateStore({ randomNumbers: copyOfNumbers });
      })
    )
  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }


}
