const { Sequelize } = require('sequelize')
const path = require('path');
const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB
} = require(path.resolve(__dirname,'../config/config.default.js'))
const seq = new Sequelize(
  MYSQL_DB,
  MYSQL_USER,
  MYSQL_PWD,
  {
    host: MYSQL_HOST,
    timezone: '+8:00',
    dialect: 'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  }
);
//测试
seq.authenticate().then(res => {
  console.log('数据库连接成功');
}).catch(err => {
  console.log('数据库连接失败');
})

module.exports = seq;