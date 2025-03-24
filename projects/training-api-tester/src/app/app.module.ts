import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SentinelLayout1Module } from '@sentinel/layout/layout1';
import { SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard } from '@sentinel/auth/guards';
import { SentinelAuthModule } from '@sentinel/auth';
import { SentinelConfirmationDialogComponent } from '@sentinel/components/dialogs';
import { SentinelBreadcrumbsModule } from '@sentinel/layout/breadcrumbs';
import { LayoutCommonComponentsMaterialModule } from '@sentinel/layout/common-components';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environment';
import { TrainingApiModule } from '../../../training-api/src/lib/training-api.module';
import { AppRoutingModule } from './app-routing-module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SentinelLayout1Module,
        SentinelConfirmationDialogComponent,
        SentinelAuthModule.forRoot(environment.authConfig),
        SentinelBreadcrumbsModule,
        LayoutCommonComponentsMaterialModule,
        TrainingApiModule.forRoot(environment.trainingApiConfig),
    ],
    providers: [SentinelAuthGuardWithLogin, SentinelNegativeAuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
