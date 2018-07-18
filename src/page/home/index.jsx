/*
* @Author: Rosen
* @Date:   2018-01-23 18:03:55
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 13:41:51
*/

import React        from 'react';
import { Link }     from 'react-router-dom';

import MUtil        from 'util/mm.jsx'
import Statistic    from 'service/statistic-service.jsx'

const _mm           = new MUtil();
const _statistic    = new Statistic();

import PageTitle    from 'component/page-title/index.jsx';
import './index.scss'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this._isMounted = true;
        this.loadCount();
    }
    componentWillUnmount (){
        this._isMounted = false;
    }
    loadCount(){
        
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="首页" />
                <div className="row">
                
                </div>
            </div>
        );
    }
}

export default Home;