import { Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management/user-management.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'user-management',
        pathMatch: 'full'
    },
    {
        path: 'user-management',
        component: UserManagementComponent,
        children: [
            {
             path: '',
             loadComponent: () =>
                import('./components/user-management/user-table/user-table.component').then(m => m.UserTableComponent),
            },
                        {
             path: 'details/:id',
             loadComponent: () =>
                import('./components/user-management/user-details/user-details.component').then(m => m.UserDetailsComponent),
            }
        ]
    }
];
