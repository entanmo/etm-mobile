/**
 * 模块名称：
 * 功能说明：
 * @Author: bin-donnie
 * @Date: 2018/4/27 上午10:33
 */

const EtmAPI = {
    //WS测试地址
    flag : 'DEV',  //DEV-开发，TEST-测试，PRODUCT-生产

    //服务器地址-开发
    URL_DEV: 'http://111.231.208.22:4096',//Socket 2 android
    URL_UPLOAD_DEV:'http://111.231.208.22:4096',//文件上传

    //服务器地址-测试
    URL_TEST: '',
    URL_UPLOAD_TEST:'',

    //服务器地址-生产
    URL_PRODUCT: '',
    URL_UPLOAD_PRODUCT:'',

    getURL(){
        switch(this.flag){
            case 'DEV':
                return this.URL_DEV;
            case 'TEST':
                return this.URL_TEST;
            case 'PRODUCT':
                return this.URL_PRODUCT;
            default:
                return '';
        }
    },

    getUploadURL(){
        switch(this.flag){
            case 'DEV':
                return this.URL_UPLOAD_DEV;
            case 'TEST':
                return this.URL_UPLOAD_TEST;
            case 'PRODUCT':
                return this.URL_UPLOAD_PRODUCT;
            default:
                return '';
        }
    },

    //业务地址:
    //登录
    LOGIN_ACCOUNT:'/api/accounts/open2/',
    //获取账户信息
    GET_ACCOUNT_INFO:'/api/accounts',
    //获取交易列表
    GET_TRANSACTION_LIST:'/api/transactions',
    //交易
    TRANSACTIONS:'/peer/transactions',
    //受托人列表
    DELEGATE_LIST:'/api/delegates',
    //根据公钥获取谁投了票
    GET_VOTERS:'/api/delegates/voters',
    //节点
    PEERS:'/api/peers',

}

export default EtmAPI;