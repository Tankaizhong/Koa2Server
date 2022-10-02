//业务相关的
const Koa = require('koa');//是一个对象
const app = new Koa();//实例化对象
const path = require('path');
const cors = require('@koa/cors');//跨域
app.use(cors());
//解析表单
const KoaBody = require('koa-body');
const { resolve } = require('path');
app.use(KoaBody());//注册全局中间件


//使用错误级别中间件
const { errorMiddleware } = require('../middleware/user.middleware')
app.use(errorMiddleware)

//加载 user 路由  
const userRoute = require(path.resolve(__dirname, '../router/user.router.js'));
//注册 user 路由
app.use(userRoute.routes());

module.exports = app;//暴露 app