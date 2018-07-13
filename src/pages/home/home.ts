/**
 * @copyright FLYACTS GmbH 2018
 */

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {
    debounce,
} from 'lodash';

import {
    ImageSearchProvider,
    SkinSelector,
} from '../../providers';

/**
 * The home page
 */
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    public searchTerm: string = '';

    public images: string[] = [];

    public submitSearchDebounced: (() => void);

    public constructor(
        public search: ImageSearchProvider,
        public skin: SkinSelector,
    ) {
        this.submitSearchDebounced = debounce(this.submitSearch, 500);
        // tslint:disable-next-line:no-console
        console.log(this.skin.name);
    }

    /**
     * Submit the search to wikimedia
     */
    public async submitSearch() {
        try {
            this.images = await this.search.fetchImages(this.searchTerm);
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
        }
    }

}
