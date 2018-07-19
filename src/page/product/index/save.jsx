/*
* @Author: Rosen
* @Date:   2018-02-01 16:19:36
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 21:39:59
*/
import React                from 'react';
import MUtil                from 'util/mm.jsx'
import Product              from 'service/product-service.jsx'
import PageTitle            from 'component/page-title/index.jsx';
import FileUploader         from 'util/file-uploader/index.jsx'
import RichEditor           from 'util/rich-editor/index.jsx'


import './save.scss';

const _mm           = new MUtil();
const _product      = new Product();
const niu           = require('qiniu-js')

class ProductSave extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id                  : this.props.match.params.aid,
            title               : '',
            subtitle            : '',           
            category            : '',
            categoryAll         : [],
            subImages           : [],
            pageNum             : 1,
            pageSize            : 5,
            set_top             :'',
            is_recommend        :''
        }
    }
    componentDidMount(){

        this.loadProduct();
        //获取分类
        this.getAllCategory()
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
                var subImages = [];
                this.setState(res.list[0]);
                subImages.push(this.state.art_pic);
                this.setState({
                    category : res.list[0].category.categoryId,
                    defaultDetail : res.list[0].detail,
                    subImages : subImages
                })
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        }
    }
    getAllCategory(){
        _product.getAllCategory().then(res=>{
            this.setState({
                categoryAll : res
            })
        },err=>{
            _mm.errorTips(err);
        })
    }
    // 简单字段的改变，比如商品名称，描述，价格，库存
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    //上传图片到七牛云
    onUploadNiu(){
        let uploader = niu.upload({
            
        })
    }
    // 上传图片成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages : subImages,
        });
    }
    // 上传图片失败
    onUploadError(errMsg){
        _mm.errorTips(errMsg);
    }
    // 删除图片
    onImageDelete(e){
        let index       = parseInt(e.target.getAttribute('index')),
            subImages   = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages : subImages
        });
    }
    // 富文本编辑器的变化
    onDetailValueChange(value){
        this.setState({
            detail: value,
        });
    }
    // 提交表单
    onSubmit(){
         let listArticle = {
             title          : this.state.title,
             subtitle       : this.state.subtitle,
             category       : this.state.category,
             set_top        : this.state.set_top,
             is_recommend   : this.state.is_recommend,
             detail         : this.state.detail,
             art_pic        : this.state.subImages[0]
         } 
         console.log(listArticle);     
    }
    render(){
        return (
            <div id="page-wrapper">
                        <button onClick={e=>this.onUploadNiu(e)}>upload</button>
                <PageTitle title={this.state.id ? '编辑文章' : '添加文章'} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">文章标题</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入文章标题"
                                name="title"
                                value={this.state.title}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">文章副标题</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control" 
                                placeholder="请输入商品描述" 
                                name="subtitle"
                                value={this.state.subtitle}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">选择分类</label>
                        <div className="col-md-2">
                            <select className="form-control cate-select"
                                value={this.state.category}
                                name='category'
                                onChange={(e) => this.onValueChange(e)}>
                                <option value="">请选择分类</option>
                                {
                                    this.state.categoryAll.map((cate,index)=>{
                                       return <option value={cate.categoryId} key={index}>{cate.item}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">是否置顶</label>
                        <div className="col-md-2">
                            <select className="form-control cate-select"
                                value={this.state.set_top}
                                name = 'set_top'
                                onChange={(e) => this.onValueChange(e)}>
                                <option value="">请选择</option>
                                <option value="0">否</option>
                                <option value="1">是</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">是否推荐</label>
                        <div className="col-md-2">
                            <select className="form-control cate-select"
                                name = 'is_recommend'
                                value={this.state.is_recommend}
                                onChange={(e) => this.onValueChange(e)}>
                                <option value="">请选择</option>
                                <option value="0">否</option>
                                <option value="1">是</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (image, index) => (
                                    <div className="img-con" key={index}>
                                        <img className="img" src={image} />
                                        <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                                    </div>)
                                ) : (<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                onError={(errMsg) => this.onUploadError(errMsg)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor 
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onDetailValueChange(value)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary" 
                                onClick={(e) => {this.onSubmit(e)}}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductSave;