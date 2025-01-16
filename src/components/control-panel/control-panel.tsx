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
  const { insertedMoney, isProcessingPayment, sessionEndTime } = useSelector((state: RootState) => state.payment);
  const { selectedProduct } = useSelector((state: RootState) => state.product);

  // Handling session timeout
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleSessionExpiration = () => {
      if (insertedMoney > 0) {
        dispatch(refundMoney());
        toast.info(`Refunded ${insertedMoney} units due to session timeout`);
      }
      dispatch(selectPaymentMethod(null));
      dispatch(selectProduct(null));
      dispatch(setSessionEndTime(null));
      setTimeLeft(0);
      toast.warning('Session expired! Please select a product again.');
    };

    if (selectedProduct && !isProcessingPayment) {
      const now = Math.floor(Date.now() / 1000);

      if (!sessionEndTime) {
        const newEndTime = now + SESSION_DURATION;
        dispatch(setSessionEndTime(newEndTime));
        setTimeLeft(SESSION_DURATION);
      } else {
        const remaining = sessionEndTime - now;
        if (remaining <= 0) {
          handleSessionExpiration();
          return;
        }
        setTimeLeft(remaining);
      }

      timer = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const remaining = sessionEndTime ? sessionEndTime - currentTime : 0;

        if (remaining <= 0) {
          clearInterval(timer);
          handleSessionExpiration();
          return;
        }

        if (remaining === 30) {
          toast.warning('Session ending in 30 seconds!');
        }

        setTimeLeft(remaining);
      }, 1000);
    } else {
      setTimeLeft(null);
      dispatch(setSessionEndTime(null));
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [selectedProduct, isProcessingPayment, sessionEndTime, insertedMoney, dispatch]);

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
      <Payment setTimeLeft={setTimeLeft} />
    </div>
  );
});

export default ControlPanel;