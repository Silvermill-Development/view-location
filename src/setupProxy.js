const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://116.12.80.10:8080', // Change this to your backend server URL
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/traceFilling/api', // Optional: If your API endpoints have a base path
      },
    })
  );
};
