import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

interface ILoginStore {
  numberArray: number[]
}

@Injectable()
export class LoginStore {
  private _store: BehaviorSubject<ILoginStore> = new BehaviorSubject<ILoginStore>({
    numberArray: []
  });

  store$$: Observable<ILoginStore> = this._store.asObservable();

  constructor() {}

  /**
   * user entered data
   */
  loginCode$$: Observable<string> = this._store.pipe(
    map(store => store.numberArray),
    map(arr => arr.join('')),
  );

  addDigit(num: number): void {
    const currentValue = this._store.getValue();
    if (currentValue.numberArray.length >= 5) { return; }
    // crate new array for change detection
    currentValue.numberArray = [...currentValue.numberArray, num];
    this._store.next(currentValue);
  }

  removeLastDigit(): void {
    const currValue = this._store.getValue();
    if (currValue.numberArray.length === 0) { return; }
    currValue.numberArray.pop();
    currValue.numberArray = [...currValue.numberArray];
    this._store.next(currValue);
  }
}
