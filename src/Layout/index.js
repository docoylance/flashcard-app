import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Screens/Home/Home";
import Form from "./Screens/Form";
import Study from "./Screens/Study/Study";
import Deck from "./Screens/Deck";
import NotFound from "./NotFound";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <Form formType={"create deck"} />
          </Route>
          <Route exact path="/decks/:deckId/">
            <Deck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <Form formType={"edit deck"} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <Form formType={"create card"} />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <Form formType={"edit card"} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
