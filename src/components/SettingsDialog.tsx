
import React from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAppContext } from '@/contexts/AppContext';
import { useTheme } from '@/components/theme-provider';
import { useToast } from '@/hooks/use-toast';

const SettingsDialog: React.FC = () => {
  const { openAIKey, setOpenAIKey, telegramToken, setTelegramToken } = useAppContext();
  const { theme, setTheme } = useTheme();
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
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Настройки</DialogTitle>
      </DialogHeader>
      
      <div className="py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="theme">Темная тема</Label>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Переключение между светлой и темной темой
            </div>
          </div>
          <Switch
            id="theme"
            checked={theme === 'dark'}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="openai">API OpenAI</Label>
          <div className="relative group">
            <Input
              id="openai"
              value={tempOpenAIKey}
              onChange={(e) => setTempOpenAIKey(e.target.value)}
              placeholder="Введите ваш API ключ OpenAI"
              type="password"
              className="transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
            <div className="absolute h-0.5 w-0 bg-blue-500 bottom-0 left-0 transition-all group-focus-within:w-full"></div>
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
              className="transition-all focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
            <div className="absolute h-0.5 w-0 bg-blue-500 bottom-0 left-0 transition-all group-focus-within:w-full"></div>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">Отмена</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={handleSave}>Сохранить</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default SettingsDialog;
