/**
 * Created by Fakin on 2018/11/14.
 */
import {
    GET_ARTICLE_ACTION,
    GET_RELATED_ACTION,
    GET_COMMENTS_ACTION,
    GET_COMMENTS_COUNT,
    GET_RECOMMEND_ACTION,
    GET_LOADING_ACTION,
    GET_TOOLBAR_ACTION,
    DEL_NEWS_ACTION
} from './actionTypes'
import normalDetail from '../normalDetail'
import normalList from '../../../common/list/normalList'
const defaultState = {
    article: {},
    content: '',
    related: [],
    comments: [],
    comments_count: 0,
    recommend: [],
    isLoading: true,
    isToolbar: false
};
const article = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.article = action.data;
    newState.content = normalDetail(action.data.content);
    return newState
};
const related = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.related = normalList(action.data);
    return newState
};
const comments = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.comments = action.data;
    return newState

};
const count = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.comments_count = action.data;
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
const delNewList = (state, action,) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.related.splice(action.index, 1)
    return newState
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_ARTICLE_ACTION :
            return article(state, action);
        case GET_RELATED_ACTION :
            return related(state, action);
        case GET_COMMENTS_ACTION :
            return comments(state, action);
        case GET_COMMENTS_COUNT :
            return count(state, action);
        case GET_RECOMMEND_ACTION :
            return recommend(state, action);
        case GET_LOADING_ACTION :
            return isShow(state, action, 'isLoading');
        case GET_TOOLBAR_ACTION :
            return isShow(state, action, 'isToolbar');
        case DEL_NEWS_ACTION :
            return delNewList(state, action,);
        default:
            return state
    }
}