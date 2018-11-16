import React from 'react';
import './header.styl'

const Header = () => {
    return (
        <div className="header">
            <div className="header-left">
                <a href="javascript:;">下载APP</a>
            </div>
            <div className="header-right">
                <a href="javascript:;">投诉建议</a>
                <a href="javascript:;">头条产品</a>
            </div>
        </div>
    )
};
export default Header