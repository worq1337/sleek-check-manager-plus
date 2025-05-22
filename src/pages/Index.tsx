
import React from 'react';
import Sidebar from '@/components/Sidebar';
import ReceiptTable from '@/components/ReceiptTable';
import TabsNavigation from '@/components/TabsNavigation';

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-hidden">
        <div className="max-w-full">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Парсер чеков</h1>
          <TabsNavigation />
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ReceiptTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
