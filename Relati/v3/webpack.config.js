module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    output: {
        filename: "js/index.js",
        path: __dirname + "/dist"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".sass"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};