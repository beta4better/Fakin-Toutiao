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
import normalList from '../nromalList'
const defaultState = {
    list: [],
    word: '',
    pn: 0,
    loading: false,
    toolbar: false
};

const getList = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = [...normalList(action.data)]
    return newState
};
const getWord = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.word = action.word;
    return newState
};
const loadList = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = newState.list.concat(normalList(action.data));
    newState.pn += 20;
    return newState
};
const getLoading = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.loading = action.show;
    return newState
};
const getPn = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.pn = action.num;
    return newState
};
const toolbar = (state, action) => {
    const newState = JSON.parse(JSON.stringify(state));
    newState.toolbar = action.show;
    return newState
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_SEARCH_ACTION :
            return getList(state, action);
        case GET_WORD_ACTION :
            return getWord(state, action);
        case GET_LOAD_ACTION :
            return loadList(state, action);
        case GET_LOADING_ACTION :
            return getLoading(state, action);
        case GET_PN_ACTION:
            return getPn(state, action);
        case GET_TOOLBAR_ACTION :
            return toolbar(state, action);
        default :
            return state
    }
}