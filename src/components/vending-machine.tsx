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
import React from "react";

const VendingMachine: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { isProcessingPayment } = useSelector(
    (state: RootState) => state.payment
  );

  const { energyConsumption, components, machineTemperature } = useSelector(
    (state: RootState) => state.machine
  );

  // Environment update interval (runs continuously)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateEnvironment());
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Temperature control - checked more frequently for ux
  useEffect(() => {
    const interval = setInterval(() => {
    // Cooling system control
      if (machineTemperature > NORMAL_MAX_TEMPERATURE && !components.cooling) {
        dispatch(toggleComponent("cooling"));
      } else if (
        machineTemperature <= NORMAL_MAX_TEMPERATURE &&
        components.cooling
      ) {
        dispatch(toggleComponent("cooling"));
      }

      // Heating system control
      if (machineTemperature < NORMAL_MIN_TEMPERATURE && !components.heating) {
        dispatch(toggleComponent("heating"));
      } else if (
        machineTemperature >= NORMAL_MIN_TEMPERATURE &&
        components.heating
      ) {
        dispatch(toggleComponent("heating"));
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [machineTemperature, components]);

  // Night mode control
  useEffect(() => {
    const checkNightTime = () => {
      const currentHour = new Date().getHours();
      dispatch(
        setNightTime(currentHour >= NIGHT_TIME || currentHour < DAY_TIME)
      );
    };

    // Initial check
    checkNightTime();

    // Check every minute
    const interval = setInterval(checkNightTime, 60000);

    return () => clearInterval(interval);
  }, []);

    // Deactivate robot arm after dispensing timeout
  useEffect(() => {
    if (components.robotArm) {
      const timer = setTimeout(() => {
        dispatch(deactivateRobotArm());
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [components.robotArm]);

 // Display a warning for high energy consumption
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
});

export default VendingMachine;
