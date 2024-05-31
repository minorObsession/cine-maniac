function SearchBar({ query, dispatch, numResults }) {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="search for movies"
        value={query}
        onChange={(e) =>
          dispatch({ type: "setQuery", payload: e.target.value })
        }
      ></input>
      <div className="num-results">
        {numResults ? numResults : ""}{" "}
        <span>{numResults > 0 ? "search results" : ""}</span>
      </div>
    </>
  );
}

export default SearchBar;
