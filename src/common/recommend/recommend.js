/**
 * Created by Fakin on 2018/11/14.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './recommend.styl'
class Recommend extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="recommend-box">
                    <div className="recommend-title">推荐新闻</div>
                    <ul>

                        {
                            this.props.recommend.map((item, index) => {
                                return <li key={item.nid} className="recommend-list">
                                    <Link to={`/detail/${item.nid}`} target='_bank'>
                                        {item.title}
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}
export default Recommend