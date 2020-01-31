import React from "react";

import { Paper, Box } from "@material-ui/core";

export default function FormPreview({
  title,
  description,
  questions,
  answers
}) {
  return (
    <Box mb={2} mt={2}>
      <Paper elevation={3}>
        <Box p={2} pt={1}>
          <pre>
            {JSON.stringify(
              {
                title,
                description,
                questions,
                answers
              },
              null,
              2
            )}
          </pre>
        </Box>
      </Paper>
    </Box>
  );
}
