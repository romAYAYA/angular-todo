import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IUser, Task01Service } from './task01.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task01',
  templateUrl: './task01.component.html',
  styleUrls: ['./task01.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task01Service]
})
export class Task01Component {
   public counter$$:Observable<number> = this.Task01Service.counter$$;
   public user$$: Observable<IUser[]> = this.Task01Service.user$$;

  constructor(private Task01Service: Task01Service) { }

  onIncrementClick():void {
  this.Task01Service.incrementCounter();
  }

  onDecrementClick():void {
    this.Task01Service.decrementCounter();
  }

}

