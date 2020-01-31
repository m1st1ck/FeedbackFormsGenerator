import React from "react";

import { areGeneratorStatesEqual } from "../Utils";
import GeneratorContainer from "./GeneratorContainer";

function ShortTextGenerator({ question, onChange }) {
  console.log("render ShortTextGenerator");

  const { title } = question;

  return <GeneratorContainer title={title} onChange={onChange} />;
}

export default React.memo(ShortTextGenerator, areGeneratorStatesEqual);
