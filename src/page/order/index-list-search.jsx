import React from 'react';

class ListSrarch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber : ''
        }
    }
    // 数据变化的时候
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    // 搜索
    onSearch() {
        this.props.onSearch(this.state.orderNumber);
    }
    // 回车自动查询
    onSearchKeywordKeyUp(e) {
        if(e.keyCode === 13) {
            this.onSearch();
        }
    }
    render() {
        return (
            <div className="row search-wrap">
            <div className="col-md-12">
                <div className="form-inline">
                    <div className="form-group">
                        <input type="text" 
                            className="form-control" 
                            placeholder="订单号"
                            name="orderNumber"
                            onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                            onChange={(e) => this.onValueChange(e)}/>
                    </div>
                    <button className="btn btn-primary" 
                        onClick={(e) => this.onSearch()}>搜索</button>
                </div>
            </div>
        </div>
        )
    }
}

export default ListSrarch;