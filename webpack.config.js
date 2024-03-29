const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production', 
    entry: './src/main.js', // Adjust this to the path of your main JS file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // Adjust the path as necessary
          }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: 'src/img', to: 'img' }, // Adjust 'img' to your images directory path
        //     ],
        // }),
    ],
    module: {
        rules: [
            // This rule is optional if you're using Webpack 5 and above
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext][query]' // Output images to 'img' folder with hash
                }
            },
        ],
    },
    // If you're using webpack-dev-server, you can include its configuration here
    devServer: {
        static: './',
    },
};