import React from 'react';
import { Link } from 'react-router-dom';

import MUtil from '../../util/index.jsx';
import Order from '../../service/order-service.jsx';

const _index = new MUtil();
const _order = new Order();


import PageTitle from '../../component/page-title/index.jsx';
import TableList from '../../util/table-list/index.jsx';
import Pagination from '../../util/pagination/index.jsx';
import ListSearch from './index-list-search.jsx';


class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            pageNum : 1,
            listType : 'list' // list列表查询，seaech条件查询
        }
    }
    componentDidMount() {
        this.loadOrderList();
    }
    loadOrderList() {
        let listParam ={};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        if(this.state.listType === 'search') {
            listParam.orderNo = this.state.orderNumber;
        }
        // 接口请求
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, (errMsg) => {
            this.setState({
                list : []
            });
            _index.errorTips(errMsg);
        });
    }
    // 搜索点击函数
    onSearch(orderNumber) {
        let listType = orderNumber === '' ? 'list' :'search';
        this.setState({
            listType : listType,
            pageNum : 1,
            orderNumber : orderNumber
        },() => {
            this.loadOrderList();
        });
    }
    // 分页
    onPageNumChange(pageNum) {
        this.setState({
            pageNum:pageNum
        },() => {
            this.loadOrderList();
        });
    }
    render(){
        let tableHeads = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作'];
        return (            
            <div id="page-wrapper">
               <PageTitle title="订单列表" />
               <ListSearch onSearch={(orderNumber) => {this.onSearch(orderNumber)}}/>
               <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={ `/order/detail/${order.orderNo}` }>{order.orderNo}</Link>
                                    </td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>￥{order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link to={ `/order/detail/${order.orderNo}` }>详情</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
               <Pagination current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}></Pagination>
            </div>
        );
    }
}

export default UserList;