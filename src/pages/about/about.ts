/**
 * @copyright FLYACTS GmbH 2018
 */

import { Component } from '@angular/core';

import { SkinSelector } from '../../providers';

/**
 * The about page
 */
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {
    public constructor(
        public skin: SkinSelector,
    ) {

    }

}
