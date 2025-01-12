import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../redux/store';
import { updateEnvironment, deactivateRobotArm, setNightTime } from '../redux/slices/machine-slice';
import VendingMachineBody from './vending-machine-body/vending-machine-body';
import SupplierPanel from './supplier-panel/supplier-panel';
import StatusBar from './status-bar/status-bar';
import EnvironmentStatus from './environment-status/environment-status';
import './vending-machine.scss';

const VendingMachine: React.FC = () => {
  const dispatch = useDispatch();

  const {
    isProcessingPayment,
  } = useSelector((state: RootState) => state.payment);

  const {
    energyConsumption,
    components,
  } = useSelector((state: RootState) => state.machine);

  // Çevre güncelleme aralığı (sürekli çalışır)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateEnvironment());
    }, 3000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Gece modu kontrolü
  useEffect(() => {
    const checkNightTime = () => {
      const currentHour = new Date().getHours();
      dispatch(setNightTime(currentHour >= 20 || currentHour < 6));
    };

    // İlk kontrol
    checkNightTime();

    // Her dakika kontrol et
    const interval = setInterval(checkNightTime, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  // Robot kolunu devre dışı bırak
  useEffect(() => {
    if (components.robotArm) {
      const timer = setTimeout(() => {
        dispatch(deactivateRobotArm());
      }, 5000); // 5 saniye

      return () => clearTimeout(timer);
    }
  }, [components.robotArm, dispatch]);

  // Yüksek enerji tüketimi için uyarı ekle
  useEffect(() => {
    if (energyConsumption > 4) {
      toast.warning('High energy consumption! Some systems may be disabled.');
    }
  }, [energyConsumption]);

  return (
    <div className="vending-machine-container">
      <div className="header-section">
        <h1 className="header">Vending Machine</h1>
        <button
          className="clear-cache-button"
          onClick={() => {
            localStorage.clear();
            toast.success('Cache cleared! Page will reload...');
            setTimeout(() => window.location.reload(), 1500);
          }}
        >
          🗑️ Clear Cache
        </button>
      </div>
      <VendingMachineBody />
      <StatusBar />
      <EnvironmentStatus />
      <SupplierPanel />

      {components.robotArm && (
        <div className="dispensing-overlay">
          <div className="robot">🤖</div>
          Dispensing Your Product...
        </div>
      )}

      {isProcessingPayment && (
        <div className="processing-overlay">
          Processing Payment
        </div>
      )}

      <ToastContainer
        position="top-right"
        theme="dark"
        className="toast-container"
      />
    </div>
  );
};

export default VendingMachine;
