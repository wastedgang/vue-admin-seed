import axios from 'axios'


class AxiosRequest {
    constructor() {
        this.baseURL = process.env.NODE_ENV == 'production'?'/':'http://localhost:3001'
        this.timeout = 3000
    }

    // 合并请求参数
    merge(options) {
        return {...options, timeout: this.timeout }
    };

    // 请求拦截器
    setInterceptors(instance) {
        //请求拦截
        instance.interceptors.request.use( (config) => {
            config.headers['Content-Type'] = 'application/json';
            return config;
        }, (err) => {
            return Promise.reject(err);
        });
        //相应拦截
        instance.interceptors.response.use( (res) => {
            return res.data;
        }, (err) => {
            return Promise.reject(err);
        });
    };

    //请求方法
    request(options) {
        const instance = axios.create();
        this.setInterceptors(instance);
        let config = this.merge(options);
        return instance(config)
    };
}

export default new AxiosRequest;