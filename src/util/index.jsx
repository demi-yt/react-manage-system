
class MUtil {
    request(param) {
        return new Promise((resolve, rejects) => {
            $.ajax({
                type:param.type || 'get',
                url:param.url || '',
                dataType:param.dataType || 'json',
                data:param.data || null,
                success:res => {
                    // 数据请求成功
                    if(0 === res.status) {
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    }else if(10 === res.status) { // 没有登录状态，强制登录
                        this.doLogin();
                    }else{
                        typeof rejects === 'function' && rejects(res.msg || res.data);
                    }
                },
                //异常处理
                error:err => {
                    typeof rejects === 'function' && rejects(err.statusText);
                }
            });
        });
    }
    // 跳转登录
    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 获取url参数
    getUrlParam(name) {
        // 列如：param=123?&name=demi
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 成功提示
    successTips(successMsg) {
        alert(successMsg || '操作成功！');
    }
    // 失败提示
    errorTips(errMsg) {
        alert(errMsg || '操作失败！');
    }
    // 本地存储
    setStorage(name,data) {
        let dataType = typeof data;
        // json对象
        if(dataType === 'object') {
            window.localStorage.setItem(name, JSON.stringify(data));
        }else if(['number','string','boolean'].indexOf(dataType) >= 0) {  // 基础类型
            window.localStorage.setItem(name, data);
        }else{
            alert('该类型不能用于本地存储~');
        }
    }
    // 获取本地存储内容
    getStorage(name) {
        let data = window.localStorage.getItem(name);
        if(data) {
            return JSON.parse(data);
        }else{
            return ''
        }
    }
    // 删除本地存储
    removeStorage(name) {
        window.localStorage.removeItem(name);
    }
}

export default MUtil;