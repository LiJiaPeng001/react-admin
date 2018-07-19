/*
* @Author: Rosen
* @Date:   2018-01-31 13:06:57
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:21:43
*/
import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import ProductList      from 'page/product/index/index.jsx';
import ProductSave      from 'page/product/index/save.jsx';
import ProductDetail    from 'page/product/index/detail.jsx';
import CategoryList     from 'page/product/category/index.jsx';
import CategoryAdd      from 'page/product/category/add.jsx';

class ProductRouter extends React.Component{
    render(){
        return (
            //重定向 redirect
            <Switch>
                <Route path="/root/product/index" component={ProductList}/>
                <Route path="/root/product/save/:aid?" component={ProductSave}/>
                <Route path="/root/product/detail/:aid" component={ProductDetail}/>
                <Route path="/root/product-category/index/:categoryId?" component={CategoryList}/>
                <Route path="/root/product-category/add" component={CategoryAdd}/>
                <Redirect exact from="/root/product" to="/root/product/index"/>
                <Redirect exact from="/root/product-category" to="/root/product-category/index"/>
            </Switch>
        )
    }
}
export default ProductRouter;