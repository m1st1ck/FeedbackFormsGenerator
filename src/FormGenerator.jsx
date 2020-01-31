import React from "react";
import uuid from "uuid";

import { Paper, Box, Divider, Fab, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

import TextGenerator from "./generators/TextGenerator";
import MultiChoiceGenerator from "./generators/MultiChoiceGenerator";
import CheckboxGenerator from "./generators/CheckboxGenerator";
import DropDownGenerator from "./generators/DropDownGenerator";
import ScaleGenerator from "./generators/ScaleGenerator";
import MultiChoiceGridGenerator from "./generators/MultiChoiceGridGenerator";
import CheckboxGridGenerator from "./generators/CheckboxGridGenerator";

import Actions from "./components/Actions";
import TypeSelector from "./components/TypeSelector";
import ScrollToBox from "./components/ScrollToBox";
import { TYPES } from "./Utils";

const COMPONENT_GENERATOR_TYPES = {
  [TYPES.SHORT_TEXT]: TextGenerator,
  [TYPES.PARAGRAPH]: TextGenerator,
  [TYPES.MULTI_CHOICE]: MultiChoiceGenerator,
  [TYPES.CHECKBOX]: CheckboxGenerator,
  [TYPES.DROPDOWN]: DropDownGenerator,
  [TYPES.SCALE]: ScaleGenerator,
  [TYPES.MULTI_CHOICE_GRID]: MultiChoiceGridGenerator,
  [TYPES.CHECKBOX_GRID]: CheckboxGridGenerator
};

const types = Object.values(TYPES);

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

export default function FormGenerator({
  questions,
  title,
  description,
  setTitle,
  setDescription,
  setQuestions
}) {
  const classes = useStyles();

  const [focused, setFocused] = React.useState(null);

  const handleQuestionChange = index => nQuestion => {
    setQuestions(prevQuestions => {
      const nQuestions = [...prevQuestions];
      nQuestions[index] = { ...nQuestions[index], ...nQuestion };
      return nQuestions;
    });
    setFocused(index);
  };

  const handleTypeChange = index => nType => {
    setQuestions(prevQuestions => {
      const nQuestions = [...prevQuestions];
      const { id, required, title } = nQuestions[index];
      nQuestions[index] = { id, required, title, type: nType };
      return nQuestions;
    });
    setFocused(index);
  };

  const handleAddNewQuestion = () => {
    setQuestions(prevQuestions => {
      setFocused(prevQuestions.length);
      return [
        ...prevQuestions,
        {
          id: uuid(),
          type: TYPES.SHORT_TEXT,
          required: false,
          title: ""
        }
      ];
    });
  };

  const handleQuestionDelete = index => () => {
    setQuestions(prevQuestions => {
      setFocused(index);
      return [
        ...prevQuestions.slice(0, index),
        ...prevQuestions.slice(index + 1)
      ];
    });
  };

  const handleQuestionClone = index => () => {
    setQuestions(prevQuestions => {
      const nQuestion = { ...prevQuestions[index] };
      nQuestion.id = uuid();

      return [
        ...prevQuestions.slice(0, index + 1),
        nQuestion,
        ...prevQuestions.slice(index + 1)
      ];
    });
    setFocused(index + 1);
  };

  const handleRequiredChange = index => () => {
    setQuestions(prevQuestions => {
      const nQuestions = [...prevQuestions];
      nQuestions[index] = {
        ...nQuestions[index],
        required: !nQuestions[index].required
      };
      return nQuestions;
    });
    setFocused(index);
  };

  return (
    <Box pb={10}>
      <FormHead
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
      />
      {questions.map(({ id, type, required, ...rest }, i) => {
        const Component = COMPONENT_GENERATOR_TYPES[type];

        if (!Component) {
          return "Component not found";
        }

        return (
          <Box mb={2} key={id}>
            <Paper elevation={3}>
              <Box display="flex" flexDirection="row" alignItems="flex-start">
                <ScrollToBox index={i} focused={focused}>
                  <Component
                    index={i}
                    question={rest}
                    onChange={handleQuestionChange(i)}
                  />
                </ScrollToBox>

                <TypeSelector
                  index={i}
                  type={type}
                  types={types}
                  onChange={handleTypeChange(i)}
                />
              </Box>

              <Divider />
              <Actions
                index={i}
                required={required}
                handleQuestionClone={handleQuestionClone(i)}
                handleQuestionDelete={handleQuestionDelete(i)}
                handleRequiredChange={handleRequiredChange(i)}
              />
            </Paper>
          </Box>
        );
      })}

      <Fab
        aria-label="add question"
        className={classes.fab}
        color="primary"
        onClick={handleAddNewQuestion}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}

const FormHead = React.memo(
  ({ title, setTitle, description, setDescription }) => {
    console.log("render head");

    const handleTitleChange = e => {
      setTitle(e.target.value);
    };

    const handleDescriptionChange = e => {
      setDescription(e.target.value);
    };

    return (
      <Box mb={2} mt={2}>
        <Paper elevation={3}>
          <Box p={2} flexDirection="column" display="flex" flex={1}>
            <TextField
              variant="outlined"
              value={title}
              label="Title"
              onChange={handleTitleChange}
            />
          </Box>

          <Box p={2} flexDirection="column" display="flex" flex={1}>
            <TextField
              variant="outlined"
              value={description}
              label="Description"
              onChange={handleDescriptionChange}
            />
          </Box>
        </Paper>
      </Box>
    );
  }
);
