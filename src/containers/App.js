import React from "react";
import { Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "components/Header";
import Sidebar from "containers/Sidebar";
import useLinksAndLabels from "reducers/useLinksAndLabels";
// import useCards from "reducers/useCards";
import useSearchedCards from "reducers/useSearchedCards";
import Home from "pages/Home";
import Page1 from "pages/Page1";
import LabelForm from "containers/LabelForm";

function App() {
  const [sidebarState, sidebarHandlers] = useLinksAndLabels();
  const [
    { cards, search },

    { search: searchHandlers, cards: cardHandlers }
  ] = useSearchedCards();
  return (
    <div className={styles.App}>
      <Header
        search={search}
        searchHandlers={searchHandlers}
        sidebarHandlers={sidebarHandlers.header}
      />
      <Sidebar
        sidebarState={sidebarState}
        sidebarHandlers={sidebarHandlers.sidebar}
      />
      <div
        className={
          sidebarState.sidebar.open
            ? styles.content
            : styles.content__sidebarClose
        }
      >
        <Switch>
          <Route exact path="/home">
            <Home
              cards={cards}
              labels={sidebarState.labels}
              labelHandlers={sidebarHandlers.card}
              cardHandlers={cardHandlers}
            />
          </Route>
          <Route path="/page1">
            <Page1 />
          </Route>
          <Route path="/edit labels">
            <LabelForm
              labels={sidebarState.labels}
              handlers={sidebarHandlers.labels}
            />
          </Route>
        </Switch>{" "}
      </div>
    </div>
  );
}

export default App;
