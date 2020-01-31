import React from "react";

import { TextField, Box, FormControlLabel } from "@material-ui/core";
import { generatorHelper, areGeneratorStatesEqual } from "../Utils";
import GeneratorContainer from "./GeneratorContainer";

function DropDownGenerator({ question, onChange }) {
  console.log("render DropDownGenerator");

  const { title, options = [] } = question;

  const { handleOptionChange } = generatorHelper({
    onChange,
    title,
    options
  });

  return (
    <GeneratorContainer title={title} onChange={onChange}>
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
    </GeneratorContainer>
  );
}

export default React.memo(DropDownGenerator, areGeneratorStatesEqual);
