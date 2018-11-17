import React, {Component} from 'react';
import Nav from '../../common/nav/nav'
import Banner from '../../common/swiper/swiper'
import Search from '../../common/search/search'
import List from '../../common/list/list'
import Loading from '../../components/loading'
import Toolbar from '../../common/toolbar/toolbar'
import Recommend from '../../common/recommend/recommend'
import Footer from '../../common/footer/footer'
import './home.styl'
import {connect} from 'react-redux'
import {actionCreatros, actionTypes} from './store'
class Home extends Component {

    componentDidMount() {//挂载后
        this.props._isLoading(true);
        document.title = '今日头条';
        window.addEventListener('scroll', this.handleScroll.bind(this));
        this.props.getBannerList();
        this.props.getRecommend();
        this.props.getNewsList().then(() => {
            this.props._isLoading(false);
        });
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        let swiper = null;
        let style = {
            width: "100%",
            height: "330px"
        };
        let style3 = {
            display: 'block',
            opacity: 1,
            transition: ' opacity .2s'
        };
        if (this.props.banner.length > 0) {
            swiper = <Banner list={this.props.banner}/>
        }
        return (
            <React.Fragment>
                <div className="home" ref="warp">
                    <div className="warp">
                        <Nav isFixed={this.props.isFixed}/>
                        <div className="warp-center">
                            <div style={style}>
                                {swiper}
                            </div>
                            <div className="article">
                                {
                                    this.props.list.map((item, index) => {
                                        return <List article={item} key={index} index={index}
                                                     deleteItem={this.handleListDelete.bind(this)}
                                        />
                                    })
                                }
                            </div>
                            {this.props.isLoading ? (<Loading/>) : (null)}

                        </div>
                        <div className="right">
                            <Search/>
                            {<Recommend recommend={this.props.recommend}/>}

                        </div>
                        {this.props.isToolbar ? (<Toolbar style={style3}/>) : <Toolbar/>}
                    </div>
                </div>
                {this.props.list.length > 0 ? (<Footer/>) : null}
            </React.Fragment>
        )
    }


    //绑定事件
    handleListDelete(index) {
        let list = [...this.props.list];
        this.props.delNewsList(index);
        if (list.length === 1) {
            this.props._isLoading(true);
            this.props.loadMoreList().then(() => {
                this.props._isLoading(false);
            })
        }
    }

    handleScroll() {
        let _this = this;
        let _clientHeight = document.documentElement.clientHeight;
        let _bodyHeight = document.body.clientHeight;
        let offset = document.documentElement.scrollTop || document.body.scrollTop;
        if (!_this.props.isFixed) {//因为chrome浏览器滚动的时候元素fixed会导致卡顿掉帧，所以限制一下，当元素第一次fixed的时候，浏览器再次滚动就不在渲染这个Dom，而其他浏览器则没有这个bug,可能是因为chrome吃内存的原因。
            if (offset >= 50) {//固定导航
                this.props._isFixed(true);
            }
        }
        if (!_this.props.isToolbar) {
            if (offset >= 500) {//显示点击回顶部按钮
                this.props._isToolbar(true);
            }
        }
        if (offset < 50) {
            this.props._isToolbar(false);
            this.props._isFixed(false);
        }
        if (_clientHeight + offset >= _bodyHeight - 100) {//加载更多列表
            if (_this.props.isLoading) {//正在加载中
                return
            }
            this.props._isLoading(true);
            _this.props.loadMoreList().then(() => {
                this.props._isLoading(false);
            })
        }
    }
}

const mapStateToProps = (state) => {
    return {
        banner: state.home.banner,
        list: state.home.newsList,
        recommend: state.home.recommend,
        isLoading: state.home.isLoading,
        isToolbar: state.home.isToolbar,
        isFixed: state.home.isFixed,
    }

};
const mapDispatchToProps = (dispatch) => {
    return {
        getBannerList(){
            dispatch(actionCreatros.getBanner())
        },
        getNewsList(){
            return dispatch(actionCreatros.getNewList('676EF912668022F24DE959D84B615F29:FG=1', '', actionTypes.GET_NEWS_ACTION))
        },
        loadMoreList(){
            return dispatch(actionCreatros.getNewList('676EF912668022F24DE959D84B615F29:FG=1', '', actionTypes.LOAD_MORE_CATION))
        },
        delNewsList(){
            dispatch(actionCreatros.delNewList())
        },
        getRecommend(){
            dispatch(actionCreatros.getNewList('BE127CE3343D4F3FE7C464942DE99DA2:FG=1', '互联网', actionTypes.GET_RECOMMEND_ACTION))
        },
        _isLoading(show){
            dispatch(actionCreatros.isShow(show, actionTypes.GET_LOADING_ACTION))
        },
        _isToolbar(show){
            dispatch(actionCreatros.isShow(show, actionTypes.GET_TOOLBAR_ACTION))
        },
        _isFixed(show){
            dispatch(actionCreatros.isShow(show, actionTypes.GET_FIXED_ACTION))
        }

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
