const Route = require('@koa/router');
const path = require('path');
const { 
  register, 
  login, 
  checkUsername,
  changepassword,
  getIP,
  updateLastTimeByID,
  updateInfoByID
} = require(path.resolve(__dirname, '../controller/user.controller.js'))
const {IPInfo} = require('../middleware/server.middleware')
const {
  register_schema,
  username_schema,
  cryptPassword,
  verifyLogin
} = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware');
//添加前缀 api
const routes = new Route({ prefix: '/api' });
//注册接口
routes.post('/register', username_schema, register_schema, cryptPassword, register)
//登录接口
routes.post('/login', verifyLogin, login)
//检查用户名是否存在
routes.post('/checkUsername', username_schema, checkUsername)

//修改密码等操作
routes.patch('/', auth,cryptPassword, changepassword)
//获得IP
routes.get('/ip',IPInfo,getIP)
//修改时间
routes.get('/updateLastTime',auth,updateLastTimeByID)
//根据 ID 修改信息
routes.patch('/updateInfo',auth,updateInfoByID)
module.exports = routes;