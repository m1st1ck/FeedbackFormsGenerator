import React from "react";

import { FormControl, Box, FormLabel, TextField } from "@material-ui/core";
import { areAnswerStatesEqual } from "../Utils";

function ShortText({ question, answer, onChange }) {
  console.log("render ShortText");

  const { title, required } = question;

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
        <Box mt={2}>
          <TextField
            value={answer.value || ""}
            onChange={handleChange}
            variant="outlined"
            label="Answer"
          />
        </Box>
      </FormControl>
    </Box>
  );
}

export default React.memo(ShortText, areAnswerStatesEqual);
