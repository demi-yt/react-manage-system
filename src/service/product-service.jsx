import MUtil from '../util/index.jsx';

const _index = new MUtil();

class Product{
    // 获取商品列表
    getProductList(listParam) {
        let url = '',
            data = {};
        if(listParam.listType === 'list') {
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search') {
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }
        return _index.request({
            type : 'post',
            url : url,
            data : data
        });
    }
    // 获取商品详情
    getProduct(productId) {
        return _index.request({
            type : 'post',
            url: '/manage/product/detail.do',
            data : {
                productId : productId || 0
            }
        });
    }
    // 变更商品销售状态（上架或者下架）
    setProductStatus(productInfo) {
        return _index.request({
            type:'post',
            url : '/manage/product/set_sale_status.do',
            data : productInfo
        });
    }
}

export default Product;