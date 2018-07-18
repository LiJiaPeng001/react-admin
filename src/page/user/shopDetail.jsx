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
        _user.getShopDetail(this.state.id)
            .then((res) => {
                this.setState({
                    detailList: res
                })
            }, (err) => {
                _mm.errorTips(err);
            })
    }
    render() {
        let detailList = this.state.detailList;
        let license = [];
        if(detailList.license && detailList.license.indexOf(',')==-1){
            license.push(detailList.license);
        }else if(detailList.license && detailList.license.indexOf(',')>-1){
            license = detailList.license.split(',');
        }
        return (
            <div id="page-wrapper">
                <PageTitle title='商铺详情' />
                {
                    detailList.shopType == 1 ?
                    <div>
                    <div className="form-horizontal">                       
                        <div className="form-group">
                            <label className="col-md-2 control-label">公司名称</label>
                            <div className="col-md-5">
                                <p className='detailList'>{detailList.companyName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-md-2 control-label">组织机构证件号</label>
                            <div className="col-md-5">
                                <p className='detailList'>{detailList.organizationCode}</p>
                            </div>
                        </div>
                    </div></div> : ''
                }
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商铺名称</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.shopName}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">地区</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.areaName}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">详细地址</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.site}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">法人姓名</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.person}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">法人证件号码</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.personNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商铺电话</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.companyPhone}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">银行许可证件号</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.bankLicence}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">银行卡号</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.bankId}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">阿里账号</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.alipayName}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">阿里姓名</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.alipayId}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">营业执照</label>
                        <div className="col-md-5">
                            <p className='detailList'>
                                {
                                    license.map((v,i)=>{
                                        return <img src={v} key={i} onClick={e=>{this.getSeeImg(e)}}/>
                                    })
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">营业执照注册号</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.licenseNumber}</p>
                        </div>
                    </div>
                </div>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">经营范围</label>
                        <div className="col-md-5">
                            <p className='detailList'>{detailList.businessScope}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-offset-2'>
                {
                    detailList.state == 0 ? (
                        <div>
                    <button type="button" className="btn btn-success" onClick={e => { this.onSubmit({shopInfoId:detailList.id,state:1}) }}>通过</button><button type="button" className="btn btn-danger" onClick={e => { this.onSubmit({shopInfoId:detailList.id,state:2}) }}>不通过</button></div> ) 
                    : detailList.state == 1 ? (<p>审核通过未交保证金</p>) :  detailList.state == 2 ? (<p>审核未通过</p>)
                    : detailList.state == 3 ? (<p>审核通过已交保证金</p>) : ''
                }
                </div>
            </div>
        )
    }
}
export default ProductSave;