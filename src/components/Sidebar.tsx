
import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Settings, FileText, Trash2, Upload, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import AddReceiptDialog from './AddReceiptDialog';
import SettingsDialog from './SettingsDialog';
import { useToast } from '@/hooks/use-toast';

const Sidebar: React.FC = () => {
  const { activeTab, deleteReceipt, importReceipts, exportReceipts, selectedReceiptId } = useAppContext();
  const { toast } = useToast();

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const receipts = JSON.parse(event.target?.result as string);
            if (Array.isArray(receipts)) {
              importReceipts(activeTab, receipts);
              toast({
                title: "Import successful",
                description: `${receipts.length} receipts have been imported.`,
              });
            } else {
              throw new Error("Invalid file format");
            }
          } catch (error) {
            toast({
              title: "Import failed",
              description: "The file format is invalid.",
              variant: "destructive",
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleDelete = () => {
    if (selectedReceiptId !== null) {
      deleteReceipt(activeTab, selectedReceiptId);
      toast({
        title: "Receipt deleted",
        description: "The selected receipt has been deleted.",
      });
    } else {
      toast({
        title: "No receipt selected",
        description: "Please select a receipt to delete.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    exportReceipts(activeTab);
    toast({
      title: "Export successful",
      description: "The receipts have been exported.",
    });
  };

  return (
    <div className="bg-gray-200 w-64 h-screen border-r border-gray-300 flex flex-col shadow-md animate-fade-in">
      <div className="p-3 border-b border-gray-300 bg-blue-700 text-white">
        <h1 className="text-base font-medium">Меню</h1>
      </div>
      
      <div className="flex-1 p-2 space-y-1">
        <Button variant="ghost" className="w-full justify-start text-left h-10 py-1" size="sm">
          <FileText className="mr-2 h-4 w-4 text-blue-600" />
          <span className="text-black">Обзор</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-left h-10 py-1" size="sm" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4 text-blue-600" />
          <span className="text-black">Удалить</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-left h-10 py-1" size="sm" onClick={handleImport}>
          <Upload className="mr-2 h-4 w-4 text-blue-600" />
          <span className="text-black">Импорт</span>
        </Button>
        
        <Button variant="ghost" className="w-full justify-start text-left h-10 py-1" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4 text-blue-600" />
          <span className="text-black">Экспорт</span>
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left h-10 py-1" size="sm">
              <Plus className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-black">Добавить чек</span>
            </Button>
          </DialogTrigger>
          <AddReceiptDialog />
        </Dialog>
      </div>
      
      <div className="p-2 border-t border-gray-300">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-left h-10 py-1" size="sm">
              <Settings className="mr-2 h-4 w-4 text-blue-600" />
              <span className="text-black">Настройки</span>
            </Button>
          </DialogTrigger>
          <SettingsDialog />
        </Dialog>
      </div>
    </div>
  );
};

export default Sidebar;
