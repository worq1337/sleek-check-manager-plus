
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
      <style jsx global>{`
        th {
          resize: horizontal;
          overflow: auto;
          min-width: 100px;
        }
      `}</style>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black resize-x overflow-auto">№</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black resize-x overflow-auto">Д.н</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black resize-x overflow-auto">Дата</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black resize-x overflow-auto">Время</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap text-black resize-x overflow-auto">Оператор/продавец</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-left whitespace-nowrap text-black resize-x overflow-auto">Приложение</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap text-black resize-x overflow-auto">Сумма</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-right whitespace-nowrap text-black resize-x overflow-auto">Остаток</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black resize-x overflow-auto">ПК</TableHead>
            <TableHead className="border border-gray-300 px-4 py-2 text-center whitespace-nowrap text-black resize-x overflow-auto">p2p</TableHead>
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
