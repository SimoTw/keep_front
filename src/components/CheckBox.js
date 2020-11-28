import React from "react"

import Button from "components/Button"
import { ReactComponent as UnChecked } from "statics/svgs/check_box_outline_blank.svg"
import { ReactComponent as Checked } from "statics/svgs/check_box.svg"

export default function Checkbox({ id, checked, onChange, size = "l" }) {
  return (
    <Button type="checkbox" key={id} onChange={onChange} size={size}>
      {checked ? <Checked /> : <UnChecked />}
    </Button>
  )
}
