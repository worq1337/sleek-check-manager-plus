
import React from 'react';
import Sidebar from '@/components/Sidebar';
import ReceiptTable from '@/components/ReceiptTable';
import TabsNavigation from '@/components/TabsNavigation';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Terminal } from 'lucide-react';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#2b2b2b] text-[#a9b7c6]">
      {/* Top Menu Bar - IDE Style */}
      <div className="flex items-center bg-[#3c3f41] p-1 text-sm border-b border-[#1e1e1e]">
        <div className="flex space-x-4 px-2">
          <span className="text-[#a9b7c6] hover:text-white cursor-pointer">File</span>
          <span className="text-[#a9b7c6] hover:text-white cursor-pointer">Edit</span>
          <span className="text-[#a9b7c6] hover:text-white cursor-pointer">View</span>
          <span className="text-[#a9b7c6] hover:text-white cursor-pointer">Run</span>
          <span className="text-[#a9b7c6] hover:text-white cursor-pointer">Tools</span>
          <span className="text-[#a9b7c6] hover:text-white cursor-pointer">Help</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          {/* Editor Area */}
          <div className="flex-1 p-2 overflow-hidden">
            <div className="h-full flex flex-col border border-[#1e1e1e] rounded">
              {/* Tab Navigation */}
              <div className="bg-[#3c3f41] border-b border-[#1e1e1e]">
                <TabsNavigation />
              </div>
              
              {/* Content Area */}
              <div className="flex-1 bg-[#2b2b2b] overflow-auto">
                <ResizablePanelGroup direction="horizontal" className="h-full">
                  <ResizablePanel defaultSize={100}>
                    <ReceiptTable />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
              
              {/* Terminal/Console Area */}
              <Collapsible className="border-t border-[#1e1e1e]">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-[#3c3f41] hover:bg-[#4e5254]">
                  <div className="flex items-center">
                    <Terminal className="h-4 w-4 mr-2" />
                    <span className="text-sm">Terminal</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="bg-[#2b2b2b] p-2 h-32 overflow-y-auto">
                  <div className="font-mono text-xs">
                    <p className="text-green-400"># Executed: parser.py</p>
                    <p>Loading receipt data...</p>
                    <p>Successfully processed 24 receipts</p>
                    <p>Total amount: 45,123.50</p>
                    <p className="text-green-400"># Process completed with exit code 0</p>
                    <p className="text-[#a9b7c6]">{'>'} _</p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          
          {/* Status Bar */}
          <div className="bg-[#3c3f41] text-xs border-t border-[#1e1e1e] p-1 flex justify-between">
            <div className="flex space-x-4">
              <span>Python 3.9.7</span>
              <span>UTF-8</span>
            </div>
            <div className="flex space-x-4">
              <span>Line: 42</span>
              <span>Col: 16</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
