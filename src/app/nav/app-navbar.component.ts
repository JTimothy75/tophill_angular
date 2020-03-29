import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../user/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./app-navbar.component.html",
  styleUrls: ["./app-navbar.component.css"]
})
export class AppNavBarComponent implements OnInit {
  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit() {}
  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(["/home"]);
    });
  }
}
