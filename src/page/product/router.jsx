import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

// 页面

import ProductList from './index/index.jsx'
import ProductDetail from './index/detail.jsx'


class ProductRouter extends React.Component{
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                <Redirect exact from="/product" to="/product/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;