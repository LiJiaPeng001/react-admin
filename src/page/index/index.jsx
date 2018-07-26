/*
* @Author: Rosen
* @Date:   2018-01-23 18:03:55
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 13:41:51
*/

import React        from 'react';
import { Link }     from 'react-router-dom';

import MUtil        from 'util/mm.jsx'
import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';
import index        from 'service/index-service.jsx'

const _mm           = new MUtil();
const _index        = new index();

import './index.scss'

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : []
        }
    }
    componentDidMount(){
        this._isMounted = true;
        //获取所有标签
        this.onSelectLabel();
    }
    //获取所有标签
    onSelectLabel(){
        _index.getLabel().then(res=>{
            if(this._isMounted){
                this.setState({
                    list : res
                })
            }
        },err=>{
            _mm.errorTips(err);
        })
    }
    onSetProductStatus(e, id, currentStatus) {
        let newStatus = currentStatus == 1 ? 0 : 1;
        let  confrimTips = currentStatus == 1
                ? '确定要显示吗？' : '确定要隐藏吗？';
                _mm.onAlert({text:confrimTips}).then(confirm => {
                    if (confirm.value) {
                        _index.setLabel({
                            lid : id,
                            is_show : newStatus
                        }).then(res=>{
                            _mm.successTips(res);
                            this.onSelectLabel();
                        },err=>{
                            _mm.errorTips(err);
                        })
                    } else {
                        return;
                    }
                })
    }
    componentWillUnmount (){
        this._isMounted = false;
    }
    render(){
        var style = {
            color : 'red',
            fontWeight : 'bold'
        }
        var style1 = {
            color : 'green',
            fontWeight : 'bold'
        }
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.label}</td>
                    <td>{category.link}</td>
                    <td><p style={category.is_show == 0 ? style1 : style}>{category.is_show == 1 ? '隐藏' : '显示'}</p>
                                        <button className="btn btn-xs btn-warning"
                                            onClick={(e) => { this.onSetProductStatus(e, category.lid, category.is_show) }}>{category.is_show == 1 ? '显示' : '隐藏'}</button></td>
                    <td>
                        <Link className="opear" to={`/index/add/${category.lid}`}>修改名称</Link>
                    </td> 
                </tr>
            );
        });
        return(
            <div id="page-wrapper">
                <PageTitle title="标签管理">
                    <div className="page-header-right">
                        <Link to="/index/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加标签</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                <TableList tableHeads={['标签名', '品类名称','是否显示', '操作']}>
                    {listBody}
                </TableList>
                </div>
            </div>
        )
    }
}

export default Index;