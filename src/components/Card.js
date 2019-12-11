import React from "react";
import cx from "classnames";
import styles from "./Card.module.css";
import ColorPicker from "components/ColorPicker";
import CardLabels from "components/CardLabels";
import TextArea from "components/TextArea";
import Button from "components/Button";
import ButtonPopover from "components/ButtonPopover";
import { ReactComponent as ColorLen } from "statics/svgs/color_lens.svg";
import { ReactComponent as Label } from "statics/svgs/label.svg";
import { ReactComponent as Delete } from "statics/svgs/delete.svg";

// import CardPin from "components/CardPin";
import Todos from "components/Todos";

export default function Card({ card, labels, cardHandlers, labelHandlers }) {
  const {
    id,
    header,
    content,
    backgroundColor,
    labels: cardLabels,
    contentType,
    todos
    // pinned
  } = card;
  const makeOnChange = field => e => {
    cardHandlers.onChange({
      id,
      field,
      payload: e.target.value
    });
  };
  const onDeleteClick = () => {
    cardHandlers.onDeleteClick({ id });
  };

  return (
    <div
      className={cx(styles.container, styles[`container__${backgroundColor}`])}
    >
      {/* header */}
      <div className={styles.header}>
        <input
          className={styles.header_input}
          placeholder="add header"
          type="text"
          onChange={makeOnChange("header")}
          value={header}
        />
        {/* <CardPin id={id} pinned={pinned} cardHandlers={cardHandlers} /> */}
      </div>

      {/* body */}
      <div className={styles.content}>
        {contentType === "text" ? (
          <TextArea
            className={styles.textArea}
            onChange={makeOnChange("content")}
            value={content}
          />
        ) : (
          <Todos todos={todos} cardHandlers={cardHandlers} id={id} />
        )}
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <ButtonPopover svg={<ColorLen />}>
          <ColorPicker
            backgroundColor={backgroundColor}
            cardId={id}
            cardHandlers={cardHandlers}
            onChange={makeOnChange("backgroundColor")}
          />
        </ButtonPopover>

        <ButtonPopover svg={<Label />}>
          <CardLabels
            cardId={id}
            labels={labels}
            cardLabels={cardLabels}
            cardHandlers={cardHandlers}
            labelHandlers={labelHandlers}
          />
        </ButtonPopover>
        <Button onClick={onDeleteClick}>
          <Delete />
        </Button>
      </div>
    </div>
  );
}
