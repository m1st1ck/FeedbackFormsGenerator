import React from "react";

import {
  FormControl,
  Box,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup
} from "@material-ui/core";
import { areAnswerStatesEqual } from "../Utils";

function MultiChoice({ question, answer, onChange }) {
  console.log("render MultiChoice");

  const { title, options = [], required } = question;

  const handleChange = e => {
    onChange({
      ...answer,
      value: e.target.value
    });
  };

  return (
    <Box p={2} flexDirection="column" display="flex">
      <FormControl required={required} component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          aria-label={title}
          name={title}
          value={answer.value || ""}
          onChange={handleChange}
        >
          {options
            .filter(option => !!option)
            .map(option => {
              return (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              );
            })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default React.memo(MultiChoice, areAnswerStatesEqual);
