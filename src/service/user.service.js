const User = require('../model/usere.model')
class UserService {
  async createUser(obj) {
    let { username, password, id, age, address } = obj;
    console.log(obj);
    //操作数据库
    //插入数据
    const res = await User.create({
      username,
      password,
      id,
      age,
      address,
      admin: 0,
    })
    //返回 promise
    return res.dataValues
  }
  //检查用户名是否可用
  async getUser({ username }) {
    const res = await User.findOne({
      where: {
        username,
      }
    })
    //存在,直接返回,否则返回空
    return res ? res.dataValues : null
  }
  //登录,检查用户名和密码
  async getUserInfo({ username, password }) {
    const res = await User.findOne({
      where: {
        username,
        password,
      }
    })
    return res ? res.dataValues : null
  }
  //根据ID更新用户信息
  async updataById({ id, username, password, age, address }) {
    { id, username, password, age, address }
    const newUser = {}
    //添加
    username && Object.assign(newUser, { username })
    password && Object.assign(newUser, { password })
    age && Object.assign(newUser, { age })
    address && Object.assign(newUser, { address })
    age
    const res = await User.update(
      newUser,
      {
        where: {
          id,
        }
      }
    )
    // console.log(res);
    return res[0] > 0 ? true : false;
  }
  //更新 登录时间
  async updataLoginTime({ id, lastTime }) {
    console.log(id, lastTime);
    const res = await User.update(
      {
        lastTime,
        lastTime:new Date().toISOString()
      },
      {
        where: {
          id,
        }
      }
    )
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService();