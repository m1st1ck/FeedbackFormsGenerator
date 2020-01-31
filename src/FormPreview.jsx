import React from "react";

import { Paper, Box, Typography, Fab } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/core/styles";

import ShortText from "./answers/ShortText";
import Paragraph from "./answers/Paragraph";
import MultiChoice from "./answers/MultiChoice";
import Checkbox from "./answers/Checkbox";
import DropDown from "./answers/DropDown";
import Scale from "./answers/Scale";
import MultiChoiceGrid from "./answers/MultiChoiceGrid";
import CheckboxGrid from "./answers/CheckboxGrid";

import { TYPES } from "./Utils";

const COMPONENT__TYPES = {
  [TYPES.SHORT_TEXT]: ShortText,
  [TYPES.PARAGRAPH]: Paragraph,
  [TYPES.MULTI_CHOICE]: MultiChoice,
  [TYPES.CHECKBOX]: Checkbox,
  [TYPES.DROPDOWN]: DropDown,
  [TYPES.SCALE]: Scale,
  [TYPES.MULTI_CHOICE_GRID]: MultiChoiceGrid,
  [TYPES.CHECKBOX_GRID]: CheckboxGrid
};

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function FormPreview({
  title,
  description,
  questions,
  answers,
  setAnswers
}) {
  const classes = useStyles();

  const handleAnswerChange = index => nAnswer => {
    setAnswers(prevAnswers => {
      const nAnswers = [...prevAnswers];
      nAnswers[index] = { ...nAnswers[index], ...nAnswer };
      return nAnswers;
    });
  };

  const handleShare = () => {
    const objJsonStr = JSON.stringify({
      title,
      description,
      questions
    });
    const objJsonB64 = btoa(objJsonStr);
    const url = new URL(window.location.href);
    url.searchParams.set("form", objJsonB64);

    console.log(url.toString());
    window.location.href = url.toString();
  };

  return (
    <Box>
      <Box mb={2} mt={2}>
        <Paper elevation={3}>
          <Box p={2} flexDirection="column" display="flex" flex={1}>
            <Typography variant="h5">{title || "Untitled form"}</Typography>
          </Box>

          <Box p={2} flexDirection="column" display="flex" flex={1}>
            <Typography variant="body1">
              {description || "Form description"}
            </Typography>
          </Box>
        </Paper>
      </Box>

      {questions.map(({ id, type, ...rest }, i) => {
        const answer = answers[i] || { id };
        const Component = COMPONENT__TYPES[type];

        if (!Component) {
          return "Component not found";
        }

        return (
          <Box mb={2} key={id}>
            <Paper elevation={3}>
              <Component
                index={i}
                question={rest}
                answer={answer}
                onChange={handleAnswerChange(i)}
              />
            </Paper>
          </Box>
        );
      })}

      <Fab
        aria-label="share questions"
        className={classes.fab}
        color="primary"
        onClick={handleShare}
      >
        <ShareIcon />
      </Fab>
    </Box>
  );
}
