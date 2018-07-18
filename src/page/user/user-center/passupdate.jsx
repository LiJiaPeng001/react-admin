/*
* @Author: Rosen
* @Date:   2018-02-01 16:19:36
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 21:39:59
*/
import React        from 'react';
import MUtil        from 'util/mm.jsx'
import PageTitle    from 'component/page-title/index.jsx';
import User         from 'service/user-service.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import $ from 'jquery/dist/jquery.min.js';


import '../save.scss'
const _mm       = new MUtil();
const _user     = new User();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordOld     : '',
            passwordNew     : '',
            passwordNew2    : ''
        }
    }
    //获取输入的value
    onValueChange(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name] : value
        })
    }
    //验证表单
    onSubmit(){
        let list = {
            passwordOld           : $.trim(this.state.passwordOld),
            passwordNew           : $.trim(this.state.passwordNew),
            passwordNew2          : $.trim(this.state.passwordNew2),
        }
        var validateResult = this.formValidate(list);
        if(validateResult.status){
            delete list.passwordNew2;
            _user.resetPassword(list).then(res=>{
                _mm.removeStorage('userInfo');
                _mm.successTips('更改成功，请重新登录');
                this.props.history.push('/login');
            }, errMsg=>{
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips(validateResult.msg)
        }
    }
    // 表单字段的验证
    formValidate(formData) {
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证旧密码
        if (!_mm.validate(formData.passwordOld, 'require')) {
            result.msg = '旧密码不能为空';
            return result;
        }
        // 验证新密码是否为空
        if (formData.passwordNew.length<6 || formData.passwordNew.length>25) {
            result.msg = '新密码不能为空并且为6位以上25位以下';
            return result;
        }
        // 验证两次密码是否为相同
        if (this.state.passwordNew2 !== this.state.passwordNew) {
            result.msg = '两次密码不相同';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title='修改密码' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">旧密码</label>
                        <div className="col-md-5">
                        <input 
                                name='passwordOld' 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">新密码</label>
                        <div className="col-md-5">
                            <input 
                                name='passwordNew' 
                                type="text" 
                                className="form-control"  
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">确认密码</label>
                        <div className="col-md-5">
                            <input  
                                name='passwordNew2' 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className='col-md-offset-2'>
                        <button type="button" className="btn btn-primary" onClick={e=>{this.onSubmit()}}>提交</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductSave;