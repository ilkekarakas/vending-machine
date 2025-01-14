import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MachineState } from '../../types/general-types';
import { AVERAGE_TEMPERATURE, LIGHTNING_ENERGY, MAX_ENERGY_CAPACITY, NORMAL_MAX_TEMPERATURE, NORMAL_MIN_TEMPERATURE, ROBOT_ARM_ENERGY, TEMPERATURE_ENERGY } from '../../utils/environment-constants';

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
          currentEnergy += TEMPERATURE_ENERGY;
        }
      });

      // Temperature control logic
      if (state.machineTemperature < NORMAL_MIN_TEMPERATURE) {
        // Need heating - temperature below normal range
        if (currentEnergy + TEMPERATURE_ENERGY <= MAX_ENERGY_CAPACITY && !state.components.heating) {
          state.components.heating = true;
          state.components.cooling = false;
          currentEnergy += TEMPERATURE_ENERGY;
        }
        if (state.components.heating) {
          tempChange = Math.random();   
        }
      } else if (state.machineTemperature > NORMAL_MAX_TEMPERATURE) {
        // Need cooling - temperature above normal range
        if (currentEnergy + TEMPERATURE_ENERGY <= MAX_ENERGY_CAPACITY && !state.components.cooling) {
          state.components.cooling = true;
          state.components.heating = false;
          currentEnergy += TEMPERATURE_ENERGY;
        }
        if (state.components.cooling) {
          tempChange = -Math.random(); // Random value between -1 and 0
        }
      } else if (state.machineTemperature >= NORMAL_MIN_TEMPERATURE && state.machineTemperature <= NORMAL_MAX_TEMPERATURE) {
        // Within normal range - turn off temperature control if active
        if (state.components.cooling || state.components.heating) {
          state.components.cooling = false;
          state.components.heating = false;
          currentEnergy -= TEMPERATURE_ENERGY;
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
