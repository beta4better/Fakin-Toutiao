import React, {Component} from 'react';
import './toolbar.styl'
class Toolbar extends Component {
    goTop() {
        document.documentElement.scrollTop ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0
    }

    render() {
        return (
            <div className="toolbar" onClick={ this.goTop.bind(this)}>
                <div className="backTop" style={this.props.style}>
                    ^
                </div>
            </div>
        )
    }
}
export default Toolbar