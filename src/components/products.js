import water from "../assets/img/water.png";
import soda from "../assets/img/soda.png";
import coke from "../assets/img/coke.png";
import chocolate from "../assets/img/chocolate.png";

export const products = [
  {
    id: 1,
    name: "Su",
    price: 25,
    buttonTag: "A1",
    stock: 5,
    productImageUrl: water,
    className: "water-box",
    classNameImage: "product water",
    classNamePrice: "price-box water-price",
    classNameTag: "tag tag-water",
  },
  {
    id: 2,
    name: "Çikolata",
    price: 7,
    stock: 25,
    buttonTag: "A2",
    productImageUrl: chocolate,
    className: "chocolate-box",
    classNameImage: "product chocolate",
    classNamePrice: "price-box chocolate-price",
    classNameTag: "tag tag-chocolate",
  },
  {
    id: 3,
    name: "Kola",
    price: 35,
    stock: 15,
    buttonTag: "A3",
    productImageUrl: coke,
    className: "coke-box",
    classNameImage: "product coke",
    classNamePrice: "price-box coke-price",
    classNameTag: "tag tag-coke",
  },
  {
    id: 4,
    name: "Soda",
    price: 45,
    stock: 17,
    buttonTag: "A4",
    productImageUrl: soda,
    className: "soda-box",
    classNameImage: "product sprite",
    classNamePrice: "price-box sprite-price",
    classNameTag: "tag tag-soda",
  },
];
