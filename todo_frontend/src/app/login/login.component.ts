import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginStore } from './login.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginStore]
})
export class LoginComponent{

  public items: number[] = [1, 2, 3, 4, 5];
  loginCode$$: Observable<string> = this._loginStore.loginCode$$;

  constructor(private _loginStore: LoginStore) { }

  addDigit(item: number): void {
    this._loginStore.addDigit(item);
  }


  removeDigit(): void {
    this._loginStore.removeLastDigit();
  }
}
