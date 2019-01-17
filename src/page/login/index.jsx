import React from 'react';
import MUtil from '../../util/index.jsx';
import User from '../../service/user-service.jsx';

import './index.scss';

const _index = new MUtil();
const _user = new User();


/**
 *
 *登录页面
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _index.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount() {
        document.title = '登录'
    }
    // 当用户名发生改变
    onInputChange(e){
        // e.target指向事件执行时鼠标所点击区域的那个元素 this指向当前事件所绑定的元素
        let inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
     
    onInputKeyUp(e) {
        if(e.keyCode === 13) {
            this.onSubmit();
        }
    }

    // 登录点击事件
    onSubmit() {       
        let loginInfo ={
            username : this.state.username,
            password : this.state.password
        },
        checkResult = _user.checkLoginInfo(loginInfo); // 校验返回值
        if(checkResult.status) {
            // 验证通过登录
            _user.login(loginInfo).then((res) => {
                // 本地存储用户登录信息
                _index.setStorage('userInfo',res);
                // 路由跳转
                this.props.history.push(this.state.redirect);
            },(errMsg) => {
                _index.errorTips(errMsg);
            });
        }else{
            _index.errorTips(checkResult.msg);
        }
    }

    render() {
        return (
            <div className="row">
                 <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">
                            <h3 className="panel-title">欢迎登录 - MMALL管理系统</h3>
                        </div>
                        <div className="panel-body">                        
                            <div>
                                <div className="form-group">
                                    <input type="text" className="form-control" name="username" placeholder="请输入用户名"
                                        onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}></input>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" placeholder="请输入登录密码"
                                        onKeyUp={e => this.onInputKeyUp(e)}
                                        onChange={e => this.onInputChange(e)}></input>
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary btn-block"
                                    onClick={e => {this.onSubmit(e)}}>登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}

export default Login;
