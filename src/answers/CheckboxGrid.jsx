import React from "react";

import {
  FormControl,
  Box,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup
} from "@material-ui/core";
import { areAnswerStatesEqual } from "../Utils";

function CheckboxGrid({ question, answer, onChange }) {
  console.log("render CheckboxGrid");
  const { title, options = [], values = [], required } = question;

  const handleChange = option => e => {
    let nValues = [e.target.value];
    if (answer.values?.[option] && e.target.checked) {
      nValues = [...answer.values[option], e.target.value];
    } else if (answer.values?.[option] && !e.target.checked) {
      nValues = answer.values[option].filter(value => value !== e.target.value);
    }

    onChange({
      ...answer,
      values: {
        ...(answer.values || {}),
        [option]: nValues
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
                <RadioGroup key={option} row aria-label={option} name={option}>
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
                            onChange={handleChange(option)}
                            checked={
                              answer.values?.[option]?.includes(value) || false
                            }
                            style={{ margin: 0 }}
                            value={value}
                            control={<Checkbox />}
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

export default React.memo(CheckboxGrid, areAnswerStatesEqual);
