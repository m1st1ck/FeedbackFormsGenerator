import React from "react";

import { TextField, Box, FormControlLabel, Checkbox } from "@material-ui/core";
import { generatorHelper, areGeneratorStatesEqual } from "../Utils";
import GeneratorContainer from "./GeneratorContainer";

function CheckboxGenerator({ question, onChange }) {
  console.log("render CheckboxGenerator");
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
            key={index} // TODO: change from index to something else but not the option
            flexDirection="row"
            display="flex"
            alignItems="center"
          >
            <FormControlLabel
              value={option}
              control={<Checkbox disabled />}
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

export default React.memo(CheckboxGenerator, areGeneratorStatesEqual);
