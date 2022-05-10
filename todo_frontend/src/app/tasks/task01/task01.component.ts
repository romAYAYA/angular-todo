import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task01Service } from './task01.service';
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

  constructor(private Task01Service: Task01Service) { }

  onIncrementClick():void {
  this.Task01Service.incrementCounter();
  }

  onDecrementClick():void {
    this.Task01Service.decrementCounter();
  }

}

