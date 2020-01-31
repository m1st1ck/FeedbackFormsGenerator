import React from "react";

import { TextField, Box, FormControlLabel, Radio } from "@material-ui/core";
import { generatorHelper, areGeneratorStatesEqual } from "../Utils";
import GeneratorContainer from "./GeneratorContainer";

function MultiChoiceGridGenerator({ question, onChange }) {
  console.log("render MultiChoiceGridGenerator");

  const { title, options = [], values = [] } = question;

  const { handleOptionChange, handleValueChange } = generatorHelper({
    onChange,
    title,
    options,
    values
  });

  return (
    <GeneratorContainer title={title} onChange={onChange}>
      <Box flexDirection="row" display="flex">
        <Box flexDirection="column" display="flex">
          {[...options, ""].map((option, index) => {
            return (
              <Box
                key={index} // TODO: change from index to something else
                flexDirection="row"
                display="flex"
                alignItems="center"
              >
                <FormControlLabel
                  value={option}
                  control={
                    <Box p={1.5} pl={2}>
                      {index + 1}.
                    </Box>
                  }
                  label={
                    <TextField
                      placeholder="Option"
                      value={option}
                      onChange={handleOptionChange(index)}
                    />
                  }
                />
              </Box>
            );
          })}
        </Box>
        <Box flexDirection="column" display="flex">
          {[...values, ""].map((option, index) => {
            return (
              <Box
                key={index} // TODO: change from index to something else
                flexDirection="row"
                display="flex"
                alignItems="center"
              >
                <FormControlLabel
                  value={option}
                  control={<Radio disabled />}
                  label={
                    <TextField
                      placeholder="Value"
                      value={option}
                      onChange={handleValueChange(index)}
                    />
                  }
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </GeneratorContainer>
  );
}

export default React.memo(MultiChoiceGridGenerator, areGeneratorStatesEqual);
