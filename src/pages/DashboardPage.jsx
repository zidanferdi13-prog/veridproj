import React, { useEffect, useState } from "react";
import {
  MainLayout,
  DashboardCards,
  Charts,
  RealTimeAccessMonitoring,
} from "@components";
import { deviceActive } from "../utils/api/dashboard";

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    getDeviceActive();

    // Refresh data setiap 30 detik
    const interval = setInterval(() => {
      getDeviceActive();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getDeviceActive = async () => {
    try {
      const res = await deviceActive();
      console.log("data res", res.data.data);
      setDashboardData(res.data.data);
    } catch (error) {
      console.error("Fetch dashboard failed", error);
    }
  };

  return (
    <MainLayout>
      <DashboardCards data={dashboardData} />
      <Charts />
      <RealTimeAccessMonitoring />
    </MainLayout>
  );
};

export default DashboardPage;
