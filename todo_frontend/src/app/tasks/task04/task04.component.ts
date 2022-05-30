import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task04Service } from './task04.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-task04',
  templateUrl: './task04.component.html',
  styleUrls: ['./task04.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [Task04Service]
})
export class Task04Component {
  public boxes$$: Observable<string[]> = this._store.area$$;
  constructor(private _store: Task04Service) { }


}
