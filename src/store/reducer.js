/**
 * Created by Fakin on 2018/11/10.
 */
import {combineReducers} from 'redux'
import {reducer as homeReducer} from '../page/home/store'
import {reducer as detailReducer} from '../page/detail/store'
import {reducer as searchReducer} from '../page/search/store/index'
const reducer = combineReducers({
    home: homeReducer,
    detail: detailReducer,
    search: searchReducer
});
export default reducer