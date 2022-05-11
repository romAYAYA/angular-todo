import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export interface IStore {
  randomNumbers: number[]
}

@Injectable()
export class Task02Service {


  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [ 1, 2, 3, 4, 5],
  });

  public numbers$$:Observable<number[]>= this._store.pipe(
    map((store) => store.randomNumbers),
    distinctUntilChanged()
  )

  public countOfNumbers$$:Observable<number> = this._store.pipe(
    map((store) => store.randomNumbers.length),
    distinctUntilChanged()
  )

  public minOfAllnumbers$$:Observable<number> = this._store.pipe(
    map((store) => Math.min(...store.randomNumbers)),
    distinctUntilChanged()
  )

  public maxOfAllNumbers$$:Observable<number> = this._store.pipe(
    map((store) => Math.max(...store.randomNumbers)),
    distinctUntilChanged()
  )

  public averageNumber$$:Observable<number> = this._store.pipe(
    map((store) =>
      (store.randomNumbers.reduce((acc, curr) => acc+ curr, 0) / store.randomNumbers.length)),
    distinctUntilChanged()
  )

  public addRandomNumber(): void {
    const randomNumber = this._getRandomNumber();
    this._store.getValue().randomNumbers.push(randomNumber);
  }


  private _getRandomNumber(max: number = 100): number {
    return Math.floor(Math.random() * max);
  }
  // @ts-ignore
  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }
}
