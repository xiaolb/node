
let express = require('express');

let router = express.Router();
// let bodyParser = require('body-parser');

let User = require('../modal/user');
let Project = require('../modal/project');

let responseData;

router.use(function(req, res, next) {
  responseData = {
    code: 0,
    message:''
  }
  next();
})

// let urlencodedParser = bodyParser.urlencoded({ extended: true })

// router.post('/user/login', urlencodedParser, function(req, res) {
router.post('/user/register', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;
  console.log(req.body)

  if (username === '' || password === '') {
    responseData.code = '1';
    responseData.message = '用户名密码不能为空';

    res.json(responseData);
    return 
  }

  if (confirmPassword !== password) {
    responseData.code = 1;
    responseData.message = '两次密码不一致';
    res.json(responseData);
    return 
  }
  
  User.findOne({
    username: username
  }).then(function(userInfo) {
    if(userInfo) {
      responseData.code = 2;
      responseData.message = "用户名已存在";
      res.json(responseData);
      return
    }

    let user = new User({
      username,
      password
    })
    return user.save();
  }).then(function(newuserInfo) {
    console.log(newuserInfo);
    responseData.message = '注册成功';
    res.json(responseData);
  })
})

router.post('/user/login', function(req, res) {
  console.log('req.body', req.body);
  let username = req.body.username;
  let password = req.body.password;

  if (username === '' || password === '') {
    responseData.code = '1';
    responseData.message = '用户名密码不能为空';

    res.json(responseData);
    return 
  }
  User.findOne({
    username,
  }).then(function(loginUserInfo) {
    if(loginUserInfo) {
      User.findOne({
        username,
        password
      }).then(function(loginPwdUserInfo) {
        console.log(loginPwdUserInfo);
        User.findOne()
        if(loginPwdUserInfo) {
          responseData.code = 0;
          responseData.message = '登录成功';
          res.json(responseData);
          return;
        } else {
          responseData.code = 2;
          responseData.message = '用户名密码错误';
          res.json(responseData);
          return;
        }
      });
    } else {
      responseData.code = 3;
      responseData.message = '用户名不存在，请先注册';

      res.json(responseData);
      return;
    }
  })
})

router.post('/user/show', function(req, res) {
  User.find().then((result) => {
    responseData.code = 0;
    responseData.message = '获取数据成功';
    responseData.resultData = result;
    res.json(responseData);
    return;
  })
})


module.exports = router;