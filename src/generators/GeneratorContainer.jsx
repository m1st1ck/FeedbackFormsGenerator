import React from "react";

import { TextField, Box } from "@material-ui/core";
import { generatorHelper } from "../Utils";

function GeneratorContainer({ title, onChange, children }) {
  const { handleTitleChange } = generatorHelper({
    onChange,
    title
  });

  return (
    <Box p={2} flexDirection="column" display="flex" flex={1}>
      <TextField
        variant="outlined"
        value={title}
        label="Question"
        onChange={handleTitleChange}
      />
      {children}
    </Box>
  );
}

export default GeneratorContainer;
