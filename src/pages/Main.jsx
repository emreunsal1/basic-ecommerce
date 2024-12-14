import React from "react";
import List from "../components/List";
import { useSearchContext } from "../context/searchContext";
import BasketSummary from "../components/BasketSummary";
import Loading from "../components/Loading";
import Basket from "../components/Basket";
import { useProductContext } from "../context/productContext";
import SortCard from "../components/SortCard";
import FilterBox from "../components/FilterBox";

export default function Main() {
  const { isLoading, brands, models } = useProductContext();
  const {
    searchedProducts,
    selectedBrands,
    setSelectedBrands,
    selectedModels,
    setSelectedModels,
  } = useSearchContext();

  const brandsCheckboxHandler = (e) => {
    const searchValue = e.target.value;
    if (e.target.checked) {
      setSelectedBrands((prev) => [...prev, searchValue]);
      return;
    }
    const filteredBrands = selectedBrands.filter(
      (brand) => brand.toLowerCase() !== searchValue
    );
    setSelectedBrands(filteredBrands);
  };

  const modelsCheckboxHandler = (e) => {
    const searchValue = e.target.value;
    if (e.target.checked) {
      setSelectedModels((prev) => [...prev, searchValue]);
      return;
    }
    const filteredModels = selectedModels.filter(
      (model) => model.toLowerCase() !== searchValue
    );
    setSelectedModels(filteredModels);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="main-page">
      <div className="left-wrapper">
        <SortCard />
        <FilterBox
          onChange={brandsCheckboxHandler}
          title={"Brands"}
          data={brands}
          activeValues={selectedBrands}
        />
        <FilterBox
          onChange={modelsCheckboxHandler}
          title={"Models"}
          data={models}
          activeValues={selectedModels}
        />
      </div>
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
