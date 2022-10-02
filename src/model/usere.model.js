const { DataTypes } = require('sequelize')

const seq = require('../db/seq')
// 创建模型
/**
 * User 模型名称
 */
const User = seq.define('my_users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,//唯一
    comment: '用户名唯一',//表的注释
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '密码'
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    commit: "是否为管理员",
    allowNull: false
  },
  id: {
    type: DataTypes.STRING,
    unique: true,//唯一
    primaryKey: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    commit: "地址",
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    commit: "年龄",
  },
  lastTime: {
    type: DataTypes.DATE,
    allowNull: true,
    commit: "登录时间",
  }
}, {
  timestamps: false
})
// 更新数据表
User.sync({
  alter:true//存在表,更新重建
})
// User.sync({
//    force: true,//存在表,删除并且重建
// })

module.exports = User