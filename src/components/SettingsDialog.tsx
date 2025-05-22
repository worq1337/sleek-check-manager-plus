
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
    <DialogContent className="sm:max-w-md bg-white">
      <DialogHeader>
        <DialogTitle>Настройки</DialogTitle>
      </DialogHeader>
      
      <div className="py-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai">API OpenAI</Label>
          <div className="relative group">
            <Input
              id="openai"
              value={tempOpenAIKey}
              onChange={(e) => setTempOpenAIKey(e.target.value)}
              placeholder="Введите ваш API ключ OpenAI"
              type="password"
              className="transition-all focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telegram">Telegram Token</Label>
          <div className="relative group">
            <Input
              id="telegram"
              value={tempTelegramToken}
              onChange={(e) => setTempTelegramToken(e.target.value)}
              placeholder="Введите ваш Telegram Token"
              type="password"
              className="transition-all focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="simple" className="bg-white hover:bg-gray-100">Отмена</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={handleSave} variant="green">Сохранить</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default SettingsDialog;
