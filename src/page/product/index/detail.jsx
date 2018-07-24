/*
* @Author: Rosen
* @Date:   2018-02-02 21:57:52
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-02 22:11:37
*/

import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Product              from 'service/product-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';

import './save.scss';

const _mm           = new MUtil();
const _product      = new Product();

class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id                  : this.props.match.params.aid,
            pageNum             : 1,
            pageSize            : 5
        }
    }
    componentDidMount(){
        this._isMounted=true;
        this.loadProduct();
    }
    componentWillUnmount (){
        this._isMounted = false;
    }
    // 加载文章详情
    loadProduct(){
        // 有id的时候，表示是编辑功能，需要表单回填
        var listParam = {
            pageNum : this.state.pageNum,
            pageSize : this.state.pageSize,
            aid     : this.state.id
        }
        if(this.state.id){
            _product.getProductList(listParam).then((res) => {
                if(this._isMounted){
                    this.setState(res.list[0]);
                }
                
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    //点击查看图片
    getSeeImg(e){
        var src=e.target.src;
        window.open(src);
    }
    render(){
        let list = this.state;
        return (
            <div id="page-wrapper">
                <PageTitle title="文章详情" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">文章标题</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{list.title}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">文章副标题</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{list.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">文章图片</label>
                        <div className="col-md-5">
                            <div className="img-con">
                                    <img className="img" src={list.art_pic} onClick={e=>{this.getSeeImg(e)}}/>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{list.create_time}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">更新时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{list.update_time}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">文章内容</label>
                        <div className="col-md-5">
                            <p className="form-control-static" dangerouslySetInnerHTML={{__html:list.detail}}></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductDetail;