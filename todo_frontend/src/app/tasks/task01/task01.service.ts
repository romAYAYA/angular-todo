import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IUser {
  id: number,
  name: string
}

@Injectable()
export class Task01Service {
  private _users: IUser[] = [
    { id: 2, name: 'John' },
    { id: 3, name: 'Mike' },
    { id: 4, name: 'Alex' },
    { id: 6, name: 'Eugene' },
    { id: 9, name: 'Angela' },
    { id: 10, name: 'Casey' },
  ];

  public allUsers$$: Observable<IUser[]> = of(this._users);
}
