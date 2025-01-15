import { Product } from '../../types/general-types';
import { useSelector } from 'react-redux';
import ProductCard from '../product-card/product-card';
import ControlPanel from '../control-panel/control-panel';
import { RootState } from '../../redux/store';
import './vending-machine-body.scss';

const VendingMachineBody: React.FC = () => {
  const {
    products,
  } = useSelector((state: RootState) => state.product);
  
  // Show every product in products via ProductCard component
  return (
    <div className="vending-machine-body">
      <div className="product-grid">
        {products.map((item: Product) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <ControlPanel />
    </div>
  );

};

export default VendingMachineBody;
