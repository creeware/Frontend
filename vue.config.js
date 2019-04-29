module.exports = {
  devServer: {
    proxy: {
      'api/*': {
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
      "authorization/*": {
        target: process.env.VUE_APP_API_URL,
        rewrite: { "^/authorization": "" },
        ws: true,
        changeOrigin: true
      }
    }
  }
};
