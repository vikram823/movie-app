import React from "react";
import { addMovieToList, handleMovieSeach} from "../actions";
import {connect} from "react-redux"


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  handleAddToMovies = (movie)=>{
    this.props.dispatch(addMovieToList(movie));
    this.setState({
        showSearchResults:false
    });
  }
  handleSearch = ()=>{
        const {searchText} = this.state

        this.props.dispatch(handleMovieSeach(searchText))
  }

  handleChange = (e)=>{
    this.setState({
        searchText: e.target.value
    })
  }
  render() {
    const {result, showSearchResults} = this.props.search
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>
        </div>
        {showSearchResults && (
          <div className="search-results">
            <div className="search-result">
              <img src={result.Poster} alt="search-pic" />

              <div className="movie-info">
                <span>{result.Title}</span>
                <button onClick={() => this.handleAddToMovies(result)}>
                  Add To Movies
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({search}){
  return{
    search
  }
}

export default connect(mapStateToProps)(Navbar);