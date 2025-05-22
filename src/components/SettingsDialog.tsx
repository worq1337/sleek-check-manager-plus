
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

const SettingsDialog: React.FC = () => {
  const { openAIKey, setOpenAIKey, telegramToken, setTelegramToken } = useAppContext();
  const { toast } = useToast();
  
  const [tempOpenAIKey, setTempOpenAIKey] = React.useState(openAIKey);
  const [tempTelegramToken, setTempTelegramToken] = React.useState(telegramToken);
  
  const handleSave = () => {
    setOpenAIKey(tempOpenAIKey);
    setTelegramToken(tempTelegramToken);
    
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };
  
  return (
    <DialogContent className="sm:max-w-md bg-gray-100 border-2 border-gray-300">
      <DialogHeader className="bg-blue-700 text-white p-2 -m-6 mb-4">
        <DialogTitle className="text-white">Настройки</DialogTitle>
      </DialogHeader>
      
      <div className="py-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai" className="text-black">API OpenAI</Label>
          <div className="relative group">
            <Input
              id="openai"
              value={tempOpenAIKey}
              onChange={(e) => setTempOpenAIKey(e.target.value)}
              placeholder="Введите ваш API ключ OpenAI"
              type="password"
              className="border-gray-400"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telegram" className="text-black">Telegram Token</Label>
          <div className="relative group">
            <Input
              id="telegram"
              value={tempTelegramToken}
              onChange={(e) => setTempTelegramToken(e.target.value)}
              placeholder="Введите ваш Telegram Token"
              type="password"
              className="border-gray-400"
            />
          </div>
        </div>
      </div>
      
      <DialogFooter className="border-t border-gray-300 pt-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary" className="bg-gray-200 border border-gray-400 hover:bg-gray-300">
            <span className="text-black">Отмена</span>
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={handleSave} className="bg-blue-700 hover:bg-blue-800 text-white">
            <span>Сохранить</span>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default SettingsDialog;
