
'use strict';
import hogan from 'hogan.js';
const config = {
	serverHost: 'http://127.0.0.1:8088'
};
const token = '';

var _bee = {
	renderHtml:function(html, data){
		var htmlTemplate = hogan.compile(html);
		return htmlTemplate.render(data);
	},
	ajax: function(param){
		console.log( _bee.getToken())
		$.ajax({
			type: param.type || 'get',
			url: _bee.getServerPath(param.url), // ,//||'',
			dataType: param.dataType ||'json',
			contentType: "application/json",
			data: param.data || {},
			headers: { Authorization: _bee.getToken() },
			// crossDomain: true,
			async: param.async || true,
			success: function(res){
				console.log(res)
				if(res.code === 401){
					//需要登录
					//_bee.doLogin(1);
					return;
				}else if(res.code === -1){
					//服务器错诶
					layer.msg(res.msg);
				}
				param.success && typeof param.success === 'function' && param.success(res);
			},
			error: function (err) {
				console.log(err);
				layer.msg('系统忙，请稍后重试');
				param.error && typeof param.error === 'function' && param.error();
			}
		})
	},
	/**
	 * 
	 * @param {*} redirect 
	 * @param {*} type 1 跳转 2弹出框模式
	 */
	doLogin: function(type,redirect){
		switch(type){
			case 1:
				window.location.href = '/login.html?redirect=' + encodeURIComponent(redirect || window.location.href);
			break;
			case 2:

			break;
			default:

			break;
		}
	},
	login: function(data){
		//登陆之后要跳转的地址
		// var redirect = encodeURIComponent(_bee.getUrlParam('redirect') || '/index.html');
		// console.log(redirect)
		$.ajax({
			url: _bee.getServerPath('/sign-in'),
			type: 'POST',
			async: false,
			data: data,
			success: function(res){
				if(res.code == 0){
					console.log(res)
					_bee.setToke(res.data);
					setTimeout(function(){
						layer.msg("登陆成功",{offset: 't'});
						window.location.href = '/index.html';
					},1000);
				}else{
					layer.msg(res.msg,{icon: 2});
				}
			},
			error: function(req,error){
				console.log("error: =====> ")
				console.log(error)
				console.log(req)
				layer.msg("登陆服务错误，请过段时间重试");
				// layer.msg("登陆服务错误，请过段时间重试",{icon: 5,offset: 't'});
				// layer.msg("登陆服务错误，请重试",{icon: 1}); 对号
				// layer.msg("登陆服务错误，请重试2",{icon: 2}); X
				// layer.msg("登陆服务错误，请重试3",{icon: 3}); 问好
				// layer.msg("登陆服务错误，请重试4",{icon: 4});锁定
				// layer.msg("登陆服务错误，请重试5",{icon: 5}); 难过
				// layer.msg("登陆服务错误，请重试6",{icon: 6}); 笑脸
				// layer.msg("登陆服务错误，请重试0",{icon: 0});感叹
			}
		});
	},
	signUp: function(data, dialog){
		var flag = false;
		$.ajax({
			url: _bee.getServerPath('/sign-up'),
			type: 'POST',
			async: false,
			data: data,
			success: function(res){
				console.log(res)
				if(res.code == 0){
					
					flag = true;
				}else{
					layer.msg(res.msg);
				}
			}
		});
		return flag;
	},
	getServerPath: function(path){
		return config.serverHost + path;
	},
	getUrlParam:function(name){
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) :null;
	},

	info: function(msg, type){
		alert(msg);
	},
	goHome: function(){
		window.location.href = '/index.html';
	},
	getLocalStorageValue : function(name){
		return window.localStorage.getItem(name);
	},
	setLocalStorage: function(name, value){
		window.localStorage.setItem(name, value);
	},
	removeLocalStorage: function(name){
		window.localStorage.removeItem(name);
	},
	setToke: function(token){
		_bee.setLocalStorage('token', token);
	},
	removeToken: function(){
		window.localStorage.removeItem('token');
	},
	getToken: function(){
		return _bee.getLocalStorageValue('token');
	},
	getUserInfo: function(){
		return _bee.getLocalStorageValue('USERINFO');
	},
	getRequest: function(){
		var url = location.search;
		var theRequest = new Object();
		if(url.indexOf("?") != -1){
			var str = url.substr(1);
			var strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) {
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	},
	baseService: function(type, id, provider){
		var resData = null;
		$.ajax({
			url: getServerPath("/common/baseService"),
			type:'GET',
			contentType: "application/json",
			data: {type: type, id: id, provider: provider},
			crossDomain: true,
			async: false,
			success: function(res){
				console.log(res)
				resData = res;
			},
			error: function(error){
				resData = [];
			}
		});
		return resData;
	},
	formData: function(form){
		if(!form){
			return null;
		}
		var data = [];
		form.find('input[name],textarea[name]').each(function(i, v){
			var el = $(this), val = $.trim(el.val());
			if(val){
				data[el.attr('name')] = val
			}
		});
		return data;
	},
	checkData: function(data, rule){
		for(var name in rule){
			if(!_bee.ruleCheck(rule[name].title,data[name], rule[name].rules)){
				return false;
			}
		}
		return true;
	},
	ruleCheck: function(title,val,rules){
		// rule   notNull  mobile email number float size 
		//{name:'',title:'',rule:[{type:'',val:''}]}

		for(var rule of rules){
			switch (rule.type) {
				case 'required':
					if(!val){
						layer.msg(title + '为必填项');
						return false;
					}
					break;
				case 'mobile':
					if(!(/^1[3456789]\d{9}$/.test(val))){
						layer.msg(title + '不适合法的手机号码');
						return false;
					}
					break;
				case 'idCard':
					if(!(/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val))){
						layer.msg(title + '不适合法的身份证号码');
						return false;
					}
					break;
				case 'length':
					if(rule.minLength){
						if(val.length < rule.minLength){
							layer.msg(title + '至少' + rule.minLength + '个字');
							return false;
						}
						if(val.length < rule.maxLength){
							layer.msg(title + '最多' + rule.maxLength + '个字');
							return false;
						}
					}
				default:
					break;
			}
		}
		return true;
	}
};

export default _bee;
