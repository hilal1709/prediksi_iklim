export default function HistoricalTable() {
  return (
    <div className="bg-white mt-6 shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Tabel data historis
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tahun
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Suhu Rata-rata (°C)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Curah Hujan (mm)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Anomali Suhu (°C)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                2020
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                26.8
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                1,850
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                +0.8
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                2019
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                26.5
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                1,720
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                +0.5
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                2018
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                26.2
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                1,680
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                +0.2
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                2017
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                25.9
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                1,750
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                -0.1
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
