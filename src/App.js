import React from "react";
import styles from "./App.module.css";
import Header from "components/Header/Header";
import Sidebar from "containers/Sidebar";
import LabelProvider from "providers/LabelProvider";
import CardProvider from "providers/CardProvider";
import TodoProvider from "providers/TodoProvider";
import SearchProvider from "providers/SearchProvider";
import Home from "pages/Home";

function App() {
  const [isSidebarOpen, setisSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setisSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className={styles.App}>
      <TodoProvider>
        <CardProvider>
          <SearchProvider>
            <LabelProvider>
              <Header toggleSidebar={toggleSidebar} />
              <Sidebar isSidebarOpen={isSidebarOpen} />
              <div
                className={
                  isSidebarOpen ? styles.content : styles.content__sidebarClose
                }
              >
                <Home />
              </div>
            </LabelProvider>
          </SearchProvider>
        </CardProvider>
      </TodoProvider>
    </div>
  );
}

export default App;
