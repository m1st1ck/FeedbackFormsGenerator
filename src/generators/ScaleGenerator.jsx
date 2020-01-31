import React from "react";

import {
  TextField,
  Box,
  Select,
  FormControl,
  MenuItem
} from "@material-ui/core";
import { generatorHelper, areGeneratorStatesEqual } from "../Utils";
import GeneratorContainer from "./GeneratorContainer";

function ScaleGenerator({ question, onChange }) {
  console.log("render ScaleGenerator");

  const { title, startLabel = "", endLabel = "", range = [1, 5] } = question;

  const {
    handleRangeChange,
    handleStartLabelChange,
    handleEndLabelChange
  } = generatorHelper({
    onChange,
    title,
    startLabel,
    endLabel,
    range
  });

  return (
    <GeneratorContainer title={title} onChange={onChange}>
      <Box mt={2} flexDirection="row" display="flex" alignItems="center">
        <FormControl variant="outlined">
          <Select value={range[0]} onChange={handleRangeChange(0)}>
            {[0, 1].map(number => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mr={2} ml={2}>
          to
        </Box>
        <FormControl variant="outlined">
          <Select value={range[1]} onChange={handleRangeChange(1)}>
            {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(number => (
              <MenuItem key={number} value={number}>
                {number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box mt={2}>
        <TextField
          variant="outlined"
          value={startLabel}
          label="Start Label"
          onChange={handleStartLabelChange}
        />
      </Box>
      <Box mt={2}>
        <TextField
          variant="outlined"
          value={endLabel}
          label="End Label"
          onChange={handleEndLabelChange}
        />
      </Box>
    </GeneratorContainer>
  );
}

export default React.memo(ScaleGenerator, areGeneratorStatesEqual);
