/*
* @Author: Rosen
* @Date:   2018-01-23 22:54:28
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-31 14:21:22
*/
import swal         from 'sweetalert2'
import React        from 'react';

class MUtil extends React.Component{
    constructor(props){
        super(props);
    }
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type        : param.type        || 'get',
                url         : param.url         || '',
                dataType    : param.dataType    || 'json',
                data        : param.data        || null,
                success     : res => {
                    // 数据请求成功
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }
                    // 没有登录状态，强制登录
                    else if(10 === res.status){
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error       : err => {
                    typeof reject === 'function' && reject(err.statusText || err.msg);
                }
            });
        });  
    }
    // 跳转登录
    // +encodeURIComponent(window.location.pathname)
    doLogin(){
        location.replace('/root/#/login');
    }
    // 获取URL参数
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 成功提示
    successTips(successMsg){
        swal({
            title: '成功提示',
            text: successMsg || '操作成功~',
            type: 'success',
            showConfirmButton: true,
            confirmButtonText: '确认',
          })
    }
    // 错误提示
    errorTips(errMsg){
        swal({
            title: '错误提示',
            text: errMsg || '好像哪里不对了~',
            type: 'warning',
            showConfirmButton: true,
            confirmButtonText: '确认',
          })
    }
    //弹窗使用
    onAlert(msgList){
        if(msgList.input){
            return swal({
                title               : msgList.title || '确认操作',
                text                : msgList.text || '',
                type                : msgList.type || '',
                input               : msgList.input || 'text',
                showCancelButton    : msgList.showCance || true,
                showConfirmButton   : msgList.showConfirm || true,
                confirmButtonText   : msgList.confirmText || '确认',
                animation           : msgList.animation || "slide-from-top",
                cancelButtonText    : msgList.canceText || '取消',
                inputPlaceholder    : msgList.inputPlaceholder || "请输入",
              })
        }else{
            return swal({
                title               : msgList.title || '确认操作',
                text                : msgList.text || '',
                type                : msgList.type || '',
                showCancelButton    : msgList.showCance || true,
                showConfirmButton   : msgList.showConfirm || true,
                confirmButtonText   : msgList.confirmText || '确认',
                animation           : msgList.animation || "slide-from-top",
                cancelButtonText    : msgList.canceText || '取消',
              })
        }
        
    }
    // 本地存储
    setStorage(name, data){
        let dataType = typeof data;
        // json对象
        if(dataType === 'object'){
            window.localStorage.setItem(name, JSON.stringify(data));
        }
        // 基础类型
        else if(['number','string','boolean'].indexOf(dataType) >= 0){
            window.localStorage.setItem(name, data);
        }
        // 其他不支持的类型
        else{
            alert('该类型不能用于本地存储');
        }
    }
    // 取出本地存储内容
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }
        else{
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
    // 字段的验证，支持非空、手机、邮箱的判断
    validate(value,type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^[1][3,4,5,6,7,8][0-9]{9}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    }
}

export default MUtil;