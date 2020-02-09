import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
// import { NglCoreModule } from "angular-leaflet";

import { AppComponent } from "./app.component";
import { MapViewComponent } from "./map-view/map-view.component";
import { MapDataService } from "./map-view/map-data.service";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up.component";
import { LoginComponent } from "./user/login.component";
import { HomeComponent } from "./home/home.component";
import { appRoutes } from "./routes";
import { AppNavBarComponent } from "./nav/app-navbar.component";
import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    MapViewComponent,
    UserComponent,
    SignUpComponent,
    LoginComponent,
    HomeComponent,
    AppNavBarComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [MapDataService, AuthService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
