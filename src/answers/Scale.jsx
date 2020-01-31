import React from "react";

import {
  FormControl,
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { areAnswerStatesEqual } from "../Utils";

function Scale({ question, answer, onChange }) {
  console.log("render Scale");

  const { title, startLabel, endLabel, range = [1, 5], required } = question;

  const options = [];

  for (let i = range[0]; i <= range[1]; i++) {
    options.push(i);
  }

  const handleChange = e => {
    onChange({
      ...answer,
      value: Number(e.target.value)
    });
  };

  return (
    <Box p={2} flexDirection="column" display="flex">
      <FormControl required={required} component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <Box mt={2} flexDirection="row" display="flex" alignItems="flex-end">
          {startLabel && <Box mb={2}>{startLabel}</Box>}
          <RadioGroup
            aria-label={title}
            name={title}
            onChange={handleChange}
            value={answer.value || ""}
            row
          >
            {options.map(option => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option}
                labelPlacement="top"
              />
            ))}
          </RadioGroup>
          {endLabel && <Box mb={2}>{endLabel}</Box>}
        </Box>
      </FormControl>
    </Box>
  );
}

export default React.memo(Scale, areAnswerStatesEqual);
