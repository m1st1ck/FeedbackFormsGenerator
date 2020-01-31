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

function MultiChoiceGrid({ question, answer, onChange }) {
  console.log("render MultiChoiceGrid");
  const { title, options = [], values = [], required } = question;

  const handleChange = option => e => {
    onChange({
      ...answer,
      values: {
        ...(answer.values || {}),
        [option]: e.target.value
      }
    });
  };

  return (
    <Box p={2} flexDirection="column" display="flex">
      <FormControl required={required} component="fieldset">
        <FormLabel component="legend">{title}</FormLabel>
        <Box mt={2} display="flex" flex={1} flexDirection="column">
          <Box display="flex" flex={1} flexDirection="row">
            <Box display="flex" flex={1} />
            {values
              .filter(value => !!value)
              .map(value => {
                return (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flex={1}
                    key={value}
                  >
                    {value}
                  </Box>
                );
              })}
          </Box>
          {options
            .filter(option => !!option)
            .map(option => {
              return (
                <RadioGroup
                  key={option}
                  row
                  onChange={handleChange(option)}
                  value={answer.values?.[option] || ""}
                  aria-label={option}
                  name={option}
                >
                  <Box alignItems="center" display="flex" flex={1} key={option}>
                    {option}
                  </Box>
                  {values
                    .filter(value => !!value)
                    .map(value => {
                      return (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          flex={1}
                          key={value}
                        >
                          <FormControlLabel
                            style={{ margin: 0 }}
                            value={value}
                            control={<Radio />}
                          />
                        </Box>
                      );
                    })}
                </RadioGroup>
              );
            })}
        </Box>
      </FormControl>
    </Box>
  );
}

export default React.memo(MultiChoiceGrid, areAnswerStatesEqual);
