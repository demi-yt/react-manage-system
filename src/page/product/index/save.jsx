import React from 'react';
import MUtil from '../../../util/index.jsx';
import Product from '../../../service/product-service.jsx';
import PageTitle from '../../../component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from '../../../util/file-uploader/index.jsx';
import RichEditor from '../../../util/rich-editor/index.jsx';

import './save.scss';


const _index = new MUtil();
const _product = new Product();

class ProductSave extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.match.param.pid,
            name : '',
            subtitle : '',
            categoryId : 0,
            parentCategoryId : 0,
            subIamges : [],
            price : '',
            stock : '',
            detail : '',
            status : 1 // 商品状态为1为在售
        }
    }
    componentDidMount() {
        this.loadProduct();
    }
    // 加载商品详情
    loadProduct() {
        // 有id时，表示是编辑功能，需要表单回填
        if(this.state.id) {
            _product.getProduct(this.state.id).then((res) => {
                let images = res.subIamges.split(',');
                res.subIamges = images.map((imgUrl) => {
                    return {
                        uri: imgUrl,
                        url: res.imageHost + imgUrl
                    }
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            },(errMsg) => {
                _index.errorTips(errMsg);
            })
        }
    }
}
