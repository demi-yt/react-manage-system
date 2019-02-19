import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link } from 'react-router-dom';

// 页面

import ProductList from './index/index.jsx';
import ProductDetail from './index/detail.jsx';
import CategoryList     from './category/index.jsx';
import CategoryAdd      from './category/add.jsx';


class ProductRouter extends React.Component{
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList}/>
                <Route path="/product/detail/:pid" component={ProductDetail}/>
                <Route path="/product-category/index/:categoryId?" component={CategoryList}/>
                <Route path="/product-category/add" component={CategoryAdd}/>
                <Redirect exact from="/product" to="/product/index"/>
                <Redirect exact from="/product-category" to="/product-category/index"/>
            </Switch>
        )
    }
}

export default ProductRouter;