/*
* @Author: Rosen
* @Date:   2018-02-04 21:34:16
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:49:58
*/
import React        from 'react';
import { Link }     from 'react-router-dom';
import MUtil        from 'util/mm.jsx'
import Product      from 'service/product-service.jsx'
import swal         from 'sweetalert2'

import PageTitle    from 'component/page-title/index.jsx';
import TableList    from 'util/table-list/index.jsx';

const _mm           = new MUtil();
const _product      = new Product();

class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list                : [],
            parentCategoryId    : this.props.match.params.categoryId || 0,
            role                : _mm.getStorage('userInfo').role || '',
        };
    }
    componentDidMount(){
        this._isMounted=true;
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps, prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId : newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }
    componentWillUnmount (){
        this._isMounted = false;
    }
    // 加载品类列表
    loadCategoryList(){
        _product.getAllCategory().then(res => {
            if (this._isMounted) {
                this.setState({
                    list: res
                });
            }
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    // 更新品类的名字
    onUpdateName(categoryId, categoryName){
        let list = {
            title : '请输入新的品类名称',
            inputPlaceholder : categoryName,
            input : 'text'
        }
        if (this._isMounted) {
            _mm.onAlert(list).then(confirm => {
                if (confirm.value) {
                    _product.updateCategoryName({
                        id: categoryId,
                        item: confirm.value
                    }).then(res => {
                        _mm.successTips(res);
                        this.loadCategoryList();
                    }, errMsg => {
                        _mm.errorTips(errMsg);
                    });
                } else if (confirm.value == '') {
                    _mm.errorTips("不能为空");
                } else {
                    return false;
                }
            })
        }
    }
    render(){
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.categoryId}</td>
                    <td>{category.item}</td>
                    <td>
                        <a className="opear"
                            onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                    </td> 
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <TableList tableHeads={['品类ID', '品类名称', '操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default CategoryList;