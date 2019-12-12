import React from "react";
import cx from "classnames";
import styles from "./Sidebar.module.css";
import SidebarList from "components/SidebarList";
import SidebarListButton from "components/SidebarListButton";
import Modal from "@material-ui/core/Modal";
import LabelForm from "containers/LabelForm";
import { useLocation } from "react-router-dom";

const Sidebar = ({ labels, labelHandlers, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const Links = [
    { id: 0, text: "home", to: "/home" },
    { id: 1, text: "remider", to: "/remider" },
    {
      id: 2,
      text: "edit labels",
      to: "/edit labels",
      onClick: () => {
        setOpen(true);
      }
    },
    { id: 3, text: "trash", to: "/trash" }
  ];
  const renderList = list => {
    return (
      <>
        {list.map(({ id, text, to, onClick }) => (
          <SidebarListButton
            key={id}
            id={id}
            select={to === location.pathname}
            text={text}
            to={to}
            onClick={onClick}
          />
        ))}
      </>
    );
  };
  return (
    <div
      className={cx(styles.sidebar, {
        [styles.sidebar__close]: !isSidebarOpen,
        [styles.sidebar__open]: isSidebarOpen
      })}
    >
      <SidebarList>{renderList(Links.slice(0, 2))}</SidebarList>
      <SidebarList>
        {renderList(labels)}
        {renderList(Links.slice(2, 3))}
      </SidebarList>
      <SidebarList>{renderList(Links.slice(3, Links.length))}</SidebarList>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={e => {
            if (e.target === e.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <LabelForm labels={labels} handlers={labelHandlers} />
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
