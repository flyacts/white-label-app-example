/**
 * @copyright FLYACTS GmbH 2018
 */


import { Injectable } from '@angular/core';

/**
 * Services that stores the current skin which was specified at build time
 */
@Injectable()
export class SkinSelector  {
    public get name(): string {
        return process.env.SKIN;
    }
}
