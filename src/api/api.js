import axios from '@/assets/libs/axiosConfig'

// 獲取數據
export const getDataList = (params) => {
    return axios.request({
        method: 'GET',
        url: '/api/data/list',
        params: params,
    });
}