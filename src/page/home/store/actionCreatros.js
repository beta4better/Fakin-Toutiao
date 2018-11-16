/**
 * Created by Fakin on 2018/11/13.
 */
import {GET_BANNER_ACTION, DEL_NEWS_ACTION, GET_RECOMMEND_ACTION} from './actionTypes'
import axios from 'axios'
import config from '../../../config/config'
export const getBanner = () => {
    return (dispatch) => {
        axios.get('/api/banner.json').then(res => {
            if (res.data.message === 'ok') {
                const action = {
                    type: GET_BANNER_ACTION,
                    data: res.data.list
                };
                dispatch(action)
            }
        })
    }
};
export const getNewList = (id, name, type) => {
    const recommendData = JSON.parse(window.sessionStorage.getItem('recommend')) || ''
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            if (type === GET_RECOMMEND_ACTION && recommendData) {
                const action = {
                    type: type,
                    data: recommendData
                };
                dispatch(action);
                return
            }
            axios({
                url: '/baidu/sn/api/feed_feedlist',
                method: 'post',
                data: config.CateData(id, name),
                transformRequest: [function (data) {
                    let ret = '';
                    for (let i in data) {
                        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
                    }
                    return ret
                }],

            }).then(res => {
                if (res.data.errmsg === "OK") {
                    const action = {
                        type: type,
                        data: res.data.data.news
                    };
                    dispatch(action);
                    resolve(res.data.errmsg)
                }
            });
        })
    }
};
export const delNewList = (index) => {
    return {
        type: DEL_NEWS_ACTION,
        index
    }
};
export const isShow = (show, type) => {
    return {
        type: type,
        show
    }
};
