import React from "react";

import { Paper, Tabs, Tab, Box } from "@material-ui/core";

import FormGenerator from "./FormGenerator";
import FormPreview from "./FormPreview";
import FormJson from "./FormJson";

export default function App() {
  const [activeTab, setActivePaper] = React.useState("form");

  const url = new URL(window.location.href);
  const formB64 = url.searchParams.get("form");
  let sharedObject = {};

  try {
    const formString = atob(formB64);
    sharedObject = JSON.parse(formString);
  } catch (err) {}

  const [title, setTitle] = React.useState(sharedObject.title || "");
  const [description, setDescription] = React.useState(
    sharedObject.description || ""
  );
  const [questions, setQuestions] = React.useState(
    sharedObject.questions || []
  );
  const [answers, setAnswers] = React.useState([]);

  return (
    <Box mt={2} maxWidth="640px" margin="auto">
      <Box mt={2} position="sticky" top={0} zIndex={10}>
        <Paper square elevation={3}>
          <Tabs
            centered
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, nTab) => {
              setActivePaper(nTab);
            }}
            aria-label="disabled tabs example"
          >
            <Tab value="form" label="Form" />
            <Tab value="preview" label="Preview" />
            <Tab value="json" label="Json" />
          </Tabs>
        </Paper>
      </Box>

      {activeTab === "form" && (
        <FormGenerator
          title={title}
          description={description}
          questions={questions}
          setTitle={setTitle}
          setDescription={setDescription}
          setQuestions={setQuestions}
        />
      )}
      {activeTab === "preview" && (
        <FormPreview
          title={title}
          description={description}
          questions={questions}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}

      {activeTab === "json" && (
        <FormJson
          title={title}
          description={description}
          questions={questions}
          answers={answers}
        />
      )}
    </Box>
  );
}
