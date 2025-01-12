import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import './display-panel.scss';

const DisplayPanel: React.FC = () => {
    const {
        selectedProduct,
    } = useSelector((state: RootState) => state.product);
    const {
        insertedMoney,
        isInsertingMoney,
        lastInsertedAmount,
    } = useSelector((state: RootState) => state.payment);

    return (
        <>
            <div className="display">
                {selectedProduct
                    ? `${selectedProduct.name} - ${selectedProduct.price} units`
                    : 'Select a product'}
            </div>
            <div className="display">
                💰 {isInsertingMoney
                    ? `Inserting ${lastInsertedAmount} units...`
                    : `Balance: ${insertedMoney} units`}
            </div>
        </>
    );
}

export default DisplayPanel;
