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

const DEV_SERVER_PORT = 8090;


export default WebpackBaseConfigs( {
    mode: 'development',

    optimization: {
        namedModules: true,
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
    devtool: 'eval-source-map',

    // Add development plugins
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading

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
