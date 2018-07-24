/*
* @Author: Rosen
* @Date:   2018-01-31 13:06:57
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:21:43
*/
import React            from 'react';
import { HashRouter as Router, Switch, Redirect, Route, Link, withRouter } from 'react-router-dom'

// 页面
import UserCenter       from 'page/user/index.jsx'
import UserCenterUpdate from 'page/user/update.jsx'

class UserRouter extends React.Component{
    render(){
        return (
            //重定向 redirect
            <Switch>
                    <Route exact path="/user-center" component={UserCenter}/>
                    <Route exact path="/user-center-update" component={UserCenterUpdate}/>
                    <Redirect exact from="/user" to="/user-center"/>
            </Switch>
        )
    }
}
export default UserRouter;