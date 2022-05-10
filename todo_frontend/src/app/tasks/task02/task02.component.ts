import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task02Service } from './task02.service';

@Component({
  selector: 'app-task02',
  templateUrl: './task02.component.html',
  styleUrls: ['./task02.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task02Service]
})
export class Task02Component {

  constructor() { }

}

