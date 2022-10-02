const path = require('path');
const jwt = require('jsonwebtoken');
const {
  createUser,//生成新用户
  getUser,//获得用户
  updataById,//用户信息更改
  updataLoginTime,//更新登录时间
} = require(path.resolve(__dirname, '../service/user.service.js'))
const { JWT_SECRET } = require('../config/config.default')
class UserController {
  // 1. 注册
  async register(ctx, next) {
    // 1. 解析数据
    const { request: { body } } = ctx;
    let res = null;
    //2. 操作数据库
    try {
      res = await createUser(body);
    } catch (error) {
      ctx.cc(error.message, "注册失败",)
    }
    // console.log(res);
    //3. 返回结果 
    const data = {
      username: res.username
    }
    ctx.cc(data, "注册成功!", 200);
  }
  // 2. 登录
  async login(ctx, next) {
    //1. 获取用户信息
    const { request: { body } } = ctx;
    console.log(body);
    try {
      const res = await getUser(body)
      const { password, ...resUser } = res;//剔除 password
      const token = {
        token: jwt.sign(resUser, JWT_SECRET, {
          expiresIn: '12h' //过期时间 1天
        })
      }
      updataLoginTime(res);
      ctx.cc(token, "用户登录成功!", 200)
    } catch (err) {
      console.error("用户登录失败!" + err);
    }
  }
  // 3. 检查用户名是否可用
  async checkUsername(ctx, next) {
    ctx.cc("", "用户不存在!", 204)
    return;
  }
  // 4. 更改密码
  async changepassword(ctx, next) {
    //1. 获取字段
    const { state: { user: { id } } } = ctx;
    const { request: { body: { password } } } = ctx;
    //console.log(password);
    //2 .修改数据
    let res = null;
    let err = null;
    try {
      res = await updataById({ id, password })
    } catch (error) {
      err = error
      console.error(error);
    }
    //3 .返回结果
    if (res) return ctx.cc("", "修改成功!", 200)
    return ctx.cc(err, "修改失败!", 304)
  }

  // 5. 根据ID修改对用的lasttime
  async updateLastTimeByID(ctx, next) {
    //获得数据
    const { state: { user: { id } } } = ctx;
    const { request: { query: { lastTime } } } = ctx;//获得params参数
    let res = null;
    // console.log(lastTime);
    try {
      res = updataLoginTime({ lastTime, id })
    } catch (error) {
      console.error(error);
      return ctx.cc(error, "失败!", 401);
    }
    if (res) return ctx.cc("", "登录成功!", 200)
    return ctx.cc(err, "登录失败!", 304)
  }
  // 6. 修改用户信息
  async updateInfoByID(ctx, next) {
    const { request: { body } } = ctx;
    let res = null;
    try {
      res = updataById(body);
    } catch(error) {
      console.error("修改信息失败!",error);
    }
    if (res) return ctx.cc("", "修改成功!", 200)
    return ctx.cc(err, "修改失败!", 304)
  }

  // 7. 获取用户登录的 IP 地址
  async getIP(ctx, next) {
    ctx.cc('ok', 'ok', 200);
  }

}
module.exports = new UserController()