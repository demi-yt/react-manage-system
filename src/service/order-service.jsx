import MUtil from '../util/index.jsx';

const _index = new MUtil();

class Order{

    /**
     *
     * 获取订单列表
     * @param {*} listParam
     * @returns
     * @memberof Order
     */
    getOrderList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list') {
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search') {
            url = '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return _index.request({
            type: 'post',
            url: url,
            data: data
        });
    }
    // 获取订单详情
    getOrderDetail(orderNumber){
        return _index.request({
            type : 'post',
            url : '/manage/order/detail.do',
            data : {
                orderNo : orderNumber
            }
        })
    }
    // 订单发货详情
    sendGoods(orderNumber){
        return _index.request({
            type : 'post',
            url : '/manage/order/send_goods.do',
            data : {
                orderNo : orderNumber
            }
        })
    }
}

export default Order;