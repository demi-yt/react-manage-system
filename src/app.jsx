import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom';


// 登录
import Login from './page/login/index.jsx'
import Home from './page/home/index.jsx'
class App extends React.Component{
    render() {
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                </Switch>
            </Layout>
        );
        return(
            <Router>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" render={ props => LayoutRouter}></Route>
                </Switch> 
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
  );