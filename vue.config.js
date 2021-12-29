module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: "http://localhost:5000",
    },
    configureWebpack: {
        devtool: "source-map",
    },
};