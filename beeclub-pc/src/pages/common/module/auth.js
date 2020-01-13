import authTpl from '../template/auth.tpl.html';
import { renderTpl, getFormData, setCookie } from 'util/bee.js';
import http from 'util/http.js';
import qs from 'qs';

//初始化事件
const userSign = $('#USER_SIGN');


userSign.on('click', '.auth-sign-btn', function(){
    //切换到登录
    var el = $(this);
    if(el.is('.active')){
        return;
    }
    var data = {
        signIn: true,
        signInType:"accountPwd"  //email | accountPwd | mobile
    };
    var signInBtn = userSign.find('.auth-sign-btn.auth-sign-in'),
    signUpBtn =  userSign.find('.auth-sign-btn.auth-sign-up'),
    signUpContainer = userSign.find('.auth-container.auth-sign-up-wrapper'),
    signInContainer = userSign.find('.auth-container.auth-sign-in-wrapper');
    if(el.is('.auth-sign-in')){//登录
        signUpBtn.removeClass('active');
        signUpContainer.removeClass('active');
        signInBtn.addClass('active');
        signInContainer.addClass('active');
    }else{//注册
        signInBtn.removeClass('active');
        signInContainer.removeClass('active');
        signUpBtn.addClass('active');
        signUpContainer.addClass('active');
    }
}).on('click', '.auth-header-close', function(){
    console.log(1)
    userSign.empty();
}).on('click','.auth-confirm-btn--signUp', function(){
    
}).on('click','.auth-confirm-btn--signIn', function(){
    var signInType = userSign.data('signInType');
    var data = getFormData(userSign.find('.sign-in-block-wrapper.' + signInType));
    data.signInType = signInType;
    if(signInType== 'accountPwd'){
        if(!data.account || !data.password){
            layer.msg('账号密码不能为空');
            return;
        }
        http.post('/sign-in',qs.stringify(data)).then(res => {
            if(res.code == 0){
                setCookie('token', res.data);
                layer.msg('登录成功');
                window.location.reload();
            }
        }).catch(error => {
            console.log(error)
        })
    }
    console.log(data);
}).on('click','.auth-send-authcode-btn', function(){
    //发送验证码
});

/**
 * 
 * @param {*} data 
 */
export function sign(data){
    userSign.html(renderTpl(authTpl, data));
    if(!data.signInType){
        data.signInType = 'accountPwd';
    }
    userSign.data('signInType',data.signInType);
}

// 
    // $('#USER_AUTH').html();
    //
