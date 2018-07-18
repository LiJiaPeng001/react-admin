/*
* @Author: Rosen
* @Date:   2018-02-02 10:11:10
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-02 22:08:53
*/
import React        from 'react';
import MUtil        from 'util/mm.jsx'
import Product      from 'service/product-service.jsx'
const _mm           = new MUtil();
const _product      = new Product();

// 品类选择器
class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    componentDidMount(){
        
    }
    // 传给父组件选中的结果
    onPropsCategoryChange(){
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        categoryChangable && this.props.onCategoryChange();
    }
    render(){
        return (
            <div className="col-md-10">
                <select className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    onChange={(e) => this.onFirstCategoryChange(e)}
                    readOnly={this.props.readOnly}>
                    <option value="">请选择分类</option>
                    {
                        this.state.firstCategoryList.map(
                            (category, index)=> <option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>
            </div>
        )
    }
}
export default CategorySelector;