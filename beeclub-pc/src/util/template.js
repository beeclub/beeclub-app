import Hogan from 'hogan.js';

console.log(Hogan)
export const renderHtml = function(template, data){
    var resTemplate = Hogan.compile(template);
    return resTemplate.render(data);
}

export const userInfo = function(data){
    console.log(data)
    var str = '<div class="">\
        <a href="javascript:;" class="header-userinfo-a">\
            <span>{{username}}</span>\
            <img class="header-avatar" src="{{{avatar}}}" width="34" height="34">\
        </a>\
        <div class="user-operation-wrapper"><div class="user-operation-main">\
        <a class="user-operation-item"><i class="fa fa-cog fa-flag"></i>&nbsp; 我的课程</a>\
        <a class="user-operation-item"><i class="fa fa-cog fa-list-ul"></i>&nbsp; 订单中心</a>\
        <a class="user-operation-item" href="/user/index.html"><i class="fa fa-cog fa-fw"></i>&nbsp; 个人设置</a>\
        </div>\
        <div class="div-line-h"></div>\
        <div class="user-operation-main"><a href="javascript:;" class="logout-btn"><i class="fa fa-power-off"></i>&nbsp; 注销</a></div>\
        </div>\
    </div>';
    return renderHtml(str, data);
}


export const dialog = function(option){
    var body = option.body;
    $.extend({title:'标题', width:'50%'}, option, true);
    var str = '<div class="modal-wrapper">\
        <div class="dialog-wrapper" style="width:{{width}}">\
            <div class="dialog-header">\
                <span class="dialog-title">{{title}}</span>\
                <span class="dialog-close"><i class="fa fa-close"></i></span>\
            </div>\
            <div class="div-line-h" style="margin-top:0;"></div>\
            <div class="dialog-body">\
            </div>'
            + (option.btn && option.btn.length?
             '<div class="dialog-footer">\
                <div class="div-line-h"></div>\
                <div></div>\
            </div>' : '')
        '</div>\
    </div>';
    var res = renderHtml(str,option);
    var dialog = $(res);
    var bodyObj = dialog.find('.dialog-body');
    if(body && typeof body === 'object'){
        bodyObj.append(body);
    }
    bodyObj.html(body || ' ');

    dialog.on('click','.dialog-close', function(){
        var el = $(this);
        el.parent().parent().parent().remove();
    });
    $('body').append(dialog);
    return dialog;
}

export const applyLecturerStep = function(data){

    //is-finish
    //is-process
    //is-wait
    // var status = {
    //     1: [],
    //     2:[],
    //     3:[]
    // };
    var step = data.step || 1;
    var stepFun = function(st){
        if(st == step){
            return 'is-process';
        }else if(st > step){
            return 'is-wait';
        }else{
            return 'is-finish';
        }
    }
    var str = '<div><div class="el-steps el-steps--horizontal">\
        <div class="el-step is-horizontal" style="flex-basis: 750px; margin-right: 0px;">\
            <div class="el-step__head '+
            stepFun(1)
            +'">\
                <div class="el-step__line" style="margin-right: 0px;"><i class="el-step__line-inner"\
                        style="transition-delay: 0ms; border-width: 0px; width: 0%;"></i></div>\
                <div class="el-step__icon is-text">\
                    <div class="el-step__icon-inner">1</div>\
                </div>\
            </div>\
            <div class="el-step__main">\
                <div class="el-step__title '+ stepFun(1) +'">提交审核</div>\
            </div>\
        </div>\
        <div class="el-step is-horizontal" style="flex-basis: 750px; margin-right: 0px;">\
            <div class="el-step__head '+ stepFun(2) +'">\
                <div class="el-step__line" style="margin-right: 0px;"><i class="el-step__line-inner"\
                        style="transition-delay: -150ms; border-width: 0px; width: 0%;"></i></div>\
                <div class="el-step__icon is-text">\
                   <div class="el-step__icon-inner">2</div>\
                </div>\
            </div>\
            <div class="el-step__main">\
                <div class="el-step__title '+ stepFun(2) +'">完善个人信息</div>\
            </div>\
        </div>\
        <div class="el-step is-horizontal" style="flex-basis: 750px; max-width: 33.3333%;">\
            <div class="el-step__head '+ stepFun(3) +'">\
                <div class="el-step__line"><i class="el-step__line-inner"></i></div>\
                <div class="el-step__icon is-text">\
                    <!---->\
                    <div class="el-step__icon-inner">3</div>\
                </div>\
            </div>\
            <div class="el-step__main">\
                <div class="el-step__title '+ stepFun(3) +'">完成</div>\
            </div>\
        </div>\
    </div><div class="apply-lecturer-item-wrapper">'+ applyLecturerStep1({}) +'</div></div>';
    return str;
}

function applyLecturerStep1(data){
    var str  = 
    '<div class="demo-form applayLecturerStep1">\
        <div class="el-form-item"><label class="el-form-item__label" style="width: 80px;">电话号码</label>\
            <div class="el-form-item__content" style="margin-left: 80px;">\
                <div class="el-input">\
                    <input type="text" name="mobile" autocomplete="off" style="width: 240px;" class="el-input__inner">\
                </div>\
            </div>\
        </div>\
        <div class="el-form-item"><label class="el-form-item__label" style="width: 80px;">验证码</label>\
            <div class="el-form-item__content" style="margin-left: 80px;">\
                <div class="el-input">\
                    <input type="text" name="verifyCode" autocomplete="off" style="width: 120px;" class="el-input__inner ">\
                    <button type="button"\
                        class="el-button el-button--primary el-button--small apply-verifyCode" style="margin-left:18px;"><span>发送验证码</span></button>\
                </div>\
            </div>\
        </div>\
        <div class="el-form-item"><label class="el-form-item__label" style="width: 80px;">姓名</label>\
            <div class="el-form-item__content" style="margin-left: 80px;">\
                <div class="el-input">\
                    <input type="text" name="name" autocomplete="off" style="width: 240px;" class="el-input__inner ">\
                </div>\
            </div>\
        </div>\
        <div class="el-form-item"><label class="el-form-item__label" style="width: 80px;">身份证号</label>\
            <div class="el-form-item__content" style="margin-left: 80px;">\
                <div class="el-input">\
                    <input name="idCard" type="text" autocomplete="off" class="el-input__inner ">\
                </div>\
            </div>\
        </div>\
        <div class="el-form-item"><label class="el-form-item__label" style="width: 80px;">申请自述</label>\
            <div class="el-form-item__content" style="margin-left: 80px;">\
                <div class="el-textarea">\
                    <textarea name="readme" autocomplete="off" class="el-textarea__inner" style="min-height: 33px;"></textarea>\
                </div>\
            </div>\
        </div>\
        <div class="el-form-item">\
            <div class="el-form-item__content" style="margin-left: 80px;">\
                <div class="el-textarea" style="text-align: right;padding-top:20px; padding-right:30px">\
                    <button type="button" class="el-button el-button--primary"><span>发起申请</span></button>\
                </div>\
            </div>\
        </div>\
    </div>';
    return renderHtml(str, data);
}