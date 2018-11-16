import React, {Component} from 'react';
import './search.styl'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        };
        this.inputChange = this.inputChange.bind(this);
        this.getSearch = this.getSearch.bind(this)
    }

    inputChange(event) {
        this.setState({
            keyword: event.target.value
        });
    }

    getSearch() {
        if (!this.state.keyword) {
            return
        }
        window.open(`/search/${this.state.keyword}`, '_blank');
    }

    render() {
        return (
            <div className="search-box">
                <input type="text" className="search-input" value={this.state.keyword} onChange={this.inputChange}/>
                <button className="search-button" onClick={this.getSearch}>搜索</button>
            </div>
        )
    }
}
export default Search