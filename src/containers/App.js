import React from "react";
import styles from "./App.module.css";
import Header from "components/Header";
import Sidebar from "containers/Sidebar";
import useLabels from "reducers/useLabels";
import useSearchedCards from "reducers/useSearchedCards";
import useTodo from "reducers/useTodo";

import Home from "pages/Home";

export const TodosByIdContext = React.createContext([]);
export const TodoHandlerContext = React.createContext();

function App() {
  const [isSidebarOpen, setisSidebarOpen] = React.useState(false);
  const [labels, labelHandlers] = useLabels();
  const [
    { cards, search },
    { search: searchHandlers, cards: cardHandlers }
  ] = useSearchedCards();
  const [{ byId: todosById }, todoHandlers] = useTodo();

  console.log({ cards });

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
        <TodosByIdContext.Provider value={todosById}>
          <TodoHandlerContext.Provider value={todoHandlers}>
            <Home
              cards={cards}
              labels={labels}
              labelHandlers={labelHandlers}
              cardHandlers={cardHandlers}
            />
          </TodoHandlerContext.Provider>
        </TodosByIdContext.Provider>
      </div>
    </div>
  );
}

export default App;
