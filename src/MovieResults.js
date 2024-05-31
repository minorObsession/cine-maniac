import Movie from "./Movie";

function MovieResults({ searchResults, dispatch, activePage, numPages }) {
  return (
    <>
      <ul className="list list-movies">
        {searchResults?.map((movie) => (
          <Movie key={movie.imdbID} movie={movie} dispatch={dispatch}></Movie>
        ))}
      </ul>
      {searchResults.length > 0 && (
        <div className="pagination">
          <button
            className="btn"
            onClick={() => dispatch({ type: "previousPage" })}
          >
            &larr;
          </button>
          <span>
            {" "}
            Page {activePage} / {numPages}{" "}
          </span>
          <button
            className="btn"
            onClick={() => dispatch({ type: "nextPage" })}
          >
            &rarr;
          </button>
        </div>
      )}
    </>
  );
}

export default MovieResults;
