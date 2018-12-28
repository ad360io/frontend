/*
Core Libs
*/
import React from 'react';
/*
Local CSS
*/
import './KeywordFilter.component.css';
import { keywordFilterCss } from "./KeywordFilter.style";


class KeywordFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render() {
        let { value } = this.state;
        let { onChange } = this.props;

        return (
            <div className={keywordFilterCss}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => this.setState({value: e.target.value})}
                />
                <button
                    className="search-btn"
                    onClick={() => onChange(value)}
                >
                    <i className="material-icons">search</i>
                </button>
            </div>
        )
    }
}

export default KeywordFilter;
