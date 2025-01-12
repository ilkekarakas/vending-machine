import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import './environment-status.scss';



const EnvironmentStatus: React.FC = () => {
  const {
    components,
  } = useSelector((state: RootState) => state.machine);

  const getStatusClass = () => {
    if (components.cooling) return 'cooling';
    if (components.heating) return 'heating';
    return 'optimal';
  };

  return (
    <div className="environment-status">
      <span className={`temperature-status ${getStatusClass()}`}>
        {components.cooling && '❄️ Cooling Active'}
        {components.heating && '🔥 Heating Active'}
        {!components.cooling && !components.heating && '✅ Temperature Optimal'}
      </span>
      <span className={`status-item ${components.lights ? 'lights-on' : ''}`}>
        💡 {components.lights ? 'Lights On' : 'Lights Off'}
      </span>
      {components.robotArm && <span className="status-item">🦾 Dispensing</span>}
    </div>

  );
}

export default EnvironmentStatus;