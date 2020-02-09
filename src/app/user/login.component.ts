import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}
  email;
  password;
  mouseoverLogin;

  login(loginForm) {
    console.log(loginForm);
    this.authService.loginUser(loginForm).subscribe(() => {
      this.router.navigate(["/home"]);
      console.log("You In");
    });
  }
}
