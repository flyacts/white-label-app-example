/**
 * @copyright FLYACTS GmbH 2017
 */

const _ = require('lodash');
const webpack = require('webpack');
const whitelistedEnvVars = ['SKIN'];
const defaultWebpackConfig = require('../node_modules/@ionic/app-scripts/config/webpack.config.js');
const path = require('path');

const allowedSkins = require(path.resolve(__dirname, '../config/global-config.json')).allowedSkins;

module.exports = function () {
    if (allowedSkins.indexOf(process.env.SKIN) === -1) {
        console.error(`Skin ${process.env.SKIN} is not allowed. Allowed Values: ${allowedSkins.join(',')}`);
        process.exit(-1);
    }

    const config = defaultWebpackConfig[process.env.IONIC_ENV];
    config.plugins.push(new webpack.EnvironmentPlugin(whitelistedEnvVars));

    return defaultWebpackConfig;
};
