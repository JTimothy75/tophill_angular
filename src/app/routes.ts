import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./user/login.component";
import { SignUpComponent } from "./user/sign-up.component";
import { Error404Component } from "./errors/404.component";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "user/login", component: LoginComponent },
  { path: "user/sign-up", component: SignUpComponent },
  { path: "404", component: Error404Component },
  { path: "", redirectTo: "/home", pathMatch: "full" }
];
