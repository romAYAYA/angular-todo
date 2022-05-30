import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface IStore {
  area: string[],
  move: number
}


@Injectable()
export class Task04Service {

  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    area: ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'],
    move: 0
  });

  area$$:Observable<string[]> = this._store.pipe(
    map((store) => store.area)
  )
}
