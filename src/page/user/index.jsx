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


import './save.scss'
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
        return (
            <div id="page-wrapper">
                <PageTitle title='个人中心' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">用户名</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.uname}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">头像</label>
                        <div className="col-md-5">
                            <p className='detailList'>
                                <img src={detailList.pic} alt=""/>
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">名字</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.title}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">简介</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.subtitle}</p>
                        </div>
                    </div>
                    <div className='col-md-offset-2'>
                        <Link to='/user-center-update' className='btn'> 
                            <button type="button" className="btn btn-primary">编辑</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductSave;