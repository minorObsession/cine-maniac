import StarRating from "./StarRating copy";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";
import { useKeyPress } from "./useKeyPress";

function MoviePreview({
  movie,
  isLoading,
  setWatched,
  dispatch,
  watchedMovieArray,
}) {
  const [rating, setRating] = useState(null);

  function handleCloseMoviePreview() {
    dispatch({ type: "closeMoviePreview" });
  }

  function handleAddMovieToWatched() {
    setWatched((curr) => [...curr, newMovieObject]);
    dispatch({ type: "closeMoviePreview" });
  }

  function handleSetRating(e) {
    setRating(e);
  }
  console.log(movie);

  const newMovieObject = {
    title: movie.Title,
    poster: movie.Poster,
    actors: movie.Actors,
    imdbRating: movie.imdbRating,
    imdbID: movie.imdbID,
    genre: movie.Genre,
    runtime: movie.Runtime,
    plot: movie.Plot,
    director: movie.Director,
    released: movie.Released,
    userRating: rating,
    type: movie.Type,
  };

  const isInWatchedArrayAlready = watchedMovieArray?.find(
    (m) => m.imdbID === movie.imdbID
  );
  const hasRated = newMovieObject.userRating !== null;

  useKeyPress("Escape", function () {
    if (!movie) return;
    handleCloseMoviePreview();
  });

  return (
    <div className="details">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMoviePreview}>
              &larr;
            </button>
            <img src={newMovieObject.poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{newMovieObject.title} </h2>
              <p>
                {newMovieObject.released} &bull; {newMovieObject.runtime}
              </p>
              <p>{newMovieObject.genre}</p>
              <p>
                <span>⭐️</span>
                {newMovieObject.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating-container">
              <div className="rating">
                {isInWatchedArrayAlready ? (
                  <p>
                    You rated this movie{" "}
                    {
                      watchedMovieArray.find(
                        (movie) => movie.imdbID === newMovieObject.imdbID
                      ).userRating
                    }
                    / 10
                    <span>🌟</span>
                  </p>
                ) : (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      onSetRating={(e) => handleSetRating(e)}
                    />
                    {hasRated && (
                      <button
                        className="btn-add"
                        onClick={handleAddMovieToWatched}
                      >
                        + Add to list
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <p>
              <em>{newMovieObject.plot}</em>
            </p>
            <p>Starring {newMovieObject.actors}</p>
            <p>Directed by {newMovieObject.director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MoviePreview;
