
import React from 'react';
import { useAppContext, Receipt, Tab } from '@/contexts/AppContext';

const ReceiptTable: React.FC = () => {
  const { activeTab, receipts, selectedReceiptId, setSelectedReceiptId } = useAppContext();
  
  const currentReceipts = receipts[activeTab];

  const handleRowClick = (id: number) => {
    setSelectedReceiptId(id === selectedReceiptId ? null : id);
  };

  const columnAlignments = [
    "text-center", // № (id)
    "text-center", // Д.у (serviceId)
    "text-center", // Дата
    "text-center", // Время
    "text-left",   // Оператор/продавец
    "text-left",   // Приложение
    "text-right",  // Сумма
    "text-right",  // Остаток
    "text-center", // ПК
    "text-center", // p2p
  ];

  return (
    <div className="w-full overflow-x-auto animate-fade-in">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-table-header dark:bg-table-headerDark">
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">№</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">Д.у</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">Дата</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">Время</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Оператор/продавец</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Приложение</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right">Сумма</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-right">Остаток</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">ПК</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">p2p</th>
          </tr>
        </thead>
        <tbody>
          {currentReceipts.map((receipt) => (
            <tr 
              key={receipt.id} 
              onClick={() => handleRowClick(receipt.id)}
              className={`cursor-pointer hover:bg-table-hover dark:hover:bg-table-hoverDark transition-colors ${selectedReceiptId === receipt.id ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
            >
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[0]}`}>{receipt.id}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[1]}`}>{receipt.serviceId}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[2]}`}>{receipt.date}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[3]}`}>{receipt.time}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[4]}`}>{receipt.operator}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[5]}`}>{receipt.application}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[6]}`}>{receipt.amount.toLocaleString()}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[7]}`}>{receipt.balance.toLocaleString()}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[8]}`}>{receipt.pc}</td>
              <td className={`border border-gray-300 dark:border-gray-600 px-4 py-2 ${columnAlignments[9]}`}>{receipt.p2p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptTable;
