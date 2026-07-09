/**
 * Custom hook untuk fetch data menggunakan dummy data
 */
import { useState, useEffect } from 'react';
import { generateClimateData } from './dataDummy';

export function useLSTMData({
  variable,
  method,
  province,
  regency,
  period,
  resolution,
  useLSTM = false, // Parameter tetap ada untuk kompatibilitas, tapi tidak digunakan
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      // Gunakan dummy data untuk semua variabel dan method
      const dummyData = generateClimateData({
        variable,
        method,
        resolution,
        period,
        province,
        regency,
      });
      setData(dummyData);
      setLoading(false);
      setError(null);
    };

    fetchData();
  }, [variable, method, province, regency, period, resolution, useLSTM]);

  return { data, loading, error };
}

