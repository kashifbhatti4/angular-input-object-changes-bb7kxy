import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new Subject<User>();
  public $user = this.user.asObservable();

  public setUser(user: User) {
    this.user.next(user);
  }
}
