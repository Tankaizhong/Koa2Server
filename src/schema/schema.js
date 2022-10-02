//验证模块
const Joi = require('joi');
const username = Joi.string().required();//用户名
const password = Joi.string().required();//密码规则
const register = Joi.object().keys({
  username,
  password,
  id: Joi.required(),
})
const name = Joi.object().keys({
  // username: Joi.string().required(),
  username,
})
const login = Joi.object().keys({
  // username: Joi.string().required(),
  username,
  password,
})
//注册验证
function registerSchema(obj) {
  try {
    //验证
    var res = register.validate(obj, {
      // 允许验证被对象包含没有定义校验规则的未知字段，否则会认为被校验数据不通过
      allowUnknown: true
    })
  } catch (error) {
    // console.error(error);
    return error;
  }
  return res
}
//用户名
function usernameSchema(obj) {
  try {
    var res = name.validate(obj,{allowUnknown:true})
  } catch (err) {
    return err;
  }
  return res;
}
//登录验证

function loginSchema(obj) {
  let res = login.validate(obj)
  return res;
}
exports.usernameSchema = usernameSchema
exports.registerSchema = registerSchema
exports.loginSchema = loginSchema
