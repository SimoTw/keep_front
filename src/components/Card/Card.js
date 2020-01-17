import React from "react";
import cx from "classnames";
import styles from "./Card.module.css";
import ColorPicker from "components/ColorPicker/ColorPicker";
import CardLabels from "components/CardLabels/CardLabels";
import TextArea from "components/TextArea/TextArea";
import Button from "components/Button/Button";
import ButtonPopover from "components/ButtonPopover/ButtonPopover";
import { ReactComponent as ColorLen } from "statics/svgs/color_lens.svg";
import { ReactComponent as Label } from "statics/svgs/label.svg";
import { ReactComponent as Delete } from "statics/svgs/delete.svg";
import { ReactComponent as Close } from "statics/svgs/close.svg";

// import CardPin from "components/CardPin";
import Todos from "components/Todo/Todos";
import useCardLabel from "useReducers/useCardLabel";

export default function Card(props) {
  const { card, cardHandlers } = props;
  const {
    id,
    title,
    content,
    cardColor,
    labels,
    contentType,
    todos
    // pinned
  } = card;
  const [cardLabels, cardLabelHandler] = useCardLabel(card.id);
  // const [labelState, labelHandlers] = useLabel();

  // let labels = makeLabels(labelState, cardLabels);

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
    <div className={cx(styles.container, styles[`container__${cardColor}`])}>
      {/* header */}
      <div className={styles.header}>
        <form onSubmit={e => e.preventDefault()}>
          <input
            className={styles.header_input}
            placeholder="add title"
            type="text"
            onChange={makeOnChange("title")}
            value={title}
          />
        </form>
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
          cardLabels={cardLabels}
          makeOnUncheckClick={cardLabelHandler.makeOnUncheckClick}
        />
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <ButtonPopover svg={<ColorLen />}>
          <ColorPicker
            cardColor={cardColor}
            cardId={id}
            cardHandlers={cardHandlers}
            onChange={makeOnChange("cardColor")}
          />
        </ButtonPopover>

        <ButtonPopover svg={<Label />}>
          <CardLabels
            cardId={id}
            labels={labels}
            cardLabels={cardLabels}
            // cardHandlers={cardHandlers}
            // labelHandlers={labelHandlers}
            cardLabelHandler={cardLabelHandler}
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

export function LabelButtonList({ cardLabels, makeOnUncheckClick }) {
  return (
    <div className={styles.listButtonsContainer}>
      {cardLabels
        .filter(({ checked }) => checked === true)
        .map(({ id, content }) => (
          <LabelButton
            key={id}
            id={id}
            content={content}
            makeOnUncheckClick={makeOnUncheckClick}
          />
        ))}
    </div>
  );
}

function LabelButton({ id, content, makeOnUncheckClick }) {
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
      {content}
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

// function makeLabels(labels, cardLabels) {
//   return labels.map(label => ({
//     ...label,
//     checked: cardLabels.includes(label.id)
//   }));
// }
