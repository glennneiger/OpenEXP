const webpack = require('webpack');
const path = require('path');

// Now you can use if (__DEV__) around the app to exclude code from production
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

var config  = {
    entry: {
        vendor: './client/vendor.js',

        app: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            './client/index.js'
            ]

    },
    "target": 'atom',

    output: {
        path: __dirname + '/client/build',
        publicPath: '/build/',
        filename: '[name].js',
        pathinfo: true
    },

    resolve: {
        root: [path.join(__dirname, "/node_modules")]
    },
    devServer: {
        hot: true
    },
    module: {
        loaders: [
            {test: /src.*\.js$/, loaders: ['ng-annotate', 'babel-loader'], exclude: /node_modules/},
            {test: /\.(eot|woff|svg|woff2|dtd|ttf)$/, loaders: ["file"], exclude: /node_modules/ },
            {test: /\.scss$/, loaders: ["style", "css", "sass?"], exclude: /node_modules/},
            {test: /\.(jpe?g|png|gif|svg)$/i, loaders: [], exclude: /node_modules/},
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        definePlugin
    ]

};

if (process.env.NODE_ENV === 'production') {
    // comment the bottom line to avoid minification
    //config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.entry.app = ['./client/index.js'];
}

module.exports = config;
