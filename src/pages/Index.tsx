
import React from 'react';
import Sidebar from '@/components/Sidebar';
import ReceiptTable from '@/components/ReceiptTable';
import TabsNavigation from '@/components/TabsNavigation';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Index: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-hidden">
        <div className="max-w-full">
          <h1 className="text-2xl font-bold mb-6 text-black">Парсер чеков</h1>
          <TabsNavigation />
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ResizablePanelGroup direction="horizontal" className="w-full">
              <ResizablePanel defaultSize={10}>
                <ReceiptTable />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
