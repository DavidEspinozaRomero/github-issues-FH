import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'issues', loadComponent: () => import('./modules/issues/pages/issues-list/issues-list.component')},
    {path: 'issue/:number', loadComponent: () => import('./modules/issues/pages/issue/issue.component')},
    {path: '', redirectTo: 'issues', pathMatch: 'full'}
];
