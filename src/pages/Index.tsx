
import React from 'react';
import Sidebar from '@/components/Sidebar';
import ReceiptTable from '@/components/ReceiptTable';
import TabsNavigation from '@/components/TabsNavigation';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="max-w-full">
          <div className="bg-blue-700 text-white p-2 mb-2 flex items-center">
            <h1 className="text-xl font-semibold">Парсер чеков</h1>
          </div>
          <div className="bg-white border border-gray-300 rounded shadow">
            <TabsNavigation />
            <div className="overflow-hidden">
              <ResizablePanelGroup direction="horizontal" className="w-full">
                <ResizablePanel defaultSize={100}>
                  <ReceiptTable />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
