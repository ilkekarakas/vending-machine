import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import DisplayPanel from '../display-panel/display-panel';
import Payment from '../payment/payment';
import { selectProduct } from '../../redux/slices/product-slice';
import { selectPaymentMethod, refundMoney, setSessionEndTime } from '../../redux/slices/payment-slice';
import { toast } from 'react-toastify';
import './control-panel.scss';
import { SESSION_DURATION } from '../../utils/environment-constants';

const ControlPanel: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const { insertedMoney, selectedPaymentMethod, isProcessingPayment, sessionEndTime } = useSelector((state: RootState) => state.payment);
  const { selectedProduct } = useSelector((state: RootState) => state.product);

  // Handling session timeout
  useEffect(() => {
    if (selectedProduct && !isProcessingPayment) {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      
      if (!sessionEndTime) {
        // Set new session end time if not exists
        const newEndTime = now + SESSION_DURATION;
        dispatch(setSessionEndTime(newEndTime));
        setTimeLeft(SESSION_DURATION);
      } else {
        // Calculate remaining time from persisted session end time
        const remaining = sessionEndTime - now;
        if (remaining <= 0) {
          // Session already expired
          handleSessionExpiration();
        } else {
          // Resume from persisted time
          setTimeLeft(remaining);
        }
      }

      const timer = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        setTimeLeft((prevTime) => {
          if (prevTime === null) return null;
          if (prevTime <= 0 || (sessionEndTime && currentTime >= sessionEndTime)) {
            clearInterval(timer);
            handleSessionExpiration();
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
      dispatch(setSessionEndTime(null));
    }
  }, [selectedProduct, isProcessingPayment]);

  const handleSessionExpiration = () => {
    if (insertedMoney > 0) {
      dispatch(refundMoney());
      toast.info(`Refunded ${insertedMoney} units due to session timeout`);
    }
    if (selectedPaymentMethod) {
      dispatch(selectPaymentMethod(null));
    }
    dispatch(selectProduct(null));
    dispatch(setSessionEndTime(null));
    toast.warning('Session expired! Please select a product again.');
  };

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
      <Payment   setTimeLeft={setTimeLeft}  />
    </div>
  );
});

export default ControlPanel;
