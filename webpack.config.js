const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, options) => {
    const isProduction = options.mode === 'production';

    const config = {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'eval' : 'source-map',
        watch: !isProduction,
        entry: ["@babel/polyfill", './src/index.js', './src/sass/style.scss', ],
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'script.js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: ['@babel/preset-env']
                      }
                    }
                }, {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' 
                    ]
                }, {
                    test: /\.html$/,
                    loader: 'html-loader',
                },
            ]
        },

        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                favicon: "./src/assets/favicon.png",
                minify: {
                    removeScriptTypeAttributes: true,
                },
            }),
            new ESLintPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
        ]
    }

    return config;
}