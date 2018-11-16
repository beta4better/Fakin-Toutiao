import React, {Component} from 'react';
import Search from '../../common/search/search'
import Toolbar from '../../common/toolbar/toolbar'
import Loading from '../../components/loading'
import Recommend from '../../common/recommend/recommend'
import List from '../../common/list/list'
import Comments from './components/comments'
import Footer from '../../common/footer/footer'
import './detail.styl'
import logo from '../../statics/images/logo.png'
import {connect} from 'react-redux'
import {actionCreators, actionTypes} from './store'
import  config from '../../config/config'

class Detail extends Component {
    componentDidMount() {
        this.props.getRecommend();
        this.props.getArticle(this.props.match.params.id).then(() => {
            document.title = this.props.article.title;
            this.props._isLoading(false);
        });
        this.props.getRelated(this.props.match.params.id);
        this.props.getComments(this.props.match.params.id);
        window.addEventListener('scroll', this.handleScroll.bind(this));

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        let style3 = {
            display: 'block',
            opacity: 1,
            transition: ' opacity .2s'
        };
        let style = {
            position: 'fixed',
            width: '100%',
            height: '100%',
            background: '#fff'
        };
        let articleTime = '';
        if (this.props.article.ts) {
            articleTime = config.normalTime(this.props.article.ts);
        }
        let comment = '';
        if (this.props.comments_count && this.props.comments_count > 0) {
            comment = <span><a href="#comments">{this.props.comments_count + '评论'}</a></span>
        } else {
            comment = <span><a href="#comments">暂无评论</a></span>
        }
        return (
            <React.Fragment>
                <div className="article-content">
                    <div className="article-bar">
                        <div className="middle-bar">
                            <a href="/" className="logo-box">
                                <img src={logo} alt="" className="logo"/>
                            </a>
                            <div className="middle-title">
                                <a href="/">首页</a> / 正文
                            </div>
                            <div className="middle-search">
                                <Search/>
                            </div>
                        </div>
                    </div>
                    {this.props.isLoading ? (<div style={style}>
                        <Loading/>
                    </div>) : null}
                    <div className="article-warp">
                        <div className="article-left">
                            <div className="article-title">
                                <h1>{this.props.article.title}</h1>
                            </div>
                            <div className="article-sub">
                                <span>{this.props.article.site}</span>
                                <span>{ articleTime }</span>
                                {comment}
                            </div>
                            <div className="article-detail" dangerouslySetInnerHTML={{__html: this.props.content}}>
                            </div>
                            <Comments comments={this.props.comments} count={this.props.comments_count}/>
                            <div className="article-related">
                                {
                                    this.props.related.map((item, index) => {
                                        return <List article={item} key={index} index={index}
                                                     deleteItem={this.handleDelItem.bind(this)}
                                        />
                                    })
                                }
                            </div>
                        </div>
                        <div className="article-right">
                            <Recommend recommend={this.props.recommend}/>
                        </div>
                        {this.props.isToolbar ? (<Toolbar style={style3}/>) : <Toolbar/>}
                    </div>
                </div>
                {this.props.isLoading ? null : (<Footer/>)}
            </React.Fragment>
        )
    }

    handleScroll() {
        let scroll = document.documentElement.scrollTop || document.body.scrollTop;
        (scroll >= 500) ? this.props._isToolbar(true) : this.props._isToolbar(false)
    }

    handleDelItem(index) {
        this.props.delNewsList(index);
    }
}
const mapStateToProps = (state) => {
    return {
        article: state.detail.article,
        content: state.detail.content,
        related: state.detail.related,
        comments: state.detail.comments,
        comments_count: state.detail.comments_count,
        recommend: state.detail.recommend,
        isLoading: state.detail.isLoading,
        isToolbar: state.detail.isToolbar,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getArticle(id){
            return dispatch(actionCreators.getArticle(id))
        },
        getRelated(id){
            dispatch(actionCreators.getRelated(id))
        },
        getComments(id){
            dispatch(actionCreators.getComments(id))
        },
        getRecommend(){
            dispatch(actionCreators.getNewList('BE127CE3343D4F3FE7C464942DE99DA2:FG=1', '互联网', actionTypes.GET_RECOMMEND_ACTION))
        },
        _isLoading(show){
            dispatch(actionCreators.isShow(show, actionTypes.GET_LOADING_ACTION))
        },
        _isToolbar(show){
            dispatch(actionCreators.isShow(show, actionTypes.GET_TOOLBAR_ACTION))
        },
        delNewsList(index){
            dispatch(actionCreators.delNewList(index))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Detail)