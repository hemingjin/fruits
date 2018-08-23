import axios from 'axios';

axios.defaults.timeout = 5000
if (process.env.NODE_ENV == 'production') {
    // 部署服务调用正式地址
    axios.defaults.baseURL = 'http://fruits.vchuang.com.cn';
} else {
    // 开发测试地址
    axios.defaults.baseURL = '/api';
}

export default {
    get(url, params) {
        return new Promise((reslove, reject) => {
            axios({
                method: 'get',
                url,
                params: params
            }).then((res) => {
                reslove(res);
            }).catch(err => {
                reject(err);
            })
        })
    },
    post(url, data={}) {
        return new Promise((reslove, reject) => {
            axios({
                method: 'post',
                url,
                data
            }).then((res) => {
                reslove(res);
            }).catch(err => {
                reject(err);
            })
        })
    }
}