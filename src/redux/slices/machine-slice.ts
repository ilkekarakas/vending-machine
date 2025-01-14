import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MachineState } from '../../types/general-types';
import { AVERAGE_TEMPERATURE, LIGHTNING_ENERGY, MAX_ENERGY_CAPACITY, ROBOT_ARM_ENERGY, TEMPERATURE_ENERGY } from '../../utils/environment-constants';

const initialState: MachineState = {
  energyConsumption: 0,
  components: {
    cooling: false,
    heating: false,
    lights: false,
    robotArm: false,
  },
  machineTemperature: AVERAGE_TEMPERATURE, // Starting at middle of normal range (8-12)
  isNightTime: false,
  isSupplierMode: false, // Always start with supplier mode off
};

const machineSlice = createSlice({
  name: 'machine',
  initialState,
  reducers: {
    toggleComponent: (state, action: PayloadAction<keyof typeof initialState.components>) => {
      const component = action.payload;
      
      // Get the energy consumption based on component type
      let componentEnergy;
      switch (component) {
        case 'cooling':
        case 'heating':
          componentEnergy = TEMPERATURE_ENERGY;
          break;
        case 'lights':
          componentEnergy = LIGHTNING_ENERGY;
          break;
        case 'robotArm':
          componentEnergy = ROBOT_ARM_ENERGY;
          break;
      }
      
      const newEnergyConsumption = state.energyConsumption + (state.components[component] ? -componentEnergy : componentEnergy);
      
      // Check if turning on would exceed energy limit
      if (!state.components[component] && newEnergyConsumption > MAX_ENERGY_CAPACITY) {
        return; // Don't toggle if it would exceed limit
      }
      
      state.components[component] = !state.components[component];
      state.energyConsumption = newEnergyConsumption;
    },
    updateEnvironment: (state) => {
      // Random temperature decr - increased from 0.2 to 0.6
      let tempChange = (Math.random() - 0.5) * 0.8;
      
      // Add temperature change based on time of day
      tempChange += state.isNightTime ? -0.3 : 0.3; // Temperature decreases at night, increases during day

      // Sistemlerin sıcaklık etkisi
      if (state.components.cooling) {
        tempChange = -Math.random(); // Soğutma etkisi
      }
      if (state.components.heating) {
        tempChange = Math.random(); // Isıtma etkisi
      }

      // Apply temperature change with limits
      state.machineTemperature = Math.max(4, Math.min(14, state.machineTemperature + tempChange));

      // Enerji tüketimini hesapla
      let currentEnergy = 0;
      if (state.components.cooling || state.components.heating) currentEnergy += TEMPERATURE_ENERGY;
      if (state.components.lights) currentEnergy += LIGHTNING_ENERGY;
      if (state.components.robotArm) currentEnergy += ROBOT_ARM_ENERGY;
      
      state.energyConsumption = currentEnergy;
    },
    deactivateRobotArm: (state) => {
      if (state.components.robotArm) {
        state.components.robotArm = false;
        state.energyConsumption -= ROBOT_ARM_ENERGY;
      }
    },
    toggleSupplierMode: (state) => {
      state.isSupplierMode = !state.isSupplierMode;
    },
    setNightTime: (state, action: PayloadAction<boolean>) => {
      state.isNightTime = action.payload;
      if (action.payload) { // If night time is activated
        state.components.lights = true;
        // Add energy consumption if lights weren't already on
        if (!state.components.lights) {
          state.energyConsumption += LIGHTNING_ENERGY;
        }
      } else {
        if (state.components.lights) {
          state.components.lights = false;
          state.energyConsumption -= LIGHTNING_ENERGY;
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
        state.energyConsumption = LIGHTNING_ENERGY;
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
