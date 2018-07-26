/*
* @Author: Rosen
* @Date:   2018-01-26 13:38:21
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-26 13:39:45
*/
import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Index{
    getLabel(data){
        return _mm.request({
            data : data,
            type : 'post',
            url: '/admin/adminLabel'
        });
    }
    //增加标签
    addLabel(data){
        return _mm.request({
            data : data,
            type : 'post',
            url: '/admin/addLabel'
        });
    }
    //是否显示标签
    setLabel(data){
        return _mm.request({
            data : data,
            type : 'post',
            url: '/admin/setLabel'
        });
    }
    //编辑标签
    onLabel(data){
        return _mm.request({
            data : data,
            type : 'post',
            url: '/admin/onLabel'
        });
    }
}

export default Index;