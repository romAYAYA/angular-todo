import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IStore {
  randomNumbers: number[]
}

@Injectable()
export class Task02Service {


  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: [],
  });

  public numbers$$:Observable<number[]>= this._store.pipe(
    map((store) => store.randomNumbers)
  )

  public countOfNumbers$$:Observable<number> = this._store.pipe(
    map((store) => store.randomNumbers.length)
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
