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
        // 判断用户名为空
        if(typeof product.name !== 'string' || product.name.length ===0){
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ==0){
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 验证品类ID
        if(typeof product.categoryId !== 'number' || typeof product.parentId !== 'number' || typeof product.grandpaId !== 'number' || !(product.categoryId > 0) || !(product.parentId > 0) || !(product.grandpaId > 0)){
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.unit !== 'string' || product.unit.length ===0){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        //判断是否有图片
        if(typeof product.subImages !== 'string' || product.subImages.length ===0){
            return {
                status: false,
                msg: '请上传商品图片！'
            }
        }  
        //判断是否有具体描述
        if(typeof product.detail !== 'string' || product.detail.length ===0){
            return {
                status: false,
                msg: '请上传商品描述！'
            }
        }   
        return result;
    }
    // 保存商品
    saveProduct(product){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/save.do',
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
            url     : '/manage/category/add_category.do',
            data    : category
        });
    }
    // 修改品类名称
    updateCategoryName(category){
        return _mm.request({
            type    : 'post',
            url     : '/manage/category/set_category_name.do',
            data    : category
        });
    }
}

export default Product;