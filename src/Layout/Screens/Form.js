import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  createCard,
  updateCard,
  createDeck,
  updateDeck,
  readDeck,
  readCard,
} from "../../utils/api";
import Breadcrumb from "./Breadcrumb";

function Form({ formType }) {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  let initialFormState = {
    front: "",
    back: "",
    deckId: Number(deckId),
    id: formType === "edit card" && cardId,
  };
  if (formType === "create deck" || formType === "edit deck") {
    initialFormState = {
      name: "",
      description: "",
      id: formType === "edit deck" && deckId,
    };
  }
  
  const [formData, setFormData] = useState(initialFormState);
  const [deck, setDeck] = useState({ cards: [] });
  const [card, setCard] = useState({});

  useEffect(() => {
    async function loadInfo() {
      const deck = await readDeck(deckId);
      setDeck(deck);
      formType === "edit deck" &&
        setFormData({
          ...formData,
          name: deck.name,
          description: deck.description,
        });
      if (formType === "edit card") {
        const card = await readCard(cardId);
        setCard(card);
        setFormData({ ...formData, front: card.front, back: card.back });
      }
    }
    if (formType !== "create deck") loadInfo();
    // eslint-disable-next-line
  }, [deckId, cardId, formType]);

  let heading = "Create Deck";
  let crumbs = [{ label: "Home", link: "/" }, { label: "Create Deck" }];
  switch (formType) {
    case "edit deck":
      heading = "Edit Deck";
      crumbs = [
        { label: "Home", link: "/" },
        { label: deck.name, link: `/decks/${deckId}` },
        { label: "Edit Deck" },
      ];
      break;
    case "create card":
      heading = `${deck.name}: Add Card`;
      crumbs = [
        { label: "Home", link: "/" },
        { label: deck.name, link: `/decks/${deckId}` },
        { label: "Add Card" },
      ];
      break;
    case "edit card":
      heading = "Edit Card";
      crumbs = [
        { label: "Home", link: "/" },
        { label: deck.name, link: `/decks/${deckId}` },
        { label: `Edit Card ${cardId}` },
      ];
      break;
    default:
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    formType === "create deck"
      ? history.push("/")
      : history.push(`/decks/${deckId}`);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (formType === "create deck" || formType === "edit deck") {
      const { id } =
        formType === "create deck"
          ? await createDeck(formData)
          : await updateDeck(formData);
      history.push(`/decks/${id}`);
    } else {
      if (formType === "create card") {
        await createCard(deckId, formData);
        setFormData(initialFormState);
      } else {
        await updateCard(formData);
        history.push(`/decks/${deckId}`);
      }
    }
  }

  function textarea(inputType, nameInput, formType) {
    let placeholderInput = "Brief description of deck";
    switch (formType) {
      case "edit deck":
        placeholderInput = deck.description;
        break;
      case "create card":
        placeholderInput =
          inputType === "front" ? "Front side of card" : "Back side of card";
        break;
      case "edit card":
        placeholderInput = inputType === "front" ? card.front : card.back;
        break;
      default:
    }
    return (
      <>
        <label htmlFor={inputType}>{nameInput}</label>
        <textarea
          id={inputType}
          name={inputType}
          className="mb-3 form-control"
          onChange={handleChange}
          value={formData[inputType]}
          placeholder={placeholderInput}
        ></textarea>
      </>
    );
  }

  return (
    <>
      <div className="d-flex flex-column">
        <Breadcrumb crumbs={crumbs} />
        <h2>{heading}</h2>
        <form onSubmit={handleSubmit} className="d-flex flex-column h5">
          {formType === "create deck" || formType === "edit deck" ? (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mb-3 form-control"
                onChange={handleChange}
                value={formData.name}
                placeholder={
                  formType === "create deck" ? "Deck Name" : deck.name
                }
              ></input>
              {textarea("description", "Description", formType)}
            </>
          ) : (
            <>
              {textarea("front", "Front", formType)}
              {textarea("back", "Back", formType)}
            </>
          )}
          <div className="mt-3">
            <button className="btn btn-secondary mr-2" onClick={handleClick}>
              {formType === "create card" ? "Done" : "Cancel"}
            </button>
            <button className="btn btn-primary" type="submit">
              {formType === "create card" ? "Save" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
