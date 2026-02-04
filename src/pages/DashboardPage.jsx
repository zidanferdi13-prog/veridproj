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

  // useEffect(() => {
  //   console.log("masuk sini");

  //   getDeviceActive();
  // }, []);

  const getDeviceActive = async () => {
    try {
      const res = await deviceActive();
      // console.log(res.data.data);
      setDashboardData(res.data.data)
    } catch (error) {
      console.log(error);
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
