/*
Core Libs
*/
import React from 'react';
/*
Local CSS
*/
import './KeywordFilter.component.css';


class KeywordFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: ''
        }
    }

    // onChangeKeywordEntry = (e) => {
    //     this.setState({searchKeyword: e.target.value});
    // }

    render() {
        let { searchKeyword } = this.state;
        const { onChange } = this.props;

        // return (
        //     <form className="keyword-search-box" onSubmit={onChange}>
        //         <input
        //             type="text"
        //             value={searchKeyword}
        //             onChange={this.onChangeKeywordEntry}
        //         />
        //         <button
        //             className="search-btn"
        //             type="submit"
        //         >
        //             <i className="material-icons">search</i>
        //         </button>
        //     </form>
        // );

        return (
            <div className="keyword-search-box">
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => this.setState({searchKeyword: e.target.value})}
                />
                <button
                    className="search-btn"
                    onClick={() => onChange(searchKeyword)}
                >
                    <i className="material-icons">search</i>
                </button>
            </div>
        );
    }
}

export default KeywordFilter;
