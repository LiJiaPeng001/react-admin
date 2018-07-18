/*
* @Author: Rosen
* @Date:   2018-01-31 13:06:57
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:21:43
*/
import React            from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom'

// 页面
import UserList         from 'page/user/index.jsx';
import UserDetailList   from 'page/user/detail.jsx';
import UserShopList     from 'page/user/shopDetail.jsx';
import UserAddressList  from 'page/user/addressDetail.jsx';
import UserCenter       from 'page/user/user-center/index.jsx'
import UserPassUpdate   from 'page/user/user-center/passupdate.jsx'
import UserCenterUpdate from 'page/user/user-center/update.jsx'

class UserRouter extends React.Component{
    render(){
        return (
            //重定向 redirect
            <Switch>
                    <Route exact path="/user/index" component={UserList}/>
                    <Route path="/user/index/:id" component={UserList}/>
                    <Route path="/user/save/" component={UserSaveList}/>
                    <Route path="/user/detail/:id" component={UserDetailList}/>
                    <Route path="/user/addressDetail/:id" component={UserAddressList}/>
                    <Route path="/user/shopDetail/:id" component={UserShopList}/>
                    <Route exact path="/user-center" component={UserCenter}/>
                    <Route path="/user-center/user-center-update" component={UserCenterUpdate}/>
                    <Route path="/user-center/user-pass-update" component={UserPassUpdate}/>
                    <Route exact path="/shop-audit/index" component={ShopAudit}/>
                    <Route path="/shop-audit/index/:id" component={ShopAuditDetail}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    <Redirect exact from="/shop-audit" to="/shop-audit/index"/>
            </Switch>
        )
    }
}
export default UserRouter;