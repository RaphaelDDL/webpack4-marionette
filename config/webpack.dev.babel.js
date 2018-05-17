//* ========================
//#FILE - webpack.dev.config.babel.js
//> Author: Raphael Oliveira
//>
//> Create Date: <May 04, 2018>
//>
//======================== */
import path from 'path';
import webpack from 'webpack';
import PATHS from './config.paths';
import WebpackBaseConfigs from './webpack.base.config.babel.js';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';

const DEV_SERVER_PORT = 8090;


export default WebpackBaseConfigs( {
    mode: 'development',

    entry: [
        'webpack-hot-middleware/client?reload=true',
        PATHS.entry
    ],

    optimization: {
        namedModules: true,
        minimize: false,
    },

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },

    HtmlWebpackPluginOptions: {
        showErrors: true,
        devServer: `http://localhost:${DEV_SERVER_PORT}`,

    },

    // Emit a source map for easier debugging
    // See https://webpack.js.org/configuration/devtool/#devtool
    devtool: 'inline-source-map',
    // devtool: 'eval-source-map', // https://github.com/FormidableLabs/webpack-dashboard/issues/234#issuecomment-370915360

    // Add development plugins
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading

        new BundleAnalyzerPlugin.BundleAnalyzerPlugin( {
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'BundleAnalyzerReport.html' //file will be in dist
        } ),

        new webpack.NamedModulesPlugin(),

        new CircularDependencyPlugin( {
            exclude: /a\.js|node_modules/, // exclude node_modules
            failOnError: false // show a warning when there is a circular dependency
        } ),
        new DashboardPlugin()
    ],
    performance: {
        hints: false
    },
    devServer: {
        contentBase: PATHS.dist,
        port: DEV_SERVER_PORT,
        compress: true,
        historyApiFallback: true,
        hot: true,
        hotOnly: true,
        overlay: true,
        inline: true
    }
} );
