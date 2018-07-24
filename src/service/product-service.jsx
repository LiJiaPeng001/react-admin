/*
* @Author: Rosen
* @Date:   2018-01-31 13:19:15
* @Last Modified by:   Rosen
* @Last Modified time: 2018-02-04 22:52:34
*/
import MUtil        from 'util/mm.jsx'

const _mm   = new MUtil();

class Product{
    // 获取商品列表
    getProductList(listParam){
        let url     = '/admin/getQueryArticle',
            data    = {};
            data.pageSize   = listParam.pageSize;
            data.pageNum    = listParam.pageNum;
        if(listParam.listType === 'search'){
            data.like = listParam.like;
        }
        if(listParam.aid){
            data.aid=listParam.aid;
        }
        return _mm.request({
            type    : 'post',
            url     : url,
            data    : data
        });
    }
    // 变更文章状态
    setProductStatus(productInfo){
        return _mm.request({
            type    : 'post',
            url     : '/admin/setArticleStatus',
            data    : productInfo
        });
    }
    // 检查保存商品的表单数据
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过'
        };
        // 判断标题是否为空
        if(typeof product.title !== 'string' || product.title.length ===0){
            return {
                status: false,
                msg: '标题不能为空！'
            }
        }
        // 判断副标题不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ==0){
            return {
                status: false,
                msg: '副标题不能为空！'
            }
        }
        // 验证品类ID
        if(typeof product.category !== 'number' || !(product.category >= 0)){
            return {
                status: false,
                msg: '请选择分类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if(typeof product.set_top !== 'number' || !(product.set_top >= 0)){
            return {
                status: false,
                msg: '请选择是否置顶！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.is_recommend !== 'number' || !(product.is_recommend >= 0)){
            return {
                status: false,
                msg: '请选择是否推荐！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.art_pic !== 'string' || product.art_pic.length ===0){
            return {
                status: false,
                msg: '请上传图片，一张即可！'
            }
        }
        //判断是否有图片
        if(typeof product.detail !== 'string' || product.detail.length ===0){
            return {
                status: false,
                msg: '请输入文章详情！'
            }
        }   
        return result;
    }
    // 保存文章
    saveArticle(product){
        return _mm.request({
            type    : 'post',
            url     : '/admin/save',
            data    : product
        });
    }
    //更新文章
    updataArticle(product){
        return _mm.request({
            type    : 'post',
            url     : '/admin/updata',
            data    : product
        });
    }
    /*
    *  品类相关
    */
   //获取所有品类
   getAllCategory(){
        return _mm.request({
            type    : 'post',
            url     : '/admin/getArticleClass',
        });
   }
    // 新增品类
    saveCategory(category){
        return _mm.request({
            type    : 'post',
            url     : '/admin/addCategory',
            data    : category
        });
    }
    // 修改品类名称
    updateCategoryName(category){
        return _mm.request({
            type    : 'post',
            url     : '/admin/updataCategory',
            data    : category
        });
    }
    //上传图片
    
}

export default Product;