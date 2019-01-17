import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom';

import Layout from './component/layout/index.jsx';

// 登录
import Login from './page/login/index.jsx';
// 首页
import Home from './page/home/index.jsx';
// 用户列表
import User from './page/user/index.jsx';
class App extends React.Component{
    render() {
        return(
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={ props => (
                        <Layout>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path="/product" component={Home}/>
                                <Route exact path="/product-category" component={Home}/>
                                <Route exact path="/order" component={Home}/>
                                <Route exact path="/user" component={User}/>
                            </Switch> 
                        </Layout>    
                    )}/>
                </Switch>
                            
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
  );