import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthenticationService } from "../services/authentication.service";

export const AuthGuard: CanActivateFn = async (): Promise<boolean> => {
    const authenticationService = inject(AuthenticationService);

    const isLoggedIn = await authenticationService.isLoggedIn();
    console.log("isLoggedIn: ", isLoggedIn);

    if (isLoggedIn) {
        return true;
    } else {
        authenticationService.redirectToLoginPage();
        return false;
    }
}