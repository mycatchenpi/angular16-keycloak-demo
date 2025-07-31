import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  constructor(private readonly keycloakService: KeycloakService) {}

  redirectToLoginPage(): Promise<void> {
    return this.keycloakService.login();
  }

  get userName(): string {
    return this.keycloakService.getUsername();
  }

  isLoggedIn(): Promise<boolean> {
    return this.keycloakService.isLoggedIn();
  }

  logout(): void {
    this.keycloakService.logout(environment.keycloak.postLogoutRedirectUri);
  }
}
