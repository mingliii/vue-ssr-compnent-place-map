module.exports = {
  devServer: {
    proxy: {
      '^/graphql': {
        target: 'https://www.nationaltrust.org.uk/apps/search/api/graphql',
        ws: true,
        changeOrigin: true,
        secure: true,
      },
    },
    port: 3000,
  }
}