import React, { useMemo } from "react";
import styles from "./App.module.css";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import useSidebar from "reducers/useSidebar";

function App() {
  const [sidebarState, sidebarHandlers] = useSidebar();
  const makeContent = () => {
    let list = [];
    for (let i = 0; i < 100; i++) {
      list.push("content");
    }
    return list;
  };
  const constentList = useMemo(makeContent, []);
  return (
    <div className={styles.App}>
      <Header sidebarState={sidebarState} sidebarHandlers={sidebarHandlers}>
        header
      </Header>
      <Sidebar sidebarState={sidebarState} sidebarHandlers={sidebarHandlers} />

      <div
        className={
          sidebarState.open ? styles.content : styles.content__sidebarClose
        }
      >
        {constentList.map((content, id) => (
          <div key={id}>{content}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
