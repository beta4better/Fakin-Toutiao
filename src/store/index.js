/**
 * Created by Fakin on 2018/11/10.
 */
import  {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk'
// import {persistStore, persistReducer} from 'redux-persist'
// import storage from 'redux-persist/lib/storage/session'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const persistConfig = {
//     key: 'Tou',
//     storage,
//     blacklist: ['detail'],//配置黑名单
// };
// const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(reducer,
    composeEnhancers(applyMiddleware(
        thunk
    ))
);
export default store
// export default () => {
//     let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(
//         thunk
//     )));
//     let persistor = persistStore(store);
//     return {
//         store,
//         persistor
//     }
// }
//以上注释部分为redux-persist本地存储方案（适用于手机端或者webapp）