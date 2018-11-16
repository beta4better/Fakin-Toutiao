/**
 * Created by Fakin on 2018/11/8.
 */
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy('/baidu', {
        target: "https://news.baidu.com/",
        pathRewrite: {'^/baidu': ''},
        changeOrigin: true
    }));

};