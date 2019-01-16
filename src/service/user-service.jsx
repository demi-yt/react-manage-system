import MUtil from '../util/index.jsx'

const _index = new MUtil();

class User{

    /**
     *
     * 登录接口
     * @param {*} loginInfo
     * @returns
     * @memberof User
     */
    login(loginInfo){
        return _index.request({
            type: 'post',
            url: '/manage/user/login.do',
            data:loginInfo
        });
    }
    
    /**
     * 校验
     *
     * @param {*} loginInfo
     * @returns
     * @memberof User
     */
    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        // 判断用户名或者密码是否为空
        if(typeof username !== 'string' || username.length === 0) {
            return {
                status:false,
                msg:'用户名不能为空!'
            }
        }
        if(typeof password !== 'string' || password.length === 0) {
            return {
                statue:false,
                msg:'密码不能为空！'
            }
        }
        return {
            status:true,
            msg:'验证通过'
        }
    }
    
    /**
     * 退出登录
     *
     * @returns
     * @memberof User
     */
    loginOut() {
        return _index.request({
            type : 'post',
            url : '/user/logout.do'
        });
    }
    /**
     *
     * 登录成功获取用户列表
     * @param {*} pageSize(default=10) pageNum(default=1)
     * @returns
     * @memberof User
     */
    getUserList(pageNum) {
        return _index.request({
            type : 'post',
            url : '/manage/user/list.do',
            data : {
                pageNum : pageNum
            }
        });
    }
}

export default User;