import { Routes } from "@angular/router";
import { ViewTemplateComponent } from "./pages/view-template/view-template.component";
import { AuthGuard } from "@src/auth/auth-guard";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'view-template',
        pathMatch: 'full'
    },
    {
        path: 'view-template',
        component: ViewTemplateComponent,
        canActivate: [ AuthGuard ]
    }
];