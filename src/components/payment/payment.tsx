import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import { PaymentMethod } from "../../types/general-types";
import { toast } from 'react-toastify';
import { deductPayment, insertMoney, refundMoney, selectPaymentMethod, setProcessingPayment, setIsInsertingMoney, setLastInsertedAmount } from "../../redux/slices/payment-slice";
import { decreaseStock, selectProduct, updateTotalSales } from "../../redux/slices/product-slice";
import { deactivateRobotArm, toggleComponent } from "../../redux/slices/machine-slice";
import './payment.scss';
import '../../assets/styles/common.scss';

const Payment: React.FC = () => {
    const dispatch = useDispatch();
    const [, setTimeLeft] = useState<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const {
        products,
        selectedProduct,
    } = useSelector((state: RootState) => state.product);

    const {
        insertedMoney,
        selectedPaymentMethod,
        isProcessingPayment,
        isInsertingMoney,
    } = useSelector((state: RootState) => state.payment);

    const {
        energyConsumption,
        isSupplierMode,
    } = useSelector((state: RootState) => state.machine);

    // Reset payment state when supplier mode is activated
    useEffect(() => {
        if (isSupplierMode) {
            if (insertedMoney > 0) {
                toast.info(`Refunded ${insertedMoney} units due to maintenance mode`);
                dispatch(refundMoney());
            }
            if (selectedProduct) {
                dispatch(selectProduct(null));
            }
            if (selectedPaymentMethod) {
                dispatch(selectPaymentMethod(null));
            }
        }
    }, [isSupplierMode, insertedMoney, selectedProduct, selectedPaymentMethod, dispatch]);

    const handlePaymentMethodSelect = (method: PaymentMethod) => {
        if (isSupplierMode) {
            toast.warning('Payment is disabled in maintenance mode');
            return;
        }
        if (!selectedProduct) {
            toast.error('Please select a product first');
            return;
        }
        // If cash was inserted and switching to credit card, refund the money
        if (method === 'credit_card' && insertedMoney > 0) {
            const refundAmount = insertedMoney;
            dispatch(refundMoney()); // This will only refund the money
            toast.info(`Refunded ${refundAmount} units from cash payment`);
        }
        dispatch(selectPaymentMethod(method));
    };

    const handleInsertMoney = async (amount: number) => {
        if (isSupplierMode) {
            toast.warning('Money insertion is disabled in maintenance mode');
            return;
        }
        if (isProcessingPayment || isInsertingMoney) return;

        if (!selectedProduct) {
            toast.error('Please select a product first');
            return;
        }

        if (!selectedPaymentMethod) {
            toast.error('Please select a payment method first');
            return;
        }

        if (selectedPaymentMethod !== PaymentMethod.Cash) {
            toast.error('Please use cash payment method to insert money');
            return;
        }

        dispatch(setIsInsertingMoney(true));
        dispatch(setLastInsertedAmount(amount));
        dispatch(insertMoney(amount));

        // Wait for 1 second
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(setIsInsertingMoney(false));
        dispatch(setLastInsertedAmount(0));
    };

    const handlePurchase = async () => {
        if (isSupplierMode) {
            toast.warning('Purchasing is disabled in maintenance mode');
            return;
        }
        if (!selectedProduct) {
            toast.error('Please select a product first');
            return;
        }

        const product = products.find(p => p.id === selectedProduct.id);
        if (!product || product.stock <= 0) {
            toast.error('Product out of stock');
            dispatch(selectProduct(null));
            return;
        }

        if (!selectedPaymentMethod) {
            toast.error('Please select a payment method');
            return;
        }

        // Check energy consumption before activating robot arm
        if (energyConsumption + 2 > 5) {
            toast.error('Cannot process purchase: System energy limit reached. Please try again in a moment.');
            return;
        }

        dispatch(setProcessingPayment(true));

        if (selectedPaymentMethod === PaymentMethod.CreditCard) {
            toast.info('Processing credit card payment...');
            await new Promise(resolve => setTimeout(resolve, 2000));

            dispatch(decreaseStock(selectedProduct.id));
            dispatch(updateTotalSales(selectedProduct.price));
            dispatch(deductPayment(selectedProduct.price));
            dispatch(selectProduct(null));
            dispatch(toggleComponent('robotArm'));

            toast.success('Payment successful! Dispensing product...');
        } else {
            // Cash payment
            if (insertedMoney < selectedProduct.price) {
                dispatch(setProcessingPayment(false));
                toast.error(`Please insert ${selectedProduct.price - insertedMoney} more units`);
                return;
            }

            dispatch(decreaseStock(selectedProduct.id));
            dispatch(updateTotalSales(selectedProduct.price));
            dispatch(deductPayment(selectedProduct.price));
            dispatch(selectProduct(null));
            dispatch(toggleComponent('robotArm'));

            toast.success('Payment successful! Dispensing product...');
        }

        dispatch(setProcessingPayment(false));
        setTimeLeft(null); // Reset timer after successful purchase

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        // Deactivate robot arm after 2 seconds
        setTimeout(() => {
            dispatch(deactivateRobotArm());
        }, 2000);
    };

    const handleRefund = () => {
        if (insertedMoney > 0) {
            toast.success(`Refunded ${insertedMoney} units. Please collect your money.`);
            dispatch(refundMoney());
        } else {
            toast.info('No money to refund.');
        }
    };

    return (
        <>
            <div className="payment-section">
                <h3>Payment Method</h3>
                <div className="button-group">
                    <button
                        className="button"
                        onClick={() => handlePaymentMethodSelect(PaymentMethod.Cash)}
                        disabled={isProcessingPayment}
                        style={{
                            background: selectedPaymentMethod === PaymentMethod.Cash ? '#27AE60' : undefined,
                            opacity: selectedPaymentMethod === PaymentMethod.Cash ? 1 : 0.8,
                        }}
                    >
                        💵 Cash
                    </button>
                    <button
                        className="button"
                        onClick={() => handlePaymentMethodSelect(PaymentMethod.CreditCard)}
                        disabled={isProcessingPayment}
                        style={{
                            background: selectedPaymentMethod === PaymentMethod.CreditCard ? '#27AE60' : undefined,
                            opacity: selectedPaymentMethod === PaymentMethod.CreditCard ? 1 : 0.8,
                        }}
                    >
                        💳 Credit Card
                    </button>
                </div>

                {selectedPaymentMethod === PaymentMethod.Cash && (
                    <div className="payment-section">
                        <h3>Insert Money</h3>
                        <div className="button-group">
                            {[1, 5, 10, 20].map((amount) => (
                                <button
                                    key={amount}
                                    className="button"
                                    onClick={() => handleInsertMoney(amount)}
                                    disabled={isProcessingPayment || isInsertingMoney}
                                >
                                    +{amount}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="button-group is-footer">
                <button
                    className="button"
                    onClick={handleRefund}
                    disabled={isProcessingPayment || insertedMoney === 0}
                    style={{ background: '#E74C3C' }}
                >
                    ↩️ Refund
                </button>
                <button
                    className="button"
                    onClick={handlePurchase}
                    disabled={
                        isProcessingPayment ||
                        !selectedProduct ||
                        (selectedPaymentMethod === PaymentMethod.Cash && insertedMoney < (selectedProduct?.price || 0)) ||
                        !selectedPaymentMethod
                    }
                    style={{ background: '#27AE60' }}
                >
                    ✅ Purchase
                </button>
            </div>
        </>
    );

}

export default Payment;
