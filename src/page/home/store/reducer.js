/**
 * Created by Fakin on 2018/11/13.
 */
import {
    GET_BANNER_ACTION,
    GET_NEWS_ACTION,
    DEL_NEWS_ACTION,
    GET_RECOMMEND_ACTION,
    LOAD_MORE_CATION,
    GET_LOADING_ACTION,
    GET_LOADING_END_TEXT_ACTION,
    GET_TOOLBAR_ACTION,
    GET_FIXED_ACTION
} from './actionTypes'
import normalList from '../../../common/list/normalList'
const defaultState = {
    banner: [],
    newsList: [],
    recommend: [],
    isLoading: false,
    isToolbar: false,
    isFixed: false
};
const banner = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.banner = [...action.data];
    return newState
};
const newsList = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.newsList = normalList(action.data);
    return newState
};
const loadMore = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.newsList = newState.newsList.concat(normalList(action.data));
    return newState
};
const delNewsList = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.newsList.splice(action.index, 1);
    return newState
};

const recommend = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.recommend = action.data.slice(0, 10);
    sessionStorage.setItem('recommend', JSON.stringify(newState.recommend));
    return newState
};
const isShow = (state, action, obj) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState[obj] = action.show;
    return newState
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_BANNER_ACTION :
            return banner(state, action);
        case GET_NEWS_ACTION :
            return newsList(state, action);
        case DEL_NEWS_ACTION:
            return delNewsList(state, action);
        case GET_RECOMMEND_ACTION :
            return recommend(state, action);
        case LOAD_MORE_CATION :
            return loadMore(state, action);
        case GET_LOADING_ACTION :
            return isShow(state, action, 'isLoading');
        case GET_TOOLBAR_ACTION :
            return isShow(state, action, 'isToolbar');
        case GET_FIXED_ACTION :
            return isShow(state, action, 'isFixed');
        default:
            return state
    }
}