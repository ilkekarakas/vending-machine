import React, { useState } from "react";
import "../App.css";
import { products } from "./products";

function SupplierActions({
  setMessage,
  machineTotalPrice,
  setMachineTotalPrice,
  onReset,
}) {
  const [productList] = useState(products);
  const onProductSupplierCheckOut = () => {
    if (machineTotalPrice > 0) {
      setMessage(
        "Tedarikçi olarak hesapta bulunan parayı çektiniz. Çektiğiniz tutar: " +
          machineTotalPrice +
          " birim paradır."
      );
      const newTotal = 0;
      onProductTotalPriceChanged(newTotal);
    } else {
      setMessage("Çekebileceğiniz bir para bulunmamaktadır.");
    }
  };

  const onProductTotalPriceChanged = (productPrice) => {
    setMachineTotalPrice(productPrice);
  };

  const restartStock = () => {
    productList.forEach((element) => {
      switch (element.id) {
        case 1:
          element.stock = 5;
          break;
        case 2:
          element.stock = 25;
          break;
        case 3:
          element.stock = 15;
          break;
        case 4:
          element.stock = 17;
          break;

        default:
          break;
      }
    });

    setMessage("Stoklar başarıyla yenilendi!");
  };

  return (
    <>
      <div className="return-box" onClick={onReset}>
        Reset
      </div>
      <div className="stock-box" onClick={restartStock}>
        Stok Yenile
      </div>
      <div
        className="on-product-check-out-box"
        onClick={onProductSupplierCheckOut}
      >
        Geliri Topla
        {/* Tedarikçi para çekme Çekme */}
      </div>
      <div className="machine-total-price">{machineTotalPrice} Birim Para</div>
    </>
  );
}

export default SupplierActions;
