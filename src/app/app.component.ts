/**
 * @copyright FLYACTS GmbH 2018
 */

import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

/**
 * Ionic App
 */
@Component({
    templateUrl: 'app.html',
})
export class WhitleLabelApp {
    public rootPage = TabsPage;

    public constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public translateService: TranslateService,
    ) {
        // tslint:disable-next-line:no-floating-promises
        platform
            .ready()
            .then(() => {
                this.initTranslate();
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                statusBar.styleDefault();
                splashScreen.hide();
            });
    }

    /**
     * Initialize the translation
     */
    public initTranslate(): void {
        // Set the default language for translation strings, and the current language.
        this.translateService.setDefaultLang('de');

        if (this.translateService.getBrowserLang() !== undefined) {
            this.translateService.use(this.translateService.getBrowserLang());
        } else {
            this.translateService.use('de'); // Set your language here
        }
    }
}
