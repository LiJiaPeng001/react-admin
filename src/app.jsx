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
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={ProductRouter}/>
                    <Route path="/product-category" component={ProductRouter}/>
                    <Route path="/user" component={UserRouter}/>
                    <Route path="/user-center" component={UserRouter}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={ props => LayoutRouter}/>
                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById('app')
);