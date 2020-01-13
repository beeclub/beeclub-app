// import bee from 'util/bee.js';

// var page = {
//     init : function(){
//         this.attachEvent();
//     },
//     attachEvent: function(){
//         var that = this;
//         var isClick = false;
//         $('#page-login-btn').click(function(){
//             if(isClick){
//                 return;
//             } 
//             isClick = true;
//             var data = {
//                 username: $.trim($('#sign-in-wrap input[name=email]').val()),
//                 password: $.trim($('#sign-in-wrap input[name=password]').val()),
//                 remember: $('#sign-in-wrap input[name=remember]')[0].checked
//             };
//             if(!data.username || !data.password){
//                 alert('邮箱与密码不能为空。');
//                 isClick = false;
//                 return;
//             }
//             bee.login(data);
//             setTimeout(function(){
//                 isClick = false;
//             },2000);
//         });
//     }
// };

// $(function(){
//     page.init();
// });

