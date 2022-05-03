import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginStore } from './login.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginStore],
})
export class LoginComponent {
  public items: number[] = [1, 2, 3, 4, 5];
  loginCode$$: Observable<string> = this._loginStore.loginCode$$;
  public loginButtonDisabled$$: Observable<boolean> = this._loginStore.isLoggingIn$$;

  constructor(private _loginStore: LoginStore) {}

  addDigit(item: number): void {
    this._loginStore.addDigit(item);
  }

  removeDigit(): void {
    this._loginStore.removeLastDigit();
  }

  onLogin(): void {
    this._loginStore.doLogin().subscribe((value) => {
      if (value) {
        console.log('Окей');
      } else {
        console.log('не тот код');
      }
    });
  }
}
