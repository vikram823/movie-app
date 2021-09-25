import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import { addMovies, showFavourites } from "../actions";
import {connect} from "react-redux"

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(addMovies(data));
  }

  isMovieFav = (movie) => {
    const { movies } = this.props;
    const { favourites } = movies;

    const index = favourites.indexOf(movie);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  onChangeTab = (val) => {
    this.props.dispatch(showFavourites(val));
  };

  render() {
    const { movies } = this.props;
    const { list, favourites, showFav } = movies;
    const displayMovies = showFav ? favourites : list;

    return (
      <div className="App">
        <Navbar/>

        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFav ? "" : "active-tabs"}`}
              onClick={() => this.onChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFav ? "active-tabs" : ""}`}
              onClick={() => this.onChangeTab(true)}
            >
              Favourites
            </div>
          </div>
          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={index}
                dispatch={this.props.dispatch}
                isFav={this.isMovieFav(movie)}
              />
            ))}
            {displayMovies.length === 0 ? (
              <div className="no-movies">No movies to display!</div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({movies, search}){
  return{
    movies,
    search
  }
}

const connectedAppComponent = connect(mapStateToProps)(App)

export default connectedAppComponent;
