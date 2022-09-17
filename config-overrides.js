const webpack = require("webpack");

module.exports = {
   devServer: function (configFunction) {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);

            config.resolve.fallback = {
                ...config.resolve.fallback,
                stream: require.resolve("stream-browserify"),
                buffer: require.resolve("buffer"),
            }
            config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
            config.plugins = [
                ...config.plugins,
                new webpack.ProvidePlugin({
                    process: "process/browser",
                    Buffer: ["buffer", "Buffer"],
                }),
            ]

            config.headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            };
            return config;
        };
    },
};
