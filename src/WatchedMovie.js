function WatchedMovie({ watchedMovie, setWatched }) {
  //
  function handleDeleteMovieFromWatched(selectedMovie) {
    setWatched((curr) => curr.filter((movie) => movie !== selectedMovie));
  }
  console.log(watchedMovie);
  return (
    <li className="list">
      <img src={watchedMovie.poster} alt="Movie Poster"></img>
      <h4 className="watched-title">
        {watchedMovie.title} {"   "}
        <em>
          {" "}
          {"    "}({watchedMovie.type}){" "}
        </em>
      </h4>
      <div>
        <span>⭐ {watchedMovie.imdbRating} </span>
        <span>🌟 {watchedMovie.userRating} </span>
        <span>⏳ {watchedMovie.runtime} </span>
      </div>
      <button
        className="btn-delete"
        onClick={() => handleDeleteMovieFromWatched(watchedMovie)}
      >
        x
      </button>
    </li>
  );
}

export default WatchedMovie;
