import WatchedMovie from "./WatchedMovie";

function WatchedMovies({ watchedMoviesArray, setWatched }) {
  return (
    <ul className="list smaller-list">
      {watchedMoviesArray.map((movie) => (
        <WatchedMovie
          key={movie.plot}
          watchedMovie={movie}
          setWatched={setWatched}
        ></WatchedMovie>
      ))}
    </ul>
  );
}

export default WatchedMovies;
