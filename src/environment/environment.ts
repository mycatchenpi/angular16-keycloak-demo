export const environment = {
    production: false,
    keycloak: {
        enable: true,
        authority: 'http://localhost:8080',
        redirectUri: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200',
        realm: 'Tutorial-web',
        clientId: 'angular-fe-client'
    }
}