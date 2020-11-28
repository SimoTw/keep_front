import React from "react"
import cx from "classnames"
import AutoTextArea from "react-autosize-textarea"
import styles from "./TextArea.module.css"

export default function TextArea({
  className,
  onChange,
  value,
  placeholder = "add some content here",
  ...props
}) {
  return (
    <AutoTextArea
      className={cx(styles.textArea, className)}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      {...props}
    />
  )
}
