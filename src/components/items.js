import React from "react";
import "../App.css";

function Items({ product }) {
  return (
    <div>
      <p className="product-stock">Stok: {product.stock}</p>
      <div className={product.className}>
        <div className={product.classNameImage}>
          <img className="imgStyle" src={product.productImageUrl}></img>
        </div>
      </div>
      <div className={product.classNamePrice}>
        <p>{product.price}</p>
      </div>
      <div className={product.classNameTag}>
        <p>{product.buttonTag}</p>
      </div>
    </div>
  );
}

export default Items;
