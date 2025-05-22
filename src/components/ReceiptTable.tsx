
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
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">№</th>
            <th className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">Д.у</th>
            <th className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">Дата</th>
            <th className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">Время</th>
            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Оператор/продавец</th>
            <th className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">Приложение</th>
            <th className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap">Сумма</th>
            <th className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap">Остаток</th>
            <th className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">ПК</th>
            <th className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">p2p</th>
          </tr>
        </thead>
        <tbody>
          {currentReceipts.map((receipt) => (
            <tr 
              key={receipt.id} 
              onClick={() => handleRowClick(receipt.id)}
              className={`cursor-pointer hover:bg-gray-100 transition-colors ${selectedReceiptId === receipt.id ? 'bg-blue-100' : ''}`}
            >
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[0]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.id}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[1]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.serviceId}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[2]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.date}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[3]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.time}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[4]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.operator}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[5]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.application}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[6]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.amount.toLocaleString()}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[7]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.balance.toLocaleString()}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[8]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.pc}</td>
              <td className={`border border-gray-300 px-4 py-2 ${columnAlignments[9]} whitespace-nowrap overflow-hidden text-ellipsis`}>{receipt.p2p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceiptTable;
