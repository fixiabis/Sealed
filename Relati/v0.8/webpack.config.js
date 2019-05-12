const path = require("path");

module.exports = {
    entry: "./bootstrap.ts",
    // mode: "production",
    mode: "development",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "./js")
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".scss"]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "resolve-url-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.svg$/,
                loader: 'url-loader'
            },
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};