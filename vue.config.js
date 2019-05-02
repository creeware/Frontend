var webpack = require("webpack");

module.exports = {
  devServer: {
    proxy: {
      "api/*": {
        target: process.env.VUE_APP_API_URL,
        rewrite: { "^/api": "" },
        ws: true,
        changeOrigin: true
      },
      "authentication/*": {
        target: process.env.VUE_APP_API_URL,
        rewrite: { "^/authentication": "" },
        ws: true,
        changeOrigin: true
      },
      "auth/*": {
        target: process.env.VUE_APP_API_URL,
        rewrite: { "^/auth": "" },
        ws: true,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        "process.env.VUE_APP_GITHUB_OAUTH_KEY":
          process.env.VUE_APP_GITHUB_OAUTH_KEY
      })
    ]
  }
};
