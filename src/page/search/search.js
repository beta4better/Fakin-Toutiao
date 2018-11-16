import React, {Component} from 'react';
import './search.styl'
import {connect} from 'react-redux'
import {actionCreators} from './store'
import List from '../../common/list/list'
import logo from '../../statics/images/logo.png'
import Loading from '../../components/loading'
import Footer from '../../common/footer/footer'
import Toolbar from '../../common/toolbar/toolbar';
class Search extends Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.props._getLoading(true);
        this.props.getWord(this.props.match.params.keyword);
        this.props._getSearchList(this.props.match.params.keyword, this.props.pn).then(() => {
            this.props._getLoading(false);
        });
        document.title = this.props.match.params.keyword + '_头条搜索'
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        let _this = this;
        let _clientHeight = document.documentElement.clientHeight;
        let _bodyHeight = document.body.clientHeight;
        let offset = document.documentElement.scrollTop || document.body.scrollTop;
        if (offset >= 500) {
            if (!this.props.toolbar) {
                this.props._toolbar(true)
            }

        } else {
            this.props._toolbar(false)
        }
        if (_clientHeight + offset >= _bodyHeight - 100) {//加载更多列表
            if (this.props.loading) {
                return
            }
            this.props._getLoading(true);
            _this.props._getLoadList(this.props.word, this.props.pn + 20).then((res) => {
                this.props._getLoading(false);

            })
        }
    }

    handleBtn() {
        if (this.props.word === this.props.match.params.keyword) {
            return
        }
        new Promise((resolve, reject) => {
            this.props.history.push({
                pathname: `/search/${this.props.word}`,
            });
            resolve()
        }).then(() => {
            this.props._getSearchList(this.props.word, 0);
            this.props.getPn(0);
            document.title = this.props.match.params.keyword + '_头条搜索';
        });


    }

    inputChange(e) {
        this.props.getWord(e.target.value)
    }

    render() {
        return (
            <React.Fragment>
                <div className="search">
                    <div className="warp">
                        <div className="search-left">
                            <a href="/"><img src={logo} alt=""/></a>
                        </div>
                        <div className="search-right">
                            <div className="search-box">
                                <input type="text" className="search-input" value={this.props.word}
                                       onChange={this.inputChange.bind(this)}/>
                                <button className="search-button" onClick={this.handleBtn.bind(this)}>搜索</button>
                            </div>
                            <div className="search-list">
                                {
                                    this.props.list.map((item, index) => {
                                        return <List article={item} key={index} index={index}
                                                     isSearch={true}/>
                                    })
                                }
                            </div>
                            {this.props.loading ? <Loading/> : (null)}
                        </div>
                        {this.props.toolbar ? <Toolbar style={{display: 'block', opacity: '1'}}/> : <Toolbar/>}

                    </div>
                </div>
                {this.props.list.length > 0 ? <Footer/> : null}
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.search.list,
        pn: state.search.pn,
        word: state.search.word,
        loading: state.search.loading,
        toolbar: state.search.toolbar,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getWord(key){
            dispatch(actionCreators.getWord(key))
        },
        _getSearchList(word, pn){
            return dispatch(actionCreators.getSearchList(word, pn))
        },
        _getLoadList(word, pn){
            return dispatch(actionCreators.getLoadList(word, pn))
        },
        _getLoading(show){
            dispatch(actionCreators.getLoading(show))
        },
        getPn(num){
            dispatch(actionCreators.getPn(num))
        },
        _toolbar(show){
            dispatch(actionCreators.toolbar(show))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search)