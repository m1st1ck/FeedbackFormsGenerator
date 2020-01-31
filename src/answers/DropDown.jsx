import React from "react";

import {
  FormControl,
  Box,
  MenuItem,
  FormLabel,
  Select
} from "@material-ui/core";
import { areAnswerStatesEqual } from "../Utils";

function DropDown({ question, answer, onChange }) {
  console.log("render DropDown");

  const { title, options = [], required } = question;

  const handleChange = e => {
    onChange({
      ...answer,
      value: e.target.value
    });
  };

  return (
    <Box p={2} flexDirection="column" display="flex">
      <FormControl variant="outlined" required={required} component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <Box mt={2} flexDirection="column" display="flex">
          <Select value={answer.value || "Choose"} onChange={handleChange}>
            <MenuItem
              style={{ borderBottom: "1px solid lightgrey" }}
              disabled
              value="Choose"
            >
              Choose
            </MenuItem>
            {options
              .filter(option => !!option)
              .map((option, index) => {
                return (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
          </Select>
        </Box>
      </FormControl>
    </Box>
  );
}

export default React.memo(DropDown, areAnswerStatesEqual);
