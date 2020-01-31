export const generatorHelper = ({ onChange, ...questionData }) => {
  const question = { ...questionData };

  const handleTitleChange = e => {
    question.title = e.target.value;
    onChange(question);
  };

  const handleOptionChange = index => e => {
    question.options = [...question.options]; // needs to be created again otherwise it holds ref
    question.options[index] = e.target.value;
    question.options = question.options.filter(option => !!option);
    onChange(question);
  };

  const handleValueChange = index => e => {
    question.values = [...question.values]; // needs to be created again otherwise it holds ref
    question.values[index] = e.target.value;
    question.values = question.values.filter(option => !!option);
    onChange(question);
  };

  const handleRangeChange = index => e => {
    question.range = [...question.range]; // needs to be created again otherwise it holds ref
    question.range[index] = e.target.value;
    onChange(question);
  };

  const handleStartLabelChange = e => {
    question.startLabel = e.target.value;
    onChange(question);
  };

  const handleEndLabelChange = e => {
    question.endLabel = e.target.value;
    onChange(question);
  };

  return {
    handleTitleChange,
    handleOptionChange,
    handleValueChange,
    handleRangeChange,
    handleStartLabelChange,
    handleEndLabelChange
  };
};

export const areGeneratorStatesEqual = (prevProps, nextProps) => {
  if (
    prevProps.index === nextProps.index &&
    JSON.stringify(prevProps.question) === JSON.stringify(nextProps.question)
  ) {
    return true;
  }

  return false;
};

export const areAnswerStatesEqual = (prevProps, nextProps) => {
  if (
    prevProps.index === nextProps.index &&
    JSON.stringify(prevProps.answer) === JSON.stringify(nextProps.answer)
  ) {
    return true;
  }

  return false;
};

export const TYPES = {
  SHORT_TEXT: "Short answer",
  PARAGRAPH: "Paragraph",
  MULTI_CHOICE: "Multiple choice",
  CHECKBOX: "Checkboxes",
  DROPDOWN: "Drop-down",
  SCALE: "Scale",
  MULTI_CHOICE_GRID: "Multiple-choice grid",
  CHECKBOX_GRID: "Tick box grid"
};
