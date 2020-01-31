import React from "react";

import { FormControl, Box, FormLabel, TextField } from "@material-ui/core";
import { areAnswerStatesEqual } from "../Utils";

function Paragraph({ question, answer, onChange }) {
  console.log("render Paragraph");

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
            onChange={handleChange}
            value={answer.value || ""}
            fullWidth
            multiline
            rows="4"
            variant="outlined"
            label="Answer"
          />
        </Box>
      </FormControl>
    </Box>
  );
}

export default React.memo(Paragraph, areAnswerStatesEqual);
