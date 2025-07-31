import { KeycloakEventType, KeycloakService } from "keycloak-angular";
import { environment } from "src/environment/environment";

export const initializeKeycloak = (keycloak: KeycloakService) => async () => {
    if(environment.keycloak.enable) {
        /**
         *  https://www.npmjs.com/package/keycloak-angular#keycloak-js-events
         *  The callback events from keycloak-js are available through a RxJS subject which is defined by keycloakEvents$.
         *  For example you make keycloak-angular auto refreshing your access token when expired
         * 
         **/
        keycloak.keycloakEvents$?.subscribe({
            next(event) {
                if(event.type == KeycloakEventType.OnTokenExpired)
                {
                    keycloak.updateToken(20);
                }            
            }
        });

        return keycloak.init({
            config: {
                url: environment.keycloak.authority,
                realm: environment.keycloak.realm,
                clientId: environment.keycloak.clientId
            },
            // If set a false you cannot get any information about the user example the username
            // if you use keycloakService.getUserName() you get this error
            // User not logged in or user profile was not loaded.
            loadUserProfileAtStartUp: false,
            initOptions: {
                //   This is an action we specified on keycloak load
                //   We have two options : 'login-required'|'check-sso'
                //   If is set to 'login-required' this means your browser will do a full redirect to the Keycloak server and back to your application.

                // onLoad: 'login-required',
                // checkLoginIframe: true,

                //   If is set to  'check-sso'  instead this action will be performed in a hidden iframe, so your application resources only need to be loaded and parsed once by the browser.
                //   Then you will need to add the silentCheckSsoRedirectUri and create a html file   silent-check-sso.html with this content
                // <html>
                //    <body>
                //         <script>
                //           parent.postMessage(location.href, location.origin);
                //         </script>
                //      </body>
                // </html>
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
                checkLoginIframe: false,
                redirectUri: environment.keycloak.redirectUri,
            },
            // By default the keycloak-angular library add Authorization: Bearer TOKEN to all http requests
            // Then to exclude a list of URLs that should not have the authorization header we need to provide  them here.
            bearerExcludedUrls: [
                '/assets'
            ]
        });
    } else {
        return Promise.resolve();
    }
}