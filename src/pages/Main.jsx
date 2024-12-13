import React from "react";
import Button from "../components/Button";
import RadioInput from "../components/RadioInput";
import CheckBoxInput from "../components/CheckBoxInput";

export default function Main() {
  return (
    <div>
      Main
      <Button size="medium">Deneme</Button>
      <RadioInput
        onChange={(e) => console.log(e.target.value)}
        name={"test"}
        label="New To Old"
        value="ex1"
      />
      <CheckBoxInput
        onChange={(e) => console.log(e.target.value)}
        name={"test"}
        label="New To Old"
        value="ex1"
      />
    </div>
  );
}
