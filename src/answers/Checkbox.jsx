import React from "react";

import {
  FormControl,
  Box,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox
} from "@material-ui/core";
import { areAnswerStatesEqual } from "../Utils";

function CheckboxComponent({ question, answer, onChange }) {
  console.log("render CheckboxComponent");
  const { title, options = [], required } = question;

  const handleChange = e => {
    let values = [...(answer.values || [])];
    if (!e.target.checked) {
      values = values.filter(value => value !== e.target.value);
    } else {
      values.push(e.target.value);
    }
    onChange({
      ...answer,
      values
    });
  };

  return (
    <Box p={2} flexDirection="column" display="flex">
      <FormControl required={required} component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>

        <FormGroup>
          {options
            .filter(option => !!option)
            .map(option => {
              return (
                <FormControlLabel
                  onChange={handleChange}
                  checked={answer.values?.includes(option) || false}
                  key={option}
                  value={option}
                  control={<Checkbox />}
                  label={option}
                />
              );
            })}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default React.memo(CheckboxComponent, areAnswerStatesEqual);
