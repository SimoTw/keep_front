import React from "react";

import Button from "components/Button";
import { ReactComponent as CheckedCheckBox } from "statics/svgs/check_box_outline_blank.svg";
import { ReactComponent as CheckBox } from "statics/svgs/check_box.svg";

export default function Checkbox({ id, checked, onChange, size = "l" }) {
  return (
    <Button
      type="checkbox"
      key={id}
      checked={checked}
      onChange={onChange}
      size={size}
    >
      {checked ? <CheckedCheckBox /> : <CheckBox />}
    </Button>
  );
}
