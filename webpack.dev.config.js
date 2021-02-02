const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },

    devServer: {
        contentBase: path.resolve(__dirname) + '/src',
        compress: true,
        port: 9000,
        host: 'localhost',
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
            },
        }
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
};