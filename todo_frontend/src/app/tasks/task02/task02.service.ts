import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IStore {
  randomNumbers: number[],
  countOfRandomNumbers: number
}

@Injectable()
export class Task02Service {


  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [],
    countOfRandomNumbers: 0
  });

  public numbers$$:Observable<number[]>= this._store.pipe(
    map((store) => store.randomNumbers)
  )

  public countOfRandomNumbers$$: Observable<number>= this._store.pipe(
    map((store) => store.countOfRandomNumbers)
  )

  public addRandomNumber(): void {
    const randomNumber = this._getRandomNumber();
    const currentNumbers = this._store.getValue().countOfRandomNumbers + 1;
    this._store.getValue().randomNumbers.push(randomNumber);
    this._updateStore({ countOfRandomNumbers: currentNumbers })
  }


  private _getRandomNumber(max: number = 100): number {
    return Math.floor(Math.random() * max);
  }
  // @ts-ignore
  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }
}
