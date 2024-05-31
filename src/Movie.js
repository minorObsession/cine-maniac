function Movie({ movie, dispatch }) {
  console.log(movie);
  return (
    <li
      className="list"
      onClick={() => dispatch({ type: "selectMovie", payload: movie.imdbID })}
    >
      <img src={movie.Poster} alt="Movie Poster"></img>
      <h3>{movie.Title}</h3>
      <div>
        <p>📅</p>
        <p>({movie.Year})</p>
        <span>({movie.Type}) </span>
      </div>
    </li>
  );
}

export default Movie;
