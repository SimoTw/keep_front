import React from "react";
import { Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "components/Header";
import Sidebar from "containers/Sidebar";
import useSidebar from "reducers/useSidebar";
import useCards from "reducers/useCards";
import Home from "pages/Home";
import Page1 from "pages/Page1";
import LabelForm from "containers/LabelForm";

function App() {
  const [sidebarState, sidebarHandlers] = useSidebar();
  const [cards, cardHandlers] = useCards();

  return (
    <div className={styles.App}>
      <Header sidebarHandlers={sidebarHandlers.header} />
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
        <RenderPages />
      </div>
    </div>
  );

  function RenderPages() {
    return (
      <Switch>
        <Route exact path="/home">
          <Home cards={cards} cardHandlers={cardHandlers} />
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
      </Switch>
    );
  }
}

export default App;
