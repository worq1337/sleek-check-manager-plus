
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Receipt = {
  id: number;
  serviceId: string;
  date: string;
  time: string;
  operator: string;
  application: string;
  amount: number;
  balance: number;
  pc: string;
  p2p: string;
};

export type Tab = 'telegramBot' | 'sms';

type AppContextType = {
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
  receipts: {
    telegramBot: Receipt[];
    sms: Receipt[];
  };
  addReceipt: (tab: Tab, receipt: Omit<Receipt, "id">) => void;
  deleteReceipt: (tab: Tab, id: number) => void;
  importReceipts: (tab: Tab, receipts: Omit<Receipt, "id">[]) => void;
  exportReceipts: (tab: Tab) => void;
  openAIKey: string;
  setOpenAIKey: React.Dispatch<React.SetStateAction<string>>;
  telegramToken: string;
  setTelegramToken: React.Dispatch<React.SetStateAction<string>>;
  selectedReceiptId: number | null;
  setSelectedReceiptId: React.Dispatch<React.SetStateAction<number | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<Tab>('telegramBot');
  const [openAIKey, setOpenAIKey] = useState('');
  const [telegramToken, setTelegramToken] = useState('');
  const [selectedReceiptId, setSelectedReceiptId] = useState<number | null>(null);
  
  const [receipts, setReceipts] = useState<{
    telegramBot: Receipt[];
    sms: Receipt[];
  }>({
    telegramBot: [
      { id: 1, serviceId: '001', date: '2024-05-20', time: '10:30', operator: 'Иван Иванов', application: 'Telegram Bot', amount: 1500, balance: 500, pc: 'PC-01', p2p: 'Yes' },
      { id: 2, serviceId: '002', date: '2024-05-21', time: '11:45', operator: 'Мария Петрова', application: 'Telegram Bot', amount: 2500, balance: 1000, pc: 'PC-02', p2p: 'No' },
    ],
    sms: [
      { id: 1, serviceId: '003', date: '2024-05-19', time: '09:15', operator: 'Алексей Сидоров', application: 'SMS Service', amount: 800, balance: 200, pc: 'PC-03', p2p: 'Yes' },
      { id: 2, serviceId: '004', date: '2024-05-22', time: '14:20', operator: 'Елена Кузнецова', application: 'SMS Service', amount: 1200, balance: 300, pc: 'PC-01', p2p: 'No' },
    ]
  });

  const addReceipt = (tab: Tab, receipt: Omit<Receipt, "id">) => {
    setReceipts(prev => {
      const newId = prev[tab].length > 0 ? Math.max(...prev[tab].map(r => r.id)) + 1 : 1;
      return {
        ...prev,
        [tab]: [...prev[tab], { id: newId, ...receipt }]
      };
    });
  };

  const deleteReceipt = (tab: Tab, id: number) => {
    setReceipts(prev => ({
      ...prev,
      [tab]: prev[tab].filter(receipt => receipt.id !== id)
    }));
    if (selectedReceiptId === id) {
      setSelectedReceiptId(null);
    }
  };

  const importReceipts = (tab: Tab, newReceipts: Omit<Receipt, "id">[]) => {
    setReceipts(prev => {
      let maxId = prev[tab].length > 0 ? Math.max(...prev[tab].map(r => r.id)) : 0;
      const receiptsWithIds = newReceipts.map(receipt => ({
        ...receipt,
        id: ++maxId
      }));
      
      return {
        ...prev,
        [tab]: [...prev[tab], ...receiptsWithIds]
      };
    });
  };

  const exportReceipts = (tab: Tab) => {
    const dataStr = JSON.stringify(receipts[tab], null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${tab}-receipts-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      receipts,
      addReceipt,
      deleteReceipt,
      importReceipts,
      exportReceipts,
      openAIKey,
      setOpenAIKey,
      telegramToken,
      setTelegramToken,
      selectedReceiptId,
      setSelectedReceiptId,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
