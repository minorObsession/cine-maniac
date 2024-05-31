import { useState } from "react";

function BoxUser({ children, watchedMovieArray }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="box">
        <button className="btn-toggle" onClick={() => setIsOpen((s) => !s)}>
          {isOpen ? "-" : "+"}
        </button>
        {isOpen ? (
          children
        ) : (
          <h2 className="summary summary-1">
            {watchedMovieArray.length} movies collapsed
          </h2>
        )}
      </div>
    </>
  );
}

export default BoxUser;
