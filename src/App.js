import { useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import BoxResults from "./BoxResults";
import BoxUser from "./BoxUser";
import Header from "./Header";
import Main from "./Main";
import WatchedSummary from "./WatchedSummary";
import WatchedMovies from "./WatchedMovies";
import SearchBar from "./SearchBar";
import MoviePreview from "./MoviePreview";
import LoadingSpinner from "./LoadingSpinner";
import Error from "./Error";
import MovieResults from "./MovieResults";
import { useKeyPress } from "./useKeyPress";

const KEY = "f0c87534";

const initialState = {
  isPreviewOpen: false,
  isLoading: false,
  query: "",
  error: null,
  selectedID: "",
  watchedMovieArray: [],
  searchResults: [],
  activePage: 1,
  movieToPreview: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "getWatchedFromLocalStorage":
      return { ...state, watchedMovieArray: [...action.payload] };

    case "startLoading":
      return { ...state, isLoading: true };

    case "endLoading":
      return { ...state, isLoading: false };

    case "loadSearchResults":
      const { results, numResults, numPages } = action.payload;
      return {
        ...state,
        searchResults: results,
        numResults: numResults,
        numPages: numPages,
      };

    case "nextPage":
      if (state.activePage === state.numPages) return { ...state };
      return { ...state, activePage: state.activePage + 1 };

    case "previousPage":
      if (state.activePage === 1) return { ...state };

      return { ...state, activePage: state.activePage - 1 };

    case "setQuery":
      return {
        ...state,
        query: action.payload,
        isPreviewOpen: false,
        selectedID: null,
        numResults: null,
      };

    case "selectMovie":
      return { ...state, selectedID: action.payload };

    case "previewSelectedMovie":
      return { ...state, movieToPreview: action.payload, isPreviewOpen: true };

    case "closeMoviePreview":
      return {
        ...state,
        selectedID: null,
        movieToPreview: null,
        isPreviewOpen: false,
      };

    case "fetchingError":
      return { ...state, error: action.payload, searchResults: [] };

    case "doNotSearch":
      return { ...state, searchResults: [], error: null };

    case "resetError":
      return { ...state, error: null };

    default:
      throw new Error("action unknown");
  }
}

function App() {
  const [
    {
      isPreviewOpen,
      isLoading,
      query,
      selectedID,
      watchedMovieArray,
      searchResults,
      activePage,
      numPages,
      error,
      movieToPreview,
      numResults,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [watched, setWatched] = useLocalStorage([], "watchedMovies");

  // ? enter to search
  useKeyPress("Enter", function () {
    const searchEl = document.querySelector(".search");
    if (document.activeElement === searchEl) return;
    searchEl.value = "";
    searchEl.focus();
  });

  // ? enter to search
  useEffect(
    function () {
      const controller = new AbortController();
      async function searchMovies() {
        try {
          dispatch({ type: "resetError" });
          dispatch({ type: "startLoading" });

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}&page=${activePage}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("movie wasn`t found");
          const numResults = data.totalResults;
          const numPages = Math.ceil(data.totalResults / 10);
          const results = data.Search;
          dispatch({
            type: "loadSearchResults",
            payload: { results, numResults, numPages },
          });
        } catch (err) {
          if (err.name !== "AbortError") {
            dispatch({
              type: "fetchingError",
              payload:
                err.message || "Something went wrong with fetching movies",
            });
          }
        } finally {
          dispatch({ type: "endLoading" });
        }
      }

      if (query.length < 3) {
        dispatch({ type: "doNotSearch" });
      } else searchMovies();

      return function () {
        controller.abort();
      };
    },
    [query, activePage]
  );

  // ? select movie to preview
  useEffect(
    function () {
      async function findMovieByID() {
        if (!selectedID) return;
        dispatch({ type: "startLoading" });
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        dispatch({ type: "previewSelectedMovie", payload: data });
        dispatch({ type: "endLoading" });
      }
      findMovieByID();
    },
    [selectedID]
  );

  // ? retrieve watched array from Local Storage
  useEffect(() => {
    dispatch({ type: "getWatchedFromLocalStorage", payload: watched });
  }, [watched]);

  return (
    <>
      <Header>
        <SearchBar query={query} dispatch={dispatch} numResults={numResults} />
      </Header>

      <Main>
        <BoxResults numResults={numResults}>
          {isLoading && <LoadingSpinner />}
          {error && <Error error={error} />}
          {!error && !isLoading && searchResults.length === 0 && (
            <h1 className="special-h1">
              Start searching for your favorite <strong>Movies</strong>,{" "}
              <br></br>
              <strong> TV shows </strong>
              or <strong>Video Games</strong>!
            </h1>
          )}
          {!error && !isLoading && (
            <MovieResults
              searchResults={searchResults}
              dispatch={dispatch}
              activePage={activePage}
              numPages={numPages}
            />
          )}
        </BoxResults>

        <BoxUser watchedMovieArray={watchedMovieArray}>
          {isPreviewOpen ? (
            <MoviePreview
              movie={movieToPreview}
              isLoading={isLoading}
              setWatched={setWatched}
              dispatch={dispatch}
              watchedMovieArray={watchedMovieArray}
            />
          ) : (
            <>
              <WatchedSummary watchedMovieArray={watchedMovieArray} />
              <WatchedMovies
                watchedMoviesArray={watchedMovieArray}
                setWatched={setWatched}
              />
            </>
          )}
        </BoxUser>
      </Main>
    </>
  );
}

export default App;
