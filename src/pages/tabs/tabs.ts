/**
 * @copyright FLYACTS GmbH 2018
 */

import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

/**
 * The tabs page
 */
@Component({
    templateUrl: 'tabs.html',
})
export class TabsPage {
    public tab1Root = HomePage;
    public tab2Root = AboutPage;
}
