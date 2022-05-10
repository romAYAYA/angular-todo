import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IStore {
  randomNumbers: number[]
}

@Injectable()
export class Task02Service {
  // убери все ts-ignore при выполнении задания

  // @ts-ignore
  private _store: BehaviorSubject<IStore> = new BehaviorSubject<IStore>({
    randomNumbers: []
  });


  public addRandomNumber(): void {

  }

  // @ts-ignore
  private _getRandomNumber(max: number = 100): number {
    return Math.floor(Math.random() * max);
  }
}
