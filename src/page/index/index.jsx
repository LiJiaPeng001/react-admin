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
            
        }
    }
    componentDidMount(){
        this._isMounted = true;
    }
    componentWillUnmount (){
        this._isMounted = false;
    }
    render(){
    }
}

export default Index;