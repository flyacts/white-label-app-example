/**
 * @copyright FLYACTS GmbH 2018
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as jsonpath from 'jsonpath';
import 'rxjs/add/operator/toPromise';

/**
 * The provider that searches wikimedia for images
 */
@Injectable()
export class ImageSearchProvider {

    public constructor(
        public http: HttpClient,
    ) { }

    /**
     * Searches wikimedia commons for images and returns the absolute url to the image
     *
     * @param searchterm A search string
     */
    public async fetchImages(searchterm: string): Promise<string[]> {
        const params = (new HttpParams())
            .append('action', 'query')
            .append('generator', 'images')
            .append('prop', 'imageinfo')
            .append('gimlimit', '10')
            .append('redirects', '1')
            .append('titles', searchterm)
            .append('iiprop', [
                'timestamp',
                'user',
                'userid',
                'comment',
                'canonicaltitle',
                'url',
                'size',
                'dimensions',
                'sha1',
                'mime',
                'thumbmime',
                'mediatype',
                'bitdepth',
            ].join('|'))
            .append('iiurlwidth', '512')
            .append('format', 'json');

        const url = `https://commons.wikimedia.org/w/api.php?${params.toString()}`;
        const results = (
            await this.http.jsonp(url, 'callback')
                .toPromise()
        );

        const images = jsonpath.query(results, '$..imageinfo');

        if (images.length === 0) {
            return [];
        }

        const imageResults = [];

        for (const image of images) {
            imageResults.push(image[0].thumburl ? image[0].thumburl : image[0].url);
        }

        return imageResults;
    }

}
