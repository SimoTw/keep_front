import React from "react"
import styles from "./AddCardButtonList.module.css"
import Button from "components/Button"
import { ReactComponent as TodoIcon } from "statics/svgs/check_box.svg"
import { ReactComponent as Edit } from "statics/svgs/edit.svg"

export default function AddCardButtonList({ cardHandlers }) {
  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        onClick={() => cardHandlers.onAddClick({ contentType: "content" })}
      >
        Add Text
        <Edit />
      </Button>
      <Button
        className={styles.button}
        onClick={() => cardHandlers.onAddClick({ contentType: "todo" })}
      >
        Add Todo
        <TodoIcon />
      </Button>
    </div>
  )
}
