import { Component, OnInit } from "@angular/core";
import { AuthService } from "../user/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./app-navbar.component.html",
  styleUrls: ["./app-navbar.component.css"]
})
export class AppNavBarComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}
}
