import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import './status-bar.scss';
import { MAX_ENERGY_CAPACITY } from "../../utils/environment-constants";


const StatusBar: React.FC = () => {
  const {
    energyConsumption,
    machineTemperature,
    isNightTime,
  } = useSelector((state: RootState) => state.machine);

  return (
    <div className="status-bar">
      <span>🌡️ Machine: {machineTemperature.toFixed(1)}°C</span>
      <span>{isNightTime ? '🌙 Night Mode' : '☀️ Day Mode'}</span>
      <span>⚡ Energy: {energyConsumption}/{MAX_ENERGY_CAPACITY} units/hour</span>
    </div>

  );

}

export default StatusBar;