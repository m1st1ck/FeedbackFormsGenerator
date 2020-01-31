import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  select: {
    margin: theme.spacing(2),
    minWidth: 196
  }
}));

function TypeSelector({ type, types, onChange }) {
  console.log("render type selector");
  const classes = useStyles();

  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <Select
      variant="outlined"
      value={type}
      className={classes.select}
      onChange={handleChange}
    >
      {types.map((option, index) => {
        return (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default React.memo(TypeSelector, (prevProps, nextProps) => {
  if (
    prevProps.index === nextProps.index &&
    prevProps.type === nextProps.type
  ) {
    return true;
  }

  return false;
});
