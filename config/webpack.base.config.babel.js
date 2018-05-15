//* ========================
//#FILE - webpack.base.config.babel.js
//> Author: Raphael Oliveira
//>
//> Create Date: <May 04, 2018>
//>
//======================== */
import path from 'path';
import webpack from 'webpack';
import PATHS from './config.paths';
import PackageInfo from '../package.json';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackTemplate from 'html-webpack-template';

console.log( '==============PATHS=============\n' );
console.log( JSON.stringify( PATHS, null, 2 ) );
console.log( '\n================================\n\n' );

export default ( options ) => ( {
    mode: options.mode,
    devtool: options.devtool,
    entry: options.entry,
    devServer: options.devServer, //webpack-dev-server
    performance: options.performance || {},
    target: 'web', // Make web variables accessible to webpack, e.g. window

    output: Object.assign( {
        path: PATHS.dist,
        sourceMapFilename: '[file].map',
        publicPath: '/',
    }, options.output ), // Merge with env dependent settings
    optimization: Object.assign( {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                },
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'initial',
                    enforce: true
                }
            }
        }
    }, options.optimization ),
    resolve: {
        modules: [
            PATHS.src,
            PATHS.nodeModules
        ],
        extensions: [ '*', '.js', '.hbs', '.xml', '.scss', '.css' ],
        alias: {
            package: `${PATHS.root}/package.json`,
            css: `${PATHS.src}/scss`,
            data: `${PATHS.src}/data`,
            templates: `${PATHS.src}/hbs`,
            helpers: `${PATHS.src}/js/helpers`,
            views: `${PATHS.src}/js/views`,
            models: `${PATHS.src}/js/models`,
        }
    },
    module: {
        rules: [ {
            test: /.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: [
                    [ 'env', {
                        retainLines: true,
                        "targets": {
                            "browsers": [ "last 4 versions", "safari >= 7" ]
                        }
                    } ]
                ]
            }
        }, {
            test: /\.(scss|sass|css)$/,
            use: [ {
                loader: options.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader', // translates CSS into CommonJS
                query: {
                    sourceMap: true
                }
            }, {
                loader: 'sass-loader', // compiles Sass to CSS
                query: {
                    includePaths: [
                        PATHS.src,
                        PATHS.nodeModules
                    ],
                    outputStyle: 'expanded',
                    sourceMap: true
                }
            } ]
        }, {
            test: /\.hbs$/,
            loader: 'handlebars-template-loader'
        }, {
            test: /\.xml$/,
            loader: 'xml-loader'
        }, {
            test: /\.(jpg|png|gif)$/,
            use: [
                'file-loader', {
                    loader: 'image-webpack-loader',
                    options: {
                        query: {
                            gifsicle: {
                                interlaced: true
                            },
                            mozjpeg: {
                                progressive: true
                            },
                            optipng: {
                                optimizationLevel: 7
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    },
                },
            ],
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                mimetype: 'application/font-woff'
            }
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                mimetype: 'application/octet-stream'
            }
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                mimetype: 'image/svg+xml'
            }
        } ]
    },
    plugins: [
        // Export variables which are used everywhere
        new webpack.ProvidePlugin( {
            $: 'jquery',
            jQuery: 'jquery',
            Bb: 'backbone',
            Mn: 'backbone.marionette',
            Radio: 'backbone.radio'
        } ),

        new webpack.DefinePlugin( {
            'process.env': {
                NODE_ENV: JSON.stringify( process.env.NODE_ENV )
            },
        } ),

        new HtmlWebpackPlugin( Object.assign( {
            //HtmlWebpackPlugin options
            xhtml: true,

            //html-webpack-template required
            inject: false,
            template: HtmlWebpackTemplate,

            //Extra options @ https://github.com/jaketrent/html-webpack-template
            filename: 'index.html',
            title: PackageInfo.app.title,
            appMountId: PackageInfo.app.appMountId,
            //baseHref: 'http://example.com/awesome',
            mobile: true,
            //inlineManifestWebpackName: 'manifest'

        }, options.HtmlWebpackPluginOptions ) ),

        new MiniCssExtractPlugin( {
            filename: '[name]-[chunkhash].css',
            allChunks: true
            // chunkFilename: "[id].css"
        } ),
    ].concat( options.plugins )
} );
