const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')//获得私钥
const auth = async (ctx, next) => {
  //响应头获得信息
  let { request: { header: { authorization } } } = ctx;
  //console.log(authorization);
  if(!authorization) return ctx.cc('', '无效的token!',403);
  authorization = authorization.replace('Bearer ','');//替换 Bearer 头
  try {
    const user = jwt.verify(authorization, JWT_SECRET)
    ctx.state.user = user;
  } catch (error) {
    //根据error判断
    switch (error.name) {
      case 'TokenExpiredError':
        return ctx.cc('', 'token过期!',403);
      case 'JsonWebTokenError':
        return ctx.cc('', '无效的token!',403);
      default:
        break;
    }

  }
  await next();
}

module.exports = {
  auth
}