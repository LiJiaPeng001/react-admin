/*
* @Author: Rosen
* @Date:   2018-01-23 19:59:56
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 12:49:37
*/
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

const _mm   = new MUtil();
const _user = new User();

class NavTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username    : _mm.getStorage('userInfo').uname || '',
        }
    }
    componentDidMount(){
        if(this.state.uname){
            window.location.href = '/root/login';
        }
        _user.session().then(res=>{

        },err=>{
            
        })
    }
    // 退出登录
    onLogout(){
        _user.logout().then(res => {
            _mm.removeStorage('userInfo');
            window.location.href = '/root/login';
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    render(){
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>李小朋博客管理后台</b></Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javascript:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <Link to='/user-center'>
                                    <i className="fa fa-user fa-fw"></i>
                                    <span>个人中心</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/user-center/user-pass-update'>
                                    <i className="fa fa-wrench fa-fw"></i>
                                    <span>修改密码</span>
                                </Link>
                            </li>
                            <li>
                                <a onClick={() => {this.onLogout()}}>
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavTop;