import React from "react";
import styles from "./App.module.css";
import Header from "components/Header";
import Sidebar from "containers/Sidebar";
import useLabels from "reducers/useLabels";
import useSearchedCards from "reducers/useSearchedCards";
import Home from "pages/Home";

function App() {
  const [isSidebarOpen, setisSidebarOpen] = React.useState(false);
  const [labels, labelHandlers] = useLabels();
  const [
    { cards, search },

    { search: searchHandlers, cards: cardHandlers }
  ] = useSearchedCards();

  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={styles.App}>
      <Header
        search={search}
        searchHandlers={searchHandlers}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        labels={labels}
        labelHandlers={labelHandlers}
      />
      <div
        className={
          isSidebarOpen ? styles.content : styles.content__sidebarClose
        }
      >
        <Home
          cards={cards}
          labels={labels}
          labelHandlers={labelHandlers}
          cardHandlers={cardHandlers}
        />
      </div>
    </div>
  );
}

export default App;
