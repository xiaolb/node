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

mongoose.connect('mongodb://172.30.6.14:27017/blog', function(err) {
  if(err) {
    console.log(err);
    console.log('链接失败');
  } else {
    
    console.log('链接成功');

    // 监听
    app.listen(8090);
  }
});


