// import { Injectable } from "@angular/core";
// import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";

// @Injectable()
// export class RouteActivator implements CanActivate {
//   avaliableRoutes = ["home", "user/login", "user/sign-up", "404"];
//   constructor(private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot) {
//     const routeAvaliable = this.avaliableRoutes.find(el => {
//       el === route.children;
//     });

//     if (!routeAvaliable) {
//       this.router.navigate(["/404"]);
//     }
//   }
// }
