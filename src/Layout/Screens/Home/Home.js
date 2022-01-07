import React from "react";
import { useHistory } from "react-router-dom";
import Decks from "./Decks";

function Home() {
  const history = useHistory();

  return (
    <div className="container d-flex flex-column">
      <div>
        <button
          className="btn btn-secondary mb-2 d-flex"
          onClick={() => history.push("/decks/new")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg text-light mr-1 align-self-center"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>
          Create Deck
        </button>
      </div>

      <Decks />
    </div>
  );
}

export default Home;
