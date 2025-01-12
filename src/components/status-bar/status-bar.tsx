import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import './status-bar.scss';


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
      <span>⚡ Energy: {energyConsumption}/5 units/hour</span>
    </div>

  );

}

export default StatusBar;