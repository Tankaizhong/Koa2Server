const path = require('path');
const {APP_PORT} = require(path.resolve(__dirname,'config/config.default.js'));
const app = require(path.resolve(__dirname,'app/index.js'));

app.listen(APP_PORT, () => {
  console.log(`Server run at http://localhost:${APP_PORT}`);
})