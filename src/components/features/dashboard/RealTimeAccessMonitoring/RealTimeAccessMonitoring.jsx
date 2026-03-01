import React, { useState, useEffect } from 'react';
import { getRealtimeAccess } from '../../../../utils/api/realtime';

const RealTimeAccessMonitoring = () => {
  const [accessData, setAccessData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRealtime();

    // Polling setiap 15 detik
    const interval = setInterval(() => {
      fetchRealtime();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const fetchRealtime = async () => {
    setLoading(true);
    try {
      const res = await getRealtimeAccess({ limit: 10 });
      console.log("data res", res.data.data);
      const data = (res.data.data || []).map((item) => ({
        device: item.device_name || '-',
        name: item.user_name || '-',
        success: item.result_status === 'Success',
        time: item.pass_datetime || '-',
      }));
      setAccessData(data);
    } catch (error) {
      console.error("Fetch realtime failed", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200">
      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-4 md:mb-6">Real Time Access Monitoring</h3>
      {loading && accessData.length === 0 ? (
        <div className="text-center text-sm text-gray-500 py-4">Loading...</div>
      ) : (
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-blue-600 font-semibold">Device</th>
              <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-blue-600 font-semibold">Name</th>
              <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-blue-600 font-semibold">Success</th>
              <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-blue-600 font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            {accessData.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-8 text-center text-sm text-gray-400">No Data</td>
              </tr>
            ) : (
              accessData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-700">{item.device}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-700">{item.name}</td>
                  <td className="py-3 md:py-4 px-2 md:px-4">
                    <span
                      className={`inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium ${
                        item.success
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {item.success ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="py-3 md:py-4 px-2 md:px-4 text-xs md:text-sm text-gray-700">{item.time}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default RealTimeAccessMonitoring;
