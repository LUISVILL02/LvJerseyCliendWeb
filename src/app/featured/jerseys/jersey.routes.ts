import { Routes } from "@angular/router";
import { commonRoutes } from "@src/app/app.routes";

export const jerseyRoutes: Routes = [
    {
        path: commonRoutes.JERSEYS.DETAILS + '/:id', 
        loadComponent: () => import('./pages/jersey-details/jersey-details').then(m => m.JerseyDetails)
    },
]