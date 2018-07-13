/**
 * @copyright FLYACTS GmbH 2018
 */

import {
    HttpClient,
    HttpClientJsonpModule,
    HttpClientModule,
} from '@angular/common/http';
import {
    ErrorHandler,
    NgModule,
} from '@angular/core';
import {
    HttpModule,
} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {
    TranslateLoader,
    TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
    IonicApp,
    IonicErrorHandler,
    IonicModule,
} from 'ionic-angular';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {
    ImageSearchProvider,
    SkinSelector,
} from '../providers';

import { WhitleLabelApp } from './app.component';

/**
 * The translate loader needs to know where to load i18n files
 * in Ionic's static asset pipeline.
 */
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/dicts/', '.json');
}

/**
 * The central app module
 */
@NgModule({
    bootstrap: [IonicApp],
    declarations: [
        WhitleLabelApp,
        AboutPage,
        HomePage,
        TabsPage,
    ],
    entryComponents: [
        WhitleLabelApp,
        AboutPage,
        HomePage,
        TabsPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(WhitleLabelApp),
        HttpClientJsonpModule,
        HttpClientModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                deps: [HttpClient],
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
            },
        }),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        ImageSearchProvider,
        SkinSelector,
    ],
})
export class AppModule { }
