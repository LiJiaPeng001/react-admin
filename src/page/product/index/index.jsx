/*
* @Author: Rosen
* @Date:   2018-01-31 13:10:47
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-01 16:30:04
*/
import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'

import PageTitle from 'component/page-title/index.jsx';
import ListSearch from './index-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list        : [],
            pageNum     : 1,
            listType    : 'list',
            pageSize    : 5,
            keyword     : ''
        };
    }
    componentDidMount() {
        this._isMounted=true;
        this.loadProductList();
    }
    componentWillUnmount (){
        this._isMounted = false;
    }
    // 加载文章列表
    loadProductList() {
        let data = {
            pageNum     : this.state.pageNum,
            pageSize    : this.state.pageSize,
            listType    : this.state.listType
        }
        if(this.state.listType == 'search'){
            data['like'] = this.state.keyword
        }
        _product.getProductList(data).then(res=>{
            if(this._isMounted){
                this.setState(res)
            }
        },err=>{
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        })
    }
    // 搜索
    onSearch(searchType,keyword) {
        this.setState({
            listType : 'search',
            keyword  : keyword
        },e=>{
            this.loadProductList();
        })
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList();
        });
    }
    // 改变文章状态，置顶/推荐
    onSetProductStatus(e, productId, currentStatus,status) {
        let newStatus = currentStatus == 1 ? 0 : 1;
        let confrimTips = '';
        if(status=='top'){
            confrimTips = currentStatus == 1
                ? '确定要取消置顶吗？' : '确定要置顶吗？';
                _mm.onAlert({text:confrimTips}).then(confirm => {
                    if (confirm.value) {
                        _product.setProductStatus({
                            aid: productId,
                            set_top: newStatus
                        }).then(res => {
                            _mm.successTips(res);
                            this.loadProductList();
                        }, errMsg => {
                            _mm.errorTips(errMsg);
                        });
                    } else {
                        return;
                    }
                })
        }else{
            confrimTips = currentStatus == 1
                ? '确定要取消推荐吗？' : '确定要推荐吗？';
                _mm.onAlert({text:confrimTips}).then(confirm => {
                    if (confirm.value) {
                        _product.setProductStatus({
                            aid: productId,
                            is_recommend : newStatus
                        }).then(res => {
                            _mm.successTips(res);
                            this.loadProductList();
                        }, errMsg => {
                            _mm.errorTips(errMsg);
                        });
                    } else {
                        return;
                    }
                })
        }       
        
    }
    render() {
        let tableHeads = [
            { name: '文章ID', width: '5%' },
            { name: '文章头部', width: '45%' },
            { name: '分类', width: '15%'},
            { name: '是否置顶', width: '10%' },
            { name: '是否推荐', width: '10%' },
            { name: '操作', width: '15%' },
        ];
        var style = {
            color : 'red',
            fontWeight : 'bold'
        }
        var style1 = {
            color : 'green',
            fontWeight : 'bold'
        }
        return (
            <div id="page-wrapper">
                <PageTitle title="文章列表">
                    <div className="page-header-right">
                        <Link to="/root/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加文章</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType,keyword) => { this.onSearch(searchType,keyword) }} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.aid}</td>
                                    <td>
                                        <p>{product.title}</p>
                                    </td>
                                    <td>{product.category.item}</td>
                                    <td>
                                        <p style={product.set_top == 1 ? style1 : style}>{product.set_top == 1 ? '置顶' : '已取消置顶'}</p>
                                        <button className="btn btn-xs btn-warning"
                                            onClick={(e) => { this.onSetProductStatus(e, product.aid, product.set_top,'top') }}>{product.set_top == 1 ? '取消置顶' : '置顶'}</button>
                                    </td>
                                    <td>
                                        <p style={product.is_recommend == 1 ? style1 : style}>{product.is_recommend == 1 ? '推荐' : '已取消推荐'}</p>
                                        <button className="btn btn-xs btn-warning"
                                            onClick={(e) => { this.onSetProductStatus(e, product.aid, product.is_recommend,'recommend') }}>{product.is_recommend == 1 ? '取消推荐' : '推荐'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={`/root/product/detail/${product.aid}`}>详情</Link>
                                        <Link className="opear" to={`/root/product/save/${product.aid}`}>编辑</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum}
                            pageNum={this.state.pageNum}
                        pageSize={this.state.pageSize}
                    total={this.state.total}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)} />
            </div>
        );
    }
}

export default ProductList;