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
    <div>
      <ProductContext>
        <BasketContext>
          <SearchContext>
            <Header />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="detail" element={<ProductDetail />} />
              </Routes>
            </BrowserRouter>
          </SearchContext>
        </BasketContext>
      </ProductContext>
    </div>
  );
}

export default App;
