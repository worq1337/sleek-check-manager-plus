
import React from 'react';
import { useAppContext, Receipt, Tab } from '@/contexts/AppContext';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

const ReceiptTable: React.FC = () => {
  const { activeTab, receipts, selectedReceiptId, setSelectedReceiptId } = useAppContext();
  
  const currentReceipts = receipts[activeTab];

  const handleRowClick = (id: number) => {
    setSelectedReceiptId(id === selectedReceiptId ? null : id);
  };

  return (
    <div className="w-full overflow-x-auto animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">1) №</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">2) Д.н</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">3) Дата</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">4) Время</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">5) Оператор/продавец</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap">6) Приложение</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap">7) Сумма</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap">8) Остаток</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">9) ПК</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap">10) p2p</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentReceipts.map((receipt) => (
            <TableRow 
              key={receipt.id} 
              onClick={() => handleRowClick(receipt.id)}
              className={`cursor-pointer hover:bg-gray-100 transition-colors ${selectedReceiptId === receipt.id ? 'bg-blue-100' : ''}`}
            >
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{receipt.id}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{receipt.serviceId}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{receipt.date}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{receipt.time}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">{receipt.operator}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis">{receipt.application}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap overflow-hidden text-ellipsis">{receipt.amount.toLocaleString()}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap overflow-hidden text-ellipsis">{receipt.balance.toLocaleString()}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{receipt.pc}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis">{receipt.p2p}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReceiptTable;
