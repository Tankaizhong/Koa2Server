const bcrypt = require('bcryptjs')
const {
  registerSchema,
  usernameSchema,
  loginSchema
} = require('../schema/schema');
const { getUser } = require('../service/user.service');
//错误处理中间件
const errorMiddleware = async (ctx, next) => {
  ctx.cc = function (data, message, status = 1) {
    return new Promise((resolve, reject) => {
      ctx.body = {
        status,
        message,
        data,
      }
      resolve()
    })
  }
  await next()
}
//加密中间件
const cryptPassword = async (ctx, next) => {
  const { request: { body: { password } } } = ctx;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash // 加密
  await next();
}
//验证注册规则中间件
const register_schema = async (ctx, next) => {
  const { request: { body } } = ctx;
  const res = await registerSchema(body);
  if (res.error)
    return ctx.cc(res.error.details[0].message, "数据验证失败!");
  await next();
}
//验证用户名
const username_schema = async (ctx, next) => {
  const { request: { body } } = ctx;
  let res = usernameSchema(body);
  // console.log(res);
  if (res.error)
    return ctx.cc(res.error.details[0].message, "数据验证失败!");
  res = await getUser(body)
  // console.log(res);
  if (res)
    return ctx.cc("", "用户存在!", 409)
  await next();
}
//用户登录
const verifyLogin = async (ctx, next) => {
  const { request: { body } } = ctx;
  console.log(body);
  let res = loginSchema(body);
  if (res.error)
    return ctx.cc(res.error.details[0].message, "数据验证失败!");
  //调佣数据
  try {
    res = await getUser(body)
    if (!res)
      return ctx.cc("", "用户未注册!");
  } catch (error) {
    console.error(error);//记录错误
    return ctx.cc(error, "注册失败!");
  }
  //是否匹配
  if (!bcrypt.compareSync(body.password, res.password)) {
    return ctx.cc('', '密码错误!');
  }
  await next()
}

module.exports = {
  errorMiddleware,
  cryptPassword,
  username_schema,
  register_schema,
  verifyLogin,
}