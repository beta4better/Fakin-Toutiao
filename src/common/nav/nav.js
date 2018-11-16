import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import logo from '../../statics/images/logo.png'
import {nav, children_nav} from './nav.json'
import './nav.styl'
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: nav,
            c_list: children_nav,
        };
        this.nromalMenulist = this.nromalMenulist.bind(this)
    }

    componentDidMount() {
        this.nromalMenulist(this.state.c_list)

    }

    nromalMenulist(list) {
        let url = this.props.url;
        if (!url) {
            return
        }
        let _list = [...this.state.c_list];
        let fList = [...this.state.list];
        list.forEach((item, index) => {
            if (url.url === item.url) {//找到当前页面在小菜单数组中的位置
                let lastItem = fList.pop();//返回大菜单删除的项目
                fList.push(item);//大菜单插入当前小菜单
                _list.splice(index, 1, lastItem);//删除菜单中当前页面，并插入默认的搞笑页面
                this.setState({//重新设置小菜单和默认的页面
                    c_list: _list,
                    list: fList
                })
            }
        })
    }

    render() {
        return (
            <div className="nav">
                <div>
                    <div className={this.props.isFixed ? 'nav-fixed' : null}>
                        <a href="/" className="logo">
                            <img src={logo}/>
                        </a>
                        <ul>
                            {
                                this.state.list.map((item, index) => {
                                    return <li key={index}>
                                        <NavLink to={item.url} exact activeClassName="active"
                                                 className="nav-list">{item.name}</NavLink>
                                    </li>
                                })
                            }
                            <li className="channel-more">
                                <a href="javascript:;" className="nav-list">更多</a>
                                <div className="channel-more-layer">
                                    <ul>
                                        {
                                            this.state.c_list.map((item, index) => {
                                                return <li key={index}>
                                                    <NavLink to={item.url} exact activeClassName="active"
                                                             className="nav-list">{item.name}</NavLink>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Nav