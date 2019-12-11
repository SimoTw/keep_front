import React from "react";
import cx from "classnames";
import styles from "./Sidebar.module.css";
import SidebarList from "components/SidebarList";
import SidebarListButton from "components/SidebarListButton";
import Modal from "@material-ui/core/Modal";
import LabelForm from "containers/LabelForm";
import { useLocation } from "react-router-dom";

const Sidebar = ({ sidebarState, sidebarHandlers }) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const { labels } = sidebarState.sidebar;
  const { labelsHandlers } = sidebarHandlers;

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
  const renderList = (list, field) => {
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
        [styles.sidebar__close]: !sidebarState.sidebar.open,
        [styles.sidebar__open]: sidebarState.sidebar.open
      })}
    >
      <SidebarList>{renderList(Links.slice(0, 2), "links")}</SidebarList>
      <SidebarList>
        {renderList(labels, "labels")}
        {renderList(Links.slice(2, 3), "links")}
      </SidebarList>
      <SidebarList>
        {renderList(Links.slice(3, Links.length), "links")}
      </SidebarList>
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
          <LabelForm labels={sidebarState.labels} handlers={labelsHandlers} />
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
