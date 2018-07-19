/*
* @Author: Rosen
* @Date:   2018-01-13 11:27:21
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-05 14:02:20
*/  


import React            from 'react';
import ReactDOM         from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'


import Layout           from 'component/layout/index.jsx';
// 页面
import Home             from 'page/home/index.jsx';
import ProductRouter    from 'page/product/router.jsx';
import Login            from 'page/login/index.jsx';
import UserRouter       from 'page/user/router.jsx';
import ErrorPage        from 'page/error/index.jsx';

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout> 
                <Switch>
                    <Route exact path="/root" component={Home}/>
                    <Route path="/root/product" component={ProductRouter}/>
                    <Route path="/root/product-category" component={ProductRouter}/>
                    <Route path="/root/user" component={UserRouter}/>
                    <Route path="/root/user-center" component={UserRouter}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/root/login" component={Login}/>
                    <Route path="/root" render={ props => LayoutRouter}/>
                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);