// 启动引用程序

/*
* 加载的模块
*/
let express = require('express');
let swig = require('swig');
let path = require('path');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');

// 创建app应用
let app = express();

app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  };
});


app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
swig.setDefaults({
  cache: false
});

app.engine('html', swig.renderFile);
app.set('views', './public');
app.set('view engine', 'html');

// app.get('/ function(req, res, next) {
//   res.render('index');
// })

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

mongoose.connect('mongodb://localhost:27017/blog', function(err) {
  if(err) {
    console.log(err);
    console.log('链接失败');
  } else {
    
    console.log('链接成功');

    // 监听
  }
    app.listen(80);
});


