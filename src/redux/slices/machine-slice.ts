import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MachineState } from '../../types/general-types';

const initialState: MachineState = {
  energyConsumption: 0,
  components: {
    cooling: false,
    heating: false,
    lights: false,
    robotArm: false,
  },
  machineTemperature: 10, // Starting at middle of normal range (8-12)
  isNightTime: false,
  isSupplierMode: false, // Always start with supplier mode off
};

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    toggleComponent: (state, action: PayloadAction<keyof typeof initialState.components>) => {
      const component = action.payload;
      const newEnergyConsumption = state.energyConsumption + (state.components[component] ? -2 : 2);
      
      // Check if turning on would exceed energy limit
      if (!state.components[component] && newEnergyConsumption > 5) {
        return; // Don't toggle if it would exceed limit
      }
      
      state.components[component] = !state.components[component];
      state.energyConsumption = newEnergyConsumption;
    },
    updateEnvironment: (state) => {
      let currentEnergy = 0;
      const activeComponents: string[] = [];

      // Random temperature decr - increased from 0.2 to 0.6
      let tempChange = (Math.random() - 0.5) * 0.8;
      
      // Add temperature change based on time of day
      tempChange += state.isNightTime ? -0.3 : 0.3; // Temperature decreases at night, increases during day

      // Calculate current energy usage from active components
      Object.entries(state.components).forEach(([component, isActive]) => {
        if (isActive) {
          activeComponents.push(component);
          currentEnergy += 2;
        }
      });

      // Temperature control logic
      if (state.machineTemperature < 8) {
        // Need heating - temperature below normal range
        if (currentEnergy + 2 <= 5 && !state.components.heating) {
          state.components.heating = true;
          state.components.cooling = false;
          currentEnergy += 2;
        }
        if (state.components.heating) {
          tempChange = Math.random(); // Random value between 0 and 1
        }
      } else if (state.machineTemperature > 12) {
        // Need cooling - temperature above normal range
        if (currentEnergy + 2 <= 5 && !state.components.cooling) {
          state.components.cooling = true;
          state.components.heating = false;
          currentEnergy += 2;
        }
        if (state.components.cooling) {
          tempChange = -Math.random(); // Random value between -1 and 0
        }
      } else if (state.machineTemperature >= 8 && state.machineTemperature <= 12) {
        // Within normal range - turn off temperature control if active
        if (state.components.cooling || state.components.heating) {
          state.components.cooling = false;
          state.components.heating = false;
          currentEnergy -= 2;
        }
      }

      // Apply temperature change with limits
      state.machineTemperature = Math.max(4, Math.min(14, state.machineTemperature + tempChange));

      // Update energy consumption
      state.energyConsumption = currentEnergy;
    },
    deactivateRobotArm: (state) => {
      if (state.components.robotArm) {
        state.components.robotArm = false;
        state.energyConsumption -= 2;
      }
    },
    toggleSupplierMode: (state) => {
      state.isSupplierMode = !state.isSupplierMode;
      if (!state.isSupplierMode) {
        // Reset machine state when exiting supplier mode
        state.components = initialState.components;
        state.energyConsumption = initialState.energyConsumption;
      }
    },
    setNightTime: (state, action: PayloadAction<boolean>) => {
      state.isNightTime = action.payload;
      if (action.payload) { // If night time is activated
        state.components.lights = true;
        // Add energy consumption if lights weren't already on
        if (!state.components.lights) {
          state.energyConsumption += 2;
        }
      }
    },
    resetMachine: (state) => {
      const wasNightTime = state.isNightTime;
      
      // Reset all state values
      state.energyConsumption = 0;
      state.components = {
        cooling: false,
        heating: false,
        lights: false,
        robotArm: false,
      };
      state.machineTemperature = 10;
      state.isSupplierMode = false;
      
      // Preserve night mode and handle lights
      state.isNightTime = wasNightTime;
      if (wasNightTime) {
        state.components.lights = true;
        state.energyConsumption = 2;
      }
    }
  },
});

export const {
  toggleComponent,
  updateEnvironment,
  deactivateRobotArm,
  toggleSupplierMode,
  setNightTime,
  resetMachine,
} = machineSlice.actions;

export default machineSlice.reducer;
