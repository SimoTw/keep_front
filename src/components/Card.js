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
import { ReactComponent as Close } from "statics/svgs/close.svg";

// import CardPin from "components/CardPin";
import Todos from "components/Todos";

export default function Card(props) {
  const { card, cardHandlers, labelHandlers } = props;
  const {
    id,
    title,
    content,
    backgroundColor,
    labels: cardLabels,
    contentType,
    todos
    // pinned
  } = card;

  let labels = makeLabels(props.labels, cardLabels);

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
          placeholder="add title"
          type="text"
          onChange={makeOnChange("title")}
          value={title}
        />
        {/* <CardPin id={id} pinned={pinned} cardHandlers={cardHandlers} /> */}
      </div>

      {/* body */}
      <div className={styles.content}>
        {contentType === "content" ? (
          <TextArea
            className={styles.textArea}
            onChange={makeOnChange("content")}
            value={content}
          />
        ) : (
          <Todos todos={todos} cardId={id} />
        )}

        <LabelButtonList
          labels={labels}
          makeOnUncheckClick={(cardId => labelId => () =>
            cardHandlers.removeCardLabel({ cardId, labelId }))(id)}
        />
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

//

export function LabelButtonList({ labels, makeOnUncheckClick }) {
  return (
    <div className={styles.listButtonsContainer}>
      {labels
        .filter(({ checked }) => checked === true)
        .map(({ id, text }) => (
          <LabelButton
            key={id}
            id={id}
            text={text}
            makeOnUncheckClick={makeOnUncheckClick}
          />
        ))}
    </div>
  );
}

function LabelButton({ id, text, makeOnUncheckClick }) {
  const [hover, setHover] = React.useState(false);
  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return (
    <div
      className={styles.labelButton}
      key={id}
      onClick={makeOnUncheckClick(id)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {`${id} ${text}`}
      {hover && (
        <Close
          style={{
            right: "2px",
            top: "50%",
            width: "20px",
            height: "20px",
            fill: "#3c4043"
          }}
        />
      )}
    </div>
  );
}

function makeLabels(labels, cardLabels) {
  return labels.map(label => ({
    ...label,
    checked: cardLabels.includes(label.id)
  }));
}
