import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { SentinelAuthProviderListComponent } from '@sentinel/auth/components';
import { ApiTestingComponent } from './api-testing/api-testing.component';

export const routes: Routes = [
    {
        path: 'home',
        component: ApiTestingComponent,
        canActivate: [SentinelAuthGuardWithLogin],
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: SentinelAuthProviderListComponent,
        canActivate: [SentinelNegativeAuthGuard],
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
