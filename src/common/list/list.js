import React, {Component} from 'react';
import {Link} from "react-router-dom"
import config from '../../config/config'
import './list.styl'
class NewList extends Component {
    handleDelete() {
        this.props.deleteItem(this.props.index)
    }

    render() {
        let articleTime = '';
        let comment_count = '';
        if (this.props.article.time) {
            articleTime = config.normalTimer(this.props.article.time)
        }
        if (this.props.article.comment_count && this.props.article.comment_count > 0) {
            comment_count = <span className="article-time">·{this.props.article.comment_count}评论</span>
        } else {
            comment_count = <span className="article-time">·暂无评论</span>
        }
        return (
            <div className="article-list">
                <Link to={this.props.isSearch ? {
                    pathname: this.props.article.url,
                } : `/detail/${this.props.article.id}`}
                      target='_blank'>
                    <div className="article-image">
                        <img src={this.props.article.image} alt=""/>
                    </div>
                    <div className="article-content">
                        <h3 className="article-title">
                            {this.props.article.title}
                        </h3>
                        <div className="article-footer">

                        <span className="article-user">
                            <img src={this.props.article.image} alt="" className="user-img"/>
                            <p>{this.props.article.site}</p>
                        </span>
                            {comment_count}
                            <span className="article-time">·{articleTime}</span>
                        </div>
                    </div>
                </Link>
                <div className="deleteBtn" onClick={this.handleDelete.bind(this)}
                     style={this.props.isSearch ? {display: 'none'} : (null)}>
                    <span className="deleteBtn-icon">x</span>
                    不感兴趣
                </div>
            </div>
        )
    }
}
export default NewList