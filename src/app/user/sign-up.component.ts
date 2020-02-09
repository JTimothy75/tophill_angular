import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  templateUrl: "./sign-up.component.html",

  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent {
  constructor(private router: Router, private auth: AuthService) {}

  firstName;
  lastName;
  userName;
  email;
  password;
  confirmPassword
  passwordConfirm;
  mouseoverLogin;

  signUp(loginForm) {
    console.log(loginForm);
    this.auth.signupUser(loginForm).subscribe(() => {
      this.router.navigate(["/home"]);
      console.log("You have an account");
    });
  }
}

