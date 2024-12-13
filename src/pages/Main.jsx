import React from "react";
import List from "../components/List";
import { useSearchContext } from "../context/searchContext";
import BasketSummary from "../components/BasketSummary";
import Loading from "../components/Loading";
import Basket from "../components/Basket";
import { useProductContext } from "../context/productContext";

export default function Main() {
  const { isLoading } = useProductContext();
  const { searchedProducts } = useSearchContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="main-page">
      <div className="middle-wrapper">
        <List data={searchedProducts} />
      </div>

      <div className="right-wrapper">
        <Basket />
        <BasketSummary />
      </div>
    </div>
  );
}
