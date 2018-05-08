//* ========================
//#FILE - webpack.prod.config.babel.js
//> Author: Raphael Oliveira
//>
//> Create Date: <May 04, 2018>
//>
//======================== */
import path from 'path';
import webpack from 'webpack';
import PATHS from './config.paths';
import PackageInfo from '../package.json';
import WebpackBaseConfigs from './webpack.base.config.babel.js';

export default WebpackBaseConfigs( {
    mode: 'production',

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].chunk.js'
    },

    HtmlWebpackPluginOptions: {
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
        googleAnalytics: {
            trackingId: PackageInfo.app.analyticsTrackingId,
            pageViewOnLoad: true
        }
    },

    performance: {
        assetFilter: ( assetFilename ) => !( /(\.map$)|(^(main\.|favicon\.))/.test( assetFilename ) ),
    },

    plugins: []
} );
