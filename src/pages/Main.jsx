import React from "react";
import Button from "../components/Button";
import RadioInput from "../components/RadioInput";
import CheckBoxInput from "../components/CheckBoxInput";
import List from "../components/List";
import { useSearchContext } from "../context/searchContext";

export default function Main() {
  const { products, totalPage } = useSearchContext();
  return (
    <div>
      <List data={products} totalPage={totalPage} />
    </div>
  );
}
