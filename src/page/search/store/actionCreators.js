/**
 * Created by Fakin on 2018/11/16.
 */
import {
    GET_SEARCH_ACTION,
    GET_WORD_ACTION,
    GET_LOAD_ACTION,
    GET_LOADING_ACTION,
    GET_PN_ACTION,
    GET_TOOLBAR_ACTION
} from './actionTypes'
import axios from 'axios'
export const getSearchList = (word, pn) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`/baidu/news?tn=bdapinewsearch&word=${word}&pn=${pn}&rn=20&ct=1`).then(res => {
                const action = {
                    type: GET_SEARCH_ACTION,
                    data: res.data.data.list
                };
                dispatch(action);
                resolve('ok')
            })
        })
    }
};
export const getLoadList = (word, pn) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`/baidu/news?tn=bdapinewsearch&word=${word}&pn=${pn}&rn=20&ct=1`).then(res => {
                const action = {
                    type: GET_LOAD_ACTION,
                    data: res.data.data.list
                };
                dispatch(action);
                resolve('ok')
            })
        })

    }
};
export const getWord = (word) => {
    return {
        type: GET_WORD_ACTION,
        word
    }
};
export const getLoading = (show) => {
    return {
        type: GET_LOADING_ACTION,
        show
    }
};
export const getPn = (num) => {
    return {
        type: GET_PN_ACTION,
        num
    }
};
export const toolbar = (show) => {
    return {
        type: GET_TOOLBAR_ACTION,
        show
    }
};