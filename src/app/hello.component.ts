import { Component, Input } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { User } from './models/user';
import { UserService } from './services/userService';

@Component({
  selector: 'hello',
  template: `
    <h4>Child User:</h4>
    {{ childUser | json }}
    <h4>Child User$:</h4>
    {{ childUser$ | async | json }}
    <h4>Child Person:</h4>
    {{ _person | json }}
    <h3>Age is {{ age }}</h3>
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
        text-color: red;
      }
    `,
  ],
})
export class HelloComponent {
  // @Input() user: { name: string; gender: string }; // method1: to detect change we use ngDoCheck
  private childUser = new User();
  private childUser$ = new Observable<User>();
  private childSubscriptions = new Subscription();
  @Input() age: number;

  private _person: { name: string; gender: string }; // method2: to detect change we user setter below
  @Input() set person(value) {
    this._person = value;
    this.salutateName();
  }

  constructor(private userService: UserService) {
    timer(5000, 10000).subscribe((data: number) => {
      this.childUser.name = this.childUser.name + data;
    });
  }

  ngOnInit() {
    this.childSubscriptions.add(
      this.userService.$user.subscribe((data: User) => {
        this.childUser = data;
        this.salutateName();
      })
    );

    this.childUser$ = this.userService.$user;
  }

  ngOnChanges() {
    console.log('inside ngOnChanges');
  }

  // ngDoCheck() {
  //   console.log("inside ngDoCheck");
  //   this.salutateName();
  // }

  salutateName() {
    console.log('Checking salution');
    this.childUser.slautation =
      this.childUser.gender === 'male' ? 'Mr. ' : 'Ms. ';
    this._person['salution'] = this._person.gender === 'male' ? 'Mr. ' : 'Ms. ';
  }

  ngOnDestroy() {
    console.log('hello destroyed!!');
    this.childSubscriptions.unsubscribe();
  }
}
