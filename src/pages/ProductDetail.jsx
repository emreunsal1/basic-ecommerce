import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../service/products";
import Button from "../components/Button";
import { useState } from "react";
import Basket from "../components/Basket";
import BasketSummary from "../components/BasketSummary";
import { useBasketContext } from "../context/basketContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useBasketContext();
  const [product, setProduct] = useState(null);
  const getProduct = async () => {
    const response = await fetchProductById(id);
    setProduct(response);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="pdp-container">
      {product && (
        <div className="pdp-body">
          <div className="image-wrapper">
            <img src={product.image} loading="lazy" />
          </div>
          <div className="content">
            <div className="name">{product.name}</div>
            <div className="price">{product.price}</div>
            <div className="button-wrapper">
              <Button onClick={() => addItem(product.id)} size="large">
                Add To Basket
              </Button>
            </div>
            <div className="description">{product.description}</div>
          </div>
        </div>
      )}
      <div className="basket-wrapper">
        <div className="basket-content">
          <Basket />
        </div>
        <div className="summary">
          <BasketSummary />
        </div>
      </div>
    </div>
  );
}
