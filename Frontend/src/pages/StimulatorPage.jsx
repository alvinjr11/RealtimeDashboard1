import React from "react";
import SimulatorControl from "../components/SimulatorControl";
import SensorChart from "../components/SensorChart";
const SimulatorPage = () => {
  return (
    <div className="p-0 space-y-3">
      
      <SimulatorControl />
      <SensorChart />
    </div>
  );
};

export default SimulatorPage;