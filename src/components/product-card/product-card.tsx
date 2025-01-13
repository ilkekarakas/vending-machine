import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../types/general-types";
import { selectProduct } from "../../redux/slices/product-slice";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import "./product-card.scss";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  const { isProcessingPayment } = useSelector(
    (state: RootState) => state.payment
  );
  const { selectedProduct } = useSelector((state: RootState) => state.product);
  const { isSupplierMode } = useSelector((state: RootState) => state.machine);
  const isSelected = selectedProduct?.id === product.id;
  const isOutOfStock = product.stock <= 0;

  const handleProductSelect = () => {
    if (isSupplierMode) {
      toast.warning("Product selection is disabled in maintenance mode");
      return;
    }
    if (isProcessingPayment || isOutOfStock) return;

    dispatch(selectProduct(product));
  };

  return (
    <div
      className={`product-card ${isSelected ? "selected" : ""} ${
        isOutOfStock ? "out-of-stock" : ""
      }`}
      onClick={handleProductSelect}
    >
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-info">
        <div>{product.name}</div>
        <div>{product.price} units</div>
      </div>
      <div
        className={`stock-info ${isOutOfStock ? "out-of-stock" : "in-stock"}`}
      >
        {isOutOfStock ? "❌ Out of Stock" : `📦 Stock: ${product.stock}`}
      </div>
    </div>
  );
};

export default ProductCard;
