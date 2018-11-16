/**
 * Created by Fakin on 2018/11/14.
 */
import {
    GET_ARTICLE_ACTION,
    GET_RELATED_ACTION,
    GET_COMMENTS_ACTION,
    GET_COMMENTS_COUNT,
    GET_RECOMMEND_ACTION,
    DEL_NEWS_ACTION
} from './actionTypes'
import config from '../../../config/config'

import axios from 'axios'
export const getArticle = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios({
                url: '/baidu/news?tn=bdapibaiyue&t=recommendinfo',
                method: 'post',
                data: config.DetailData(id),
                transformRequest: [function (data) {
                    let ret = '';
                    for (let i in data) {
                        ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
                    }
                    return ret
                }]
            }).then(res => {
                const action = {
                    type: GET_ARTICLE_ACTION,
                    data: res.data.data.news[0]
                };
                dispatch(action);
                resolve(res.data.errmsg)
            })
        })
    }
};
export const getRelated = (id) => {
    return (dispatch) => {
        axios({
            url: '/baidu/news?tn=bdapibaiyue&t=getbodyinfo&act=get',
            method: 'post',
            data: config.Related(id),
            transformRequest: [function (data) {
                let ret = '';
                for (let i in data) {
                    ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
                }
                return ret
            }]
        }).then((res) => {
            const action = {
                type: GET_RELATED_ACTION,
                data: res.data.data.related_news
            };
            dispatch(action)
        })
    }
};
export const getComments = (id) => {
    return (dispatch) => {
        axios({
            url: '/baidu/news?tn=bdapibaiyue&t=getcomments&act=get',
            method: 'post',
            data: config.Comments(id),
            transformRequest: [function (data) {
                let ret = '';
                for (let i in data) {
                    ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
                }
                return ret
            }]
        }).then(res => {
            const action = {
                type: GET_COMMENTS_ACTION,
                data: res.data.data.comments
            };
            dispatch(action)
        });
        axios({
            url: '/baidu/news?tn=bdapibaiyue&t=getcommentcount&act=get',
            method: 'post',
            data: config.Comments(id),
            transformRequest: [function (data) {
                let ret = '';
                for (let i in data) {
                    ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
                }
                return ret
            }]
        }).then(res => {
            const action = {
                type: GET_COMMENTS_COUNT,
                data: res.data.data.count
            };
            dispatch(action)
        });
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
export const isShow = (show, type) => {
    return {
        type: type,
        show
    }
};
export const delNewList = (index) => {
    return {
        type: DEL_NEWS_ACTION,
        index
    }
}