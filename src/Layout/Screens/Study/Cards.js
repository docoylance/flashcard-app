import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Cards({ deck }) {
  const history = useHistory();
  const { cards } = deck;
  const [flip, setFlip] = useState(false);
  const [index, setIndex] = useState(0);
  const nextClick = () => {
    if (index === cards.length - 1) {
      if (
        window.confirm(
          "Restart cards?\n\nClick 'cancel' to return to the home page."
        )
      ) {
        setIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setIndex(index + 1);
    }
    setFlip(false);
  };

  if (cards.length < 3) {
    return (
      <>
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There are {cards.length} in this
          deck.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
        >
          Add Cards
        </button>
      </>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3>
          Card {index + 1} of {cards.length}
        </h3>
        {!!cards.length &&
          (flip === false ? (
            <p>{cards[index].front}</p>
          ) : (
            <p>{cards[index].back}</p>
          ))}
        <button className="btn btn-secondary" onClick={() => setFlip(!flip)}>
          Flip
        </button>
        {flip && (
          <button className="btn btn-primary ml-2" onClick={nextClick}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Cards;
