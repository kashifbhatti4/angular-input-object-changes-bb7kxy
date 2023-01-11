import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from './models/user';
import { UserService } from './services/userService';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  user = new User();
  subscriptions = new Subscription();
  user$ = new Observable<User>();
  person = {
    name: 'aamir',
    gender: 'male',
  };

  constructor(private userService: UserService) {
    setTimeout((_) => {
      let user = new User;
      user.name = 'slaman';
      user.gender = 'female';
      this.userService.setUser(user);
    }, 1000 * 2);
  }

  ngOnInit(){
    this.subscriptions.add(this.userService.$user.subscribe((data: User) => {
      this.user = data;
    }));
    this.user$ = this.userService.$user;
  }

  changeGender(input: string) {
    //obj.gender = obj.gender === 'female' ? 'male' : 'female';
    switch(input){
      case "user":
        this.user.gender = this.user.gender === 'female' ? 'male' : 'female';
        this.userService.setUser(this.user);
        break;
      case "person":
        this.person.gender = this.person.gender === 'female' ? 'male' : 'female';
          break;
    }
  }

  ngOnDestroy(){
    console.log("appcomponent destroyed!!");
    this.subscriptions.unsubscribe();
  }
}
