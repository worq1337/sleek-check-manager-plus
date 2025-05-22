
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
    <DialogContent className="sm:max-w-md bg-[#2b2b2b] border border-[#1e1e1e] text-[#a9b7c6]">
      <DialogHeader className="bg-[#3c3f41] -m-6 mb-4 p-4 border-b border-[#1e1e1e]">
        <DialogTitle className="text-[#a9b7c6]">Settings</DialogTitle>
      </DialogHeader>
      
      <div className="py-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai" className="text-[#a9b7c6]">API OpenAI</Label>
          <div className="relative group">
            <Input
              id="openai"
              value={tempOpenAIKey}
              onChange={(e) => setTempOpenAIKey(e.target.value)}
              placeholder="Enter your OpenAI API key"
              type="password"
              className="bg-[#3c3f41] border-[#1e1e1e] text-[#a9b7c6] focus:border-[#4675b8]"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telegram" className="text-[#a9b7c6]">Telegram Token</Label>
          <div className="relative group">
            <Input
              id="telegram"
              value={tempTelegramToken}
              onChange={(e) => setTempTelegramToken(e.target.value)}
              placeholder="Enter your Telegram Token"
              type="password"
              className="bg-[#3c3f41] border-[#1e1e1e] text-[#a9b7c6] focus:border-[#4675b8]"
            />
          </div>
        </div>
      </div>
      
      <DialogFooter className="border-t border-[#1e1e1e] pt-4">
        <DialogClose asChild>
          <Button type="button" variant="outline" className="bg-[#3c3f41] border-[#1e1e1e] text-[#a9b7c6] hover:bg-[#4e5254]">
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={handleSave} className="bg-[#4675b8] hover:bg-[#2d5186] text-white border-none">
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default SettingsDialog;
