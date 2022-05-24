import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface IStore {
  randomNumbers: number[]
}

@Injectable()
export class Task03Service {

  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: []
  });

  public numbers$$: Observable<number[]> = of([]);

  public countOfNumbers$$: Observable<number> = of(0);

  public minOfAllnumbers$$: Observable<number> = of(0);

  public maxOfAllNumbers$$: Observable<number> = of(0);

  public averageNumber$$: Observable<number> = of(0);

  public addRandomNumber$(): Observable<void> {
    this._updateStore({ randomNumbers: [] });
    return of(void 0);

  }

  private _updateStore(data: Partial<IStore>): void {
    this._store.next({ ...this._store.getValue(), ...data });
  }

}
