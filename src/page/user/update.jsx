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


import './save.scss'
const _mm       = new MUtil();
const _user     = new User();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailList  : [],
            phone       : '',
            email       : '',
            question    : '',
            answer      : '',
        }
    }
    componentDidMount() {
        this.loadUser();
    }
    // 加载用户详情
    loadUser() {
        this.setState(_mm.getStorage('userInfo'))
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
            phone           : $.trim(this.state.phone),
            email           : $.trim(this.state.email),
            question        : $.trim(this.state.question),
            answer          : $.trim(this.state.answer),
        }
        var validateResult = this.formValidate(list);
        if(validateResult.status){
            _user.updateUserInfo(list).then(res=>{
                _mm.removeStorage('userInfo');
                _mm.successTips('修改成功，请重新登录');
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
        // 验证手机号
        if (!_mm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if (!_mm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if (!_mm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if (!_mm.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
    render() {
        // let time = new Date(detailList.createTime).toLocaleString();
        return (
            <div id="page-wrapper">
                <PageTitle title='个人信息编辑' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户名</label>
                        <div className="col-md-5">
                            <p className='detailList'>{this.state.username}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">电话</label>
                        <div className="col-md-5">
                            <input 
                                name='phone' 
                                type="number" 
                                className="form-control" 
                                value={this.state.phone} 
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">邮箱</label>
                        <div className="col-md-5">
                            <input  
                                name='email' 
                                type="email" 
                                className="form-control" 
                                value={this.state.email} 
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">问题</label>
                        <div className="col-md-5">
                            <input  
                                name='question' 
                                type="text" 
                                className="form-control" 
                                value={this.state.question} 
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">答案</label>
                        <div className="col-md-5">
                            <input  
                                name='answer' 
                                type="text" 
                                className="form-control" 
                                value={this.state.answer} 
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