import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";
import Main from "./pages/Main";
import { BasketContext } from "./context/basketContext";
import { SearchContext } from "./context/searchContext";
import { ProductContext } from "./context/productContext";

function App() {
  return (
    <ProductContext>
      <BasketContext>
        <SearchContext>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/detail/:id" element={<ProductDetail />} />
            </Routes>
          </BrowserRouter>
        </SearchContext>
      </BasketContext>
    </ProductContext>
  );
}

export default App;
