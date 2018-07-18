/*
* @Author: Rosen
* @Date:   2018-02-01 16:19:36
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 21:39:59
*/
import React        from 'react';
import {Link}       from 'react-router-dom'
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
            detailList  : []
        }
    }
    componentDidMount() {
        this.loadUser();
    }
    // 加载用户详情
    loadUser() {
        this.setState({
            detailList : _mm.getStorage('userInfo')
        })
    }
    render() {
        let detailList = this.state.detailList
        // let time = new Date(detailList.createTime).toLocaleString();
        return (
            <div id="page-wrapper">
                <PageTitle title='个人中心' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户名</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.username}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">电话</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.phone}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">邮箱</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.email}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">问题</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.question}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">答案</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.answer}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">地区</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.areaName}</p>
                        </div>
                    </div>
                    <div className='col-md-offset-2'>
                        <Link to='/user-center/user-center-update' className='btn'> 
                            <button type="button" className="btn btn-primary">编辑</button>
                        </Link>
                        <Link to='/user-center/user-pass-update'> 
                            <button type="button" className="btn btn-primary">修改密码</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductSave;