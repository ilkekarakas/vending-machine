/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import "../App.css";
import { products } from "./products";
import Items from "./items";

function SlotItem({ isLightOn }) {
  const [productList] = useState(products);
  const [totalCount] = useState(22 - productList.length);
  return (
    <div className="vend-back">
      <div className="product-row">
        {productList &&
          productList.map((p) => {
            return <Items product={p} key={p.id} />;
          })}
      </div>
      {[...Array(totalCount)].map((p) => {
        return (
          <div className="product-row">
            <div className="spiral">
              <div className="inner-spiral">
                <div className="inner-spiral"></div>
              </div>
            </div>
            <div className="spiral">
              <div className="inner-spiral">
                <div className="inner-spiral"></div>
              </div>
            </div>
            <div className="spiral">
              <div className="inner-spiral">
                <div className="inner-spiral"></div>
              </div>
            </div>
            <div className="spiral">
              <div className="inner-spiral">
                <div className="inner-spiral"></div>
              </div>
            </div>
          </div>
        );
      })}
      <div
        className={` ${isLightOn ? "vend-glass-open" : "vend-glass-close"}`}
      ></div>
    </div>
  );
}
export default SlotItem;
