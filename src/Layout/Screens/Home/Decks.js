import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../../utils/api";

function Decks() {
  const history = useHistory();
  const [deckCards, setDeckCards] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const decks = await listDecks();
      setDeckCards(decks);
    }
    loadDecks();
  }, []);

  const finalDecks = deckCards.map((deck, index) => (
    <div key={index} className="card">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between text-secondary">
          <h4>{deck.name}</h4>
          <p>{deck.cards.length} cards</p>
        </div>
        <div className="text-secondary mt-0">
          <p className="h5 font-weight-normal">{deck.description}</p>
        </div>
        <div className="d-flex">
          <button
            className="btn btn-secondary d-flex"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye-fill mr-1 align-self-center"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
            View
          </button>
          <button
            className="btn btn-primary ml-2 d-flex"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-journal-bookmark-fill mr-1 align-self-center"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"
              />
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
            </svg>
            Study
          </button>
          <button
            className="btn btn-danger ml-auto d-flex"
            onClick={() => {
              if (
                window.confirm(
                  "Delete this deck?\n\nYou will not be able to recover it."
                )
              ) {
                deleteDeck(deck.id);
                window.location.reload();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash-fill align-self-center"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ));

  return <div className="d-flex flex-column">{finalDecks}</div>;
}

export default Decks;
