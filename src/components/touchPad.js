import React, { useState, useEffect } from "react";
import "../App.css";
import { products } from "./products";

function TouchPad({
  coin,
  setMessage,
  setCoin,
  machineTotalPrice,
  setMachineTotalPrice,
  energy,
  setEnergy,
}) {

  // * Ürün teslim etmek için bir makine koluna ihtiyacımız var. Bu makine kolu her ürün teslim ettiğinde
  // * 0.1 birim enerji tükettiğini varsayıyoruz. setEnergy fonksiyonu ile bu 0.1 birim enerjiyi her satın alma işleminde ekliyoruz.
  // * Ayrıca toplam harcanan enerji 5 olduğu zaman daha fazla ürün satın alımı yapılamamaktadır.
  // * Bunun sebebi ise enerji tüketimini korumaktır.
  
  const [total, setTotal] = useState(coin);
  const [productList] = useState(products);

  useEffect(() => {
    setTotal(coin);
  }, [coin]);

  const buyProduct = (product) => {
    if (productList.find((x) => x.id === product.id).stock > 0) {
      const soldEnergy = energy + 0.1;
      if (soldEnergy < 5) {
        setCoin(coin - product.price);
        setMessage(
          product.name +
            " adlı ürünü " +
            product.price +
            " birim para karşılığında satın aldınız. Kalan paranız " +
            (coin - product.price) +
            " birim paradır."
        );
        var tempPrice = machineTotalPrice + product.price;
        setMachineTotalPrice(tempPrice);
        setEnergy(energy + 0.1);
        productList.find((x) => x.id === product.id).stock =
          productList.find((x) => x.id === product.id).stock - 1;
      } else {
        setMessage(
          "Makine güç tüketimi fazla olduğu için bu özelliği kullanamazsınız."
        );
      }
    } else {
      setMessage("Makinede " + product.name + " ürününden kalmadı.");
    }
  };

  return (
    <div className="touch-pad">
      {productList &&
        productList.map((product) => {
          return (
            <div
              key={product.id}
              className="button"
              disabled={product.price > coin}
              onClick={() => {
                if (product.price > coin) {
                  setMessage(
                    "Bu ürünü satın almak için " +
                      product.price +
                      " birim paraya ihtiyacınız var, fakat sizin " +
                      coin +
                      " birim paranız bulunuyor."
                  );
                  return;
                } else {
                  buyProduct(product);
                }
              }}
            >
              {product.buttonTag}
            </div>
          );
        })}
    </div>
  );
}

export default TouchPad;
