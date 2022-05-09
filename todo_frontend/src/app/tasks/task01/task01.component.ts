import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task01Service } from './task01.service';

@Component({
  selector: 'app-task01',
  templateUrl: './task01.component.html',
  styleUrls: ['./task01.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task01Service]
})
export class Task01Component {


  constructor() { }

}

