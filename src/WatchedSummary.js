function WatchedSummary({ watchedMovieArray }) {
  const numMoviesWatched = watchedMovieArray.length;
  if (numMoviesWatched <= 0) return;
  const avgRating =
    watchedMovieArray?.map((m) => m.userRating).reduce((acm, r) => (acm += r)) /
    numMoviesWatched;
  const totalRuntime = watchedMovieArray
    ?.map((m) => m.runtime)
    .map((v) => Number.parseInt(v))
    .reduce((acm, v) => (acm += v));

  function convertToHourAndMinutes(totalMinutes) {
    if (totalMinutes < 60) return totalMinutes;

    const hour = Math.floor(totalMinutes / 60);
    const min = totalMinutes % 60;

    return `${hour} : ${min}`;
  }

  return (
    <div className="summary">
      <div className="">
        <h3>{numMoviesWatched} movies watched</h3>
        <p>🌟 {avgRating.toFixed(1)} Average Rating</p>
        <p>⏳ {convertToHourAndMinutes(totalRuntime)} min Total Runtime</p>
      </div>
    </div>
  );
}

export default WatchedSummary;
