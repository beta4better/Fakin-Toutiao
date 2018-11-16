import React, {Component} from 'react';
import Nav from '../../common/nav/nav'
import './hot.styl'
class Hot extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount(){

    }
    render() {
        return (
            <div className="hot">
                <div className="warp">
                    <Nav/>
                </div>
            </div>
        )
    }
}
export default Hot