/**
 * @copyright FLYACTS GmbH 2018
 */

import * as fse from 'fs-extra';
import * as path from 'path';
import * as rimrafAsync from 'rimraf';
import * as util from 'util';

const allowedSkins = require(path.resolve(__dirname, '../config/global-config.json')).allowedSkins;

const rimraf = util.promisify(rimrafAsync);

// tslint:disable-next-line:no-floating-promises
(async function main() {
    if (allowedSkins.indexOf(process.env.SKIN) === -1) {
        // tslint:disable-next-line:no-console
        console.error(`Skin ${process.env.SKIN} is not allowed. Allowed Values: ${allowedSkins.join(',')}`);
        process.exit(-1);
    }

    const skinName = process.env.SKIN;

    // tslint:disable-next-line:no-console
    console.log(`Applying assets for skin ${skinName}`);

    const assetDir = path.resolve(__dirname, '../src/assets');
    const baseDir = path.resolve(__dirname, '../config/skins/base/assets');
    const skinDir = path.resolve(__dirname, '../config/skins', skinName, 'assets');
    const variablesDestination = path.resolve(__dirname, '../src/theme/variables.scss');
    const variablesSourceBase = path.resolve(__dirname, '../config/skins/base/variables.scss');
    const variablesSourceSkin = path.resolve(__dirname, '../config/skins', skinName, 'variables.scss');

    // delete the assets dir
    await rimraf(assetDir);

    // first copy the base folder to the assets
    await fse.mkdirp(assetDir);
    await fse.copy(baseDir, assetDir, {
        overwrite: true,
        recursive: true,
    });

    await fse.copy(variablesSourceBase, variablesDestination, {
        overwrite: true,
    });

    // then copy the customization folder into the assets
    await fse.copy(skinDir, assetDir, {
        overwrite: true,
        recursive: true,
    });

    await fse.copy(variablesSourceSkin, variablesDestination, {
        overwrite: true,
    });

})();
