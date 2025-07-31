import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AuthenticationService } from '@src/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular16-app';

  constructor(private auth: AuthenticationService) {}

  onLogoutClick(event: Event) {
    console.log("logout clicked!");

    this.auth.logout();
  }
}
