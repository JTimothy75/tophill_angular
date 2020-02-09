import { Component } from '@angular/core'

// <app-navbar > </app-navbar>
@Component({
    template: `
    
    <h1 class="errorMessage">404'd</h1>
  `,
    styles: [`
    .errorMessage { 
      margin-top: 0px; 
      font-size: 170px;
      text-align: center; 
    }`]
})
export class Error404Component {
    constructor() {

    }

}
