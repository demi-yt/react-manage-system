import MUtil from '../util/index.jsx';

const _index = new MUtil();

class Statistic{
    // 首页数据统计
    getHomeCount() {
        return _index.request({
            url:'/manage/statistic/base_count.do'
        });
    }
}

export default Statistic;