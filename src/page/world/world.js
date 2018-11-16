import React, {Component} from 'react';
import Nav from '../../common/nav/nav'
import './world.styl'
class World extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className="military">
                <div className="warp">
                    <Nav url={this.props.match}/>
                    当前为小菜单切换演示页面，不做实际数据展示，为的只是达到今日头条那种小菜单切换的效果
                </div>
            </div>
        )
    }
}
export default World