import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../../utils/api";
import Cards from "./Cards";
import Breadcrumb from "../Breadcrumb";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    async function loadDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
    }
    loadDeck();
  }, [deckId]);

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", link: "/" },
          { label: `${deck.name}`, link: `/decks/${deckId}` },
          { label: "Study" },
        ]}
      />
      <h2>Study: {deck.name}</h2>
      <div>
        <Cards deck={deck} />
      </div>
    </>
  );
}

export default Study;
