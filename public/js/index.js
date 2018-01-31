$(function() {
  let $formregister = $('#form_register');
  let $formlogin = $('#form_login');
  let $aleardlyLogin = $('.aleardlyLogin');
  let $errorExplain = $('.errorExplain');

  $formregister.find('button').on('click', function() {
    let username = $('#form_register .username').val();
    let password = $('#form_register .password').val();
    let confirmPassword = $('#form_register .confirmPassword').val();
    $.ajax({
      method: 'POST',
      url: 'api/user/register',
      data:{
        username,
        password,
        confirmPassword
      },
      dataType: 'json',
      success: function(result) {
        if(!result.code) {
          setTimeout(function() {
            $formregister.hide();
            $formlogin.show();
            $errorExplain.hide();
            $aleardlyLogin.hide()
          }, 1000);
        } else {
          $errorExplain.show();
          $errorExplain.html(result.message);
        }
      }
    })
  })

  $formregister.find('input').on('focus', function() {
    $errorExplain.hide();
  })
  $formlogin.find('.btnRegister').on('click', function() {
    $formregister.show();
    $formlogin.hide();
  });

  $formlogin.find('button').on('click', function() {
    let username = $('#form_login .username').val();
    let password = $('#form_login .password').val();
    $.ajax({
      method: 'POST',
      url: 'api/user/login',
      data:{
        username,
        password
      },
      dataType: 'json',
      success: function(result) {
        console.log(result);
        if(!result.code) {
          $formregister.hide();
          $formlogin.hide();
          $aleardlyLogin.show();
          gain();
        } else {
          $errorExplain.show();
          $errorExplain.html(result.message);
        }
      }
    })
  })

  function gain() {
    $.ajax({
      method: 'POST',
      url: 'api/user/show',
      data:{},
      dataType: 'json',
      success: function(result) {
        if(result.code === 0) {
          let data = result.resultData;
          data.map((value) => {
            console.log(value)
             $aleardlyLogin.append(
              `<div>
                <div>${value._id}</div>
                <div>${value.username}</div> 
                <div>${value.password}</div>
              </div>`
            )
          })
        }
      }
    })
  }
})