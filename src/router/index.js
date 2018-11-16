/**
 * Created by Fakin on 2018/11/7.
 */
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import asyncComponents from  "../components/AsyncComponents"

// import Home from '../page/home/home';
// import Hot from '../page/hot/hot';
// import Search from '../page/search/search';
const AsyncHome = asyncComponents(() => import('../page/home/home'));
const AsyncHot = asyncComponents(() => import('../page/hot/hot'));
const AsyncSearch = asyncComponents(() => import('../page/search/search'));
const AsyncDetail = asyncComponents(() => import('../page/detail/detail'));
const AsyncMilitary = asyncComponents(() => import('../page/military/military'));
const AsyncWorld = asyncComponents(() => import('../page/world/world'));
const AsyncFunny = asyncComponents(() => import('../page/funny/funny'));
const router = (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={AsyncHome}/>
            <Route path='/hot' exact component={AsyncHot}/>
            <Route path='/search/:keyword' exact component={AsyncSearch}/>
            <Route path='/detail/:id' exact component={AsyncDetail}/>
            <Route path='/military' exact component={AsyncMilitary}/>
            <Route path='/world' exact component={AsyncWorld}/>
            <Route path='/funny' exact component={AsyncFunny}/>
            {/*<Route path='/' exact component={Home}/>*/}
            {/*<Route path='/hot' exact component={Hot}/>*/}
            {/*<Route path='/search/:keyword' exact component={Search}/>*/}
        </Switch>
    </BrowserRouter>
);
export default router