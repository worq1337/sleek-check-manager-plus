
import React from 'react';
import { useAppContext, Receipt, Tab } from '@/contexts/AppContext';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ResizableHandle } from '@/components/ui/resizable';

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
          <TableRow className="bg-gray-200">
            <TableHead className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap text-black font-semibold">№</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap text-black font-semibold">Д.н</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap text-black font-semibold">Дата</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap text-black font-semibold">Время</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-left whitespace-nowrap text-black font-semibold">Оператор/продавец</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-left whitespace-nowrap text-black font-semibold">Приложение</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-right whitespace-nowrap text-black font-semibold">Сумма</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-right whitespace-nowrap text-black font-semibold">Остаток</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap text-black font-semibold">ПК</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap text-black font-semibold">p2p</TableHead>
            <TableHead className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap text-black font-semibold">Источник</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentReceipts.map((receipt) => (
            <TableRow 
              key={receipt.id} 
              onClick={() => handleRowClick(receipt.id)}
              className={`cursor-pointer hover:bg-gray-100 transition-colors ${selectedReceiptId === receipt.id ? 'bg-blue-100' : ''}`}
            >
              <TableCell className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.id}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.serviceId}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.date}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.time}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.operator}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-left whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.application}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-right whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.amount.toLocaleString()}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-right whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.balance.toLocaleString()}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.pc}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.p2p}</TableCell>
              <TableCell className="border border-gray-400 px-4 py-2 text-center whitespace-nowrap overflow-hidden text-ellipsis text-black">{receipt.source || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReceiptTable;
