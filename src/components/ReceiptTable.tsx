
import React from 'react';
import { useAppContext, Receipt, Tab } from '@/contexts/AppContext';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ResizableHandle } from '@/components/ui/resizable';

// Add a CSS class for resizable columns instead of using an inline style tag
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
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black">№</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black">Д.н</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black">Дата</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black">Время</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap text-black">Оператор/продавец</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap text-black">Приложение</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap text-black">Сумма</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap text-black">Остаток</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black">ПК</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black">p2p</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentReceipts.map((receipt) => (
            <TableRow 
              key={receipt.id} 
              onClick={() => handleRowClick(receipt.id)}
              className={`cursor-pointer hover:bg-gray-100 transition-colors ${selectedReceiptId === receipt.id ? 'bg-blue-100' : ''}`}
            >
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.id}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.serviceId}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.date}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.time}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.operator}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.application}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.amount.toLocaleString()}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.balance.toLocaleString()}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.pc}</TableCell>
              <TableCell className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.p2p}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReceiptTable;
