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

import './save.scss';

const _mm       = new MUtil();
const _user     = new User();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id          : this.props.match.params.id,
            detailList  : []
        }
    }
    componentDidMount() {
        this.loadUser();
    }
    // 加载用户详情
    loadUser() {
        _user.getUserDetail(this.state.id)
            .then((res) => {
                this.setState({
                    detailList: res
                })
            }, (err) => {
                _mm.errorTips(err);
            })
    }
    render() {
        let detailList = this.state.detailList
        let time = new Date(detailList.createTime).toLocaleString();
        return (
            <div id="page-wrapper">
                <PageTitle title='用户详情' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户名</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.username}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">邮箱</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.email}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">地区</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.areaName?detailList.areaName:'暂无地区' }</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">手机</label>
                        <div className="col-md-3">
                            <p className='detailList'>{detailList.phone}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-3">
                            <p className='detailList'>{time}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductSave;