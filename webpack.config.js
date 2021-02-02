const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    cache: true,
    mode: "production",
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components|build)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename:"index.html"
        })
    ]
};