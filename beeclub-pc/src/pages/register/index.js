// import bee from 'util/bee.js';

// var page = {
//     init: function(){
//         this.attachEvent();
//     },
//     attachEvent: function(){
//         var click = false;
//         $('#page-register-btn').click(function(){
//             if(click){
//                 return;
//             }
//             click = true;
//             var data = {
//                 email: $.trim($('#sign-up-wrap input[name=register_email]').val()),
//                 password: $.trim($('#sign-up-wrap input[name=register_password]').val()),
//                 // conPassword: $.trim($('#sign-up-wrap input[name=register_com_password]').val()),
//                 authCode: $.trim($('#sign-up-wrap input[name=register_auth_code]').val())
//             };
//             if(!data.email || !data.password){
//                 layer.msg('手机号与密码不能为空');
//                 click = false;
//                 return false;
//             }
//             if(!data.authCode){
//                 layer.msg('验证码不能为空。');
//                 click = false;
//                 return false;
//             }
//             var flag = bee.signUp(data);
//             if(flag){
//                 layer.msg('注册成功,3s后进入登陆页面');
//                 setTimeout(function(){
//                     window.location.href = '/login.html';
//                 },3000);
//             }else{
//                 setTimeout(function(){
//                     click = false;
//                 },2000);
//             }
//         });

//         var authInterval = null;
//         var timeInterval = 60;
//         $('.sign-send-auth-code').click(function(){
//             var email = $.trim($('#sign-up-wrap input[name=register_email]').val());
//             console.log(email)
//             if(!email){
//                 layer.msg('请先输入邮箱');
//                 return;
//             };
//             var _this = $(this);
//             _this.attr('disabled','disabled');

//             var flag = true;
//             $.ajax({
//                 url: bee.getServerPath('sendCodeToEmailForSignUp'),
//                 async: false,
//                 data: {
//                     email: email
//                 },
//                 success: function(res){
//                     if(res.code != 0){
//                         layer.msg(res.msg);
//                         flag = false;
//                     }
//                 },
//                 error: function(error){
//                     layer.msg(error);
//                     flag = false;
//                 }
//             })
//             if(!flag){
//                 _this.removeAttr('disabled');
//                 return;
//             }

//             layer.msg('验证码发送成功，60秒后可再次发送');
//             _this.val(timeInterval-- + 's后再发送');
//             authInterval = setInterval(function(){
//                 console.log(timeInterval)
//                 _this.val(timeInterval-- + 's后再发送');
//                 if(timeInterval == -1){
//                     timeInterval = 60;
//                     clearInterval(authInterval);
//                     _this.removeAttr('disabled');
//                     _this.val('发送验证码');
//                 }
//             }, 1000);
//         })

//     }
// };

// $(function(){
//     page.init();
// });