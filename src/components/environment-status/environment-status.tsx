import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import './environment-status.scss';
import React, { useMemo } from "react";

const EnvironmentStatus: React.FC = () => {
  const { components } = useSelector((state: RootState) => state.machine);

  const statusClass = useMemo(() => {
    if (components.cooling) return 'cooling';
    if (components.heating) return 'heating';
    return 'optimal';
  }, [components.cooling, components.heating]);

  return (
    <div className="environment-status">
      <span className={`temperature-status ${statusClass}`}>
        {components.cooling && '❄️ Cooling Active'}
        {components.heating && '🔥 Heating Active'}
        {!components.cooling && !components.heating && '✅ Temperature Optimal'}
      </span>
      <span className={`status-item ${components.lights ? 'lights-on' : ''}`}>
        💡 {components.lights ? 'Lights On' : 'Lights Off'}
      </span>
    </div>
  );
};

export default EnvironmentStatus;
