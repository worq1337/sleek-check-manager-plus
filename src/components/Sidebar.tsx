
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
    <div className="bg-white dark:bg-gray-800 w-64 h-screen border-r border-gray-200 dark:border-gray-700 flex flex-col animate-fade-in">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Парсер чеков</h1>
      </div>
      
      <div className="flex-1 p-4 space-y-3">
        <Button variant="outline" className="w-full justify-start text-left" size="lg">
          <FileText className="mr-2 h-5 w-5" />
          Обзор
        </Button>
        
        <Button variant="outline" className="w-full justify-start text-left" size="lg" onClick={handleDelete}>
          <Trash2 className="mr-2 h-5 w-5" />
          Удалить
        </Button>
        
        <Button variant="outline" className="w-full justify-start text-left" size="lg" onClick={handleImport}>
          <Upload className="mr-2 h-5 w-5" />
          Импорт
        </Button>
        
        <Button variant="outline" className="w-full justify-start text-left" size="lg" onClick={handleExport}>
          <Download className="mr-2 h-5 w-5" />
          Экспорт
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left" size="lg">
              <Plus className="mr-2 h-5 w-5" />
              Добавить чек
            </Button>
          </DialogTrigger>
          <AddReceiptDialog />
        </Dialog>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left" size="lg">
              <Settings className="mr-2 h-5 w-5" />
              Настройки
            </Button>
          </DialogTrigger>
          <SettingsDialog />
        </Dialog>
      </div>
    </div>
  );
};

export default Sidebar;
