import React from "react";
import LoadingImage from "../assets/loading.svg";

export default function Loading() {
  return (
    <div className="loading">
      <div className="loading-image">
        <img src={LoadingImage} alt="" />
      </div>
    </div>
  );
}
