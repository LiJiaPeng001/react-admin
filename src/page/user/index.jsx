/*
* @Author: Rosen
* @Date:   2018-01-26 16:48:16
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-07 17:27:38
*/
import React        from 'react';
import { Link }     from 'react-router-dom';
import swal         from 'sweetalert2'
import MUtil        from 'util/mm.jsx'
import User         from 'service/user-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import Pagination   from 'util/pagination/index.jsx';

import './index.scss'

const _mm       = new MUtil();
const _user     = new User();

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id          : this.props.match.params.id,
            list        : [],
            pageNum     : 1,
            role        : _mm.getStorage('userInfo').role || '', //本地存储权限
            role1       : 0,                                     //搜索权限
            areaId      : -1,                                     //地域ID
            searchList  : [],                                     //搜索内容
            userName    : null,
            state       : null,
            searchList  : [],

        };
    }
    componentWillUnmount (){
        this._isMounted = false;
    }
    componentDidMount() {
        this._isMounted = true;
        //首页传过来如果有id  就回填进行查询，不然就查询所有用户
        if (this.state.id) {
            this.setState({
                role1: this.state.id,
                searchList: { role: this.props.match.params.id, areaId: '-1' },
            }, e => {
                this.state.searchList['isUpdate'] = true
                this.loadUserList();
            })
        }else{
            this.loadUserList();
        }
    }
    //加载用户信息
    loadUserList() {
        let listParam = {
            areaId      : this.state.areaId,
            role        : this.state.role1,
            userName    : this.state.userName,
            pageNum     : this.state.pageNum
        };
        // 请求接口
        _user.getUserList(listParam).then(res => {
            if(this._isMounted) {
                this.setState(res)
            };
        }, errMsg => {
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        })
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum     : pageNum,
        }, () => {
            this.loadUserList();
        });
    }
    //点击搜索
    onSearch(searchList) {
        if (searchList.hasOwnProperty('userName')) {
            this.setState({
                role1       : searchList.role,
                areaId      : searchList.areaId,
                userName    : searchList.userName,
            }, () => {
                this.loadUserList();
            })
        } else {       
            this.setState({
                role1       : searchList.role,
                areaId      : searchList.areaId,
                searchList  : searchList,
            }, () => {
                this.state.searchList['isUpdate']= true
                this.loadUserList();
            })
        }
    }
    //存储订单数据
    onSetOrder(data,name){
        _mm.removeStorage(name);
        _mm.setStorage(name, data);
    }
    //修改状态
    onAlterState(id){
        var msg = id.status==0?'你确定要禁用吗':'你确定要启用吗';
        _mm.onAlert({text:msg}).then(isConfirm=>{
            if (isConfirm.value) {
                _user.onAlterState(id.id).then((res) => {
                    _mm.successTips();
                    this.loadUserList();
                }, err => {
                    _mm.errorTips(err);
                })
            }else {
                return ;
            }
        })
    }
    //点击查看地域店铺
    render() {
        var style = {
            color : 'red',
            fontWeight : 'bold'
        }
        var style1 = {
            color : 'green',
            fontWeight : 'bold'
        }
        let listBody = this.state.list.map((user, index) => {
            let data = {
                pageSize: 1,
                pageNum : 10,
                id      : user.id,
                role    : user.role,
                areaId  : user.areaId
            }
            data = JSON.stringify(data);
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.areaName}</td>
                    {this.state.role1 == 2 ? <td>{user.shopName}</td> : null}
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                    <td>
                        <div style={user.status == 0 ? style1 : style}>{user.status == 0 ? '已启用' : '已禁用'}</div>
                        <button className="btn btn-xs btn-warning" onClick={(e)=>{this.onAlterState({id:user.id,status:user.status})}}>{user.status == 0 ? '禁用' : '启用'}</button>
                    </td>
                    <td>
                        {/* ① 若选择普通用户,查询出结果后有一个查看用户详情
                            ② 若选择商铺,查询结果后有 查看商铺详情/查看商铺订单/查看商铺商品
                            ③ 若选择地域管理员,查询结果后有 查看地域商铺/查看地域订单/查看地域用户/地域详情 */}

                        {
                            user.role === 0 ? (<p><Link to={`/user/detail/${user.id}`}>查看详情</Link></p>)
                                : user.role === 2 ? (
                                    <p>
                                        <Link to={`/user/shopDetail/${user.id}`} className='operation'>查看店铺详情</Link>
                                        <Link to={`/order/index`} onClick={(e)=>{this.onSetOrder(data,'orderInfo')}} className='operation'>查看店铺订单</Link>
                                        <Link to='/product/index' onClick={(e)=>{this.onSetOrder(data,'productInfo')}}>查看店铺商品</Link>
                                    </p>
                                )
                                    : user.role === 3 ? (
                                        <div>
                                        <p>
                                            <span className='operation' onClick={
                                                (e) => { this.onSearch({ role: 2, areaId: user.areaId }) }
                                            }>查看地域店铺</span>
                                            <Link to={`/order/index`} onClick={(e)=>{this.onSetOrder(data,'orderInfo')}}>查看地域订单</Link>
                                            </p>
                                            <p>
                                                <span className='operation' onClick={(e) => { this.onSearch({ role: 0, areaId: user.areaId })}}>查看地域用户</span>
                                                <Link to={`/user/addressDetail/${user.id}`}>地域详情</Link>
                                            </p>
                                        </div>
                                    ) : ''
                        }
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表">
                    {
                        this.state.role === 1 ?
                            <div className="page-header-right">
                                <Link to="/user/save" className="btn btn-primary">
                                    <i className="fa fa-plus"></i>
                                    <span>添加地域管理员</span>
                                </Link>
                            </div> : ''
                    }
                </PageTitle>
                {/* 
                    1.如果是地域管理员和普通用户  只显示所在地
                    2.如果是商铺，显示所在地和商铺名称
                */}
                <ListSearch onSearch={(orderNumber) => { this.onSearch(orderNumber) }} SearchList={this.state.searchList}/>
                {
                    this.state.role1 == 0 || this.state.role1 == 3 ? (<TableList tableHeads={['ID', '用户名', '所在地', '电话', '注册时间', '状态', '操作']}>
                    {this.state.role === 2 ? '' : listBody}
                    </TableList>) : this.state.role1 == 2 ? (<TableList tableHeads={['ID', '用户名', '所在地', '商铺名称','电话', '注册时间', '状态', '操作']}>
                    {this.state.role === 2 ? '' : listBody}
                    </TableList>) : ''
                }
                <Pagination current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)} />
            </div>

        );
    }
}

export default UserList;