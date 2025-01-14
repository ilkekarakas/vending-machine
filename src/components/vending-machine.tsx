import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../redux/store";
import {
  updateEnvironment,
  deactivateRobotArm,
  setNightTime,
  resetMachine,
  toggleComponent,
} from "../redux/slices/machine-slice";
import VendingMachineBody from "./vending-machine-body/vending-machine-body";
import SupplierPanel from "./supplier-panel/supplier-panel";
import StatusBar from "./status-bar/status-bar";
import EnvironmentStatus from "./environment-status/environment-status";
import "./vending-machine.scss";
import {
  DAY_TIME,
  MAX_ENERGY_CAPACITY,
  NIGHT_TIME,
  NORMAL_MAX_TEMPERATURE,
  NORMAL_MIN_TEMPERATURE,
} from "../utils/environment-constants";
import { resetProducts } from "../redux/slices/product-slice";
import { resetPayment } from "../redux/slices/payment-slice";

const VendingMachine: React.FC = () => {
  const dispatch = useDispatch();
  const { isProcessingPayment } = useSelector(
    (state: RootState) => state.payment
  );

  const { energyConsumption, components, machineTemperature } = useSelector(
    (state: RootState) => state.machine
  );

  // Çevre güncelleme aralığı (sürekli çalışır)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateEnvironment());
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Sıcaklık kontrolü - daha sık kontrol
  useEffect(() => {
    const interval = setInterval(() => {
      // Soğutma kontrolü
      if (machineTemperature > NORMAL_MAX_TEMPERATURE && !components.cooling) {
        dispatch(toggleComponent('cooling'));
      } else if (machineTemperature <= NORMAL_MAX_TEMPERATURE && components.cooling) {
        dispatch(toggleComponent('cooling'));
      }

      // Isıtma kontrolü
      if (machineTemperature < NORMAL_MIN_TEMPERATURE && !components.heating) {
        dispatch(toggleComponent('heating'));
      } else if (machineTemperature >= NORMAL_MIN_TEMPERATURE && components.heating) {
        dispatch(toggleComponent('heating'));
      }
    }, 1000); // Her saniye kontrol et

    return () => clearInterval(interval);
  }, [machineTemperature, components]);

  // Gece modu kontrolü
  useEffect(() => {
    const checkNightTime = () => {
      const currentHour = new Date().getHours();
      dispatch(
        setNightTime(currentHour >= NIGHT_TIME || currentHour < DAY_TIME)
      );
    };

    // İlk kontrol
    checkNightTime();

    // Her dakika kontrol et
    const interval = setInterval(checkNightTime, 60000);

    return () => clearInterval(interval);
  }, []);

  //ürün verme süresi bittiğinde Robot kolunu devre dışı bırak 
  useEffect(() => {
    if (components.robotArm) {
      const timer = setTimeout(() => {
        dispatch(deactivateRobotArm());
      }, 5000); // 5 saniye

      return () => clearTimeout(timer);
    }
  }, [components.robotArm]);

  // Yüksek enerji tüketimi için uyarı ekle
  useEffect(() => {
    if (energyConsumption > MAX_ENERGY_CAPACITY) {
      toast.warning("High energy consumption! Some systems may be disabled.");
    }
  }, [energyConsumption]);

  return (
    <div className="vending-machine-container">
      <div className="header-section">
        <h1 className="header">Vending Machine</h1>
        <button
          className="clear-cache-button"
          onClick={() => {
            // First clear localStorage
            localStorage.clear();

            // Force Redux state reset by dispatching reset actions
            dispatch(resetMachine());
            dispatch(resetProducts());
            dispatch(resetPayment());

            toast.success("Cache cleared! Page will reload...");
            setTimeout(() => window.location.reload(), 1500);
          }}
        >
          🗑️ DEBUG: Clear Cache
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
        <div className="processing-overlay">Processing Payment</div>
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
