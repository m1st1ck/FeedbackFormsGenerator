import React from "react";
import uuid from "uuid";

import DeleteIcon from "@material-ui/icons/Delete";
import FilterNoneIcon from "@material-ui/icons/FilterNone";

import { FormControlLabel, Switch, Box, IconButton } from "@material-ui/core";

function Actions({
  required,
  handleQuestionClone,
  handleRequiredChange,
  handleQuestionDelete
}) {
  console.log("render Actions");

  return (
    <Box
      p={1}
      display="flex"
      flexDirection="row"
      flex={1}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <IconButton aria-label="clone" onClick={handleQuestionClone}>
          <FilterNoneIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleQuestionDelete}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <FormControlLabel
        value="required"
        onChange={handleRequiredChange}
        checked={required}
        control={<Switch color="primary" />}
        label="Required"
        labelPlacement="start"
      />
    </Box>
  );
}

export default React.memo(Actions, (prevProps, nextProps) => {
  if (
    prevProps.index === nextProps.index &&
    prevProps.required === nextProps.required
  ) {
    return true;
  }

  return false;
});
