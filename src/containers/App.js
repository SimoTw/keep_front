import React from "react";
import { Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import Header from "components/Header";
import Sidebar from "containers/Sidebar";
import useSidebar from "reducers/useSidebar";
import Home from "pages/Home";
import Page1 from "pages/Page1";
import TagForm from "containers/TagForm";

function App() {
  const [sidebarState, sidebarHandlers] = useSidebar();
  return (
    <div className={styles.App}>
      <Header sidebarState={sidebarState} sidebarHandlers={sidebarHandlers} />
      <Sidebar sidebarState={sidebarState} sidebarHandlers={sidebarHandlers} />
      <div
        className={
          sidebarState.open ? styles.content : styles.content__sidebarClose
        }
      >
        <RenderPages />
      </div>
    </div>
  );

  function RenderPages() {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/page1">
          <Page1 />
        </Route>
        <Route path="/edit tags">
          <TagForm tags={sidebarState.tags} sidebarHandlers={sidebarHandlers} />
        </Route>
      </Switch>
    );
  }
}

export default App;
