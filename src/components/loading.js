import React, {Component} from 'react';
import load from "../../src/statics/images/loading.gif"
class Loading extends Component {
    render() {
        const style = {
            textAlign: "center"
        };
        const img = {
            width: "50px",
            verticalAlign: "middle"
        };
        return (
            <div style={style}>
                <img src={load} alt="" style={img}/>
            </div>
        )
    }
}
export default Loading