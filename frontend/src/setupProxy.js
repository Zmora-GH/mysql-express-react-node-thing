const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
app.use(createProxyMiddleware("/api", {
  "target": "http://127.0.0.1:6666",
  "secure": false,
  "changeOrigin": true,
  "headers": {
      "Connection": "keep-alive"
    },
}))
}
