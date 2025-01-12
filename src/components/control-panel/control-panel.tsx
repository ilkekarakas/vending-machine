import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DisplayPanel from '../display-panel/display-panel';
import Payment from '../payment/payment';
import { selectProduct } from '../../redux/slices/product-slice';
import { selectPaymentMethod, refundMoney } from '../../redux/slices/payment-slice';
import { toast } from 'react-toastify';
import './control-panel.scss';

const SESSION_DURATION = 300; // 5 minutes for session in milisecond

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { insertedMoney, selectedPaymentMethod, isProcessingPayment } = useSelector((state: RootState) => state.payment);
  const { selectedProduct } = useSelector((state: RootState) => state.product);

  // Handling session timeout
  useEffect(() => {
    if (selectedProduct && !isProcessingPayment) {
      setTimeLeft(SESSION_DURATION);

      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === null) return null;
          if (prevTime <= 0) {
            clearInterval(timer);
            // Handling session expiration
            if (insertedMoney > 0) {
              dispatch(refundMoney());
              toast.info(`Refunded ${insertedMoney} units due to session timeout`);
            }
            if (selectedPaymentMethod) {
              dispatch(selectPaymentMethod(null));
            }
            dispatch(selectProduct(null));
            toast.warning('Session expired! Please select a product again.');
            return 0;
          }
          if (prevTime === 30) {
            toast.warning('Session ending in 30 seconds!');
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeLeft(null);
    }
  }, [selectedProduct, insertedMoney, selectedPaymentMethod, isProcessingPayment]);

  return (
    <div className="control-panel">
      {selectedProduct && timeLeft !== null && timeLeft > 0 && !isProcessingPayment && (
        <div className="session-display">
          <div className="timer">
            ⏳ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <div className="label">Session Time Remaining</div>
        </div>
      )}
      <DisplayPanel />
      <Payment />
    </div>
  );
};

export default ControlPanel;
