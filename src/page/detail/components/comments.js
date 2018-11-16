import React, {Component} from 'react';
import config from '../../../config/config'
class Comments extends Component {
    render() {
        return (
            <div className="article-comments" id="comments">
                <div className="comments-title">
                    <em className="comments-count">{this.props.count}</em>条评论（留下你的评论）
                </div>
                <div className="comments-input">
                    <textarea placeholder="写下您的评论..." className="comments-content">

                    </textarea>
                    <button className="comments-btn">提交</button>
                </div>
                <div className="comments-list">
                    {this.props.comments.map((item, index) => {
                        return <div className="comments-item" key={item.id}>
                            <img src={item.user_pic} alt="" className="user-img"/>
                            <div className="user-content">
                                <div className="user-info">
                                    <span style={{marginRight: '10px'}}>{item.user_name}</span>
                                    <span style={{fontSize: '12px'}}>{config.normalTimer(item.ts)}</span>
                                </div>
                                <div className="user-reply">
                                    {item.text}
                                </div>
                                <div className="footer-action">
                                    <span className="reply-count">回复</span>
                                </div>
                                <div className="reply-comments">

                                </div>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        )
    }
}
export default Comments