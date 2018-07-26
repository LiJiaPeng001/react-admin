/*
* @Author: Rosen
* @Date:   2018-02-04 22:12:52
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:36:57
*/
import React        from 'react';
import MUtil        from 'util/mm.jsx'
import Index      from 'service/index-service.jsx'

import PageTitle    from 'component/page-title/index.jsx';

const _mm           = new MUtil();
const _index      = new Index();


class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id      : this.props.match.params.lid,
            link    : '',
            label    : '', 
            is_show : ''
        };
    }
    componentDidMount(){
        if(this.state.id){
            _index.getLabel({lid : this.state.id}).then(res=>{
                this.setState(res);
            },err=>{
                _mm.errorTips(err)
            })
        }
    }
    // 表单的值发生变化
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value;
        this.setState({
            [name] : value
        });
    }
    // 提交
    onSubmit(e){
        let list = {
            lid    : this.state.id,
            label : this.state.label,
            link : this.state.link,
            is_show : this.state.is_show
        }
        // 品类名称不为空，提交数据
        var status = this.checkLoginInfo(list);
        if(status.status){
            if(this.state.id){
                _index.onLabel(list).then(res=>{
                    _mm.successTips(res);
                    this.props.history.push('/index');
                },err=>{
                    _mm.errorTips(err);
                })
            }else{
                delete list.id;
                _index.addLabel(list).then(res=>{
                    _mm.successTips(res);
                    this.props.history.push('/index');
                },err=>{
                    _mm.errorTips(err);
                })
            }               
        }
        // 否则，提示错误
        else{
            _mm.errorTips(status.msg);
        }
    }
    checkLoginInfo(list) {
        let label = $.trim(list.label),
            link = $.trim(list.link),
            is_show = $.trim(list.is_show);
        if (typeof label !== 'string' || label.length === 0) {
            return {
                status: false,
                msg: '标签名不能为空！'
            }
        }
        if (typeof link !== 'string' || link.length === 0) {
            return {
                status: false,
                msg: '链接地址不能为空！'
            }
        }
        if (typeof is_show !== 'string' || is_show.length === 0) {
            return {
                status: false,
                msg: '请选择是否显示！'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="分类列表"/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">标签名</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" 
                                        placeholder="请输入标签名"
                                        name="label"
                                        value={this.state.label}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">链接地址</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" 
                                        placeholder="请输入链接的地址"
                                        name="link"
                                        value={this.state.link}
                                        onChange={(e) => this.onValueChange(e)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">是否显示</label>
                                <div className="col-md-2">
                                    <select className="form-control"
                                        name="is_show"
                                        value={this.state.is_show}
                                        onChange={(e) => this.onValueChange(e)}>
                                        <option value="">是否显示</option>
                                        <option value="0">显示</option>
                                        <option value="1">隐藏</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-primary" 
                                        onClick={(e) => {this.onSubmit(e)}}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;